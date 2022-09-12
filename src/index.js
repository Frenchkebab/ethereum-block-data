import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BlockContext from './Context/BlockContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BlockContext>
    <App />
  </BlockContext>
);
