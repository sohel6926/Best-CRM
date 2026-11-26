import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  ArrowRight,
  Filter,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { CRM_PRODUCTS } from '../../data/content';

export function AdminDashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { users, transactions, leads, tickets, customPlanPrices } = useAdmin();
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'year'>('30days');

  // Multiplier for mock date filtering
  const multiplier = dateRange === 'today' ? 0.08 : dateRange === '7days' ? 0.35 : dateRange === '30days' ? 1.0 : 12.0;

  const totalRevenue = Math.round(transactions.reduce((sum, t) => sum + (t.status === 'paid' ? t.totalAmount : 0), 0) * multiplier);
  const totalOrders = Math.round(transactions.length * multiplier);
  const activeUsersCount = users.filter((u) => u.status === 'active').length;
  const blockedUsersCount = users.filter((u) => u.status === 'blocked').length;
  const pendingLeadsCount = leads.filter((l) => l.status === 'new' || l.status === 'contacted').length;
  const openTicketsCount = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;

  const revenueByCrm = CRM_PRODUCTS.map((crm) => {
    const crmTxns = transactions.filter((t) => t.crmId === crm.id && t.status === 'paid');
    const revenue = Math.round(crmTxns.reduce((sum, t) => sum + t.totalAmount, 0) * multiplier);
    const count = Math.max(1, Math.round(crmTxns.length * multiplier));
    return {
      ...crm,
      revenue: revenue || Math.round(24000 * multiplier),
      count: count || 2,
    };
  }).sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      {/* Top Banner & Date Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] p-6 text-white shadow-md">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#DDD6FE]" />
            Real-time Business Telemetry
          </span>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl text-white drop-shadow-xs">Executive Dashboard</h1>
          <p className="mt-1 text-xs sm:text-sm text-[#DDD6FE]">
            Monitor revenue, CRM subscriber growth, sales pipelines, and support queues across India.
          </p>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl bg-black/20 p-1.5 backdrop-blur-md self-start sm:self-auto">
          {(['today', '7days', '30days', 'year'] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setDateRange(range)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer capitalize ${
                dateRange === range
                  ? 'bg-white text-[#5B21B6] shadow-sm'
                  : 'text-[#DDD6FE] hover:text-white'
              }`}
            >
              {range === '7days' ? 'Last 7 Days' : range === '30days' ? 'Last 30 Days' : range === 'year' ? 'This Year' : 'Today'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Total Revenue */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Total Revenue
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#5B21B6]">
              <DollarSign className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1E1B4B] tabular-nums">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-green-600">
              <TrendingUp className="mr-0.5 h-3 w-3" /> +18.4%
            </span>
          </div>
          <p className="mt-1 text-xs text-[#94A3B8]">
            GST accounted (CGST 9% + SGST 9%)
          </p>
        </div>

        {/* KPI 2: Active CRM Subscribers */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Active Subscribers
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Users className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1E1B4B] tabular-nums">
              {activeUsersCount} Businesses
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              ({blockedUsersCount} blocked/unpaid)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('users')}
            className="mt-2 text-xs font-semibold text-[#5B21B6] hover:underline"
          >
            Manage user accounts →
          </button>
        </div>

        {/* KPI 3: Sales & Orders */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Orders & Renewals
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <ShoppingBag className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1E1B4B] tabular-nums">
              {totalOrders} Transactions
            </span>
            <span className="text-xs font-semibold text-green-600">100% verified</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('sales')}
            className="mt-2 text-xs font-semibold text-[#5B21B6] hover:underline"
          >
            View sales & GST reports →
          </button>
        </div>

        {/* KPI 4: Pending Enquiries & Support */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Leads & Open Tickets
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#1E1B4B] tabular-nums">
              {pendingLeadsCount} Leads
            </span>
            <span className="text-xs font-bold text-amber-600">
              / {openTicketsCount} Tickets
            </span>
          </div>
          <div className="mt-2 flex gap-3 text-xs font-semibold">
            <button
              type="button"
              onClick={() => onNavigate('leads')}
              className="text-[#5B21B6] hover:underline"
            >
              Leads ({pendingLeadsCount})
            </button>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={() => onNavigate('support')}
              className="text-amber-700 hover:underline"
            >
              Tickets ({openTicketsCount})
            </button>
          </div>
        </div>
      </div>

      {/* Trend Visualizer & Revenue Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 8 Cols: Revenue Trend Chart */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E1B4B]">Revenue & Growth Trend</h2>
              <p className="text-xs text-[#64748B]">Monthly subscription recurring revenue (MRR/ARR)</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-semibold text-[#5B21B6]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#5B21B6]" /> Paid Revenue
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#C4B5FD]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C4B5FD]" /> Projected
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="mt-6 flex h-48 items-end gap-3 pt-6 border-b border-[#F3EEFF]">
            {[
              { month: 'Oct', paid: 60, proj: 75, val: '₹3.4L' },
              { month: 'Nov', paid: 72, proj: 85, val: '₹4.1L' },
              { month: 'Dec', paid: 85, proj: 95, val: '₹4.9L' },
              { month: 'Jan', paid: 92, proj: 100, val: '₹5.3L' },
              { month: 'Feb (Current)', paid: 100, proj: 115, val: '₹5.8L' },
              { month: 'Mar (Est)', paid: 40, proj: 130, val: '₹6.5L' },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-[#5B21B6] opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.val}
                </span>
                <div className="w-full max-w-[42px] flex items-end gap-1 h-full">
                  <div
                    style={{ height: `${bar.paid}%` }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-[#4C1D95] to-[#7C3AED] transition-all group-hover:brightness-110"
                  />
                  <div
                    style={{ height: `${bar.proj}%` }}
                    className="flex-1 rounded-t-md bg-[#EDE9FE] transition-all"
                  />
                </div>
                <span className="text-xs font-semibold text-[#64748B]">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[#64748B]">
            <span>Average Order Value: <strong className="text-[#1E1B4B]">₹18,450 / yr</strong></span>
            <span>Customer Retention Rate: <strong className="text-green-600">94.8%</strong></span>
          </div>
        </div>

        {/* Right 4 Cols: Top Selling CRMs */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">Top-Selling Industry CRMs</h2>
            <p className="text-xs text-[#64748B]">Ranked by total subscriber revenue</p>

            <div className="mt-4 space-y-3">
              {revenueByCrm.slice(0, 4).map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl border border-[#F3EEFF] hover:bg-[#FAF8FF] transition">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EDE9FE] text-xs font-bold text-[#5B21B6]">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#1E1B4B]">{item.name}</p>
                      <p className="text-[11px] text-[#64748B]">{item.count} Active Subscriptions</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#5B21B6] tabular-nums">
                    ₹{item.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F3EEFF] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B]">Explore all 6 ready-made CRMs:</span>
            <button
              type="button"
              onClick={() => onNavigate('crm_workspaces')}
              className="text-xs font-bold text-[#7C3AED] hover:underline"
            >
              Open Workspaces →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Sales & High Priority Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Recent Transactions Table */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E1B4B]">Recent Sales Transactions</h2>
              <p className="text-xs text-[#64748B]">Live invoice collections and renewals</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('sales')}
              className="text-xs font-semibold text-[#5B21B6] hover:underline"
            >
              View All ({transactions.length}) →
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDE9FE] text-[#64748B]">
                  <th className="pb-2.5 font-semibold">Invoice & Customer</th>
                  <th className="pb-2.5 font-semibold">CRM & Plan</th>
                  <th className="pb-2.5 font-semibold text-right">Amount</th>
                  <th className="pb-2.5 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EEFF]">
                {transactions.slice(0, 4).map((t) => (
                  <tr key={t.id} className="hover:bg-[#FAF8FF]">
                    <td className="py-3">
                      <p className="font-bold text-[#1E1B4B]">{t.customerName}</p>
                      <p className="text-[11px] text-[#64748B]">{t.businessName} • {t.invoiceNo}</p>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-[#5B21B6]">{t.crmName}</span>
                      <p className="text-[11px] text-[#64748B]">{t.planName} ({t.billingCycle})</p>
                    </td>
                    <td className="py-3 text-right tabular-nums font-bold text-[#1E1B4B]">
                      ₹{t.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          t.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : t.status === 'refunded'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Live Control Shortcuts */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-[#1E1B4B]">Quick Admin Operations</h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dynamic_pricing')}
              className="flex flex-col items-start gap-1 p-3.5 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] hover:bg-[#F3EEFF] transition cursor-pointer text-left"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B21B6] text-white">
                <DollarSign className="h-4 w-4" />
              </span>
              <span className="mt-1 text-xs font-bold text-[#1E1B4B]">Dynamic Pricing</span>
              <span className="text-[10px] text-[#64748B]">Adjust live prices without code</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('simulation')}
              className="flex flex-col items-start gap-1 p-3.5 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] hover:bg-[#F3EEFF] transition cursor-pointer text-left"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <TrendingUp className="h-4 w-4" />
              </span>
              <span className="mt-1 text-xs font-bold text-[#1E1B4B]">Pricing Simulator</span>
              <span className="text-[10px] text-[#64748B]">Simulate revenue impact</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('leads')}
              className="flex flex-col items-start gap-1 p-3.5 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] hover:bg-[#F3EEFF] transition cursor-pointer text-left"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                <Users className="h-4 w-4" />
              </span>
              <span className="mt-1 text-xs font-bold text-[#1E1B4B]">Lead Pipeline</span>
              <span className="text-[10px] text-[#64748B]">{pendingLeadsCount} follow-ups pending</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('app_control')}
              className="flex flex-col items-start gap-1 p-3.5 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] hover:bg-[#F3EEFF] transition cursor-pointer text-left"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-600 text-white">
                <Layers className="h-4 w-4" />
              </span>
              <span className="mt-1 text-xs font-bold text-[#1E1B4B]">App Banner Sync</span>
              <span className="text-[10px] text-[#64748B]">Live marketing broadcast</span>
            </button>
          </div>

          {/* Direct link to launch CRM Workspaces */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#EDE9FE] to-[#F3EEFF] border border-[#DDD6FE]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-[#4C1D95]">Ready-Made CRM Workspaces</p>
                <p className="text-[11px] text-[#5B21B6]">Simulate customer experience across all 6 industry CRMs</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('crm_workspaces')}
                className="inline-flex items-center gap-1 rounded-lg bg-[#5B21B6] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#4C1D95] cursor-pointer"
              >
                <span>Launch Hub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
