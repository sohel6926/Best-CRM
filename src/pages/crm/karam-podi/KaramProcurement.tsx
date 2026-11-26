import React, { useState } from 'react';
import { 
  ShoppingBag, Truck, MapPin, DollarSign, CheckCircle2, 
  Plus, Search, AlertCircle, TrendingUp
} from 'lucide-react';

interface RawSpice {
  id: string;
  name: string;
  sourcingOrigin: string;
  grade: string;
  availableStockKg: number;
  minThresholdKg: number;
  lastPurchaseRatePerKg: number;
  primaryVendor: string;
  vendorPhone: string;
}

export const KaramProcurement: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [spices, setSpices] = useState<RawSpice[]>([
    { id: 'sp-1', name: 'Guntur Teja S17 Red Chilis (Stemless)', sourcingOrigin: 'Guntur Mirchi Yard, AP', grade: 'Grade A Export', availableStockKg: 420, minThresholdKg: 150, lastPurchaseRatePerKg: 240, primaryVendor: 'Guntur Agro Spice Traders', vendorPhone: '+91 98480 33412' },
    { id: 'sp-2', name: 'Byadgi KDL Chilis (Deep Natural Red Color)', sourcingOrigin: 'Byadgi APMC Yard, Karnataka', grade: 'Special Wrinkled', availableStockKg: 280, minThresholdKg: 100, lastPurchaseRatePerKg: 380, primaryVendor: 'Malaprabha Spices Hub', vendorPhone: '+91 98221 78901' },
    { id: 'sp-3', name: 'Desi Toor Dal (Unpolished Kandulu)', sourcingOrigin: 'Tandur Mandi, Telangana', grade: 'GI Tagged Organic', availableStockKg: 650, minThresholdKg: 200, lastPurchaseRatePerKg: 145, primaryVendor: 'Tandur Dal Mill Cooperative', vendorPhone: '+91 94401 11209' },
    { id: 'sp-4', name: 'Whole Garlic Pods (Peeled Desi Vellulli)', sourcingOrigin: 'Indore Mandi, MP', grade: 'Firm Bulbs', availableStockKg: 180, minThresholdKg: 80, lastPurchaseRatePerKg: 190, primaryVendor: 'Malwa Garlic Suppliers', vendorPhone: '+91 98902 44321' },
    { id: 'sp-5', name: 'Black Sesame Seeds (Nalla Nuvvulu)', sourcingOrigin: 'Adilabad, Telangana', grade: 'Natural Organic', availableStockKg: 120, minThresholdKg: 50, lastPurchaseRatePerKg: 220, primaryVendor: 'Adilabad Agro Produce', vendorPhone: '+91 97650 99812' },
    { id: 'sp-6', name: 'Fresh Dehydrated Curry Leaves', sourcingOrigin: 'Cumbum Valley, Tamil Nadu', grade: 'Shadow Dried Aromatic', availableStockKg: 90, minThresholdKg: 40, lastPurchaseRatePerKg: 310, primaryVendor: 'Green Heritage Organics', vendorPhone: '+91 94140 12891' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const totalStockKg = spices.reduce((sum, s) => sum + s.availableStockKg, 0);

  const filtered = spices.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sourcingOrigin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Raw Mandi Spice Procurement & Sourcing Hub</h2>
            <p className="text-sm text-gray-500">Bulk procurement from Guntur & Byadgi chili mandis, Tandur GI toor dal, and organic garlic mills</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Mandi Purchase Order PO-PODI-2026-08 sent via WhatsApp to Guntur Traders!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Issue Mandi Purchase Order
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Raw Spices In Godown</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalStockKg.toLocaleString()} <span className="text-xs font-normal text-gray-500">kg</span></div>
          <div className="text-[11px] text-purple-600 mt-0.5">Enough for 18 days production</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Guntur Chili Market Rate</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹240 <span className="text-xs font-normal text-gray-500">/ kg</span></div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">-₹15/kg vs last month crop</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Byadgi Color Chili Stock</div>
          <div className="text-2xl font-bold text-rose-700 mt-1">280 kg</div>
          <div className="text-[11px] text-gray-500 mt-0.5">High oleoresin natural red color</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Tandur GI Toor Dal</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">650 kg</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">High-protein unpolished</div>
        </div>
      </div>

      {/* Procurement Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Raw Agricultural Ingredients & Mandi Directory
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search spice or mandi origin..."
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
                <th className="py-3 px-4">Raw Ingredient & Grade</th>
                <th className="py-3 px-4">Mandi Origin</th>
                <th className="py-3 px-4 text-center">Godown Stock</th>
                <th className="py-3 px-4 text-right">Latest Mandi Rate</th>
                <th className="py-3 px-4">Primary Sourcing Vendor</th>
                <th className="py-3 px-4 text-right">Procure Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{s.name}</div>
                    <span className="text-[10px] text-gray-400 font-normal">{s.grade}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5B21B6]" />
                    <span>{s.sourcingOrigin}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-950 text-sm">
                    {s.availableStockKg} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                    ₹{s.lastPurchaseRatePerKg} / kg
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <div className="font-semibold">{s.primaryVendor}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{s.vendorPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`WhatsApp PO sent to ${s.primaryVendor}`)}
                      className="text-[#5B21B6] hover:underline font-bold text-xs"
                    >
                      Order Bag
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
