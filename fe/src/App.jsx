import React, { useState } from 'react';
import AddRecord from './AddRecord';
import GetRecords from './GetRecords';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏥 HealthChain Records</h1>
        <p>Secure Blockchain Medical Records System</p>
      </header>

      <nav className="app-nav">
        <button 
          className={activeTab === 'add' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add Medical Record
        </button>
        <button 
          className={activeTab === 'view' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('view')}
        >
            📋 View Patient Records
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'add' && <AddRecord />}
        {activeTab === 'view' && <GetRecords />}
      </main>

      <footer className="app-footer">
        <p>🔒 Powered by Ethereum Blockchain - Your medical data is secure and immutable</p>
      </footer>
    </div>
  );
}

export default App;