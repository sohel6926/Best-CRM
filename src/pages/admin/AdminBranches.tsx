import React, { useState } from 'react';
import { 
  Building2, MapPin, Plus, CheckCircle2, ShieldCheck, 
  Store, Utensils, Phone, Mail, Globe, ExternalLink 
} from 'lucide-react';

interface BranchItem {
  id: string;
  name: string;
  brand: string;
  type: 'Central Base Kitchen' | 'Cloud Kitchen & Depot' | 'Retail Tasting Studio' | 'Regional Processing Center';
  gstin: string;
  fssaiNumber: string;
  manager: string;
  phone: string;
  address: string;
  capacityPerDay: string;
  status: 'Active' | 'Under Audit';
}

export function AdminBranches() {
  const [branches, setBranches] = useState<BranchItem[]>([
    {
      id: 'BR-01',
      name: 'Madhapur Mega Base Kitchen & Warehousing',
      brand: 'Swastik Grand Catering & BestCRM Labs',
      type: 'Central Base Kitchen',
      gstin: '36AAACB1234F1Z1',
      fssaiNumber: '13624014000321',
      manager: 'Chef K. Venkatesh Rao',
      phone: '+91 98490 22110',
      address: 'Plot 42, Silicon Valley Layout, Madhapur, Hyderabad - 500081',
      capacityPerDay: '3,500 Plates / Shift',
      status: 'Active',
    },
    {
      id: 'BR-02',
      name: 'Financial District Corporate Tiffin Depot',
      brand: 'LunchBox OS Corporate Express',
      type: 'Cloud Kitchen & Depot',
      gstin: '36AAACB1234F1Z1',
      fssaiNumber: '13624014000455',
      manager: 'Syed Imran (Logistics Lead)',
      phone: '+91 99891 44220',
      address: 'Nanakramguda Hub, Opp WaveRock, Gachibowli - 500032',
      capacityPerDay: '800 Tiffins / Day',
      status: 'Active',
    },
    {
      id: 'BR-03',
      name: 'Banjara Hills Wedding Tasting Lounge',
      brand: 'Swastik Royal Events Suite',
      type: 'Retail Tasting Studio',
      gstin: '36AAACB1234F1Z1',
      fssaiNumber: '13624014000108',
      manager: 'Lavanya Reddy (Events Consultant)',
      phone: '+91 97001 88992',
      address: 'Road No 12, Banjara Hills, Hyderabad - 500034',
      capacityPerDay: '8 Tasting Sessions / Day',
      status: 'Active',
    },
    {
      id: 'BR-04',
      name: 'Tenali & Guntur Spice Processing Mill',
      brand: 'Swastik Andhra Karam & Pickles',
      type: 'Regional Processing Center',
      gstin: '37AAACB1234F1Z9',
      fssaiNumber: '10123028000890',
      manager: 'M. Sreeramulu',
      phone: '+91 98852 33441',
      address: 'Mandi Road, Tenali Rural, Andhra Pradesh - 522201',
      capacityPerDay: '1,200 Kg Podi / Day',
      status: 'Active',
    },
  ]);

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
          <div key={b.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {b.id} • {b.type}
                </span>
                <h3 className="font-extrabold text-base text-[#1E1B4B] mt-1">{b.name}</h3>
                <p className="text-xs text-[#5B21B6] font-semibold">{b.brand}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                {b.status}
              </span>
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
    </div>
  );
}
