import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import App from './App';

const root = document.getElementById('root');
const appRoot = createRoot(root); // Use createRoot from react-dom/client
appRoot.render(<App />);