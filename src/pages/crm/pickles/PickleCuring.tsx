import React, { useState, useEffect } from 'react';
import { 
  Layers, CheckCircle2, Clock, AlertTriangle, 
  Plus, Printer, ArrowRight, ShieldCheck, Droplet, Sparkles,
  Edit3, Trash2, X
} from 'lucide-react';

export interface CuringJaadi {
  id: string;
  jaadiCode: string;
  variety: string;
  capacityKg: number;
  oilUsed: string;
  curingStage: string;
  oilLevelStatus: string;
  saltPercentage: number;
  phLevel: number;
  startedDate: string;
  readyDate: string;
  karigarMaster: string;
}

const INITIAL_JAADIS: CuringJaadi[] = [
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
];

export const PickleCuring: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [jaadis, setJaadis] = useState<CuringJaadi[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_pickle_curing');
      return saved ? JSON.parse(saved) : INITIAL_JAADIS;
    } catch {
      return INITIAL_JAADIS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bestcrm_pickle_curing', JSON.stringify(jaadis));
    } catch {}
  }, [jaadis]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingJaadi, setEditingJaadi] = useState<CuringJaadi | null>(null);

  // New Jaadi Form
  const [variety, setVariety] = useState('Grandmother Mango Avakaya');
  const [capacity, setCapacity] = useState(100);
  const [oil, setOil] = useState('Wood-Pressed Gingelly (Sesame) Oil');
  const [karigar, setKarigar] = useState('Amma Subbamma');

  const totalCuringWeight = jaadis.reduce((sum, j) => sum + j.capacityKg, 0);

  const topUpOil = (id: string) => {
    setJaadis(prev => 
      prev.map(j => j.id === id ? { ...j, oilLevelStatus: 'Safe (1 Inch Layer Above)' } : j)
    );
    onNotify?.("Cold-pressed gingelly oil added! Protective surface layer restored.");
  };

  const handleCreateJaadi = (e: React.FormEvent) => {
    e.preventDefault();
    const newJ: CuringJaadi = {
      id: `jd-${Date.now()}`,
      jaadiCode: `JAADI-2026-${variety.slice(0, 2).toUpperCase()}-0${jaadis.length + 1}`,
      variety,
      capacityKg: Number(capacity),
      oilUsed: oil,
      curingStage: 'Day 1: Initial Spicing',
      oilLevelStatus: 'Safe (1 Inch Layer Above)',
      saltPercentage: 15.0,
      phLevel: 3.5,
      startedDate: 'Today',
      readyDate: 'In 30 Days',
      karigarMaster: karigar,
    };
    setJaadis([...jaadis, newJ]);
    setAddModalOpen(false);
    onNotify?.(`Started curing new bharani ${newJ.jaadiCode} (${variety})!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJaadi) return;
    setJaadis(jaadis.map(j => j.id === editingJaadi.id ? editingJaadi : j));
    onNotify?.(`Updated curing parameters for ${editingJaadi.jaadiCode}!`);
    setEditingJaadi(null);
  };

  const handleDeleteJaadi = (id: string, code: string) => {
    if (window.confirm(`Delete ${code}?`)) {
      setJaadis(jaadis.filter(j => j.id !== id));
      onNotify?.(`Deleted ${code}`);
    }
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
            <h2 className="text-xl font-bold text-gray-900">Pickle Aging & Jaadi (Jar) Tracker</h2>
            <p className="text-sm text-gray-500">Track 30-day pickle aging in ceramic jars, oil levels, and freshness checks</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Start New Pickle Jar Curing
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
                    <div className="flex items-center justify-end gap-1.5">
                      {j.oilLevelStatus.includes('Needs') && (
                        <button 
                          onClick={() => topUpOil(j.id)}
                          className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold shadow-sm"
                        >
                          Top-up
                        </button>
                      )}
                      <button 
                        type="button"
                        onClick={() => setEditingJaadi({ ...j })}
                        className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg border border-purple-200 cursor-pointer"
                        title="Edit Curing Stage & Stats"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDeleteJaadi(j.id, j.jaadiCode)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                        title="Delete Jaadi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Start New Bharani Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form onSubmit={handleCreateJaadi} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">New Fermentation Batch</span>
                <h3 className="text-base font-bold text-[#1E1B4B]">Start Ceramic Bharani (Jaadi)</h3>
              </div>
              <button type="button" onClick={() => setAddModalOpen(false)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Pickle Variety</label>
                <input
                  type="text"
                  required
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Batch Weight (Kg)</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Cold-Pressed Oil Used</label>
                <select
                  value={oil}
                  onChange={(e) => setOil(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Wood-Pressed Gingelly (Sesame) Oil">Wood-Pressed Gingelly (Sesame) Oil</option>
                  <option value="Cold-Pressed Groundnut Oil">Cold-Pressed Groundnut Oil</option>
                  <option value="Pure Mustard Oil">Pure Mustard Oil</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Head Karigar / Master Chef</label>
                <input
                  type="text"
                  value={karigar}
                  onChange={(e) => setKarigar(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Start Curing
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Jaadi Modal */}
      {editingJaadi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form onSubmit={handleSaveEdit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">Edit Bharani #{editingJaadi.jaadiCode}</span>
                <h3 className="text-base font-bold text-[#1E1B4B]">{editingJaadi.variety}</h3>
              </div>
              <button type="button" onClick={() => setEditingJaadi(null)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Curing Aging Stage</label>
                <select
                  value={editingJaadi.curingStage}
                  onChange={(e) => setEditingJaadi({ ...editingJaadi, curingStage: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Day 1: Initial Spicing">Day 1: Initial Spicing</option>
                  <option value="Day 3: Oota Stirring & Oil Level">Day 3: Oota Stirring & Oil Level</option>
                  <option value="Day 15: Spice Infusion">Day 15: Spice Infusion</option>
                  <option value="Day 30: Ready for Bottling">Day 30: Ready for Bottling</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Oil Protection Status</label>
                <select
                  value={editingJaadi.oilLevelStatus}
                  onChange={(e) => setEditingJaadi({ ...editingJaadi, oilLevelStatus: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Safe (1 Inch Layer Above)">Safe (1 Inch Layer Above)</option>
                  <option value="Needs Top-Up Oil">Needs Top-Up Oil</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700">Natural pH Acidity</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingJaadi.phLevel}
                    onChange={(e) => setEditingJaadi({ ...editingJaadi, phLevel: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Salt Percentage (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingJaadi.saltPercentage}
                    onChange={(e) => setEditingJaadi({ ...editingJaadi, saltPercentage: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Bottling Ready Date</label>
                <input
                  type="text"
                  value={editingJaadi.readyDate}
                  onChange={(e) => setEditingJaadi({ ...editingJaadi, readyDate: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingJaadi(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
