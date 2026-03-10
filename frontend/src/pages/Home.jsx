import { Link } from 'react-router-dom';
import logoGms from '../assets/gms.jpeg';
import logoEtc from '../assets/etc.jpeg';
import logoAcademy from '../assets/academy.jpg';

const cards = [
  {
    to: '/school',
    logo: logoGms,
    alt: 'Greenvalley Montessori School',
    title: 'School',
    description: 'Greenvalley Montessori School — vision, mission, and community.',
    accent: 'primary',
  },
  {
    to: '/classes',
    logo: logoEtc,
    alt: 'Expert Tution Center',
    title: 'Classes',
    description: 'Expert Tution Center — the fun way to learn, with smart classrooms and more.',
    accent: 'primary',
  },
  {
    to: '/test-series',
    logo: logoAcademy,
    alt: 'Test Series',
    title: 'Test Series',
    description: 'Provided by our external partner.',
    accent: 'primary',
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-180px)]">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
        <div className="container relative">
          <p className="inline-flex items-center rounded-full bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-sm ring-1 ring-primary/10 mb-4">
            Quality education in Aurangabad
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight max-w-4xl leading-tight">
            Greenvalley Montessori School & Expert Tution Center
          </h1>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl">
            Nurturing curious minds with strong foundations, caring mentors, and engaging classrooms across school,
            tuition, and test preparation.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="container pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group block bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-100 hover:shadow-card-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 ease-out no-underline text-inherit"
            >
              <div className="mb-5">
                <img
                  src={card.logo}
                  alt={card.alt}
                  className="h-14 w-auto object-contain object-left"
                />
              </div>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {card.description}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-primary font-medium text-sm group-hover:gap-2.5 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
