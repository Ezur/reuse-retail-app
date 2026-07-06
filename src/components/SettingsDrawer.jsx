function IpadIcon() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="62" height="46" rx="5" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="4" width="56" height="40" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="59" cy="24" r="2" fill="currentColor"/>
    </svg>
  );
}

function IphoneIcon() {
  return (
    <svg width="32" height="56" viewBox="0 0 32 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="30" height="54" rx="6" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="6" width="24" height="40" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="51" r="2" fill="currentColor"/>
      <rect x="11" y="3" width="10" height="2" rx="1" fill="currentColor"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="9" fill="#085420"/>
      <path d="M5 9l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function SettingsDrawer({ open, device, onSelect, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#fff',
        borderRadius: '16px 16px 0 0',
        zIndex: 101,
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        paddingBottom: 'env(safe-area-inset-bottom, 16px)',
      }}>

        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: '#d9d9d9' }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 24px 16px',
          borderBottom: '0.558px solid #f3f4f6',
        }}>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 17, fontWeight: 600, color: '#000' }}>
            Display Settings
          </span>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#f0f0f0', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 24px 32px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
            color: '#595959', letterSpacing: '0.08em', textTransform: 'uppercase',
            margin: '0 0 16px',
          }}>
            Device Layout
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            {[
              { id: 'ipad',   label: 'iPad',   sub: 'Optimized for tablet',  Icon: IpadIcon  },
              { id: 'iphone', label: 'iPhone',  sub: 'Optimized for phone',   Icon: IphoneIcon },
            ].map(({ id, label, sub, Icon }) => {
              const selected = device === id;
              return (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  style={{
                    flex: 1, maxWidth: 180,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 12, padding: '24px 16px',
                    border: selected ? '2px solid #085420' : '1.5px solid #d9d9d9',
                    borderRadius: 14,
                    background: selected ? '#f0f7f2' : '#fff',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                >
                  {selected && (
                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                      <CheckIcon />
                    </div>
                  )}
                  <div style={{ color: selected ? '#085420' : '#424242' }}>
                    <Icon />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{
                      fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 600,
                      color: selected ? '#085420' : '#000', margin: '0 0 4px',
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 12,
                      color: '#595959', margin: 0,
                    }}>
                      {sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
