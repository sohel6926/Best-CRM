import React, { useState } from 'react';
import { 
  Plane, Globe, ShieldCheck, DollarSign, CheckCircle2, 
  FileText, Plus, Share2, PackageCheck, Printer
} from 'lucide-react';

interface NriPickleBox {
  id: string;
  exportInvoiceNo: string;
  nriCustomer: string;
  destinationCountry: 'United States (USA)' | 'United Kingdom (UK)' | 'United Arab Emirates (UAE)' | 'Canada' | 'Australia';
  destinationCity: string;
  jarsSelected: string;
  currency: 'USD ($)' | 'GBP (£)' | 'AED' | 'CAD ($)';
  invoiceAmount: number;
  vacuumBagSealTested: boolean;
  airlineBaggageSafe: boolean;
  status: 'In Transit / Flight' | 'Customs Cleared' | 'Delivered';
}

export const PickleExport: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [exportBoxes, setExportBoxes] = useState<NriPickleBox[]>([
    {
      id: 'nri-p-1',
      exportInvoiceNo: 'EXP-PCKL-2026-901',
      nriCustomer: 'Dr. Venkat Raghuveer',
      destinationCountry: 'United States (USA)',
      destinationCity: 'San Jose, California',
      jarsSelected: '3x 500g Mango Avakaya, 2x 500g Gongura, 1x 500g Chicken Pickle',
      currency: 'USD ($)',
      invoiceAmount: 115,
      vacuumBagSealTested: true,
      airlineBaggageSafe: true,
      status: 'In Transit / Flight'
    },
    {
      id: 'nri-p-2',
      exportInvoiceNo: 'EXP-PCKL-2026-902',
      nriCustomer: 'Sunitha Reddy',
      destinationCountry: 'United Kingdom (UK)',
      destinationCity: 'Manchester',
      jarsSelected: '2x 500g Mango Avakaya, 2x 500g Prawn Pickle',
      currency: 'GBP (£)',
      invoiceAmount: 72,
      vacuumBagSealTested: true,
      airlineBaggageSafe: true,
      status: 'Customs Cleared'
    },
    {
      id: 'nri-p-3',
      exportInvoiceNo: 'EXP-PCKL-2026-903',
      nriCustomer: 'Ramesh Naidu',
      destinationCountry: 'United Arab Emirates (UAE)',
      destinationCity: 'Dubai (Bur Dubai)',
      jarsSelected: '4x 500g Mango Avakaya PET Jars',
      currency: 'AED',
      invoiceAmount: 195,
      vacuumBagSealTested: true,
      airlineBaggageSafe: true,
      status: 'Delivered'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Plane className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">NRI Airline-Baggage Vacuum Packing & Global Air Cargo</h2>
            <p className="text-sm text-gray-500">Triple-layer leak-proof vacuum heat sealing for check-in baggage, customs commercial invoices & multi-currency billing</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("International Customs Food Declaration Invoice Printed!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <FileText className="w-4 h-4" /> Print Customs Bill
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Export Destinations</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">5 Countries</div>
          <div className="text-[11px] text-purple-600 mt-0.5">USA, UK, UAE, Canada, Australia</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Triple Vacuum Seal Integrity</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">100% Leak-Proof</div>
          <div className="text-[11px] text-emerald-600 font-medium">Flight cabin & baggage certified</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Customs Clearance Record</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">100% Passed</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Zero oil odor or confiscation</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Global Express Courier</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">DHL / FedEx</div>
          <div className="text-[11px] text-[#5B21B6] mt-0.5">Door delivery in 3-5 days</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Export Invoice No</th>
                <th className="py-3 px-4">NRI Customer & City</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Pickle Hamper Details</th>
                <th className="py-3 px-4 text-right">Invoice Value</th>
                <th className="py-3 px-4 text-center">Luggage Vacuum Seal</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {exportBoxes.map(b => (
                <tr key={b.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{b.exportInvoiceNo}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{b.nriCustomer}</div>
                    <div className="text-[10px] text-gray-400">{b.destinationCity}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                      {b.destinationCountry}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 max-w-xs">{b.jarsSelected}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-purple-950 text-sm">
                    {b.currency} {b.invoiceAmount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Triple Vacuumed
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      b.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      b.status === 'Customs Cleared' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Export invoice PDF printed for ${b.exportInvoiceNo}`)}
                      className="text-[#5B21B6] hover:underline font-bold text-xs"
                    >
                      Export PDF
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
