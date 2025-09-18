// Create deploy.js in backend directory
import Web3 from 'web3';
import fs from 'fs';

const web3 = new Web3('http://127.0.0.1:7545');

const contractSource = `
pragma solidity ^0.8.21;

contract HealthRecords {
    struct HealthRecord {
        string patientId;
        string recordHash;
    }

    mapping(address => HealthRecord[]) public records;

    event RecordAdded(address indexed fromAddress, string patientId, string recordHash);

    function addRecord(string memory patientId, string memory recordHash) public {
        require(bytes(patientId).length > 0, "Patient ID is required");
        require(bytes(recordHash).length > 0, "Record hash is required");
        records[msg.sender].push(HealthRecord(patientId, recordHash));
        emit RecordAdded(msg.sender, patientId, recordHash);
    }

    function getRecords(address patientAddress) public view returns (HealthRecord[] memory) {
        return records[patientAddress];
    }
}
`;

async function deploy() {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Deploying from:', accounts[0]);
        
        // You'd need to compile this properly, but for now:
        console.log('Please deploy through Remix for now');
        console.log('Then update CONTRACT_ADDRESS in .env file');
        
    } catch (error) {
        console.error('Deployment error:', error);
    }
}

deploy();