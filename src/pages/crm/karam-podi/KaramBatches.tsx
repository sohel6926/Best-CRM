import React, { useState } from 'react';
import { 
  Flame, CheckCircle2, Clock, AlertTriangle, 
  Plus, Printer, ArrowRight, ShieldCheck, Thermometer, Layers
} from 'lucide-react';

interface RoastingBatch {
  id: string;
  batchCode: string;
  variety: 'Kandi Podi (Gunpowder)' | 'Vellulli (Garlic) Karam' | 'Idli / Dosa Karam' | 'Karivepaku (Curry Leaf) Podi' | 'Nalla Karam';
  rawWeightKg: number;
  outputWeightKg: number;
  roastingTempC: number;
  oilUsed: 'Cold-Pressed Sesame Oil' | 'Groundnut Oil';
  moisturePercent: number; // Must be < 3.0%
  millingMesh: 'Medium Crunchy (Traditional)' | 'Fine Silky';
  roastingMaster: string;
  status: 'Roasting in Progress' | 'Quality Passed (Packed)' | 'Cooling';
  mfgDate: string;
}

export const KaramBatches: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [batches, setBatches] = useState<RoastingBatch[]>([
    {
      id: 'bat-1',
      batchCode: 'BATCH-2026-KP-104',
      variety: 'Kandi Podi (Gunpowder)',
      rawWeightKg: 100,
      outputWeightKg: 97.4,
      roastingTempC: 135,
      oilUsed: 'Cold-Pressed Sesame Oil',
      moisturePercent: 2.1,
      millingMesh: 'Medium Crunchy (Traditional)',
      roastingMaster: 'Ustaad Srinivasulu',
      status: 'Quality Passed (Packed)',
      mfgDate: '26 Nov 2026'
    },
    {
      id: 'bat-2',
      batchCode: 'BATCH-2026-VK-105',
      variety: 'Vellulli (Garlic) Karam',
      rawWeightKg: 60,
      outputWeightKg: 58.2,
      roastingTempC: 125,
      oilUsed: 'Groundnut Oil',
      moisturePercent: 2.4,
      millingMesh: 'Fine Silky',
      roastingMaster: 'Ranga Rao',
      status: 'Quality Passed (Packed)',
      mfgDate: '26 Nov 2026'
    },
    {
      id: 'bat-3',
      batchCode: 'BATCH-2026-ID-106',
      variety: 'Idli / Dosa Karam',
      rawWeightKg: 120,
      outputWeightKg: 116.8,
      roastingTempC: 140,
      oilUsed: 'Cold-Pressed Sesame Oil',
      moisturePercent: 2.6,
      millingMesh: 'Medium Crunchy (Traditional)',
      roastingMaster: 'Ustaad Srinivasulu',
      status: 'Roasting in Progress',
      mfgDate: '26 Nov 2026'
    },
    {
      id: 'bat-4',
      batchCode: 'BATCH-2026-CP-107',
      variety: 'Karivepaku (Curry Leaf) Podi',
      rawWeightKg: 40,
      outputWeightKg: 38.5,
      roastingTempC: 110,
      oilUsed: 'Cold-Pressed Sesame Oil',
      moisturePercent: 1.9,
      millingMesh: 'Fine Silky',
      roastingMaster: 'Ranga Rao',
      status: 'Cooling',
      mfgDate: '26 Nov 2026'
    }
  ]);

  const totalProductionToday = batches.reduce((sum, b) => sum + b.outputWeightKg, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Spice Roasting, Milling & Moisture Quality Log</h2>
            <p className="text-sm text-gray-500">Formulation ratios, slow fire roasting temps, moisture % quality check (&lt; 3.0%), and milling mesh coarseness</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Roasting & Grinding Batch Log opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Start New Roasting Batch
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Today's Grinding Output</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalProductionToday.toFixed(1)} <span className="text-xs font-normal text-gray-500">kg</span></div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Across {batches.length} production batches</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Average Batch Moisture</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">2.25%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Target &lt; 3.0% (Zero fungus risk)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Traditional Roasting Oil</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">Cold-Pressed</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Pure sesame & groundnut oil</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Milling Roasting Masters</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">2 Karigars</div>
          <div className="text-[11px] text-purple-600 mt-0.5 font-medium">40 years authentic heritage</div>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Batch Code & Variety</th>
                <th className="py-3 px-4 text-center">Raw / Output Yield</th>
                <th className="py-3 px-4">Roasting Temperature</th>
                <th className="py-3 px-4">Oil Used</th>
                <th className="py-3 px-4 text-center">Moisture %</th>
                <th className="py-3 px-4">Milling Texture</th>
                <th className="py-3 px-4 text-center">Batch Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {batches.map(b => (
                <tr key={b.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{b.variety}</div>
                    <div className="text-[10px] text-[#5B21B6] font-mono">{b.batchCode} • {b.mfgDate}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-800">
                    {b.outputWeightKg} kg <span className="text-[10px] text-gray-400 font-normal">({Math.round((b.outputWeightKg / b.rawWeightKg) * 100)}% yield)</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" /> {b.roastingTempC}°C Slow Fire
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 text-[11px]">{b.oilUsed}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {b.moisturePercent}% Safe
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">{b.millingMesh}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      b.status === 'Quality Passed (Packed)' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      b.status === 'Roasting in Progress' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Quality Control Certificate printed for ${b.batchCode}`)}
                      className="text-[#5B21B6] hover:underline font-bold text-xs"
                    >
                      QC Slip
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
