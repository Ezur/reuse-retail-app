import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';
import App from './App.jsx';
import './index.css';

setupIonicReact({
  mode: 'ios',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
