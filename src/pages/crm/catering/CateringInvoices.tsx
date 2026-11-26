import React, { useState } from 'react';
import { 
  FileText, Download, Printer, CheckCircle, Clock, 
  Send, QrCode, AlertCircle, Percent, DollarSign, Share2
} from 'lucide-react';

interface MilestoneInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  eventTitle: string;
  eventDate: string;
  totalDealAmount: number;
  stage: 'Stage 1: Advance Booking (20%)' | 'Stage 2: Pre-Event Grocery Prep (50%)' | 'Stage 3: Event Day Balance (30%)';
  dueAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  gstApplicable: boolean;
  gstRate: number; // 5% without ITC or 18% with ITC
  dueDate: string;
}

export const CateringInvoices: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [invoices, setInvoices] = useState<MilestoneInvoice[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'INV-CAT-2026-081',
      clientName: 'Sunil Verma',
      eventTitle: 'Verma Royal Wedding Reception (600 guests)',
      eventDate: 'Dec 12, 2026',
      totalDealAmount: 510000,
      stage: 'Stage 1: Advance Booking (20%)',
      dueAmount: 102000,
      status: 'Paid',
      gstApplicable: true,
      gstRate: 5,
      dueDate: 'Oct 15, 2026'
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-CAT-2026-082',
      clientName: 'Sunil Verma',
      eventTitle: 'Verma Royal Wedding Reception (600 guests)',
      eventDate: 'Dec 12, 2026',
      totalDealAmount: 510000,
      stage: 'Stage 2: Pre-Event Grocery Prep (50%)',
      dueAmount: 255000,
      status: 'Paid',
      gstApplicable: true,
      gstRate: 5,
      dueDate: 'Dec 05, 2026'
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-CAT-2026-083',
      clientName: 'Sunil Verma',
      eventTitle: 'Verma Royal Wedding Reception (600 guests)',
      eventDate: 'Dec 12, 2026',
      totalDealAmount: 510000,
      stage: 'Stage 3: Event Day Balance (30%)',
      dueAmount: 153000,
      status: 'Pending',
      gstApplicable: true,
      gstRate: 5,
      dueDate: 'Dec 12, 2026'
    },
    {
      id: 'inv-4',
      invoiceNumber: 'INV-CAT-2026-084',
      clientName: 'Rajesh Singhania',
      eventTitle: 'Singhania Silver Jubilee Gala (350 guests)',
      eventDate: 'Nov 30, 2026',
      totalDealAmount: 280000,
      stage: 'Stage 2: Pre-Event Grocery Prep (50%)',
      dueAmount: 140000,
      status: 'Pending',
      gstApplicable: true,
      gstRate: 18,
      dueDate: 'Nov 27, 2026'
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<MilestoneInvoice>(invoices[2]);

  const markPaid = (id: string) => {
    setInvoices(prev => 
      prev.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv)
    );
    onNotify?.("Payment marked as received via UPI / Cheque");
  };

  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.dueAmount, 0);
  const totalPending = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.dueAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Milestone Billing & GST Invoices</h2>
            <p className="text-sm text-gray-500">Enforce standard catering milestone stages: 20% booking, 50% mandi prep, 30% event day balance</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Generating new milestone billing schedule...")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Create Milestone Schedule
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Milestone Advances Cleared</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{totalCollected.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Safe in bank account</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Pending Milestone Collections</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalPending.toLocaleString()}</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Due prior to final food service</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Catering GST Compliance</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">5% / 18%</div>
          <div className="text-[11px] text-purple-600 mt-0.5">HSN Code 9963 Outdoor Catering</div>
        </div>
      </div>

      {/* Grid: Invoice List & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Milestone Ledger</h3>
            <div className="space-y-3">
              {invoices.map(inv => (
                <div 
                  key={inv.id}
                  onClick={() => setSelectedInvoice(inv)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedInvoice.id === inv.id 
                      ? 'border-purple-600 bg-purple-50/40 shadow-sm' 
                      : 'border-purple-100 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-900">{inv.invoiceNumber}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-gray-900 mt-1">{inv.eventTitle}</div>
                      <div className="text-xs text-gray-500">{inv.stage} • Due: {inv.dueDate}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-purple-950">₹{inv.dueAmount.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-500">+ {inv.gstRate}% GST (HSN 9963)</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Bill & UPI Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-purple-100">
              <span className="text-xs font-bold uppercase text-purple-900">GST Tax Invoice Preview</span>
              <span className="text-xs font-mono text-gray-400">{selectedInvoice.invoiceNumber}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Client:</span>
                <span className="font-bold text-gray-900">{selectedInvoice.clientName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Contract:</span>
                <span className="font-semibold text-gray-900">₹{selectedInvoice.totalDealAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Milestone Due:</span>
                <span className="font-bold text-purple-900">₹{selectedInvoice.dueAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>CGST ({selectedInvoice.gstRate / 2}%):</span>
                <span>₹{Math.round((selectedInvoice.dueAmount * (selectedInvoice.gstRate / 2)) / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>SGST ({selectedInvoice.gstRate / 2}%):</span>
                <span>₹{Math.round((selectedInvoice.dueAmount * (selectedInvoice.gstRate / 2)) / 100).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-purple-100 flex justify-between font-bold text-sm text-purple-950">
                <span>Gross Payable:</span>
                <span>₹{Math.round(selectedInvoice.dueAmount * (1 + selectedInvoice.gstRate / 100)).toLocaleString()}</span>
              </div>
            </div>

            {/* UPI QR Payment Block */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center space-y-2">
              <div className="w-24 h-24 mx-auto bg-white p-2 rounded-lg border border-purple-200 flex items-center justify-center">
                <QrCode className="w-20 h-20 text-purple-900" />
              </div>
              <div className="text-[11px] text-gray-600">Scan via PhonePe / GPay / Paytm</div>
              <div className="text-xs font-bold text-purple-900 font-mono">bestcatering@icici</div>
            </div>

            <div className="space-y-2 pt-2">
              {selectedInvoice.status !== 'Paid' ? (
                <button 
                  onClick={() => markPaid(selectedInvoice.id)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Mark Advance Received
                </button>
              ) : (
                <div className="py-2 bg-emerald-50 text-emerald-800 text-center text-xs font-bold rounded-xl border border-emerald-200">
                  ✓ Milestone Cleared
                </div>
              )}

              <button 
                onClick={() => onNotify?.(`WhatsApp invoice link sent to ${selectedInvoice.clientName}`)}
                className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" /> Send WhatsApp Invoice & QR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
