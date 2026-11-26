import { useState } from 'react';
import {
  Zap,
  RotateCcw,
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  History,
  Plus,
  Trash2,
} from 'lucide-react';
import { DynamicPricingRule, useAdmin } from '../../context/AdminContext';

export function AdminDynamicPricing() {
  const { rules, addRule, toggleRule, deleteRule, priceLogs, rollbackPriceChange } = useAdmin();
  const [newTitle, setNewTitle] = useState('');
  const [ruleType, setRuleType] = useState<DynamicPricingRule['ruleType']>('season');
  const [targetPlan, setTargetPlan] = useState<DynamicPricingRule['targetPlan']>('all');
  const [pct, setPct] = useState<number>(15);
  const [region, setRegion] = useState('South India');
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2026-03-31');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addRule({
      title: newTitle,
      ruleType,
      targetPlan,
      discountPercentage: Number(pct),
      region: ruleType === 'region' ? region : undefined,
      startDate,
      endDate,
      active: true,
    });
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Dynamic Pricing Engine</h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Apply automated price adjustments by region, season, or volume without altering website source code.
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Active Rules List (7 cols) */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1E1B4B]">Scheduled & Active Pricing Rules</h2>
            <span className="text-xs font-semibold text-[#5B21B6]">{rules.filter((r) => r.active).length} Active</span>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-4 rounded-xl border transition ${
                  rule.active ? 'border-[#7C3AED] bg-[#FAF8FF]' : 'border-gray-200 bg-gray-50 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded-md bg-[#EDE9FE] px-2 py-0.5 text-[10px] font-bold text-[#5B21B6] uppercase">
                      {rule.ruleType} Trigger
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-[#1E1B4B]">{rule.title}</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Target: <strong className="capitalize">{rule.targetPlan} Plan(s)</strong> • Discount: <strong className="text-green-600">{rule.discountPercentage}% OFF</strong>
                    </p>
                    {rule.region && (
                      <p className="text-[11px] text-[#5B21B6]">Applicable Region: {rule.region}</p>
                    )}
                    <p className="text-[10px] text-[#94A3B8] mt-1">
                      Active: {rule.startDate} to {rule.endDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRule(rule.id)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                        rule.active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {rule.active ? 'Enabled' : 'Paused'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRule(rule.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rule Creator (5 cols) */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-[#1E1B4B]">Create Dynamic Rule</h2>
          <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-700">Rule Campaign Name *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Telugu New Year / Ugadi Flash Offer"
                className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700">Trigger Type</label>
                <select
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="season">Seasonal / Festival</option>
                  <option value="region">State / City Specific</option>
                  <option value="volume">Multi-Seat Volume</option>
                  <option value="offer">Limited Time Flash</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Target Plan</label>
                <select
                  value={targetPlan}
                  onChange={(e) => setTargetPlan(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="all">All Plans</option>
                  <option value="starter">Starter Only</option>
                  <option value="professional">Professional Only</option>
                  <option value="enterprise">Enterprise Only</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700">Discount (%) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={90}
                  value={pct}
                  onChange={(e) => setPct(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              {ruleType === 'region' ? (
                <div>
                  <label className="font-semibold text-gray-700">Region Name</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                  />
                </div>
              ) : (
                <div>
                  <label className="font-semibold text-gray-700">Scope</label>
                  <input
                    type="text"
                    disabled
                    value="Pan-India (All Customers)"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 p-2.5 text-xs text-gray-500"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#5B21B6] py-2.5 text-xs font-bold text-white hover:bg-[#4C1D95] cursor-pointer"
            >
              Activate Dynamic Rule
            </button>
          </form>
        </div>
      </div>

      {/* Price Change Audit Log with 1-Click Rollback */}
      <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">Price Revision History & Rollback Log</h2>
            <p className="text-xs text-[#64748B]">Audited log of every price change with instant 1-click restore capability</p>
          </div>
          <History className="h-5 w-5 text-[#5B21B6]" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EDE9FE] bg-[#FAF8FF] text-[#64748B]">
                <th className="px-4 py-3 font-bold">Timestamp & Admin</th>
                <th className="px-4 py-3 font-bold">Plan Affected</th>
                <th className="px-4 py-3 font-bold text-right">Old Price</th>
                <th className="px-4 py-3 font-bold text-right">New Price</th>
                <th className="px-4 py-3 font-bold">Business Reason</th>
                <th className="px-4 py-3 font-bold text-center">Safety Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEFF]">
              {priceLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3">
                    <p className="font-bold text-[#1E1B4B]">{log.changedBy}</p>
                    <span className="text-[10px] text-[#94A3B8]">{log.date}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-[#5B21B6]">{log.planName}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#64748B]">₹{log.oldPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-extrabold text-[#1E1B4B]">₹{log.newPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-xs text-[#475569] max-w-xs">{log.reason}</td>
                  <td className="px-4 py-3 text-center">
                    {log.canRollback ? (
                      <button
                        type="button"
                        onClick={() => rollbackPriceChange(log.id)}
                        className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 hover:bg-amber-100 cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Rollback</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-gray-400">Locked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
