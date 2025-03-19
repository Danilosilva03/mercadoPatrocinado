import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyBUHU0TMiOV5WM24xOORKJcqokz8PT9Vhc",
  authDomain: "mercadopatrocinado.firebaseapp.com",
  databaseURL: "https://mercadopatrocinado-default-rtdb.firebaseio.com",
  projectId: "mercadopatrocinado",
  storageBucket: "mercadopatrocinado.firebasestorage.app",
  messagingSenderId: "822661232555",
  appId: "1:822661232555:web:53f3c10f7eb1ffa907c4ee",
  measurementId: "G-FTGPPLE2TC"
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
