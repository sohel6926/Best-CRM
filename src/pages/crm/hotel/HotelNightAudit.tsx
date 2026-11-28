import React, { useState } from 'react';
import { 
  Moon, TrendingUp, CheckCircle2, DollarSign, 
  BarChart3, RefreshCw, Printer, ShieldCheck, ArrowRight
} from 'lucide-react';

export const HotelNightAudit: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [auditDate, setAuditDate] = useState('26 Nov 2026 (Day Close)');
  const [auditStatus, setAuditStatus] = useState<'Pending Midnight Run' | 'Audit Completed & Locked'>('Pending Midnight Run');

  // Key hospitality metrics
  const totalRooms = 40;
  const occupiedRooms = 34;
  const occupancyPercent = 85;
  const totalRoomRevenue = 138600;
  const totalFoodBeverageRevenue = 32450;
  const totalLaundryOtherRevenue = 8400;
  const totalGrossDayRevenue = totalRoomRevenue + totalFoodBeverageRevenue + totalLaundryOtherRevenue;

  const adr = Math.round(totalRoomRevenue / occupiedRooms); // Average Daily Rate: ₹4,076
  const revPar = Math.round(totalRoomRevenue / totalRooms); // RevPAR: ₹3,465

  const runMidnightRollover = () => {
    setAuditStatus('Audit Completed & Locked');
    onNotify?.("Midnight Room Posting & Flash Financial Audit successfully locked & archived!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Day-End Closing & Daily Earnings Report</h2>
            <p className="text-sm text-gray-500">Daily cash collection summary, room earnings, average room rates, and tax totals</p>
          </div>
        </div>

        <div className="flex gap-2">
          {auditStatus === 'Pending Midnight Run' ? (
            <button 
              onClick={runMidnightRollover}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" /> Close Day & Generate Report
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Day Book Closed & Balanced
            </span>
          )}

          <button 
            onClick={() => onNotify?.("Manager Daily Flash Revenue Summary Printed")}
            className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-[#5B21B6] border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Daily Summary
          </button>
        </div>
      </div>

      {/* KPI Headline Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Occupancy Rate</div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-1">{occupancyPercent}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">{occupiedRooms} of {totalRooms} rooms occupied</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Average Daily Rate (ADR)</div>
          <div className="text-3xl font-extrabold text-[#5B21B6] mt-1">₹{adr.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Average revenue per occupied room</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">RevPAR (Rev Per Available Room)</div>
          <div className="text-3xl font-extrabold text-purple-950 mt-1">₹{revPar.toLocaleString()}</div>
          <div className="text-[11px] text-purple-600 mt-0.5 font-medium">+14.2% vs last week benchmark</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Daily Gross Inflow</div>
          <div className="text-3xl font-extrabold text-gray-900 mt-1">₹{totalGrossDayRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Rooms + Dining + Cabs</div>
        </div>
      </div>

      {/* Night Audit Verification Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          Automated Night Audit Verification Checklist ({auditDate})
        </h3>

        <div className="space-y-3">
          {[
            { title: 'Room Tariff Auto-Posting', desc: 'Post room charges and 12%/18% GST to 34 active guest room folios', status: 'Verified & Ready' },
            { title: 'In-Room Dining KOT Balancing', desc: 'Match all kitchen orders with room charge slips and restaurant POS drawer', status: 'Balanced (₹32,450)' },
            { title: 'Front Desk Cashier Drawer Reconciliation', desc: 'Cash in drawer matches UPI & Card swipe settlement receipts', status: 'Zero Variance' },
            { title: 'No-Show & Cancellation Charge Posting', desc: 'Identify 2 guaranteed OTA no-shows and apply 1-night cancellation tariff', status: 'Executed' },
            { title: 'Police / CID Form C Guest Submissions', desc: 'Sync international traveler register with government portal for foreign guests', status: 'Submitted & Cleared' },
          ].map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-purple-100 bg-purple-50/20 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <div className="font-bold text-gray-900 text-xs">{step.title}</div>
                <div className="text-[11px] text-gray-500">{step.desc}</div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                {step.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
