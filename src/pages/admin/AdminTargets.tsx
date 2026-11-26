import React, { useState, useEffect } from 'react';
import { 
  Trophy, Target, TrendingUp, DollarSign, Calendar, 
  ArrowUpRight, CheckCircle2, AlertCircle, BarChart3, Sparkles,
  Flame, Clock, ChevronRight, Filter, Settings, Edit3, X, Save, RotateCcw
} from 'lucide-react';

interface MonthTarget {
  id: string;
  month: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  theme: string;
  targetAmount: number; // in Rupees
  achievedAmount: number;
  platesCount: number;
  status: 'Exceeded' | 'Achieved' | 'In Progress' | 'Upcoming';
  growthNote: string;
}

interface AnnualKpiConfig {
  annualGmvTarget: number; // in Rupees e.g. 25000000 for 2.5 Cr
  annualGmvAchieved: number;
  weddingContractsTarget: number;
  weddingContractsAchieved: number;
  corporateLunchesTarget: number;
  corporateLunchesAchieved: number;
  targetGrossMargin: number;
  achievedGrossMargin: number;
}

const DEFAULT_ANNUAL_CONFIG: AnnualKpiConfig = {
  annualGmvTarget: 25000000,
  annualGmvAchieved: 18400000,
  weddingContractsTarget: 180,
  weddingContractsAchieved: 142,
  corporateLunchesTarget: 300,
  corporateLunchesAchieved: 264,
  targetGrossMargin: 42.0,
  achievedGrossMargin: 38.4,
};

const DEFAULT_MONTHLY_TARGETS: MonthTarget[] = [
  {
    id: 'apr-2026',
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
    id: 'may-2026',
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
    id: 'jun-2026',
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
    id: 'jul-2026',
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
    id: 'aug-2026',
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
    id: 'sep-2026',
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
    id: 'oct-2026',
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
    id: 'nov-2026',
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
    id: 'dec-2026',
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
    id: 'jan-2027',
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
    id: 'feb-2027',
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
    id: 'mar-2027',
    month: 'March 2027 (Active)',
    quarter: 'Q4',
    theme: 'Ugadi Telugu New Year & Fiscal Closing Push',
    targetAmount: 2500000,
    achievedAmount: 1820000,
    platesCount: 3700,
    status: 'In Progress',
    growthNote: '73% achieved • 9 days left to hit goal',
  },
];

export function AdminTargets() {
  const [activeYear, setActiveYear] = useState('FY 2026-2027');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Load from localStorage or use defaults
  const [annualConfig, setAnnualConfig] = useState<AnnualKpiConfig>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_annual_targets');
      return saved ? JSON.parse(saved) : DEFAULT_ANNUAL_CONFIG;
    } catch {
      return DEFAULT_ANNUAL_CONFIG;
    }
  });

  const [monthlyTargets, setMonthlyTargets] = useState<MonthTarget[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_monthly_targets');
      return saved ? JSON.parse(saved) : DEFAULT_MONTHLY_TARGETS;
    } catch {
      return DEFAULT_MONTHLY_TARGETS;
    }
  });

  // Edit draft states for the modal
  const [draftAnnual, setDraftAnnual] = useState<AnnualKpiConfig>(annualConfig);
  const [draftMonthly, setDraftMonthly] = useState<MonthTarget[]>(monthlyTargets);
  const [modalTab, setModalTab] = useState<'annual' | 'monthly'>('annual');

  const openSetTargetModal = (tab: 'annual' | 'monthly' = 'annual') => {
    setDraftAnnual(annualConfig);
    setDraftMonthly(monthlyTargets);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleSaveTargets = () => {
    setAnnualConfig(draftAnnual);
    setMonthlyTargets(draftMonthly);
    try {
      localStorage.setItem('bestcrm_annual_targets', JSON.stringify(draftAnnual));
      localStorage.setItem('bestcrm_monthly_targets', JSON.stringify(draftMonthly));
    } catch (e) {
      console.error(e);
    }
    setIsModalOpen(false);
    setSaveNotification('Target goals updated successfully! Progress metrics and run-rates recalculated.');
    setTimeout(() => setSaveNotification(null), 4000);
  };

  const handleResetDefaults = () => {
    setDraftAnnual(DEFAULT_ANNUAL_CONFIG);
    setDraftMonthly(DEFAULT_MONTHLY_TARGETS);
  };

  const handleAutoDistributeEvenly = () => {
    const totalAmount = draftAnnual.annualGmvTarget;
    const perMonth = Math.round(totalAmount / 12);
    setDraftMonthly(prev => prev.map(m => {
      const percent = Math.round((m.achievedAmount / perMonth) * 100);
      let status: MonthTarget['status'] = 'Upcoming';
      if (m.month.includes('Active')) {
        status = 'In Progress';
      } else if (percent >= 100) {
        status = percent > 102 ? 'Exceeded' : 'Achieved';
      } else {
        status = 'Achieved';
      }
      return {
        ...m,
        targetAmount: perMonth,
        status,
      };
    }));
  };

  const handleWeddingSeasonWeighting = () => {
    // 6 peak months get 1.25x weight, off-season get 0.75x weight
    const weights: Record<string, number> = {
      'April 2026': 1.0,
      'May 2026': 1.3,
      'June 2026': 0.7,
      'July 2026': 0.75,
      'August 2026': 1.0,
      'September 2026': 0.95,
      'October 2026': 1.15,
      'November 2026': 1.45,
      'December 2026': 1.25,
      'January 2027': 1.05,
      'February 2027': 1.05,
      'March 2027 (Active)': 1.35,
    };
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const totalAmount = draftAnnual.annualGmvTarget;

    setDraftMonthly(prev => prev.map(m => {
      const w = weights[m.month] || 1.0;
      const targetAmount = Math.round((totalAmount * (w / totalWeight)) / 10000) * 10000;
      const percent = Math.round((m.achievedAmount / targetAmount) * 100);
      let status: MonthTarget['status'] = 'Upcoming';
      if (m.month.includes('Active')) {
        status = 'In Progress';
      } else if (percent >= 100) {
        status = percent > 102 ? 'Exceeded' : 'Achieved';
      } else {
        status = 'Achieved';
      }
      return {
        ...m,
        targetAmount,
        status,
      };
    }));
  };

  // Calculations
  const gmvPercent = Math.round((annualConfig.annualGmvAchieved / annualConfig.annualGmvTarget) * 100);
  const weddingsPercent = Math.round((annualConfig.weddingContractsAchieved / annualConfig.weddingContractsTarget) * 100);
  const lunchesPercent = Math.round((annualConfig.corporateLunchesAchieved / annualConfig.corporateLunchesTarget) * 100);
  const marginPercent = Math.round((annualConfig.achievedGrossMargin / annualConfig.targetGrossMargin) * 100);

  const annualTargetDisplay = (annualConfig.annualGmvTarget / 10000000).toFixed(2);
  const annualAchievedDisplay = (annualConfig.annualGmvAchieved / 10000000).toFixed(2);

  // Active month: March 2027
  const activeMonth = monthlyTargets.find(m => m.month.includes('Active')) || monthlyTargets[11];
  const activeMonthPercent = Math.round((activeMonth.achievedAmount / activeMonth.targetAmount) * 100);
  const activeMonthGap = Math.max(activeMonth.targetAmount - activeMonth.achievedAmount, 0);
  const dailyRunRateNeeded = Math.round(activeMonthGap / 9);

  // Dynamic Quarters
  const q1Sum = monthlyTargets.filter(m => m.quarter === 'Q1');
  const q2Sum = monthlyTargets.filter(m => m.quarter === 'Q2');
  const q3Sum = monthlyTargets.filter(m => m.quarter === 'Q3');
  const q4Sum = monthlyTargets.filter(m => m.quarter === 'Q4');

  const getQuarterData = (items: MonthTarget[], name: string, note: string) => {
    const target = items.reduce((s, i) => s + i.targetAmount, 0);
    const actual = items.reduce((s, i) => s + i.achievedAmount, 0);
    const pct = Math.round((actual / target) * 100);
    return {
      name,
      target: `₹${(target / 100000).toFixed(0)} Lakhs`,
      actual: `₹${(actual / 100000).toFixed(0)} Lakhs`,
      status: pct >= 100 ? `Exceeded (${pct}%)` : `In Progress (${pct}%)`,
      note,
    };
  };

  const quarters = [
    getQuarterData(q1Sum, 'Q1 (Apr - Jun)', 'Summer Wedding Surge'),
    getQuarterData(q2Sum, 'Q2 (Jul - Sep)', 'Corporate Tiffin Ramp-up'),
    getQuarterData(q3Sum, 'Q3 (Oct - Dec)', 'Dussehra & Winter Muhurthams'),
    getQuarterData(q4Sum, 'Q4 (Jan - Mar)', 'Ugadi & Pre-Summer Lagnams'),
  ];

  const filteredMonths = monthlyTargets.filter(m => selectedQuarter === 'ALL' || m.quarter === selectedQuarter);

  return (
    <div className="space-y-6">
      {/* Header with Set Target Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Performance & KPI Engine</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Year Target & Monthly Progress Cards ({activeYear})</h2>
          <p className="text-xs text-[#64748B]">
            Track revenue targets, wedding plate goals, corridor subscription KPIs, and quarterly business milestones.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-[#5B21B6] border border-purple-200 text-xs font-black">
            FY Target: ₹{annualTargetDisplay} Cr
          </span>
          <button
            type="button"
            onClick={() => openSetTargetModal('annual')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Set / Edit Target</span>
          </button>
        </div>
      </div>

      {saveNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
            <span>{saveNotification}</span>
          </div>
          <button type="button" onClick={() => setSaveNotification(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Annual KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: GMV */}
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 relative group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500">Annual GMV Target</span>
            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                gmvPercent >= 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {gmvPercent >= 100 ? 'Achieved' : 'On Track'}
              </span>
              <button 
                type="button" 
                onClick={() => openSetTargetModal('annual')}
                className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-gray-100 rounded text-gray-500"
                title="Edit Target"
              >
                <Edit3 className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#1E1B4B]">₹{annualAchievedDisplay} Cr</p>
            <p className="text-xs text-gray-500 mt-0.5">Target: <strong className="text-gray-800">₹{annualTargetDisplay} Cr</strong></p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-gray-600">
              <span>Progress: {gmvPercent}%</span>
              <span className="text-[#5B21B6]">+18% vs Last Year</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#5B21B6] to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(gmvPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Weddings */}
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 relative group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500">Confirmed Wedding Contracts</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {weddingsPercent >= 100 ? 'Achieved' : 'Ahead of Target'}
              </span>
              <button 
                type="button" 
                onClick={() => openSetTargetModal('annual')}
                className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-gray-100 rounded text-gray-500"
                title="Edit Target"
              >
                <Edit3 className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#1E1B4B]">{annualConfig.weddingContractsAchieved} Events</p>
            <p className="text-xs text-gray-500 mt-0.5">Target: <strong className="text-gray-800">{annualConfig.weddingContractsTarget} Events</strong></p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-gray-600">
              <span>Progress: {weddingsPercent}%</span>
              <span className="text-[#5B21B6]">+{annualConfig.weddingContractsTarget - annualConfig.weddingContractsAchieved} remaining</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#5B21B6] to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(weddingsPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Corporate */}
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 relative group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500">Corporate Recurring Lunches</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {lunchesPercent >= 100 ? 'Achieved' : 'Nearly Achieved'}
              </span>
              <button 
                type="button" 
                onClick={() => openSetTargetModal('annual')}
                className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-gray-100 rounded text-gray-500"
                title="Edit Target"
              >
                <Edit3 className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#1E1B4B]">{annualConfig.corporateLunchesAchieved} Boxes/Day</p>
            <p className="text-xs text-gray-500 mt-0.5">Target: <strong className="text-gray-800">{annualConfig.corporateLunchesTarget} Boxes/Day</strong></p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-gray-600">
              <span>Progress: {lunchesPercent}%</span>
              <span className="text-[#5B21B6]">8 Corridors Active</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#5B21B6] to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(lunchesPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 4: Margin */}
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3 relative group">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-500">Average Gross Margin</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {annualConfig.achievedGrossMargin >= annualConfig.targetGrossMargin ? 'Healthy' : 'Cost Watch'}
              </span>
              <button 
                type="button" 
                onClick={() => openSetTargetModal('annual')}
                className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-gray-100 rounded text-gray-500"
                title="Edit Target"
              >
                <Edit3 className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#1E1B4B]">{annualConfig.achievedGrossMargin}%</p>
            <p className="text-xs text-gray-500 mt-0.5">Target: <strong className="text-gray-800">{annualConfig.targetGrossMargin}%</strong></p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-gray-600">
              <span>Progress: {marginPercent}%</span>
              <span className="text-[#5B21B6]">Mandi price stability</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#5B21B6] to-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(marginPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
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
              <button
                type="button"
                onClick={() => openSetTargetModal('monthly')}
                className="text-[11px] font-bold text-[#5B21B6] hover:underline flex items-center gap-1 ml-2 cursor-pointer"
              >
                <Edit3 className="h-3 w-3" />
                <span>Adjust Monthly Targets</span>
              </button>
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
                  Pacing at {activeMonthPercent}%
                </span>
              </div>
              <h4 className="text-lg font-black mt-0.5">{activeMonth.month} • {activeMonth.theme}</h4>
              <p className="text-xs text-purple-200">
                Target: ₹{(activeMonth.targetAmount / 100000).toFixed(2)} Lakhs • Achieved So Far: ₹{(activeMonth.achievedAmount / 100000).toFixed(2)} Lakhs ({activeMonth.platesCount.toLocaleString('en-IN')} Plates)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/15 backdrop-blur-md">
            <div>
              <span className="text-[10px] text-purple-200 uppercase font-semibold block">Remaining Gap</span>
              <p className="text-base font-black text-amber-300">₹{(activeMonthGap / 100000).toFixed(2)} Lakhs</p>
            </div>
            <div className="h-7 w-px bg-white/20" />
            <div>
              <span className="text-[10px] text-purple-200 uppercase font-semibold block">Daily Run Rate Needed</span>
              <p className="text-base font-black text-white">₹{dailyRunRateNeeded.toLocaleString('en-IN')} / day</p>
            </div>
          </div>
        </div>

        {/* 12-Month Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMonths.map((m) => {
            const percent = Math.min(Math.round((m.achievedAmount / m.targetAmount) * 100), 150);
            const isExceeded = m.achievedAmount >= m.targetAmount;
            const isInProgress = m.month.includes('Active');

            return (
              <div 
                key={m.id}
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
                      percent >= 100 
                        ? 'bg-emerald-100 text-emerald-800'
                        : isInProgress
                        ? 'bg-purple-100 text-[#5B21B6] animate-pulse'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {percent}% {percent >= 100 ? (percent > 102 ? 'Exceeded' : 'Achieved') : isInProgress ? 'In Progress' : 'Pacing'}
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

      {/* ========================================================================= */}
      {/* Set Target Modal Dialog */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-purple-100 text-[#5B21B6] flex items-center justify-center font-bold shrink-0">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1E1B4B]">Set Business Targets & Growth Quotas</h3>
                  <p className="text-[11px] sm:text-xs text-gray-500">Configure Annual KPIs and Month-by-Month revenue targets ({activeYear})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-gray-200 px-4 sm:px-6 bg-white gap-3 sm:gap-4 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setModalTab('annual')}
                className={`py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  modalTab === 'annual'
                    ? 'border-[#5B21B6] text-[#5B21B6]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                1. Annual Business Targets (FY)
              </button>
              <button
                type="button"
                onClick={() => setModalTab('monthly')}
                className={`py-3 text-xs font-bold border-b-2 transition cursor-pointer ${
                  modalTab === 'monthly'
                    ? 'border-[#5B21B6] text-[#5B21B6]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                2. Monthly Revenue Distribution (12 Months)
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {modalTab === 'annual' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Annual GMV Target Input */}
                    <div className="space-y-1.5 p-3.5 rounded-xl border border-gray-200 bg-slate-50/50">
                      <label className="font-extrabold text-gray-700 flex justify-between">
                        <span>Annual GMV Revenue Target (in ₹ Lakhs)</span>
                        <span className="text-[#5B21B6]">₹{(draftAnnual.annualGmvTarget / 10000000).toFixed(2)} Cr</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 font-bold text-gray-400">₹</span>
                        <input
                          type="number"
                          value={draftAnnual.annualGmvTarget / 100000}
                          onChange={(e) => setDraftAnnual({ ...draftAnnual, annualGmvTarget: (Number(e.target.value) || 0) * 100000 })}
                          className="w-full pl-7 pr-3 py-2 bg-white rounded-lg border border-gray-300 font-bold text-gray-800 text-sm focus:border-[#5B21B6] focus:outline-none"
                          placeholder="e.g. 250 for 2.5 Cr"
                        />
                      </div>
                      <span className="text-[11px] text-gray-500">250 Lakhs = ₹2.50 Crores full year sales</span>
                    </div>

                    {/* Wedding Contracts Target */}
                    <div className="space-y-1.5 p-3.5 rounded-xl border border-gray-200 bg-slate-50/50">
                      <label className="font-extrabold text-gray-700 flex justify-between">
                        <span>Confirmed Wedding Contracts Goal</span>
                        <span className="text-[#5B21B6]">{draftAnnual.weddingContractsTarget} Events</span>
                      </label>
                      <input
                        type="number"
                        value={draftAnnual.weddingContractsTarget}
                        onChange={(e) => setDraftAnnual({ ...draftAnnual, weddingContractsTarget: Number(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 font-bold text-gray-800 text-sm focus:border-[#5B21B6] focus:outline-none"
                        placeholder="e.g. 180"
                      />
                      <span className="text-[11px] text-gray-500">Target big wedding & reception plate contracts</span>
                    </div>

                    {/* Corporate Lunches Target */}
                    <div className="space-y-1.5 p-3.5 rounded-xl border border-gray-200 bg-slate-50/50">
                      <label className="font-extrabold text-gray-700 flex justify-between">
                        <span>Corporate Lunches Daily Output Goal</span>
                        <span className="text-[#5B21B6]">{draftAnnual.corporateLunchesTarget} Boxes/Day</span>
                      </label>
                      <input
                        type="number"
                        value={draftAnnual.corporateLunchesTarget}
                        onChange={(e) => setDraftAnnual({ ...draftAnnual, corporateLunchesTarget: Number(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 font-bold text-gray-800 text-sm focus:border-[#5B21B6] focus:outline-none"
                        placeholder="e.g. 300"
                      />
                      <span className="text-[11px] text-gray-500">Active corporate monthly lunch subscriptions</span>
                    </div>

                    {/* Target Gross Margin % */}
                    <div className="space-y-1.5 p-3.5 rounded-xl border border-gray-200 bg-slate-50/50">
                      <label className="font-extrabold text-gray-700 flex justify-between">
                        <span>Target Gross Profit Margin %</span>
                        <span className="text-[#5B21B6]">{draftAnnual.targetGrossMargin}%</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          value={draftAnnual.targetGrossMargin}
                          onChange={(e) => setDraftAnnual({ ...draftAnnual, targetGrossMargin: Number(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-gray-300 font-bold text-gray-800 text-sm focus:border-[#5B21B6] focus:outline-none"
                          placeholder="e.g. 42"
                        />
                        <span className="absolute right-3 top-2.5 font-bold text-gray-400">%</span>
                      </div>
                      <span className="text-[11px] text-gray-500">Net margin benchmark after mandi grocery & raw food costs</span>
                    </div>
                  </div>

                  {/* Distribution Helpers */}
                  <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <h4 className="font-bold text-[#1E1B4B]">Auto-Distribute Annual Target Across 12 Months:</h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={handleAutoDistributeEvenly}
                          className="px-2.5 py-1 rounded-lg bg-white border border-purple-300 text-[#5B21B6] font-bold hover:bg-purple-100 transition text-[11px] sm:text-xs"
                        >
                          Distribute Evenly
                        </button>
                        <button
                          type="button"
                          onClick={handleWeddingSeasonWeighting}
                          className="px-2.5 py-1 rounded-lg bg-[#5B21B6] text-white font-bold hover:bg-[#4C1D95] transition text-[11px] sm:text-xs"
                        >
                          ★ Weight by Wedding Seasons
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      "Weight by Wedding Seasons" automatically allocates higher revenue targets to heavy auspicious wedding months (May, Nov, Dec, Mar) and lowers targets during monsoon slump periods.
                    </p>
                  </div>
                </div>
              )}

              {modalTab === 'monthly' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-gray-200">
                    <span className="font-bold text-gray-700">
                      Total Allocated Across 12 Months:
                    </span>
                    <span className="font-black text-sm text-[#5B21B6]">
                      ₹{(draftMonthly.reduce((s, m) => s + m.targetAmount, 0) / 100000).toFixed(2)} Lakhs (Goal: ₹{(draftAnnual.annualGmvTarget / 100000).toFixed(2)} L)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                    {draftMonthly.map((m, index) => (
                      <div key={m.id} className="p-3 rounded-xl border border-gray-200 bg-white space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-xs text-[#1E1B4B]">{m.month}</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase">{m.quarter}</span>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-500 font-bold uppercase">Target Revenue (₹ Lakhs)</label>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1.5 font-bold text-gray-400 text-xs">₹</span>
                            <input
                              type="number"
                              step="0.5"
                              value={m.targetAmount / 100000}
                              onChange={(e) => {
                                const newAmount = (Number(e.target.value) || 0) * 100000;
                                setDraftMonthly(prev => {
                                  const copy = [...prev];
                                  copy[index] = { ...copy[index], targetAmount: newAmount };
                                  return copy;
                                });
                              }}
                              className="w-full pl-6 pr-2 py-1.5 bg-slate-50 rounded-lg border border-gray-200 font-bold text-xs focus:bg-white focus:border-[#5B21B6] focus:outline-none"
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 truncate">{m.theme}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-slate-50/80">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 text-gray-600 text-xs font-bold hover:bg-gray-100 transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveTargets}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer text-center"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Targets</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
