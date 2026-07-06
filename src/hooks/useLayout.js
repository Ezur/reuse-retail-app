import { useDevice } from '../context/DeviceContext';

export function useLayout() {
  const { device } = useDevice();
  const isMobile = device === 'iphone';

  return {
    isMobile,
    maxWidth:     isMobile ? 430  : 834,
    headerHeight: isMobile ? 80   : 108,
    px:           isMobile ? 16   : 26,
    fieldColumns: isMobile ? 1    : 3,
    fontSize: {
      pageTitle:  isMobile ? 16   : 18,
      welcome:    isMobile ? 22   : 32,
      cardTitle:  isMobile ? 20   : 32,
    },
  };
}
