import React, { useState } from 'react';
import { 
  Globe, TrendingUp, Sliders, RefreshCw, 
  CheckCircle2, DollarSign, AlertCircle, Percent
} from 'lucide-react';

interface OtaChannel {
  id: string;
  channelName: string;
  logo: string;
  status: 'Live & Synced' | 'Paused';
  commissionRate: number; // e.g. 18%
  currentListedRate: number;
  availableInventory: number;
  bookingsThisMonth: number;
}

export const HotelChannelManager: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [channels, setChannels] = useState<OtaChannel[]>([
    { id: 'ota-1', channelName: 'MakeMyTrip & Goibibo', logo: 'MMT', status: 'Live & Synced', commissionRate: 18, currentListedRate: 4200, availableInventory: 6, bookingsThisMonth: 42 },
    { id: 'ota-2', channelName: 'Booking.com Global', logo: 'BDC', status: 'Live & Synced', commissionRate: 15, currentListedRate: 4500, availableInventory: 4, bookingsThisMonth: 28 },
    { id: 'ota-3', channelName: 'Agoda International', logo: 'AGD', status: 'Live & Synced', commissionRate: 16, currentListedRate: 4350, availableInventory: 3, bookingsThisMonth: 19 },
    { id: 'ota-4', channelName: 'Direct Hotel Website (Commission Free)', logo: 'WEB', status: 'Live & Synced', commissionRate: 0, currentListedRate: 3800, availableInventory: 8, bookingsThisMonth: 56 },
  ]);

  const [weekendSurgePercent, setWeekendSurgePercent] = useState<number>(25);

  const syncChannels = () => {
    onNotify?.("2-Way OTA inventory sync initiated across MakeMyTrip, Booking.com & Agoda!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">OTA Channel Manager & Dynamic Surge Pricing</h2>
            <p className="text-sm text-gray-500">2-way instant rate & inventory sync across MakeMyTrip, Booking.com, Agoda; prevent double-bookings</p>
          </div>
        </div>

        <button 
          onClick={syncChannels}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> Push Instant Rate Sync
        </button>
      </div>

      {/* Dynamic Surge Pricing Controller */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Weekend & Holiday Surge Rule Engine
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Auto-boost rates when hotel occupancy exceeds 75% or for Friday/Saturday check-ins</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-purple-900">Weekend Surge:</span>
            <input 
              type="number"
              value={weekendSurgePercent}
              onChange={e => setWeekendSurgePercent(Number(e.target.value) || 0)}
              className="w-16 px-2.5 py-1 text-xs font-bold border border-purple-200 rounded-lg text-purple-950 focus:outline-none"
            />
            <span className="text-xs text-gray-500 font-semibold">% price bump</span>
          </div>
        </div>
      </div>

      {/* Channel Rates Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Distribution Channel</th>
                <th className="py-3 px-4 text-center">OTA Commission</th>
                <th className="py-3 px-4 text-right">Live Rate Per Night</th>
                <th className="py-3 px-4 text-center">Live Open Inventory</th>
                <th className="py-3 px-4 text-center">Bookings Generated</th>
                <th className="py-3 px-4 text-center">API Channel Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {channels.map(c => (
                <tr key={c.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{c.channelName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">Code: {c.logo}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.commissionRate === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {c.commissionRate === 0 ? '0% (Direct Direct)' : `${c.commissionRate}%`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-purple-950 text-sm">
                    ₹{c.currentListedRate.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-800">{c.availableInventory} Rooms</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-emerald-700">{c.bookingsThisMonth} stays</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> {c.status}
                    </span>
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
