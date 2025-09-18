import Web3 from 'web3';
import HealthRecordsABI from './HealthRecordsABI.json' assert { type: 'json' };

let healthRecordsContract;

// Ganache connection settings
const GANACHE_URL = process.env.GANACHE_URL || 'http://127.0.0.1:7545';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0x5c06C1140272e7925e463156a89e970EAd928AeA';

try {
  console.log('Connecting to Ganache at:', GANACHE_URL);
  const web3 = new Web3(GANACHE_URL);
  
  // Test connection
  const blockNumber = await web3.eth.getBlockNumber();
  console.log('Connected to Ganache. Current block:', blockNumber);
  
  // Get accounts
  const accounts = await web3.eth.getAccounts();
  console.log('Available accounts:', accounts);
  
  // Create contract instance
  healthRecordsContract = new web3.eth.Contract(HealthRecordsABI, CONTRACT_ADDRESS);
  console.log('Contract instance created with address:', CONTRACT_ADDRESS);
  
} catch (error) {
  console.error('❌ Error connecting to real blockchain, falling back to mock:', error.message);
  healthRecordsContract = createMockContract();
}

function createMockContract() {
  return {
    methods: {
      addRecord: function (patientId, recordHash) {
        return {
          send: async function ({ from, gas }) {
            console.log('MOCK: Adding record -', { patientId, recordHash, from });
            return {
              transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
              status: true,
              from: from,
            };
          },
        };
      },
      getRecords: function (address) {
        return {
          call: async function () {
            console.log('MOCK: Getting records for -', address);
            return [
              {
                patientId: 'patient-001',
                recordHash: 'blood-test-normal-2024',
                timestamp: Date.now() - 86400000,
              },
            ];
          },
        };
      },
    },
  };
}

export default healthRecordsContract;