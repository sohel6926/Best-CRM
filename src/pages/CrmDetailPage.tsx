import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { CRM_PRODUCTS } from '../data/content';
import { useApp } from '../context/AppContext';
import { CrmIcon } from '../components/CrmIcon';
import { CrmDashboardShowcase } from '../components/CrmDashboardShowcase';
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';
import { NotFoundPage } from './NotFoundPage';

export function CrmDetailPage() {
  const { crmId } = useParams<{ crmId: string }>();
  const navigate = useNavigate();
  const { setCheckout, openDemoModal } = useApp();

  const crm = CRM_PRODUCTS.find((item) => item.id === crmId);

  if (!crm) {
    return <NotFoundPage />;
  }

  const handleGetStarted = () => {
    setCheckout((prev) => ({ ...prev, crmId: crm.id }));
    navigate('/checkout');
  };

  return (
    <div className="bg-white">
      {/* Quick App Switcher Strip */}
      <div className="border-b border-[#EDE9FE] bg-[#FAF8FF]">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/#industry-crms"
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#5B21B6] hover:bg-[#EDE9FE] whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>All CRMs</span>
          </Link>
          <span className="h-4 w-px bg-[#DDD6FE] shrink-0" aria-hidden="true" />
          <div className="flex items-center gap-1.5">
            {CRM_PRODUCTS.map((item) => {
              const active = item.id === crm.id;
              return (
                <Link
                  key={item.id}
                  to={`/crms/${item.id}`}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#5B21B6] text-white shadow-xs'
                      : 'bg-white text-[#475569] border border-[#EDE9FE] hover:border-[#C4B5FD] hover:text-[#1E1B4B]'
                  }`}
                >
                  <CrmIcon name={item.icon} className="h-3.5 w-3.5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white pt-8 pb-8 sm:pt-10 sm:pb-9">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-[#EDE9FE]/80 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center hero-entrance">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#5B21B6] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
              Ready-Made Industry CRM
            </span>

            <div className="mt-5 flex items-center justify-center gap-3.5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white shadow-md">
                <CrmIcon name={crm.icon} className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-5xl">
                {crm.name}
              </h1>
            </div>

            <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">
              {crm.fullDesc}
            </p>

            <p className="mt-3 text-xs font-semibold text-[#5B21B6]">
              {crm.tags.join('  ·  ')}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(91,33,182,0.5)] transition hover:bg-[#4C1D95] active:scale-[0.98] cursor-pointer"
              >
                <span>Get Started with {crm.name}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => openDemoModal(crm.name)}
                className="inline-flex items-center justify-center rounded-xl border border-[#C4B5FD] bg-white px-6 py-3.5 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#F3EEFF] cursor-pointer"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Animated Dashboard Showcase */}
      <section className="py-4 sm:py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <CrmDashboardShowcase crm={crm} />
          </ScrollReveal>
        </div>
      </section>

      {/* Included Workflows */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#F3EEFF] px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
              Key Capabilities
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#1E1B4B] sm:text-3xl">
              Built-in Workflows for {crm.name}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569]">
              Every module is pre-configured so your team can start using it immediately after subscribing.
            </p>
          </ScrollReveal>

          <StaggerGrid className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {crm.highlights.map((highlight, idx) => (
              <StaggerItem key={highlight}>
                <div className="card-surface h-full p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#C4B5FD]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3EEFF] text-xs font-bold text-[#5B21B6] tabular-nums">
                      0{idx + 1}
                    </span>
                    <CheckCircle2 className="h-5 w-5 text-[#16A34A]" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-[#1E1B4B]">
                    {highlight}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-10 pt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-[24px] bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] p-8 text-white shadow-lg sm:flex-row sm:p-10">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Launch {crm.name} for your business today
                </h2>
                <p className="mt-2 max-w-xl text-sm sm:text-base text-[#EDE9FE]">
                  Pick a Starter or Professional plan, complete quick onboarding, and access {crm.name} immediately on mobile and web.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#4C1D95] transition hover:bg-[#F3EEFF] cursor-pointer"
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <Link
                  to="/packages"
                  className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Compare Plans
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
