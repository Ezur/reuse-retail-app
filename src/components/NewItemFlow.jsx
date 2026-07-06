import { useState } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { code: 'APP', name: 'Appliances' },
  { code: 'BML', name: 'Building Material and Lumber' },
  { code: 'CAB', name: 'Cabinets and Built-Ins' },
  { code: 'CLO', name: 'Clothing' },
  { code: 'CNT', name: 'Countertops and Tabletops' },
  { code: 'DOR', name: 'Doors' },
  { code: 'FLR', name: 'Flooring and Accessories' },
  { code: 'GDN', name: 'Garden and Outdoor' },
  { code: 'GLS', name: 'Glass, Mirrors, and Glass Block' },
  { code: 'HDW', name: 'Hardware, Tools, Electrical and Misc' },
  { code: 'HVA', name: 'Heating, Ventilation, A/C and Rads' },
  { code: 'HOF', name: 'Home, Office and Commercial Furnishings' },
  { code: 'CJM', name: 'Junction Made' },
];

const SUBCATEGORIES = {
  APP: ['Cooktop', 'Other APP', 'Freezer', 'Microwave', 'Range', 'Range Exhaust Hood', 'Refrigerator', 'Small Appliance', 'Smalls/Not for Erply', 'Wall Oven', 'Washers and Dryers'],
  BML: ['Brick and Block', 'Decking and Fencing', 'Drywall', 'Insulation', 'Lumber', 'Molding and Trim', 'Pipes and Fittings', 'Roofing', 'Siding'],
  CAB: ['Base Cabinet', 'Island', 'Medicine Cabinet', 'Other Cabinet', 'Pantry', 'Vanity', 'Wall Cabinet'],
  CLO: ['Accessories', 'Bottoms', 'Footwear', 'Outerwear', 'Tops'],
  CNT: ['Butcher Block', 'Laminate', 'Marble', 'Other Countertop', 'Solid Surface', 'Table'],
  DOR: ['Bi-Fold', 'Exterior', 'Garage', 'Interior', 'Other Door', 'Patio', 'Pocket', 'Storm'],
  FLR: ['Carpet', 'Hardwood', 'Laminate', 'Other Flooring', 'Tile', 'Vinyl'],
  GDN: ['Fencing', 'Garden Tools', 'Landscaping', 'Outdoor Furniture', 'Planters', 'Pots'],
  GLS: ['Glass Block', 'Mirror', 'Other Glass', 'Window Glass'],
  HDW: ['Electrical', 'Hardware', 'Misc', 'Tools'],
  HVA: ['A/C Unit', 'Boiler', 'Furnace', 'Other HVAC', 'Radiator', 'Thermostat', 'Vent'],
  HOF: ['Bookcase', 'Chair', 'Desk', 'Dresser', 'Other Furnishings', 'Shelving', 'Sofa', 'Table'],
  CJM: ['Junction Made Item'],
};

const STOCK_ITEMS_BY_SUBCATEGORY = {
  Microwave: [
    'Countertop Microwave, Used, Small (ASIS)',
    'Countertop Microwave, Used, Med/Larger (ASIS)',
  ],
  Cooktop: [
    'Electric Cooktop, 30 in., Good (ASIS)',
    'Gas Cooktop, Stainless, Best (ASIS)',
  ],
  Refrigerator: [
    'Refrigerator, Top Freezer, White (ASIS)',
    'Refrigerator, Side by Side (ASIS)',
    'Refrigerator, French Door (ASIS)',
  ],
  'Wall Oven': [
    'Wall Oven, Single, Electric (ASIS)',
    'Wall Oven, Double, Gas (ASIS)',
  ],
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon({ color = '#888' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
      <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Category icon — simple generic icon per category code
function CategoryIcon({ code, size = 20 }) {
  const icons = {
    APP: <path d="M3 6h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6zM3 6l2-3h14l2 3" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/>,
    BML: <><path d="M4 6l8-3 8 3v12l-8 3-8-3V6z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 3v18" stroke="#424242" strokeWidth="1.6"/></>,
    CAB: <><rect x="3" y="4" width="18" height="16" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M3 12h18M12 4v8" stroke="#424242" strokeWidth="1.6"/></>,
    CLO: <path d="M3 6l4-3 5 4 5-4 4 3-3 4v11H6V10L3 6z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/>,
    CNT: <><rect x="2" y="10" width="20" height="4" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M6 14v4M18 14v4" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    DOR: <><rect x="4" y="2" width="16" height="20" rx="1" stroke="#424242" strokeWidth="1.6"/><circle cx="15" cy="12" r="1" fill="#424242"/></>,
    FLR: <><path d="M2 8h20M2 14h20M8 2v20M14 2v20" stroke="#424242" strokeWidth="1.6"/></>,
    GDN: <path d="M12 22V12m0 0C12 6 6 4 3 6c3 1 6 4 6 8m3-8c0-6 6-8 9-6-3 1-6 4-6 8" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/>,
    GLS: <><rect x="5" y="3" width="14" height="18" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M8 7l3 5-3 5" stroke="#424242" strokeWidth="1.4" strokeLinecap="round"/></>,
    HDW: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a6 6 0 0 1-7.5 8L5 20a2 2 0 0 1-3-3l6.7-8.2a6 6 0 0 1 8-2.5z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/>,
    HVA: <><path d="M12 9V3M12 21v-6M3 12h6m6 0h6" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="#424242" strokeWidth="1.6"/></>,
    HOF: <><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" stroke="#424242" strokeWidth="1.6"/><path d="M2 10h20v10H2z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M6 20v2M18 20v2" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    CJM: <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" stroke="#085420" strokeWidth="1.6" fill="none" strokeLinejoin="round"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {icons[code] || <circle cx="12" cy="12" r="9" stroke="#424242" strokeWidth="1.6"/>}
    </svg>
  );
}

// ── Modal shell ───────────────────────────────────────────────────────────────

function ModalShell({ onBack, onClose, title, subtitle, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 200,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '160px 24px 24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16,
          width: '100%', maxWidth: 619,
          maxHeight: '80vh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px 12px',
          borderBottom: '0.558px solid #f3f4f6',
          flexShrink: 0,
        }}>
          <button onClick={onBack} style={btnReset}>
            <BackIcon />
          </button>
          <div style={{
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
            height: 44,
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, color: '#000', margin: 0 }}>
              {title}
            </p>
            {/* Always render subtitle row at fixed height so header doesn't shift between steps */}
            <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: subtitle ? 4 : 0 }}>
              {subtitle}
            </div>
          </div>
          <button onClick={onClose} style={btnReset}>
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Category picker ───────────────────────────────────────────────────

function CategoryStep({ onClose, onSelect }) {
  const [q, setQ] = useState('');
  const filtered = CATEGORIES.filter(c =>
    `${c.name} (${c.code})`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ModalShell
      title="Select a Category"
      subtitle={<span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#595959' }}>Select or search for a category to begin</span>}
      onBack={onClose}
      onClose={onClose}
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search categories"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.map(cat => (
          <button key={cat.code} onClick={() => onSelect(cat)} style={listRow}>
            <CategoryIcon code={cat.code} size={18} />
            <span style={listText}>{cat.name} ({cat.code})</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Step 2: Subcategory picker ────────────────────────────────────────────────

function SubcategoryStep({ category, onBack, onClose, onSelect }) {
  const [q, setQ] = useState('');
  const subs = SUBCATEGORIES[category.code] || [];
  const filtered = subs.filter(s =>
    `${category.code} ${s}`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ModalShell
      title="Select a Subcategory"
      onBack={onBack}
      onClose={onClose}
      subtitle={
        <>
          <CategoryIcon code={category.code} size={14} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#424242' }}>
            {category.name} ({category.code})
          </span>
        </>
      }
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder={`Search ${category.name.toLowerCase()} types`}
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.map(sub => (
          <button key={sub} onClick={() => onSelect(sub)} style={listRow}>
            <span style={listText}>{category.code} {sub}</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Step 3: Stock vs. Reuse ───────────────────────────────────────────────────

function StockOrReuseStep({ category, subcategory, onBack, onClose, onStock, onReuse }) {
  return (
    <ModalShell
      title="How would you like to continue?"
      onBack={onBack}
      onClose={onClose}
      subtitle={
        <>
          <CategoryIcon code={category.code} size={14} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#424242' }}>
            {subcategory}, {category.name} ({category.code})
          </span>
        </>
      }
    >
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Reuse Item */}
        <button onClick={onReuse} style={choiceRow}>
          <div style={choiceIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={choiceTitle}>Create Reuse Item</p>
            <p style={choiceDesc}>This is a special treasure that stands out from our everyday donations.</p>
          </div>
          <ChevronRight />
        </button>

        <div style={{ height: 1, background: '#f3f4f6', margin: '4px 0' }} />

        {/* Stock Item */}
        <button onClick={onStock} style={choiceRow}>
          <div style={choiceIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={choiceTitle}>Search Existing Stock</p>
            <p style={choiceDesc}>View and select from existing stock items to pick from.</p>
          </div>
          <ChevronRight />
        </button>

      </div>
    </ModalShell>
  );
}

// ── Step 4a: Stock item picker ────────────────────────────────────────────────

function StockItemStep({ category, subcategory, onBack, onClose, onSelect }) {
  const [q, setQ] = useState('');
  const items = STOCK_ITEMS_BY_SUBCATEGORY[subcategory] || [];
  const filtered = items.filter(i => i.toLowerCase().includes(q.toLowerCase()));
  return (
    <ModalShell
      title="Select an Existing Stock Item"
      onBack={onBack}
      onClose={onClose}
    >
      <div style={{ padding: '12px 20px 0' }}>
        <div style={searchBar}>
          <SearchIcon />
          <input
            autoFocus
            placeholder="Search for stock items"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={searchInput}
          />
        </div>
      </div>
      <div>
        {filtered.length === 0 && (
          <p style={{ padding: '32px 20px', textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#595959' }}>
            No stock items found for {subcategory}.
          </p>
        )}
        {filtered.map(item => (
          <button key={item} onClick={() => onSelect(item)} style={listRow}>
            <span style={listText}>{item}</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Step 4b: Unique Item Form placeholder ─────────────────────────────────────

function UniqueItemFormStep({ category, subcategory, onBack, onClose }) {
  return (
    <ModalShell
      title="Item Intake Form"
      onBack={onBack}
      onClose={onClose}
      subtitle={
        <>
          <CategoryIcon code={category.code} size={14} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#424242' }}>
            {subcategory}, {category.name} ({category.code})
          </span>
        </>
      }
    >
      <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#d9d9d9" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#d9d9d9" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: '#000', margin: 0 }}>
          Item Intake Form
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#595959', margin: 0, textAlign: 'center' }}>
          Coming soon — further logic TBD
        </p>
      </div>
    </ModalShell>
  );
}

// ── Main export: full flow ────────────────────────────────────────────────────

export default function NewItemFlow({ onClose }) {
  const [step, setStep] = useState('category');
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);

  if (step === 'category') {
    return (
      <CategoryStep
        onClose={onClose}
        onSelect={cat => { setCategory(cat); setStep('subcategory'); }}
      />
    );
  }

  if (step === 'subcategory') {
    return (
      <SubcategoryStep
        category={category}
        onBack={() => setStep('category')}
        onClose={onClose}
        onSelect={sub => { setSubcategory(sub); setStep('type'); }}
      />
    );
  }

  if (step === 'type') {
    return (
      <StockOrReuseStep
        category={category}
        subcategory={subcategory}
        onBack={() => setStep('subcategory')}
        onClose={onClose}
        onStock={() => setStep('stock')}
        onReuse={() => setStep('unique')}
      />
    );
  }

  if (step === 'stock') {
    return (
      <StockItemStep
        category={category}
        subcategory={subcategory}
        onBack={() => setStep('type')}
        onClose={onClose}
        onSelect={() => onClose()}
      />
    );
  }

  if (step === 'unique') {
    return (
      <UniqueItemFormStep
        category={category}
        subcategory={subcategory}
        onBack={() => setStep('type')}
        onClose={onClose}
      />
    );
  }

  return null;
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const btnReset = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

const searchBar = {
  display: 'flex', alignItems: 'center', gap: 8,
  background: '#f0f0f0', border: '0.558px solid #d9d9d9',
  borderRadius: 10, height: 44,
  paddingLeft: 12, paddingRight: 12,
  marginBottom: 8,
};

const searchInput = {
  flex: 1, border: 'none', background: 'transparent', outline: 'none',
  fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#000',
};

const listRow = {
  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
  padding: '14px 20px',
  borderBottom: '0.558px solid #f3f4f6',
  background: 'transparent', border: 'none',
  borderBottom: '0.558px solid #f3f4f6',
  cursor: 'pointer', textAlign: 'left',
};

const listText = {
  fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#000',
};

const choiceRow = {
  width: '100%', display: 'flex', alignItems: 'center', gap: 16,
  padding: '20px 0',
  background: 'transparent', border: 'none',
  cursor: 'pointer', textAlign: 'left',
};

const choiceIcon = {
  width: 48, height: 48, borderRadius: '50%',
  background: '#1a1a1a',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
};

const choiceTitle = {
  fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600,
  color: '#000', margin: '0 0 4px',
};

const choiceDesc = {
  fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#595959', margin: 0,
  lineHeight: 1.4,
};
