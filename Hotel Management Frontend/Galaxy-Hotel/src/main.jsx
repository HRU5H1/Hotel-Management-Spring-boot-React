
// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1) Import Bootstrap CSS BEFORE your own CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// 2) Your global styles
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
