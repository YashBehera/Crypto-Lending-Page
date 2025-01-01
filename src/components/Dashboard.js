import React, { useState } from 'react';
import Web3 from 'web3';
import { ABI, CONTRACT_ADDRESS } from '../config';
import { motion } from 'framer-motion';
import "bootstrap/dist/css/bootstrap.min.css";
import './Dashboard.css';

const Dashboard = () => {
  const [collateral, setCollateral] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

  const depositCollateral = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.depositCollateral().send({
      from: accounts[0],
      value: web3.utils.toWei(collateral, 'ether'),
    });
    alert('Collateral deposited');
  };

  const borrowFunds = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.borrow(
      web3.utils.toWei(loanAmount, 'ether'),
      5, // Interest Rate: 5%
      604800 // Duration: 1 week in seconds
    ).send({ from: accounts[0] });
    alert('Loan borrowed');
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="text-primary">Dashboard</h2>
          <p className="text-muted">Manage your crypto lending and borrowing</p>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <motion.div
              className="card shadow-lg p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-center text-primary mb-4">Deposit Collateral</h3>
              <input
                type="text"
                placeholder="ETH Amount"
                value={collateral}
                onChange={(e) => setCollateral(e.target.value)}
                className="form-control mb-3"
              />
              <button onClick={depositCollateral} className="btn btn-primary btn-block">
                Deposit
              </button>
            </motion.div>
          </div>

          <div className="col-lg-6 mb-4">
            <motion.div
              className="card shadow-lg p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-center text-primary mb-4">Borrow Funds</h3>
              <input
                type="text"
                placeholder="ETH Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="form-control mb-3"
              />
              <button onClick={borrowFunds} className="btn btn-success btn-block">
                Borrow
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
