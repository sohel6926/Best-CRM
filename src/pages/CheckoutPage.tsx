import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Info,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { CRM_PRODUCTS, PRICING_PLANS } from '../data/content';
import { useApp } from '../context/AppContext';
import { useAdmin } from '../context/AdminContext';
import { CrmIcon } from '../components/CrmIcon';

export function CheckoutPage() {
  const { checkout, setCheckout, selectedPlan, selectedCrm } = useApp();
  const { customPlanPrices } = useAdmin();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  // Mock display-only card fields (never stored or transmitted)
  const [mockNameOnCard, setMockNameOnCard] = useState('');
  const [mockLast4, setMockLast4] = useState('4242');

  const navigate = useNavigate();

  const liveMonthlyPrice = customPlanPrices[selectedPlan.id] ?? selectedPlan.monthlyPrice ?? 2499;
  const liveYearlyMonthlyEquivalent = Math.round(liveMonthlyPrice * 0.8);

  const unitPrice =
    checkout.billingCycle === 'monthly'
      ? liveMonthlyPrice
      : liveYearlyMonthlyEquivalent;

  const totalPayable =
    checkout.billingCycle === 'monthly' ? unitPrice : unitPrice * 12;

  const handleNextFromStep1 = () => {
    setError('');
    setStep(2);
  };

  const handleNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !checkout.customerName.trim() ||
      !checkout.customerEmail.trim() ||
      !checkout.customerPhone.trim() ||
      !checkout.businessName.trim()
    ) {
      setError('Please fill in your name, email, phone, and business name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkout.customerEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (checkout.customerPhone.replace(/\D/g, '').length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }
    setError('');
    setStep(3);
  };

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    // TODO: connect to API — Replace simulated checkout timeout with real payment/subscription endpoint
    window.setTimeout(() => {
      setCheckout((prev) => ({
        ...prev,
        subscribedAt: new Date().toISOString(),
      }));
      setProcessing(false);
      navigate('/download');
    }, 1100);
  };

  return (
    <div className="bg-[#FAF8FF] py-8 sm:py-10 min-h-[75vh]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Heading & Stepper */}
        <div className="mb-8">
          <span className="inline-block rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
            Quick Onboarding
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-[#1E1B4B] sm:text-4xl">
            Complete Your Subscription
          </h1>

          {/* 3-Step Indicator */}
          <ol className="mt-6 grid grid-cols-3 gap-3 sm:max-w-xl">
            {[
              { num: 1, label: 'Select CRM' },
              { num: 2, label: 'Your Details' },
              { num: 3, label: 'Review & Pay' },
            ].map((item) => {
              const active = step === item.num;
              const completed = step > item.num;
              return (
                <li
                  key={item.num}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-semibold ${
                    active
                      ? 'border-[#7C3AED] bg-white text-[#5B21B6] shadow-xs'
                      : completed
                      ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]'
                      : 'border-[#E9D5FF] bg-white/70 text-[#64748B]'
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums ${
                      active
                        ? 'bg-[#5B21B6] text-white'
                        : completed
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-[#EDE9FE] text-[#5B21B6]'
                    }`}
                  >
                    {completed ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : item.num}
                  </span>
                  <span className="truncate">{item.label}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Main Checkout Column */}
          <div className="card-surface p-6 sm:p-8 lg:col-span-8">
            {/* Step 1: Select CRM */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#1E1B4B]">
                  Step 1: Choose Your Industry CRM
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  Select one ready-made CRM workspace for your business.
                </p>

                <div
                  role="radiogroup"
                  aria-label="Select CRM type"
                  className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  {CRM_PRODUCTS.map((crm) => {
                    const isSelected = checkout.crmId === crm.id;
                    return (
                      <button
                        key={crm.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() =>
                          setCheckout((prev) => ({ ...prev, crmId: crm.id }))
                        }
                        className={`flex flex-col items-start rounded-2xl border p-4 text-left transition cursor-pointer ${
                          isSelected
                            ? 'border-2 border-[#7C3AED] bg-[#F3EEFF]/60 shadow-xs'
                            : 'border-[#E9D5FF] bg-white hover:border-[#C4B5FD]'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#5B21B6]">
                              <CrmIcon name={crm.icon} className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-bold text-[#1E1B4B]">
                              {crm.name}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#5B21B6] text-white">
                              <Check className="h-3 w-3" aria-hidden="true" />
                            </span>
                          )}
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-[#475569]">
                          {crm.shortDesc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextFromStep1}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
                  >
                    <span>Continue to Your Details</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Business & Contact Details */}
            {step === 2 && (
              <form onSubmit={handleNextFromStep2} noValidate>
                <h2 className="text-xl font-bold text-[#1E1B4B]">
                  Step 2: Your Business Details
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  We will set up your {selectedCrm.name} workspace under these details.
                </p>

                {error && (
                  <div
                    role="alert"
                    className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
                  >
                    {error}
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={checkout.customerName}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                      placeholder="e.g. Ananya Sharma"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-business"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Business Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="checkout-business"
                      type="text"
                      required
                      value={checkout.businessName}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          businessName: e.target.value,
                        }))
                      }
                      placeholder="e.g. Sri Sai Caterers"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={checkout.customerEmail}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          customerEmail: e.target.value,
                        }))
                      }
                      placeholder="owner@business.com"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={checkout.customerPhone}
                      onChange={(e) =>
                        setCheckout((prev) => ({
                          ...prev,
                          customerPhone: e.target.value,
                        }))
                      }
                      placeholder="+91 98765 43210"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD6FE] px-4 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#FAF8FF] cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
                  >
                    <span>Continue to Review</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Review & Pay Now (Simulated) */}
            {step === 3 && (
              <form onSubmit={handlePayNow}>
                <h2 className="text-xl font-bold text-[#1E1B4B]">
                  Step 3: Review & Simulated Payment
                </h2>
                <p className="mt-1 text-sm text-[#475569]">
                  Confirm your selected CRM and plan below to continue to the app download screen.
                </p>

                {/* Visible Demo Notice */}
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#C4B5FD] bg-[#F3EEFF] px-4 py-3 text-xs font-medium text-[#4C1D95]">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#5B21B6]" aria-hidden="true" />
                  <span>
                    Demo mode, no payment is taken. Do not enter real card numbers—this preview simulates onboarding only.
                  </span>
                </div>

                {/* Review Summary Box */}
                <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] p-4 text-xs sm:grid-cols-2">
                  <div>
                    <p className="text-[#64748B]">CRM Selected</p>
                    <p className="mt-0.5 font-bold text-[#1E1B4B]">{selectedCrm.name}</p>
                  </div>
                  <div>
                    <p className="text-[#64748B]">Business</p>
                    <p className="mt-0.5 font-bold text-[#1E1B4B]">
                      {checkout.businessName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#64748B]">Subscriber</p>
                    <p className="mt-0.5 font-semibold text-[#1E1B4B]">
                      {checkout.customerName} ({checkout.customerEmail})
                    </p>
                  </div>
                  <div>
                    <p className="text-[#64748B]">Phone</p>
                    <p className="mt-0.5 font-semibold text-[#1E1B4B] tabular-nums">
                      {checkout.customerPhone}
                    </p>
                  </div>
                </div>

                {/* Mock Payment Fields */}
                <div className="mt-5 space-y-4 rounded-2xl border border-[#E9D5FF] bg-white p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1E1B4B]">
                    <CreditCard className="h-4 w-4 text-[#7C3AED]" aria-hidden="true" />
                    <span>Simulated Payment Method</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="mock-card-holder"
                        className="block text-xs font-semibold text-[#1E1B4B]"
                      >
                        Name on Demo Card
                      </label>
                      <input
                        id="mock-card-holder"
                        type="text"
                        value={mockNameOnCard}
                        onChange={(e) => setMockNameOnCard(e.target.value)}
                        placeholder={checkout.customerName || 'Demo User'}
                        className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mock-card-test"
                        className="block text-xs font-semibold text-[#1E1B4B]"
                      >
                        Simulated Reference
                      </label>
                      <input
                        id="mock-card-test"
                        type="text"
                        value={`DEMO-••••-${mockLast4}`}
                        onChange={(e) => setMockLast4(e.target.value.slice(-4) || '4242')}
                        readOnly
                        className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#F3EEFF]/60 px-3.5 py-2.5 text-sm text-[#5B21B6] font-medium tabular-nums"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={processing}
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD6FE] px-4 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#FAF8FF] disabled:opacity-50 cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4C1D95] disabled:opacity-75 cursor-pointer"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Activating Workspace...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          Pay Now (₹{totalPayable.toLocaleString('en-IN')})
                        </span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <aside className="card-surface p-6 lg:col-span-4 space-y-5">
            <h2 className="text-lg font-bold text-[#1E1B4B]">Order Summary</h2>

            {/* Switch Plan / Cycle inside Order Summary */}
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="summary-plan"
                  className="block text-xs font-semibold text-[#64748B]"
                >
                  Plan
                </label>
                <select
                  id="summary-plan"
                  value={checkout.planId}
                  onChange={(e) =>
                    setCheckout((prev) => ({
                      ...prev,
                      planId: e.target.value as 'starter' | 'professional',
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3 py-2 text-sm font-semibold text-[#1E1B4B] focus:border-[#7C3AED] focus:outline-none"
                >
                  {PRICING_PLANS.filter((p) => p.ctaType === 'checkout').map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="summary-cycle"
                  className="block text-xs font-semibold text-[#64748B]"
                >
                  Billing Cycle
                </label>
                <select
                  id="summary-cycle"
                  value={checkout.billingCycle}
                  onChange={(e) =>
                    setCheckout((prev) => ({
                      ...prev,
                      billingCycle: e.target.value as 'monthly' | 'yearly',
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3 py-2 text-sm font-semibold text-[#1E1B4B] focus:border-[#7C3AED] focus:outline-none"
                >
                  <option value="monthly">Monthly Billing</option>
                  <option value="yearly">Yearly Billing (Save 20%)</option>
                </select>
              </div>
            </div>

            <div className="border-t border-[#F3EEFF] pt-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#475569]">CRM Module</span>
                <span className="font-semibold text-[#1E1B4B]">{selectedCrm.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#475569]">Monthly Equivalent</span>
                <span className="font-semibold text-[#1E1B4B] tabular-nums">
                  ₹{unitPrice.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#F3EEFF] pt-3">
                <span className="font-bold text-[#1E1B4B]">
                  {checkout.billingCycle === 'monthly' ? 'Due Monthly' : 'Due Yearly'}
                </span>
                <span className="text-xl font-extrabold text-[#5B21B6] tabular-nums">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-[#F0FDF4] px-3.5 py-2.5 text-xs font-medium text-[#15803D]">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Demo mode: zero real charges</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
