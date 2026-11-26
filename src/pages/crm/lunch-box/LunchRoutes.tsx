import React, { useState } from 'react';
import { 
  Truck, MapPin, Users, Phone, CheckCircle2, 
  Send, ExternalLink, Navigation, Clock, ShieldCheck
} from 'lucide-react';

interface RouteItem {
  id: string;
  name: string;
  corridor: string;
  assignedRider: string;
  riderPhone: string;
  boxesCount: number;
  stopsCount: number;
  departureTime: string;
  status: 'Loading Bags' | 'Out for Delivery' | 'Completed' | 'Standby';
  payoutBhatta: number;
}

export const LunchRoutes: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [routes, setRoutes] = useState<RouteItem[]>([
    {
      id: 'RT-01',
      name: 'Route Alpha: Hitec City Corridor',
      corridor: 'Cyber Towers, Raheja Mindspace & Cyber Gateway',
      assignedRider: 'Naresh Goud',
      riderPhone: '+91 98492 55110',
      boxesCount: 68,
      stopsCount: 14,
      departureTime: '11:15 AM',
      status: 'Out for Delivery',
      payoutBhatta: 450,
    },
    {
      id: 'RT-02',
      name: 'Route Beta: Financial District & Nanakramguda',
      corridor: 'WaveRock, Kapil Towers & Amazon HYD11',
      assignedRider: 'Syed Imran',
      riderPhone: '+91 99891 44220',
      boxesCount: 54,
      stopsCount: 11,
      departureTime: '11:20 AM',
      status: 'Loading Bags',
      payoutBhatta: 420,
    },
    {
      id: 'RT-03',
      name: 'Route Gamma: Gachibowli & Knowledge City',
      corridor: 'Salarpuria Sattva, Deloitte Knowledge City & AIG',
      assignedRider: 'K. Shiva Kumar',
      riderPhone: '+91 97003 66331',
      boxesCount: 46,
      stopsCount: 9,
      departureTime: '11:30 AM',
      status: 'Loading Bags',
      payoutBhatta: 380,
    },
    {
      id: 'RT-04',
      name: 'Route Delta: Jubilee & Banjara Corporate Hub',
      corridor: 'Road No 36, Apollo Hospitals & TV9 Circle',
      assignedRider: 'Raju Yadav',
      riderPhone: '+91 98854 77119',
      boxesCount: 32,
      stopsCount: 7,
      departureTime: '11:35 AM',
      status: 'Standby',
      payoutBhatta: 350,
    },
  ]);

  const totalBoxes = routes.reduce((sum, r) => sum + r.boxesCount, 0);
  const totalBhatta = routes.reduce((sum, r) => sum + r.payoutBhatta, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Logistics & Delivery Fleet</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Route Clustering & Delivery Manifests</h2>
          <p className="text-xs text-[#64748B]">
            Tech corridor route grouping, rider dispatch manifests, and automated delivery bhatta calculations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('All 4 Route Manifests pushed to Rider WhatsApp Groups!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Dispatch Manifests via WhatsApp</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Active Delivery Corridors</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">4 Zones</p>
          <span className="text-[11px] text-gray-500">HITEC, Fin-Dist, Gachibowli, Jubilee</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Total Boxes in Transit</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{totalBoxes} Boxes</p>
          <span className="text-[11px] text-emerald-600 font-semibold">100% On-Time Target (12:30 PM)</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Dedicated Fleet Riders</span>
          <p className="text-2xl font-black text-[#1E1B4B] mt-1">4 Bikes</p>
          <span className="text-[11px] text-gray-500">Insulated thermal delivery crates</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Daily Rider Bhatta Payout</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹{totalBhatta}</p>
          <span className="text-[11px] text-gray-500">₹350 - ₹450 / shift depending on stops</span>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((rt) => (
          <div key={rt.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {rt.id}
                </span>
                <h3 className="font-extrabold text-sm text-[#1E1B4B] mt-1">{rt.name}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span>{rt.corridor}</span>
                </p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                rt.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                rt.status === 'Loading Bags' ? 'bg-amber-100 text-amber-800' :
                rt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {rt.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center text-xs">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Tiffin Boxes</span>
                <p className="font-black text-sm text-[#5B21B6] mt-0.5">{rt.boxesCount}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Tech Parks</span>
                <p className="font-black text-sm text-gray-800 mt-0.5">{rt.stopsCount} Drops</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Departure</span>
                <p className="font-black text-sm text-amber-700 mt-0.5">{rt.departureTime}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-purple-100 text-[#5B21B6] flex items-center justify-center font-bold text-xs">
                  {rt.assignedRider[0]}
                </div>
                <div>
                  <p className="font-bold text-[#1E1B4B]">{rt.assignedRider}</p>
                  <p className="text-[11px] text-gray-500">{rt.riderPhone}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block">Shift Bhatta:</span>
                <span className="font-extrabold text-emerald-700">₹{rt.payoutBhatta}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNotify?.(`Dispatched Google Maps navigation route to ${rt.assignedRider}!`)}
                className="flex-1 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Navigation className="h-3.5 w-3.5 text-[#5B21B6]" />
                <span>Share Google Map Route</span>
              </button>
              <button
                type="button"
                onClick={() => onNotify?.(`Printed packing tags for ${rt.name}!`)}
                className="px-3 py-1.5 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition"
              >
                Print Tags
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
