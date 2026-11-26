import { useState } from 'react';
import {
  CreditCard,
  Tag,
  CheckCircle2,
  Plus,
  Percent,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CouponItem, useAdmin } from '../../context/AdminContext';
import { PRICING_PLANS } from '../../data/content';

export function AdminPricingPlans() {
  const { customPlanPrices, updatePlanPrice, coupons, addCoupon, toggleCoupon } = useAdmin();
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [priceReason, setPriceReason] = useState<string>('');

  // New coupon form
  const [newCode, setNewCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage');
  const [discountVal, setDiscountVal] = useState<number>(15);
  const [minOrder, setMinOrder] = useState<number>(1000);
  const [validTill, setValidTill] = useState('2026-06-30');

  const startEdit = (planId: string, currentPrice: number) => {
    setEditingPlan(planId);
    setTempPrice(currentPrice);
    setPriceReason('Standard seasonal tariff revision');
  };

  const savePrice = (planId: string) => {
    updatePlanPrice(planId, tempPrice, priceReason);
    setEditingPlan(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    addCoupon({
      code: newCode.toUpperCase().replace(/\s+/g, ''),
      discountType,
      discountValue: Number(discountVal),
      minOrder: Number(minOrder),
      validTill,
      usageCount: 0,
      active: true,
    });
    setNewCode('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">CRM Subscription Pricing & Plan Manager</h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Configure base plan pricing, monthly/quarterly/yearly discounts, feature entitlement limits, and promotional coupons.
        </p>
      </div>

      {/* 3 Main Subscription Plans Editor */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const currentBasePrice = customPlanPrices[plan.id] || (plan.monthlyPrice ?? 4999);
          const isEditing = editingPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 bg-white shadow-xs transition hover:shadow-md flex flex-col justify-between ${
                plan.highlighted ? 'border-[#7C3AED] ring-2 ring-[#EDE9FE]' : 'border-[#EDE9FE]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                    {plan.id.toUpperCase()} TIER
                  </span>
                  {plan.badge && (
                    <span className="rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-bold text-[#5B21B6]">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-xl font-extrabold text-[#1E1B4B]">{plan.name}</h3>
                <p className="mt-1 text-xs text-[#64748B]">{plan.description}</p>

                {/* Price Display / Inline Editor */}
                <div className="mt-5 p-4 rounded-xl bg-[#FAF8FF] border border-[#F3EEFF]">
                  {isEditing ? (
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-[#1E1B4B]">Edit Monthly Rate (₹):</label>
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-full rounded-lg border border-[#7C3AED] bg-white p-2 text-sm font-bold text-[#1E1B4B]"
                      />
                      <input
                        type="text"
                        value={priceReason}
                        onChange={(e) => setPriceReason(e.target.value)}
                        placeholder="Reason for change..."
                        className="w-full rounded-lg border border-[#EDE9FE] bg-white p-1.5 text-xs text-[#475569]"
                      />
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setEditingPlan(null)}
                          className="flex-1 py-1 rounded-md text-xs border border-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => savePrice(plan.id)}
                          className="flex-1 py-1 rounded-md text-xs font-bold bg-[#5B21B6] text-white"
                        >
                          Save Live
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs text-[#64748B]">Configured Live Rate:</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-[#5B21B6] tabular-nums">
                          ₹{currentBasePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#64748B]">/ month</span>
                      </div>
                      <p className="text-[10px] text-green-700 mt-1 font-semibold">
                        Yearly equivalent: ₹{Math.round(currentBasePrice * 12 * 0.8).toLocaleString('en-IN')}/yr (Save 20%)
                      </p>
                      <button
                        type="button"
                        onClick={() => startEdit(plan.id, currentBasePrice)}
                        className="mt-3 text-xs font-bold text-[#7C3AED] hover:underline"
                      >
                        ✎ Adjust Base Rate
                      </button>
                    </div>
                  )}
                </div>

                {/* Feature Entitlement Limits */}
                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                    Plan Quotas & Entitlements:
                  </span>
                  <ul className="text-xs space-y-1.5 text-[#475569]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Staff Logins: <strong>{plan.id === 'starter' ? '2 Users' : plan.id === 'professional' ? '10 Users' : 'Unlimited'}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>Cloud Storage: <strong>{plan.id === 'starter' ? '5 GB' : plan.id === 'professional' ? '50 GB' : '500 GB'}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>WhatsApp Bill Dispatch: <strong>{plan.id === 'starter' ? '500 msgs/mo' : 'Unlimited'}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0" />
                      <span>GST Invoicing & Barcodes: <strong>Included</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F3EEFF] text-[11px] text-[#64748B]">
                Applies to all 6 CRMs (Catering, Hostels, Hotels, Karam Podi, Pickles, Lunch Box).
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupons & Promo Codes Manager */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Coupon List */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E1B4B]">Active Promo Codes & Special Offers</h2>
              <p className="text-xs text-[#64748B]">Discount coupons usable on public /checkout page</p>
            </div>
            <span className="text-xs font-bold text-[#5B21B6]">{coupons.length} Configured</span>
          </div>

          <div className="space-y-3">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="flex items-center justify-between p-4 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] hover:border-[#C4B5FD] transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#5B21B6] text-white font-mono text-xs font-extrabold tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-green-700">
                      {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Min Order: ₹{c.minOrder} • Valid till {c.validTill} • Used {c.usageCount} times
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCoupon(c.code)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                      c.active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {c.active ? 'Active' : 'Disabled'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Coupon Form */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-[#1E1B4B]">Create New Promo Code</h2>
          <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700">Coupon Code *</label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g. SUMMERFEST25"
                className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 font-mono uppercase font-bold text-[#1E1B4B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700">Discount Type</label>
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="flat">Flat Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Discount Value *</label>
                <input
                  type="number"
                  required
                  value={discountVal}
                  onChange={(e) => setDiscountVal(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700">Min Order Amount (₹)</label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={validTill}
                  onChange={(e) => setValidTill(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#5B21B6] py-2.5 text-xs font-bold text-white hover:bg-[#4C1D95] cursor-pointer"
            >
              Add Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
