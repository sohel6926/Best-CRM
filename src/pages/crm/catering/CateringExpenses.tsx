import React, { useState } from 'react';
import { 
  Receipt, DollarSign, Plus, CheckCircle2, 
  Clock, AlertCircle, FileText, ShoppingBag, Truck 
} from 'lucide-react';

interface ExpenseItem {
  id: string;
  category: 'Dairy & Ice Blocks' | 'Cooking Gas & Fuel' | 'Event Labor Bhatta' | 'Transportation' | 'Cleaning & Sundries';
  description: string;
  eventLinked: string;
  paidTo: string;
  amount: number;
  paymentMode: 'Cash Petty' | 'UPI' | 'Company Card';
  recordedBy: string;
  timestamp: string;
}

export const CateringExpenses: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [expenses] = useState<ExpenseItem[]>([
    {
      id: 'EXP-401',
      category: 'Dairy & Ice Blocks',
      description: '4 Commercial Ice Blocks (200kg) for Welcome drinks & mocktail chiller tubs',
      eventLinked: 'Srikanth & Deepthi Wedding (N Convention)',
      paidTo: 'Shankar Ice Depot, Madhapur',
      amount: 1800,
      paymentMode: 'UPI',
      recordedBy: 'Chef Venkatesh',
      timestamp: 'Today 06:15 AM',
    },
    {
      id: 'EXP-402',
      category: 'Cooking Gas & Fuel',
      description: '4 Commercial 19Kg LPG Cylinders refilled for main bhatti burners',
      eventLinked: 'Base Kitchen Daily Operations',
      paidTo: 'Bharat Gas Agency',
      amount: 7600,
      paymentMode: 'Company Card',
      recordedBy: 'Naresh (Kitchen Stores)',
      timestamp: 'Today 07:00 AM',
    },
    {
      id: 'EXP-403',
      category: 'Event Labor Bhatta',
      description: 'Daily cash bhatta paid to 12 food servers and plate clearing boys',
      eventLinked: 'Dr. Rahul & Sneha Sangeet Night',
      paidTo: 'Master Subbaiah (Waiter Captain)',
      amount: 4800,
      paymentMode: 'Cash Petty',
      recordedBy: 'Manager S. Reddy',
      timestamp: 'Yesterday 11:30 PM',
    },
    {
      id: 'EXP-404',
      category: 'Transportation',
      description: 'Diesel fuel slip for 2 Tata Ace vehicles transporting brass degs to venue',
      eventLinked: 'Tech Mahindra Leadership Summit',
      paidTo: 'HPCL Fuel Station, Hitec City',
      amount: 2400,
      paymentMode: 'UPI',
      recordedBy: 'Driver Raju',
      timestamp: 'Yesterday 04:00 PM',
    },
  ]);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Cash Flow & Cost Control</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Kitchen Expenses & Daily Petty Cash Khata</h2>
          <p className="text-xs text-[#64748B]">
            Track daily spot purchases, ice blocks, LPG cylinders, waiter bhatta and transportation fuel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Logged new petty cash expense voucher!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Add Daily Expense</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Today's Spot Outflow</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">₹{totalExpense.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-gray-500">4 Expense Vouchers</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Petty Cash In Hand</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹18,400</p>
          <span className="text-[11px] text-gray-500">Safe in kitchen office</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">LPG Cylinder Buffer</span>
          <p className="text-2xl font-black text-blue-600 mt-1">6 Cylinders Full</p>
          <span className="text-[11px] text-gray-500">Commercial 19Kg</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Avg Daily Kharch</span>
          <p className="text-2xl font-black text-gray-800 mt-1">₹14,200</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Within budgeted buffer</span>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-[#1E1B4B]">Recent Daily Expense Vouchers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Voucher ID</th>
                <th className="p-3 font-bold">Category & Description</th>
                <th className="p-3 font-bold">Linked Event / Purpose</th>
                <th className="p-3 font-bold">Paid To</th>
                <th className="p-3 font-bold text-right">Amount</th>
                <th className="p-3 font-bold text-center">Payment Mode</th>
                <th className="p-3 font-bold">Recorded By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-mono font-bold text-[#5B21B6]">{e.id}</td>
                  <td className="p-3">
                    <span className="font-bold text-[#1E1B4B] block">{e.category}</span>
                    <span className="text-[11px] text-gray-500">{e.description}</span>
                  </td>
                  <td className="p-3 text-gray-700 font-medium">{e.eventLinked}</td>
                  <td className="p-3 text-gray-600">{e.paidTo}</td>
                  <td className="p-3 text-right font-black text-gray-900 tabular-nums">
                    ₹{e.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-[#5B21B6]">
                      {e.paymentMode}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 text-[11px]">{e.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
