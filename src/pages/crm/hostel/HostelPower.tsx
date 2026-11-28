import React, { useState } from 'react';
import { 
  Zap, Calculator, CheckCircle2, AlertCircle, 
  Plus, Printer, ArrowRight, DollarSign, Split
} from 'lucide-react';

interface RoomMeter {
  id: string;
  roomNumber: string;
  roommates: string[];
  prevReading: number;
  currentReading: number;
  perUnitTariff: number; // e.g. ₹11 per unit commercial
}

export const HostelPower: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [tariff, setTariff] = useState<number>(11); // ₹11 per unit
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  const [meters, setMeters] = useState<RoomMeter[]>([
    {
      id: 'm-101',
      roomNumber: '101 (2-Sharing AC)',
      roommates: ['Rohan Sharma', 'Aditya Varma'],
      prevReading: 1420,
      currentReading: 1538,
      perUnitTariff: 11
    },
    {
      id: 'm-102',
      roomNumber: '102 (3-Sharing Non-AC)',
      roommates: ['Karthik Raja', 'Vacant Bed', 'Saurabh Jha'],
      prevReading: 890,
      currentReading: 960,
      perUnitTariff: 11
    },
    {
      id: 'm-103',
      roomNumber: '103 (Single Private AC)',
      roommates: ['Dr. Nikhil Kulkarni'],
      prevReading: 2100,
      currentReading: 2245,
      perUnitTariff: 11
    },
    {
      id: 'm-201',
      roomNumber: '201 (2-Sharing AC)',
      roommates: ['Pooja Iyer', 'Vacant Bed'],
      prevReading: 1120,
      currentReading: 1210,
      perUnitTariff: 11
    },
    {
      id: 'm-202',
      roomNumber: '202 (3-Sharing Non-AC)',
      roommates: ['Sneha Patel', 'Ananya Roy', 'Megha Reddy'],
      prevReading: 650,
      currentReading: 760,
      perUnitTariff: 11
    }
  ]);

  const updateCurrentReading = (id: string, val: number) => {
    setMeters(prev => 
      prev.map(m => m.id === id ? { ...m, currentReading: val } : m)
    );
  };

  const totalUnitsConsumed = meters.reduce((sum, m) => sum + Math.max(0, m.currentReading - m.prevReading), 0);
  const totalPowerBill = totalUnitsConsumed * tariff;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Electricity Meter & Bill Splitter</h2>
            <p className="text-sm text-gray-500">Enter room meter units, split the bill equally among roommates, and add directly to their monthly rent</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-purple-50 p-2 rounded-xl border border-purple-100">
          <span className="text-xs font-bold text-purple-900">Commercial Tariff:</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-900">₹</span>
            <input 
              type="number"
              value={tariff}
              onChange={e => setTariff(Number(e.target.value) || 0)}
              className="w-16 px-2 py-1 text-xs font-bold bg-white border border-purple-200 rounded-lg text-purple-950 focus:outline-none"
            />
            <span className="text-xs text-gray-500 font-medium">/ unit</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Power Units Consumed</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{totalUnitsConsumed} <span className="text-xs font-normal text-gray-500">kWh Units</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Across {meters.length} monitored rooms</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Power Bill Recovered</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{totalPowerBill.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Auto-synced into monthly rent invoices</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Sub-Meter Leakage Protection</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">100% Split</div>
          <div className="text-[11px] text-blue-600 mt-0.5 font-medium">Zero dispute between roommates</div>
        </div>
      </div>

      {/* Sub-Meter Reading Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Room Sub-Meter Log ({selectedMonth})
          </h3>
          <button 
            onClick={() => onNotify?.("Appended power charges to all resident rent bills successfully!")}
            className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Split className="w-3.5 h-3.5" /> Auto-Split & Push to Rent Invoices
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Room & Type</th>
                <th className="py-3 px-4">Roommates Sharing</th>
                <th className="py-3 px-4 text-center">Prev Meter</th>
                <th className="py-3 px-4 text-center">Current Meter</th>
                <th className="py-3 px-4 text-center">Net Units</th>
                <th className="py-3 px-4 text-right">Total Room Bill</th>
                <th className="py-3 px-4 text-right">Per Resident Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {meters.map(m => {
                const units = Math.max(0, m.currentReading - m.prevReading);
                const roomBill = units * tariff;
                const activeRoommates = m.roommates.filter(r => r !== 'Vacant Bed');
                const count = activeRoommates.length || 1;
                const perPersonShare = Math.round(roomBill / count);

                return (
                  <tr key={m.id} className="hover:bg-purple-50/30 transition-all">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{m.roomNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {m.roommates.map((rm, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            rm === 'Vacant Bed' ? 'bg-gray-100 text-gray-400 italic' : 'bg-purple-50 text-purple-800 border border-purple-100'
                          }`}>
                            {rm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{m.prevReading}</td>
                    <td className="py-3.5 px-4 text-center">
                      <input 
                        type="number"
                        value={m.currentReading}
                        onChange={e => updateCurrentReading(m.id, Number(e.target.value) || 0)}
                        className="w-20 px-2 py-1 text-xs font-bold border border-purple-200 rounded text-center text-purple-950 focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-purple-900">{units} units</td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{roomBill.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-purple-950">
                      ₹{perPersonShare.toLocaleString()} <span className="text-[10px] text-gray-400 font-normal">/ person</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
