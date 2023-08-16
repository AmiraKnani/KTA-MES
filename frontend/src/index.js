import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = "http://192.168.2.249:3001/";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Access-Control-Allow-Methods"] =

  "GET,PUT,POST,DELETE,PATCH,OPTIONS";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
