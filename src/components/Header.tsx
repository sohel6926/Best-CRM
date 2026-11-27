import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X, Smartphone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_ITEMS } from '../data/content';
import { useAdmin } from '../context/AdminContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { announcement } = useAdmin();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* Top Announcement Ribbon synced from Admin Panel */}
      {announcement.enabled && (
        <div className="bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] px-4 py-2 text-center text-xs text-white shadow-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
              {announcement.badge}
            </span>
            <span className="font-medium">{announcement.message}</span>
            <Link to={announcement.linkUrl} className="font-extrabold underline hover:text-purple-200 ml-1">
              {announcement.linkText} →
            </Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-[#EDE9FE] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <Link
          to="/"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-[#7C3AED]"
          aria-label="bestCRM Home"
        >
          <BrandLogo />
        </Link>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#5B21B6] font-semibold'
                    : 'text-[#475569] hover:text-[#1E1B4B]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#7C3AED]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-[#5B21B6] bg-[#F3EEFF] hover:bg-[#EDE9FE] px-3 py-1.5 rounded-xl border border-[#DDD6FE] transition"
          >
            <span>Admin Portal</span>
          </Link>

          <Link
            to="/download"
            className="hidden xl:inline-flex items-center gap-1.5 text-sm font-medium text-[#5B21B6] hover:text-[#4C1D95] whitespace-nowrap shrink-0 px-2 py-1.5 rounded-lg transition-colors"
          >
            <Smartphone className="h-4 w-4" aria-hidden="true" />
            <span>Download App</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4C1D95] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] text-[#1E1B4B] transition hover:bg-[#EDE9FE] cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#EDE9FE] bg-white px-4 pb-5 pt-3 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F3EEFF] text-[#5B21B6] font-semibold'
                      : 'text-[#475569] hover:bg-[#FAF8FF] hover:text-[#1E1B4B]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/download"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F3EEFF] text-[#5B21B6] font-semibold'
                    : 'text-[#475569] hover:bg-[#FAF8FF] hover:text-[#1E1B4B]'
                }`
              }
            >
              <Smartphone className="h-4 w-4 text-[#7C3AED]" aria-hidden="true" />
              <span>Download App</span>
            </NavLink>

            <NavLink
              to="/admin"
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold text-[#5B21B6] bg-[#F3EEFF] hover:bg-[#EDE9FE]"
            >
              <span>Admin & Pricing Portal</span>
            </NavLink>
          </nav>

          <div className="mt-4 pt-3 border-t border-[#EDE9FE]">
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
