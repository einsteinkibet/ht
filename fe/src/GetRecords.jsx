import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://ht-izqe.onrender.com";

const GetRecords = () => {
  const [address, setAddress] = useState('');
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState('');

  const handleFetch = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health/getRecords/${address}`);
      setRecords(response.data.records);
      setMessage('Records fetched successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Error fetching records.');
    }
  };



  return (
    <div>
      <h2>Get Health Records</h2>
      <div>
        <label>Patient Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
          required
          style={{margin: '10px', padding: '5px', width: '300px'}}
        />
        <button onClick={handleFetch} style={{padding: '5px 10px'}}>Get Records</button>
      </div>
      
      {message && <p style={{color: message.includes('Error') ? 'red' : 'green'}}>{message}</p>}
      
      {records && records.length > 0 ? (
        <div>
          <h3>Found {records.length} records:</h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            {records.map((record, index) => (
              <li key={index} style={{
                border: '1px solid #ccc', 
                margin: '10px', 
                padding: '10px',
                borderRadius: '5px'
              }}>
                <strong>Patient ID:</strong> {record.patientId}<br/>
                <strong>Record Hash:</strong> <code>{record.recordHash}</code><br/>
                {record.timestamp && (
                  <><strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}</>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        message && !message.includes('Error') && <p>No records found for this address.</p>
      )}
    </div>
  );
};

export default GetRecords;