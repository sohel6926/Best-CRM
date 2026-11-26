import React, { useState } from 'react';
import { 
  Plane, Globe, ShieldCheck, DollarSign, CheckCircle2, 
  FileText, Plus, Share2, PackageCheck, Printer
} from 'lucide-react';

interface NriOrder {
  id: string;
  exportInvoiceNo: string;
  nriClientName: string;
  destinationCountry: 'United States (USA)' | 'United Kingdom (UK)' | 'United Arab Emirates (UAE)' | 'Canada' | 'Australia';
  destinationCity: string;
  hamperContents: string;
  currency: 'USD ($)' | 'GBP (£)' | 'AED' | 'CAD ($)';
  invoiceValue: number;
  vacuumPackVerified: boolean;
  customsCleared: boolean;
  courierTracking: string;
  status: 'In Flight / Transit' | 'Customs Cleared' | 'Delivered';
}

export const KaramExport: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [nriOrders, setNriOrders] = useState<NriOrder[]>([
    {
      id: 'nri-1',
      exportInvoiceNo: 'EXP-PODI-2026-441',
      nriClientName: 'Srinivas Gutta',
      destinationCountry: 'United States (USA)',
      destinationCity: 'Dallas, Texas',
      hamperContents: 'Grand Andhra NRI Combo (6x 250g Podis + 2x Pickles + Pure Desi Ghee)',
      currency: 'USD ($)',
      invoiceValue: 88,
      vacuumPackVerified: true,
      customsCleared: true,
      courierTracking: 'DHL-EXPRESS-992140',
      status: 'In Flight / Transit'
    },
    {
      id: 'nri-2',
      exportInvoiceNo: 'EXP-PODI-2026-442',
      nriClientName: 'Madhavi Latha',
      destinationCountry: 'United Kingdom (UK)',
      destinationCity: 'London, Wembley',
      hamperContents: 'Traditional Tiffin Podi Box (4x 250g Idli Karam & Kandi Podi)',
      currency: 'GBP (£)',
      invoiceValue: 55,
      vacuumPackVerified: true,
      customsCleared: true,
      courierTracking: 'FEDEX-UK-881204',
      status: 'Customs Cleared'
    },
    {
      id: 'nri-3',
      exportInvoiceNo: 'EXP-PODI-2026-443',
      nriClientName: 'Ravi Teja Varma',
      destinationCountry: 'United Arab Emirates (UAE)',
      destinationCity: 'Dubai (Al Karama)',
      hamperContents: 'Spicy Garlic Podi & Black Sesame Podi 1kg Bulk Pack',
      currency: 'AED',
      invoiceValue: 180,
      vacuumPackVerified: true,
      customsCleared: true,
      courierTracking: 'ARAMEX-DXB-331092',
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
            <h2 className="text-xl font-bold text-gray-900">NRI Global Export & International Gifting Suite</h2>
            <p className="text-sm text-gray-500">Air-tight baggage vacuum sealing, customs commercial invoices, phytosanitary certificates & multi-currency billing (USD, GBP, AED)</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Customs Commercial Invoice & Phytosanitary Certificate Generated!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <FileText className="w-4 h-4" /> Generate Export Customs Bill
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Export Destination Countries</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">5 Nations</div>
          <div className="text-[11px] text-purple-600 mt-0.5">USA, UK, UAE, Canada, Australia</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Vacuum Sealing Quality</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">100% Leakproof</div>
          <div className="text-[11px] text-emerald-600 font-medium">Flight baggage certified</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Customs Clearance Success</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">99.8% Cleared</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Zero spice confiscations</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">International Courier Partners</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">DHL / FedEx</div>
          <div className="text-[11px] text-[#5B21B6] mt-0.5">3-5 day door delivery globally</div>
        </div>
      </div>

      {/* NRI Orders Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Export Invoice No</th>
                <th className="py-3 px-4">NRI Customer & City</th>
                <th className="py-3 px-4">Destination Country</th>
                <th className="py-3 px-4">Spice Hamper Pack</th>
                <th className="py-3 px-4 text-right">Invoice Value</th>
                <th className="py-3 px-4 text-center">Baggage Vacuum Seal</th>
                <th className="py-3 px-4 text-center">Export Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {nriOrders.map(n => (
                <tr key={n.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">{n.exportInvoiceNo}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{n.nriClientName}</div>
                    <div className="text-[10px] text-gray-400">{n.destinationCity}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                      {n.destinationCountry}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 max-w-xs">{n.hamperContents}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-purple-950 text-sm">
                    {n.currency} {n.invoiceValue}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Sealed
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      n.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      n.status === 'Customs Cleared' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {n.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Customs Declaration PDF printed for ${n.exportInvoiceNo}`)}
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
