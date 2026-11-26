import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle2, PauseCircle, 
  ArrowRight, ShieldAlert, Sparkles, Plus, AlertCircle
} from 'lucide-react';

interface PauseRecord {
  id: string;
  subscriber: string;
  company: string;
  pauseDates: string;
  reason: 'WFH Day' | 'Out of Station / Travel' | 'Client On-Site' | 'Sick Leave';
  requestedAt: string;
  creditedDays: number;
  newPlanExpiry: string;
  status: 'Approved & Credited' | 'Pending Review';
}

export const LunchCalendar: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [cutoffTime] = useState('08:30 AM');
  const [pauseList, setPauseList] = useState<PauseRecord[]>([
    {
      id: 'PAUSE-881',
      subscriber: 'Vikramaditya Varma',
      company: 'Tech Mahindra, Madhapur',
      pauseDates: '04 Mar - 05 Mar (2 Days)',
      reason: 'WFH Day',
      requestedAt: 'Yesterday 09:15 PM (Before Cutoff)',
      creditedDays: 2,
      newPlanExpiry: '30 Mar 2026',
      status: 'Approved & Credited',
    },
    {
      id: 'PAUSE-882',
      subscriber: 'Pooja Reddy',
      company: 'Qualcomm, Mindspace',
      pauseDates: '04 Mar (Today)',
      reason: 'Client On-Site',
      requestedAt: 'Today 07:45 AM (Before Cutoff)',
      creditedDays: 1,
      newPlanExpiry: '27 Mar 2026',
      status: 'Approved & Credited',
    },
    {
      id: 'PAUSE-883',
      subscriber: 'Saurabh Nair',
      company: 'Amazon HYD11',
      pauseDates: '06 Mar - 09 Mar (4 Days)',
      reason: 'Out of Station / Travel',
      requestedAt: 'Today 08:10 AM',
      creditedDays: 4,
      newPlanExpiry: '06 Apr 2026',
      status: 'Approved & Credited',
    },
    {
      id: 'PAUSE-884',
      subscriber: 'K. Madhusudhan',
      company: 'Deloitte, Raidurg',
      pauseDates: '04 Mar (Today)',
      reason: 'Sick Leave',
      requestedAt: 'Today 09:25 AM (Late Request)',
      creditedDays: 0,
      newPlanExpiry: '22 Mar 2026',
      status: 'Pending Review',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-blue-100 text-blue-800 border border-blue-200">
              Cut-off: Daily {cutoffTime}
            </span>
            <span className="text-xs text-gray-500 font-medium">Automatic Balance Roll-forward</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-1">WFH Pause Calendar & Day Credits</h2>
          <p className="text-xs text-[#64748B]">
            Automated customer pause requests, food waste reduction & contract expiry extension engine.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Self-serve WhatsApp pause link broadcasted to all active members!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Send WhatsApp Pause Link</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Lunches Paused Today</span>
          <p className="text-2xl font-black text-amber-600 mt-1">6 Boxes</p>
          <span className="text-[11px] text-gray-500 font-medium">Excluded from kitchen cooking</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Food Wastage Prevented</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹1,080 Saved</p>
          <span className="text-[11px] text-gray-500">Zero wastage on unused raw material</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Credited Days Added</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">7 Days Total</p>
          <span className="text-[11px] text-gray-500">Automatically added to subscription ends</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Late Requests (&gt;8:30 AM)</span>
          <p className="text-2xl font-black text-red-600 mt-1">1 Request</p>
          <span className="text-[11px] text-red-700 font-medium">Requires supervisor approval</span>
        </div>
      </div>

      {/* Pause Rule Policy Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#5B21B6] text-white flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#1E1B4B]">08:30 AM Same-Day Cutoff Rule Active</h4>
            <p className="text-[#64748B] mt-0.5">
              Subscribers can pause before 08:30 AM with 100% full credit roll-forward. Late pauses after 08:30 AM cannot be refunded as cooking is already locked.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNotify?.('Cutoff rule settings updated!')}
          className="px-3 py-1.5 rounded-xl border border-purple-300 text-[#5B21B6] bg-white font-bold hover:bg-purple-100 transition whitespace-nowrap"
        >
          Adjust Cutoff Time
        </button>
      </div>

      {/* Pause Requests Log */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Recent Pause & Resumption Activity</h3>
          <span className="text-xs text-gray-500 font-medium">Showing today & upcoming week</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Log ID</th>
                <th className="p-3 font-bold">Subscriber & Company</th>
                <th className="p-3 font-bold">Paused Dates</th>
                <th className="p-3 font-bold">Reason</th>
                <th className="p-3 font-bold">Requested Timestamp</th>
                <th className="p-3 font-bold text-center">Credited Days</th>
                <th className="p-3 font-bold">Extended Expiry</th>
                <th className="p-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pauseList.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-mono font-bold text-[#5B21B6]">{p.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-[#1E1B4B]">{p.subscriber}</p>
                    <p className="text-[11px] text-gray-500">{p.company}</p>
                  </td>
                  <td className="p-3 font-bold text-amber-700">{p.pauseDates}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                      {p.reason}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 text-[11px]">{p.requestedAt}</td>
                  <td className="p-3 text-center font-black text-emerald-600">+{p.creditedDays} Days</td>
                  <td className="p-3 font-semibold text-[#1E1B4B]">{p.newPlanExpiry}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      p.status.includes('Approved') 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {p.status}
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
