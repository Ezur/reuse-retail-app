import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DeviceProvider } from './context/DeviceContext.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import ModeSelectorScreen from './screens/ModeSelectorScreen.jsx';
import WarehouseScreen from './screens/WarehouseScreen.jsx';
import DonationItemListScreen from './screens/DonationItemListScreen.jsx';
import InventoryFormScreen from './screens/InventoryFormScreen.jsx';

function RetailScreen() {
  return <div style={{ padding: 32, fontFamily: 'Inter, sans-serif' }}>Retail Mode — coming soon</div>;
}

export default function App() {
  return (
    <HashRouter>
      <DeviceProvider>
      <Routes>
        <Route path="/"             element={<Navigate to="/login" replace />} />
        <Route path="/login"        element={<LoginScreen />} />
        <Route path="/mode-select"  element={<ModeSelectorScreen />} />
        <Route path="/warehouse"    element={<WarehouseScreen />} />
        <Route path="/donor/:id"             element={<DonationItemListScreen />} />
        <Route path="/donor/:id/item/new"   element={<InventoryFormScreen />} />
        <Route path="/retail"       element={<RetailScreen />} />
      </Routes>
      </DeviceProvider>
    </HashRouter>
  );
}
