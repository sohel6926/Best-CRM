import React, { useState } from 'react';
import { 
  Building2, Calendar, Users, Clock, CheckCircle2, 
  DollarSign, Plus, Printer, Share2, Sparkles
} from 'lucide-react';

interface BanquetBooking {
  id: string;
  hallName: 'Grand Kohinoor Ballroom' | 'Chanakya Boardroom' | 'Rooftop Starlight Lawn';
  eventTitle: string;
  clientName: string;
  phone: string;
  date: string;
  slot: 'Morning (09:00 AM - 01:00 PM)' | 'Evening (06:00 PM - 11:30 PM)' | 'Full Day';
  guestCount: number;
  totalDealAmount: number;
  advanceDeposit: number;
  cateringMenu: string;
  status: 'Confirmed' | 'Proposal Sent';
}

export const HotelBanquets: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [bookings, setBookings] = useState<BanquetBooking[]>([
    {
      id: 'bnq-1',
      hallName: 'Grand Kohinoor Ballroom',
      eventTitle: 'Dr. Agarwal Annual Medical Colloquium',
      clientName: 'Dr. Ramesh Agarwal',
      phone: '+91 98210 99812',
      date: '02 Dec 2026',
      slot: 'Full Day',
      guestCount: 250,
      totalDealAmount: 185000,
      advanceDeposit: 60000,
      cateringMenu: 'Executive Buffet + Hi-Tea with Live Counters',
      status: 'Confirmed'
    },
    {
      id: 'bnq-2',
      hallName: 'Chanakya Boardroom',
      eventTitle: 'Q3 Board of Directors Strategy Session',
      clientName: 'Sun Pharma Regional Head',
      phone: '+91 99100 44312',
      date: '28 Nov 2026',
      slot: 'Morning (09:00 AM - 01:00 PM)',
      guestCount: 24,
      totalDealAmount: 35000,
      advanceDeposit: 15000,
      cateringMenu: 'High Tea, Continental Canapes & Working Lunch',
      status: 'Confirmed'
    },
    {
      id: 'bnq-3',
      hallName: 'Rooftop Starlight Lawn',
      eventTitle: 'Singhania Golden Anniversary Sangeet',
      clientName: 'Kavita Singhania',
      phone: '+91 97112 00418',
      date: '05 Dec 2026',
      slot: 'Evening (06:00 PM - 11:30 PM)',
      guestCount: 300,
      totalDealAmount: 240000,
      advanceDeposit: 100000,
      cateringMenu: 'Royal Mughlai Buffet + Live Mocktail Station',
      status: 'Confirmed'
    }
  ]);

  const totalBanquetRevenue = bookings.reduce((sum, b) => sum + b.totalDealAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Banquet Halls, Boardrooms & Lawn Booking (MICE)</h2>
            <p className="text-sm text-gray-500">Corporate conferences, wedding sangeets, boardroom audio/video setups & gala buffets</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Banquet Hall Contract Generator opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Book Banquet Hall
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Banquet Confirmed Revenue</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">₹{totalBanquetRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-purple-600 mt-0.5 font-medium">{bookings.length} MICE contracts locked</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Advances Handed Over</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            ₹{bookings.reduce((sum, b) => sum + b.advanceDeposit, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Safe in corporate bank ledger</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Available Banquet Venues</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">3 Venues</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Ballroom (400p), Boardroom (30p), Lawn (500p)</div>
        </div>
      </div>

      {/* Banquets Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Hall & Event Title</th>
                <th className="py-3 px-4">Date & Time Slot</th>
                <th className="py-3 px-4">Client Contact</th>
                <th className="py-3 px-4 text-center">Guests</th>
                <th className="py-3 px-4">Catering Arrangement</th>
                <th className="py-3 px-4 text-right">Contract Value</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{b.eventTitle}</div>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded text-[10px] font-semibold border border-purple-100">
                      {b.hallName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div className="font-bold text-purple-950">{b.date}</div>
                    <div className="text-[10px] text-gray-400">{b.slot}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <div>{b.clientName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{b.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-900">{b.guestCount} pax</td>
                  <td className="py-3.5 px-4 text-gray-600 text-[11px] max-w-xs">{b.cateringMenu}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-purple-950 text-sm">
                    ₹{b.totalDealAmount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Printed Banquet Event Order (BEO) for ${b.eventTitle}`)}
                      className="text-[#5B21B6] hover:underline font-bold"
                    >
                      Print BEO
                    </button>
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
