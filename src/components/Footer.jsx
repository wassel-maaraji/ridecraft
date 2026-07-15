export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-color)', 
      borderTop: '1px solid var(--border-color)', 
      padding: '30px 20px', 
      textAlign: 'center',
      color: 'var(--text-muted)',
      marginTop: '60px'
    }}>
      <div className="container">
        <p style={{ margin: 0, fontWeight: '500', letterSpacing: '0.05em' }}>
          &copy; {new Date().getFullYear()} RIDECRAFT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}