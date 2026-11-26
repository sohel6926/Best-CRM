import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Minus, PhoneCall } from 'lucide-react';
import {
  COMPARE_PLANS_ROWS,
  PACKAGES_FAQS,
  PRICING_PLANS,
  PricingPlan,
} from '../data/content';
import { BillingCycle, useApp } from '../context/AppContext';
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';

export function PackagesPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const navigate = useNavigate();
  const { selectPlanForCheckout, openEnquiryModal } = useApp();

  const handlePlanClick = (plan: PricingPlan) => {
    if (plan.id === 'enterprise' || plan.ctaType === 'sales') {
      openEnquiryModal('Enterprise Custom Plan');
      return;
    }
    selectPlanForCheckout(plan.id, billingCycle);
    navigate('/checkout');
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white pt-8 pb-8 sm:pt-10 sm:pb-9">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 hero-entrance">
          <span className="inline-block rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
            Pricing & Plans
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-5xl">
            Explore Our Packages
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#475569] sm:text-lg">
            Choose the right CRM plan for your business. Flexible, affordable and scalable.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div
              role="group"
              aria-label="Billing cycle"
              className="inline-flex items-center rounded-2xl border border-[#DDD6FE] bg-white p-1.5 shadow-xs"
            >
              <button
                type="button"
                aria-pressed={billingCycle === 'monthly'}
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#5B21B6] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#1E1B4B]'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={billingCycle === 'yearly'}
                onClick={() => setBillingCycle('yearly')}
                className={`rounded-xl px-5 py-2 text-sm font-semibold transition cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-[#5B21B6] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#1E1B4B]'
                }`}
              >
                Yearly
              </button>
            </div>
            <span className="inline-flex items-center rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#15803D]">
              Save up to 20%
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid className="grid grid-cols-1 gap-7 lg:grid-cols-3 lg:items-stretch">
            {PRICING_PLANS.map((plan) => {
              const displayPrice =
                plan.monthlyPrice === null
                  ? plan.priceLabel
                  : billingCycle === 'monthly'
                  ? `₹${plan.monthlyPrice.toLocaleString('en-IN')}`
                  : `₹${plan.yearlyMonthlyEquivalent?.toLocaleString('en-IN')}`;

              return (
                <StaggerItem key={plan.id}>
                  <article
                    className={`relative flex h-full flex-col justify-between rounded-[20px] bg-white p-7 sm:p-8 transition duration-200 hover:-translate-y-1 ${
                      plan.highlighted
                        ? 'border-2 border-[#7C3AED] shadow-[0_22px_50px_-15px_rgba(124,58,237,0.24)]'
                        : 'border border-[#E9D5FF] shadow-[0_10px_30px_-12px_rgba(76,29,149,0.08)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-bold text-[#1E1B4B]">{plan.name}</h2>
                        {plan.badge && (
                          <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-bold text-[#5B21B6]">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <p className="mt-2.5 text-sm text-[#475569]">{plan.description}</p>

                      <div className="mt-6 border-b border-[#F3EEFF] pb-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-4xl font-extrabold tracking-tight text-[#1E1B4B] tabular-nums">
                            {displayPrice}
                          </span>
                          {plan.monthlyPrice !== null && (
                            <span className="text-sm font-medium text-[#64748B]">/month</span>
                          )}
                        </div>
                        {plan.monthlyPrice !== null && billingCycle === 'yearly' && (
                          <p className="mt-1.5 text-xs font-medium text-[#15803D]">
                            billed yearly (20% off monthly price)
                          </p>
                        )}
                      </div>

                      <ul className="mt-6 space-y-3.5">
                        {plan.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-2.5 text-sm text-[#475569]"
                          >
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-2">
                      <button
                        type="button"
                        onClick={() => handlePlanClick(plan)}
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition active:scale-[0.99] cursor-pointer ${
                          plan.highlighted
                            ? 'bg-[#5B21B6] text-white shadow-md hover:bg-[#4C1D95]'
                            : 'border border-[#C4B5FD] bg-white text-[#5B21B6] hover:bg-[#F3EEFF]'
                        }`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Compare Plans Table */}
      <section className="py-8 sm:py-10 bg-[#FAF8FF] border-y border-[#EDE9FE]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <h2 className="text-2xl font-bold text-[#1E1B4B] sm:text-3xl">
              Compare Plans
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              Detailed breakdown of capabilities across Starter, Professional, and Enterprise.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-[18px] border border-[#E9D5FF] bg-white shadow-xs">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#EDE9FE] bg-[#F3EEFF]/60">
                    <th className="px-6 py-4 font-bold text-[#1E1B4B]">Feature</th>
                    <th className="px-6 py-4 text-center font-bold text-[#1E1B4B]">Starter</th>
                    <th className="px-6 py-4 text-center font-bold text-[#5B21B6]">
                      Professional
                    </th>
                    <th className="px-6 py-4 text-center font-bold text-[#1E1B4B]">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EEFF]">
                  {COMPARE_PLANS_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-[#FAF8FF]">
                      <td className="px-6 py-4 font-medium text-[#1E1B4B]">
                        {row.feature}
                      </td>
                      {(['starter', 'professional', 'enterprise'] as const).map((col) => {
                        const val = row[col];
                        return (
                          <td
                            key={col}
                            className="px-6 py-4 text-center tabular-nums text-[#475569]"
                          >
                            {typeof val === 'boolean' ? (
                              val ? (
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DCFCE7] text-[#15803D]">
                                  <Check className="h-3.5 w-3.5" aria-label="Included" />
                                </span>
                              ) : (
                                <span className="inline-flex h-6 w-6 items-center justify-center text-[#94A3B8]">
                                  <Minus className="h-4 w-4" aria-label="Not included" />
                                </span>
                              )
                            ) : (
                              <span className="font-semibold text-[#1E1B4B]">{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center">
            <h2 className="text-2xl font-bold text-[#1E1B4B] sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-[#475569]">
              Answers about billing, plan upgrades, security, and mobile app onboarding.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="mt-8 space-y-3">
            {PACKAGES_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-[#E9D5FF] bg-white overflow-hidden"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm sm:text-base font-bold text-[#1E1B4B] hover:bg-[#FAF8FF] transition cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#7C3AED] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div
                      id={`faq-panel-${idx}`}
                      className="border-t border-[#F3EEFF] px-6 py-4 text-sm leading-relaxed text-[#475569]"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Enquiry Strip */}
      <section className="pb-10 pt-2">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-[#DDD6FE] bg-[#F3EEFF] px-6 py-8 sm:flex-row sm:px-10">
              <div>
                <h2 className="text-xl font-bold text-[#1E1B4B]">
                  Need help choosing? Talk to our team.
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  Tell us about your team size and business type—we will recommend the right plan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openEnquiryModal('Pricing & Onboarding')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4C1D95] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                <span>Talk to Our Team</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
