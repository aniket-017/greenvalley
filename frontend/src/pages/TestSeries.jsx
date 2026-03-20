import logoAcademy from '../assets/academy.png';

export default function TestSeries() {
  return (
    <div className="page">
      <div className="container">
        <img src={logoAcademy} alt="Test Series" style={styles.logo} />
        <h1 style={styles.title}>Test Series</h1>
        <section style={styles.section}>
          <p>
            Test Series is provided by our external partner. For details, availability, and
            registration please reach out to us or visit the partner platform when linked.
          </p>
          <p style={styles.cta}>More information coming soon.</p>
        </section>
      </div>
    </div>
  );
}

const styles = {
  logo: {
    maxWidth: '200px',
    height: 'auto',
    marginBottom: '1.5rem',
    display: 'block',
  },
  title: {
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '2rem',
  },
  cta: {
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  },
};
