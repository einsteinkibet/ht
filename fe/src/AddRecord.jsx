import React, { useState } from 'react';
import axios from 'axios';

// const API_URL = "https://ht-izqe.onrender.com";
// Change this:

// To this:
const API_URL = "http://localhost:5000";
const AddRecord = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    recordHash: '',
    fromAddress: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setTransactionHash('');

    // Validate Ethereum address
    if (!formData.fromAddress.startsWith('0x') || formData.fromAddress.length !== 42) {
      setMessage('❌ Please enter a valid Ethereum address (should start with 0x and be 42 characters long)');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/health/addRecord`, formData);
      
      if (res.data.success) {
        setMessage('✅ Record added successfully to blockchain!');
        setTransactionHash(res.data.receipt.transactionHash);
        setFormData({ patientId: '', recordHash: '', fromAddress: '' });
      } else {
        setMessage(`❌ Error: ${res.data.error}`);
      }
    } catch (error) {
      console.error('Add record error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Error adding record';
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Sample Ganache addresses for user convenience
  const sampleAddresses = [
    '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
    '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b'
  ];

  const fillSampleAddress = (address) => {
    setFormData({
      ...formData,
      fromAddress: address
    });
  };

  return (
    <div className="record-form">
      <h2>➕ Add New Medical Record</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>👤 Patient ID:</label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            placeholder="e.g., john-doe-001"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>📝 Record Data:</label>
          <textarea
            name="recordHash"
            value={formData.recordHash}
            onChange={handleChange}
            placeholder="e.g., Blood Test Results: Normal, Blood Pressure: 120/80, Cholesterol: 180 mg/dL"
            required
            disabled={loading}
            rows="3"
            style={{width: '100%', padding: '8px'}}
          />
        </div>

        <div className="form-group">
          <label>🔑 Your Ethereum Address (from Ganache):</label>
          <input
            type="text"
            name="fromAddress"
            value={formData.fromAddress}
            onChange={handleChange}
            placeholder="0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
            required
            disabled={loading}
            style={{fontFamily: 'monospace'}}
          />
          
          <div style={{marginTop: '8px', fontSize: '14px'}}>
            <span>Quick fill: </span>
            {sampleAddresses.map((addr, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillSampleAddress(addr)}
                style={{
                  margin: '0 5px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  background: '#f0f0f0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Address {index + 1}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Adding to Blockchain...' : '💾 Save to Blockchain'}
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '8px',
          background: message.includes('✅') ? '#d4edda' : '#f8d7da',
          color: message.includes('✅') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          {message}
        </div>
      )}

      {transactionHash && (
        <div style={{
          marginTop: '15px',
          padding: '12px',
          background: '#e3f2fd',
          borderRadius: '6px',
          fontSize: '14px'
        }}>
          <strong>Transaction Hash:</strong><br/>
          <code style={{fontSize: '12px', wordBreak: 'break-all'}}>
            {transactionHash}
          </code>
        </div>
      )}

      <div style={{
        marginTop: '2rem', 
        padding: '1.5rem', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h4>💡 Important Instructions:</h4>
        <ul style={{textAlign: 'left', paddingLeft: '1.5rem', lineHeight: '1.6'}}>
          <li><strong>Use real Ganache addresses</strong> (copy from Ganache UI)</li>
          <li>Ensure the address has enough ETH for gas fees</li>
          <li>Patient ID should be unique identifiers</li>
          <li>Record data can be any medical information</li>
          <li>Transactions are permanent on the blockchain</li>
          <li>Wait for transaction confirmation (usually 10-30 seconds)</li>
        </ul>
        
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#fff3cd',
          borderRadius: '6px',
          border: '1px solid #ffeaa7'
        }}>
          <strong>⚠️ Ganache Addresses:</strong> Open Ganache GUI → Accounts tab → Copy addresses starting with 0x
        </div>
      </div>
    </div>
  );
};

export default AddRecord;