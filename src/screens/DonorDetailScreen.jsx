import { useNavigate, useParams } from 'react-router-dom';
import CJ_LOGO from '../assets/construction_junction_logo_white.svg';
import UserMenu from '../components/UserMenu';

export default function DonorDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <span style={styles.backArrow}>←</span>
          <span style={styles.backLabel}>Back</span>
        </button>
        <button onClick={() => navigate('/mode-select')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={CJ_LOGO} alt="Construction Junction" style={styles.logo} />
        </button>
        <div style={{ width: 120, height: 56, flexShrink: 0, position: 'relative' }}>
          <UserMenu initials="JS" onSignOut={() => navigate('/login')} />
        </div>
      </header>

      {/* Body */}
      <main style={styles.main}>
        <p style={styles.placeholder}>Donor Detail — coming soon</p>
        <p style={styles.donorId}>Donor ID: {id}</p>
      </main>
    </div>
  );
}

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
    background: '#085420',
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
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
  },
  backArrow: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 26,
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1,
  },
  backLabel: {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 16,
    fontWeight: 500,
    color: '#ffffff',
    lineHeight: 1,
  },
  logo: {
    height: 52,
    width: 'auto',
    objectFit: 'contain',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  placeholder: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 20,
    fontWeight: 600,
    color: '#000',
    margin: 0,
  },
  donorId: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: '#595959',
    margin: 0,
  },
};
