interface Props {
  onClose: (photo?: string) => void;
}

export function PhotoModal({ onClose }: Props) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
    }}>
      <div style={{
        color: 'var(--gray-300)',
        fontSize: 13,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        Landscape orientation recommended
      </div>

      {/* Camera placeholder */}
      <div style={{
        width: '80%',
        maxWidth: 560,
        aspectRatio: '4/3',
        background: '#1a1a1a',
        border: '2px solid #444',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#555',
        fontSize: 14,
      }}>
        Camera feed placeholder
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <button
          onClick={() => onClose()}
          style={{
            background: 'transparent',
            border: '2px solid var(--gray-500)',
            color: 'var(--gray-300)',
            padding: '12px 28px',
            fontSize: 16,
            borderRadius: 'var(--radius)',
          }}
        >
          Skip
        </button>
        <button
          onClick={() => onClose('placeholder-photo')}
          style={{
            background: 'var(--green)',
            color: 'var(--white)',
            padding: '12px 28px',
            fontSize: 16,
            borderRadius: 'var(--radius)',
          }}
        >
          Take Photo
        </button>
      </div>
    </div>
  );
}
