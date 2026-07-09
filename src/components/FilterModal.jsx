function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function Toggle({ on, onChange, color }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 44, height: 24, borderRadius: 12, flexShrink: 0,
        background: on ? color : '#d1d5dc',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.15s',
      }}
      aria-pressed={on}
    >
      <span style={{
        position: 'absolute', top: 3,
        left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: '#fff', transition: 'left 0.15s',
      }} />
    </button>
  );
}

/**
 * Shared filter bottom-sheet modal.
 *
 * Props:
 *   title       – string
 *   color       – theme hex, default '#D65737'
 *   sections    – array of section descriptors:
 *     { type: 'pills',  label, options: [{value, label}], selected: Set, onToggle(value) }
 *     { type: 'toggle', label, description, value: bool, onChange(bool) }
 *   resultCount – number shown on the apply button
 *   onClose     – () => void
 *   onClearAll  – () => void
 *   onApply     – () => void
 */
export default function FilterModal({
  title = 'Filter',
  color = '#D65737',
  sections = [],
  resultCount,
  onClose,
  onClearAll,
  onApply,
}) {
  const activeCount = sections.reduce((n, s) => {
    if (s.type === 'pills') return n + (s.selected?.size || 0);
    if (s.type === 'toggle') return n + (s.value ? 1 : 0);
    return n;
  }, 0);

  const bgTint = color === '#085420' ? '#f0f7f2' : '#fff8f6';

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620, maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '0.558px solid #f3f4f6', flexShrink: 0 }}>
          <button
            onClick={onClearAll}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: activeCount > 0 ? color : '#b0b0b0', minWidth: 64, textAlign: 'left' }}
            disabled={activeCount === 0}
          >
            Clear all
          </button>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 17, fontWeight: 700, color: '#000', margin: 0 }}>{title}</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', minWidth: 64, justifyContent: 'flex-end' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable sections */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
          {sections.map((section, i) => (
            <div key={i}>
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, fontWeight: 500, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, padding: '14px 20px 8px' }}>
                {section.label}
              </p>

              {section.type === 'pills' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 20px 12px' }}>
                  {section.options.map(opt => {
                    const active = section.selected?.has(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => section.onToggle(opt.value)}
                        style={{
                          height: 34, padding: '0 14px', borderRadius: 8,
                          border: active ? `1.5px solid ${color}` : '1px solid #d1d5dc',
                          background: active ? bgTint : 'transparent',
                          fontFamily: "'Helvetica Neue', sans-serif",
                          fontSize: 14, fontWeight: active ? 600 : 400,
                          color: active ? color : '#424242',
                          cursor: 'pointer',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {section.type === 'toggle' && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 20px 16px' }}>
                  <div>
                    <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15, fontWeight: 500, color: '#000', margin: 0 }}>{section.label}</p>
                    {section.description && (
                      <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#888', margin: '2px 0 0' }}>{section.description}</p>
                    )}
                  </div>
                  <Toggle on={section.value} onChange={section.onChange} color={color} />
                </div>
              )}

              {i < sections.length - 1 && (
                <div style={{ height: '0.558px', background: '#f3f4f6', margin: '0 20px' }} />
              )}
            </div>
          ))}
        </div>

        {/* Apply button */}
        <div style={{ padding: '12px 20px 28px', borderTop: '0.558px solid #f3f4f6', flexShrink: 0 }}>
          <button
            onClick={onApply}
            style={{
              width: '100%', height: 48, borderRadius: 12,
              background: color, border: 'none', cursor: 'pointer',
              fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 600, color: '#fff',
            }}
          >
            {resultCount !== undefined ? `Show ${resultCount} result${resultCount === 1 ? '' : 's'}` : 'Apply filters'}
          </button>
        </div>
      </div>
    </div>
  );
}
