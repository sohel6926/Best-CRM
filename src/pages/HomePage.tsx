import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import {
  CLOSING_CTA,
  CRM_PRODUCTS,
  HERO_CONTENT,
  PACKAGES_BANNER,
  PRICING_PLANS,
  SERVICES_LIST,
  STATS_ROW,
  WHY_CHOOSE_ITEMS,
} from '../data/content';
import { useApp } from '../context/AppContext';
import {
  CrmIcon,
  getPastelCardClasses,
  getPastelTileClasses,
} from '../components/CrmIcon';
import { HeroDashboardMockup } from '../components/Mockups';
import {
  AnimatedCounter,
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';

export function HomePage() {
  const navigate = useNavigate();
  const { openDemoModal } = useApp();

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white pt-8 pb-8 sm:pt-10 sm:pb-10">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-[440px] w-[440px] rounded-full bg-[#EDE9FE]/70 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-28 left-0 h-[360px] w-[360px] rounded-full bg-[#F3EEFF]/90 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-6 hero-entrance">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#5B21B6] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
                {HERO_CONTENT.eyebrow}
              </span>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-5xl lg:text-[52px] lg:leading-[1.12] [text-wrap:balance]">
                {HERO_CONTENT.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#475569] sm:text-lg">
                {HERO_CONTENT.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(91,33,182,0.55)] transition hover:bg-[#4C1D95] active:scale-[0.98]"
                >
                  <span>{HERO_CONTENT.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={() => openDemoModal('Demo Request')}
                  className="inline-flex items-center justify-center rounded-xl border border-[#C4B5FD] bg-white px-6 py-3.5 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#F3EEFF] active:scale-[0.98] cursor-pointer"
                >
                  {HERO_CONTENT.secondaryCta}
                </button>
              </div>

              {/* Three small chips below hero actions */}
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                {HERO_CONTENT.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E9D5FF] bg-white/90 px-3.5 py-1.5 text-xs font-medium text-[#1E1B4B]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" aria-hidden="true" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Mockup */}
            <div className="lg:col-span-6 hero-entrance-delayed">
              <HeroDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose bestCRM? */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-[#F3EEFF] px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
              Why Choose bestCRM?
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E1B4B] sm:text-4xl [text-wrap:balance]">
              Everything You Need to Run Customer Operations Smoothly
            </h2>
            <p className="mt-3 text-base text-[#475569]">
              Simple tools designed for fast-moving small businesses—zero steep learning curve.
            </p>
          </ScrollReveal>

          <StaggerGrid className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_ITEMS.map((item) => (
              <StaggerItem key={item.id}>
                <div className="card-surface h-full p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-14px_rgba(91,33,182,0.16)]">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${getPastelTileClasses(
                      item.accent
                    )}`}
                  >
                    <CrmIcon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#1E1B4B]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 3. CRMs for Your Business */}
      <section id="industry-crms" className="bg-[#FAF8FF] py-8 sm:py-10 border-y border-[#EDE9FE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-white border border-[#DDD6FE] px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
                CRMs for Your Business
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E1B4B] sm:text-4xl [text-wrap:balance]">
                A CRM built for your kind of business
              </h2>
              <p className="mt-2.5 text-base text-[#475569]">
                Pick a ready-made CRM crafted around your exact daily workflows—no complex setup required.
              </p>
            </div>
            <Link
              to="/checkout"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B21B6] hover:text-[#4C1D95] whitespace-nowrap shrink-0"
            >
              <span>Start with your CRM</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <StaggerGrid className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CRM_PRODUCTS.map((crm) => (
              <StaggerItem key={crm.id}>
                <article className="flex h-full flex-col justify-between rounded-[18px] border border-[#E9D5FF] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(76,29,149,0.08)] transition duration-200 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_18px_36px_-14px_rgba(91,33,182,0.16)]">
                  <div>
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-[#5B21B6]">
                        <CrmIcon name={crm.icon} className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1E1B4B]">{crm.name}</h3>
                    </div>

                    <p className="mt-3.5 text-sm leading-relaxed text-[#475569]">
                      {crm.shortDesc}
                    </p>

                    <p className="mt-3 text-xs font-medium text-[#64748B]">
                      {crm.tags.join('  ·  ')}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F3EEFF] flex items-center justify-between">
                    <Link
                      to={`/crms/${crm.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] hover:text-[#4C1D95] transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 4. Our Services (5 pastel-tinted cards matching each icon color) */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-[#F3EEFF] px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
                What We Offer
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E1B4B] sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-2.5 text-base text-[#475569]">
                From setup and automation to ongoing staff training, we support your team at every stage.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B21B6] hover:text-[#4C1D95] whitespace-nowrap shrink-0"
            >
              <span>Explore all services</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <StaggerGrid className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES_LIST.map((service) => (
              <StaggerItem key={service.id}>
                <Link
                  to="/services"
                  className={`group flex h-full flex-col rounded-[18px] border p-5 shadow-[0_8px_22px_-12px_rgba(30,27,75,0.08)] transition duration-200 hover:-translate-y-1 ${getPastelCardClasses(
                    service.accent
                  )}`}
                >
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${getPastelTileClasses(
                      service.accent
                    )}`}
                  >
                    <CrmIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[#1E1B4B] group-hover:text-[#5B21B6] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                    {service.shortDesc}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 5. Packages Banner */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] px-6 py-12 text-white shadow-[0_24px_60px_-15px_rgba(76,29,149,0.45)] sm:px-12 lg:px-14">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <span className="inline-block rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-[#EDE9FE]">
                    Pricing & Plans
                  </span>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {PACKAGES_BANNER.title}
                  </h2>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-[#EDE9FE]">
                    {PACKAGES_BANNER.subtitle}
                  </p>
                  <div className="mt-7">
                    <Link
                      to="/packages"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#4C1D95] shadow-md transition hover:bg-[#F3EEFF] active:scale-[0.98]"
                    >
                      <span>{PACKAGES_BANNER.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* Fanned Mini-Cards */}
                <div className="lg:col-span-6">
                  <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 items-end">
                    {PRICING_PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        className={`rounded-2xl p-4 transition duration-200 hover:-translate-y-1 ${
                          plan.highlighted
                            ? 'bg-white text-[#1E1B4B] shadow-xl sm:-translate-y-2 border-2 border-[#DDD6FE]'
                            : 'bg-white/12 text-white border border-white/20 backdrop-blur-xs'
                        }`}
                      >
                        {plan.badge && (
                          <span className="mb-2 inline-block rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-bold text-[#5B21B6]">
                            {plan.badge}
                          </span>
                        )}
                        <p
                          className={`text-sm font-bold ${
                            plan.highlighted ? 'text-[#1E1B4B]' : 'text-white'
                          }`}
                        >
                          {plan.name}
                        </p>
                        <p
                          className={`mt-1 text-xl font-extrabold tabular-nums ${
                            plan.highlighted ? 'text-[#5B21B6]' : 'text-white'
                          }`}
                        >
                          {plan.priceLabel}
                          {plan.monthlyPrice !== null && (
                            <span className="text-xs font-medium opacity-75">/mo</span>
                          )}
                        </p>
                        <ul className="mt-3 space-y-1.5 text-[11px] opacity-90">
                          {plan.features.slice(0, 3).map((feat) => (
                            <li key={feat} className="flex items-center gap-1.5">
                              <CheckCircle2
                                className={`h-3 w-3 shrink-0 ${
                                  plan.highlighted ? 'text-[#16A34A]' : 'text-[#BBF7D0]'
                                }`}
                                aria-hidden="true"
                              />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Stats Row */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid className="grid grid-cols-2 gap-6 rounded-[20px] border border-[#EDE9FE] bg-[#FAF8FF] p-8 sm:grid-cols-4">
            {STATS_ROW.map((stat, idx) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold tracking-tight text-[#5B21B6] sm:text-4xl tabular-nums">
                  <AnimatedCounter value={stat.value} delay={idx * 0.08} />
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#475569]">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 7. Closing CTA */}
      <section className="py-8 sm:py-10 bg-gradient-to-b from-white to-[#F3EEFF]/65">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 items-center gap-12 rounded-[24px] border border-[#DDD6FE] bg-white p-8 shadow-[0_20px_50px_-18px_rgba(76,29,149,0.14)] sm:p-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl [text-wrap:balance]">
                  {CLOSING_CTA.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-[#475569]">
                  {CLOSING_CTA.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-3.5">
                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#4C1D95] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{CLOSING_CTA.buttonLabel}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openDemoModal('Demo Request')}
                    className="inline-flex items-center justify-center rounded-xl border border-[#C4B5FD] bg-white px-6 py-3.5 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#F3EEFF] cursor-pointer"
                  >
                    Request Demo
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <HeroDashboardMockup compact />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
