import backIcon from '../assets/back_button.svg';
import cancelIcon from '../assets/cancel_button.svg';

export default function BackButton({ onClick, variant = 'back' }) {
  const icon = variant === 'cancel' ? cancelIcon : backIcon;
  const label = variant === 'cancel' ? 'Cancel' : 'Back';
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
    >
      <img src={icon} alt={label} width={80} height={44} style={{ display: 'block' }} />
    </button>
  );
}
