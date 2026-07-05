import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.jsx';
import ModeSelectorScreen from './screens/ModeSelectorScreen.jsx';

// Placeholder stubs for screens not yet built
function WarehouseScreen() {
  return <div style={{ padding: 32, fontFamily: 'Inter, sans-serif' }}>Warehouse Mode — coming soon</div>;
}
function RetailScreen() {
  return <div style={{ padding: 32, fontFamily: 'Inter, sans-serif' }}>Retail Mode — coming soon</div>;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/"             element={<Navigate to="/login" replace />} />
        <Route path="/login"        element={<LoginScreen />} />
        <Route path="/mode-select"  element={<ModeSelectorScreen />} />
        <Route path="/warehouse"    element={<WarehouseScreen />} />
        <Route path="/retail"       element={<RetailScreen />} />
      </Routes>
    </HashRouter>
  );
}
