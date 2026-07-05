import { useNavigate } from 'react-router-dom';

export default function ModeSelectorScreen() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Reuse Retail</h1>
        <p style={styles.subtitle}>Select a mode to get started</p>
      </div>
      <div style={styles.grid}>
        <button
          onClick={() => navigate('/warehouse')}
          style={{ ...styles.modeBtn, background: '#085420' }}
        >
          <span style={styles.modeIcon}>🏭</span>
          <span style={styles.modeLabel}>Warehouse Mode</span>
          <span style={styles.modeDesc}>Intake donations and tag items</span>
        </button>
        <button
          onClick={() => navigate('/retail')}
          style={{ ...styles.modeBtn, background: '#D65737' }}
        >
          <span style={styles.modeIcon}>🏪</span>
          <span style={styles.modeLabel}>Retail Mode</span>
          <span style={styles.modeDesc}>Manage inventory and cycle counts</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100dvh',
    background: '#F5F3EE',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
    padding: 32,
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 36,
    fontWeight: 700,
    color: '#000000',
    margin: 0,
  },
  subtitle: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 18,
    fontWeight: 400,
    color: '#424242',
    marginTop: 8,
  },
  grid: {
    display: 'flex',
    gap: 24,
    width: '100%',
    maxWidth: 700,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modeBtn: {
    flex: '1 1 280px',
    minHeight: 200,
    borderRadius: 8,
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    cursor: 'pointer',
    padding: 32,
  },
  modeIcon: {
    fontSize: 48,
  },
  modeLabel: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 22,
    fontWeight: 700,
    color: '#ffffff',
  },
  modeDesc: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 15,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
};
