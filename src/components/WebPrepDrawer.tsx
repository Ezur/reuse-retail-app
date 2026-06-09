import { ItemRecord } from '../types';

interface Props {
  item: Partial<ItemRecord>;
  onChange: (patch: Partial<ItemRecord>) => void;
}

export function WebPrepDrawer({ item, onChange }: Props) {
  const field = (label: string, key: keyof ItemRecord) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--gray-100)' }}>
      <label style={{ width: 90, fontSize: 13, color: 'var(--gray-700)', flexShrink: 0 }}>{label}</label>
      <input
        type="text"
        value={(item[key] as string) ?? ''}
        onChange={e => onChange({ [key]: e.target.value })}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: 15,
          padding: '4px 0',
          outline: 'none',
          minHeight: 36,
        }}
      />
    </div>
  );

  return (
    <details style={{ background: 'var(--gray-100)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <summary style={{
        padding: '14px 16px',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--gray-700)',
        cursor: 'pointer',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
        minHeight: 44,
      }}>
        <span>Web Prep</span>
        <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--gray-500)' }}>For web listing only ▾</span>
      </summary>
      <div style={{ padding: '0 16px 12px', background: 'var(--white)' }}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, color: 'var(--gray-700)', display: 'block', marginBottom: 4 }}>Description</label>
          <textarea
            value={item.description ?? ''}
            onChange={e => onChange({ description: e.target.value })}
            rows={3}
            style={{
              width: '100%',
              border: '1px solid var(--gray-300)',
              borderRadius: 4,
              padding: 8,
              fontSize: 15,
              resize: 'vertical',
              background: 'var(--white)',
            }}
          />
        </div>
        {field('Weight', 'weight')}
        {field('Length', 'length')}
        {field('Width', 'width')}
        {field('Height', 'height')}
      </div>
    </details>
  );
}
