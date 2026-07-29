function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

/**
 * Shared sort modal.
 *
 * Props:
 *   title    – string, defaults to "Sort Items"
 *   options  – [{ label, field }]
 *   selected – currently active field string, or null
 *   onSelect – (field) => void   called with the chosen field; caller closes modal
 *   onClose  – () => void
 */
export default function SortModal({ title = 'Sort Items', options, selected, onSelect, onClose, color = '#D65737' }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620, maxHeight: '80vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '0.558px solid #f3f4f6', flexShrink: 0 }}>
          <button
            onClick={() => { onSelect(null); onClose(); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: selected ? color : '#b0b0b0', minWidth: 64, textAlign: 'left' }}
            disabled={!selected}
          >
            Clear sort
          </button>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 17, fontWeight: 700, color: '#000', margin: 0 }}>{title}</p>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, minWidth: 64, display: 'flex', justifyContent: 'flex-end' }}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Options list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {options.map(opt => (
            <button
              key={opt.field}
              onClick={() => onSelect(opt.field)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 24px', border: 'none', borderBottom: '0.558px solid #f3f4f6',
                background: selected === opt.field ? `${color}18` : 'transparent',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, margin: 0,
                fontWeight: selected === opt.field ? 600 : 400,
                color: selected === opt.field ? color : '#000',
              }}>
                {opt.label}
              </p>
              {selected === opt.field && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
