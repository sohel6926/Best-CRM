import React, { useState, useEffect } from 'react';
import { 
  Utensils, Clock, CheckCircle2, AlertTriangle, Printer, 
  Flame, Sparkles, ChefHat, RefreshCw, Send, Check, Plus, Edit3, Trash2, X
} from 'lucide-react';

export interface MealCategory {
  id: string;
  name: string;
  count: number;
  rotiCount: number;
  riceLiters: number;
  packaging: string;
  status: 'Ready' | 'Cooking' | 'Packing';
}

const INITIAL_CATEGORIES: MealCategory[] = [
  { id: 'cat-1', name: 'Executive Veg Deluxe (3 Roti + Paneer + Dal + Rice + Curd)', count: 96, rotiCount: 288, riceLiters: 24, packaging: 'Sugarcane Bagasse 5-CP', status: 'Packing' },
  { id: 'cat-2', name: 'Homestyle Veg Mini (2 Roti + Sabzi + Dal + Rice)', count: 64, rotiCount: 128, riceLiters: 16, packaging: 'Sugarcane Bagasse 3-CP', status: 'Packing' },
  { id: 'cat-3', name: 'Non-Veg Special (Chicken Curry + 2 Phulkas + Jeera Rice)', count: 52, rotiCount: 104, riceLiters: 15, packaging: 'Leakproof Poly-Pouch Tray', status: 'Cooking' },
  { id: 'cat-4', name: 'High-Protein Fitness Bowl (Grilled Paneer/Egg + Quinoa/Brown Rice)', count: 28, rotiCount: 0, riceLiters: 7, packaging: 'Eco Salad Container', status: 'Ready' },
  { id: 'cat-5', name: 'Millet / Diabetic Care Thali (Jowar Roti + Methi Dal + Salad)', count: 22, rotiCount: 44, riceLiters: 5, packaging: 'Sugarcane Bagasse 4-CP', status: 'Cooking' },
];

export const LunchManifest: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [lockedAt] = useState('09:00 AM (Locked for Kitchen Dispatch)');
  const [categories, setCategories] = useState<MealCategory[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_lunch_manifest');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bestcrm_lunch_manifest', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MealCategory | null>(null);

  // Form states for Add
  const [newName, setNewName] = useState('');
  const [newCount, setNewCount] = useState(30);
  const [newRotiCount, setNewRotiCount] = useState(60);
  const [newRiceLiters, setNewRiceLiters] = useState(8);
  const [newPackaging, setNewPackaging] = useState('Sugarcane Bagasse 5-CP');
  const [newStatus, setNewStatus] = useState<'Ready' | 'Cooking' | 'Packing'>('Packing');

  const totalMeals = categories.reduce((sum, c) => sum + c.count, 0);
  const totalRotis = categories.reduce((sum, c) => sum + c.rotiCount, 0);
  const totalRiceLiters = categories.reduce((sum, c) => sum + c.riceLiters, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCat: MealCategory = {
      id: `cat-${Date.now()}`,
      name: newName.trim(),
      count: Number(newCount) || 0,
      rotiCount: Number(newRotiCount) || 0,
      riceLiters: Number(newRiceLiters) || 0,
      packaging: newPackaging,
      status: newStatus,
    };

    setCategories(prev => [newCat, ...prev]);
    setIsAddOpen(false);
    setNewName('');
    setNewCount(30);
    setNewRotiCount(60);
    setNewRiceLiters(8);
    onNotify?.(`Added new meal tier "${newCat.name}"!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setCategories(prev => prev.map(c => c.id === editingCategory.id ? editingCategory : c));
    const name = editingCategory.name;
    setEditingCategory(null);
    onNotify?.(`Updated station for "${name}"!`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove meal tier "${name}" from production manifest?`)) {
      setCategories(prev => prev.filter(c => c.id !== id));
      onNotify?.(`Removed "${name}" from manifest.`);
    }
  };

  const handleQuickStatus = (id: string, newStat: 'Ready' | 'Cooking' | 'Packing') => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, status: newStat } : c));
    onNotify?.(`Kitchen stage updated to ${newStat}!`);
  };

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
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Add Meal Category</span>
          </button>
          <button
            type="button"
            onClick={() => onNotify?.('Kitchen portioning manifest sent to Master Chef tablet!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5B21B6] border border-purple-200 text-xs font-bold transition shadow-xs cursor-pointer"
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
            {Math.round(totalRotis * 0.9)} Wheat + {Math.round(totalRotis * 0.1)} Jowar
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
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {categories.length > 0 ? Math.round((categories.filter(c => c.status === 'Ready').length / categories.length) * 100) : 0}% Ready
          </p>
          <span className="text-[11px] text-gray-500 font-medium mt-1 block">
            Rider dispatch at 11:15 AM
          </span>
        </div>
      </div>

      {/* Production Breakdown Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Live Station-Wise Prep & Bagging Status</h3>
            <span className="text-[10px] bg-purple-100 text-[#5B21B6] px-2 py-0.5 rounded-full font-bold">
              {categories.length} Tiers
            </span>
          </div>
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
                <th className="p-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-bold text-[#1E1B4B]">
                    <div>{c.name}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{c.packaging}</div>
                  </td>
                  <td className="p-3 text-right font-extrabold text-[#5B21B6] tabular-nums text-sm">{c.count}</td>
                  <td className="p-3 text-right font-semibold text-amber-700 tabular-nums">{c.rotiCount}</td>
                  <td className="p-3 text-right text-gray-600 tabular-nums">{c.riceLiters} L</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                      {c.packaging}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={c.status}
                      onChange={(e) => handleQuickStatus(c.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border cursor-pointer ${
                        c.status === 'Ready' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                          : c.status === 'Packing' 
                          ? 'bg-blue-50 text-blue-800 border-blue-200' 
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="Cooking">Cooking</option>
                      <option value="Packing">Packing</option>
                      <option value="Ready">Ready</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingCategory(c)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5B21B6] bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-lg transition cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id, c.name)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete meal category"
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

      {/* Modal: Add Meal Category */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleCreate} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#1E1B4B]">Add New Meal Tier</h3>
              <button type="button" onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Meal Name & Menu Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Indian Curd Rice & Sabzi Combo"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Box Count</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newCount}
                    onChange={(e) => setNewCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rotis Count</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newRotiCount}
                    onChange={(e) => setNewRotiCount(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rice/Gravy (L)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    value={newRiceLiters}
                    onChange={(e) => setNewRiceLiters(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Packaging Tray</label>
                  <select
                    value={newPackaging}
                    onChange={(e) => setNewPackaging(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Sugarcane Bagasse 5-CP">Sugarcane Bagasse 5-CP</option>
                    <option value="Sugarcane Bagasse 4-CP">Sugarcane Bagasse 4-CP</option>
                    <option value="Sugarcane Bagasse 3-CP">Sugarcane Bagasse 3-CP</option>
                    <option value="Leakproof Poly-Pouch Tray">Leakproof Poly-Pouch Tray</option>
                    <option value="Eco Salad Container">Eco Salad Container</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kitchen Stage</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Cooking">Cooking</option>
                    <option value="Packing">Packing</option>
                    <option value="Ready">Ready</option>
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
                Save Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Edit Meal Category */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={handleSaveEdit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-[#1E1B4B]">Edit Meal Category</h3>
              <button type="button" onClick={() => setEditingCategory(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Meal Name & Description</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Box Count</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingCategory.count}
                    onChange={(e) => setEditingCategory({ ...editingCategory, count: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rotis Count</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingCategory.rotiCount}
                    onChange={(e) => setEditingCategory({ ...editingCategory, rotiCount: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rice / Gravy (L)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    value={editingCategory.riceLiters}
                    onChange={(e) => setEditingCategory({ ...editingCategory, riceLiters: Number(e.target.value) })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Packaging Tray</label>
                  <select
                    value={editingCategory.packaging}
                    onChange={(e) => setEditingCategory({ ...editingCategory, packaging: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Sugarcane Bagasse 5-CP">Sugarcane Bagasse 5-CP</option>
                    <option value="Sugarcane Bagasse 4-CP">Sugarcane Bagasse 4-CP</option>
                    <option value="Sugarcane Bagasse 3-CP">Sugarcane Bagasse 3-CP</option>
                    <option value="Leakproof Poly-Pouch Tray">Leakproof Poly-Pouch Tray</option>
                    <option value="Eco Salad Container">Eco Salad Container</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kitchen Stage</label>
                  <select
                    value={editingCategory.status}
                    onChange={(e) => setEditingCategory({ ...editingCategory, status: e.target.value as any })}
                    className="w-full rounded-xl border border-gray-200 p-2.5 font-medium focus:border-purple-600 focus:outline-none"
                  >
                    <option value="Cooking">Cooking</option>
                    <option value="Packing">Packing</option>
                    <option value="Ready">Ready</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  handleDelete(editingCategory.id, editingCategory.name);
                  setEditingCategory(null);
                }}
                className="px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 font-bold text-xs flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] font-bold text-white text-xs shadow-xs"
                >
                  Update Category
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
