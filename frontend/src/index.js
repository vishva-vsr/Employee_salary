import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// Make sure you have <div id="root"></div> in public/index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
