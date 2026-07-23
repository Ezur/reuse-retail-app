import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';

import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import AnonymousDonorAvatar from '../assets/AnonymousDonorAvatar.svg';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';
import NewItemFlow from '../components/NewItemFlow';

// Generate a new donor number seeded from the current timestamp
const NEW_DONOR_NUMBER = String(Math.floor(10000 + Math.random() * 90000));
const TODAY = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

// ── Icons ─────────────────────────────────────────────────────────────────────

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

// ── Donor summary card (no stats — new donor) ─────────────────────────────────

function NewDonorSummaryCard({ donationNumber }) {
  return (
    <div style={{
      border: '0.558px solid #d9d9d9', borderRadius: 14,
      padding: '16px 20px',
      display: 'flex', alignItems: 'center',
      gap: 12, background: '#ffffff',
    }}>
      <img
        src={AnonymousDonorAvatar}
        alt=""
        width={56} height={56}
        style={{ borderRadius: '50%', flexShrink: 0 }}
      />
      <div>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 18, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1.3 }}>
          Anonymous Donor Drop-Off
        </p>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#424242', margin: '4px 0 0' }}>
          D# {donationNumber}&nbsp;&nbsp;|&nbsp;&nbsp;{TODAY}
        </p>
      </div>
    </div>
  );
}

// ── Pagination footer ─────────────────────────────────────────────────────────

function EmptyTableControls() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderTop: '0.558px solid #f3f4f6',
      padding: '12px 16px', flexWrap: 'wrap', gap: 8,
    }}>
      <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>
        Showing 0 of 0 items.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button disabled style={{ ...styles.pageBtn, opacity: 0.3 }}>
          <ChevronLeft disabled />
        </button>
        <button style={{ ...styles.pageBtn, background: '#595959', color: '#fff' }}>1</button>
        <button disabled style={{ ...styles.pageBtn, opacity: 0.3 }}>
          <ChevronRight color="#ccc" size={12} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>Rows per page:</p>
        <div style={{ border: '0.558px solid #d9d9d9', borderRadius: 4, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#595959' }}>20</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

// ── Bottom nav ────────────────────────────────────────────────────────────────

function BottomNav({ onHome, onNewDonation, maxWidth }) {
  return (
    <div style={styles.bottomNav}>
      <div style={{ ...styles.bottomNavInner, maxWidth }}>
        <button onClick={onHome} style={{ ...styles.navBtn, flex: 'none', width: 172.5 }}>
          <HomeIcon />
          <span style={styles.navBtnLabel}>Home</span>
        </button>
        <button onClick={onNewDonation} style={{ ...styles.navBtn, flex: 'none', width: 172.5, background: '#085420', border: '1px solid #085420' }}>
          <PlusIcon />
          <span style={{ ...styles.navBtnLabel, color: '#ffffff' }}>Add Item</span>
        </button>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function NewDonorScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { maxWidth, headerHeight, px } = useLayout();
  const [showNewItemFlow, setShowNewItemFlow] = useState(false);

  // Use real DB donor ID passed from WarehouseScreen, fall back to a local ID
  const donorId = state?.donorId ?? String(Math.floor(10000 + Math.random() * 90000));
  const donationNumber = state?.donationNumber ?? donorId;

  return (
    <div style={styles.page}>

      {/* ── Header ── */}
      <header style={{ ...styles.header, height: headerHeight, paddingLeft: px, paddingRight: px }}>
        <BackButton onClick={() => navigate(-1)} />
        <button onClick={() => navigate('/mode-select')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        </button>
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ ...styles.main, maxWidth, padding: `16px ${px}px 24px` }}>

        <h1 style={styles.pageTitle}>Donated Items</h1>

        {/* New donor summary — no stats */}
        <NewDonorSummaryCard donationNumber={donationNumber} />

        {/* Items table */}
        <div style={styles.tableCard}>

          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.searchWrapper}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search items by name, category, or item #"
                readOnly
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

          {/* Empty state */}
          <div style={styles.emptyState}>
            <button
              onClick={() => setShowNewItemFlow(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, height: 52, padding: '0 20px', background: '#085420', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#fff' }}
            >
              <PlusIcon />
              Add Item
            </button>
          </div>

          {/* Pagination */}
          <EmptyTableControls />
        </div>

      </main>

      {/* ── Bottom nav ── */}
      <BottomNav
        onHome={() => navigate('/mode-select')}
        onScanQr={() => {}}
        onNewDonation={() => setShowNewItemFlow(true)}
        maxWidth={maxWidth}
      />

      {showNewItemFlow && (
        <NewItemFlow
          onDismiss={() => setShowNewItemFlow(false)}
          onCancel={() => {
            setShowNewItemFlow(false);
            navigate(`/donor/${donorId}/item/new`);
          }}
          onComplete={(data) => {
            setShowNewItemFlow(false);
            navigate(`/donor/${donorId}/item/new`, { state: data });
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
    display: 'flex', alignItems: 'center', gap: 20,
    padding: '10px 16px',
    borderBottom: '0.558px solid #f3f4f6',
    background: '#fafafa',
  },
  headerCell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 12, fontWeight: 600, color: '#595959',
    flexShrink: 0, paddingRight: 8, whiteSpace: 'nowrap',
  },
  emptyState: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '32px 16px',
  },
  emptyText: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 16, fontWeight: 700, color: '#364153',
    margin: 0, textAlign: 'left',
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#ffffff', borderTop: '0.558px solid #d9d9d9',
    zIndex: 10,
  },
  bottomNavInner: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 26px', margin: '0 auto', gap: 8,
  },
  navBtn: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    background: '#fff', border: '0.558px solid #d9d9d9', borderRadius: 10,
    padding: '10px 0', height: 52, cursor: 'pointer',
  },
  navBtnLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap',
  },
  pageBtn: {
    width: 28, height: 28, minWidth: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent', border: '0.558px solid #d9d9d9', borderRadius: 6,
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#424242',
    cursor: 'pointer', padding: 0,
  },
};
