import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="bg-gradient-to-b from-[#F3EEFF] to-white py-12 sm:py-14">
      <div className="mx-auto max-w-xl px-4 text-center">
        <p className="text-sm font-bold text-[#7C3AED] tabular-nums">404 Error</p>
        <h1 className="mt-2 text-4xl font-extrabold text-[#1E1B4B] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-[#475569]">
          Sorry, the page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4C1D95]"
          >
            <span>Back to Home</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/packages"
            className="inline-flex items-center justify-center rounded-xl border border-[#C4B5FD] bg-white px-6 py-3 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#F3EEFF]"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
