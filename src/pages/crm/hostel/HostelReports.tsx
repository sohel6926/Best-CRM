import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, CreditCard, ShieldCheck, 
  Download, Printer, ArrowUpRight, ArrowDownRight, Filter, Calendar
} from 'lucide-react';

export const HostelReports: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  // Key metrics
  const stats = [
    { label: 'Total Occupancy', value: '90.9%', detail: '120 / 132 Beds Occupied', trend: '+4.2% MoM', positive: true },
    { label: 'Gross Revenue', value: '₹9,84,000', detail: 'Rent + Power + Amenities', trend: '+6.8%', positive: true },
    { label: 'Pending Rent Dues', value: '₹58,400', detail: '7 Tenants Overdue', trend: '-12.5%', positive: true },
    { label: 'Deposits in Escrow', value: '₹14,50,000', detail: '120 Active Tenants', trend: '₹0 Slippage', positive: true }
  ];

  // Aging report data
  const agingDues = [
    { name: 'Karthik Raja', room: 'Room 102 - Bed A', days: '23 Days', amount: 13380, severity: 'High' },
    { name: 'Vamsi Krishna', room: 'Room 204 - Bed B', days: '18 Days', amount: 8900, severity: 'Medium' },
    { name: 'Pranay Kumar', room: 'Room 305 - Bed A', days: '14 Days', amount: 7200, severity: 'Medium' },
    { name: 'Siddharth Rao', room: 'Room 101 - Bed B', days: '9 Days', amount: 8500, severity: 'Low' },
    { name: 'Deepak Reddy', room: 'Room 208 - Bed C', days: '6 Days', amount: 6200, severity: 'Low' }
  ];

  // Room category occupancy breakdown
  const roomBreakdown = [
    { category: 'Single AC Rooms', total: 20, occupied: 19, rate: '₹14,000 / mo', revenue: '₹2,66,000' },
    { category: '2-Sharing AC Rooms', total: 48, occupied: 45, rate: '₹8,500 / mo', revenue: '₹3,82,500' },
    { category: '3-Sharing Non-AC', total: 42, occupied: 38, rate: '₹6,500 / mo', revenue: '₹2,47,000' },
    { category: '4-Sharing Budget', total: 22, occupied: 18, rate: '₹4,900 / mo', revenue: '₹88,200' }
  ];

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Hostel Business Analytics & Reports</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time occupancy performance, collection aging analysis, and refundable deposit liability.
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
            onClick={() => onNotify?.('Hostel monthly financial report exported to Excel CSV!')}
            className="px-3.5 py-1.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
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

      {/* Two Column Section: Occupancy Breakdown & Aging Dues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Occupancy Breakdown */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-gray-900">Bed Category Occupancy & Revenue</h3>
            <span className="text-[11px] text-gray-400">120 Total Tenants</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase text-[10px] border-b border-gray-100">
                <tr>
                  <th className="px-3 py-2.5">Room Category</th>
                  <th className="px-3 py-2.5">Occupied / Total</th>
                  <th className="px-3 py-2.5">Monthly Tariff</th>
                  <th className="px-3 py-2.5 text-right">Monthly Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {roomBreakdown.map((r, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/70 transition">
                    <td className="px-3 py-3 font-bold text-gray-900">{r.category}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#5B21B6]">{r.occupied} / {r.total}</span>
                        <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#5B21B6] h-full"
                            style={{ width: `${(r.occupied / r.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-gray-600">{r.rate}</td>
                    <td className="px-3 py-3 text-right font-extrabold text-gray-900">{r.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Aging Rent Dues */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-gray-900">Pending Rent Aging Ledger</h3>
            <span className="text-[11px] text-red-600 font-bold">5 Priority Cases</span>
          </div>

          <div className="space-y-2.5">
            {agingDues.map((d, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-gray-900">{d.name}</div>
                  <div className="text-[11px] text-gray-500">{d.room} • Overdue {d.days}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-red-600">₹{d.amount.toLocaleString('en-IN')}</div>
                  <button
                    type="button"
                    onClick={() => onNotify?.(`WhatsApp late rent reminder sent to ${d.name}!`)}
                    className="text-[10px] text-[#5B21B6] font-extrabold hover:underline cursor-pointer"
                  >
                    Send Notice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
