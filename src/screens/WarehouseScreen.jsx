import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';

import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import UserMenu from '../components/UserMenu';
import AnonymousDonorAvatar from '../assets/AnonymousDonorAvatar.svg';
import SharedRevenueAvatar from '../assets/SharedRevenueAvatar.svg';

// ── Mock data ─────────────────────────────────────────────────────────────────

const DONORS = [
  { id: '1',  name: 'LaMay Property Development', donorNumber: '96986',  type: 'Pick Up',  status: 'Scheduled', items: 0,  date: '07/03/2026', isOrg: true  },
  { id: '2',  name: 'Anonymous',                   donorNumber: '041156', type: 'Drop Off', status: 'Completed', items: 6,  date: '06/31/2026', isOrg: false },
  { id: '3',  name: 'John Williams',               donorNumber: '088842', type: 'Pick Up',  status: 'Scheduled', items: 4,  date: '06/27/2026', isOrg: false },
  { id: '4',  name: 'Anonymous',                   donorNumber: '041157', type: 'Drop Off', status: 'Completed', items: 3,  date: '06/25/2026', isOrg: false },
  { id: '5',  name: 'Pittsburgh Plate Glass',      donorNumber: '072341', type: 'Pick Up',  status: 'Scheduled', items: 12, date: '06/24/2026', isOrg: true  },
  { id: '6',  name: 'Sandra Kowalski',             donorNumber: '055209', type: 'Drop Off', status: 'Completed', items: 2,  date: '06/22/2026', isOrg: false },
  { id: '7',  name: 'Allegheny County Housing',    donorNumber: '031874', type: 'Pick Up',  status: 'Scheduled', items: 8,  date: '06/20/2026', isOrg: true  },
  { id: '8',  name: 'Anonymous',                   donorNumber: '041158', type: 'Drop Off', status: 'Completed', items: 1,  date: '06/18/2026', isOrg: false },
  { id: '9',  name: 'Bridges Community Church',    donorNumber: '019203', type: 'Pick Up',  status: 'Scheduled', items: 5,  date: '06/15/2026', isOrg: true  },
  { id: '10', name: 'Marcus Reeves',               donorNumber: '062990', type: 'Drop Off', status: 'Completed', items: 7,  date: '06/12/2026', isOrg: false },
  { id: '11', name: 'Three Rivers Realty',         donorNumber: '047201', type: 'Pick Up',  status: 'Scheduled', items: 9,  date: '06/10/2026', isOrg: true  },
  { id: '12', name: 'Anonymous',                   donorNumber: '041159', type: 'Drop Off', status: 'Completed', items: 2,  date: '06/08/2026', isOrg: false },
  { id: '13', name: 'Carlow University',           donorNumber: '033810', type: 'Pick Up',  status: 'Scheduled', items: 15, date: '06/05/2026', isOrg: true  },
  { id: '14', name: 'Patricia Nguyen',             donorNumber: '071540', type: 'Drop Off', status: 'Completed', items: 4,  date: '06/03/2026', isOrg: false },
  { id: '15', name: 'Anonymous',                   donorNumber: '041160', type: 'Drop Off', status: 'Completed', items: 0,  date: '06/01/2026', isOrg: false },
  { id: '16', name: 'Habitat for Humanity PGH',   donorNumber: '029443', type: 'Pick Up',  status: 'Scheduled', items: 22, date: '05/30/2026', isOrg: true  },
  { id: '17', name: 'Derek Osei',                  donorNumber: '058872', type: 'Drop Off', status: 'Completed', items: 3,  date: '05/28/2026', isOrg: false },
  { id: '18', name: 'East End Cooperative',        donorNumber: '044901', type: 'Pick Up',  status: 'Scheduled', items: 6,  date: '05/25/2026', isOrg: true  },
  { id: '19', name: 'Anonymous',                   donorNumber: '041161', type: 'Drop Off', status: 'Completed', items: 1,  date: '05/22/2026', isOrg: false },
  { id: '20', name: 'Calvary Episcopal Church',    donorNumber: '016723', type: 'Pick Up',  status: 'Completed', items: 11, date: '05/20/2026', isOrg: true  },
  { id: '21', name: 'Maria Vasquez',               donorNumber: '063318', type: 'Drop Off', status: 'Completed', items: 2,  date: '05/18/2026', isOrg: false },
  { id: '22', name: 'Anonymous',                   donorNumber: '041162', type: 'Drop Off', status: 'Completed', items: 5,  date: '05/15/2026', isOrg: false },
  { id: '23', name: 'Steel City Renovations',      donorNumber: '052190', type: 'Pick Up',  status: 'Scheduled', items: 18, date: '05/12/2026', isOrg: true  },
  { id: '24', name: 'Thomas Park',                 donorNumber: '079004', type: 'Drop Off', status: 'Completed', items: 3,  date: '05/10/2026', isOrg: false },
  { id: '25', name: 'Anonymous',                   donorNumber: '041163', type: 'Drop Off', status: 'Completed', items: 0,  date: '05/08/2026', isOrg: false },
];

const ROWS_PER_PAGE = 20;
const RECENT_DONORS = DONORS.slice(0, 4);

// ── Icons ─────────────────────────────────────────────────────────────────────

function DonorAvatar({ isOrg, size = 42 }) {
  return (
    <img
      src={isOrg ? SharedRevenueAvatar : AnonymousDonorAvatar}
      alt=""
      width={size}
      height={size}
      style={{ borderRadius: '50%', display: 'block', flexShrink: 0 }}
    />
  );
}

function ChevronRight({ color = '#424242', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeft({ disabled }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke={disabled ? '#ccc' : '#424242'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2"/>
      <path d="M16.5 16.5L21 21" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function QrIcon({ color = '#000', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5h18M7 12h10M11 19h2" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
      <path d="M3 5l7 8v6l4-2V13L21 5" stroke="#424242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M7 12h10M11 18h2" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 4v16M17 4l-3 3M17 4l3 3" stroke="#424242" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="#000" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#085420" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke="#085420" strokeWidth="1.5"/>
    </svg>
  );
}

// ── New Donor Modal ───────────────────────────────────────────────────────────


function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="#424242" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function NewDonorModal({ onClose, onConfirm }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff', borderRadius: 16,
          width: 619, maxWidth: 'calc(100vw - 48px)',
          position: 'relative',
          padding: '24px 32px 32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'transparent', border: 'none',
            cursor: 'pointer', padding: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <CloseIcon />
        </button>

        {/* Avatar */}
        <div style={{ marginTop: 16, marginBottom: 24 }}>
          <img src={AnonymousDonorAvatar} alt="" width={86} height={86} style={{ borderRadius: '50%', display: 'block' }} />
        </div>

        {/* Title */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 700, color: '#000',
          margin: '0 0 12px', textAlign: 'center',
        }}>
          Want to create a new Donor?
        </p>

        {/* Body */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15, fontWeight: 400, color: '#595959',
          margin: '0 0 32px', textAlign: 'center',
          lineHeight: 1.5, maxWidth: 395,
        }}>
          By creating a new donor, a new D number will be created automatically with today's date.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 21, justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              width: 158, height: 53,
              background: '#ffffff',
              border: '1px solid #d9d9d9', borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 16, fontWeight: 500, color: '#000',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              width: 158, height: 53,
              background: '#085420',
              border: 'none', borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              fontSize: 16, fontWeight: 500, color: '#ffffff',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <PlusIcon />
            New Donor
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Scan QR Modal ─────────────────────────────────────────────────────────────

function ScanQrModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff', borderRadius: 16,
          padding: '40px 48px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 16, minWidth: 280,
        }}
      >
        <CameraIcon />
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, color: '#000', margin: 0 }}>
          Scan QR Code
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#595959', margin: 0, textAlign: 'center' }}>
          Camera coming soon
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: 8, height: 44,
            paddingLeft: 32, paddingRight: 32,
            background: '#085420', color: '#ffffff',
            border: 'none', borderRadius: 8,
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, fontWeight: 500, cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// ── Recent donor chip ─────────────────────────────────────────────────────────

function DonorChip({ donor }) {
  return (
    <div style={{
      border: '0.558px solid #d9d9d9', borderRadius: 10,
      padding: 12, display: 'flex', flexDirection: 'column',
      gap: 8, minWidth: 140, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <DonorAvatar isOrg={donor.isOrg} size={36} />
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, fontWeight: 500, color: '#000', margin: 0, lineHeight: 1.4 }}>
            {donor.name}
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 10, color: '#424242', margin: 0, lineHeight: 1.4 }}>
            D# {donor.donorNumber}
          </p>
        </div>
      </div>
      <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 10, color: '#595959', margin: 0 }}>
        {donor.date} · {donor.items} items
      </p>
    </div>
  );
}

// ── Donor table row ───────────────────────────────────────────────────────────

function DonorRow({ donor, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: 8, paddingRight: 8, paddingTop: 12, paddingBottom: 12,
        borderTop: 'none', borderLeft: 'none', borderRight: 'none',
        borderBottom: '0.558px solid #f3f4f6',
        background: 'transparent',
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 180, flexShrink: 0 }}>
        <DonorAvatar isOrg={donor.isOrg} size={42} />
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', margin: 0, lineHeight: 1.3 }}>
          {donor.name}
        </p>
      </div>
      <p style={styles.cell}>{donor.donorNumber}</p>
      <p style={{ ...styles.cell, width: 80 }}>{donor.type}</p>
      <p style={{ ...styles.cell, width: 90 }}>{donor.status}</p>
      <p style={{ ...styles.cell, width: 40, textAlign: 'center' }}>{donor.items}</p>
      <p style={{ ...styles.cell, color: '#424242' }}>{donor.date}</p>
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
      padding: '12px 16px',
    }}>
      {/* Count */}
      <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>
        Showing {start}–{end} of {total} donors.
      </p>

      {/* Page buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {/* Prev */}
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          style={{ ...styles.pageBtn, opacity: page === 1 ? 0.3 : 1 }}
        >
          <ChevronLeft disabled={page === 1} />
        </button>

        {pageNums().map((n, i) =>
          n === '…'
            ? <span key={`ellipsis-${i}`} style={styles.ellipsis}>…</span>
            : <button
                key={n}
                onClick={() => onPage(n)}
                style={{
                  ...styles.pageBtn,
                  background: n === page ? '#595959' : 'transparent',
                  color: n === page ? '#ffffff' : '#424242',
                }}
              >
                {n}
              </button>
        )}

        {/* Next */}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.3 : 1 }}
        >
          <ChevronRight color={page === totalPages ? '#ccc' : '#424242'} size={12} />
        </button>
      </div>

      {/* Rows per page */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <p style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, color: '#595959', margin: 0, whiteSpace: 'nowrap' }}>
          Rows per page:
        </p>
        <div style={{
          border: '0.558px solid #d9d9d9', borderRadius: 4,
          padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2,
        }}>
          <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 16, fontWeight: 500, color: '#595959' }}>
            {rowsPerPage}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Bottom nav bar ────────────────────────────────────────────────────────────

function BottomNav({ onHome, onScanQr, onNewDonor }) {
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

          <button onClick={onNewDonor} style={{ ...styles.navBtn, background: '#085420', border: '1px solid #424242' }}>
            <PlusIcon />
            <span style={{ ...styles.navBtnLabel, color: '#ffffff' }}>New Donor</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────

export default function WarehouseScreen() {
  const navigate = useNavigate();
  const { maxWidth, headerHeight, px } = useLayout();
  const [search, setSearch] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [showNewDonorModal, setShowNewDonorModal] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = DONORS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handlePage = (n) => setPage(Math.max(1, Math.min(n, totalPages)));

  return (
    <div style={styles.page}>
      {showQrModal && <ScanQrModal onClose={() => setShowQrModal(false)} />}
      {showNewDonorModal && (
        <NewDonorModal
          onClose={() => setShowNewDonorModal(false)}
          onConfirm={() => { setShowNewDonorModal(false); navigate('/donor/new'); }}
        />
      )}

      {/* ── Header ── */}
      <header style={{ ...styles.header, height: headerHeight, paddingLeft: px, paddingRight: px }}>
        <button onClick={() => navigate('/mode-select')} style={styles.backBtn}>
          <span style={styles.backArrow}>←</span>
          <span style={styles.backLabel}>Back</span>
        </button>
        <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ ...styles.main, maxWidth, padding: `16px ${px}px 24px` }}>

        <h1 style={styles.pageTitle}>List of Donors</h1>

        {/* Recent Donors card */}
        <div style={styles.recentCard}>
          <div style={styles.recentHeader}>
            <span style={styles.recentLabel}>Recent Donors</span>
            <ChevronRight size={14} />
          </div>
          <div style={styles.recentScroll}>
            {RECENT_DONORS.map(d => <DonorChip key={d.id} donor={d} />)}
          </div>
        </div>

        {/* Donors table card */}
        <div style={styles.tableCard}>

          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.searchWrapper}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Search donors..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button onClick={() => setShowQrModal(true)} style={styles.toolBtn}>
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

          {/* Column headers */}
          <div style={styles.tableHeader}>
            <span style={{ ...styles.headerCell, width: 190, flexShrink: 0 }}>Donors</span>
            <span style={styles.headerCell}>Donation #</span>
            <span style={{ ...styles.headerCell, width: 80 }}>Type</span>
            <span style={{ ...styles.headerCell, width: 90 }}>Stage</span>
            <span style={{ ...styles.headerCell, width: 40, textAlign: 'center' }}>Items</span>
            <span style={{ ...styles.headerCell, width: 90 }}>Created</span>
            <span style={{ width: 20, flexShrink: 0 }} />
          </div>

          {/* Table rows */}
          <div style={styles.tableBody}>
            {pageRows.length === 0
              ? <p style={styles.emptyText}>No donors match your search.</p>
              : pageRows.map(d => (
                  <DonorRow key={d.id} donor={d} onClick={() => navigate('/donor/' + d.id)} />
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
        onScanQr={() => setShowQrModal(true)}
        onNewDonor={() => setShowNewDonorModal(true)}
      />
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100dvh',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', -apple-system, sans-serif",
    paddingBottom: 80,
  },
  header: {
    height: 108,
    background: '#085420',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 26, paddingRight: 26, paddingBottom: 16,
    flexShrink: 0,
    position: 'sticky', top: 0, zIndex: 10,
  },
  backBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'transparent', border: 'none',
    cursor: 'pointer', padding: 0, flexShrink: 0,
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
    width: '100%', maxWidth: 834,
    alignSelf: 'center', boxSizing: 'border-box',
  },
  pageTitle: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 18, fontWeight: 700, color: '#000', margin: 0,
  },
  recentCard: {
    background: '#ffffff',
    border: '0.558px solid #d9d9d9', borderRadius: 10, overflow: 'hidden',
  },
  recentHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 16px', borderBottom: '0.558px solid #f3f4f6',
  },
  recentLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#1e2939',
  },
  recentScroll: {
    display: 'flex', gap: 8, overflowX: 'auto',
    padding: '12px 16px 20px', scrollbarWidth: 'none',
  },
  tableCard: {
    background: '#ffffff',
    border: '0.558px solid #d9d9d9', borderRadius: 14, overflow: 'clip',
    flex: 1,
  },
  toolbar: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '12px 16px',
    borderBottom: '0.558px solid #f3f4f6',
    background: '#ffffff',
  },
  searchWrapper: {
    flex: 1, height: 44,
    display: 'flex', alignItems: 'center', gap: 8,
    background: '#f0f0f0', border: '0.558px solid #d9d9d9',
    borderRadius: 10, paddingLeft: 12, paddingRight: 12,
  },
  searchInput: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#000',
  },
  toolBtn: {
    height: 44,
    display: 'flex', alignItems: 'center', gap: 6,
    background: '#f0f0f0', border: '0.558px solid #d1d5dc',
    borderRadius: 10, paddingLeft: 14, paddingRight: 14,
    cursor: 'pointer', flexShrink: 0,
  },
  toolBtnLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#424242',
    letterSpacing: -0.15, whiteSpace: 'nowrap',
  },
  tableHeader: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingLeft: 8, paddingRight: 8, paddingTop: 10, paddingBottom: 10,
    borderBottom: '0.558px solid #f3f4f6',
    background: '#fafafa',
  },
  headerCell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 12, fontWeight: 500, color: '#595959',
    margin: 0, whiteSpace: 'nowrap', width: 70, flexShrink: 0,
  },
  tableBody: {
    display: 'flex', flexDirection: 'column',
  },
  cell: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14, fontWeight: 500, color: '#000',
    margin: 0, whiteSpace: 'nowrap', width: 70, flexShrink: 0,
  },
  emptyText: {
    fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#595959',
    textAlign: 'center', padding: '32px 16px', margin: 0,
  },
  pageBtn: {
    width: 36, height: 44, borderRadius: 4,
    border: 'none', background: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 11, fontWeight: 500, color: '#424242',
  },
  ellipsis: {
    width: 36, height: 44, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 11, color: '#99a1af',
  },
  bottomNav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#ffffff',
    zIndex: 10,
    paddingLeft: 32, paddingRight: 32,
  },
  bottomNavInner: {
    borderTop: '0.558px solid #d9d9d9',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 10, paddingBottom: 10,
  },
  navBtn: {
    display: 'flex', alignItems: 'center', gap: 4,
    justifyContent: 'center',
    minWidth: 72, width: 158,
    paddingLeft: 16, paddingRight: 16,
    paddingTop: 14, paddingBottom: 14,
    border: '1px solid #000', borderRadius: 14,
    background: 'transparent', cursor: 'pointer',
  },
  navBtnLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16, fontWeight: 500, color: '#000',
    whiteSpace: 'nowrap',
  },
};
