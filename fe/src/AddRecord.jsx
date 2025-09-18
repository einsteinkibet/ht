import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://mh-0d6p.onrender.com";

const AddRecord = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    recordHash: '',
    fromAddress: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(`${API_URL}/api/health/addRecord`, formData);
      setMessage(`✅ ${res.data.message || "Record added successfully to blockchain!"}`);
      setFormData({ patientId: '', recordHash: '', fromAddress: '' });
    } catch (error) {
      console.error(error);
      setMessage('❌ Error adding record. Please check your inputs and try again.');
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
          <input
            type="text"
            name="recordHash"
            value={formData.recordHash}
            onChange={handleChange}
            placeholder="e.g., blood-test-normal-2024"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>🔑 Your Ethereum Address:</label>
          <input
            type="text"
            name="fromAddress"
            value={formData.fromAddress}
            onChange={handleChange}
            placeholder="0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '⏳ Adding to Blockchain...' : '💾 Save to Blockchain'}
        </button>
      </form>

      {message && (
        <div className={message.includes('✅') ? 'message success' : 'message error'}>
          {message}
        </div>
      )}

      <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px'}}>
        <h4>💡 Tips:</h4>
        <ul style={{textAlign: 'left', paddingLeft: '1.5rem'}}>
          <li>Use real patient identifiers</li>
          <li>Record data should be descriptive</li>
          <li>Use a valid Ethereum address from Ganache</li>
          <li>Each transaction is permanently stored on blockchain</li>
        </ul>
      </div>
    </div>
  );
};

export default AddRecord;