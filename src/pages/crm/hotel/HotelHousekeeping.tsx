import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Clock, AlertCircle, 
  User, RefreshCw, BedDouble, ShieldAlert, ArrowRight
} from 'lucide-react';

interface HousekeepingRoom {
  roomNo: string;
  floor: string;
  type: string;
  cleanStatus: 'Vacant Clean (Ready)' | 'Vacant Dirty' | 'Occupied Clean' | 'DND (Do Not Disturb)' | 'Out of Order';
  assignedMaid: string;
  linenStatus: 'Changed' | 'Needs Fresh Linen';
  minibarStatus: 'Replenished' | 'Needs Restock';
  lastCleanedTime: string;
}

export const HotelHousekeeping: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [rooms, setRooms] = useState<HousekeepingRoom[]>([
    { roomNo: '101', floor: '1st Floor', type: 'Executive Suite', cleanStatus: 'Occupied Clean', assignedMaid: 'Sunita Bai', linenStatus: 'Changed', minibarStatus: 'Replenished', lastCleanedTime: 'Today 11:30 AM' },
    { roomNo: '102', floor: '1st Floor', type: 'Executive Suite', cleanStatus: 'Vacant Clean (Ready)', assignedMaid: 'Sunita Bai', linenStatus: 'Changed', minibarStatus: 'Replenished', lastCleanedTime: 'Today 01:15 PM' },
    { roomNo: '103', floor: '1st Floor', type: 'Deluxe AC', cleanStatus: 'DND (Do Not Disturb)', assignedMaid: 'Sunita Bai', linenStatus: 'Needs Fresh Linen', minibarStatus: 'Replenished', lastCleanedTime: 'Yesterday' },
    { roomNo: '104', floor: '1st Floor', type: 'Deluxe AC', cleanStatus: 'Vacant Dirty', assignedMaid: 'Geeta Bai', linenStatus: 'Needs Fresh Linen', minibarStatus: 'Needs Restock', lastCleanedTime: 'Pending Turnover' },
    { roomNo: '201', floor: '2nd Floor', type: 'Premium Balcony', cleanStatus: 'Occupied Clean', assignedMaid: 'Kavita Kumari', linenStatus: 'Changed', minibarStatus: 'Replenished', lastCleanedTime: 'Today 10:45 AM' },
    { roomNo: '202', floor: '2nd Floor', type: 'Premium Balcony', cleanStatus: 'Vacant Clean (Ready)', assignedMaid: 'Kavita Kumari', linenStatus: 'Changed', minibarStatus: 'Replenished', lastCleanedTime: 'Today 02:00 PM' },
    { roomNo: '203', floor: '2nd Floor', type: 'Standard Double', cleanStatus: 'Occupied Clean', assignedMaid: 'Geeta Bai', linenStatus: 'Changed', minibarStatus: 'Replenished', lastCleanedTime: 'Today 12:20 PM' },
    { roomNo: '204', floor: '2nd Floor', type: 'Standard Double', cleanStatus: 'Out of Order', assignedMaid: 'Maintenance Team', linenStatus: 'Needs Fresh Linen', minibarStatus: 'Needs Restock', lastCleanedTime: 'Plumbing Issue' },
  ]);

  const markClean = (roomNo: string) => {
    setRooms(prev => 
      prev.map(r => r.roomNo === roomNo ? { 
        ...r, 
        cleanStatus: 'Vacant Clean (Ready)', 
        linenStatus: 'Changed', 
        minibarStatus: 'Replenished', 
        lastCleanedTime: 'Just Now' 
      } : r)
    );
    onNotify?.(`Room ${roomNo} marked as Sanitized & Ready for Check-in!`);
  };

  const vacantCleanCount = rooms.filter(r => r.cleanStatus === 'Vacant Clean (Ready)').length;
  const vacantDirtyCount = rooms.filter(r => r.cleanStatus === 'Vacant Dirty').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Housekeeping & Room Turnover Desk</h2>
            <p className="text-sm text-gray-500">Live 5-stage room status, maid allocations per floor, fresh linen changes, and minibar replenishment</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Housekeeping Floor Assignment Sheet Printed")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          Print Maid Assignment Sheet
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Ready for Guest Check-In</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{vacantCleanCount} Rooms</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Inspected & Sanitized</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Vacant Dirty (Turnover Queue)</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{vacantDirtyCount} Room</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Immediate cleaning required</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Active DND Flags</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">1 Room</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Do Not Disturb Active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Out of Service / Repair</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">1 Room</div>
          <div className="text-[11px] text-rose-500 mt-0.5">Room 204 Plumbing Repair</div>
        </div>
      </div>

      {/* Room Turnover Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Room & Type</th>
                <th className="py-3 px-4">Cleaning Status</th>
                <th className="py-3 px-4">Assigned Housekeeper</th>
                <th className="py-3 px-4 text-center">Linen Status</th>
                <th className="py-3 px-4 text-center">Minibar Inventory</th>
                <th className="py-3 px-4">Last Inspected</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {rooms.map(r => (
                <tr key={r.roomNo} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>Room {r.roomNo}</div>
                    <div className="text-[10px] text-gray-400">{r.type} • {r.floor}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      r.cleanStatus === 'Vacant Clean (Ready)' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      r.cleanStatus === 'Vacant Dirty' ? 'bg-amber-100 text-amber-800' :
                      r.cleanStatus === 'DND (Do Not Disturb)' ? 'bg-purple-100 text-purple-800' :
                      r.cleanStatus === 'Out of Order' ? 'bg-rose-100 text-rose-800' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {r.cleanStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">{r.assignedMaid}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-semibold ${r.linenStatus === 'Changed' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {r.linenStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`text-[10px] font-semibold ${r.minibarStatus === 'Replenished' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {r.minibarStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{r.lastCleanedTime}</td>
                  <td className="py-3.5 px-4 text-right">
                    {r.cleanStatus === 'Vacant Dirty' ? (
                      <button 
                        onClick={() => markClean(r.roomNo)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Mark Ready
                      </button>
                    ) : (
                      <span className="text-[11px] text-gray-400 font-semibold">Done</span>
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
