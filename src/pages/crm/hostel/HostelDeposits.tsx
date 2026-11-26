import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, Clock, 
  FileText, Download, DollarSign, ArrowRight, Printer
} from 'lucide-react';

interface DepositCheckout {
  id: string;
  residentName: string;
  roomBed: string;
  joiningDate: string;
  noticeGivenDate: string;
  vacatingDate: string;
  initialDepositPaid: number;
  unpaidPowerDeduction: number;
  damageDeduction: number;
  damageNotes: string;
  netRefundPayable: number;
  status: 'Serving Notice (30 Days)' | 'Inspection Done' | 'Refund Settled & Cleared';
  noDuesIssued: boolean;
}

export const HostelDeposits: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [checkouts, setCheckouts] = useState<DepositCheckout[]>([
    {
      id: 'dep-1',
      residentName: 'Saurabh Jha',
      roomBed: 'Room 102 - Bed C',
      joiningDate: '01 Jan 2025',
      noticeGivenDate: '01 Nov 2026',
      vacatingDate: '30 Nov 2026',
      initialDepositPaid: 17000, // 2 months rent
      unpaidPowerDeduction: 650,
      damageDeduction: 500,
      damageNotes: 'Lost room wardrobe brass key',
      netRefundPayable: 15850,
      status: 'Inspection Done',
      noDuesIssued: false
    },
    {
      id: 'dep-2',
      residentName: 'Megha Reddy',
      roomBed: 'Room 202 - Bed C',
      joiningDate: '15 Mar 2025',
      noticeGivenDate: '10 Nov 2026',
      vacatingDate: '10 Dec 2026',
      initialDepositPaid: 18000,
      unpaidPowerDeduction: 0,
      damageDeduction: 0,
      damageNotes: 'None, room in perfect order',
      netRefundPayable: 18000,
      status: 'Serving Notice (30 Days)',
      noDuesIssued: false
    },
    {
      id: 'dep-3',
      residentName: 'Anil Deshmukh',
      roomBed: 'Room 104 - Bed B',
      joiningDate: '10 Aug 2024',
      noticeGivenDate: '15 Oct 2026',
      vacatingDate: '15 Nov 2026',
      initialDepositPaid: 16000,
      unpaidPowerDeduction: 820,
      damageDeduction: 0,
      damageNotes: 'Checked out cleanly',
      netRefundPayable: 15180,
      status: 'Refund Settled & Cleared',
      noDuesIssued: true
    }
  ]);

  const settleRefund = (id: string) => {
    setCheckouts(prev => 
      prev.map(c => c.id === id ? { ...c, status: 'Refund Settled & Cleared', noDuesIssued: true } : c)
    );
    onNotify?.("Deposit refund processed via UPI & No-Dues Certificate generated!");
  };

  const totalHeldDeposits = 120 * 16000; // ≈ ₹19.2 Lakhs in total deposit reserve

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Security Deposit Ledger & Move-Out Clearance</h2>
            <p className="text-sm text-gray-500">Track 30-day notice periods, audit room damages/meter dues, and issue official No-Dues Certificates</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Log Move-Out Notice opened")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Log 30-Day Vacating Notice
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Security Deposit Reserve</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">₹{totalHeldDeposits.toLocaleString()}</div>
          <div className="text-[11px] text-purple-600 mt-0.5">2 months rent advance reserve</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Beds on 30-Day Notice</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {checkouts.filter(c => c.status !== 'Refund Settled & Cleared').length} Beds
          </div>
          <div className="text-[11px] text-amber-700 mt-0.5 font-medium">Available for next month pre-booking</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Pending Refund Outflows</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            ₹{checkouts.filter(c => c.status !== 'Refund Settled & Cleared').reduce((s, c) => s + c.netRefundPayable, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">Post damage & power audit</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Dispute Resolution Rate</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">99.4%</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Transparent itemized deductions</div>
        </div>
      </div>

      {/* Checkout Ledger */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Vacating Residents & No-Dues Audits ({checkouts.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Resident</th>
                <th className="py-3 px-4">Room & Bed</th>
                <th className="py-3 px-4">Notice Date</th>
                <th className="py-3 px-4">Vacating Date</th>
                <th className="py-3 px-4 text-right">Initial Deposit</th>
                <th className="py-3 px-4 text-right">Deductions</th>
                <th className="py-3 px-4 text-right">Net Refund Due</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {checkouts.map(c => {
                const totalDeductions = c.unpaidPowerDeduction + c.damageDeduction;
                return (
                  <tr key={c.id} className="hover:bg-purple-50/30 transition-all">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{c.residentName}</td>
                    <td className="py-3.5 px-4 font-semibold text-purple-900">{c.roomBed}</td>
                    <td className="py-3.5 px-4 text-gray-500">{c.noticeGivenDate}</td>
                    <td className="py-3.5 px-4 text-gray-900 font-bold">{c.vacatingDate}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-800">₹{c.initialDepositPaid.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right">
                      {totalDeductions > 0 ? (
                        <div>
                          <span className="font-bold text-red-600">- ₹{totalDeductions}</span>
                          <div className="text-[10px] text-gray-400">{c.damageNotes}</div>
                        </div>
                      ) : (
                        <span className="text-emerald-600 font-medium">₹0</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-purple-950">
                      ₹{c.netRefundPayable.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        c.status === 'Refund Settled & Cleared' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        c.status === 'Inspection Done' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {!c.noDuesIssued ? (
                        <button 
                          onClick={() => settleRefund(c.id)}
                          className="px-2.5 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-[11px] font-bold shadow-sm"
                        >
                          Clear & Settle
                        </button>
                      ) : (
                        <button 
                          onClick={() => onNotify?.(`Printed No-Dues Certificate for ${c.residentName}`)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" /> No-Dues PDF
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
