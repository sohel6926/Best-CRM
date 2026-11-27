import React, { useState, useEffect } from 'react';
import { 
  Flame, CheckCircle2, Clock, AlertTriangle, 
  Plus, Printer, ArrowRight, ShieldCheck, Thermometer, Layers, Edit3, Trash2, X
} from 'lucide-react';

export interface RoastingBatch {
  id: string;
  batchCode: string;
  variety: string;
  rawWeightKg: number;
  outputWeightKg: number;
  roastingTempC: number;
  oilUsed: string;
  moisturePercent: number; // Must be < 3.0%
  millingMesh: string;
  roastingMaster: string;
  status: 'Roasting in Progress' | 'Quality Passed (Packed)' | 'Cooling';
  mfgDate: string;
}

const INITIAL_BATCHES: RoastingBatch[] = [
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
];

export const KaramBatches: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [batches, setBatches] = useState<RoastingBatch[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_karam_batches');
      return saved ? JSON.parse(saved) : INITIAL_BATCHES;
    } catch {
      return INITIAL_BATCHES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bestcrm_karam_batches', JSON.stringify(batches));
    } catch (e) {
      console.error(e);
    }
  }, [batches]);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<RoastingBatch | null>(null);

  // Form states for Add
  const [newVariety, setNewVariety] = useState('Kandi Podi (Gunpowder)');
  const [newRawWeight, setNewRawWeight] = useState(80);
  const [newOutputWeight, setNewOutputWeight] = useState(78);
  const [newRoastingTemp, setNewRoastingTemp] = useState(130);
  const [newOil, setNewOil] = useState('Cold-Pressed Sesame Oil');
  const [newMoisture, setNewMoisture] = useState(2.2);
  const [newMillingMesh, setNewMillingMesh] = useState('Medium Crunchy (Traditional)');
  const [newMaster, setNewMaster] = useState('Ustaad Srinivasulu');
  const [newStatus, setNewStatus] = useState<'Roasting in Progress' | 'Quality Passed (Packed)' | 'Cooling'>('Roasting in Progress');

  const totalProductionToday = batches.reduce((sum, b) => sum + b.outputWeightKg, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const codeNum = 100 + batches.length + 1;
    const newB: RoastingBatch = {
      id: `bat-${Date.now()}`,
      batchCode: `BATCH-2026-KP-${codeNum}`,
      variety: newVariety,
      rawWeightKg: Number(newRawWeight) || 50,
      outputWeightKg: Number(newOutputWeight) || 48,
      roastingTempC: Number(newRoastingTemp) || 120,
      oilUsed: newOil,
      moisturePercent: Number(newMoisture) || 2.0,
      millingMesh: newMillingMesh,
      roastingMaster: newMaster,
      status: newStatus,
      mfgDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setBatches(prev => [newB, ...prev]);
    setIsAddOpen(false);
    onNotify?.(`Created roasting batch ${newB.batchCode} (${newB.variety})!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;

    setBatches(prev => prev.map(b => b.id === editingBatch.id ? editingBatch : b));
    const code = editingBatch.batchCode;
    setEditingBatch(null);
    onNotify?.(`Updated batch details for ${code}!`);
  };

  const handleDelete = (id: string, code: string) => {
    if (confirm(`Delete batch ${code} from production records?`)) {
      setBatches(prev => prev.filter(b => b.id !== id));
      onNotify?.(`Batch ${code} removed.`);
    }
  };

  const handleQuickStatus = (id: string, newStat: 'Roasting in Progress' | 'Quality Passed (Packed)' | 'Cooling') => {
    setBatches(prev => prev.map(b => b.id === id ? { ...b, status: newStat } : b));
    onNotify?.(`Batch status changed to ${newStat}!`);
  };

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

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Start New Roasting Batch
          </button>
          <button 
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Log
          </button>
        </div>
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
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            {batches.length > 0 ? (batches.reduce((sum, b) => sum + b.moisturePercent, 0) / batches.length).toFixed(2) : '0.00'}%
          </div>
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
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Live Batches & Moisture Quality Inspections</h3>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
            {batches.length} Active Batches
          </span>
        </div>

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
                    <div className="text-[10px] text-gray-400 font-normal">Master: {b.roastingMaster}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-800">
                    {b.outputWeightKg} kg <span className="text-[10px] text-gray-400 font-normal">({b.rawWeightKg > 0 ? Math.round((b.outputWeightKg / b.rawWeightKg) * 100) : 0}% yield)</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" /> {b.roastingTempC}°C Slow Fire
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 text-[11px]">{b.oilUsed}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[11px] border ${
                      b.moisturePercent <= 2.5 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {b.moisturePercent}% Safe
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">{b.millingMesh}</td>
                  <td className="py-3.5 px-4 text-center">
                    <select
                      value={b.status}
                      onChange={(e) => handleQuickStatus(b.id, e.target.value as any)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border cursor-pointer ${
                        b.status === 'Quality Passed (Packed)' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        b.status === 'Roasting in Progress' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        'bg-purple-50 text-purple-800 border-purple-200'
                      }`}
                    >
                      <option value="Roasting in Progress">Roasting in Progress</option>
                      <option value="Cooling">Cooling</option>
                      <option value="Quality Passed (Packed)">Quality Passed (Packed)</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        type="button"
                        onClick={() => setEditingBatch(b)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B21B6] bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-lg transition cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDelete(b.id, b.batchCode)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete batch"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Batch */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleCreate} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#1E1B4B]">Start New Roasting Batch</h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Podi Variety</label>
                <select
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                >
                  <option value="Kandi Podi (Gunpowder)">Kandi Podi (Gunpowder)</option>
                  <option value="Vellulli (Garlic) Karam">Vellulli (Garlic) Karam</option>
                  <option value="Idli / Dosa Karam">Idli / Dosa Karam</option>
                  <option value="Karivepaku (Curry Leaf) Podi">Karivepaku (Curry Leaf) Podi</option>
                  <option value="Nalla Karam">Nalla Karam</option>
                  <option value="Flax Seed (Avise Ginjalu) Podi">Flax Seed (Avise Ginjalu) Podi</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Raw Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={newRawWeight}
                    onChange={(e) => setNewRawWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Expected Output (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={newOutputWeight}
                    onChange={(e) => setNewOutputWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Roasting Temp (°C)</label>
                  <input
                    type="number"
                    min="60"
                    max="200"
                    required
                    value={newRoastingTemp}
                    onChange={(e) => setNewRoastingTemp(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Moisture % (&lt; 3.0%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="10"
                    required
                    value={newMoisture}
                    onChange={(e) => setNewMoisture(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Oil Used</label>
                  <select
                    value={newOil}
                    onChange={(e) => setNewOil(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Cold-Pressed Sesame Oil">Cold-Pressed Sesame Oil</option>
                    <option value="Groundnut Oil">Groundnut Oil</option>
                    <option value="Zero Oil (Dry Roast)">Zero Oil (Dry Roast)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Milling Mesh</label>
                  <select
                    value={newMillingMesh}
                    onChange={(e) => setNewMillingMesh(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Medium Crunchy (Traditional)">Medium Crunchy (Traditional)</option>
                    <option value="Fine Silky">Fine Silky</option>
                    <option value="Coarse Podi Mesh">Coarse Podi Mesh</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Roasting Master</label>
                  <input
                    type="text"
                    required
                    value={newMaster}
                    onChange={(e) => setNewMaster(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Roasting in Progress">Roasting in Progress</option>
                    <option value="Cooling">Cooling</option>
                    <option value="Quality Passed (Packed)">Quality Passed (Packed)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] font-bold text-white text-xs shadow-xs"
              >
                Start Batch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Edit Batch */}
      {editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSaveEdit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-base text-[#1E1B4B]">Edit Batch Parameters</h3>
                <span className="text-[10px] text-[#5B21B6] font-mono">{editingBatch.batchCode}</span>
              </div>
              <button type="button" onClick={() => setEditingBatch(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Variety</label>
                <input
                  type="text"
                  required
                  value={editingBatch.variety}
                  onChange={(e) => setEditingBatch({ ...editingBatch, variety: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Raw Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={editingBatch.rawWeightKg}
                    onChange={(e) => setEditingBatch({ ...editingBatch, rawWeightKg: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Output Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={editingBatch.outputWeightKg}
                    onChange={(e) => setEditingBatch({ ...editingBatch, outputWeightKg: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Roasting Temp (°C)</label>
                  <input
                    type="number"
                    required
                    value={editingBatch.roastingTempC}
                    onChange={(e) => setEditingBatch({ ...editingBatch, roastingTempC: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Moisture %</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingBatch.moisturePercent}
                    onChange={(e) => setEditingBatch({ ...editingBatch, moisturePercent: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Milling Mesh</label>
                  <input
                    type="text"
                    required
                    value={editingBatch.millingMesh}
                    onChange={(e) => setEditingBatch({ ...editingBatch, millingMesh: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Roasting Master</label>
                  <input
                    type="text"
                    required
                    value={editingBatch.roastingMaster}
                    onChange={(e) => setEditingBatch({ ...editingBatch, roastingMaster: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Batch Status</label>
                <select
                  value={editingBatch.status}
                  onChange={(e) => setEditingBatch({ ...editingBatch, status: e.target.value as any })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                >
                  <option value="Roasting in Progress">Roasting in Progress</option>
                  <option value="Cooling">Cooling</option>
                  <option value="Quality Passed (Packed)">Quality Passed (Packed)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  handleDelete(editingBatch.id, editingBatch.batchCode);
                  setEditingBatch(null);
                }}
                className="px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 font-bold text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBatch(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] font-bold text-white text-xs shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
