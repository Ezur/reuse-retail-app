const baseFont = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

function FieldRow({ label, fieldKey, item, onChange }) {
  return (
    <div style={{
      background: 'var(--white)',
      height: 44,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      flexShrink: 0,
    }}>
      <input
        type="text"
        placeholder={label}
        value={item[fieldKey] ?? ''}
        onChange={e => onChange({ [fieldKey]: e.target.value })}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--black)',
          outline: 'none',
          minHeight: '100%',
          ...baseFont,
        }}
      />
    </div>
  );
}

export function WebPrepDrawer({ item, onChange }) {
  return (
    <details style={{
      background: 'var(--light-grey)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      width: '100%',
    }}>
      <summary
        style={{
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          listStyle: 'none',
          cursor: 'pointer',
          userSelect: 'none',
          minHeight: 44,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', ...baseFont }}>
          Web Prep
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10H7Z" fill="#000000"/>
        </svg>
      </summary>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
        <FieldRow label="Weight"      fieldKey="weight"      item={item} onChange={onChange} />
        <FieldRow label="Length"      fieldKey="length"      item={item} onChange={onChange} />
        <FieldRow label="Width"       fieldKey="width"       item={item} onChange={onChange} />
        <FieldRow label="Height"      fieldKey="height"      item={item} onChange={onChange} />
        <div style={{
          background: 'var(--white)',
          minHeight: 102,
          display: 'flex',
          alignItems: 'flex-start',
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
        }}>
          <textarea
            placeholder="Description"
            value={item.description ?? ''}
            onChange={e => onChange({ description: e.target.value })}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--black)',
              outline: 'none',
              resize: 'none',
              minHeight: 78,
              width: '100%',
              ...baseFont,
            }}
          />
        </div>
      </div>
    </details>
  );
}
