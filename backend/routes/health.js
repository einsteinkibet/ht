import express from 'express';
import healthRecordsContract from '../config/blockchain.js';

const router = express.Router();

// Helper function to safely serialize BigInt values
function safeSerialize(obj) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

// Route to add a health record
router.post('/addRecord', async (req, res) => {
    const { patientId, recordHash, fromAddress } = req.body;

    try {
        console.log('Adding record:', { patientId, recordHash, fromAddress });
        
        // Use legacy transaction format for Ganache
        const receipt = await healthRecordsContract.methods
            .addRecord(patientId, recordHash)
            .send({ 
                from: fromAddress, 
                gas: 300000,
                gasPrice: '20000000000' // Explicit gas price for legacy transactions
            });

        console.log('Record added successfully:', receipt);
        res.json({ success: true, receipt: safeSerialize(receipt) });
    } catch (error) {
        console.error('Error adding record:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get records
// router.get('/getRecords/:address', async (req, res) => {
//     const { address } = req.params;

//     try {
//         console.log('Fetching records for address:', address);
        
//         // First check if contract actually exists
//         const contractCode = await web3.eth.getCode(process.env.CONTRACT_ADDRESS);
//         const contractExists = contractCode !== '0x';
        
//         if (!contractExists) {
//             console.log('❌ Contract does not exist at address:', process.env.CONTRACT_ADDRESS);
//             console.log('🔄 Using mock data until contract is deployed');
            
//             const mockRecords = [
//                 {
//                     patientId: 'john-dietesd',
//                     recordHash: 'test normalld',
//                     timestamp: Date.now(),
//                     note: 'Contract not deployed yet - using mock data'
//                 }
//             ];
            
//             return res.json({ 
//                 success: true, 
//                 records: mockRecords,
//                 message: 'Contract not deployed. Please deploy contract in Remix and update CONTRACT_ADDRESS in .env file'
//             });
//         }
        
//         // If contract exists, try to call it
//         try {
//             const records = await healthRecordsContract.methods.getRecords(address).call();
//             console.log('Raw records data from blockchain:', records);
            
//             if (records && records.length > 0) {
//                 const formattedRecords = records.map(record => ({
//                     patientId: record.patientId,
//                     recordHash: record.recordHash,
//                     timestamp: Date.now()
//                 }));
                
//                 res.json({ success: true, records: safeSerialize(formattedRecords) });
//             } else {
//                 res.json({ success: true, records: [], message: 'No records found for this address' });
//             }
            
//         } catch (callError) {
//             console.error('Contract call error:', callError);
            
//             // ABI mismatch - use mock data
//             const mockRecords = [
//                 {
//                     patientId: 'john-dietesd',
//                     recordHash: 'test normalld',
//                     timestamp: Date.now(),
//                     note: 'ABI decoding issue - using mock data'
//                 }
//             ];
            
//             res.json({ 
//                 success: true, 
//                 records: mockRecords,
//                 message: 'Contract deployed but ABI may not match. Using mock data for demonstration.',
//                 debug: callError.message
//             });
//         }
        
//     } catch (error) {
//         console.error('Error fetching records:', error);
//         res.status(500).json({ 
//             success: false, 
//             error: error.message,
//             suggestion: 'Check contract deployment and Ganache connection'
//         });
//     }
// });

// Route to get records - always use mock data for now
router.get('/getRecords/:address', async (req, res) => {
    const { address } = req.params;

    try {
        console.log('📋 Retrieving medical records for:', address);
        
        // Use mock data while we fix deployment issues
        const mockRecords = [
            {
                patientId: 'john-doe-001',
                recordHash: 'Blood Test: Normal ranges, Cholesterol: 180 mg/dL',
                timestamp: Date.now() - 86400000, // 1 day ago
                status: 'completed'
            },
            {
                patientId: 'john-doe-001',
                recordHash: 'Vaccination: COVID-19 booster completed',
                timestamp: Date.now() - 172800000, // 2 days ago
                status: 'completed'
            },
            {
                patientId: 'john-doe-001',
                recordHash: 'Physical Exam: Blood pressure 120/80, Weight stable',
                timestamp: Date.now() - 259200000, // 3 days ago
                status: 'normal'
            }
        ];
        
        res.json({ 
            success: true, 
            records: mockRecords,
            message: 'Using mock data - blockchain deployment in progress'
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
export default router;