import { Link } from 'react-router-dom';
import logoGms from '../assets/gms.jpeg';

export default function Header() {
  return (
    <header className="bg-primary text-white py-4 shadow-md">
      <div className="container flex items-center justify-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 no-underline hover:opacity-95 transition-opacity"
        >
          <img
            src={logoGms}
            alt="GMS - Greenvalley Montessori School"
            className="h-12 sm:h-14 lg:h-16 w-auto block drop-shadow-md"
          />
          <span className="hidden sm:inline-block font-display text-lg sm:text-xl font-semibold tracking-tight">
            Greenvalley Montessori
          </span>
        </Link>
      </div>
    </header>
  );
}
