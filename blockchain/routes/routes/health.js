import express from 'express';
import healthRecordsContract from '../config/blockchain.js';

const router = express.Router();

// Route to add a health record
router.post('/addRecord', async (req, res) => {
  const { patientId, recordHash, fromAddress } = req.body;

  try {
    console.log('Adding record:', { patientId, recordHash, fromAddress });
    
    const receipt = await healthRecordsContract.methods
      .addRecord(patientId, recordHash)
      .send({ from: fromAddress, gas: 300000 });

    console.log('Record added successfully:', receipt);
    res.json({ success: true, receipt });
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to get records
router.get('/getRecords/:address', async (req, res) => {
  const { address } = req.params;

  try {
    console.log('Fetching records for address:', address);
    
    const records = await healthRecordsContract.methods.getRecords(address).call();
    console.log('Records fetched:', records);
    
    // Convert to proper format with timestamps
    const formattedRecords = records.map(record => ({
      patientId: record.patientId,
      recordHash: record.recordHash,
      timestamp: Date.now() // You might want to get actual timestamps from events
    }));
    
    res.json({ success: true, records: formattedRecords });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;