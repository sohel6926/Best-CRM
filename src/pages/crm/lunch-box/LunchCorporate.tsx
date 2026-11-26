import React, { useState } from 'react';
import { 
  Building2, Users, FileText, Download, CheckCircle2, 
  Clock, Plus, Phone, Mail, DollarSign
} from 'lucide-react';

interface CorporateAccount {
  id: string;
  companyName: string;
  pocName: string;
  pocPhone: string;
  pocEmail: string;
  officeLocation: string;
  dailyBoxes: number;
  dietMix: string;
  monthlyBilling: number;
  billingCycle: 'Consolidated Monthly (Net 15)' | 'Bi-Weekly Invoice' | 'Advance Prepaid';
  paymentStatus: 'Paid' | 'Invoice Sent' | 'Due in 3 Days';
  contractValidTill: string;
}

export const LunchCorporate: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [accounts, setAccounts] = useState<CorporateAccount[]>([
    {
      id: 'CORP-01',
      companyName: 'Darwinbox Digital Solutions',
      pocName: 'Kavita Chawla (Admin Lead)',
      pocPhone: '+91 98851 22334',
      pocEmail: 'kavita.c@darwinbox.io',
      officeLocation: 'Floor 5, Skyview 10, Raidurg',
      dailyBoxes: 45,
      dietMix: '35 Veg Deluxe + 10 High-Protein',
      monthlyBilling: 148500,
      billingCycle: 'Consolidated Monthly (Net 15)',
      paymentStatus: 'Paid',
      contractValidTill: 'Dec 2026',
    },
    {
      id: 'CORP-02',
      companyName: 'Qualcomm India R&D Team',
      pocName: 'Sanjay Deshmukh (Facilities Manager)',
      pocPhone: '+91 97002 44551',
      pocEmail: 'sanjay.d@qualcomm.com',
      officeLocation: 'Building B, Mindspace IT Park',
      dailyBoxes: 30,
      dietMix: '20 Veg + 10 Non-Veg (Wed/Fri)',
      monthlyBilling: 105000,
      billingCycle: 'Consolidated Monthly (Net 15)',
      paymentStatus: 'Due in 3 Days',
      contractValidTill: 'Nov 2026',
    },
    {
      id: 'CORP-03',
      companyName: 'Cognizant Technology Solutions',
      pocName: 'Prashanth Reddy (Procurement)',
      pocPhone: '+91 99890 11998',
      pocEmail: 'prashanth.r@cognizant.com',
      officeLocation: 'DLF Cyber City, Gachibowli',
      dailyBoxes: 25,
      dietMix: '25 Veg Deluxe Thalis',
      monthlyBilling: 82500,
      billingCycle: 'Bi-Weekly Invoice',
      paymentStatus: 'Invoice Sent',
      contractValidTill: 'Oct 2026',
    },
    {
      id: 'CORP-04',
      companyName: 'Zenoti Cloud Systems',
      pocName: 'Swati Sen (HR Operations)',
      pocPhone: '+91 98499 77881',
      pocEmail: 'swati.sen@zenoti.com',
      officeLocation: 'Purva Summit, Hitec City',
      dailyBoxes: 20,
      dietMix: '15 Homestyle + 5 Diet Salad Bowls',
      monthlyBilling: 66000,
      billingCycle: 'Advance Prepaid',
      paymentStatus: 'Paid',
      contractValidTill: 'Jan 2027',
    },
  ]);

  const totalCorporateBoxes = accounts.reduce((sum, a) => sum + a.dailyBoxes, 0);
  const totalB2BRevenue = accounts.reduce((sum, a) => sum + a.monthlyBilling, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">B2B Tech Partnerships</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Corporate Subsidized Lunch Contracts</h2>
          <p className="text-xs text-[#64748B]">
            Bulk company cafeteria drop points, monthly consolidated GST bills, and subsidized meal management.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Consolidated monthly corporate GST bill generated for download!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Generate GST Tax Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Corporate B2B Accounts</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">{accounts.length} Tech Firms</p>
          <span className="text-[11px] text-gray-500">Long-term annual agreements</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Daily Bulk Boxes</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{totalCorporateBoxes} Meals/Day</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Single cafeteria consolidated drop</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Monthly B2B Contract Value</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹{(totalB2BRevenue / 100000).toFixed(2)} Lakhs</p>
          <span className="text-[11px] text-gray-500">Includes 5% Restaurant GST</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Delivery Window</span>
          <p className="text-2xl font-black text-amber-600 mt-1">12:15 PM</p>
          <span className="text-[11px] text-gray-500">Pre-lunch reception handoff</span>
        </div>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {acc.id}
                </span>
                <h3 className="font-extrabold text-base text-[#1E1B4B] mt-1">{acc.companyName}</h3>
                <p className="text-xs text-gray-500">{acc.officeLocation}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                acc.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                acc.paymentStatus === 'Due in 3 Days' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {acc.paymentStatus}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Daily Order Volume:</span>
                <span className="font-bold text-[#1E1B4B]">{acc.dailyBoxes} Boxes / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Diet Configuration:</span>
                <span className="font-medium text-gray-700">{acc.dietMix}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Terms:</span>
                <span className="font-bold text-gray-800">{acc.billingCycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Corporate POC:</span>
                <span className="font-bold text-[#5B21B6]">{acc.pocName}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <span className="text-[10px] text-gray-500 block">Monthly Billing:</span>
                <span className="text-sm font-black text-emerald-700">₹{acc.monthlyBilling.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNotify?.(`Dispatched GST Tax Invoice PDF to ${acc.pocEmail}!`)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-[#5B21B6]" />
                  <span>Send Bill</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNotify?.(`Initiated phone call to ${acc.pocName} (${acc.pocPhone})`)}
                  className="p-1.5 rounded-xl bg-purple-50 text-[#5B21B6] hover:bg-purple-100 transition"
                >
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
