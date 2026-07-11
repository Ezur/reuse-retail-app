import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { DeviceProvider } from './context/DeviceContext.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import ModeSelectorScreen from './screens/ModeSelectorScreen.jsx';
import WarehouseScreen from './screens/WarehouseScreen.jsx';
import DonationItemListScreen from './screens/DonationItemListScreen.jsx';
import NewDonorScreen from './screens/NewDonorScreen.jsx';
import InventoryFormScreen from './screens/InventoryFormScreen.jsx';
import ManageInventoryScreen from './screens/ManageInventoryScreen.jsx';
import CycleCountScreen from './screens/CycleCountScreen.jsx';
import CycleCountDetailScreen from './screens/CycleCountDetailScreen.jsx';


export default function App() {
  return (
    <HashRouter>
      <DeviceProvider>
      <Routes>
        <Route path="/"             element={<Navigate to="/login" replace />} />
        <Route path="/login"        element={<LoginScreen />} />
        <Route path="/mode-select"  element={<ModeSelectorScreen />} />
        <Route path="/warehouse"    element={<WarehouseScreen />} />
        <Route path="/donor/new"             element={<NewDonorScreen />} />
        <Route path="/donor/:id"             element={<DonationItemListScreen />} />
        <Route path="/donor/:id/item/new"    element={<InventoryFormScreen />} />
        <Route path="/donor/:id/item/:itemId" element={<InventoryFormScreen />} />
        <Route path="/retail"       element={<ManageInventoryScreen />} />
        <Route path="/cycle-count"  element={<CycleCountScreen />} />
        <Route path="/cycle-count/:staffId" element={<CycleCountDetailScreen />} />
      </Routes>
      </DeviceProvider>
      <Analytics />
    </HashRouter>
  );
}
