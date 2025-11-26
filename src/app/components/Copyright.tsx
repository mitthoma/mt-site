import { memo } from 'react';

function Copyright() {
  return (
    <footer style={{
      background: '#000',
      minHeight: '20vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <p style={{
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.9rem',
        textAlign: 'center',
        margin: 0
      }}>
        © {new Date().getFullYear()} Mitchell Thomas. All rights reserved.
      </p>
    </footer>
  );
}

export default memo(Copyright);
