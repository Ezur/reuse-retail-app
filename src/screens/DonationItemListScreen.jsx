import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';

import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import AnonymousDonorAvatar from '../assets/AnonymousDonorAvatar.svg';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';
import SortModal from '../components/SortModal';
import FilterModal from '../components/FilterModal';
import NewItemFlow from '../components/NewItemFlow';

const ITEM_SORT_OPTIONS = [
  { label: 'Item Name', field: 'name' },
  { label: 'Category', field: 'category' },
  { label: 'Subcategory', field: 'subcategory' },
  { label: 'Quantity', field: 'qty' },
  { label: 'Price', field: 'price' },
  { label: 'Created', field: 'created' },
  { label: 'Modified', field: 'modified' },
];

// ── Mock data ─────────────────────────────────────────────────────────────────

const DONOR_INFO = {
  name: 'Anonymous Donor Drop-Off',
  donorNumber: '44188',
  date: '05/31/2026',
  isOrg: false,
};

const ITEMS = [
  { id: '1',  name: 'Countertop Microwave - Small - Used, ASIS', category: 'APP', subcategory: 'Microwave',    qty: 5, price: 15.99,  created: '05/31/2026', modified: '05/31/2026' },
  { id: '2',  name: 'Electric Cooktop - 30 in. - Good, ASIS',   category: 'APP', subcategory: 'Cooktop',      qty: 2, price: 49.99,  created: '5/29/2026',  modified: '05/31/2026' },
  { id: '3',  name: 'Gas Cooktop - Stainless Steel - Best, ASIS',category: 'APP', subcategory: 'Cooktop',      qty: 1, price: 79.99,  created: '5/28/2026',  modified: '05/31/2026' },
  { id: '4',  name: 'Refrigerator - Top Freezer - White',        category: 'APP', subcategory: 'Refrigerator', qty: 2, price: 149.99, created: '5/27/2026',  modified: '05/31/2026' },
  { id: '5',  name: 'Electric Range - 30 in. - White',           category: 'APP', subcategory: 'Refrigerator', qty: 1, price: 179.99, created: '5/26/2026',  modified: '05/31/2026' },
  { id: '6',  name: 'Front Load Washer - White',                 category: 'APP', subcategory: 'Refrigerator', qty: 2, price: 199.99, created: '5/25/2026',  modified: '05/31/2026' },
  { id: '8',  name: 'Wall Cabinet - 30 in. - Oak',               category: 'CAB', subcategory: 'Cabinet',      qty: 4, price: 39.99,  created: '5/23/2026',  modified: '05/31/2026' },
  { id: '9',  name: 'Bathroom Vanity - 24 in. - White',          category: 'PLB', subcategory: 'Vanity',       qty: 1, price: 89.99,  created: '5/22/2026',  modified: '05/31/2026' },
  { id: '10', name: 'Single Basin Sink - Stainless',             category: 'PLB', subcategory: 'Sink',         qty: 3, price: 59.99,  created: '5/21/2026',  modified: '05/31/2026' },
  { id: '11', name: 'Ceiling Fan - 52 in. - Bronze',             category: 'ELC', subcategory: 'Fan',          qty: 2, price: 74.99,  created: '5/20/2026',  modified: '05/31/2026' },
  { id: '12', name: 'Light Fixture - Pendant - Black',           category: 'ELC', subcategory: 'Lighting',     qty: 6, price: 29.99,  created: '5/19/2026',  modified: '05/31/2026' },
  { id: '13', name: 'Exterior Door - 36 in. - Steel',            category: 'DOR', subcategory: 'Exterior',     qty: 1, price: 189.99, created: '5/18/2026',  modified: '05/31/2026' },
  { id: '14', name: 'Interior Door - 30 in. - Pine',             category: 'DOR', subcategory: 'Interior',     qty: 3, price: 34.99,  created: '5/17/2026',  modified: '05/31/2026' },
  { id: '15', name: 'Hardwood Flooring - Oak - 20 sq ft',        category: 'FLR', subcategory: 'Hardwood',     qty: 5, price: 24.99,  created: '5/16/2026',  modified: '05/31/2026' },
  { id: '19', name: 'Storm Door - 32 in. - White',               category: 'DOR', subcategory: 'Storm',        qty: 2, price: 54.99,  created: '5/12/2026',  modified: '05/31/2026' },
  { id: '20', name: 'Bathtub - Standard - White',                category: 'PLB', subcategory: 'Tub',          qty: 1, price: 119.99, created: '5/11/2026',  modified: '05/31/2026' },
  { id: '21', name: 'Toilet - Round - White',                    category: 'PLB', subcategory: 'Toilet',       qty: 2, price: 64.99,  created: '5/10/2026',  modified: '05/31/2026' },
];

const ROWS_PER_PAGE = 20;

// ── Icons ─────────────────────────────────────────────────────────────────────

function CameraPlaceholder() {
  return (
    <div style={{
      width: 52, height: 52, flexShrink: 0,
      background: '#f0f0f0', borderRadius: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#a2a2a2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" stroke="#a2a2a2" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#085420" strokeWidth="1.8" strokeLinejoin="round"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="#085420" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="#085420" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2"/>
      <path d="M16.5 16.5L21 21" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function QrIcon({ color = '#000', size = 20 }) {
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

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
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

// ── Donor summary card ────────────────────────────────────────────────────────

function DonorSummaryCard({ info, totalItems, totalCost, isMobile }) {
  return (
    <div style={{
      border: '0.558px solid #d9d9d9', borderRadius: 14,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      gap: 12, background: '#ffffff',
    }}>
      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
        <img
          src={AnonymousDonorAvatar}
          alt=""
          width={isMobile ? 44 : 56} height={isMobile ? 44 : 56}
          style={{ borderRadius: '50%', flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: isMobile ? 16 : 18, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1.3 }}>
            {info.name}
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#424242', margin: '4px 0 0' }}>
            D# {info.donorNumber}&nbsp;&nbsp;|&nbsp;&nbsp;{info.date}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0, paddingLeft: isMobile ? 58 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'center' }}>
          <BoxIcon />
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 18, fontWeight: 700, color: '#000', margin: 0 }}>
              {totalItems}
            </p>
            <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: '#595959', margin: 0 }}>
              Total Items
            </p>
          </div>
        </div>
        <div style={{ width: 1, height: 40, background: '#d9d9d9', flexShrink: 0 }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 18, fontWeight: 700, color: '#000', margin: 0 }}>
            ${totalCost.toFixed(2)}
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: '#595959', margin: 0 }}>
            Total Cost
          </p>
        </div>
      </div>
    </div>
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
          background: 'transparent', cursor: 'pointer', textAlign: 'left', gap: 20,
        }}
      >
        <CameraPlaceholder />
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
        width: '100%',
        display: 'flex', alignItems: 'center',
        paddingLeft: 8, paddingRight: 8, paddingTop: 12, paddingBottom: 12,
        border: 'none', borderBottom: '0.558px solid #f3f4f6',
        background: 'transparent', cursor: 'pointer', textAlign: 'left',
        gap: 12,
      }}
    >
      <CameraPlaceholder />
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.name}
        </p>
      </div>
      <p style={{ ...styles.cell, width: 48, fontWeight: 700, color: '#000' }}>{item.category}</p>
      <p style={{ ...styles.cell, width: 90 }}>{item.subcategory}</p>
      <p style={{ ...styles.cell, width: 32, textAlign: 'center' }}>{item.qty}</p>
      <p style={{ ...styles.cell, width: 96 }}>
        <span style={{ fontWeight: 700 }}>${item.price.toFixed(2)}</span>
        <span style={{ color: '#595959' }}>/each</span>
      </p>
      <p style={{ ...styles.cell, width: 80, color: '#424242' }}>{item.created}</p>
      <p style={{ ...styles.cell, width: 80, color: '#424242' }}>{item.modified}</p>
      <div style={{ flexShrink: 0 }}><ChevronRight /></div>
    </button>
  );
}

// ── Pagination bar ────────────────────────────────────────────────────────────

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
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: '0.558px solid #f3f4f6',
      padding: '12px 16px', flexWrap: 'wrap', gap: 8,
    }}>
      <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>
        Showing {start}–{end} of {total} items.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => onPage(page - 1)} disabled={page === 1} style={{ ...styles.pageBtn, opacity: page === 1 ? 0.3 : 1 }}>
          <ChevronLeft disabled={page === 1} />
        </button>
        {pageNums().map((n, i) =>
          n === '…'
            ? <span key={`e-${i}`} style={styles.ellipsis}>…</span>
            : <button key={n} onClick={() => onPage(n)} style={{ ...styles.pageBtn, background: n === page ? '#595959' : 'transparent', color: n === page ? '#fff' : '#424242' }}>{n}</button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages} style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.3 : 1 }}>
          <ChevronRight color={page === totalPages ? '#ccc' : '#424242'} size={12} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>Rows per page:</p>
        <div style={{ border: '0.558px solid #d9d9d9', borderRadius: 4, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#595959' }}>{rowsPerPage}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────

function BottomNav({ onHome, onScanQr, onNewDonation, maxWidth }) {
  return (
    <div style={styles.bottomNav}>
      <div style={{ ...styles.bottomNavInner, maxWidth }}>
        <button onClick={onHome} style={styles.navBtn}>
          <HomeIcon />
          <span style={styles.navBtnLabel}>Home</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 21 }}>
          <button onClick={onScanQr} style={styles.navBtn}>
            <QrIcon size={16} />
            <span style={styles.navBtnLabel}>Scan QR Code</span>
          </button>
          <button onClick={onNewDonation} style={{ ...styles.navBtn, background: '#085420', border: '1px solid #085420' }}>
            <PlusIcon />
            <span style={{ ...styles.navBtnLabel, color: '#ffffff' }}>New Donation</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function DonationItemListScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { maxWidth, headerHeight, px, isMobile } = useLayout();

  const donor = location.state ?? DONOR_INFO;
  const donorInfo = {
    name: donor.name,
    donorNumber: donor.donorNumber,
    date: donor.date,
    isOrg: donor.type === 'Shared Revenue',
  };
  const donorItemCount = donor.items ?? ITEMS.length;
  const donorItems = ITEMS.slice(0, donorItemCount);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showNewItemFlow, setShowNewItemFlow] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [filterCategories, setFilterCategories] = useState(new Set());
  const [filterHasPrice, setFilterHasPrice] = useState(false);

  const allCategories = [...new Set(donorItems.map(i => i.category))].sort();

  const filtered = donorItems.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.subcategory.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategories.size === 0 || filterCategories.has(item.category);
    const matchPrice = !filterHasPrice || item.price > 0;
    return matchSearch && matchCat && matchPrice;
  });

  const CATEGORY_LABELS = { APP: 'Appliances', CAB: 'Cabinets', DOR: 'Doors & Windows', ELC: 'Electrical', FLR: 'Flooring', FRN: 'Furniture', HWD: 'Hardware', LTG: 'Lighting', PLB: 'Plumbing', PNT: 'Paint', RFG: 'Roofing', TLS: 'Tools', FXR: 'Fixtures' };
  const activeFilterCount = filterCategories.size + (filterHasPrice ? 1 : 0);
  const activeFilterChips = [
    ...[...filterCategories].map(v => ({ label: CATEGORY_LABELS[v] || v, onClear: () => { const s = new Set(filterCategories); s.delete(v); setFilterCategories(s); setPage(1); } })),
    ...(filterHasPrice ? [{ label: 'Has price', onClear: () => { setFilterHasPrice(false); setPage(1); } }] : []),
  ];
  const clearAllFilters = () => { setFilterCategories(new Set()); setFilterHasPrice(false); setPage(1); };
  const toggleCat = v => setFilterCategories(prev => { const s = new Set(prev); s.has(v) ? s.delete(v) : s.add(v); return s; });

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

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <header style={{ ...styles.header, height: headerHeight, paddingLeft: px, paddingRight: px }}>
        <BackButton onClick={() => navigate(-1)} />
        <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ ...styles.main, maxWidth, padding: `16px ${px}px 24px` }}>

        <h1 style={styles.pageTitle}>List of Items</h1>

        {/* Donor summary card */}
        <DonorSummaryCard
          info={donorInfo}
          totalItems={donorItemCount}
          totalCost={donorItems.reduce((sum, item) => sum + item.price * item.qty, 0)}
          isMobile={isMobile}
        />

        {/* Items table */}
        <div style={styles.tableCard}>

          {/* Toolbar */}
          <div style={{ ...styles.toolbar, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <div style={{ ...styles.searchWrapper, minWidth: isMobile ? '100%' : 200 }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search items by name, category, or item #"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, width: isMobile ? '100%' : undefined, flexShrink: 0 }}>
              <button style={{ ...styles.toolBtn, flex: isMobile ? 1 : undefined }}>
                <QrIcon size={18} color="#424242" />
                {!isMobile && <span style={styles.toolBtnLabel}>Scan QR Code</span>}
              </button>
              <button
                onClick={() => setShowFilterModal(true)}
                style={{ ...styles.toolBtn, flex: isMobile ? 1 : undefined, borderColor: activeFilterCount > 0 ? '#085420' : '#d9d9d9', background: activeFilterCount > 0 ? '#f0f7f2' : '#f0f0f0' }}
              >
                <FilterIcon />
                <span style={{ ...styles.toolBtnLabel, color: activeFilterCount > 0 ? '#085420' : '#000' }}>Filter</span>
                {activeFilterCount > 0 && (
                  <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: '#085420', color: '#fff', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{activeFilterCount}</span>
                )}
              </button>
              <button
                onClick={() => setShowSortModal(true)}
                style={{ ...styles.toolBtn, flex: isMobile ? 1 : undefined, borderColor: sortField ? '#085420' : '#d9d9d9', background: sortField ? '#f0f7f2' : '#f0f0f0' }}
              >
                <SortIcon />
                <span style={{ ...styles.toolBtnLabel, color: sortField ? '#085420' : '#000' }}>Sort</span>
                {sortField && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#085420" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterChips.length > 0 && (
            <div style={{ display: 'flex', gap: 6, padding: '10px 16px', background: '#fafafa', borderBottom: '0.558px solid #f3f4f6', flexWrap: 'wrap', alignItems: 'center' }}>
              {activeFilterChips.map((chip, i) => (
                <button key={i} onClick={chip.onClear} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', borderRadius: 6, border: '1px solid #c3dbc8', background: '#f0f7f2', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, fontWeight: 500, color: '#085420', cursor: 'pointer' }}>
                  {chip.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#085420" strokeWidth="2.2" strokeLinecap="round"/></svg>
                </button>
              ))}
              <button onClick={clearAllFilters} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', borderRadius: 6, border: '1px solid #d1d5dc', background: 'transparent', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#888', cursor: 'pointer' }}>
                Clear all
              </button>
            </div>
          )}

          {/* Column headers — tablet only */}
          {!isMobile && (
            <div style={styles.tableHeader}>
              {[
                { label: 'Item Name',   field: 'name',        flex: true },
                { label: 'Category',    field: 'category',    width: 48  },
                { label: 'Subcategory', field: 'subcategory', width: 90  },
                { label: 'Qty',         field: 'qty',         width: 32, center: true },
                { label: 'Price',       field: 'price',       width: 96  },
                { label: 'Created',     field: 'created',     width: 80  },
                { label: 'Modified',    field: 'modified',    width: 80  },
              ].map(col => (
                <span key={col.field} style={{ ...styles.headerCell, ...(col.flex ? { flex: 1 } : { width: col.width }), textAlign: col.center ? 'center' : undefined, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {col.label}
                  {sortField === col.field && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" stroke="#085420" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
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
              ? <p style={styles.emptyText}>No items match your search.</p>
              : pageRows.map(item => (
                  <ItemRow key={item.id} item={item} isMobile={isMobile} onClick={() => navigate(`/donor/${id}/item/${item.id}`, { state: { item } })} />
                ))
            }
          </div>

          {/* Pagination */}
          <TableControls
            total={sorted.length}
            page={safePage}
            totalPages={totalPages}
            rowsPerPage={ROWS_PER_PAGE}
            onPage={handlePage}
          />
        </div>

      </main>

      {/* ── Bottom nav ── */}
      <BottomNav
        onHome={() => navigate('/mode-select')}
        onScanQr={() => {}}
        onNewDonation={() => setShowNewItemFlow(true)}
        maxWidth={maxWidth}
      />

      {showFilterModal && (
        <FilterModal
          title="Filter Items"
          color="#085420"
          resultCount={filtered.length}
          onClose={() => setShowFilterModal(false)}
          onClearAll={clearAllFilters}
          onApply={() => { setPage(1); setShowFilterModal(false); }}
          sections={[
            { type: 'pills', label: 'Category', options: allCategories.map(c => ({ value: c, label: CATEGORY_LABELS[c] || c })), selected: filterCategories, onToggle: toggleCat },
            { type: 'toggle', label: 'Has price', description: 'Only show items with a price set', value: filterHasPrice, onChange: setFilterHasPrice },
          ]}
        />
      )}

      {showSortModal && (
        <SortModal
          title="Sort Items"
          options={ITEM_SORT_OPTIONS}
          selected={sortField}
          color="#085420"
          onClose={() => setShowSortModal(false)}
          onSelect={(field) => { setSortField(field); setShowSortModal(false); }}
        />
      )}

      {showNewItemFlow && (
        <NewItemFlow
          onDismiss={() => setShowNewItemFlow(false)}
          onCancel={() => {
            setShowNewItemFlow(false);
            navigate(`/donor/${id}/item/new`);
          }}
          onComplete={(data) => {
            setShowNewItemFlow(false);
            navigate(`/donor/${id}/item/new`, { state: data });
          }}
        />
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100dvh',
    background: '#ffffff',
    display: 'flex', flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, sans-serif",
    paddingBottom: 80,
  },
  header: {
    height: 108, background: '#085420',
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    paddingLeft: 26, paddingRight: 26, paddingBottom: 16,
    flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
  },
  backBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0,
  },
  backArrow: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 26, fontWeight: 700, color: '#ffffff', lineHeight: 1,
  },
  backLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 16, fontWeight: 500, color: '#ffffff', lineHeight: 1,
  },
  logo: { height: 52, width: 'auto', objectFit: 'contain' },
  main: {
    flex: 1,
    display: 'flex', flexDirection: 'column', gap: 16,
    padding: '16px 32px 24px',
    width: '100%', maxWidth: 834, alignSelf: 'center', boxSizing: 'border-box',
  },
  pageTitle: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 18, fontWeight: 700, color: '#000', margin: 0,
  },
  tableCard: {
    background: '#ffffff',
    border: '0.558px solid #d9d9d9', borderRadius: 14,
    overflow: 'clip',
  },
  toolbar: {
    display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
    padding: '12px 8px',
    borderBottom: '0.558px solid #f3f4f6',
  },
  searchWrapper: {
    display: 'flex', alignItems: 'center', gap: 8,
    flex: 1, minWidth: 200,
    height: 44, background: '#f0f0f0',
    border: '0.558px solid #d9d9d9', borderRadius: 10,
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
  toolBtnLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap',
  },
  tableHeader: {
    display: 'flex', alignItems: 'center',
    padding: '8px 8px 8px 8px',
    background: '#fafafa', borderBottom: '0.558px solid #f3f4f6',
    gap: 20,
  },
  headerCell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 13, fontWeight: 600, color: '#595959',
    flexShrink: 0, whiteSpace: 'nowrap',
  },
  cell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, color: '#000', margin: 0, flexShrink: 0,
  },
  emptyText: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, color: '#595959', textAlign: 'left',
    padding: '32px 0', margin: 0,
  },
  pageBtn: {
    width: 36, height: 36, border: '0.558px solid #d9d9d9', borderRadius: 6,
    background: 'transparent', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#424242',
  },
  ellipsis: {
    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959',
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#ffffff', borderTop: '0.558px solid #f3f4f6',
    zIndex: 10,
  },
  bottomNavInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 32px', maxWidth: 834, margin: '0 auto',
  },
  navBtn: {
    flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    width: 172.5, height: 52,
    background: '#fff', border: '0.558px solid #d9d9d9', borderRadius: 10,
    padding: '10px 0', cursor: 'pointer',
  },
  navBtnLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap',
  },
};
