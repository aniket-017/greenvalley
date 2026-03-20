import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoGms from '../assets/gms.png';
import logoEtc from '../assets/etc.png';
import logoAcademy from '../assets/academy.png';
import './Home.css';

const cards = [
  {
    href: '/school',
    logo: logoGms,
    alt: 'Greenvalley Montessori School',
    title: 'School',
    description: 'Greenvalley Montessori School',
    tag: 'Pre-K to Grade 10',
    external: false,
  },
  {
    href: '/classes',
    logo: logoEtc,
    alt: 'Expert Tution Center',
    title: 'Classes',
    description: 'Smart classrooms & expert faculty',
    tag: 'All Grades',
    external: false,
  },
  {
    href: 'https://academy.gmsetc.in/',
    logo: logoAcademy,
    alt: 'Test Series',
    title: 'Test Series',
    description: 'Comprehensive exam preparation',
    tag: 'Competitive Exams',
    external: true,
  },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 1200, suffix: '+', label: 'Students Enrolled' },
  { value: 100, suffix: '%', label: 'Pass Rate' },
];

export default function Home() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();

    let rafId;

    const tick = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      setAnimatedStats(
        stats.map((stat) => Math.floor(stat.value * progress)),
      );

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-bg-dots" aria-hidden="true" />
        <div className="hero-bg-gradient" aria-hidden="true" />

        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Quality education in Aurangabad
          </div>

          <h1 className="hero-title">
            Greenvalley Montessori School
            <span className="hero-title-amp"> &amp; </span>
            Expert Tution Center
          </h1>

          <p className="hero-subtitle">
            Nurturing curious minds with strong foundations, caring mentors, and
            engaging classrooms across school, tuition, and test preparation.
          </p>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                <div className="stat">
                  <span className="stat-number">
                    {animatedStats[index]}
                    {stat.suffix}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
                {index < stats.length - 1 && <div className="stat-divider" />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="home-cards-section">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Our Institutions</p>
            <h2 className="section-title">Three pillars of learning</h2>
          </div>

          <div className="cards-grid">
            {cards.map((card, i) => (
              card.external ? (
                <a
                  key={card.title}
                  href={card.href}
                  className="card"
                  style={{ '--card-index': i }}
                >
                  <div className="card-logo-wrap">
                    <img
                      src={card.logo}
                      alt={card.alt}
                      className="card-logo"
                    />
                  </div>

                  <div className="card-body">
                    <span className="card-tag">{card.tag}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-desc">{card.description}</p>
                  </div>

                  <div className="card-footer">
                    <span className="card-link">
                      Learn more
                      <svg className="card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>

                  <div className="card-shine" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={card.title}
                  to={card.href}
                  className="card"
                  style={{ '--card-index': i }}
                >
                  <div className="card-logo-wrap">
                    <img
                      src={card.logo}
                      alt={card.alt}
                      className="card-logo"
                    />
                  </div>

                  <div className="card-body">
                    <span className="card-tag">{card.tag}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-desc">{card.description}</p>
                  </div>

                  <div className="card-footer">
                    <span className="card-link">
                      Learn more
                      <svg className="card-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>

                  <div className="card-shine" aria-hidden="true" />
                </Link>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
