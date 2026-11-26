import React, { useState } from 'react';
import { 
  Trophy, Target, TrendingUp, DollarSign, Calendar, 
  ArrowUpRight, CheckCircle2, AlertCircle, BarChart3, Sparkles 
} from 'lucide-react';

export function AdminTargets() {
  const [activeYear] = useState('FY 2026-2027');

  const targets = [
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
    { name: 'Q1 (Apr - Jun)', target: '₹50 Lakhs', actual: '₹52 Lakhs', status: 'Exceeded (104%)' },
    { name: 'Q2 (Jul - Sep)', target: '₹45 Lakhs', actual: '₹48 Lakhs', status: 'Exceeded (106%)' },
    { name: 'Q3 (Oct - Dec)', target: '₹85 Lakhs', actual: '₹84 Lakhs', status: 'Achieved (99%)' },
    { name: 'Q4 (Jan - Mar)', target: '₹70 Lakhs', actual: '₹62 Lakhs (Projected)', status: 'In Progress (88%)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Performance & KPI Engine</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Year Target & Business Goals ({activeYear})</h2>
          <p className="text-xs text-[#64748B]">
            Track revenue targets, wedding plate goals, corridor subscription KPIs, and quarterly business milestones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#5B21B6] border border-purple-200 text-xs font-black">
            FY 2026 Target: ₹2.50 Cr
          </span>
        </div>
      </div>

      {/* Target Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {targets.map((t) => (
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

      {/* Quarterly Breakdown & Muhurtham Surge Analysis */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-[#1E1B4B]">Quarterly Milestone Performance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quarters.map((q) => (
            <div key={q.name} className="p-4 rounded-xl border border-gray-100 bg-slate-50/70 space-y-1.5 text-xs">
              <span className="font-extrabold text-gray-700 block">{q.name}</span>
              <div className="flex justify-between text-gray-600">
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
