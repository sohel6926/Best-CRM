import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Truck, RotateCcw, 
  Download, Calendar, ArrowUpRight, CheckCircle2, ShieldCheck
} from 'lucide-react';

export const LunchReports: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  const stats = [
    { label: 'Meals Delivered', value: '5,824 Dabbas', detail: 'November 2026 Run', trend: '+12.4% MoM' },
    { label: 'On-Time Delivery %', value: '98.8%', detail: 'Before 01:00 PM Lock', trend: '+0.5%' },
    { label: 'Dabba Recovery Rate', value: '97.4%', detail: 'Only 2.6% Lost Tins', trend: '+1.2%' },
    { label: 'Subscriber Retention', value: '94.2%', detail: 'Low 5.8% Churn', trend: 'High Loyalty' }
  ];

  const corridorPerformance = [
    { corridor: 'Madhapur IT Mindspace', dabbasPerDay: 84, onTimeRate: '99.2%', riders: 2 },
    { corridor: 'Gachibowli DLF & Wipro Circle', dabbasPerDay: 72, onTimeRate: '98.5%', riders: 2 },
    { corridor: 'Raidurg Knowledge City / T-Hub', dabbasPerDay: 58, onTimeRate: '98.0%', riders: 1 },
    { corridor: 'Kondapur / Botanical Garden', dabbasPerDay: 50, onTimeRate: '99.5%', riders: 1 }
  ];

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Lunch Box Operations & Delivery Analytics</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Dispatch performance, corridor timeliness, subscriber retention, and dabba return reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-bold bg-white text-gray-700"
          >
            <option value="November 2026">November 2026</option>
            <option value="October 2026">October 2026</option>
            <option value="September 2026">September 2026</option>
          </select>
          <button
            type="button"
            onClick={() => onNotify?.('Exported monthly lunch dispatch and corridor performance report!')}
            className="px-3.5 py-1.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
            <span className="text-xs font-bold text-gray-500">{s.label}</span>
            <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
            <div className="flex justify-between items-center text-[11px] pt-1 border-t border-gray-100">
              <span className="text-gray-500">{s.detail}</span>
              <span className="text-emerald-700 font-extrabold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                {s.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Corridor Delivery Performance Table */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-sm text-gray-900">Delivery Corridors & Route Timeliness</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase text-[10px] border-b border-gray-100">
              <tr>
                <th className="px-4 py-3">Route Corridor</th>
                <th className="px-4 py-3">Daily Dabbas</th>
                <th className="px-4 py-3">On-Time Score</th>
                <th className="px-4 py-3">Dedicated Riders</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {corridorPerformance.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-50/70 transition">
                  <td className="px-4 py-3 font-bold text-gray-900">{c.corridor}</td>
                  <td className="px-4 py-3 font-extrabold text-[#5B21B6]">{c.dabbasPerDay} Boxes</td>
                  <td className="px-4 py-3 font-bold text-emerald-700">{c.onTimeRate}</td>
                  <td className="px-4 py-3 text-gray-600">{c.riders} Delivery Vans</td>
                  <td className="px-4 py-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                      Optimal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
