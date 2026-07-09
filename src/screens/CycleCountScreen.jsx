import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../hooks/useLayout';
import UserMenu from '../components/UserMenu';
import BackButton from '../components/BackButton';

const STAFF = [
  { id: 1, name: 'Aiden' },
  { id: 2, name: 'Bailey' },
  { id: 3, name: 'Carlos' },
  { id: 4, name: 'Cat' },
  { id: 5, name: 'Greg' },
  { id: 6, name: 'John' },
  { id: 7, name: 'Kevin' },
  { id: 8, name: 'Maddie' },
  { id: 9, name: 'Terry' },
  { id: 10, name: 'Thomas' },
];

const ROWS_PER_PAGE = 20;

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

function CycleCountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <rect x="3" y="11" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <rect x="14" y="11" width="7" height="5" rx="1" stroke="#fff" strokeWidth="1.8"/>
      <path d="M3 19h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export default function CycleCountScreen() {
  const navigate = useNavigate();
  const { maxWidth, headerHeight, px } = useLayout();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = STAFF.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * ROWS_PER_PAGE, safePage * ROWS_PER_PAGE);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Helvetica Neue', sans-serif" }}>
      {/* Header */}
      <header style={{ height: headerHeight, background: '#D65737', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingLeft: 26, paddingRight: 26, paddingBottom: 16, flexShrink: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        <BackButton onClick={() => navigate('/retail')} />
        <img src="/src/assets/construction_junction_logo_white.svg" alt="Construction Junction" style={{ height: 52, width: 'auto', objectFit: 'contain' }} />
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth, margin: '0 auto', padding: `24px ${px}px 100px` }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#000', margin: '0 0 4px' }}>Start Your Cycle Count</h1>
        <p style={{ fontSize: 14, color: '#595959', margin: '0 0 24px', lineHeight: 1.5 }}>
          Select your name to begin counting items.<br />
          You can pause and resume anytime.
        </p>

        {/* Card */}
        <div style={{ border: '0.558px solid #d9d9d9', borderRadius: 12, overflow: 'hidden' }}>
          {/* Card header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '0.558px solid #f3f4f6' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#000', margin: 0 }}>Select Your Name to Begin</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, border: '0.558px solid #d9d9d9', borderRadius: 20, padding: '0 12px', background: '#f5f5f5' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#888" strokeWidth="2"/><path d="M20 20l-3-3" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
              <input
                type="text"
                placeholder="Search staff member..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: '#000', width: 150 }}
              />
            </div>
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 24px', gap: 0, padding: '10px 20px', background: '#f9f9f9', borderBottom: '0.558px solid #f3f4f6' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>Staff Member</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>Status</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>Items Counted</span>
            <span />
          </div>

          {/* Rows */}
          {pageRows.map(staff => (
            <button
              key={staff.id}
              onClick={() => navigate(`/cycle-count/${staff.id}`, { state: { name: staff.name } })}
              style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 24px', gap: 0, alignItems: 'center', padding: '16px 20px', border: 'none', borderBottom: '0.558px solid #f3f4f6', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, color: '#000' }}>{staff.name}</span>
              <span style={{ fontSize: 14, color: '#595959' }}>Not started</span>
              <span style={{ fontSize: 14, color: '#595959' }}>0 items counted</span>
              <ChevronRight />
            </button>
          ))}

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
            <span style={{ fontSize: 13, color: '#595959' }}>Showing 1–{pageRows.length} of {filtered.length} staff.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={safePage === 1} style={{ width: 28, height: 28, border: '0.558px solid #d9d9d9', borderRadius: 6, background: 'transparent', cursor: safePage === 1 ? 'default' : 'pointer', opacity: safePage === 1 ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#424242" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button style={{ width: 28, height: 28, border: 'none', borderRadius: 6, background: '#595959', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'default' }}>{safePage}</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} style={{ width: 28, height: 28, border: '0.558px solid #d9d9d9', borderRadius: 6, background: 'transparent', cursor: safePage === totalPages ? 'default' : 'pointer', opacity: safePage === totalPages ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#424242" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: '#595959' }}>Rows per page:</span>
              <div style={{ border: '0.558px solid #d9d9d9', borderRadius: 4, padding: '2px 6px', display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#595959' }}>{ROWS_PER_PAGE}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#595959" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '0.558px solid #d9d9d9', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 26px', margin: '0 auto', maxWidth }}>
          <button onClick={() => navigate('/mode-select')} style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: 172.5, height: 44, padding: '10px 0', border: '0.558px solid #d9d9d9', borderRadius: 10, background: '#fff', cursor: 'pointer' }}>
            <HomeIcon />
            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 500, color: '#000', whiteSpace: 'nowrap' }}>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
