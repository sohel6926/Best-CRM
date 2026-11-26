import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, 
  Flame, Plus, Printer, Thermometer, Droplet
} from 'lucide-react';

interface NonVegBatch {
  id: string;
  batchCode: string;
  meatType: 'Boneless Tender Chicken' | 'Tender Boneless Mutton' | 'Jumbo Sea Tiger Prawns' | 'Boneless Vanjaram Fish';
  meatWeightKg: number;
  fryingOilTempC: number; // 160-175°C
  moistureTestStatus: 'Zero Moisture (Deep Fried Crisp)' | 'Testing in Lab';
  gingerGarlicRoastScore: string;
  vinegarPreservativeRatio: string;
  packagedJars500g: number;
  chefMaster: string;
  status: 'Ready for Bottling' | 'Frying & Sterilization' | 'Spicing & Marination';
  mfgDate: string;
}

export const PickleNonVegKitchen: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [batches, setBatches] = useState<NonVegBatch[]>([
    {
      id: 'nv-1',
      batchCode: 'NV-CHK-2026-081',
      meatType: 'Boneless Tender Chicken',
      meatWeightKg: 80,
      fryingOilTempC: 170,
      moistureTestStatus: 'Zero Moisture (Deep Fried Crisp)',
      gingerGarlicRoastScore: 'Golden Brown Aromatic (100% Roasted)',
      vinegarPreservativeRatio: 'Apple Cider Vinegar + Lemon Salt 4.2%',
      packagedJars500g: 160,
      chefMaster: 'Ustaad Basha',
      status: 'Ready for Bottling',
      mfgDate: '26 Nov 2026'
    },
    {
      id: 'nv-2',
      batchCode: 'NV-PRW-2026-082',
      meatType: 'Jumbo Sea Tiger Prawns',
      meatWeightKg: 45,
      fryingOilTempC: 165,
      moistureTestStatus: 'Zero Moisture (Deep Fried Crisp)',
      gingerGarlicRoastScore: 'Handmade Garlic Paste Infused',
      vinegarPreservativeRatio: 'Pure Lemon Extract 5.0%',
      packagedJars500g: 90,
      chefMaster: 'Ustaad Basha',
      status: 'Ready for Bottling',
      mfgDate: '26 Nov 2026'
    },
    {
      id: 'nv-3',
      batchCode: 'NV-MUT-2026-083',
      meatType: 'Tender Boneless Mutton',
      meatWeightKg: 50,
      fryingOilTempC: 175,
      moistureTestStatus: 'Testing in Lab',
      gingerGarlicRoastScore: 'Slow Fire Roasted (Zero Raw Smell)',
      vinegarPreservativeRatio: 'Traditional Spices & Lemon 4.5%',
      packagedJars500g: 100,
      chefMaster: 'Rahim Khan',
      status: 'Frying & Sterilization',
      mfgDate: '26 Nov 2026'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Non-Veg Meat Pickle Kitchen & Sterilization Vault</h2>
            <p className="text-sm text-gray-500">Dedicated segregated kitchen for Chicken, Mutton & Prawn pickles with zero moisture deep-fry safety controls</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("HACCP Meat Sterilization & Food Safety Certificate Printed")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print HACCP Safety Certificate
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Meat Pickle Batches Today</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">175 kg Meat</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Chicken, Prawns & Mutton</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Moisture Elimination Test</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">0.0% Water</div>
          <div className="text-[11px] text-emerald-600 font-medium">Deep-fried crisp (Zero spoilage)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Frying Temperature Target</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">170°C</div>
          <div className="text-[11px] text-gray-500 mt-0.5">High heat flash sterilization</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Non-Veg Shelf Life</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">6 Months</div>
          <div className="text-[11px] text-gray-500 mt-0.5">100% Preserved in pure oil</div>
        </div>
      </div>

      {/* Meat Batches Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Batch Code & Meat Variety</th>
                <th className="py-3 px-4 text-center">Meat Weight</th>
                <th className="py-3 px-4">Frying Oil Temp</th>
                <th className="py-3 px-4 text-center">Moisture Quality Test</th>
                <th className="py-3 px-4">Roast & Preservative Blend</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {batches.map(b => (
                <tr key={b.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{b.meatType}</div>
                    <div className="text-[10px] text-[#5B21B6] font-mono">{b.batchCode} • {b.mfgDate}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-950 text-sm">{b.meatWeightKg} kg</td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" /> {b.fryingOilTempC}°C Sterilization
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> {b.moistureTestStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 max-w-xs text-[11px]">
                    <div>{b.gingerGarlicRoastScore}</div>
                    <div className="text-[10px] text-gray-400">{b.vinegarPreservativeRatio}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      b.status === 'Ready for Bottling' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Transferring ${b.meatType} to 500g glass bottling line!`)}
                      className="text-[#5B21B6] hover:underline font-bold text-xs"
                    >
                      Fill Jars
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
