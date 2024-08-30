// src/main.jsx or src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';
import { StateProvider } from './context'; // Import the StateProvider

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create root using createRoot

root.render(
  <StateProvider>
    <App />
  </StateProvider>
);
