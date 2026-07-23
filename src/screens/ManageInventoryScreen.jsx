import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';

import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';
import SortModal from '../components/SortModal';
import FilterModal from '../components/FilterModal';

// ── Mock data ─────────────────────────────────────────────────────────────────

const ITEMS = [
  { id: '1',  name: 'Countertop Microwave - Small - Used, ASIS',     category: 'APP', subcategory: 'Microwave',    qty: 5,  price: 15.99,  created: '05/31/2026', modified: '05/31/2026' },
  { id: '2',  name: 'Electric Cooktop - 30 in. - Good, ASIS',        category: 'APP', subcategory: 'Cooktop',      qty: 2,  price: 49.99,  created: '05/29/2026', modified: '05/31/2026' },
  { id: '3',  name: 'Gas Cooktop - Stainless Steel - Best, ASIS',    category: 'APP', subcategory: 'Cooktop',      qty: 1,  price: 79.99,  created: '05/28/2026', modified: '05/31/2026' },
  { id: '4',  name: 'Refrigerator - Top Freezer - White',            category: 'APP', subcategory: 'Refrigerator', qty: 2,  price: 149.99, created: '05/27/2026', modified: '05/31/2026' },
  { id: '5',  name: 'Electric Range - 30 in. - White',               category: 'APP', subcategory: 'Range',        qty: 1,  price: 179.99, created: '05/26/2026', modified: '05/31/2026' },
  { id: '6',  name: 'Front Load Washer - White',                     category: 'APP', subcategory: 'Washer',       qty: 2,  price: 199.99, created: '05/25/2026', modified: '05/31/2026' },
  { id: '8',  name: 'Wall Cabinet - 30 in. - Oak',                   category: 'CAB', subcategory: 'Cabinet',      qty: 4,  price: 39.99,  created: '05/23/2026', modified: '05/31/2026' },
  { id: '9',  name: 'Bathroom Vanity - 24 in. - White',              category: 'PLB', subcategory: 'Vanity',       qty: 1,  price: 89.99,  created: '05/22/2026', modified: '05/31/2026' },
  { id: '10', name: 'Single Basin Sink - Stainless',                 category: 'PLB', subcategory: 'Sink',         qty: 3,  price: 59.99,  created: '05/21/2026', modified: '05/31/2026' },
  { id: '11', name: 'Ceiling Fan - 52 in. - Bronze',                 category: 'ELC', subcategory: 'Fan',          qty: 2,  price: 74.99,  created: '05/20/2026', modified: '05/31/2026' },
  { id: '12', name: 'Light Fixture - Pendant - Black',               category: 'ELC', subcategory: 'Lighting',     qty: 6,  price: 29.99,  created: '05/19/2026', modified: '05/31/2026' },
  { id: '13', name: 'Exterior Door - 36 in. - Steel',                category: 'DOR', subcategory: 'Exterior',     qty: 1,  price: 189.99, created: '05/18/2026', modified: '05/31/2026' },
  { id: '14', name: 'Interior Door - 30 in. - Pine',                 category: 'DOR', subcategory: 'Interior',     qty: 3,  price: 34.99,  created: '05/17/2026', modified: '05/31/2026' },
  { id: '15', name: 'Hardwood Flooring - Oak - 20 sq ft',            category: 'FLR', subcategory: 'Hardwood',     qty: 5,  price: 24.99,  created: '05/16/2026', modified: '05/31/2026' },
  { id: '16', name: 'Storm Door - 32 in. - White',                   category: 'DOR', subcategory: 'Storm',        qty: 2,  price: 54.99,  created: '05/15/2026', modified: '05/31/2026' },
  { id: '17', name: 'Bathtub - Standard - White',                    category: 'PLB', subcategory: 'Tub',          qty: 1,  price: 119.99, created: '05/14/2026', modified: '05/31/2026' },
  { id: '18', name: 'Toilet - Round - White',                        category: 'PLB', subcategory: 'Toilet',       qty: 2,  price: 64.99,  created: '05/13/2026', modified: '05/31/2026' },
  { id: '19', name: 'Laminate Flooring - Grey - 30 sq ft',           category: 'FLR', subcategory: 'Laminate',     qty: 3,  price: 19.99,  created: '05/12/2026', modified: '05/31/2026' },
  { id: '20', name: 'Paint - Interior Latex - White - 1 Gal',        category: 'PNT', subcategory: 'Paint',        qty: 8,  price: 12.99,  created: '05/11/2026', modified: '05/31/2026' },
  { id: '21', name: 'Upper Cabinet - 12 in. - White',                category: 'CAB', subcategory: 'Cabinet',      qty: 6,  price: 29.99,  created: '05/10/2026', modified: '05/31/2026' },
];

const CATEGORIES = [
  { code: 'APP', label: 'Appliances' },
  { code: 'CAB', label: 'Cabinets' },
  { code: 'DOR', label: 'Doors & Windows' },
  { code: 'ELC', label: 'Electrical' },
  { code: 'FLR', label: 'Flooring' },
  { code: 'FRN', label: 'Furniture' },
  { code: 'HWD', label: 'Hardware' },
  { code: 'LTG', label: 'Lighting' },
  { code: 'PLB', label: 'Plumbing' },
  { code: 'PNT', label: 'Paint' },
  { code: 'RFG', label: 'Roofing' },
  { code: 'TLS', label: 'Tools' },
  { code: 'FXR', label: 'Fixtures' },
];

const ROWS_PER_PAGE = 20;

// ── Icons ─────────────────────────────────────────────────────────────────────

function CameraPlaceholder() {
  return (
    <div style={{ width: 48, height: 48, flexShrink: 0, background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#a2a2a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke="#a2a2a2" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

function SearchIcon({ color = '#888', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2"/>
      <path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function QrIcon({ color = '#000', size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8"/>
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8"/>
      <rect x="5" y="5" width="3" height="3" fill={color}/>
      <rect x="16" y="5" width="3" height="3" fill={color}/>
      <rect x="5" y="16" width="3" height="3" fill={color}/>
      <path d="M14 14h2v2h-2zM18 14h3v2h-3zM14 18h3v3h-3zM19 18h2v3h-2z" fill={color}/>
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 5l7 8v6l4-2V13L21 5H3z" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M7 12h10M11 18h2" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function HomeIcon({ active }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke={active ? '#D65737' : '#000'} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke={active ? '#D65737' : '#000'} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function InventoryIcon({ active, color }) {
  const stroke = color ?? (active ? '#D65737' : '#424242');
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="5" rx="1" stroke={stroke} strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="5" rx="1" stroke={stroke} strokeWidth="1.8"/>
      <rect x="3" y="11" width="7" height="5" rx="1" stroke={stroke} strokeWidth="1.8"/>
      <rect x="14" y="11" width="7" height="5" rx="1" stroke={stroke} strokeWidth="1.8"/>
      <path d="M3 19h18" stroke={stroke} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronRight({ color = '#424242', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeft({ disabled }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke={disabled ? '#ccc' : '#424242'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CloseIcon({ size = 16, color = '#424242' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CategoryIcon({ code }) {
  const iconMap = {
    APP: <path d="M3 6h18v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6zM3 6l1-3h16l1 3M9 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    CAB: <><rect x="3" y="4" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="12" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/><path d="M10 8h4M10 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    DOR: <><rect x="4" y="2" width="13" height="20" rx="1" stroke="currentColor" strokeWidth="1.8"/><circle cx="14" cy="12" r="1.2" fill="currentColor"/></>,
    ELC: <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    FLR: <><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 2v20M16 2v20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round"/></>,
    FRN: <><rect x="3" y="10" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="1.8"/><path d="M5 10V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M7 18v3M17 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    HWD: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.77z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    LTG: <><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    PLB: <><path d="M12 2v8M12 18v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h6M16 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    PNT: <><path d="M3 3h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3z" stroke="currentColor" strokeWidth="1.8"/><path d="M12 17v4M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
    RFG: <path d="M2 12L12 3l10 9M4 10v10a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    TLS: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.77z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    FXR: <><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: '#424242', flexShrink: 0 }}>
      {iconMap[code] || iconMap['APP']}
    </svg>
  );
}

// ── Item row ──────────────────────────────────────────────────────────────────

function ItemRow({ item, onClick, isMobile }) {
  if (isMobile) {
    return (
      <button
        onClick={onClick}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          padding: '12px 16px', border: 'none', borderBottom: '0.558px solid #f3f4f6',
          background: 'transparent', cursor: 'pointer', textAlign: 'left', gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, fontWeight: 700, color: '#fff', background: '#595959', borderRadius: 4, padding: '1px 6px' }}>{item.category}</span>
            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: '#595959' }}>{item.subcategory}</span>
            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: '#595959' }}>· Qty {item.qty}</span>
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 700, color: '#000', margin: 0 }}>${item.price.toFixed(2)}</p>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 11, color: '#595959', margin: 0 }}>/each</p>
        </div>
        <ChevronRight />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center',
        paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12,
        border: 'none', borderBottom: '0.558px solid #f3f4f6',
        background: 'transparent', cursor: 'pointer', textAlign: 'left', gap: 20,
      }}
    >
      <div style={{ flex: 1, minWidth: 140 }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1.35 }}>
          {item.name}
        </p>
      </div>
      <p style={{ ...s.cell, width: 48, fontWeight: 700, color: '#000' }}>{item.category}</p>
      <p style={{ ...s.cell, width: 32, textAlign: 'center' }}>{item.qty}</p>
      <p style={{ ...s.cell, width: 96 }}>
        <span style={{ fontWeight: 700 }}>${item.price.toFixed(2)}</span>
        <span style={{ color: '#595959' }}>/each</span>
      </p>
      <p style={{ ...s.cell, width: 80, color: '#424242' }}>{item.created}</p>
      <div style={{ flexShrink: 0 }}><ChevronRight /></div>
    </button>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function TableControls({ total, page, totalPages, rowsPerPage, onPage }) {
  const start = total === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, total);
  const pageNums = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, '…', totalPages];
    if (page >= totalPages - 3) return [1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '…', page - 1, page, page + 1, '…', totalPages];
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '0.558px solid #f3f4f6', padding: '12px 16px', flexWrap: 'wrap', gap: 8 }}>
      <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>
        Showing {start}–{end} of {total} items.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={{ ...s.pageBtn, opacity: page === 1 ? 0.3 : 1 }}><ChevronLeft disabled={page === 1} /></button>
        {pageNums().map((n, i) =>
          n === '…'
            ? <span key={`e-${i}`} style={s.ellipsis}>…</span>
            : <button key={n} onClick={() => onPage(n)} style={{ ...s.pageBtn, background: n === page ? '#595959' : 'transparent', color: n === page ? '#fff' : '#424242' }}>{n}</button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={{ ...s.pageBtn, opacity: page === totalPages ? 0.3 : 1 }}><ChevronRight color={page === totalPages ? '#ccc' : '#424242'} size={12} /></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0 }}>Rows per page:</p>
        <div style={{ border: '0.558px solid #d9d9d9', borderRadius: 4, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#595959' }}>{rowsPerPage}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────

function BottomNav({ onHome, onCycleCount, maxWidth }) {
  return (
    <div style={s.bottomNav}>
      <div style={{ ...s.bottomNavInner, maxWidth }}>
        <button onClick={onHome} style={s.navBtn}>
          <HomeIcon />
          <span style={s.navBtnLabel}>Home</span>
        </button>
        <button onClick={onCycleCount} style={{ ...s.navBtn, background: '#D65737', border: '1px solid #D65737' }}>
          <InventoryIcon active color="#fff" />
          <span style={{ ...s.navBtnLabel, color: '#fff' }}>Cycle Count</span>
        </button>
      </div>
    </div>
  );
}

// ── Sort options ──────────────────────────────────────────────────────────────

const INVENTORY_SORT_OPTIONS = [
  { label: 'Item Name', field: 'name' },
  { label: 'Category', field: 'category' },
  { label: 'Subcategory', field: 'subcategory' },
  { label: 'Quantity', field: 'qty' },
  { label: 'Price', field: 'price' },
  { label: 'Created', field: 'created' },
];

// ── Category Filter Modal ─────────────────────────────────────────────────────

function CategoryFilterModal({ onClose, onSelect, selectedCategory }) {
  const [search, setSearch] = useState('');
  const filtered = CATEGORIES.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={s.modalHeader}>
          <button onClick={onClose} style={s.modalBackBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p style={s.modalTitle}>Filter by Category</p>
          <button onClick={onClose} style={s.modalCloseBtn}><CloseIcon /></button>
        </div>

        {/* Search */}
        <div style={s.modalSearch}>
          <SearchIcon color="#888" size={18} />
          <input
            autoFocus
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15, color: '#000' }}
          />
        </div>

        {/* Category list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(cat => (
            <button
              key={cat.code}
              onClick={() => onSelect(cat.code)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 24px', border: 'none', borderBottom: '0.558px solid #f3f4f6',
                background: selectedCategory === cat.code ? '#fff8f6' : 'transparent',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CategoryIcon code={cat.code} />
              </div>
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: selectedCategory === cat.code ? 700 : 400, color: selectedCategory === cat.code ? '#D65737' : '#000', margin: 0, flex: 1 }}>
                {cat.label}
              </p>
              <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#888' }}>{cat.code}</span>
              {selectedCategory === cat.code && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#D65737" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        {selectedCategory && (
          <div style={{ padding: '12px 24px', borderTop: '0.558px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={() => onSelect(null)} style={{ ...s.modalActionBtn, background: '#f0f0f0', color: '#424242' }}>Clear</button>
            <button onClick={onClose} style={{ ...s.modalActionBtn, background: '#D65737', color: '#fff' }}>Apply</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Subcategory Filter Modal ──────────────────────────────────────────────────

function SubcategoryFilterModal({ categoryCode, onBack, onClose, onSelect, selectedSubcategory }) {
  const [search, setSearch] = useState('');
  const allSubcats = [...new Set(ITEMS.filter(i => !categoryCode || i.category === categoryCode).map(i => i.subcategory))].sort();
  const filtered = allSubcats.filter(sc => sc.toLowerCase().includes(search.toLowerCase()));
  const catLabel = CATEGORIES.find(c => c.code === categoryCode)?.label || 'All Categories';

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={s.modalHeader}>
          <button onClick={onBack} style={s.modalBackBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p style={s.modalTitle}>Filter by Subcategory</p>
          <button onClick={onClose} style={s.modalCloseBtn}><CloseIcon /></button>
        </div>

        <div style={{ padding: '8px 24px', borderBottom: '0.558px solid #f3f4f6' }}>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#888' }}>Category: </span>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, fontWeight: 700, color: '#D65737' }}>{catLabel}</span>
        </div>

        <div style={s.modalSearch}>
          <SearchIcon color="#888" size={18} />
          <input
            autoFocus
            type="text"
            placeholder="Search subcategories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15, color: '#000' }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(sub => (
            <button
              key={sub}
              onClick={() => onSelect(sub)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 24px', border: 'none', borderBottom: '0.558px solid #f3f4f6',
                background: selectedSubcategory === sub ? '#fff8f6' : 'transparent',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: selectedSubcategory === sub ? 700 : 400, color: selectedSubcategory === sub ? '#D65737' : '#000', margin: 0, flex: 1 }}>
                {sub}
              </p>
              {selectedSubcategory === sub && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#D65737" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          ))}
        </div>

        {selectedSubcategory && (
          <div style={{ padding: '12px 24px', borderTop: '0.558px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={() => onSelect(null)} style={{ ...s.modalActionBtn, background: '#f0f0f0', color: '#424242' }}>Clear</button>
            <button onClick={onClose} style={{ ...s.modalActionBtn, background: '#D65737', color: '#fff' }}>Apply</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Stock Item Search Modal ───────────────────────────────────────────────────

function StockItemSearchModal({ onClose, onSelect, selectedItem }) {
  const [search, setSearch] = useState('');
  const stockItems = ITEMS.filter(i =>
    !search || i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={s.modalHeader}>
          <button onClick={onClose} style={s.modalBackBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <p style={s.modalTitle}>Search by Item Name</p>
          <button onClick={onClose} style={s.modalCloseBtn}><CloseIcon /></button>
        </div>

        <div style={s.modalSearch}>
          <SearchIcon color="#888" size={18} />
          <input
            autoFocus
            type="text"
            placeholder="Search items by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15, color: '#000' }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {stockItems.map(item => (
            <button
              key={item.id}
              onClick={() => onSelect(item.name)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 24px', border: 'none', borderBottom: '0.558px solid #f3f4f6',
                background: selectedItem === item.name ? '#fff8f6' : 'transparent',
                cursor: 'pointer', textAlign: 'left',
              }}
            >
                    <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: selectedItem === item.name ? 700 : 400, color: selectedItem === item.name ? '#D65737' : '#000', margin: 0, lineHeight: 1.4 }}>
                  {item.name}
                </p>
                <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: '#595959', margin: '2px 0 0' }}>
                  {item.category} · {item.subcategory}
                </p>
              </div>
              {selectedItem === item.name && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#D65737" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          ))}
          {stockItems.length === 0 && (
            <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#888', textAlign: 'center', padding: '32px 0' }}>No items match your search.</p>
          )}
        </div>

        {selectedItem && (
          <div style={{ padding: '12px 24px', borderTop: '0.558px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={() => onSelect(null)} style={{ ...s.modalActionBtn, background: '#f0f0f0', color: '#424242' }}>Clear</button>
            <button onClick={onClose} style={{ ...s.modalActionBtn, background: '#D65737', color: '#fff' }}>Apply</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function ManageInventoryScreen() {
  const navigate = useNavigate();
  const { maxWidth, headerHeight, px, isMobile } = useLayout();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filterCategories, setFilterCategories] = useState(new Set());

  const [activeModal, setActiveModal] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortField, setSortField] = useState(null);

  const filtered = ITEMS.filter(item => {
    const matchSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategories.size === 0 || filterCategories.has(item.category);
    return matchSearch && matchCat && item.qty > 0;
  });

  const sorted = sortField ? [...filtered].sort((a, b) => {
    const va = a[sortField], vb = b[sortField];
    if (sortField === 'qty' || sortField === 'price') return va - vb;
    if (sortField === 'created' || sortField === 'modified') {
      const toMs = s => { const [m, d, y] = s.split('/'); return new Date(y, m - 1, d).getTime(); };
      return toMs(va) - toMs(vb);
    }
    return String(va).localeCompare(String(vb));
  }) : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = sorted.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handlePage = (n) => setPage(Math.max(1, Math.min(n, totalPages)));

  const activeFilterCount = filterCategories.size;
  const activeFilters = [
    ...[...filterCategories].map(v => ({ key: v, label: CATEGORIES.find(c => c.code === v)?.label || v, onClear: () => { const s = new Set(filterCategories); s.delete(v); setFilterCategories(s); setPage(1); } })),
  ];

  const clearAllFilters = () => { setFilterCategories(new Set()); setPage(1); };
  const toggleCat = v => setFilterCategories(prev => { const s = new Set(prev); s.has(v) ? s.delete(v) : s.add(v); return s; });

  return (
    <div style={s.page}>
      {/* ── Header ── */}
      <header style={{ ...s.header, height: headerHeight, paddingLeft: px, paddingRight: px }}>
        <BackButton onClick={() => navigate('/mode-select')} />
        <img src={CJ_LOGO} alt="Construction Junction" style={s.logo} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ ...s.main, maxWidth, padding: `16px ${px}px 24px` }}>

        <h1 style={s.pageTitle}>All Items</h1>

        {/* Items table */}
        <div style={s.tableCard}>

          {/* Toolbar */}
          <div style={{ ...s.toolbar, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <div style={{ ...s.searchWrapper, minWidth: isMobile ? '100%' : 200 }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search by name, category, or UPC/barcode"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                style={s.searchInput}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, width: isMobile ? '100%' : undefined, flexShrink: 0 }}>
              <button style={{ ...s.toolBtn, flex: isMobile ? 1 : undefined }}>
                <QrIcon size={18} color="#424242" />
                {!isMobile && <span style={s.toolBtnLabel}>Scan QR Code</span>}
              </button>
              <button
                style={{ ...s.toolBtn, flex: isMobile ? 1 : undefined, borderColor: activeFilterCount > 0 ? '#D65737' : '#d9d9d9', background: activeFilterCount > 0 ? '#fff8f6' : '#f0f0f0' }}
                onClick={() => setShowFilterModal(true)}
              >
                <FilterIcon />
                <span style={{ ...s.toolBtnLabel, color: activeFilterCount > 0 ? '#D65737' : '#000' }}>Filter</span>
                {activeFilterCount > 0 && (
                  <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: '#D65737', color: '#fff', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{activeFilterCount}</span>
                )}
              </button>
              <button style={{ ...s.toolBtn, flex: isMobile ? 1 : undefined, borderColor: sortField ? '#D65737' : '#d9d9d9', background: sortField ? '#fff8f6' : '#f0f0f0' }} onClick={() => setActiveModal('sort')}>
                <SortIcon />
                <span style={{ ...s.toolBtnLabel, color: sortField ? '#D65737' : '#000' }}>Sort</span>
                {sortField && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#D65737" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div style={{ display: 'flex', gap: 6, padding: '10px 16px', background: '#fafafa', borderBottom: '0.558px solid #f3f4f6', flexWrap: 'wrap', alignItems: 'center' }}>
              {activeFilters.map((chip, i) => (
                <button key={i} onClick={chip.onClear} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', borderRadius: 6, border: '1px solid #f0c8be', background: '#fff8f6', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, fontWeight: 500, color: '#D65737', cursor: 'pointer' }}>
                  {chip.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#D65737" strokeWidth="2.2" strokeLinecap="round"/></svg>
                </button>
              ))}
              <button onClick={clearAllFilters} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', borderRadius: 6, border: '1px solid #d1d5dc', background: 'transparent', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#888', cursor: 'pointer' }}>
                Clear all
              </button>
            </div>
          )}


          {/* Column headers — tablet only */}
          {!isMobile && (
            <div style={s.tableHeader}>
              {[
                { label: 'Item Name',   field: 'name',        flex: true },
                { label: 'Category',    field: 'category',    width: 48  },
                { label: 'Qty',         field: 'qty',         width: 32 },
                { label: 'Price',       field: 'price',       width: 96  },
                { label: 'Created',     field: 'created',     width: 80  },
              ].map(col => (
                <span key={col.field} style={{ ...s.headerCell, ...(col.flex ? { flex: 1 } : { width: col.width }), textAlign: col.center ? 'center' : undefined, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {col.label}
                  {sortField === col.field && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" stroke="#D65737" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
              ))}
              <span style={{ width: 14, flexShrink: 0 }} />
            </div>
          )}

          {/* Table rows */}
          <div>
            {pageRows.length === 0
              ? <p style={s.emptyText}>No items match your search or filters.</p>
              : pageRows.map(item => <ItemRow key={item.id} item={item} isMobile={isMobile} onClick={() => navigate(`/donor/${item.donorId ?? 'retail'}/item/${item.id}`, { state: { item, mode: 'manage' } })} />)
            }
          </div>

          {/* Pagination */}
          <TableControls
            total={filtered.length}
            page={safePage}
            totalPages={totalPages}
            rowsPerPage={ROWS_PER_PAGE}
            onPage={handlePage}
          />
        </div>

      </main>

      {/* ── Bottom nav ── */}
      <BottomNav onHome={() => navigate('/mode-select')} onCycleCount={() => navigate('/cycle-count')} maxWidth={maxWidth} />

      {/* ── Filter modal ── */}
      {showFilterModal && (
        <FilterModal
          title="Filter Items"
          color="#D65737"
          resultCount={filtered.length}
          onClose={() => setShowFilterModal(false)}
          onClearAll={clearAllFilters}
          onApply={() => { setPage(1); setShowFilterModal(false); }}
          sections={[
            { type: 'pills', label: 'Category', options: CATEGORIES.map(c => ({ value: c.code, label: c.label })), selected: filterCategories, onToggle: toggleCat },
          ]}
        />
      )}
      {activeModal === 'sort' && (
        <SortModal
          title="Sort Items"
          options={INVENTORY_SORT_OPTIONS}
          selected={sortField}
          onClose={() => setActiveModal(null)}
          onSelect={(field) => { setSortField(field); setActiveModal(null); }}
        />
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: '100dvh', background: '#ffffff',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, sans-serif",
    paddingBottom: 80,
  },
  header: {
    height: 108, background: '#D65737',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingLeft: 26, paddingRight: 26, paddingBottom: 16,
    flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
  },
  backBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
  },
  backArrow: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 26, fontWeight: 700, color: '#ffffff', lineHeight: 1 },
  backLabel: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#ffffff', lineHeight: 1 },
  logo: { height: 52, width: 'auto', objectFit: 'contain' },
  main: {
    flex: 1, display: 'flex', flexDirection: 'column', gap: 16,
    padding: '16px 32px 24px', width: '100%', maxWidth: 834, alignSelf: 'center', boxSizing: 'border-box',
  },
  pageTitle: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 18, fontWeight: 700, color: '#000', margin: 0 },
  tableCard: { background: '#ffffff', border: '0.558px solid #d9d9d9', borderRadius: 14, overflow: 'clip' },
  toolbar: {
    display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
    padding: '12px 8px', borderBottom: '0.558px solid #f3f4f6',
  },
  searchWrapper: {
    display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200,
    height: 44, background: '#f0f0f0', border: '0.558px solid #d9d9d9', borderRadius: 10,
    paddingLeft: 12, paddingRight: 12,
  },
  searchInput: {
    flex: 1, border: 'none', background: 'transparent', outline: 'none',
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000',
  },
  toolBtn: {
    height: 44, display: 'flex', alignItems: 'center', gap: 6,
    background: '#f0f0f0', border: '0.558px solid #d9d9d9', borderRadius: 10,
    paddingLeft: 12, paddingRight: 12, cursor: 'pointer', flexShrink: 0,
  },
  toolBtnLabel: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' },
  tableHeader: {
    display: 'flex', alignItems: 'center', padding: '10px 16px',
    background: '#fafafa', borderBottom: '0.558px solid #f3f4f6', gap: 20,
  },
  headerCell: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, fontWeight: 500, color: '#595959', flexShrink: 0, whiteSpace: 'nowrap' },
  cell: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#000', margin: 0, flexShrink: 0 },
  emptyText: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', textAlign: 'center', padding: '32px 0', margin: 0 },
  pageBtn: {
    width: 36, height: 36, border: '0.558px solid #d9d9d9', borderRadius: 6,
    background: 'transparent', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#424242',
  },
  ellipsis: { width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959' },
  bottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, background: '#ffffff', borderTop: '0.558px solid #f3f4f6', zIndex: 10 },
  bottomNavInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 32px', maxWidth: 834, margin: '0 auto' },
  navBtn: {
    flex: 'none', width: 172.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    background: '#fff', border: '0.558px solid #d9d9d9', borderRadius: 10,
    padding: '10px 0', height: 52, cursor: 'pointer',
  },
  navBtnLabel: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' },
  // Modal
  modalOverlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  modal: {
    background: '#fff', borderRadius: 16, width: '100%', maxWidth: 620, maxHeight: '80vh',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  modalHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 20px', borderBottom: '0.558px solid #f3f4f6', flexShrink: 0,
  },
  modalTitle: { fontFamily: "'Helvetica Neue', sans-serif", fontSize: 17, fontWeight: 700, color: '#000', margin: 0 },
  modalBackBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' },
  modalCloseBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' },
  modalSearch: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 20px', borderBottom: '0.558px solid #f3f4f6', flexShrink: 0,
    background: '#f9f9f9',
  },
  modalActionBtn: {
    height: 40, paddingLeft: 20, paddingRight: 20, border: 'none', borderRadius: 8,
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 600,
    cursor: 'pointer',
  },
};
