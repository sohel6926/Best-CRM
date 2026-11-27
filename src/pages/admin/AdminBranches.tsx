import React, { useState } from 'react';
import { 
  Building2, MapPin, Plus, CheckCircle2, ShieldCheck, 
  Store, Utensils, Phone, Mail, Globe, ExternalLink,
  Edit3, Trash2, X
} from 'lucide-react';
import { BranchItem, useAdmin } from '../../context/AdminContext';

export function AdminBranches() {
  const { branches, addBranch, updateBranch, deleteBranch } = useAdmin();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);

  // New Branch Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Swastik Grand Catering & BestCRM Labs');
  const [type, setType] = useState('Central Base Kitchen');
  const [gstin, setGstin] = useState('36AAACB1234F1Z1');
  const [fssaiNumber, setFssaiNumber] = useState('13624014000321');
  const [manager, setManager] = useState('');
  const [phone, setPhone] = useState('+91 98490 22110');
  const [address, setAddress] = useState('');
  const [capacityPerDay, setCapacityPerDay] = useState('2,500 Plates / Day');
  const [status, setStatus] = useState<'Active' | 'Under Audit'>('Active');

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !manager) return;
    addBranch({
      name,
      brand,
      type,
      gstin,
      fssaiNumber,
      manager,
      phone,
      address: address || 'Hyderabad, Telangana',
      capacityPerDay,
      status,
    });
    setAddModalOpen(false);
    setName('');
    setManager('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Enterprise Structure</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Company, Brands & Multi-Branch Network</h2>
          <p className="text-xs text-[#64748B]">
            Manage multi-city base kitchens, cloud depots, tasting lounges, GSTIN tax registrations & FSSAI licenses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Branch</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Operational Branches</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">{branches.length} Locations</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Telangana & Andhra Pradesh</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Registered Brands</span>
          <p className="text-2xl font-black text-[#1E1B4B] mt-1">4 Sub-Brands</p>
          <span className="text-[11px] text-gray-500">Catering, Tiffin, Podi, Pickles</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">FSSAI Compliance</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">100% Certified</p>
          <span className="text-[11px] text-gray-500">Central & State Licenses Valid</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">GSTIN Registrations</span>
          <p className="text-2xl font-black text-blue-600 mt-1">2 States (36 & 37)</p>
          <span className="text-[11px] text-gray-500">Dual state billing ready</span>
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3 hover:border-purple-200 transition">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {b.id} • {b.type}
                </span>
                <h3 className="font-extrabold text-base text-[#1E1B4B] mt-1">{b.name}</h3>
                <p className="text-xs text-[#5B21B6] font-semibold">{b.brand}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateBranch(b.id, { status: b.status === 'Active' ? 'Under Audit' : 'Active' })}
                  title="Toggle Audit Status"
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold cursor-pointer transition ${
                    b.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  ● {b.status}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingBranch({ ...b })}
                  title="Edit Branch Details"
                  className="p-1 rounded-lg border border-purple-200 text-[#5B21B6] bg-purple-50 hover:bg-purple-100 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete branch ${b.name}?`)) {
                      deleteBranch(b.id);
                    }
                  }}
                  title="Delete Branch"
                  className="p-1 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-start gap-1 text-gray-600">
                <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-[11px]">{b.address}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200/60">
                <span className="text-gray-500">Manager:</span>
                <span className="font-bold text-gray-800">{b.manager} ({b.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GSTIN:</span>
                <span className="font-mono font-semibold text-gray-700">{b.gstin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">FSSAI Lic:</span>
                <span className="font-mono font-semibold text-emerald-700">{b.fssaiNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Output Capacity:</span>
                <span className="font-bold text-[#5B21B6]">{b.capacityPerDay}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Branch Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleCreateBranch}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#F3EEFF] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">New Branch</span>
                <h2 className="text-base font-bold text-[#1E1B4B]">Register Branch / Base Kitchen</h2>
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="sm:col-span-2">
                <label className="font-semibold text-[#475569]">Facility / Branch Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Madhapur Central Base Kitchen"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Sub-Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Facility Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Central Base Kitchen">Central Base Kitchen</option>
                  <option value="Cloud Kitchen & Depot">Cloud Kitchen & Depot</option>
                  <option value="Retail Tasting Studio">Retail Tasting Studio</option>
                  <option value="Regional Processing Center">Regional Processing Center</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Manager Name</label>
                <input
                  type="text"
                  required
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  placeholder="e.g. Chef K. Venkatesh Rao"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">GSTIN Registration</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">FSSAI License No.</label>
                <input
                  type="text"
                  value={fssaiNumber}
                  onChange={(e) => setFssaiNumber(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-[#475569]">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot / Street / City / PIN"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Output Capacity</label>
                <input
                  type="text"
                  value={capacityPerDay}
                  onChange={(e) => setCapacityPerDay(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Active">Active</option>
                  <option value="Under Audit">Under Audit</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 border-t border-[#F3EEFF] pt-4">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="rounded-xl border border-[#EDE9FE] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#FAF8FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95]"
              >
                Create Branch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Branch Modal */}
      {editingBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateBranch(editingBranch.id, editingBranch);
              setEditingBranch(null);
            }}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#F3EEFF] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">Edit Branch #{editingBranch.id}</span>
                <h2 className="text-base font-bold text-[#1E1B4B]">{editingBranch.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingBranch(null)}
                className="rounded-lg p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="sm:col-span-2">
                <label className="font-semibold text-[#475569]">Facility / Branch Name</label>
                <input
                  type="text"
                  required
                  value={editingBranch.name}
                  onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Sub-Brand</label>
                <input
                  type="text"
                  value={editingBranch.brand}
                  onChange={(e) => setEditingBranch({ ...editingBranch, brand: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Facility Type</label>
                <select
                  value={editingBranch.type}
                  onChange={(e) => setEditingBranch({ ...editingBranch, type: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Central Base Kitchen">Central Base Kitchen</option>
                  <option value="Cloud Kitchen & Depot">Cloud Kitchen & Depot</option>
                  <option value="Retail Tasting Studio">Retail Tasting Studio</option>
                  <option value="Regional Processing Center">Regional Processing Center</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Manager Name</label>
                <input
                  type="text"
                  required
                  value={editingBranch.manager}
                  onChange={(e) => setEditingBranch({ ...editingBranch, manager: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Phone</label>
                <input
                  type="tel"
                  value={editingBranch.phone}
                  onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">GSTIN Registration</label>
                <input
                  type="text"
                  value={editingBranch.gstin}
                  onChange={(e) => setEditingBranch({ ...editingBranch, gstin: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">FSSAI License No.</label>
                <input
                  type="text"
                  value={editingBranch.fssaiNumber}
                  onChange={(e) => setEditingBranch({ ...editingBranch, fssaiNumber: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-[#475569]">Address</label>
                <input
                  type="text"
                  value={editingBranch.address}
                  onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Output Capacity</label>
                <input
                  type="text"
                  value={editingBranch.capacityPerDay}
                  onChange={(e) => setEditingBranch({ ...editingBranch, capacityPerDay: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#475569]">Status</label>
                <select
                  value={editingBranch.status}
                  onChange={(e) => setEditingBranch({ ...editingBranch, status: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Active">Active</option>
                  <option value="Under Audit">Under Audit</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 border-t border-[#F3EEFF] pt-4">
              <button
                type="button"
                onClick={() => setEditingBranch(null)}
                className="rounded-xl border border-[#EDE9FE] px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#FAF8FF]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95]"
              >
                Save Branch Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
