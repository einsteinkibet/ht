// const receipt = await healthRecordsContract.methods
//     .addRecord(patientId, recordHash)
//     .send({ from: fromAddress, gas: 200000 });


// backend/config/blockchain.js
const Web3 = require('web3');
const HealthRecordsABI = require('./HealthRecordsABI.json'); // ABI from your compiled contract
require('dotenv').config();

// Connect to Ganache
const web3 = new Web3('http://127.0.0.1:7545'); // Ganache RPC URL

// Replace this with the contract address deployed on Ganache
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

// Create contract instance
const healthRecordsContract = new web3.eth.Contract(HealthRecordsABI, contractAddress);

module.exports = healthRecordsContract;
