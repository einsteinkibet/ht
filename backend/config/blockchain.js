// import Web3 from 'web3';

// // Use the EXACT ABI from Remix
// const HealthRecordsABI = [
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "fromAddress",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "patientId",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "recordHash",
//                 "type": "string"
//             }
//         ],
//         "name": "RecordAdded",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "string",
//                 "name": "patientId",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "recordHash",
//                 "type": "string"
//             }
//         ],
//         "name": "addRecord",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "patientAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "getRecords",
//         "outputs": [
//             {
//                 "components": [
//                     {
//                         "internalType": "string",
//                         "name": "patientId",
//                         "type": "string"
//                     },
//                     {
//                         "internalType": "string",
//                         "name": "recordHash",
//                         "type": "string"
//                     }
//                 ],
//                 "internalType": "struct HealthRecords.HealthRecord[]",
//                 "name": "",
//                 "type": "tuple[]"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "records",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "patientId",
//                 "type": "string"
//             },
//             {
//                 "internalType": "string",
//                 "name": "recordHash",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ];

// let healthRecordsContract;

// const GANACHE_URL = process.env.GANACHE_URL || 'http://127.0.0.1:7545';
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';

// console.log('🔗 Connecting to Ganache at:', GANACHE_URL);
// console.log('📄 Contract address:', CONTRACT_ADDRESS);

// try {
//     const web3 = new Web3(GANACHE_URL);
    
//     const isConnected = await web3.eth.net.isListening();
//     console.log('✅ Connected to Ganache:', isConnected);
    
//     if (isConnected) {
//         const blockNumber = await web3.eth.getBlockNumber();
//         console.log('📦 Current block number:', blockNumber);
        
//         const accounts = await web3.eth.getAccounts();
//         console.log('👥 Available accounts:', accounts.slice(0, 3));
        
//         healthRecordsContract = new web3.eth.Contract(HealthRecordsABI, CONTRACT_ADDRESS);
//         console.log('📋 Contract instance created with correct ABI');
//     }
    
// } catch (error) {
//     console.error('❌ Error connecting to blockchain:', error.message);
//     healthRecordsContract = createMockContract();
// }

// function createMockContract() {
//     return {
//         methods: {
//             addRecord: function (patientId, recordHash) {
//                 return {
//                     send: async function ({ from, gas }) {
//                         console.log('🧪 MOCK: Adding record -', { patientId, recordHash, from });
//                         return {
//                             transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
//                             status: true,
//                             from: from,
//                         };
//                     },
//                 };
//             },
//             getRecords: function (address) {
//                 return {
//                     call: async function () {
//                         console.log('🧪 MOCK: Getting records for -', address);
//                         return [];
//                     },
//                 };
//             },
//         },
//     };
// }

// export default healthRecordsContract;

import Web3 from 'web3';

// Simple ABI that will work with any contract
const HealthRecordsABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "patientId", "type": "string"},
            {"internalType": "string", "name": "recordHash", "type": "string"}
        ],
        "name": "addRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let healthRecordsContract;

// Always use mock mode for now
healthRecordsContract = createMockContract();

function createMockContract() {
    return {
        methods: {
            addRecord: function (patientId, recordHash) {
                return {
                    send: async function ({ from, gas }) {
                        console.log('✅ MOCK: Record added to blockchain -', { 
                            patientId, 
                            recordHash, 
                            from,
                            status: 'success',
                            gasUsed: '21000'
                        });
                        
                        return {
                            transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
                            status: true,
                            from: from,
                            blockNumber: Math.floor(Math.random() * 1000) + 1,
                            gasUsed: 21000,
                            events: {
                                RecordAdded: {
                                    returnValues: {
                                        fromAddress: from,
                                        patientId: patientId,
                                        recordHash: recordHash
                                    }
                                }
                            }
                        };
                    },
                };
            },
            getRecords: function (address) {
                return {
                    call: async function () {
                        console.log('✅ MOCK: Retrieving records for -', address);
                        
                        // Return realistic mock medical records
                        return [
                            {
                                patientId: 'john-doe-001',
                                recordHash: 'Blood Test: Normal ranges, Cholesterol: 180 mg/dL'
                            },
                            {
                                patientId: 'john-doe-001',
                                recordHash: 'Vaccination: COVID-19 booster completed'
                            },
                            {
                                patientId: 'john-doe-001', 
                                recordHash: 'Physical Exam: Blood pressure 120/80, Weight stable'
                            }
                        ];
                    },
                };
            },
        },
    };
}

export default healthRecordsContract;