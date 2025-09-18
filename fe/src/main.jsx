import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Make sure this line is correct
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals();