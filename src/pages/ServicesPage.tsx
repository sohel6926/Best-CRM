import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOW_IT_WORKS_STEPS, SERVICES_LIST } from '../data/content';
import { useApp } from '../context/AppContext';
import {
  CrmIcon,
  getPastelCardClasses,
  getPastelTileClasses,
} from '../components/CrmIcon';
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';

export function ServicesPage() {
  const { openEnquiryModal } = useApp();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white pt-8 pb-8 sm:pt-10 sm:pb-9">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 hero-entrance">
          <span className="inline-block rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
            What We Offer
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#475569] sm:text-lg">
            End-to-end CRM solutions to streamline your business, boost productivity and drive growth.
          </p>
        </div>
      </section>

      {/* 5 Expanded Service Cards */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {SERVICES_LIST.map((service, idx) => (
              <StaggerItem
                key={service.id}
                className={idx === SERVICES_LIST.length - 1 ? 'md:col-span-2' : ''}
              >
                <article
                  className={`flex h-full flex-col justify-between rounded-[18px] border p-7 sm:p-8 shadow-[0_8px_24px_-12px_rgba(30,27,75,0.08)] transition duration-200 hover:-translate-y-0.5 ${getPastelCardClasses(
                    service.accent
                  )}`}
                >
                  <div>
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${getPastelTileClasses(
                          service.accent
                        )}`}
                      >
                        <CrmIcon name={service.icon} className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1E1B4B]">
                          {service.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                          {service.expandedDesc}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 text-sm text-[#475569]"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
                            aria-hidden="true"
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 pt-5 border-t border-black/5 flex justify-start">
                    <button
                      type="button"
                      onClick={() => openEnquiryModal(service.title)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#C4B5FD] bg-white px-5 py-2.5 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#EDE9FE] cursor-pointer"
                    >
                      <span>Book a Consultation</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* How It Works (Numbered Sequence) */}
      <section className="border-y border-[#EDE9FE] bg-[#FAF8FF] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-white border border-[#DDD6FE] px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
              Getting Started
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#1E1B4B] sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-2 text-base text-[#475569]">
              Go live with your ready-made CRM in four straightforward steps.
            </p>
          </ScrollReveal>

          <StaggerGrid className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <StaggerItem key={item.step}>
                <div className="h-full rounded-[18px] border border-[#E9D5FF] bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B21B6] text-xs font-bold text-white tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#1E1B4B]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-[24px] bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] p-8 text-white shadow-lg sm:flex-row sm:p-10">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Ready for a tailored CRM setup?
                </h2>
                <p className="mt-2 max-w-xl text-sm sm:text-base text-[#EDE9FE]">
                  Schedule a quick consultation with our implementation specialists or explore our ready-made plans.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => openEnquiryModal('Business Consultation')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#4C1D95] transition hover:bg-[#F3EEFF] cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <Link
                  to="/packages"
                  className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Explore Packages
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
