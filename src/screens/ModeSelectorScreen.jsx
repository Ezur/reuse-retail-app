import { useNavigate } from 'react-router-dom';

const CJ_LOGO = 'https://www.figma.com/api/mcp/asset/1ed09e3d-bcdc-4a62-9e63-d3d2db4b3033';

// ── Icons ─────────────────────────────────────────────────────────────────────

function ItemIntakeIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="72" rx="36" fill="#085420"/>
      {/* Box outline */}
      <path d="M24 30L36 24L48 30V44L36 50L24 44V30Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Box middle line */}
      <path d="M36 24V50" stroke="white" strokeWidth="2.5"/>
      <path d="M24 30L48 30" stroke="white" strokeWidth="2.5"/>
      {/* Plus sign */}
      <circle cx="50" cy="26" r="9" fill="#085420"/>
      <path d="M50 22V30M46 26H54" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function ManageInventoryIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="72" height="72" rx="36" fill="#D65737"/>
      {/* Clipboard body */}
      <rect x="24" y="26" width="24" height="28" rx="2" stroke="white" strokeWidth="2.5"/>
      {/* Clipboard top */}
      <path d="M31 26V24C31 23.4477 31.4477 23 32 23H40C40.5523 23 41 23.4477 41 24V26" stroke="white" strokeWidth="2.5"/>
      {/* Check lines */}
      <path d="M29 34H43" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M29 39H43" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M29 44H38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronRight({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ModeSelectorScreen() {
  const navigate = useNavigate();

  // In production this comes from the auth session; mocked for prototype
  const userInitials = 'JS';
  const userName = 'John';

  return (
    <div style={styles.page}>

      {/* ── Header ── */}
      <header style={styles.header}>
        <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        <button style={styles.initialsBtn} aria-label="User menu">
          {userInitials}
        </button>
      </header>

      {/* ── Main content ── */}
      <main style={styles.main}>

        {/* Greeting */}
        <div style={styles.greeting}>
          <h1 style={styles.welcomeTitle}>Welcome, {userName}</h1>
          <p style={styles.welcomeSubtitle}>What task are you working on today?</p>
        </div>

        {/* Mode cards */}
        <div style={styles.cardList}>

          {/* Item Intake — Warehouse / Loading Dock */}
          <button onClick={() => navigate('/warehouse')} style={{ ...styles.card, borderColor: '#085420' }}>
            <div style={styles.cardIcon}>
              <ItemIntakeIcon />
            </div>
            <div style={styles.cardText}>
              <div>
                <p style={{ ...styles.cardTitle, color: '#085420' }}>Item Intake</p>
                <p style={{ ...styles.cardSubtitle, color: '#085420' }}>LOADING DOCK</p>
              </div>
              <p style={styles.cardDesc}>Receive new donations and log items.</p>
            </div>
            <div style={styles.cardArrow}>
              <ChevronRight color="#085420" />
            </div>
          </button>

          {/* Manage Inventory — Retail / Sales Floor */}
          <button onClick={() => navigate('/retail')} style={{ ...styles.card, borderColor: '#D65737' }}>
            <div style={styles.cardIcon}>
              <ManageInventoryIcon />
            </div>
            <div style={styles.cardText}>
              <div>
                <p style={{ ...styles.cardTitle, color: '#D65737' }}>Manage Inventory</p>
                <p style={{ ...styles.cardSubtitle, color: '#D65737' }}>SALES FLOOR</p>
              </div>
              <p style={styles.cardDesc}>Update prices for items out on the floor.</p>
            </div>
            <div style={styles.cardArrow}>
              <ChevronRight color="#D65737" />
            </div>
          </button>

        </div>

        {/* Help text */}
        <div style={styles.helpRow}>
          <div style={styles.helpBadge}>
            <span style={styles.helpQ}>?</span>
          </div>
          <div style={styles.helpText}>
            <span style={styles.helpBold}>Need help choosing? </span>
            <span>Ask your manager if you're not sure which mode to use.</span>
          </div>
        </div>

      </main>
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
  },
  header: {
    height: 108,
    background: '#ffffff',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 26,
    paddingRight: 26,
    paddingBottom: 16,
    flexShrink: 0,
    position: 'sticky',
    top: 0,
    zIndex: 10,
    borderBottom: '1px solid #f0f0f0',
  },
  logo: {
    height: 52,
    width: 'auto',
    objectFit: 'contain',
  },
  initialsBtn: {
    height: 56,
    minWidth: 56,
    paddingLeft: 16,
    paddingRight: 16,
    border: '1.27px solid #d9d9d9',
    borderRadius: 12,
    background: '#ffffff',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: 18,
    fontWeight: 400,
    color: '#000000',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 64,
    paddingTop: 64,
    paddingLeft: 56,
    paddingRight: 56,
    paddingBottom: 64,
    width: '100%',
    maxWidth: 834,
    alignSelf: 'center',
  },
  greeting: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: -0.35,
    color: '#000000',
    margin: 0,
    lineHeight: 1.5,
  },
  welcomeSubtitle: {
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: -0.22,
    color: '#000000',
    margin: 0,
    lineHeight: 1.5,
  },
  cardList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  card: {
    width: '100%',
    height: 255,
    background: '#ffffff',
    border: '1px solid',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 64,
    paddingBottom: 64,
    cursor: 'pointer',
    textAlign: 'left',
    flexShrink: 0,
    transition: 'opacity 0.15s',
  },
  cardIcon: {
    flexShrink: 0,
    width: 72,
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    paddingLeft: 32,
    paddingRight: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  cardTitle: {
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: -0.35,
    margin: 0,
    lineHeight: 1.5,
    whiteSpace: 'nowrap',
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 1.44,
    margin: 0,
    lineHeight: 1.5,
  },
  cardDesc: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: -0.18,
    color: '#000000',
    margin: 0,
    lineHeight: 1.5,
  },
  cardArrow: {
    flexShrink: 0,
    width: 100,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  helpBadge: {
    width: 33,
    height: 33,
    borderRadius: '50%',
    background: '#d9d9d9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  helpQ: {
    fontSize: 18,
    fontWeight: 700,
    color: '#000000',
    lineHeight: 1,
  },
  helpText: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: -0.18,
    color: '#000000',
    lineHeight: 1.5,
  },
  helpBold: {
    fontWeight: 700,
  },
};
