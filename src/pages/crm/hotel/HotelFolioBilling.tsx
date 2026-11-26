import React, { useState } from 'react';
import { 
  FileText, QrCode, CreditCard, Share2, Printer, 
  CheckCircle2, Clock, Split, Building2, DollarSign
} from 'lucide-react';

interface Folio {
  id: string;
  folioNumber: string;
  roomNumber: string;
  guestName: string;
  corporateCompany?: string;
  corporateGstin?: string;
  nightsStayed: number;
  roomTariffTotal: number;
  restaurantDiningTotal: number;
  laundryAndCabTotal: number;
  advanceDepositPaid: number;
  gstRate: number; // 12% for rooms <= 7500, 18% for > 7500
  paymentStatus: 'Pending Checkout' | 'Settled & Paid';
}

export const HotelFolioBilling: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [folios, setFolios] = useState<Folio[]>([
    {
      id: 'fol-101',
      folioNumber: 'FOL-2026-101',
      roomNumber: 'Suite 101',
      guestName: 'Dr. Vikramaditya Varma',
      corporateCompany: 'AIIMS Healthcare Pvt Ltd',
      corporateGstin: '36AAACA1234F1Z5',
      nightsStayed: 4,
      roomTariffTotal: 22000,
      restaurantDiningTotal: 3450,
      laundryAndCabTotal: 1800,
      advanceDepositPaid: 10000,
      gstRate: 12,
      paymentStatus: 'Pending Checkout'
    },
    {
      id: 'fol-201',
      folioNumber: 'FOL-2026-201',
      roomNumber: 'Room 201',
      guestName: 'Michael Henderson',
      corporateCompany: 'Deloitte Global Consulting',
      corporateGstin: '27AABCD9982E1Z8',
      nightsStayed: 7,
      roomTariffTotal: 32200,
      restaurantDiningTotal: 4800,
      laundryAndCabTotal: 2500,
      advanceDepositPaid: 20000,
      gstRate: 12,
      paymentStatus: 'Pending Checkout'
    }
  ]);

  const [selectedFolio, setSelectedFolio] = useState<Folio>(folios[0]);

  const subtotal = selectedFolio.roomTariffTotal + selectedFolio.restaurantDiningTotal + selectedFolio.laundryAndCabTotal;
  const gstAmount = Math.round((subtotal * selectedFolio.gstRate) / 100);
  const grossPayable = subtotal + gstAmount;
  const balanceDue = grossPayable - selectedFolio.advanceDepositPaid;

  const settleCheckout = (id: string) => {
    setFolios(prev => 
      prev.map(f => f.id === id ? { ...f, paymentStatus: 'Settled & Paid' } : f)
    );
    onNotify?.("Checkout settled & GST Tax Invoice dispatched via WhatsApp & Email!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Master Folio Billing & Corporate B2B GST Invoices</h2>
            <p className="text-sm text-gray-500">Consolidate room tariff, dining, laundry & cabs; split corporate company bills for GST input credit</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Corporate Split Folio (Company vs Guest Extras) Generated!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Split className="w-4 h-4" /> Split Corporate Folio
        </button>
      </div>

      {/* Main Billing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: In-House Folios */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Active Room Folios Awaiting Checkout
            </h3>

            <div className="space-y-3">
              {folios.map(f => (
                <div 
                  key={f.id}
                  onClick={() => setSelectedFolio(f)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedFolio.id === f.id 
                      ? 'border-[#5B21B6] bg-purple-50/40 shadow-xs ring-1 ring-[#5B21B6]' 
                      : 'border-purple-100 bg-white hover:border-purple-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#5B21B6]">{f.folioNumber}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900">
                          {f.roomNumber}
                        </span>
                        <span className="text-sm font-bold text-gray-900">{f.guestName}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Corporate: <span className="font-semibold text-gray-800">{f.corporateCompany}</span> (GSTIN: {f.corporateGstin})
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-purple-950">
                        ₹{(f.roomTariffTotal + f.restaurantDiningTotal + f.laundryAndCabTotal - f.advanceDepositPaid).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-400">Balance Pending</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live Tax Invoice Preview & UPI QR */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-purple-100">
              <span className="text-xs font-bold uppercase text-[#5B21B6]">GST Tax Invoice (SAC 9963)</span>
              <span className="text-xs font-mono text-gray-400">{selectedFolio.folioNumber}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Guest:</span>
                <span className="font-bold text-gray-900">{selectedFolio.guestName}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Room Charges ({selectedFolio.nightsStayed} nights):</span>
                <span className="font-semibold text-gray-900">₹{selectedFolio.roomTariffTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>In-Room Dining POS:</span>
                <span className="font-semibold text-gray-900">₹{selectedFolio.restaurantDiningTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Laundry & Airport Cab:</span>
                <span className="font-semibold text-gray-900">₹{selectedFolio.laundryAndCabTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>CGST ({selectedFolio.gstRate / 2}%):</span>
                <span>₹{Math.round(gstAmount / 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>SGST ({selectedFolio.gstRate / 2}%):</span>
                <span>₹{Math.round(gstAmount / 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Advance Paid at Check-In:</span>
                <span>- ₹{selectedFolio.advanceDepositPaid.toLocaleString()}</span>
              </div>

              <div className="pt-2 border-t border-purple-100 flex justify-between font-bold text-sm text-purple-950">
                <span>Net Balance Due:</span>
                <span className="text-lg text-[#5B21B6]">₹{balanceDue.toLocaleString()}</span>
              </div>
            </div>

            {/* UPI QR Payment Block */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center space-y-2">
              <div className="w-24 h-24 mx-auto bg-white p-2 rounded-lg border border-purple-200 flex items-center justify-center">
                <QrCode className="w-20 h-20 text-[#5B21B6]" />
              </div>
              <div className="text-[11px] text-gray-600">Scan via GPay / PhonePe / Paytm / Card</div>
              <div className="text-xs font-bold text-[#5B21B6] font-mono">hotelgrand@hdfcbank</div>
            </div>

            <div className="space-y-2 pt-2">
              {selectedFolio.paymentStatus !== 'Settled & Paid' ? (
                <button 
                  onClick={() => settleCheckout(selectedFolio.id)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Settle & Express Checkout
                </button>
              ) : (
                <div className="py-2 bg-emerald-50 text-emerald-800 text-center text-xs font-bold rounded-xl border border-emerald-200">
                  ✓ Folio Fully Settled & Key Returned
                </div>
              )}

              <button 
                onClick={() => onNotify?.(`Printed Corporate GST Tax Invoice for ${selectedFolio.guestName}`)}
                className="w-full py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" /> Print GST Tax Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
