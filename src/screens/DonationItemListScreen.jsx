import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import AnonymousDonorAvatar from '../assets/AnonymousDonorAvatar.svg';
import UserMenu from '../components/UserMenu';
import NewItemFlow from '../components/NewItemFlow';

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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

function DonorSummaryCard({ info, totalItems, totalCost }) {
  return (
    <div style={{
      border: '0.558px solid #d9d9d9', borderRadius: 14,
      padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 12, background: '#ffffff',
    }}>
      {/* Left — avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
        <img
          src={AnonymousDonorAvatar}
          alt=""
          width={56} height={56}
          style={{ borderRadius: '50%', flexShrink: 0 }}
        />
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 18, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1.3 }}>
            {info.name}
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#424242', margin: '4px 0 0' }}>
            D# {info.donorNumber}&nbsp;&nbsp;|&nbsp;&nbsp;{info.date}
          </p>
        </div>
      </div>

      {/* Right — stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
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

function ItemRow({ item, onClick }) {
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

      {/* Name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: 14, fontWeight: 700, color: '#085420',
          margin: 0, lineHeight: 1.35,
        }}>
          {item.name}
        </p>
      </div>

      {/* Category */}
      <p style={{ ...styles.cell, width: 48, fontWeight: 700, color: '#000' }}>{item.category}</p>

      {/* Subcategory */}
      <p style={{ ...styles.cell, width: 90 }}>{item.subcategory}</p>

      {/* Qty */}
      <p style={{ ...styles.cell, width: 32, textAlign: 'center' }}>{item.qty}</p>

      {/* Price */}
      <p style={{ ...styles.cell, width: 96 }}>
        <span style={{ fontWeight: 700 }}>${item.price.toFixed(2)}</span>
        <span style={{ color: '#595959' }}>/each</span>
      </p>

      {/* Created */}
      <p style={{ ...styles.cell, width: 80, color: '#424242' }}>{item.created}</p>

      {/* Modified */}
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

function BottomNav({ onHome, onScanQr, onNewDonation }) {
  return (
    <div style={styles.bottomNav}>
      <div style={styles.bottomNavInner}>
        <button onClick={onHome} style={styles.navBtn}>
          <HomeIcon />
          <span style={styles.navBtnLabel}>Home</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 21 }}>
          <button onClick={onScanQr} style={styles.navBtn}>
            <QrIcon size={24} />
            <span style={styles.navBtnLabel}>Scan QR Code</span>
          </button>
          <button onClick={onNewDonation} style={{ ...styles.navBtn, background: '#085420', border: '1px solid #424242' }}>
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
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showNewItemFlow, setShowNewItemFlow] = useState(false);

  const filtered = ITEMS.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handlePage = (n) => setPage(Math.max(1, Math.min(n, totalPages)));

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <span style={styles.backArrow}>←</span>
          <span style={styles.backLabel}>Back</span>
        </button>
        <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={styles.main}>

        <h1 style={styles.pageTitle}>List of Items</h1>

        {/* Donor summary card */}
        <DonorSummaryCard
          info={DONOR_INFO}
          totalItems={ITEMS.reduce((sum, item) => sum + item.qty, 0)}
          totalCost={ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0)}
        />

        {/* Items table */}
        <div style={styles.tableCard}>

          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.searchWrapper}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search items by name, category, or item #"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={styles.toolBtn}>
                <QrIcon size={18} color="#424242" />
                <span style={styles.toolBtnLabel}>Scan QR Code</span>
              </button>
              <button style={styles.toolBtn}>
                <FilterIcon />
                <span style={styles.toolBtnLabel}>Filter</span>
              </button>
              <button style={styles.toolBtn}>
                <SortIcon />
                <span style={styles.toolBtnLabel}>Sort</span>
              </button>
            </div>
          </div>

          {/* Column headers */}
          <div style={styles.tableHeader}>
            <span style={{ ...styles.headerCell, flex: 1 }}>Item Name</span>
            <span style={{ ...styles.headerCell, width: 48 }}>Category</span>
            <span style={{ ...styles.headerCell, width: 90 }}>Subcategory</span>
            <span style={{ ...styles.headerCell, width: 32, textAlign: 'center' }}>Qty</span>
            <span style={{ ...styles.headerCell, width: 96 }}>Price</span>
            <span style={{ ...styles.headerCell, width: 80 }}>Created</span>
            <span style={{ ...styles.headerCell, width: 80 }}>Modified</span>
            <span style={{ width: 14, flexShrink: 0 }} />
          </div>

          {/* Table rows */}
          <div>
            {pageRows.length === 0
              ? <p style={styles.emptyText}>No items match your search.</p>
              : pageRows.map(item => (
                  <ItemRow key={item.id} item={item} onClick={() => {}} />
                ))
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
      <BottomNav
        onHome={() => navigate('/mode-select')}
        onScanQr={() => {}}
        onNewDonation={() => setShowNewItemFlow(true)}
      />

      {showNewItemFlow && (
        <NewItemFlow onClose={() => setShowNewItemFlow(false)} />
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
    gap: 12,
  },
  headerCell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 13, fontWeight: 600, color: '#595959',
    flexShrink: 0,
  },
  cell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, color: '#000', margin: 0, flexShrink: 0,
  },
  emptyText: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, color: '#595959', textAlign: 'center',
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
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    background: 'transparent', border: '0.558px solid #d9d9d9', borderRadius: 10,
    paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8,
    cursor: 'pointer', minWidth: 80,
  },
  navBtnLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 11, fontWeight: 500, color: '#000', whiteSpace: 'nowrap',
  },
};
