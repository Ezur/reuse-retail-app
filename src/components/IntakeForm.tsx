import { ItemRecord, ItemType, ConditionTag, emptyItem } from '../types';
import { LabelPreview } from './LabelPreview';
import { WebPrepDrawer } from './WebPrepDrawer';

const CONDITIONS: ConditionTag[] = ['Antique', 'Vintage', 'Salvaged', 'Refurbished', 'Surplus'];

interface Props {
  item: Partial<ItemRecord>;
  onChange: (patch: Partial<ItemRecord>) => void;
  onReset: () => void;
  onPhotoTap: () => void;
  onSave: () => void;
  onClone: () => void;
}

function Field({
  label,
  fieldKey,
  item,
  onChange,
  type = 'text',
}: {
  label: string;
  fieldKey: keyof ItemRecord;
  item: Partial<ItemRecord>;
  onChange: (patch: Partial<ItemRecord>) => void;
  type?: string;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0',
      borderBottom: '1px solid var(--gray-100)',
    }}>
      <label style={{ width: 120, fontSize: 14, color: 'var(--gray-700)', flexShrink: 0 }}>{label}</label>
      <input
        type={type}
        inputMode={type === 'number' ? 'decimal' : 'text'}
        value={(item[fieldKey] as string) ?? ''}
        onChange={e => onChange({ [fieldKey]: e.target.value })}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: 16,
          padding: '4px 0',
          outline: 'none',
          minHeight: 36,
        }}
      />
    </div>
  );
}

export function IntakeForm({ item, onChange, onReset, onPhotoTap, onSave, onClone }: Props) {
  const toggleCondition = (tag: ConditionTag) => {
    const current = item.condition ?? [];
    const next = current.includes(tag)
      ? current.filter(c => c !== tag)
      : [...current, tag];
    onChange({ condition: next });
  };

  const setItemType = (t: ItemType) => onChange({ itemType: t });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <header style={{
        background: 'var(--green)',
        color: 'var(--white)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <button onClick={onReset} style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15 }}>
          ✕ Cancel
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Construction Junction</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Warehouse Mode</div>
        </div>
        <button
          onClick={onSave}
          style={{
            background: 'var(--gold)',
            color: 'var(--white)',
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Save
        </button>
      </header>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', paddingBottom: 'calc(var(--footer-height) + 16px)', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* D-number banner */}
        <div style={{
          background: '#fff8e1',
          border: '1px solid var(--gold)',
          borderRadius: 'var(--radius)',
          padding: '10px 14px',
          fontSize: 13,
          color: '#5a3e00',
        }}>
          📦 Donation D44188 — Revenue sharing applies
        </div>

        {/* Stock / Unique selector */}
        <div style={{ display: 'flex', gap: 10 }}>
          {(['stock', 'unique'] as ItemType[]).map(t => (
            <button
              key={t}
              onClick={() => setItemType(t)}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: 15,
                fontWeight: 600,
                background: item.itemType === t ? 'var(--green)' : 'var(--white)',
                color: item.itemType === t ? 'var(--white)' : 'var(--gray-700)',
                border: `2px solid ${item.itemType === t ? 'var(--green)' : 'var(--gray-300)'}`,
                textTransform: 'capitalize',
              }}
            >
              {t} Item
            </button>
          ))}
        </div>

        {/* Label preview */}
        <LabelPreview item={item} />

        {/* Photo */}
        <button
          onClick={onPhotoTap}
          style={{
            background: 'var(--gray-100)',
            border: '2px dashed var(--gray-300)',
            borderRadius: 'var(--radius)',
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gray-500)',
            fontSize: 14,
            gap: 8,
          }}
        >
          {item.photo ? '📷 Photo attached — tap to retake' : '+ Add Photo'}
        </button>

        {/* Core fields */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius)', padding: '0 16px' }}>
          <Field label="Category"      fieldKey="category"      item={item} onChange={onChange} />
          <Field label="Name"          fieldKey="name"          item={item} onChange={onChange} />
          <Field label="Price ($)"     fieldKey="price"         item={item} onChange={onChange} type="number" />
          <Field label="Quantity"      fieldKey="quantity"      item={item} onChange={onChange} type="number" />
          <Field label="Brand"         fieldKey="brand"         item={item} onChange={onChange} />
          <Field label="Model / Style" fieldKey="modelStyle"    item={item} onChange={onChange} />
          <Field label="Color / Material" fieldKey="colorMaterial" item={item} onChange={onChange} />
        </div>

        {/* Condition chips */}
        <div>
          <div style={{ fontSize: 13, color: 'var(--gray-700)', marginBottom: 8 }}>Condition</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CONDITIONS.map(tag => {
              const active = (item.condition ?? []).includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleCondition(tag)}
                  style={{
                    padding: '8px 16px',
                    fontSize: 14,
                    background: active ? 'var(--green)' : 'var(--white)',
                    color: active ? 'var(--white)' : 'var(--gray-700)',
                    border: `2px solid ${active ? 'var(--green)' : 'var(--gray-300)'}`,
                    borderRadius: 20,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius)', padding: '10px 16px' }}>
          <label style={{ fontSize: 13, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Notes</label>
          <textarea
            value={item.notes ?? ''}
            onChange={e => onChange({ notes: e.target.value })}
            rows={3}
            placeholder="Optional notes…"
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: 15,
              resize: 'none',
              outline: 'none',
            }}
          />
        </div>

        {/* Web prep drawer */}
        <WebPrepDrawer item={item} onChange={onChange} />
      </div>

      {/* Sticky footer */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--footer-height)',
        background: 'var(--white)',
        borderTop: '1px solid var(--gray-300)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 16px',
        zIndex: 10,
      }}>
        <button
          onClick={() => console.log('Print label', item)}
          style={{
            flex: 1,
            background: 'var(--white)',
            border: '2px solid var(--green)',
            color: 'var(--green)',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Print Label
        </button>
        <button
          onClick={onSave}
          style={{
            flex: 1,
            background: 'var(--green)',
            color: 'var(--white)',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Save
        </button>
        <button
          onClick={onClone}
          style={{
            flex: 1,
            background: 'var(--gold)',
            color: 'var(--white)',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Clone
        </button>
      </footer>
    </div>
  );
}

export { emptyItem };
