import ContactBlock from '../components/ContactBlock';
import logoGms from '../assets/gms.jpeg';

const schoolContact = {
  call: '+91 8055314123',
  email: 'gmsprincipal01@gmail.com',
  workTime: 'Mon - Sat 7 AM - 8 PM',
  address: '372, Near Datta Mandir, Behind A.S. Club Aurangabad',
};

export default function School() {
  return (
    <div className="page">
      <div className="container">
        <img src={logoGms} alt="Greenvalley Montessori School" style={styles.logo} />
        <h1 style={styles.title}>Greenvalley Montessori School</h1>

        <section style={styles.section}>
          <h2>About Us</h2>
          <p>
            Greenvalley Montessori School prides itself on the quality of its educational
            programmes, the professionalism of its staff, the enthusiasm of its students and
            the high level of support provided by parents and community members. We are an
            open school and we actively seek participation and involvement from the whole
            school community.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Vision</h2>
          <p>
            To prepare and motivate our students for a rapidly changing world by instilling
            in them critical thinking skills, a global perspective, and a respect for core
            values of honesty, loyalty, perseverance, and compassion. Students will have
            success for today and be prepared for tomorrow.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Mission</h2>
          <p>
            To provide a safe haven where everyone is valued and respected. All staff
            members, in partnership with parents and families are fully committed to
            students' college and career readiness. Students are empowered to meet current
            and future challenges to develop social awareness, civic responsibility, and
            personal growth.
          </p>
        </section>

        <ContactBlock {...schoolContact} />
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
};
