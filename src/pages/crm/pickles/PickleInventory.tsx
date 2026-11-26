import React, { useState } from 'react';
import { 
  Package, Printer, Search, Plus, AlertTriangle, 
  CheckCircle2, DollarSign, ShieldCheck, QrCode
} from 'lucide-react';

interface PickleSku {
  id: string;
  name: string;
  containerType: '300g Hex Glass Jar' | '500g Glass Jar' | '1kg Food-Grade PET Jar' | '5kg Catering Bucket';
  stockJars: number;
  minThreshold: number;
  retailMrp: number;
  wholesaleRate: number;
  inductionSealTested: boolean;
  barcode: string;
}

export const PickleInventory: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [inventory, setInventory] = useState<PickleSku[]>([
    { id: 'sku-1', name: 'Grandmother Mango Avakaya', containerType: '500g Glass Jar', stockJars: 380, minThreshold: 80, retailMrp: 295, wholesaleRate: 210, inductionSealTested: true, barcode: '890702144011' },
    { id: 'sku-2', name: 'Grandmother Mango Avakaya', containerType: '1kg Food-Grade PET Jar', stockJars: 240, minThreshold: 50, retailMrp: 540, wholesaleRate: 395, inductionSealTested: true, barcode: '890702144012' },
    { id: 'sku-3', name: 'Sour Gongura Pachadi (Pure Sesame Oil)', containerType: '300g Hex Glass Jar', stockJars: 190, minThreshold: 50, retailMrp: 185, wholesaleRate: 130, inductionSealTested: true, barcode: '890702144021' },
    { id: 'sku-4', name: 'Sour Gongura Pachadi (Pure Sesame Oil)', containerType: '500g Glass Jar', stockJars: 310, minThreshold: 70, retailMrp: 280, wholesaleRate: 195, inductionSealTested: true, barcode: '890702144022' },
    { id: 'sku-5', name: 'Boneless Chicken Pickle (Zero Water Fried)', containerType: '500g Glass Jar', stockJars: 160, minThreshold: 60, retailMrp: 550, wholesaleRate: 420, inductionSealTested: true, barcode: '890702144031' },
    { id: 'sku-6', name: 'Royal Prawn Pickle (Jumbo Tiger Prawns)', containerType: '500g Glass Jar', stockJars: 85, minThreshold: 40, retailMrp: 680, wholesaleRate: 510, inductionSealTested: true, barcode: '890702144041' },
    { id: 'sku-7', name: 'Country Garlic (Vellulli) Pickle', containerType: '300g Hex Glass Jar', stockJars: 220, minThreshold: 60, retailMrp: 210, wholesaleRate: 145, inductionSealTested: true, barcode: '890702144051' },
    { id: 'sku-8', name: 'Usirikaya (Whole Amla) Achar', containerType: '500g Glass Jar', stockJars: 45, minThreshold: 60, retailMrp: 260, wholesaleRate: 185, inductionSealTested: true, barcode: '890702144061' },
  ]);

  const totalJarsCount = inventory.reduce((sum, i) => sum + i.stockJars, 0);
  const totalStockMrpValue = inventory.reduce((sum, i) => sum + (i.stockJars * i.retailMrp), 0);

  const filtered = inventory.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.containerType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bottled Pickle SKU Inventory & Induction Seal Check</h2>
            <p className="text-sm text-gray-500">Track 300g glass jars, 500g dining jars, 1kg PET containers, tamper-evident induction seals & barcode labels</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Thermal Barcode Labels printed with Induction Seal Certification!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Barcode Labels
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Bottled Jars in Warehouse</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalJarsCount.toLocaleString()} <span className="text-xs font-normal text-gray-500">jars</span></div>
          <div className="text-[11px] text-purple-600 mt-0.5">Across 8 active retail SKUs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Warehouse Valuation</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{totalStockMrpValue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium">Retail MRP stock valuation</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Induction Seal Test Pass</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">100% Tested</div>
          <div className="text-[11px] text-emerald-600 font-medium">Zero courier leakage risk</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Low Stock Replenishment</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">1 SKU</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Amla Pickle below 60 jars</div>
        </div>
      </div>

      {/* SKUs Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Bottled Inventory Catalog ({inventory.length} SKUs)
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search pickle variety or jar size..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-purple-200 rounded-xl text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-600 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Pickle Variety</th>
                <th className="py-3 px-4">Bottle Format</th>
                <th className="py-3 px-4 text-center">In-Stock Jars</th>
                <th className="py-3 px-4 text-right">Retail MRP</th>
                <th className="py-3 px-4 text-right">B2B Wholesale</th>
                <th className="py-3 px-4 text-center">Induction Foil Seal</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(i => {
                const isLow = i.stockJars < i.minThreshold;
                return (
                  <tr key={i.id} className="hover:bg-purple-50/30 transition-all">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div>{i.name}</div>
                      <div className="text-[10px] text-gray-400 font-mono">Barcode: {i.barcode}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                        {i.containerType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-purple-950 text-sm">
                      {i.stockJars} jars
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{i.retailMrp}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#5B21B6]">₹{i.wholesaleRate}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Sealed
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        isLow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isLow ? 'Low Stock' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
