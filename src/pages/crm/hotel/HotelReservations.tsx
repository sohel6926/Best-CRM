import React, { useState } from 'react';
import { 
  BookmarkCheck, Calendar, Search, Plus, Filter, Phone, 
  CreditCard, CheckCircle2, XCircle, Clock, Globe, ArrowRight, Tag, Download
} from 'lucide-react';

interface BookingRecord {
  id: string;
  guestName: string;
  phone: string;
  roomType: 'Deluxe King' | 'Executive Suite' | 'Standard Queen' | 'Family Suite';
  roomNumber?: string;
  checkInDate: string;
  checkOutDate: string;
  source: 'Direct Web' | 'Walk-In' | 'MakeMyTrip' | 'Booking.com' | 'Corporate';
  totalAmount: number;
  advancePaid: number;
  status: 'Confirmed' | 'Pending Deposit' | 'Cancelled' | 'Checked In';
}

export const HotelReservations: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  // Initial Bookings Data
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'RES-8901',
      guestName: 'Vikram & Meera Singhania',
      phone: '+91 98200 11223',
      roomType: 'Executive Suite',
      roomNumber: 'Room 402',
      checkInDate: '2026-11-29',
      checkOutDate: '2026-12-02',
      source: 'Direct Web',
      totalAmount: 18500,
      advancePaid: 18500,
      status: 'Confirmed'
    },
    {
      id: 'RES-8902',
      guestName: 'Capgemini Corporate (Rahul Joshi)',
      phone: '+91 97110 44556',
      roomType: 'Deluxe King',
      roomNumber: 'Room 305',
      checkInDate: '2026-11-28',
      checkOutDate: '2026-11-30',
      source: 'Corporate',
      totalAmount: 9600,
      advancePaid: 5000,
      status: 'Checked In'
    },
    {
      id: 'RES-8903',
      guestName: 'Ananya Deshmukh',
      phone: '+91 99881 22334',
      roomType: 'Standard Queen',
      checkInDate: '2026-12-01',
      checkOutDate: '2026-12-03',
      source: 'MakeMyTrip',
      totalAmount: 7200,
      advancePaid: 7200,
      status: 'Confirmed'
    },
    {
      id: 'RES-8904',
      guestName: 'Sanjay Reddy',
      phone: '+91 98490 33445',
      roomType: 'Family Suite',
      checkInDate: '2026-12-05',
      checkOutDate: '2026-12-08',
      source: 'Walk-In',
      totalAmount: 24000,
      advancePaid: 0,
      status: 'Pending Deposit'
    }
  ]);

  // Modal Form State
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomType, setRoomType] = useState<'Deluxe King' | 'Executive Suite' | 'Standard Queen' | 'Family Suite'>('Deluxe King');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [source, setSource] = useState<'Direct Web' | 'Walk-In' | 'MakeMyTrip' | 'Booking.com' | 'Corporate'>('Direct Web');
  const [advance, setAdvance] = useState(3500);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone) return;

    const rateMap: Record<string, number> = {
      'Deluxe King': 4800,
      'Executive Suite': 6200,
      'Standard Queen': 3600,
      'Family Suite': 8000
    };

    const newBooking: BookingRecord = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      phone,
      roomType,
      checkInDate: checkIn || '2026-12-01',
      checkOutDate: checkOut || '2026-12-03',
      source,
      totalAmount: (rateMap[roomType] || 4800) * 2,
      advancePaid: advance,
      status: advance > 0 ? 'Confirmed' : 'Pending Deposit'
    };

    setBookings([newBooking, ...bookings]);
    setShowModal(false);
    setGuestName('');
    setPhone('');
    onNotify?.(`Booking ${newBooking.id} confirmed for ${guestName}! WhatsApp voucher dispatched.`);
  };

  const filtered = bookings.filter(b => {
    const matchesSearch = b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'ALL' || b.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <BookmarkCheck className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Reservations & Central Booking Engine</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Manage direct web bookings, walk-ins, OTA reservations, and advance deposit receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Reservation vouchers and arrivals sheet downloaded!')}
            className="px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Arrivals Sheet</span>
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Reservation</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Total Bookings</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">{bookings.length} Stays</div>
          <span className="text-[11px] text-emerald-700 font-bold">85% Pipeline Pacing</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Advance Collected</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            ₹{bookings.reduce((sum, b) => sum + b.advancePaid, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400">Escrow Account</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Direct vs OTA</span>
          <div className="text-xl font-extrabold text-[#5B21B6] mt-1">62% Direct</div>
          <span className="text-[11px] text-emerald-700 font-bold">Zero commission saved</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Pending Advance</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">
            {bookings.filter(b => b.status === 'Pending Deposit').length} Holds
          </div>
          <span className="text-[11px] text-gray-400">Auto-expires in 4 hrs</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by guest name or Ref ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Direct Web', 'MakeMyTrip', 'Corporate', 'Walk-In'].map(src => (
            <button
              key={src}
              type="button"
              onClick={() => setSourceFilter(src)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                sourceFilter === src ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Booking Ref</th>
                <th className="px-4 py-3">Guest Profile</th>
                <th className="px-4 py-3">Room & Stay Dates</th>
                <th className="px-4 py-3">Source Channel</th>
                <th className="px-4 py-3">Tariff & Advance</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3 font-extrabold text-[#5B21B6]">{b.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-gray-900">{b.guestName}</div>
                    <div className="text-[11px] text-gray-400">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-gray-800">{b.roomType} {b.roomNumber ? `(${b.roomNumber})` : ''}</div>
                    <div className="text-[11px] text-gray-500">{b.checkInDate} to {b.checkOutDate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-lg">
                      <Globe className="w-3 h-3 text-gray-500" />
                      {b.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-gray-900">₹{b.totalAmount.toLocaleString('en-IN')}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">Advance: ₹{b.advancePaid.toLocaleString('en-IN')}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      b.status === 'Checked In' ? 'bg-purple-100 text-[#5B21B6]' :
                      b.status === 'Pending Deposit' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onNotify?.(`Booking voucher re-sent via WhatsApp to ${b.guestName}!`)}
                      className="text-[11px] text-[#5B21B6] font-bold hover:underline cursor-pointer"
                    >
                      WhatsApp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Booking */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Create New Reservation</h3>
            <form onSubmit={handleCreateBooking} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Mahindra"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98480 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Room Category</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  >
                    <option value="Deluxe King">Deluxe King (₹4,800/night)</option>
                    <option value="Executive Suite">Executive Suite (₹6,200/night)</option>
                    <option value="Standard Queen">Standard Queen (₹3,600/night)</option>
                    <option value="Family Suite">Family Suite (₹8,000/night)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Booking Channel</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  >
                    <option value="Direct Web">Direct Web Engine</option>
                    <option value="Walk-In">Front Desk Walk-In</option>
                    <option value="MakeMyTrip">MakeMyTrip</option>
                    <option value="Booking.com">Booking.com</option>
                    <option value="Corporate">Corporate Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Check-In Date</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Check-Out Date</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Advance Deposit Received (₹)</label>
                <input
                  type="number"
                  placeholder="3500"
                  value={advance}
                  onChange={(e) => setAdvance(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B21B6] text-white text-xs font-bold rounded-xl hover:bg-[#4C1D95] cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
