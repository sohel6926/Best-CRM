import React, { useState } from 'react';
import { 
  Package, Printer, QrCode, Search, Plus, 
  AlertTriangle, CheckCircle2, ArrowRight, DollarSign
} from 'lucide-react';

interface PodiSku {
  id: string;
  podiName: string;
  packSize: '100g Pouch' | '250g Zipper Foil' | '500g Jar' | '1kg Food-Grade Bucket';
  stockUnits: number;
  minThreshold: number;
  mrp: number;
  wholesaleRate: number;
  barcode: string;
  shelfLifeMonths: number;
}

export const KaramInventory: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [skus, setSkus] = useState<PodiSku[]>([
    { id: 'sku-1', podiName: 'Kandi Podi (Gunpowder)', packSize: '100g Pouch', stockUnits: 450, minThreshold: 100, mrp: 85, wholesaleRate: 58, barcode: '890601248011', shelfLifeMonths: 9 },
    { id: 'sku-2', podiName: 'Kandi Podi (Gunpowder)', packSize: '250g Zipper Foil', stockUnits: 320, minThreshold: 80, mrp: 195, wholesaleRate: 135, barcode: '890601248012', shelfLifeMonths: 9 },
    { id: 'sku-3', podiName: 'Kandi Podi (Gunpowder)', packSize: '1kg Food-Grade Bucket', stockUnits: 45, minThreshold: 15, mrp: 680, wholesaleRate: 490, barcode: '890601248013', shelfLifeMonths: 9 },
    { id: 'sku-4', podiName: 'Vellulli (Garlic) Karam', packSize: '100g Pouch', stockUnits: 380, minThreshold: 80, mrp: 95, wholesaleRate: 65, barcode: '890601248021', shelfLifeMonths: 9 },
    { id: 'sku-5', podiName: 'Vellulli (Garlic) Karam', packSize: '250g Zipper Foil', stockUnits: 210, minThreshold: 60, mrp: 215, wholesaleRate: 150, barcode: '890601248022', shelfLifeMonths: 9 },
    { id: 'sku-6', podiName: 'Idli / Dosa Karam Podi', packSize: '250g Zipper Foil', stockUnits: 410, minThreshold: 100, mrp: 180, wholesaleRate: 125, barcode: '890601248031', shelfLifeMonths: 9 },
    { id: 'sku-7', podiName: 'Karivepaku (Curry Leaf) Podi', packSize: '100g Pouch', stockUnits: 190, minThreshold: 50, mrp: 95, wholesaleRate: 65, barcode: '890601248041', shelfLifeMonths: 9 },
    { id: 'sku-8', podiName: 'Nalla Karam Podi (Black Sesame)', packSize: '100g Pouch', stockUnits: 65, minThreshold: 75, mrp: 110, wholesaleRate: 75, barcode: '890601248051', shelfLifeMonths: 9 },
  ]);

  const totalFinishedPouches = skus.reduce((sum, s) => sum + s.stockUnits, 0);
  const totalStockRetailValue = skus.reduce((sum, s) => sum + (s.stockUnits * s.mrp), 0);

  const filtered = skus.filter(s => 
    s.podiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.packSize.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="text-xl font-bold text-gray-900">Packaged Podi Inventory & Barcode Labels</h2>
            <p className="text-sm text-gray-500">Grammage stock counting (100g, 250g, 500g, 1kg), thermal barcode sticker printer & FSSAI batch details</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Thermal Barcode Label Roll Printed with FSSAI License & Expiry!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Barcode Labels
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Packaged Pouches</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalFinishedPouches.toLocaleString()} <span className="text-xs font-normal text-gray-500">units</span></div>
          <div className="text-[11px] text-purple-600 mt-0.5">Across 8 active SKUs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Warehouse Valuation</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{totalStockRetailValue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium">Retail MRP inventory worth</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Nitrogen-Flushed Foil Pouches</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">9 Months</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Zero preservative aroma lock</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Reorder Warning Alerts</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">1 SKU</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Nalla Karam below 75 units</div>
        </div>
      </div>

      {/* SKUs Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Finished Goods Master Catalog ({skus.length} SKUs)
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search podi flavor or pack size..."
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
                <th className="py-3 px-4">Podi Flavor & Variety</th>
                <th className="py-3 px-4">Grammage Pack Size</th>
                <th className="py-3 px-4 text-center">Available Stock</th>
                <th className="py-3 px-4 text-right">Retail MRP</th>
                <th className="py-3 px-4 text-right">B2B Wholesale Rate</th>
                <th className="py-3 px-4">Barcode / EAN-13</th>
                <th className="py-3 px-4 text-center">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(s => {
                const isLow = s.stockUnits < s.minThreshold;
                return (
                  <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{s.podiName}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                        {s.packSize}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-purple-950 text-sm">
                      {s.stockUnits} <span className="text-xs font-normal text-gray-400">pouches</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{s.mrp}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#5B21B6]">₹{s.wholesaleRate}</td>
                    <td className="py-3.5 px-4 font-mono text-gray-500 text-[10px]">{s.barcode}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        isLow ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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
