import { ItemRecord, ItemType, ConditionTag } from '../types';
import { WebPrepDrawer } from './WebPrepDrawer';
import { CATEGORIES, COLORS_MATERIALS, BRANDS, MODEL_STYLES } from '../data/options';

const CONDITIONS: ConditionTag[] = ['Antique', 'Vintage', 'Salvaged', 'Refurbished', 'Surplus'];

// ── Icons ──────────────────────────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 0L5.585 2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V4C20 2.9 19.1 2 18 2H14.415L12.5 0H7.5ZM10 13C7.79 13 6 11.21 6 9C6 6.79 7.79 5 10 5C12.21 5 14 6.79 14 9C14 11.21 12.21 13 10 13Z" fill="#a2a2a2"/>
    </svg>
  );
}

function ArrowDropDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10L12 15L17 10H7Z" fill="#000000"/>
    </svg>
  );
}

function XmarkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L1 9M1 1L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CloneIcon() {
  return (
    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="9" height="11" rx="1" stroke="white" strokeWidth="1.5"/>
      <path d="M1 1h7v1H2v9H1V1z" fill="white"/>
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 1V13M1 8L6.5 13L12 8M1 17H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="17" fill="#d9d9d9"/>
      <circle cx="17" cy="13" r="5" fill="#9a9890"/>
      <ellipse cx="17" cy="26" rx="9" ry="6" fill="#9a9890"/>
    </svg>
  );
}

// ── Field card container ───────────────────────────────────────────────────────

function FieldCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--light-grey)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      width: '100%',
    }}>
      {children}
    </div>
  );
}

// ── Individual field rows ──────────────────────────────────────────────────────

function SelectRow({
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
    <div style={{
      background: 'var(--white)',
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 16,
      position: 'relative',
      flexShrink: 0,
    }}>
      <select
        value={value}
        onChange={e => onChange({ [fieldKey]: e.target.value })}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        <option value="" disabled hidden>{label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: 14,
        fontWeight: 500,
        color: value ? 'var(--black)' : 'var(--black)',
        flexShrink: 0,
      }}>
        {value || label}
      </span>
      <ArrowDropDown />
    </div>
  );
}

function TextRow({
  label,
  fieldKey,
  item,
  onChange,
  type = 'text',
}: {
  label: string;
  fieldKey: keyof ItemRecord;
  item: Partial<ItemRecord>;
  onChange: (p: Partial<ItemRecord>) => void;
  type?: string;
}) {
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
        type={type}
        inputMode={type === 'number' ? 'decimal' : 'text'}
        placeholder={label}
        value={(item[fieldKey] as string) ?? ''}
        onChange={e => onChange({ [fieldKey]: e.target.value })}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--black)',
          outline: 'none',
          minHeight: '100%',
        }}
      />
    </div>
  );
}

function StyledTextRow({
  label,
  fieldKey,
  item,
  onChange,
  type = 'text',
}: {
  label: string;
  fieldKey: keyof ItemRecord;
  item: Partial<ItemRecord>;
  onChange: (p: Partial<ItemRecord>) => void;
  type?: string;
}) {
  return (
    <div style={{
      background: 'var(--white)',
      height: 48,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      flexShrink: 0,
    }}>
      <input
        type={type}
        inputMode={type === 'number' ? 'decimal' : 'text'}
        placeholder={label}
        value={(item[fieldKey] as string) ?? ''}
        onChange={e => onChange({ [fieldKey]: e.target.value })}
        style={{
          border: 'none',
          background: 'transparent',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--black)',
          outline: 'none',
          width: '100%',
        }}
      />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  item: Partial<ItemRecord>;
  onChange: (patch: Partial<ItemRecord>) => void;
  onReset: () => void;
  onPhotoTap: () => void;
  onSave: () => void;
  onDuplicate: () => void;
}

export function IntakeForm({ item, onChange, onReset, onPhotoTap, onSave, onDuplicate }: Props) {
  const toggleCondition = (tag: ConditionTag) => {
    const current = item.condition ?? [];
    const next = current.includes(tag)
      ? current.filter(c => c !== tag)
      : [...current, tag];
    onChange({ condition: next });
  };

  const setItemType = (t: ItemType) => onChange({ itemType: t });

  const baseFont: React.CSSProperties = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', ...baseFont }}>

      {/* ── Header ── */}
      <header style={{
        background: 'var(--green)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: 42,
        paddingBottom: 20,
        paddingLeft: 32,
        paddingRight: 32,
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Cancel */}
          <button
            onClick={onReset}
            style={{
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 16,
              fontWeight: 700,
              width: 172,
              ...baseFont,
            }}
          >
            <XmarkIcon />
            Cancel
          </button>

          {/* Title */}
          <span style={{ color: 'var(--white)', fontSize: 20, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Warehouse Mode
          </span>

          {/* Clone + Save */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={onDuplicate}
              style={{ color: 'var(--white)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 700, padding: 10, ...baseFont }}
            >
              <CloneIcon />
              Clone
            </button>
            <button
              onClick={onSave}
              style={{ color: 'var(--white)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 700, padding: 10, width: 71, ...baseFont }}
            >
              <SaveIcon />
              Save
            </button>
          </div>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: 'var(--cream)',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 12,
        paddingBottom: 'calc(var(--footer-height) + 12px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>

        {/* ── Donation card ── */}
        <div style={{
          background: 'var(--white)',
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          width: '100%',
        }}>
          <ProfileIcon />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <p style={{ fontSize: 18, margin: 0 }}>
              <span style={{ fontWeight: 700 }}>Donor: </span>
              <span style={{ fontWeight: 500 }}>Anonymous Drop Off Donation</span>
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              <span style={{ fontWeight: 700 }}>Donation#:</span>
              <span style={{ fontWeight: 500 }}> 44188</span>
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              <span style={{ fontWeight: 700 }}>Date:</span>
              <span style={{ fontWeight: 500 }}> 5/31/2026</span>
            </p>
          </div>
        </div>

        {/* ── Stock / Unique ── */}
        <div style={{ display: 'flex', gap: 18, height: 64, width: '100%' }}>
          {(['stock', 'unique'] as ItemType[]).map(t => {
            const active = item.itemType === t;
            return (
              <button
                key={t}
                onClick={() => setItemType(t)}
                style={{
                  flex: 1,
                  background: active ? 'var(--green)' : 'var(--white)',
                  border: `1px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? 'var(--white)' : 'var(--black)',
                  ...baseFont,
                }}
              >
                {t === 'stock' ? 'Stock Item' : 'Unique Item'}
              </button>
            );
          })}
        </div>

        {/* ── Photo ── */}
        <button
          onClick={onPhotoTap}
          style={{
            background: 'var(--white)',
            border: '3px dashed var(--dark-grey)',
            width: '100%',
            height: 121,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <CameraIcon />
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--black)', ...baseFont }}>
            {item.photo ? 'Photo attached — tap to retake' : 'Add Photo'}
          </span>
        </button>

        {/* ── Field group 1: Category / Item Name / Color+Material ── */}
        <FieldCard>
          <SelectRow label="Category"        fieldKey="category"      options={CATEGORIES}      item={item} onChange={onChange} />
          <TextRow   label="Item Name"       fieldKey="name"          item={item} onChange={onChange} />
          <SelectRow label="Color / Material" fieldKey="colorMaterial" options={COLORS_MATERIALS} item={item} onChange={onChange} />
        </FieldCard>

        {/* ── Field group 2: Quantity / Price / Units ── */}
        <FieldCard>
          <StyledTextRow label="Quantity" fieldKey="quantity" item={item} onChange={onChange} type="number" />
          <StyledTextRow label="Price"    fieldKey="price"    item={item} onChange={onChange} type="number" />
          <StyledTextRow label="Units"    fieldKey="units"    item={item} onChange={onChange} />
        </FieldCard>

        {/* ── Field group 3: Brand / Model+Style / Condition ── */}
        <FieldCard>
          <SelectRow label="Brand"        fieldKey="brand"      options={BRANDS}       item={item} onChange={onChange} />
          <SelectRow label="Model / Style" fieldKey="modelStyle" options={MODEL_STYLES}  item={item} onChange={onChange} />

          {/* Condition */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 10 }}>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0, ...baseFont }}>Condition</p>
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
                      fontWeight: active ? 600 : 400,
                      background: active ? 'var(--green)' : 'var(--white)',
                      color: active ? 'var(--white)' : 'var(--black)',
                      border: `1px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                      borderRadius: 999,
                      ...baseFont,
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </FieldCard>

        {/* ── Web Prep ── */}
        <WebPrepDrawer item={item} onChange={onChange} />

      </div>

      {/* ── Footer ── */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--footer-height)',
        background: 'var(--white)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        paddingTop: 18,
        paddingBottom: 19,
        paddingLeft: 55,
        paddingRight: 55,
        zIndex: 10,
      }}>
        {[
          { label: 'Duplicate', action: onDuplicate },
          { label: 'Save',      action: onSave },
          { label: 'Print label', action: () => console.log('Print label', item) },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            style={{
              flex: 1,
              height: 63,
              background: 'var(--mid-grey)',
              color: 'var(--black)',
              fontSize: 16,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderRadius: 0,
              ...baseFont,
            }}
          >
            {label}
          </button>
        ))}
      </footer>

    </div>
  );
}
