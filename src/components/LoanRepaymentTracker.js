import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { ABI, CONTRACT_ADDRESS } from "../config";
import "./LoanRepaymentTracker.css";

const LoanRepaymentTracker = () => {
  const [account, setAccount] = useState("");
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    if (window.ethereum) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      loadLoans(accounts[0]);
    }
  };

  const loadLoans = async (userAccount) => {
    setLoading(true);
    try {
      const loanCount = await contract.methods.getLoanCount(userAccount).call();
      const userLoans = [];
      for (let i = 0; i < loanCount; i++) {
        const loan = await contract.methods.getLoanDetails(userAccount, i).call();
        userLoans.push({
          amount: web3.utils.fromWei(loan.amount, "ether"),
          interest: web3.utils.fromWei(loan.interest, "ether"),
          dueDate: new Date(parseInt(loan.dueDate) * 1000).toLocaleDateString(),
          isRepaid: loan.isRepaid,
        });
      }
      setLoans(userLoans);
    } catch (error) {
      console.error("Error loading loans:", error);
    }
    setLoading(false);
  };

  const repayLoan = async (loanIndex, amount) => {
    try {
      const weiAmount = web3.utils.toWei(amount, "ether");
      await contract.methods.repayLoan(loanIndex).send({ from: account, value: weiAmount });
      alert("Loan repaid successfully!");
      loadLoans(account);
    } catch (error) {
      console.error("Error repaying loan:", error);
    }
  };

  return (
    <div className="repayment-tracker">
      <h2>Loan Repayment Tracker</h2>
      {loading ? (
        <p>Loading loans...</p>
      ) : loans.length > 0 ? (
        <div className="loan-list">
          {loans.map((loan, index) => (
            <div key={index} className="loan-card">
              <p>Loan Amount: {loan.amount} ETH</p>
              <p>Interest: {loan.interest} ETH</p>
              <p>Due Date: {loan.dueDate}</p>
              <p>Status: {loan.isRepaid ? "Repaid" : "Pending"}</p>
              {!loan.isRepaid && (
                <button
                  className="btn btn-primary"
                  onClick={() => repayLoan(index, parseFloat(loan.amount) + parseFloat(loan.interest))}
                >
                  Repay Loan
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No active loans found.</p>
      )}
    </div>
  );
};

export default LoanRepaymentTracker;
