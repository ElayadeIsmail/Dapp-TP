# 🔗 Truffle DApp Project

A full-stack decentralized application (dApp) built using **Solidity**, **Truffle**, and a modern **frontend** that interacts with Ethereum smart contracts via Web3.js.

---

## 📁 Project Structure
project-root/
│
├── smart-contracts/ # Truffle project folder
│ ├── contracts/ # Solidity smart contracts
│ ├── migrations/ # Truffle migration scripts
│ ├── test/ # Smart contract tests
│ └── truffle-config.js # Truffle configuration
│
├── frontend/ # Frontend application (React/Vite/ReactRouter)
│ ├── app/
│ └── ...
│
└── README.md

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Truffle](https://trufflesuite.com/) (`npm install -g truffle`)
- [Ganache](https://trufflesuite.com/ganache/) for local blockchain
- [MetaMask](https://metamask.io/) browser extension

---

## 🔨 Smart Contracts

### Setup

```bash
cd smart-contracts
truffle compile

truffle migrate --network development
```
## 🌐 Frontend

### Run Frontend
```bash
cd front
npm run dev
```