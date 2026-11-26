import React, { useState } from 'react';
import { 
  ShoppingBag, Truck, MapPin, DollarSign, CheckCircle2, 
  Plus, Search, AlertCircle, TrendingUp, Droplets
} from 'lucide-react';

interface HarvestBatch {
  id: string;
  cropName: string;
  mandiSource: string;
  varietySpec: string;
  procuredWeightKg: number;
  ratePerKg: number;
  firmnessAcidityScore: string;
  vendorName: string;
  vendorPhone: string;
  purchaseDate: string;
}

export const PickleProcurement: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [procurements, setProcurements] = useState<HarvestBatch[]>([
    {
      id: 'harv-1',
      cropName: 'Raw Sour Mangoes (Kachha Aam)',
      mandiSource: 'Nuzvid Mango Orchards, AP',
      varietySpec: 'Pedda Rasalu & Collector (High Acidity, Firm Kernel)',
      procuredWeightKg: 1200,
      ratePerKg: 42,
      firmnessAcidityScore: '9.4 / 10 (Peak Firmness)',
      vendorName: 'Nuzvid Mango Farmers Syndicate',
      vendorPhone: '+91 98480 11209',
      purchaseDate: '20 Nov 2026'
    },
    {
      id: 'harv-2',
      cropName: 'Wood-Pressed Gingelly (Sesame) Oil',
      mandiSource: 'Tenali Oil Mills, AP',
      varietySpec: '100% Cold-Pressed Unrefined Sesame',
      procuredWeightKg: 450,
      ratePerKg: 340,
      firmnessAcidityScore: 'Pure Cold-Pressed Virgin',
      vendorName: 'Tenali Pure Oil Traders',
      vendorPhone: '+91 98210 55412',
      purchaseDate: '22 Nov 2026'
    },
    {
      id: 'harv-3',
      cropName: 'Fresh Gongura (Red Sorrel Leaves)',
      mandiSource: 'Guntur Rural Farms, AP',
      varietySpec: 'Red Stem High-Tang Gongura',
      procuredWeightKg: 300,
      ratePerKg: 35,
      firmnessAcidityScore: 'Sun-Dehydrated (Zero Moisture)',
      vendorName: 'Guntur Green Leaf Cooperative',
      vendorPhone: '+91 97112 00418',
      purchaseDate: '24 Nov 2026'
    },
    {
      id: 'harv-4',
      cropName: 'Kashmiri & Guntur Red Chili Powder (Aava Mix)',
      mandiSource: 'Guntur APMC Yard, AP',
      varietySpec: 'Special Stemless Bright Red Chili Powder',
      procuredWeightKg: 250,
      ratePerKg: 280,
      firmnessAcidityScore: 'Pungency Level: High (SHU 40,000)',
      vendorName: 'Guntur Spices Syndicate',
      vendorPhone: '+91 94401 88921',
      purchaseDate: '25 Nov 2026'
    }
  ]);

  const totalRawWeight = procurements.reduce((sum, p) => sum + p.procuredWeightKg, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Raw Harvest Procurement & Farmgate Mandi Hub</h2>
            <p className="text-sm text-gray-500">Seasonal raw mangoes from Nuzvid, cold-pressed gingelly oil from Tenali, and red-stem Gongura leaves</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Farmgate Mandi Purchase Order PO-PICKLE-2026-11 Issued!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Issue Mandi Purchase Order
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Raw Materials In Godown</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalRawWeight.toLocaleString()} <span className="text-xs font-normal text-gray-500">kg</span></div>
          <div className="text-[11px] text-purple-600 mt-0.5">Mangoes, oils & gongura stock</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Wood-Pressed Gingelly Oil</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">450 Litres</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">100% Unrefined Tenali Mills</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Raw Mango Firmness Quality</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">9.4 / 10</div>
          <div className="text-[11px] text-emerald-600 font-medium">Hard kernel, zero fiber pulp</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Direct Farmgate Sourcing</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">4 Cooperatives</div>
          <div className="text-[11px] text-gray-500 mt-0.5">100% Pesticide residue tested</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Raw Ingredient</th>
                <th className="py-3 px-4">Farmgate Mandi Origin</th>
                <th className="py-3 px-4 text-center">Batch Weight</th>
                <th className="py-3 px-4 text-right">Mandi Rate</th>
                <th className="py-3 px-4">Quality & Acidity Index</th>
                <th className="py-3 px-4">Farmer Syndicate Vendor</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {procurements.map(p => (
                <tr key={p.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{p.cropName}</div>
                    <div className="text-[10px] text-gray-400">{p.varietySpec}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5B21B6]" />
                    <span>{p.mandiSource}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-950 text-sm">
                    {p.procuredWeightKg} kg
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                    ₹{p.ratePerKg} / kg
                  </td>
                  <td className="py-3.5 px-4 text-emerald-800 font-semibold">{p.firmnessAcidityScore}</td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <div>{p.vendorName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{p.vendorPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Procurement Invoice printed for ${p.cropName}`)}
                      className="text-[#5B21B6] hover:underline font-bold text-xs"
                    >
                      Mandi Bill
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
