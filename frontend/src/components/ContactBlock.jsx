export default function ContactBlock({ call, email, workTime, address }) {
  return (
    <section style={styles.section} aria-label="Contact information">
      <h2>Contact</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <strong>Call</strong>{' '}
          <a href={`tel:${call?.replace(/\s/g, '')}`}>{call}</a>
        </li>
        <li style={styles.listItem}>
          <strong>Email</strong>{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li style={styles.listItem}>
          <strong>Work Time</strong> {workTime}
        </li>
        <li style={styles.listItem}>
          <strong>Address</strong> {address}
        </li>
      </ul>
    </section>
  );
}

const styles = {
  section: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'var(--color-card)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '0.5rem',
  },
};
