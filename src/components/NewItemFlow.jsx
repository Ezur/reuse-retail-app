import { useState } from 'react';
import { CATEGORIES, SUBCATEGORIES, SUB_SUBCATEGORIES } from '../data/taxonomy';

// ── Data ──────────────────────────────────────────────────────────────────────

// Category taxonomy is generated from the client CSV — see src/data/taxonomy.js

// Stock items come from the CSV taxonomy (SUB_SUBCATEGORIES). Known prices
// carry over from the old mock stock list, keyed "CODE::Subcategory::Item";
// anything unlisted pre-fills no price.
const STOCK_PRICES = {
  'APP::Microwave::Countertop': '15.99',
  'APP::Refrigerator::Top Freezer Refrigerator': '149.99',
  'APP::Refrigerator::Side by Side Refrigerator': '189.99',
};

// Stock items for a category/subcategory pair — the CSV's third column
function stockItemsFor(category, subcategory) {
  const leaves = SUB_SUBCATEGORIES[`${category?.code}::${subcategory}`] || [];
  return leaves.map(name => ({
    name,
    price: STOCK_PRICES[`${category.code}::${subcategory}::${name}`] ?? '',
  }));
}

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
    KIT: <><rect x="2" y="6" width="20" height="14" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M2 10h20M7 6V4M12 6V4M17 6V4M7 14h2M11 14h2M15 14h2" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    LIG: <><path d="M9 21h6M12 21v-3" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 3a6 6 0 0 1 6 6c0 2.4-1.4 4.5-3.5 5.5V17H9.5v-2.5C7.4 13.5 6 11.4 6 9a6 6 0 0 1 6-6z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/></>,
    MAS: <><path d="M2 18h20M2 14h20" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/><rect x="4" y="6" width="6" height="8" rx="0.5" stroke="#424242" strokeWidth="1.6"/><rect x="14" y="6" width="6" height="8" rx="0.5" stroke="#424242" strokeWidth="1.6"/><rect x="9" y="10" width="6" height="4" rx="0.5" stroke="#424242" strokeWidth="1.6"/></>,
    MGS: <><path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M12 14v8M8 22h8" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    PLB: <><path d="M5 3v6a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v4" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/><path d="M5 3h4M13 21h4" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    PNT: <><path d="M8 3h8l1 6H7L8 3z" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M7 9l-2 10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1L17 9" stroke="#424242" strokeWidth="1.6" strokeLinejoin="round"/><path d="M10 14h4" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    SHL: <><circle cx="12" cy="12" r="3" stroke="#424242" strokeWidth="1.6"/><path d="M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/></>,
    TIL: <><rect x="3" y="3" width="8" height="8" rx="0.5" stroke="#424242" strokeWidth="1.6"/><rect x="13" y="3" width="8" height="8" rx="0.5" stroke="#424242" strokeWidth="1.6"/><rect x="3" y="13" width="8" height="8" rx="0.5" stroke="#424242" strokeWidth="1.6"/><rect x="13" y="13" width="8" height="8" rx="0.5" stroke="#424242" strokeWidth="1.6"/></>,
    WIN: <><rect x="3" y="3" width="18" height="18" rx="1" stroke="#424242" strokeWidth="1.6"/><path d="M3 12h18M12 3v18" stroke="#424242" strokeWidth="1.6"/></>,
    UNK: <><circle cx="12" cy="12" r="9" stroke="#424242" strokeWidth="1.6"/><path d="M12 8a3 3 0 0 1 2 5.2c-.6.5-1 1.1-1 1.8v.5" stroke="#424242" strokeWidth="1.6" strokeLinecap="round"/><circle cx="12" cy="17.5" r="0.75" fill="#424242"/></>,
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
            <div style={{ height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: subtitle ? 4 : 0 }}>
              {subtitle}
            </div>
          </div>
          <div style={{ width: 32 }} />
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

function CategoryStep({ onDismiss, onCancel, onSelect }) {
  const [q, setQ] = useState('');
  const filtered = CATEGORIES.filter(c =>
    `${c.name} (${c.code})`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ModalShell
      title="Select a Category"
      subtitle={<span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#595959' }}>Select or search for a category to begin</span>}
      onBack={onDismiss}
      onClose={onCancel}
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

function SubcategoryStep({ category, onBack, onCancel, onSelect }) {
  const [q, setQ] = useState('');
  const subs = SUBCATEGORIES[category.code] || [];
  const filtered = subs.filter(s =>
    `${category.code} ${s}`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <ModalShell
      title="Select a Subcategory"
      onBack={onBack}
      onClose={onCancel}
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

function StockOrReuseStep({ category, subcategory, stockAvailable, onBack, onCancel, onStock, onReuse }) {
  return (
    <ModalShell
      title="How would you like to continue?"
      onBack={onBack}
      onClose={onCancel}
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

        <button
          onClick={stockAvailable ? onStock : undefined}
          disabled={!stockAvailable}
          style={{ ...choiceRow, cursor: stockAvailable ? 'pointer' : 'not-allowed', opacity: stockAvailable ? 1 : 0.45 }}
        >
          <div style={choiceIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="1.8"/>
              <path d="M16.5 16.5L21 21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={choiceTitle}>Search Existing Stock</p>
            <p style={choiceDesc}>
              {stockAvailable
                ? 'View and select from existing stock items to pick from.'
                : `No stock items exist for ${subcategory}.`}
            </p>
          </div>
          {stockAvailable && <ChevronRight />}
        </button>
      </div>
    </ModalShell>
  );
}

// ── Step 4a: Stock item picker ────────────────────────────────────────────────

function StockItemStep({ category, subcategory, onBack, onCancel, onSelect }) {
  const [q, setQ] = useState('');
  const items = stockItemsFor(category, subcategory);
  const filtered = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <ModalShell
      title="Select an Existing Stock Item"
      onBack={onBack}
      onClose={onCancel}
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
          <button key={item.name} onClick={() => onSelect(item)} style={listRow}>
            <span style={listText}>{item.name}</span>
          </button>
        ))}
      </div>
    </ModalShell>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function NewItemFlow({
  onDismiss,
  onCancel,
  onComplete,         // { type, category, subcategory, subSubcategory?, stockItem? }
  startStep = 'category',
  startCategory = null,
  startSubcategory = null,
}) {
  const [step, setStep] = useState(startStep);
  const [category, setCategory] = useState(startCategory);
  const [subcategory, setSubcategory] = useState(startSubcategory);

  const hasStock = (cat, sub) => !!(SUB_SUBCATEGORIES[`${cat?.code}::${sub}`]?.length);

  const handleSubSelect = (sub) => {
    setSubcategory(sub);
    setStep('type');
  };

  if (step === 'category') {
    return (
      <CategoryStep
        onDismiss={onDismiss}
        onCancel={onCancel}
        onSelect={cat => { setCategory(cat); setStep('subcategory'); }}
      />
    );
  }

  if (step === 'subcategory') {
    return (
      <SubcategoryStep
        category={category}
        onBack={() => setStep('category')}
        onCancel={onCancel}
        onSelect={handleSubSelect}
      />
    );
  }

  if (step === 'type') {
    return (
      <StockOrReuseStep
        category={category}
        subcategory={subcategory}
        stockAvailable={hasStock(category, subcategory)}
        onBack={() => setStep('subcategory')}
        onCancel={onCancel}
        onStock={() => setStep('stock')}
        onReuse={() => onComplete({ type: 'reuse', category, subcategory, subSubcategory: null })}
      />
    );
  }

  if (step === 'stock') {
    return (
      <StockItemStep
        category={category}
        subcategory={subcategory}
        onBack={() => setStep('type')}
        onCancel={onCancel}
        onSelect={stockItem => onComplete({ type: 'stock', category, subcategory, subSubcategory: null, stockItem })}
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
