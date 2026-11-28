import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Search, Plus, Download, 
  Printer, ArrowRight, ShieldCheck, AlertCircle, Building2
} from 'lucide-react';

interface PickleInvoice {
  id: string;
  distributorName: string;
  region: string;
  gstin: string;
  date: string;
  dueDate: string;
  creditLimit: number;
  invoiceAmount: number;
  paidAmount: number;
  outstandingBalance: number;
  paymentStatus: 'Cleared' | 'Within 15 Days' | 'Overdue';
}

export const PickleBilling: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [invoices, setInvoices] = useState<PickleInvoice[]>([
    {
      id: 'INV-PKL-901',
      distributorName: 'Balaji Super Bazaar (Dilsukhnagar)',
      region: 'Hyderabad South',
      gstin: '36AAACB1122D1Z4',
      date: '2026-11-24',
      dueDate: '2026-12-09',
      creditLimit: 150000,
      invoiceAmount: 64200,
      paidAmount: 64200,
      outstandingBalance: 0,
      paymentStatus: 'Cleared'
    },
    {
      id: 'INV-PKL-902',
      distributorName: 'Andhra Ruchulu Foods (Bengaluru Depot)',
      region: 'Bengaluru Interstate',
      gstin: '29AABCA9988C1ZR',
      date: '2026-11-26',
      dueDate: '2026-12-11',
      creditLimit: 300000,
      invoiceAmount: 112000,
      paidAmount: 50000,
      outstandingBalance: 62000,
      paymentStatus: 'Within 15 Days'
    },
    {
      id: 'INV-PKL-903',
      distributorName: 'Q-Mart Gourmet Supermarket (Gachibowli)',
      region: 'Cyberabad Hub',
      gstin: '36AABCS5544K1ZM',
      date: '2026-10-28',
      dueDate: '2026-11-12',
      creditLimit: 100000,
      invoiceAmount: 48500,
      paidAmount: 0,
      outstandingBalance: 48500,
      paymentStatus: 'Overdue'
    }
  ]);

  const filtered = invoices.filter(i => 
    i.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.id.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="text-lg font-extrabold text-gray-900">Distributor Billing & Credit Khata</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            FSSAI Lic #10020047000456 • HSN 2001 90 00 (12% GST) • Credit limits & aging balances.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify?.('Distributor credit statements and outstanding ledger exported!')}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Credit Khata</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Gross B2B Dispatch</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            ₹{invoices.reduce((sum, i) => sum + i.invoiceAmount, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400">Total Invoiced</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Collected Cash</span>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">
            ₹{invoices.reduce((sum, i) => sum + i.paidAmount, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">51% Realized</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Active Credit Ledger</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">
            ₹{invoices.reduce((sum, i) => sum + i.outstandingBalance, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400">Under Credit Term</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Overdue Follow-ups</span>
          <div className="text-xl font-extrabold text-red-600 mt-1">₹48,500</div>
          <span className="text-[11px] text-red-700 font-bold">Q-Mart (&gt; 14 Days)</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search distributor name or invoice..."
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
                <th className="px-4 py-3">Distributor Account</th>
                <th className="px-4 py-3">Credit Limit</th>
                <th className="px-4 py-3">Billed (12% GST)</th>
                <th className="px-4 py-3">Balance Due</th>
                <th className="px-4 py-3">Khata Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-[#5B21B6]">{i.id}</div>
                    <div className="text-[10px] text-gray-400">Due: {i.dueDate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-gray-900">{i.distributorName}</div>
                    <div className="text-[11px] text-gray-500">{i.region} • {i.gstin}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-bold">
                    ₹{i.creditLimit.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 font-extrabold text-gray-900">
                    ₹{i.invoiceAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-amber-700">
                      ₹{i.outstandingBalance.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-emerald-700">Paid: ₹{i.paidAmount.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      i.paymentStatus === 'Cleared' ? 'bg-emerald-100 text-emerald-800' :
                      i.paymentStatus === 'Within 15 Days' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {i.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onNotify?.(`Ledger statement and invoice PDF shared to ${i.distributorName}!`)}
                      className="text-[11px] text-[#5B21B6] font-bold hover:underline cursor-pointer"
                    >
                      Send Khata
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
