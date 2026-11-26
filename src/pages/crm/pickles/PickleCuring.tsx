import React, { useState } from 'react';
import { 
  Layers, CheckCircle2, Clock, AlertTriangle, 
  Plus, Printer, ArrowRight, ShieldCheck, Droplet, Sparkles
} from 'lucide-react';

interface CuringJaadi {
  id: string;
  jaadiCode: string; // Ceramic jar number
  variety: 'Grandmother Mango Avakaya' | 'Sour Gongura Pachadi' | 'Usirikaya (Amla) Pickle' | 'Pandu Mirapa (Red Chili)' | 'Lemon (Nimmakaya) Pickle';
  capacityKg: number;
  oilUsed: 'Wood-Pressed Gingelly (Sesame) Oil' | 'Cold-Pressed Groundnut Oil';
  curingStage: 'Day 1: Initial Spicing' | 'Day 3: Oota Stirring & Oil Level' | 'Day 15: Spice Infusion' | 'Day 30: Ready for Bottling';
  oilLevelStatus: 'Safe (1 Inch Layer Above)' | 'Needs Top-Up Oil';
  saltPercentage: number; // 14-16%
  phLevel: number; // Must be < 4.0
  startedDate: string;
  readyDate: string;
  karigarMaster: string;
}

export const PickleCuring: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [jaadis, setJaadis] = useState<CuringJaadi[]>([
    {
      id: 'jd-1',
      jaadiCode: 'JAADI-2026-AV-01',
      variety: 'Grandmother Mango Avakaya',
      capacityKg: 150,
      oilUsed: 'Wood-Pressed Gingelly (Sesame) Oil',
      curingStage: 'Day 30: Ready for Bottling',
      oilLevelStatus: 'Safe (1 Inch Layer Above)',
      saltPercentage: 15.2,
      phLevel: 3.4,
      startedDate: '25 Oct 2026',
      readyDate: '26 Nov 2026',
      karigarMaster: 'Amma Subbamma'
    },
    {
      id: 'jd-2',
      jaadiCode: 'JAADI-2026-GG-02',
      variety: 'Sour Gongura Pachadi',
      capacityKg: 100,
      oilUsed: 'Cold-Pressed Groundnut Oil',
      curingStage: 'Day 15: Spice Infusion',
      oilLevelStatus: 'Safe (1 Inch Layer Above)',
      saltPercentage: 14.8,
      phLevel: 3.2,
      startedDate: '11 Nov 2026',
      readyDate: '11 Dec 2026',
      karigarMaster: 'Lakshmi Devi'
    },
    {
      id: 'jd-3',
      jaadiCode: 'JAADI-2026-US-03',
      variety: 'Usirikaya (Amla) Pickle',
      capacityKg: 120,
      oilUsed: 'Wood-Pressed Gingelly (Sesame) Oil',
      curingStage: 'Day 3: Oota Stirring & Oil Level',
      oilLevelStatus: 'Safe (1 Inch Layer Above)',
      saltPercentage: 15.5,
      phLevel: 3.5,
      startedDate: '23 Nov 2026',
      readyDate: '23 Dec 2026',
      karigarMaster: 'Amma Subbamma'
    },
    {
      id: 'jd-4',
      jaadiCode: 'JAADI-2026-PM-04',
      variety: 'Pandu Mirapa (Red Chili)',
      capacityKg: 80,
      oilUsed: 'Wood-Pressed Gingelly (Sesame) Oil',
      curingStage: 'Day 1: Initial Spicing',
      oilLevelStatus: 'Needs Top-Up Oil',
      saltPercentage: 16.0,
      phLevel: 3.6,
      startedDate: '25 Nov 2026',
      readyDate: '25 Dec 2026',
      karigarMaster: 'Lakshmi Devi'
    }
  ]);

  const totalCuringWeight = jaadis.reduce((sum, j) => sum + j.capacityKg, 0);

  const topUpOil = (id: string) => {
    setJaadis(prev => 
      prev.map(j => j.id === id ? { ...j, oilLevelStatus: 'Safe (1 Inch Layer Above)' } : j)
    );
    onNotify?.("Cold-pressed gingelly oil added! Protective surface layer restored.");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ceramic Bharani (Jaadi) Curing & Fermentation Lifecycle</h2>
            <p className="text-sm text-gray-500">Traditional porcelain martaban aging, 30-day spice infusion, natural pH testing & oil shield monitoring</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Bharani Pickling Batch Log Opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Start New Bharani Curing
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Pickle Aging in Jaadis</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalCuringWeight} <span className="text-xs font-normal text-gray-500">kg</span></div>
          <div className="text-[11px] text-purple-600 mt-0.5">Across {jaadis.length} ceramic bharanis</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Ready for Jar Bottling Today</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">150 kg</div>
          <div className="text-[11px] text-emerald-600 font-medium">JAADI-2026-AV-01 30-day aged</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Natural pH Acidity Level</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">3.4 pH</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">&lt; 4.0 target (100% Fungus-proof)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Traditional Oil Shield</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">1 Warning</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Jaadi 4 needs oil top-up</div>
        </div>
      </div>

      {/* Jaadis Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Bharani / Jaadi Code</th>
                <th className="py-3 px-4">Pickle Variety</th>
                <th className="py-3 px-4 text-center">Batch Weight</th>
                <th className="py-3 px-4">Curing Aging Stage</th>
                <th className="py-3 px-4">Oil Used & Protection Layer</th>
                <th className="py-3 px-4 text-center">pH / Salt %</th>
                <th className="py-3 px-4 text-right">Bottling Ready</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {jaadis.map(j => (
                <tr key={j.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    <div>{j.jaadiCode}</div>
                    <div className="text-[10px] text-gray-400 font-sans">Lead: {j.karigarMaster}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-purple-950">{j.variety}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-900">{j.capacityKg} kg</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      j.curingStage.includes('Ready') ? 'bg-emerald-100 text-emerald-800' :
                      j.curingStage.includes('Day 15') ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {j.curingStage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div>{j.oilUsed}</div>
                    <span className={`text-[10px] font-bold ${
                      j.oilLevelStatus.includes('Safe') ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {j.oilLevelStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-bold text-purple-900">{j.phLevel} pH</span>
                    <div className="text-[10px] text-gray-400">{j.saltPercentage}% Salt</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-gray-900">{j.readyDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    {j.oilLevelStatus.includes('Needs') ? (
                      <button 
                        onClick={() => topUpOil(j.id)}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Top-up Oil
                      </button>
                    ) : j.curingStage.includes('Ready') ? (
                      <button 
                        onClick={() => onNotify?.(`Transferring ${j.variety} from ${j.jaadiCode} to bottling line!`)}
                        className="px-2.5 py-1 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Send to Bottling
                      </button>
                    ) : (
                      <span className="text-gray-400 text-[11px] font-semibold">Fermenting</span>
                    )}
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
