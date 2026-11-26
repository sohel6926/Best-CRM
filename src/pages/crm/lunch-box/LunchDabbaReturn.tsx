import React, { useState } from 'react';
import { 
  Package, RefreshCw, CheckCircle2, AlertCircle, Shield, 
  RotateCcw, DollarSign, Search, Check, Sparkles
} from 'lucide-react';

interface DabbaItem {
  id: string;
  dabbaNumber: string;
  subscriber: string;
  company: string;
  material: '3-Tier Stainless Steel 304' | '4-Tier Deluxe Hot-Pot';
  depositAmount: number;
  assignedDate: string;
  lastRetrieved: string;
  status: 'With Customer' | 'Retrieved Yesterday' | 'Washed & Sanitized' | 'Missing / Overdue';
}

export const LunchDabbaReturn: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [dabbas, setDabbas] = useState<DabbaItem[]>([
    {
      id: 'DAB-01',
      dabbaNumber: 'SS-TIFFIN-108',
      subscriber: 'Rajesh K. Varma',
      company: 'Tech Mahindra, Madhapur',
      material: '3-Tier Stainless Steel 304',
      depositAmount: 500,
      assignedDate: '2026-02-01',
      lastRetrieved: 'Yesterday 02:40 PM',
      status: 'Washed & Sanitized',
    },
    {
      id: 'DAB-02',
      dabbaNumber: 'SS-TIFFIN-109',
      subscriber: 'Ananya Sen',
      company: 'Qualcomm, Mindspace',
      material: '3-Tier Stainless Steel 304',
      depositAmount: 500,
      assignedDate: '2026-02-15',
      lastRetrieved: 'Today Morning by Naresh',
      status: 'Retrieved Yesterday',
    },
    {
      id: 'DAB-03',
      dabbaNumber: 'SS-TIFFIN-110',
      subscriber: 'Dr. Srinivas Rao',
      company: 'AIG Hospitals, Gachibowli',
      material: '4-Tier Deluxe Hot-Pot',
      depositAmount: 750,
      assignedDate: '2026-01-10',
      lastRetrieved: 'Active Today',
      status: 'With Customer',
    },
    {
      id: 'DAB-04',
      dabbaNumber: 'SS-TIFFIN-111',
      subscriber: 'Naveen Kumar',
      company: 'Deloitte, Raidurg',
      material: '3-Tier Stainless Steel 304',
      depositAmount: 500,
      assignedDate: '2026-02-18',
      lastRetrieved: '3 Days Ago (Unreturned)',
      status: 'Missing / Overdue',
    },
  ]);

  const sanitizedCount = dabbas.filter(d => d.status === 'Washed & Sanitized').length;
  const withCustCount = dabbas.filter(d => d.status === 'With Customer').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Zero-Waste & Packaging OS</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Stainless Steel Dabba Return & Deposits</h2>
          <p className="text-xs text-[#64748B]">
            Trace reusable stainless steel tiffins, ₹500 security deposit escrows, and hygiene sanitization logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('WhatsApp retrieval reminder broadcasted for overdue tiffins!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Send Dabba Return Reminder</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Total Reusable Tiffins</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">160 Units</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Saved ~3,200 plastic containers/mo</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Customer Security Deposit Escrow</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹80,000</p>
          <span className="text-[11px] text-gray-500">100% refundable upon exit</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Sanitized in Kitchen</span>
          <p className="text-2xl font-black text-blue-600 mt-1">54 Dabbas</p>
          <span className="text-[11px] text-gray-500">85°C steam dishwashed</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Overdue Retrieval Alert</span>
          <p className="text-2xl font-black text-amber-600 mt-1">4 Dabbas</p>
          <span className="text-[11px] text-amber-700 font-medium">Pending rider pick-up</span>
        </div>
      </div>

      {/* Dabba Inventory Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Live Tiffin Barcode & Custody Ledger</h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            97.5% Return Fidelity
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Dabba Barcode</th>
                <th className="p-3 font-bold">Assigned Subscriber</th>
                <th className="p-3 font-bold">Office Tech Park</th>
                <th className="p-3 font-bold">Material Specification</th>
                <th className="p-3 font-bold text-right">Refundable Deposit</th>
                <th className="p-3 font-bold">Last Pickup / Status</th>
                <th className="p-3 font-bold text-center">Hygiene Status</th>
                <th className="p-3 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dabbas.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-mono font-bold text-[#5B21B6]">{d.dabbaNumber}</td>
                  <td className="p-3 font-bold text-[#1E1B4B]">{d.subscriber}</td>
                  <td className="p-3 text-gray-600">{d.company}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-800">
                      {d.material}
                    </span>
                  </td>
                  <td className="p-3 text-right font-extrabold text-emerald-700">₹{d.depositAmount}</td>
                  <td className="p-3 text-gray-600 text-[11px]">{d.lastRetrieved}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      d.status === 'Washed & Sanitized' ? 'bg-emerald-100 text-emerald-800' :
                      d.status === 'With Customer' ? 'bg-blue-100 text-blue-800' :
                      d.status === 'Retrieved Yesterday' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => onNotify?.(`Marked ${d.dabbaNumber} as Washed & Sanitized!`)}
                      className="text-[11px] font-bold text-[#5B21B6] hover:underline cursor-pointer"
                    >
                      Log Sanitized
                    </button>
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
