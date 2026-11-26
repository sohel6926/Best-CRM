import React, { useState } from 'react';
import { 
  Trophy, Target, TrendingUp, DollarSign, Calendar, 
  ArrowUpRight, CheckCircle2, AlertCircle, BarChart3, Sparkles,
  Flame, Clock, ChevronRight, Filter
} from 'lucide-react';

interface MonthTarget {
  month: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  theme: string;
  targetAmount: number;
  achievedAmount: number;
  platesCount: number;
  status: 'Exceeded' | 'Achieved' | 'In Progress' | 'Upcoming';
  growthNote: string;
}

export function AdminTargets() {
  const [activeYear] = useState('FY 2026-2027');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');

  const annualKpis = [
    {
      metric: 'Annual GMV Target',
      target: '₹2.50 Cr',
      achieved: '₹1.84 Cr',
      percent: 74,
      trend: '+18% vs Last Year',
      status: 'On Track',
    },
    {
      metric: 'Confirmed Wedding Contracts',
      target: '180 Events',
      achieved: '142 Events',
      percent: 79,
      trend: '+24 Contracts',
      status: 'Ahead of Target',
    },
    {
      metric: 'Corporate Recurring Lunches',
      target: '300 Boxes/Day',
      achieved: '264 Boxes/Day',
      percent: 88,
      trend: '8 Corridors Active',
      status: 'Nearly Achieved',
    },
    {
      metric: 'Average Gross Margin',
      target: '42.0%',
      achieved: '38.4%',
      percent: 91,
      trend: 'Mandi price stability',
      status: 'Healthy',
    },
  ];

  const quarters = [
    { name: 'Q1 (Apr - Jun)', target: '₹50 Lakhs', actual: '₹52 Lakhs', status: 'Exceeded (104%)', note: 'Summer Wedding Surge' },
    { name: 'Q2 (Jul - Sep)', target: '₹45 Lakhs', actual: '₹48 Lakhs', status: 'Exceeded (106%)', note: 'Corporate Tiffin Ramp-up' },
    { name: 'Q3 (Oct - Dec)', target: '₹85 Lakhs', actual: '₹84 Lakhs', status: 'Achieved (99%)', note: 'Dussehra & Winter Muhurthams' },
    { name: 'Q4 (Jan - Mar)', target: '₹70 Lakhs', actual: '₹62 Lakhs (Projected)', status: 'In Progress (88%)', note: 'Ugadi & Pre-Summer Lagnams' },
  ];

  const monthlyTargets: MonthTarget[] = [
    {
      month: 'April 2026',
      quarter: 'Q1',
      theme: 'Vaisakha Wedding Season & Chaitra Feasts',
      targetAmount: 1800000,
      achievedAmount: 1950000,
      platesCount: 3800,
      status: 'Exceeded',
      growthNote: '+8% over target • 12 Wedding contracts',
    },
    {
      month: 'May 2026',
      quarter: 'Q1',
      theme: 'Peak Summer Muhurtham Lagnams',
      targetAmount: 2000000,
      achievedAmount: 2120000,
      platesCount: 4250,
      status: 'Exceeded',
      growthNote: 'Record Month • N Convention & Fort Grand',
    },
    {
      month: 'June 2026',
      quarter: 'Q1',
      theme: 'Corporate Tech Park Onboarding',
      targetAmount: 1200000,
      achievedAmount: 1130000,
      platesCount: 2600,
      status: 'Achieved',
      growthNote: '94% achieved • 4 new IT tech corridors',
    },
    {
      month: 'July 2026',
      quarter: 'Q2',
      theme: 'Monsoon Comfort & Shravanam Inquiries',
      targetAmount: 1300000,
      achievedAmount: 1420000,
      platesCount: 3100,
      status: 'Exceeded',
      growthNote: 'Early Shravana bookings locked',
    },
    {
      month: 'August 2026',
      quarter: 'Q2',
      theme: 'Varalakshmi Vratam & Shravana Muhurthams',
      targetAmount: 1600000,
      achievedAmount: 1710000,
      platesCount: 3900,
      status: 'Exceeded',
      growthNote: 'Pure Sattvik Thali catering surge',
    },
    {
      month: 'September 2026',
      quarter: 'Q2',
      theme: 'Ganesh Chaturthi Utsav Feasts',
      targetAmount: 1600000,
      achievedAmount: 1670000,
      platesCount: 3750,
      status: 'Exceeded',
      growthNote: 'Modak & Laddu Prasadam bulk supply',
    },
    {
      month: 'October 2026',
      quarter: 'Q3',
      theme: 'Navratri, Dussehra & Vijayadashami',
      targetAmount: 2400000,
      achievedAmount: 2380000,
      platesCount: 5200,
      status: 'Achieved',
      growthNote: '99% target • Major tech summits catered',
    },
    {
      month: 'November 2026',
      quarter: 'Q3',
      theme: 'Kartika Masam Grand Wedding Wave',
      targetAmount: 3200000,
      achievedAmount: 3250000,
      platesCount: 6800,
      status: 'Exceeded',
      growthNote: 'Highest single month revenue in company history',
    },
    {
      month: 'December 2026',
      quarter: 'Q3',
      theme: 'Winter Destination Weddings & Corporate Parties',
      targetAmount: 2900000,
      achievedAmount: 2770000,
      platesCount: 5900,
      status: 'Achieved',
      growthNote: '96% achieved • Live Tawa counter demand',
    },
    {
      month: 'January 2027',
      quarter: 'Q4',
      theme: 'Sankranti Bhogi Feasts & Magha Muhurthams',
      targetAmount: 2200000,
      achievedAmount: 2240000,
      platesCount: 4800,
      status: 'Exceeded',
      growthNote: 'Traditional Andhra Ariselu & Pulihora spreads',
    },
    {
      month: 'February 2027',
      quarter: 'Q4',
      theme: 'Pre-Ugadi Corporate & Destination Receptions',
      targetAmount: 2300000,
      achievedAmount: 2190000,
      platesCount: 4600,
      status: 'Achieved',
      growthNote: '95% achieved • Silver thali VIP bookings',
    },
    {
      month: 'March 2027 (Active)',
      quarter: 'Q4',
      theme: 'Ugadi Telugu New Year & Fiscal Closing Push',
      targetAmount: 2500000,
      achievedAmount: 1820000,
      platesCount: 3700,
      status: 'In Progress',
      growthNote: '73% achieved • 9 days left to hit ₹25 Lakhs goal',
    },
  ];

  const filteredMonths = monthlyTargets.filter(m => selectedQuarter === 'ALL' || m.quarter === selectedQuarter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Performance & KPI Engine</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Year Target & Monthly Progress Cards ({activeYear})</h2>
          <p className="text-xs text-[#64748B]">
            Track annual quotas, quarterly milestones, and month-by-month revenue run-rates, plate volumes & targets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#5B21B6] border border-purple-200 text-xs font-black">
            FY 2026 Target: ₹2.50 Cr
          </span>
        </div>
      </div>

      {/* Annual KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {annualKpis.map((t) => (
          <div key={t.metric} className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-gray-500">{t.metric}</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {t.status}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1E1B4B]">{t.achieved}</p>
              <p className="text-xs text-gray-500 mt-0.5">Target: <strong className="text-gray-800">{t.target}</strong></p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-600">
                <span>Progress: {t.percent}%</span>
                <span className="text-[#5B21B6]">{t.trend}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#5B21B6] to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${t.percent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Progress / Target Cards Section */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-[#1E1B4B]">Monthly Progress & Target Cards</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#EDE9FE] text-[#5B21B6]">
                12 Months
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Live monthly revenue pacing, guest plate volumes, seasonal themes & target achievement rates.
            </p>
          </div>

          {/* Quarter Filters */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setSelectedQuarter(q)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedQuarter === q
                    ? 'bg-white text-[#5B21B6] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {q === 'ALL' ? 'All Months' : q}
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Month Spotlight Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-[#1E1B4B] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md">
              <Flame className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  Current Active Month
                </span>
                <span className="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Pacing at 73%
                </span>
              </div>
              <h4 className="text-lg font-black mt-0.5">March 2027 • Ugadi & Fiscal Year-End Push</h4>
              <p className="text-xs text-purple-200">Target: ₹25,00,000 • Achieved So Far: ₹18,20,000 (3,700 Plates)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/15 backdrop-blur-md">
            <div>
              <span className="text-[10px] text-purple-200 uppercase font-semibold block">Remaining Gap</span>
              <p className="text-base font-black text-amber-300">₹6,80,000</p>
            </div>
            <div className="h-7 w-px bg-white/20" />
            <div>
              <span className="text-[10px] text-purple-200 uppercase font-semibold block">Daily Run Rate Needed</span>
              <p className="text-base font-black text-white">₹75,555 / day</p>
            </div>
          </div>
        </div>

        {/* 12-Month Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMonths.map((m) => {
            const percent = Math.min(Math.round((m.achievedAmount / m.targetAmount) * 100), 125);
            const isExceeded = m.status === 'Exceeded';
            const isInProgress = m.status === 'In Progress';

            return (
              <div 
                key={m.month}
                className={`p-4 rounded-2xl border transition space-y-3 flex flex-col justify-between ${
                  isInProgress
                    ? 'bg-gradient-to-b from-purple-50/70 to-white border-[#5B21B6] shadow-xs ring-1 ring-[#5B21B6]'
                    : isExceeded
                    ? 'bg-white border-[#E2E8F0] hover:border-emerald-300 hover:shadow-xs'
                    : 'bg-white border-[#E2E8F0] hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Top Month Header */}
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">
                        {m.quarter}
                      </span>
                      <h4 className="font-extrabold text-sm text-[#1E1B4B]">{m.month}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                      m.status === 'Exceeded' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.status === 'Achieved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-[#5B21B6] animate-pulse'
                    }`}>
                      {percent}% {m.status}
                    </span>
                  </div>

                  {/* Seasonal Theme / Focus */}
                  <p className="text-[11px] text-[#64748B] font-medium mt-1 leading-snug">
                    {m.theme}
                  </p>

                  {/* Revenue Numbers */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-gray-500 font-medium">Achieved:</span>
                      <span className="font-black text-[#1E1B4B] text-sm tabular-nums">
                        ₹{(m.achievedAmount / 100000).toFixed(2)} L
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>Monthly Target:</span>
                      <span className="font-semibold text-gray-700">₹{(m.targetAmount / 100000).toFixed(2)} L</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500 pt-0.5 border-t border-gray-200/50">
                      <span>Plates Volume:</span>
                      <span className="font-bold text-[#5B21B6]">{m.platesCount.toLocaleString('en-IN')} Plates</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Note */}
                <div className="space-y-1.5 pt-1">
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isExceeded 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                          : isInProgress
                          ? 'bg-gradient-to-r from-[#5B21B6] to-purple-500'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                      }`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-500 block truncate" title={m.growthNote}>
                    {m.growthNote}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quarterly Milestone Performance */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-[#1E1B4B]">Quarterly Milestone Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quarters.map((q) => (
            <div key={q.name} className="p-4 rounded-xl border border-gray-100 bg-slate-50/70 space-y-1.5 text-xs">
              <span className="font-extrabold text-gray-700 block">{q.name}</span>
              <p className="text-[11px] text-gray-500">{q.note}</p>
              <div className="flex justify-between text-gray-600 pt-1">
                <span>Target:</span>
                <span className="font-bold">{q.target}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Actual / Est:</span>
                <span className="font-black">{q.actual}</span>
              </div>
              <span className="text-[10px] font-extrabold text-[#5B21B6] block pt-1 border-t border-gray-200">
                {q.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
