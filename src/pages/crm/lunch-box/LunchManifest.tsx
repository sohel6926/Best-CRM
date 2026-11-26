import React, { useState } from 'react';
import { 
  Utensils, Clock, CheckCircle2, AlertTriangle, Printer, 
  Flame, Sparkles, ChefHat, RefreshCw, Send, Check
} from 'lucide-react';

interface MealCategory {
  name: string;
  count: number;
  rotiCount: number;
  riceLiters: number;
  status: 'Ready' | 'Cooking' | 'Packing';
}

export const LunchManifest: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [lockedAt] = useState('09:00 AM (Locked for Kitchen Dispatch)');
  const [categories, setCategories] = useState<MealCategory[]>([
    { name: 'Executive Veg Deluxe (3 Roti + Paneer + Dal + Rice + Curd)', count: 96, rotiCount: 288, riceLiters: 24, status: 'Packing' },
    { name: 'Homestyle Veg Mini (2 Roti + Sabzi + Dal + Rice)', count: 64, rotiCount: 128, riceLiters: 16, status: 'Packing' },
    { name: 'Non-Veg Special (Chicken Curry + 2 Phulkas + Jeera Rice)', count: 52, rotiCount: 104, riceLiters: 15, status: 'Cooking' },
    { name: 'High-Protein Fitness Bowl (Grilled Paneer/Egg + Quinoa/Brown Rice)', count: 28, rotiCount: 0, riceLiters: 7, status: 'Ready' },
    { name: 'Millet / Diabetic Care Thali (Jowar Roti + Methi Dal + Salad)', count: 22, rotiCount: 44, riceLiters: 5, status: 'Cooking' },
  ]);

  const totalMeals = categories.reduce((sum, c) => sum + c.count, 0);
  const totalRotis = categories.reduce((sum, c) => sum + c.rotiCount, 0);
  const totalRiceLiters = categories.reduce((sum, c) => sum + c.riceLiters, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-200">
              Cut-Off Passed • Kitchen Active
            </span>
            <span className="text-xs text-gray-500 font-medium">Cutoff: {lockedAt}</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-1">Daily Kitchen Production Manifest</h2>
          <p className="text-xs text-[#64748B]">
            Automated meal splits, roti counters, and chef portioning sheets for lunch delivery corridors.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Kitchen portioning manifest sent to Master Chef tablet!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <ChefHat className="h-3.5 w-3.5" />
            <span>Send to Chef Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold transition cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Packed Lunches</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">{totalMeals} Boxes</p>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> 100% orders locked
          </span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Fresh Phulkas</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{totalRotis} Rotis</p>
          <span className="text-[11px] text-gray-500 font-medium mt-1 block">
            520 Wheat + 44 Jowar Rotis
          </span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Rice & Gravy Volume</span>
          <p className="text-2xl font-black text-[#1E1B4B] mt-1">{totalRiceLiters} Liters</p>
          <span className="text-[11px] text-blue-600 font-medium mt-1 block">
            Deg #1: Sona Masoori • Deg #2: Jeera
          </span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kitchen Status</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">82% Packed</p>
          <span className="text-[11px] text-gray-500 font-medium mt-1 block">
            Rider dispatch at 11:15 AM
          </span>
        </div>
      </div>

      {/* Production Breakdown Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Live Station-Wise Prep & Bagging Status</h3>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
            Batch #LBX-2026-0304
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Meal Tier & Configuration</th>
                <th className="p-3 font-bold text-right">Meal Boxes</th>
                <th className="p-3 font-bold text-right">Roti Counter</th>
                <th className="p-3 font-bold text-right">Rice / Gravy</th>
                <th className="p-3 font-bold text-center">Packaging Type</th>
                <th className="p-3 font-bold text-center">Kitchen Stage</th>
                <th className="p-3 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-bold text-[#1E1B4B]">{c.name}</td>
                  <td className="p-3 text-right font-extrabold text-[#5B21B6] tabular-nums text-sm">{c.count}</td>
                  <td className="p-3 text-right font-semibold text-amber-700 tabular-nums">{c.rotiCount}</td>
                  <td className="p-3 text-right text-gray-600 tabular-nums">{c.riceLiters} L</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                      Sugarcane Bagasse 5-CP
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      c.status === 'Ready' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : c.status === 'Packing' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => onNotify?.(`Verified ${c.name} station counts!`)}
                      className="text-[11px] font-bold text-[#5B21B6] hover:underline cursor-pointer"
                    >
                      Verify Station
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Special Chef Instructions & Quality Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold">
            <AlertTriangle className="h-4 w-4" />
            <span>Special Diet / Allergy Alerts Today (8 Boxes)</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
            <li><strong>Box #LB-104 (Rahul Sharma):</strong> Strict Jain preparation - No Onion, No Garlic, Extra Paneer.</li>
            <li><strong>Box #LB-188 (Pooja K):</strong> Gluten-free requested - Double Jowar Rotis, zero wheat flour contact.</li>
            <li><strong>Box #LB-212 (Vikram Rao):</strong> Low salt & spice - Doctor prescribed cardiac diet.</li>
          </ul>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#5B21B6] font-extrabold">
            <Sparkles className="h-4 w-4" />
            <span>Kitchen Packaging Checklist</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 font-medium">
            <li>Ensure hot gravy temperature is verified &gt; 65°C before sealing.</li>
            <li>Include fresh green mint chutney and mouth freshener pouch in every corporate box.</li>
            <li>Paste color-coded sticker: <strong>Green = Veg</strong>, <strong>Red = Non-Veg</strong>, <strong>Purple = Special Diet</strong>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
