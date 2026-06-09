import { ItemRecord } from '../types';

interface Props {
  item: Partial<ItemRecord>;
  onChange: (patch: Partial<ItemRecord>) => void;
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 52,
  borderBottom: '1px solid var(--gray-100)',
};

const labelStyle: React.CSSProperties = {
  width: 110,
  flexShrink: 0,
  fontSize: 15,
  color: 'var(--text)',
  paddingLeft: 16,
};

function InnerField({ label, fieldKey, item, onChange }: {
  label: string;
  fieldKey: keyof ItemRecord;
  item: Partial<ItemRecord>;
  onChange: (p: Partial<ItemRecord>) => void;
}) {
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <input
        type="text"
        value={(item[fieldKey] as string) ?? ''}
        onChange={e => onChange({ [fieldKey]: e.target.value })}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: 15,
          outline: 'none',
          paddingRight: 16,
          minHeight: 44,
          color: 'var(--text)',
        }}
      />
    </div>
  );
}

export function WebPrepDrawer({ item, onChange }: Props) {
  return (
    <details style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--gray-100)',
      overflow: 'hidden',
    }}>
      <summary style={{
        padding: '0 16px',
        minHeight: 52,
        fontSize: 15,
        fontWeight: 500,
        color: 'var(--text)',
        cursor: 'pointer',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
      }}>
        <span>Web Prep</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </summary>

      <div style={{ borderTop: '1px solid var(--gray-100)' }}>
        {/* Description */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--gray-100)' }}>
          <textarea
            value={item.description ?? ''}
            onChange={e => onChange({ description: e.target.value })}
            rows={3}
            placeholder="Description"
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: 15,
              outline: 'none',
              resize: 'none',
              color: 'var(--text)',
              lineHeight: 1.5,
            }}
          />
        </div>
        <InnerField label="Weight"  fieldKey="weight" item={item} onChange={onChange} />
        <InnerField label="Length"  fieldKey="length" item={item} onChange={onChange} />
        <InnerField label="Width"   fieldKey="width"  item={item} onChange={onChange} />
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <span style={labelStyle}>Height</span>
          <input
            type="text"
            value={item.height ?? ''}
            onChange={e => onChange({ height: e.target.value })}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontSize: 15, outline: 'none', paddingRight: 16, minHeight: 44, color: 'var(--text)',
            }}
          />
        </div>
      </div>
    </details>
  );
}
