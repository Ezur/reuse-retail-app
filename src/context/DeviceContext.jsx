import { createContext, useContext, useState } from 'react';
import SettingsDrawer from '../components/SettingsDrawer';

const DeviceContext = createContext(null);

export function DeviceProvider({ children }) {
  const [device, setDevice] = useState(
    () => localStorage.getItem('cj-device-mode') || 'ipad'
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSetDevice = (d) => {
    setDevice(d);
    localStorage.setItem('cj-device-mode', d);
  };

  return (
    <DeviceContext.Provider value={{
      device,
      setDevice: handleSetDevice,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }}>
      {children}
      <SettingsDrawer
        open={settingsOpen}
        device={device}
        onSelect={(d) => { handleSetDevice(d); setSettingsOpen(false); }}
        onClose={() => setSettingsOpen(false)}
      />
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  return useContext(DeviceContext);
}
