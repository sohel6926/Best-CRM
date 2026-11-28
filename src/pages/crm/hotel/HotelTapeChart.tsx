import React, { useState } from 'react';
import { 
  Building2, Calendar, CheckCircle2, Clock, 
  AlertCircle, Plus, Search, Filter, ArrowRight, User
} from 'lucide-react';

interface RoomSlot {
  roomNo: string;
  type: 'Executive Suite' | 'Deluxe AC' | 'Premium Balcony' | 'Standard Double';
  floor: string;
  ratePerNight: number;
  status: 'Occupied' | 'Confirmed' | 'Cleaning in Progress' | 'Maintenance';
  guestName?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export const HotelTapeChart: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedFloor, setSelectedFloor] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const [rooms, setRooms] = useState<RoomSlot[]>([
    { roomNo: '101', type: 'Executive Suite', floor: '1st Floor', ratePerNight: 5500, status: 'Occupied', guestName: 'Dr. Vikramaditya Varma', checkInDate: '24 Nov', checkOutDate: '28 Nov' },
    { roomNo: '102', type: 'Executive Suite', floor: '1st Floor', ratePerNight: 5500, status: 'Confirmed', guestName: 'Ananya Deshmukh (MakeMyTrip)', checkInDate: 'Tonight 06:00 PM', checkOutDate: '29 Nov' },
    { roomNo: '103', type: 'Deluxe AC', floor: '1st Floor', ratePerNight: 3800, status: 'Occupied', guestName: 'Sanjay & Sunita Singhal', checkInDate: '25 Nov', checkOutDate: '27 Nov' },
    { roomNo: '104', type: 'Deluxe AC', floor: '1st Floor', ratePerNight: 3800, status: 'Cleaning in Progress', guestName: 'Housekeeping: Geeta Bai', checkInDate: 'Checked out 11 AM', checkOutDate: 'Ready by 2 PM' },
    { roomNo: '201', type: 'Premium Balcony', floor: '2nd Floor', ratePerNight: 4600, status: 'Occupied', guestName: 'Capt. Rajesh Narayanan', checkInDate: '23 Nov', checkOutDate: '30 Nov' },
    { roomNo: '202', type: 'Premium Balcony', floor: '2nd Floor', ratePerNight: 4600, status: 'Confirmed', guestName: 'Rohan Mehra (Booking.com)', checkInDate: 'Tonight 08:00 PM', checkOutDate: '28 Nov' },
    { roomNo: '203', type: 'Standard Double', floor: '2nd Floor', ratePerNight: 2800, status: 'Occupied', guestName: 'Kishore Kumar (Corporate TCS)', checkInDate: '26 Nov', checkOutDate: '28 Nov' },
    { roomNo: '204', type: 'Standard Double', floor: '2nd Floor', ratePerNight: 2800, status: 'Maintenance', guestName: 'Bathroom Plumbing Repair', checkInDate: 'Blocked', checkOutDate: 'Opens 27 Nov' },
  ]);

  const totalRooms = rooms.length;
  const occupiedCount = rooms.filter(r => r.status === 'Occupied').length;
  const confirmedArrivals = rooms.filter(r => r.status === 'Confirmed').length;
  const occupancyPercent = Math.round((occupiedCount / totalRooms) * 100);

  const filtered = rooms.filter(r => {
    const matchesFloor = selectedFloor === 'All' || r.floor === selectedFloor;
    const matchesType = selectedType === 'All' || r.type === selectedType;
    return matchesFloor && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Tonight's Occupancy</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{occupancyPercent}% Occupied</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">{occupiedCount} of {totalRooms} rooms filled</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Expected Check-Ins Tonight</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{confirmedArrivals} Arrivals</div>
          <div className="text-[11px] text-purple-600 mt-0.5">OTA & Direct Pre-Bookings</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Average Room Price</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹4,175</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Average earnings per room</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Rooms Being Cleaned</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">1 Room</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Housekeeping in progress</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Filter Floor</label>
            <select
              value={selectedFloor}
              onChange={e => setSelectedFloor(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg focus:outline-none"
            >
              <option value="All">All Floors</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Room Category</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Deluxe AC">Deluxe AC</option>
              <option value="Premium Balcony">Premium Balcony</option>
              <option value="Standard Double">Standard Double</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Occupied
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Confirmed Pre-Book
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Cleaning
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Maintenance
          </span>

          <button 
            onClick={() => onNotify?.("Direct Walk-in Reservation modal opened")}
            className="px-3.5 py-1.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 ml-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Book Walk-in
          </button>
        </div>
      </div>

      {/* Visual Room Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(room => (
          <div key={room.roomNo} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 space-y-4 hover:border-purple-300 transition-all">
            <div className="flex justify-between items-start pb-3 border-b border-purple-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-[#1E1B4B]">Room {room.roomNo}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    room.status === 'Occupied' ? 'bg-emerald-500' :
                    room.status === 'Confirmed' ? 'bg-blue-500' :
                    room.status === 'Cleaning in Progress' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{room.type} • {room.floor}</div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-[#5B21B6]">₹{room.ratePerNight.toLocaleString()}</div>
                <div className="text-[10px] text-gray-400">/ night</div>
              </div>
            </div>

            {/* Guest info card */}
            <div className={`p-3.5 rounded-xl border space-y-1.5 ${
              room.status === 'Occupied' ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' :
              room.status === 'Confirmed' ? 'bg-blue-50/50 border-blue-200 text-blue-950' :
              room.status === 'Cleaning in Progress' ? 'bg-amber-50/50 border-amber-200 text-amber-950' :
              'bg-rose-50/50 border-rose-200 text-rose-950'
            }`}>
              <div className="text-xs font-bold truncate">{room.guestName}</div>
              <div className="text-[11px] text-gray-600 flex justify-between">
                <span>Check-in: {room.checkInDate}</span>
                <span>Check-out: {room.checkOutDate}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                room.status === 'Occupied' ? 'bg-emerald-100 text-emerald-800' :
                room.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                room.status === 'Cleaning in Progress' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {room.status}
              </span>

              <button 
                onClick={() => onNotify?.(`Room ${room.roomNo} folio details opened`)}
                className="text-[#5B21B6] hover:underline font-bold flex items-center gap-1"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
