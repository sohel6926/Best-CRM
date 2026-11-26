import { useState } from 'react';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Calendar,
  Filter,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SaleTransaction, useAdmin } from '../../context/AdminContext';

export function AdminSalesReports() {
  const { transactions } = useAdmin();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterGateway, setFilterGateway] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<SaleTransaction | null>(null);

  const filtered = transactions.filter((t) => {
    const matchSearch =
      t.customerName.toLowerCase().includes(search.toLowerCase()) ||
      t.businessName.toLowerCase().includes(search.toLowerCase()) ||
      t.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      t.crmName.toLowerCase().includes(search.toLowerCase());
    const matchRegion = filterRegion === 'all' || t.region.includes(filterRegion);
    const matchGateway = filterGateway === 'all' || t.paymentGateway === filterGateway;
    return matchSearch && matchRegion && matchGateway;
  });

  const totalGross = filtered.reduce((s, t) => s + (t.status === 'paid' ? t.totalAmount : 0), 0);
  const totalGst = filtered.reduce((s, t) => s + (t.status === 'paid' ? t.gstAmount : 0), 0);
  const totalNet = filtered.reduce((s, t) => s + (t.status === 'paid' ? t.amount : 0), 0);
  const totalRefunds = filtered.reduce((s, t) => s + (t.status === 'refunded' ? t.totalAmount : 0), 0);

  const exportToCSV = () => {
    const headers = ['Invoice No', 'Date', 'Customer', 'Business', 'CRM', 'Plan', 'Billing', 'Net Amount', 'GST (18%)', 'Total', 'Gateway', 'Status'];
    const rows = filtered.map((t) => [
      t.invoiceNo,
      t.date,
      `"${t.customerName}"`,
      `"${t.businessName}"`,
      `"${t.crmName}"`,
      `"${t.planName}"`,
      t.billingCycle,
      t.amount.toFixed(2),
      t.gstAmount.toFixed(2),
      t.totalAmount.toFixed(2),
      t.paymentGateway,
      t.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bestCRM_Sales_Report_${period}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Title & Export Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Sales, Revenue & GST Reports</h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Track daily, weekly, and monthly transactions, payment gateways, and tax reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#DDD6FE] bg-white px-3.5 py-2 text-xs font-semibold text-[#5B21B6] shadow-xs hover:bg-[#F3EEFF] cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" />
            <span>Export to Excel/CSV</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#5B21B6] px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#4C1D95] cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF Summary</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Metric Highlights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Gross Collections</span>
          <p className="mt-2 text-2xl font-extrabold text-[#1E1B4B] tabular-nums">₹{totalGross.toLocaleString('en-IN')}</p>
          <span className="text-[11px] font-semibold text-green-600">Total payments received</span>
        </div>

        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Net Revenue (excl. Tax)</span>
          <p className="mt-2 text-2xl font-extrabold text-[#5B21B6] tabular-nums">₹{Math.round(totalNet).toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-[#64748B]">Company baseline earnings</span>
        </div>

        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">GST Output Tax (18%)</span>
          <p className="mt-2 text-2xl font-extrabold text-[#1E1B4B] tabular-nums">₹{Math.round(totalGst).toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-[#64748B]">CGST 9% + SGST 9% liability</span>
        </div>

        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Refunds / Chargebacks</span>
          <p className="mt-2 text-2xl font-extrabold text-red-600 tabular-nums">₹{totalRefunds.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-red-500 font-semibold">{transactions.filter(t => t.status === 'refunded').length} processed transaction</span>
        </div>
      </div>

      {/* Filter and Cadence Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EDE9FE] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Period selector */}
          <div className="inline-flex rounded-xl bg-[#F3EEFF] p-1 text-xs">
            {(['daily', 'weekly', 'monthly'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-3 py-1 font-semibold capitalize cursor-pointer ${
                  period === p ? 'bg-[#5B21B6] text-white shadow-xs' : 'text-[#5B21B6] hover:bg-[#EDE9FE]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Region filter */}
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] px-3 py-1.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:outline-none"
          >
            <option value="all">All States & Regions</option>
            <option value="Telangana">Telangana</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>

          {/* Gateway filter */}
          <select
            value={filterGateway}
            onChange={(e) => setFilterGateway(e.target.value)}
            className="rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] px-3 py-1.5 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:outline-none"
          >
            <option value="all">All Payment Gateways</option>
            <option value="Razorpay">Razorpay</option>
            <option value="UPI">UPI</option>
            <option value="Card">Debit / Credit Card</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice or customer..."
            className="rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] py-1.5 pl-8.5 pr-3 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-2xl border border-[#EDE9FE] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EDE9FE] bg-[#FAF8FF] text-[#64748B]">
                <th className="px-5 py-3 font-bold">Invoice & Date</th>
                <th className="px-5 py-3 font-bold">Customer & Business</th>
                <th className="px-5 py-3 font-bold">CRM Product</th>
                <th className="px-5 py-3 font-bold">Payment Method</th>
                <th className="px-5 py-3 font-bold text-right">Taxable Value</th>
                <th className="px-5 py-3 font-bold text-right">Total (Inc. GST)</th>
                <th className="px-5 py-3 font-bold text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEFF]">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-5 py-3">
                    <p className="font-bold text-[#5B21B6]">{t.invoiceNo}</p>
                    <span className="text-[10px] text-[#94A3B8]">{t.date}</span>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-bold text-[#1E1B4B]">{t.customerName}</p>
                    <p className="text-[11px] text-[#64748B]">{t.businessName} • {t.region}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-[#1E1B4B]">{t.crmName}</span>
                    <p className="text-[10px] text-[#64748B] capitalize">{t.planName} ({t.billingCycle})</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#EDE9FE] px-2 py-0.5 font-semibold text-[#5B21B6]">
                      {t.paymentGateway}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums text-[#475569]">
                    ₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums font-extrabold text-[#1E1B4B]">
                    ₹{t.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(t)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#DDD6FE] px-2.5 py-1 text-[11px] font-semibold text-[#5B21B6] hover:bg-[#EDE9FE] cursor-pointer"
                    >
                      <FileText className="h-3 w-3" />
                      <span>GST Bill</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GST Invoice Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white p-7 shadow-2xl space-y-5 animate-in fade-in duration-150 border-t-8 border-[#5B21B6]">
            {/* Invoice Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#1E1B4B]">TAX INVOICE</h2>
                <p className="text-xs text-[#64748B]">Invoice #: <strong>{selectedInvoice.invoiceNo}</strong></p>
                <p className="text-xs text-[#64748B]">Date of Issue: {selectedInvoice.date}</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-[#5B21B6]">bestCRM Solutions Pvt. Ltd.</p>
                <p className="text-[11px] text-[#64748B]">GSTIN: 36AABCB1234F1Z0</p>
                <p className="text-[11px] text-[#64748B]">Madhapur, Hyderabad, TS 500081</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="rounded-xl bg-[#FAF8FF] p-4 text-xs">
              <span className="font-bold text-[#64748B] uppercase">Billed To Customer:</span>
              <p className="mt-1 font-bold text-sm text-[#1E1B4B]">{selectedInvoice.businessName}</p>
              <p className="text-[#475569]">Attn: {selectedInvoice.customerName}</p>
              <p className="text-[#475569]">{selectedInvoice.region}, India</p>
            </div>

            {/* Line Items Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#F3EEFF] text-[#1E1B4B] font-bold">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">HSN/SAC</th>
                    <th className="p-3 text-right">Taxable Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3">
                      <strong>{selectedInvoice.crmName} Subscription</strong>
                      <p className="text-[11px] text-[#64748B]">{selectedInvoice.planName} ({selectedInvoice.billingCycle})</p>
                    </td>
                    <td className="p-3">997331 (Software as a Service)</td>
                    <td className="p-3 text-right tabular-nums">₹{selectedInvoice.amount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-2.5 text-right font-medium text-[#64748B]">Central GST (CGST 9%):</td>
                    <td className="p-2.5 text-right tabular-nums">₹{(selectedInvoice.gstAmount / 2).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-2.5 text-right font-medium text-[#64748B]">State GST (SGST 9%):</td>
                    <td className="p-2.5 text-right tabular-nums">₹{(selectedInvoice.gstAmount / 2).toFixed(2)}</td>
                  </tr>
                  <tr className="bg-[#FAF8FF] font-bold text-sm text-[#5B21B6]">
                    <td colSpan={2} className="p-3 text-right">Total Invoice Value (INR):</td>
                    <td className="p-3 text-right tabular-nums">₹{selectedInvoice.totalAmount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer / Print buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Paid via {selectedInvoice.paymentGateway}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xl bg-[#5B21B6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95]"
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
