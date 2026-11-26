import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Sparkles, Moon, Sun, 
  CheckCircle2, AlertTriangle, Clock, Flame 
} from 'lucide-react';

interface MuhurthamDate {
  date: string;
  tithi: string;
  muhurthamTime: string;
  category: 'Grand Wedding Muhurtham' | 'Upanayanam & Gruhapravesam' | 'Major Festival Feast';
  demandLevel: 'Extreme Peak (5x Booking Demand)' | 'High Demand' | 'Auspicious Regular';
  bookedEvents: number;
  availableCapacity: number;
}

export const CateringMuhurtham: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [dates] = useState<MuhurthamDate[]>([
    {
      date: '2026-03-04 (Wednesday)',
      tithi: 'Phalguna Shukla Trayodashi • Uttara Phalguni Nakshatram',
      muhurthamTime: '08:45 AM (Dhanur Lagnam)',
      category: 'Grand Wedding Muhurtham',
      demandLevel: 'Extreme Peak (5x Booking Demand)',
      bookedEvents: 3,
      availableCapacity: 0,
    },
    {
      date: '2026-03-08 (Sunday)',
      tithi: 'Phalguna Purnima (Holi / Kamadahana)',
      muhurthamTime: 'Evening 07:15 PM (Simha Lagnam)',
      category: 'Grand Wedding Muhurtham',
      demandLevel: 'High Demand',
      bookedEvents: 2,
      availableCapacity: 1,
    },
    {
      date: '2026-03-19 (Thursday)',
      tithi: 'Chaitra Shuddha Padyami (Ugadi - Telugu New Year)',
      muhurthamTime: 'Full Day Festival Sadhya & Ugadi Pachadi Feast',
      category: 'Major Festival Feast',
      demandLevel: 'High Demand',
      bookedEvents: 4,
      availableCapacity: 2,
    },
    {
      date: '2026-03-27 (Friday)',
      tithi: 'Sri Rama Navami Celebrations',
      muhurthamTime: '11:00 AM (Abhijit Muhurtham)',
      category: 'Major Festival Feast',
      demandLevel: 'High Demand',
      bookedEvents: 3,
      availableCapacity: 1,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Auspicious Calendar Intelligence</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Festivals, Muhurthams & Peak Season Calendar</h2>
          <p className="text-xs text-[#64748B]">
            Telugu wedding muhurtham dates, Nakshatrams, Ugadi/Dussehra festival feast bookings & surge pricing controls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black">
            2026 Telugu Panchangam Active
          </span>
        </div>
      </div>

      {/* Demand Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">March Peak Muhurthams</span>
          <p className="text-2xl font-black text-amber-600 mt-1">6 Auspicious Days</p>
          <span className="text-[11px] text-gray-500">All central base degs fully booked</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Upcoming Major Festival</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">Ugadi (19 March)</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Special Shadruchula Ugadi Pachadi</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Peak Surge Surcharge</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">+15% Plate Rate</p>
          <span className="text-[11px] text-gray-500">Applied automatically on extreme peak days</span>
        </div>
      </div>

      {/* Muhurtham Dates Cards */}
      <div className="space-y-3">
        {dates.map((m) => (
          <div key={m.date} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Moon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#1E1B4B]">{m.date}</h4>
                  <p className="text-xs text-amber-900 font-medium">{m.tithi}</p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                m.demandLevel.includes('Extreme') ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {m.demandLevel}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Lagnam / Muhurtham Window:</span>
                <span className="font-extrabold text-[#5B21B6]">{m.muhurthamTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Booked Catering Contracts:</span>
                <span className="font-bold text-gray-800">{m.bookedEvents} Events Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kitchen Slot Availability:</span>
                <span className={`font-black ${m.availableCapacity === 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {m.availableCapacity === 0 ? 'Fully Booked (House Full)' : `${m.availableCapacity} Slot Available`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
