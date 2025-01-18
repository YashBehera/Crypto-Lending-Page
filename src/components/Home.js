import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState("");
  const [error, setError] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [theme, setTheme] = useState("light");

  // Check if wallet is already connected when the component mounts
  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          loadAccountDetails(accounts[0], web3);
        }
      });

      // Fetch Ethereum price from a public API (CoinGecko or similar)
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
        .then((response) => response.json())
        .then((data) => setEthPrice(data.ethereum.usd));

      // Switch theme based on localStorage or default
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme);
        document.body.classList.add(savedTheme);
      }
    }
  }, []);

  // Load account details: balance and network info
  const loadAccountDetails = async (account, web3) => {
    try {
      const balanceWei = await web3.eth.getBalance(account);
      const balanceInEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceInEth);

      // Get network details
      const networkId = await web3.eth.net.getId();
      let networkName = "";
      switch (networkId) {
        case 1:
          networkName = "Mainnet";
          break;
        case 3:
          networkName = "Ropsten";
          break;
        case 4:
          networkName = "Rinkeby";
          break;
        case 5:
          networkName = "Goerli";
          break;
        case 42:
          networkName = "Kovan";
          break;
        default:
          networkName = "Unknown Network";
      }
      setNetwork(networkName);
    } catch (err) {
      console.error(err);
      setError("Failed to load account details.");
    }
  };

  // Connect wallet and fetch account details
  const connectWallet = async () => {
    setLoading(true);
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        loadAccountDetails(accounts[0], web3);
        setError(""); // Reset any previous errors
      } catch (err) {
        setError("Failed to connect wallet.");
        console.error(err);
      }
    } else {
      setError("MetaMask is not installed.");
    }
    setLoading(false);
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount("");
    setBalance("");
    setNetwork("");
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand text-primary font-weight-bold" to="/">
            Crypto Lending
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/repayment-tracker">
                  Loan Tracker
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Home Content */}
      <div className="container d-flex flex-column align-items-center justify-content-center home-content">
        <motion.div
          className="card shadow-lg p-5 mb-5 home-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="text-center text-primary mb-4">
            Welcome to Crypto Lending
          </h1>
          <p className="text-center text-muted mb-4">
            Securely lend and borrow cryptocurrencies in a decentralized
            environment. Get started by connecting your wallet and unlocking new
            financial possibilities.
          </p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <motion.button
              className="btn btn-primary btn-lg mb-3"
              onClick={account ? disconnectWallet : connectWallet}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {account ? "Disconnect Wallet" : "Connect Wallet"}
            </motion.button>
          )}

          {account && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-success text-center mb-3">
                Connected: {account}
              </p>
              <p className="text-muted">Balance: {balance} ETH</p>
              <p className="text-muted">Network: {network}</p>
            </motion.div>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={toggleTheme}
            >
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => alert("Referral link: " + window.location.href)}
            >
              Generate Referral Link
            </button>
          </div>

          <p className="text-center mt-4 text-muted">
            Ethereum Price: ${ethPrice}
          </p>

          <Link to="/dashboard">
            <motion.button
              className="btn btn-outline-primary btn-lg"
              whileHover={{ scale: 1.1 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto shadow-sm">
        <p className="mb-0 text-muted">
          &copy; 2024 Crypto Lending. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default Home;
