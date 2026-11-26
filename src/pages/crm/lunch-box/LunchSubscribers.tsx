import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Phone, MapPin, 
  CreditCard, Calendar, CheckCircle2, MessageSquare, ExternalLink
} from 'lucide-react';

interface Subscriber {
  id: string;
  name: string;
  phone: string;
  company: string;
  officeAddress: string;
  plan: string;
  pricePerMonth: number;
  diet: 'Pure Veg' | 'Non-Veg (Wed/Fri)' | 'High-Protein' | 'Jain';
  autoDebit: 'Active (UPI)' | 'Active (Card)' | 'Manual Khata';
  renewalDate: string;
  status: 'Active' | 'Paused' | 'Expiring Soon';
}

export const LunchSubscribers: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dietFilter, setDietFilter] = useState('ALL');

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: 'SUB-401',
      name: 'Dr. Srinivas Rao',
      phone: '+91 98490 11223',
      company: 'AIG Hospitals',
      officeAddress: 'OPD Block B, 3rd Floor, Gachibowli',
      plan: 'Executive 26-Day Monthly Thali',
      pricePerMonth: 3900,
      diet: 'Pure Veg',
      autoDebit: 'Active (UPI)',
      renewalDate: '2026-03-24',
      status: 'Active',
    },
    {
      id: 'SUB-402',
      name: 'Aditi Deshmukh',
      phone: '+91 99890 33441',
      company: 'Qualcomm India',
      officeAddress: 'Building B, Mindspace IT Park, Hitec City',
      plan: 'Corporate Veg Delight (22 Working Days)',
      pricePerMonth: 3080,
      diet: 'Pure Veg',
      autoDebit: 'Active (Card)',
      renewalDate: '2026-03-18',
      status: 'Active',
    },
    {
      id: 'SUB-403',
      name: 'Raghavan Pillai',
      phone: '+91 97001 88992',
      company: 'Microsoft IDC',
      officeAddress: 'Campus 2, Building 3, Gachibowli',
      plan: 'Non-Veg Flexi Pack (22 Days, 2 Non-Veg/Wk)',
      pricePerMonth: 3740,
      diet: 'Non-Veg (Wed/Fri)',
      autoDebit: 'Active (UPI)',
      renewalDate: '2026-03-05',
      status: 'Expiring Soon',
    },
    {
      id: 'SUB-404',
      name: 'Nisha Sundaram',
      phone: '+91 98850 44556',
      company: 'Tech Mahindra',
      officeAddress: 'Tower 4, SEZ Cyber City, Madhapur',
      plan: 'Keto / High-Protein Fitness Plan',
      pricePerMonth: 4400,
      diet: 'High-Protein',
      autoDebit: 'Active (UPI)',
      renewalDate: '2026-03-29',
      status: 'Active',
    },
    {
      id: 'SUB-405',
      name: 'Harsh Vardhan Jain',
      phone: '+91 98480 66778',
      company: 'Deloitte USI',
      officeAddress: 'Block C, Knowledge City, Raidurg',
      plan: 'Pure Jain Sattvik Meal Plan',
      pricePerMonth: 3300,
      diet: 'Jain',
      autoDebit: 'Manual Khata',
      renewalDate: '2026-03-02',
      status: 'Paused',
    },
  ]);

  const filtered = subscribers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.officeAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiet = dietFilter === 'ALL' || s.diet === dietFilter;
    return matchesSearch && matchesDiet;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Subscriber CRM & Mandates</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Active Subscribers & Corporate Plans</h2>
          <p className="text-xs text-[#64748B]">
            Automated recurring auto-debit plans, corporate addresses, delivery preferences & renewal desk.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('New subscriber onboarding link copied to clipboard!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Subscriber</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Active Subscriptions</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">112 Working Pros</p>
          <span className="text-[11px] text-emerald-600 font-semibold">94% Monthly Renewal Rate</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Monthly Recurring Rev (MRR)</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹3,84,200</p>
          <span className="text-[11px] text-gray-500">Auto-debit on 1st & 15th</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">UPI Autopay Enrolled</span>
          <p className="text-2xl font-black text-blue-600 mt-1">86 Customers</p>
          <span className="text-[11px] text-gray-500">Zero collection follow-ups</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Renewals This Week</span>
          <p className="text-2xl font-black text-amber-600 mt-1">14 Accounts</p>
          <span className="text-[11px] text-amber-700 font-medium">WhatsApp reminders queued</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by subscriber, company or tech park..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#5B21B6]"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Pure Veg', 'Non-Veg (Wed/Fri)', 'High-Protein', 'Jain'].map((diet) => (
            <button
              key={diet}
              type="button"
              onClick={() => setDietFilter(diet)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                dietFilter === diet
                  ? 'bg-[#5B21B6] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {diet}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {s.id}
                </span>
                <h4 className="font-extrabold text-sm text-[#1E1B4B] mt-1">{s.name}</h4>
                <p className="text-xs text-gray-500 font-semibold">{s.company}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                s.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                s.status === 'Paused' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {s.status}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
              <div className="flex items-start gap-1.5 text-gray-600">
                <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{s.officeAddress}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-1 border-t border-gray-200/60">
                <span className="text-gray-500">Plan:</span>
                <span className="font-bold text-[#1E1B4B]">{s.plan}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-500">Auto-Debit:</span>
                <span className="font-bold text-emerald-700">{s.autoDebit}</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-gray-500">Next Renewal:</span>
                <span className="font-bold text-gray-700">{s.renewalDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-black text-[#5B21B6]">₹{s.pricePerMonth} / mo</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onNotify?.(`WhatsApp invoice sent to ${s.name} (${s.phone})`)}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-purple-50 text-[#5B21B6] transition"
                  title="WhatsApp Invoice"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNotify?.(`Opened account dossier for ${s.name}`)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-bold"
                >
                  Edit Plan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
