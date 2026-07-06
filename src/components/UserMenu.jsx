import { useState, useEffect, useRef } from 'react';
import { useDevice } from '../context/DeviceContext';

function ChevronUp({ style }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <path d="M18 15L12 9L6 15" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        border: '1.27px solid #d9d9d9',
        borderRadius: 12,
        background: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 120,
        zIndex: 20,
        maxHeight: open ? 280 : 56,
        transition: 'max-height 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="User menu"
        aria-expanded={open}
        style={{
          height: 56,
          background: 'transparent',
          border: 'none',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: 18,
          fontWeight: 400,
          color: '#000000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          paddingLeft: 16,
          paddingRight: 12,
          width: '100%',
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
        transition: 'opacity 0.15s ease',
        transitionDelay: open ? '0.08s' : '0s',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ height: 1, background: '#f3f4f6', marginLeft: 8, marginRight: 8, marginBottom: 4 }} />
        <button
          onClick={() => { setOpen(false); openSettings(); }}
          style={{
            width: '100%',
            height: 44,
            background: 'transparent',
            border: 'none',
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 16,
            fontWeight: 400,
            color: '#000000',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          Settings
        </button>
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
