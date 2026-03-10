import ContactBlock from '../components/ContactBlock';
import logoEtc from '../assets/etc.jpeg';

const classesContact = {
  call: '+91 8055314123',
  email: 'dayalgms@gmail.com',
  workTime: 'Mon - Sat 7 AM - 8 PM',
  address: '372, Near Datta Mandir, Behind A.S. Club Aurangabad',
};

const features = [
  'CCTV Surveillance',
  'Biometric Attendance',
  'WIFI Campus',
  'Smart classrooms',
  'Online test daily',
  'Peaceful atmosphere',
  'Regular chapter wise test',
  'Excellent study material',
  'Unmatched teaching quality',
  'Stress on fundamental concepts',
  'MCQ tests on each chapter',
  'Syllabus completion on time',
];

const whoItsFor = [
  'Those students who are underperformers',
  'Lacking in motivation',
  'Struggling to perform in more than just one subject',
  'Lacking inconsistency',
  'Dealing with executive functions challenges, mild to moderate ADHD, and other learning differences',
  'Having chronically low grades',
  'Procrastinating on assignments until the last minute',
  'Getting easily distracted and having difficulty staying on track with tasks',
];

export default function Classes() {
  return (
    <div className="page">
      <div className="container">
        <img src={logoEtc} alt="Expert Tution Center" style={styles.logo} />
        <h1 style={styles.title}>Expert Tution Center</h1>
        <p style={styles.tagline}>The Fun Way to Learn</p>

        <section style={styles.section}>
          <p>
            Expert Tution Center is your one stop solution for all your tuition needs.
            Learning is made fun using intuitive teaching techniques so that your child can
            excel in any examination that he faces. Started in the year 2011, with four
            classes and 3 staff, today we have reached 22 classrooms with 27 teaching staff.
          </p>
        </section>

        <section style={styles.section}>
          <h2>Why Expert Tution Center</h2>
          <p>
            Every student wants to pass their exams, and while at it, get excellent grades.
            And every parent wants this for their children. However, in the quest to pass
            their exams, get good grades, join the honors list and achieve other academic
            goals, students often struggle with memory loss, overwhelm, time management,
            and stress. These academic challenges are often accompanied by helplessness.
            You see, some problems have straightforward answers – if your tap is broken,
            you hire a plumber; if your eyesight is bad, you get glasses. If students have
            issues with academics then we come into the picture.
          </p>
        </section>

        <section style={styles.section}>
          <h2>What We Offer</h2>
          <ul style={styles.featureList}>
            {features.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h2>Who It's For</h2>
          <ul style={styles.featureList}>
            {whoItsFor.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <ContactBlock {...classesContact} />
      </div>
    </div>
  );
}

const styles = {
  logo: {
    maxWidth: '200px',
    height: 'auto',
    marginBottom: '1rem',
    display: 'block',
  },
  title: {
    marginBottom: '0.25rem',
  },
  tagline: {
    fontSize: '1.25rem',
    color: 'var(--color-text-muted)',
    marginTop: 0,
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '2rem',
  },
  featureList: {
    paddingLeft: '1.5rem',
  },
};
