import React, { useState } from 'react';
import { 
  UserCheck, ShieldCheck, FileText, Camera, Phone, 
  MapPin, CheckCircle2, Clock, Search, Plus, Share2
} from 'lucide-react';

interface HotelGuest {
  id: string;
  grcNumber: string; // Guest Registration Card No
  name: string;
  phone: string;
  email: string;
  roomAssigned: string;
  nationality: string;
  idProofType: 'Aadhaar Card' | 'Passport & Visa' | 'Driving License';
  idNumber: string;
  bookingSource: 'Direct Website' | 'MakeMyTrip' | 'Booking.com' | 'Corporate Walk-In';
  policeFormCVerified: boolean;
  checkInTimestamp: string;
  checkOutDue: string;
  status: 'Checked-In' | 'Pre-Registered' | 'Checked-Out';
}

export const HotelCheckIn: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [guests, setGuests] = useState<HotelGuest[]>([
    {
      id: 'gst-1',
      grcNumber: 'GRC-2026-881',
      name: 'Dr. Vikramaditya Varma',
      phone: '+91 98210 44102',
      email: 'vikram.varma@aiims.edu',
      roomAssigned: 'Suite 101',
      nationality: 'Indian',
      idProofType: 'Aadhaar Card',
      idNumber: 'XXXX-XXXX-4819',
      bookingSource: 'Direct Website',
      policeFormCVerified: true,
      checkInTimestamp: '24 Nov 2026, 02:15 PM',
      checkOutDue: '28 Nov 2026, 11:00 AM',
      status: 'Checked-In'
    },
    {
      id: 'gst-2',
      grcNumber: 'GRC-2026-882',
      name: 'Michael Henderson',
      phone: '+44 7911 123456',
      email: 'm.henderson@deloitte.co.uk',
      roomAssigned: 'Room 201',
      nationality: 'British',
      idProofType: 'Passport & Visa',
      idNumber: 'GBR-99210481 (Visa Valid: 2027)',
      bookingSource: 'Booking.com',
      policeFormCVerified: true,
      checkInTimestamp: '23 Nov 2026, 08:30 PM',
      checkOutDue: '30 Nov 2026, 12:00 PM',
      status: 'Checked-In'
    },
    {
      id: 'gst-3',
      grcNumber: 'GRC-2026-883',
      name: 'Ananya Deshmukh',
      phone: '+91 99100 87342',
      email: 'ananya.d@gmail.com',
      roomAssigned: 'Suite 102',
      nationality: 'Indian',
      idProofType: 'Aadhaar Card',
      idNumber: 'XXXX-XXXX-9901',
      bookingSource: 'MakeMyTrip',
      policeFormCVerified: false,
      checkInTimestamp: 'Pre-Reg (Arrival: 06:00 PM)',
      checkOutDue: '29 Nov 2026, 11:00 AM',
      status: 'Pre-Registered'
    }
  ]);

  const verifyFormC = (id: string) => {
    setGuests(prev => 
      prev.map(g => g.id === id ? { ...g, policeFormCVerified: true, status: 'Checked-In' } : g)
    );
    onNotify?.("Guest ID & Form C verified! Digital keycard issued.");
  };

  const filtered = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.roomAssigned.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.grcNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Express Check-In & Digital KYC Vault</h2>
            <p className="text-sm text-gray-500">60-second tablet check-in, digital guest signatures, passport/Aadhaar capture, and Form C police verification</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Express Check-In Modal opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Express 60s Check-In
        </button>
      </div>

      {/* Guest Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Registered In-House Guests ({guests.length})
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search guest, GRC or room..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-purple-200 rounded-xl text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-600 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">GRC & Guest</th>
                <th className="py-3 px-4">Room Assigned</th>
                <th className="py-3 px-4">Nationality & ID Proof</th>
                <th className="py-3 px-4">Booking Source</th>
                <th className="py-3 px-4">Check-In / Out Timings</th>
                <th className="py-3 px-4 text-center">Police KYC / Form C</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(g => (
                <tr key={g.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{g.name}</div>
                    <div className="text-[10px] text-purple-700 font-mono">{g.grcNumber} • {g.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 bg-purple-50 text-purple-800 font-bold rounded border border-purple-100">
                      {g.roomAssigned}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div className="font-semibold text-gray-900">{g.nationality} ({g.idProofType})</div>
                    <div className="text-[10px] text-gray-400 font-mono">{g.idNumber}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {g.bookingSource}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 text-[11px]">
                    <div>In: {g.checkInTimestamp}</div>
                    <div className="text-gray-400">Out: {g.checkOutDue}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {g.policeFormCVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <button 
                        onClick={() => verifyFormC(g.id)}
                        className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold rounded"
                      >
                        Verify ID Proof
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Digital Keycard & Welcome WhatsApp sent to ${g.name}`)}
                      className="p-1.5 text-gray-400 hover:text-purple-700 rounded-lg"
                      title="Send Welcome WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
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
