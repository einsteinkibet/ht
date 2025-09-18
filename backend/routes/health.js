const express = require('express');
const router = express.Router();
const healthRecordsContract = require('../config/blockchain');

// Add a health record
router.post('/addRecord', async (req, res) => {
  const { patientId, recordHash, fromAddress } = req.body;

  try {
    const receipt = await healthRecordsContract.methods
      .addRecord(patientId, recordHash)
      .send({ from: fromAddress, gas: 300000 });

    res.status(200).json({ success: true, receipt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get health records by patient address
router.get('/getRecords/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const records = await healthRecordsContract.methods.getRecords(address).call();
    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
