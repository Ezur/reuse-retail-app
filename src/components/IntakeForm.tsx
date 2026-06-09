import { ItemRecord, ItemType, ConditionTag } from '../types';
import { WebPrepDrawer } from './WebPrepDrawer';
import { CATEGORIES, BRANDS, COLORS_MATERIALS } from '../data/options';

const CONDITIONS: ConditionTag[] = ['Antique', 'Vintage', 'Salvaged', 'Refurbished', 'Surplus'];

// ─── Icon components ──────────────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

function CloneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

// ─── Field row components ─────────────────────────────────────────────────────

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 62,
  borderBottom: '1px solid var(--gray-100)',
  position: 'relative',
};

const labelStyle: React.CSSProperties = {
  width: 130,
  flexShrink: 0,
  fontSize: 16,
  color: 'var(--text)',
  fontWeight: 400,
  paddingLeft: 18,
};

function TextField({
  label,
  fieldKey,
  item,
  onChange,
  type = 'text',
  prefix,
}: {
  label: string;
  fieldKey: keyof ItemRecord;
  item: Partial<ItemRecord>;
  onChange: (p: Partial<ItemRecord>) => void;
  type?: string;
  prefix?: string;
}) {
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      {prefix && <span style={{ fontSize: 15, color: 'var(--gray-500)', marginRight: 2 }}>{prefix}</span>}
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
          outline: 'none',
          paddingRight: 18,
          color: 'var(--text)',
          minHeight: 50,
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  fieldKey,
  options,
  item,
  onChange,
}: {
  label: string;
  fieldKey: keyof ItemRecord;
  options: string[];
  item: Partial<ItemRecord>;
  onChange: (p: Partial<ItemRecord>) => void;
}) {
  const value = (item[fieldKey] as string) ?? '';
  return (
    <div style={rowStyle}>
      <span style={labelStyle}>{label}</span>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
          value={value}
          onChange={e => onChange({ [fieldKey]: e.target.value })}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontSize: 16,
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            color: value ? 'var(--text)' : 'var(--gray-500)',
            paddingRight: 36,
            minHeight: 50,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <option value="" disabled hidden>{label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 14, pointerEvents: 'none', color: 'var(--gray-500)', display: 'flex' }}>
          <ChevronDown />
        </span>
      </div>
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--gray-100)',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  item: Partial<ItemRecord>;
  onChange: (patch: Partial<ItemRecord>) => void;
  onReset: () => void;
  onPhotoTap: () => void;
  onSave: () => void;
  onClone: () => void;
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

      {/* ── Header ── */}
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
        <button
          onClick={onReset}
          style={{ color: 'var(--white)', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6, opacity: 0.9 }}
        >
          ✕ Cancel
        </button>

        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '0.01em' }}>
          Warehouse Mode
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onClone}
            style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, opacity: 0.9 }}
            title="Clone"
          >
            <CloneIcon />
            <span style={{ fontSize: 10 }}>Clone</span>
          </button>
          <button
            onClick={onSave}
            style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, opacity: 0.9 }}
            title="Save"
          >
            <SaveIcon />
            <span style={{ fontSize: 10 }}>Save</span>
          </button>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 16px',
        paddingBottom: 'calc(var(--footer-height) + 24px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>

        {/* Donation banner */}
        <Card>
          <div style={{ padding: '15px 18px', fontSize: 15, color: 'var(--text)' }}>
            Anonymous Drop Off Donation D44188 – 5/31/2026
          </div>
        </Card>

        {/* Stock / Unique selector */}
        <div style={{ display: 'flex', gap: 10 }}>
          {([
            { type: 'stock' as ItemType, title: 'Stock Item', sub: 'Same item type, shared barcode — e.g. white toilet, interior panel door' },
            { type: 'unique' as ItemType, title: 'Unique Item', sub: 'One-of-a-kind, individual barcode — e.g. vintage chair, branded door' },
          ]).map(({ type, title, sub }) => {
            const active = item.itemType === type;
            return (
              <button
                key={type}
                onClick={() => setItemType(type)}
                style={{
                  flex: 1,
                  padding: '18px 14px',
                  textAlign: 'left',
                  background: active ? 'var(--green)' : 'var(--white)',
                  color: active ? 'var(--white)' : 'var(--text)',
                  border: active ? '2px solid var(--green)' : '1.5px solid var(--gray-300)',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  minHeight: 88,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 16 }}>{title}</span>
                <span style={{ fontSize: 13, opacity: active ? 0.85 : 0.6, lineHeight: 1.4 }}>{sub}</span>
              </button>
            );
          })}
        </div>

        {/* Photo */}
        <button
          onClick={onPhotoTap}
          style={{
            background: 'transparent',
            border: '2px dashed var(--green)',
            borderRadius: 'var(--radius)',
            minHeight: 130,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: item.photo ? 'var(--green)' : 'var(--gray-500)',
            fontSize: 15,
            gap: 10,
            width: '100%',
          }}
        >
          <CameraIcon />
          <span style={{ fontWeight: 500 }}>
            {item.photo ? 'Photo attached — tap to retake' : 'Add Photo'}
          </span>
        </button>

        {/* Field group 1: descriptors */}
        <Card>
          <SelectField label="Category"        fieldKey="category"      options={CATEGORIES}       item={item} onChange={onChange} />
          <TextField   label="Item Name"       fieldKey="name"          item={item} onChange={onChange} />
          <SelectField label="Brand"           fieldKey="brand"         options={BRANDS}           item={item} onChange={onChange} />
          <TextField   label="Model / Style"   fieldKey="modelStyle"    item={item} onChange={onChange} />
          <div style={{ ...rowStyle, borderBottom: 'none' }}>
            <span style={labelStyle}>Color / Material</span>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select
                value={(item.colorMaterial as string) ?? ''}
                onChange={e => onChange({ colorMaterial: e.target.value })}
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: 16,
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  color: item.colorMaterial ? 'var(--text)' : 'var(--gray-500)',
                  paddingRight: 36,
                  minHeight: 50,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <option value="" disabled hidden>Color / Material</option>
                {COLORS_MATERIALS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <span style={{ position: 'absolute', right: 14, pointerEvents: 'none', color: 'var(--gray-500)', display: 'flex' }}>
                <ChevronDown />
              </span>
            </div>
          </div>
        </Card>

        {/* Condition chips */}
        <div>
          <div style={{ fontSize: 15, color: 'var(--text)', marginBottom: 12, fontWeight: 500 }}>Condition</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {CONDITIONS.map(tag => {
              const active = (item.condition ?? []).includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleCondition(tag)}
                  style={{
                    padding: '10px 20px',
                    fontSize: 15,
                    background: 'var(--white)',
                    color: active ? 'var(--green)' : 'var(--text)',
                    border: active ? '1.5px solid var(--green)' : '1.5px solid var(--gray-300)',
                    borderRadius: 999,
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field group 2: quantity + price */}
        <Card>
          <TextField label="Quantity" fieldKey="quantity" item={item} onChange={onChange} type="number" />
          <div style={{ ...rowStyle, borderBottom: 'none' }}>
            <span style={labelStyle}>Price</span>
            <span style={{ fontSize: 16, color: 'var(--gray-500)' }}>$</span>
            <input
              type="number"
              inputMode="decimal"
              value={(item.price as string) ?? ''}
              onChange={e => onChange({ price: e.target.value })}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: 16,
                outline: 'none',
                paddingRight: 18,
                color: 'var(--text)',
                minHeight: 50,
                marginLeft: 2,
              }}
            />
          </div>
        </Card>

        {/* Notes */}
        <Card style={{ padding: '14px 18px' }}>
          <textarea
            value={item.notes ?? ''}
            onChange={e => onChange({ notes: e.target.value })}
            placeholder="Notes"
            rows={3}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: 16,
              outline: 'none',
              resize: 'none',
              color: 'var(--text)',
              lineHeight: 1.6,
            }}
          />
        </Card>

        {/* Web Prep */}
        <WebPrepDrawer item={item} onChange={onChange} />

      </div>

      {/* ── Footer ── */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--footer-height)',
        background: 'var(--green)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 10,
      }}>
        <button
          onClick={() => console.log('Print label', item)}
          style={{
            flex: 1,
            background: 'transparent',
            color: 'var(--white)',
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: '0.01em',
          }}
        >
          Print label
        </button>
      </footer>

    </div>
  );
}
