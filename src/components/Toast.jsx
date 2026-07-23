import { useEffect, useState } from 'react';

export function Toast({ message, visible, onHide, type = 'success' }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onHide, 2500);
    return () => clearTimeout(t);
  }, [visible, onHide]);

  const bg = type === 'success' ? '#085420' : '#D65737';
  const showCheck = type === 'success' || type === 'manage';

  return (
    <div style={{
      position: 'fixed', bottom: 88, left: '50%', transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      pointerEvents: 'none',
      zIndex: 999,
      background: bg,
      color: '#fff',
      borderRadius: 10,
      padding: '10px 20px',
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      whiteSpace: 'nowrap',
    }}>
      {showCheck && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {message}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const show = (message, type = 'success') => setToast({ visible: true, message, type });
  const hide = () => setToast(t => ({ ...t, visible: false }));
  return { toast, show, hide };
}
