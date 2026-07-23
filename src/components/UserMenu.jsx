import { useState, useEffect, useRef } from 'react';
import { useDevice } from '../context/DeviceContext';

function ChevronUp({ style }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M18 15L12 9L6 15" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function UserMenu({ initials, onSignOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { openSettings } = useDevice();

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        minWidth: 120,
        zIndex: 20,
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="User menu"
        aria-expanded={open}
        style={{
          height: 44,
          marginTop: 6,
          background: 'transparent',
          border: '1.5px solid rgba(255,255,255,0.55)',
          borderRadius: 10,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: 15,
          fontWeight: 500,
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          paddingLeft: 14,
          paddingRight: 10,
          flexShrink: 0,
        }}
      >
        {initials}
        <ChevronUp style={{
          transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
        }} />
      </button>

      <div style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.18s ease, transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: open ? 'translateY(0)' : 'translateY(-6px)',
        marginTop: 6,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ height: 1, background: '#f3f4f6', marginLeft: 8, marginRight: 8, marginBottom: 4 }} />
        <button
          onClick={() => { setOpen(false); onSignOut(); }}
          style={{
            width: '100%',
            height: 44,
            background: 'transparent',
            border: 'none',
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 16,
            fontWeight: 400,
            color: '#DC0000',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
