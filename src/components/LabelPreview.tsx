import { ItemRecord } from '../types';

interface Props {
  item: Partial<ItemRecord>;
}

export function LabelPreview({ item }: Props) {
  return (
    <div style={{
      border: '2px dashed var(--gray-300)',
      borderRadius: 'var(--radius)',
      padding: '12px 16px',
      background: 'var(--white)',
      minHeight: 80,
    }}>
      <div style={{ fontSize: 11, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
        Label Preview
      </div>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{item.name || '—'}</div>
      <div style={{ fontSize: 13, color: 'var(--gray-700)', marginTop: 2 }}>
        {item.category || ''}{item.brand ? ` · ${item.brand}` : ''}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)', marginTop: 4 }}>
        {item.price ? `$${item.price}` : ''}
        {item.quantity ? ` × ${item.quantity}` : ''}
      </div>
    </div>
  );
}
