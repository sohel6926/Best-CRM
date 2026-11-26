import React, { useState } from 'react';
import { 
  CreditCard, Send, QrCode, CheckCircle, Clock, 
  AlertCircle, DollarSign, Share2, Printer, Download, Sparkles
} from 'lucide-react';

interface RentInvoice {
  id: string;
  invoiceNumber: string;
  residentName: string;
  roomBed: string;
  billingMonth: string;
  baseRent: number;
  messCharges: number;
  electricityUnitsCost: number;
  wifiAndAmenities: number;
  lateFee: number;
  totalPayable: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
}

export const HostelBilling: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [invoices, setInvoices] = useState<RentInvoice[]>([
    {
      id: 'inv-1',
      invoiceNumber: 'HST-2026-11-01',
      residentName: 'Rohan Sharma',
      roomBed: 'Room 101 - Bed A',
      billingMonth: 'November 2026',
      baseRent: 8500,
      messCharges: 3000,
      electricityUnitsCost: 650,
      wifiAndAmenities: 350,
      lateFee: 0,
      totalPayable: 12500,
      status: 'Paid',
      dueDate: '05 Nov 2026'
    },
    {
      id: 'inv-2',
      invoiceNumber: 'HST-2026-11-02',
      residentName: 'Aditya Varma',
      roomBed: 'Room 101 - Bed B',
      billingMonth: 'November 2026',
      baseRent: 8500,
      messCharges: 3000,
      electricityUnitsCost: 650,
      wifiAndAmenities: 350,
      lateFee: 0,
      totalPayable: 12500,
      status: 'Paid',
      dueDate: '05 Nov 2026'
    },
    {
      id: 'inv-3',
      invoiceNumber: 'HST-2026-11-03',
      residentName: 'Sneha Patel',
      roomBed: 'Room 202 - Bed A',
      billingMonth: 'November 2026',
      baseRent: 6500,
      messCharges: 2500,
      electricityUnitsCost: 400,
      wifiAndAmenities: 300,
      lateFee: 150,
      totalPayable: 9850,
      status: 'Pending',
      dueDate: '05 Nov 2026'
    },
    {
      id: 'inv-4',
      invoiceNumber: 'HST-2026-11-04',
      residentName: 'Karthik Raja',
      roomBed: 'Room 102 - Bed A',
      billingMonth: 'November 2026',
      baseRent: 6000,
      messCharges: 2500,
      electricityUnitsCost: 380,
      wifiAndAmenities: 300,
      lateFee: 300,
      totalPayable: 9480,
      status: 'Overdue',
      dueDate: '05 Nov 2026'
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<RentInvoice>(invoices[2]);

  const markPaid = (id: string) => {
    setInvoices(prev => 
      prev.map(inv => inv.id === id ? { ...inv, status: 'Paid' } : inv)
    );
    onNotify?.("Rent marked as paid & receipt issued");
  };

  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((acc, c) => acc + c.totalPayable, 0);
  const totalPending = invoices.filter(i => i.status !== 'Paid').reduce((acc, c) => acc + c.totalPayable, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Monthly Rent & Automated Fee Collection</h2>
            <p className="text-sm text-gray-500">Auto-generate 1st of month rent invoices (Room + Mess + Power Meter + Amenities) with UPI QR codes</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Generating November Month Batch Rent Invoices for all 120 residents...")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Generate Monthly Batch Rent
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Rent Collected This Month</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{totalCollected.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Direct Bank UPI transfers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Pending Dues & Late Fees</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalPending.toLocaleString()}</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Automatic reminders sent</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Automated Late Fee Rule</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">₹100 / day</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Applied post 5th of every month</div>
        </div>
      </div>

      {/* Main Billing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Invoices List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Resident Rent Invoices</h3>
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
                          inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 
                          inv.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-gray-900 mt-1">{inv.residentName} ({inv.roomBed})</div>
                      <div className="text-xs text-gray-500">{inv.billingMonth} • Due Date: {inv.dueDate}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-purple-950">₹{inv.totalPayable.toLocaleString()}</div>
                      <div className="text-[11px] text-gray-500">Rent + Mess + Power Meter</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Bill & UPI Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-purple-100">
              <span className="text-xs font-bold uppercase text-purple-900">Hostel Rent Receipt</span>
              <span className="text-xs font-mono text-gray-400">{selectedInvoice.invoiceNumber}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Resident:</span>
                <span className="font-bold text-gray-900">{selectedInvoice.residentName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Room / Bed:</span>
                <span className="font-semibold text-gray-900">{selectedInvoice.roomBed}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Room Base Rent:</span>
                <span className="font-semibold text-gray-900">₹{selectedInvoice.baseRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Mess (3 Meals + Milk):</span>
                <span className="font-semibold text-gray-900">₹{selectedInvoice.messCharges.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Electricity Sub-Meter:</span>
                <span className="font-semibold text-gray-900">₹{selectedInvoice.electricityUnitsCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>High-Speed Wi-Fi & Water:</span>
                <span className="font-semibold text-gray-900">₹{selectedInvoice.wifiAndAmenities.toLocaleString()}</span>
              </div>
              {selectedInvoice.lateFee > 0 && (
                <div className="flex justify-between text-red-600 font-semibold">
                  <span>Late Fee Penalty:</span>
                  <span>+ ₹{selectedInvoice.lateFee}</span>
                </div>
              )}
              <div className="pt-2 border-t border-purple-100 flex justify-between font-bold text-sm text-purple-950">
                <span>Total Amount:</span>
                <span>₹{selectedInvoice.totalPayable.toLocaleString()}</span>
              </div>
            </div>

            {/* UPI QR Payment */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center space-y-2">
              <div className="w-24 h-24 mx-auto bg-white p-2 rounded-lg border border-purple-200 flex items-center justify-center">
                <QrCode className="w-20 h-20 text-purple-900" />
              </div>
              <div className="text-[11px] text-gray-600">Scan via GPay / PhonePe / Paytm</div>
              <div className="text-xs font-bold text-purple-900 font-mono">royalhostel@icici</div>
            </div>

            <div className="space-y-2 pt-2">
              {selectedInvoice.status !== 'Paid' ? (
                <button 
                  onClick={() => markPaid(selectedInvoice.id)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm"
                >
                  Mark Rent as Received
                </button>
              ) : (
                <div className="py-2 bg-emerald-50 text-emerald-800 text-center text-xs font-bold rounded-xl border border-emerald-200">
                  ✓ Rent Paid & Verified
                </div>
              )}

              <button 
                onClick={() => onNotify?.(`WhatsApp rent receipt & HRA invoice sent to ${selectedInvoice.residentName}`)}
                className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" /> Send WhatsApp Rent Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
