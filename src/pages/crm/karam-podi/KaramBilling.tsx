import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Search, Plus, Download, 
  Printer, ArrowRight, ShieldCheck, AlertCircle, Building2
} from 'lucide-react';

interface KaramInvoice {
  id: string;
  clientName: string;
  clientType: 'Supermarket Chain' | 'Hotel Tiffin Chain' | 'Retail Distributor';
  gstin: string;
  date: string;
  dueDate: string;
  subtotal: number;
  gstAmount: number; // 5% or 12%
  totalAmount: number;
  paymentStatus: 'Paid' | 'Credit 30 Days' | 'Overdue';
  ewayBillNumber?: string;
}

export const KaramBilling: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [invoices, setInvoices] = useState<KaramInvoice[]>([
    {
      id: 'INV-KP-2026-041',
      clientName: 'Ratnadeep Supermarket (Madhapur Hub)',
      clientType: 'Supermarket Chain',
      gstin: '36AABCR1234F1Z8',
      date: '2026-11-25',
      dueDate: '2026-12-25',
      subtotal: 78500,
      gstAmount: 3925, // 5% on food spices
      totalAmount: 82425,
      paymentStatus: 'Credit 30 Days',
      ewayBillNumber: '2819 4402 1198'
    },
    {
      id: 'INV-KP-2026-042',
      clientName: 'Chutneys Tiffin Center (Banjara Hills)',
      clientType: 'Hotel Tiffin Chain',
      gstin: '36AAACC4455E1ZX',
      date: '2026-11-26',
      dueDate: '2026-12-10',
      subtotal: 34000,
      gstAmount: 1700,
      totalAmount: 35700,
      paymentStatus: 'Paid'
    },
    {
      id: 'INV-KP-2026-043',
      clientName: 'Vijetha Supermarket (Kukatpally Depot)',
      clientType: 'Supermarket Chain',
      gstin: '36AABCV9988G1ZQ',
      date: '2026-11-20',
      dueDate: '2026-12-20',
      subtotal: 94000,
      gstAmount: 4700,
      totalAmount: 98700,
      paymentStatus: 'Credit 30 Days',
      ewayBillNumber: '2819 4402 3341'
    },
    {
      id: 'INV-KP-2026-044',
      clientName: 'Minerva Coffee Shop (Himayatnagar)',
      clientType: 'Hotel Tiffin Chain',
      gstin: '36AABCM3322H1ZN',
      date: '2026-10-22',
      dueDate: '2026-11-22',
      subtotal: 28000,
      gstAmount: 1400,
      totalAmount: 29400,
      paymentStatus: 'Overdue'
    }
  ]);

  const filtered = invoices.filter(inv => 
    inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">GST Billing & Wholesale Credit Khata</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            FSSAI Lic #10020047000123 • HSN 2106 90 99 (5% GST) • Automated E-Way bill generation.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify?.('Bulk GST GSTR-1 Sales Report exported!')}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export GSTR-1 Ledger</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Total B2B Billings</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            ₹{invoices.reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400">Current Month</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Outstanding Credit Dues</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">
            ₹{invoices.filter(i => i.paymentStatus !== 'Paid').reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-amber-700 font-bold">3 Supermarket Accounts</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Overdue Khata</span>
          <div className="text-xl font-extrabold text-red-600 mt-1">₹29,400</div>
          <span className="text-[11px] text-red-700 font-bold">1 Account &gt; 30 Days</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">GST Output Tax (5%)</span>
          <div className="text-xl font-extrabold text-[#5B21B6] mt-1">
            ₹{invoices.reduce((sum, i) => sum + i.gstAmount, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">Input Credit Reconciled</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by client or invoice number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
        />
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Client & GSTIN</th>
                <th className="px-4 py-3">Taxable Value</th>
                <th className="px-4 py-3">GST (5%)</th>
                <th className="px-4 py-3">Invoice Total</th>
                <th className="px-4 py-3">E-Way Bill</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-[#5B21B6]">{inv.id}</div>
                    <div className="text-[10px] text-gray-400">{inv.date}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-gray-900">{inv.clientName}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{inv.gstin}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-bold">
                    ₹{inv.subtotal.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-purple-700 font-bold">
                    ₹{inv.gstAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 font-extrabold text-gray-900">
                    ₹{inv.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    {inv.ewayBillNumber ? (
                      <span className="text-[10px] font-mono bg-purple-50 text-[#5B21B6] px-2 py-0.5 rounded-md font-bold">
                        {inv.ewayBillNumber}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Below 50k Threshold</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      inv.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      inv.paymentStatus === 'Credit 30 Days' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {inv.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onNotify?.(`Tax invoice PDF downloaded for ${inv.clientName}!`)}
                      className="text-[11px] text-[#5B21B6] font-bold hover:underline cursor-pointer"
                    >
                      Download PDF
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
