import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './i18n/config';
import './styles/globals.css';
import './styles/print.css';
import './styles/accessibility.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
