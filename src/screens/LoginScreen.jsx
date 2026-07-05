import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSignIn } from '../lib/supabase';

const CJ_LOGO = 'https://www.figma.com/api/mcp/asset/592c8679-b9ac-46d0-a8aa-7838efc13858';

function EyeIcon({ visible }) {
  return visible ? (
    /* Eye open — password visible */
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5C7.18 5 3.07 7.96 1 12c2.07 4.04 6.18 7 11 7s8.93-2.96 11-7c-2.07-4.04-6.18-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#424242"/>
    </svg>
  ) : (
    /* Eye off — password hidden */
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92C21.07 15.42 22.6 13.82 23.45 12 21.45 7.38 17.08 4 12 4c-1.38 0-2.69.25-3.91.69l2.16 2.16C10.74 6.63 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 .55 12C2.55 16.62 6.92 20 12 20c1.55 0 3.03-.3 4.38-.84l.42.42L19.73 23 21 21.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16a3 3 0 0 0-3-3l-.17.01z" fill="#424242"/>
    </svg>
  );
}

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await mockSignIn(email, password);
      navigate('/mode-select');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Status bar spacer for iPad */}
      <div style={styles.statusBar} />

      <div style={styles.content}>

        {/* Logo */}
        <img
          src={CJ_LOGO}
          alt="Construction Junction logo"
          style={styles.logo}
        />

        {/* Heading */}
        <div style={styles.heading}>
          <h1 style={styles.title}>Sign in to Reuse Retail</h1>
          <p style={styles.subtitle}>Access inventory tools and manage donations.</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleLogin} style={styles.card} noValidate>

          {/* Username */}
          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>Username</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              autoCapitalize="none"
              placeholder="user@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: 56 }}
              />
              <button
                type="button"
                aria-label={showPw ? 'Hide password' : 'Show password'}
                onClick={() => setShowPw(v => !v)}
                style={styles.eyeBtn}
              >
                <EyeIcon visible={showPw} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p style={styles.errorText} role="alert">{error}</p>}

          {/* Forgot password */}
          <button type="button" style={styles.forgotLink}>
            Forgot your password?
          </button>

          {/* Log In */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.loginBtn, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Log In'}
          </button>

          {/* Help text */}
          <div style={styles.helpText}>
            <span style={styles.helpBold}>Need help signing in? </span>
            <span>If you're having trouble accessing your account, contact your manager.</span>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100dvh',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statusBar: {
    height: 44,
    width: '100%',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 569,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    padding: '40px 24px 60px',
  },
  logo: {
    width: 290,
    height: 121,
    objectFit: 'contain',
    flexShrink: 0,
  },
  heading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: -0.35,
    color: '#000000',
    margin: 0,
  },
  subtitle: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: -0.22,
    color: '#000000',
    margin: 0,
  },
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: 32,
    borderRadius: 4,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: -0.18,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 56,
    padding: '0 16px',
    border: '1px solid #424242',
    borderRadius: 4,
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 17,
    fontWeight: 510,
    color: '#595959',
    background: '#ffffff',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 56,
    height: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
  },
  forgotLink: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: -0.18,
    color: '#000000',
    textDecoration: 'underline',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textAlign: 'left',
    minHeight: 'auto',
  },
  loginBtn: {
    width: '100%',
    height: 56,
    background: '#085420',
    color: '#ffffff',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: -0.2,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.15s',
  },
  errorText: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: 14,
    color: '#DC0000',
    margin: 0,
  },
  helpText: {
    fontFamily: "'Inter', -apple-system, sans-serif",
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
