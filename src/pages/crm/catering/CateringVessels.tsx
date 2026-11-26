import React, { useState } from 'react';
import { 
  Truck, CheckSquare, Square, AlertCircle, Plus, 
  RotateCcw, ShieldCheck, Printer, ClipboardCheck, ArrowRight
} from 'lucide-react';

interface VesselItem {
  id: string;
  name: string;
  type: 'Heavy Degs / Handis' | 'Buffet Chafing Warmers' | 'Crockery & Melamine' | 'Cutlery & Spoons' | 'Beverage Dispensers' | 'Tandoor & Bhatti';
  totalOwned: number;
  dispatchedQty: number;
  returnedQty: number;
  damagedOrMissing: number;
  unitReplacementCost: number;
}

export const CateringVessels: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTruck, setSelectedTruck] = useState('Tata 407 (MH 12 QX 4821) - Venue: Grand Leela Palace');

  const [vessels, setVessels] = useState<VesselItem[]>([
    { id: 'v-1', name: 'Giant Copper Biryani Deg (60kg cap)', type: 'Heavy Degs / Handis', totalOwned: 12, dispatchedQty: 4, returnedQty: 4, damagedOrMissing: 0, unitReplacementCost: 14000 },
    { id: 'v-2', name: 'Stainless Steel Handi with Lid (30L)', type: 'Heavy Degs / Handis', totalOwned: 20, dispatchedQty: 8, returnedQty: 8, damagedOrMissing: 0, unitReplacementCost: 3500 },
    { id: 'v-3', name: 'Brass Royal Chafing Dish (Roll-top)', type: 'Buffet Chafing Warmers', totalOwned: 25, dispatchedQty: 12, returnedQty: 11, damagedOrMissing: 1, unitReplacementCost: 4800 },
    { id: 'v-4', name: 'Rectangular SS Food Warmer', type: 'Buffet Chafing Warmers', totalOwned: 30, dispatchedQty: 16, returnedQty: 16, damagedOrMissing: 0, unitReplacementCost: 2600 },
    { id: 'v-5', name: 'Ceramic Bone-China Dinner Plates', type: 'Crockery & Melamine', totalOwned: 800, dispatchedQty: 650, returnedQty: 638, damagedOrMissing: 12, unitReplacementCost: 180 },
    { id: 'v-6', name: 'Melamine Snack Quarter Plates', type: 'Crockery & Melamine', totalOwned: 600, dispatchedQty: 450, returnedQty: 445, damagedOrMissing: 5, unitReplacementCost: 85 },
    { id: 'v-7', name: 'Heavy Gauge Stainless Steel Spoons & Forks', type: 'Cutlery & Spoons', totalOwned: 1200, dispatchedQty: 800, returnedQty: 785, damagedOrMissing: 15, unitReplacementCost: 40 },
    { id: 'v-8', name: 'Double Wall Juice & Mocktail Dispenser (15L)', type: 'Beverage Dispensers', totalOwned: 8, dispatchedQty: 4, returnedQty: 4, damagedOrMissing: 0, unitReplacementCost: 3200 },
    { id: 'v-9', name: 'Heavy Cast Iron Tandoor Bhatti on Wheels', type: 'Tandoor & Bhatti', totalOwned: 4, dispatchedQty: 2, returnedQty: 2, damagedOrMissing: 0, unitReplacementCost: 18500 },
  ]);

  const updateReturned = (id: string, delta: number) => {
    setVessels(prev => 
      prev.map(it => {
        if (it.id !== id) return it;
        const newReturned = Math.min(it.dispatchedQty, Math.max(0, it.returnedQty + delta));
        const missing = it.dispatchedQty - newReturned;
        return { ...it, returnedQty: newReturned, damagedOrMissing: missing };
      })
    );
  };

  const totalDispatched = vessels.reduce((acc, c) => acc + c.dispatchedQty, 0);
  const totalReturned = vessels.reduce((acc, c) => acc + c.returnedQty, 0);
  const totalMissing = vessels.reduce((acc, c) => acc + c.damagedOrMissing, 0);
  const totalDamageLossValue = vessels.reduce((acc, c) => acc + (c.damagedOrMissing * c.unitReplacementCost), 0);

  const filtered = activeFilter === 'All' 
    ? vessels 
    : vessels.filter(v => v.type === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Vessels, Chafing Dishes & Truck Loading Sheet</h2>
            <p className="text-sm text-gray-500">Prevent utensil theft, track loading gate-passes, and audit missing crockery upon return</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onNotify?.("Truck Loading Gate-Pass Printed!")}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" /> Print Loading Gate-Pass
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Dispatched Utensils</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{totalDispatched} <span className="text-xs font-normal text-gray-500">units</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Loaded on {selectedTruck.split(' - ')[0]}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Safely Received Back</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{totalReturned} <span className="text-xs font-normal text-gray-500">units</span></div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">{Math.round((totalReturned / totalDispatched) * 100)}% verified in godown</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Missing / Broken Items</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{totalMissing} <span className="text-xs font-normal text-gray-500">units</span></div>
          <div className="text-[11px] text-red-500 mt-0.5">Plates & roll-top chafers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Damage Deduction Value</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalDamageLossValue.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Deductible from security deposit</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <div className="flex flex-wrap gap-2">
            {['All', 'Heavy Degs / Handis', 'Buffet Chafing Warmers', 'Crockery & Melamine', 'Cutlery & Spoons'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeFilter === cat ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-500 font-medium">
            Active Tempo: <span className="text-purple-900 font-bold">{selectedTruck}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Item & Specification</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">In Godown</th>
                <th className="py-3 px-4 text-center">Dispatched</th>
                <th className="py-3 px-4 text-center">Returned Count</th>
                <th className="py-3 px-4 text-center">Missing / Damaged</th>
                <th className="py-3 px-4 text-right">Lost Value</th>
                <th className="py-3 px-4 text-right">Return Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{v.name}</td>
                  <td className="py-3.5 px-4 text-gray-500">{v.type}</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-gray-600">{v.totalOwned}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-900">{v.dispatchedQty}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-700">{v.returnedQty}</td>
                  <td className="py-3.5 px-4 text-center">
                    {v.damagedOrMissing > 0 ? (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-md">
                        {v.damagedOrMissing} missing
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">0</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-gray-700">
                    {v.damagedOrMissing > 0 ? `₹${(v.damagedOrMissing * v.unitReplacementCost).toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button 
                        onClick={() => updateReturned(v.id, -1)}
                        className="w-6 h-6 rounded bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => updateReturned(v.id, 1)}
                        className="w-6 h-6 rounded bg-purple-700 text-white hover:bg-purple-800 font-bold"
                      >
                        +
                      </button>
                    </div>
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
