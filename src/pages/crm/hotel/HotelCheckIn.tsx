import React, { useState, useEffect } from 'react';
import { 
  UserCheck, ShieldCheck, FileText, Camera, Phone, 
  MapPin, CheckCircle2, Clock, Search, Plus, Share2,
  Edit3, Trash2, X
} from 'lucide-react';

export interface HotelGuest {
  id: string;
  grcNumber: string;
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

const INITIAL_GUESTS: HotelGuest[] = [
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
];

export const HotelCheckIn: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [guests, setGuests] = useState<HotelGuest[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_hotel_guests');
      return saved ? JSON.parse(saved) : INITIAL_GUESTS;
    } catch {
      return INITIAL_GUESTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bestcrm_hotel_guests', JSON.stringify(guests));
    } catch {}
  }, [guests]);

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<HotelGuest | null>(null);

  // New check-in form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRoom, setNewRoom] = useState('Room 105');
  const [newSource, setNewSource] = useState<HotelGuest['bookingSource']>('Direct Website');
  const [newOutDue, setNewOutDue] = useState('30 Nov 2026, 11:00 AM');

  const handleCreateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newG: HotelGuest = {
      id: `gst-${Date.now()}`,
      grcNumber: `GRC-2026-${880 + guests.length + 1}`,
      name: newName,
      phone: newPhone || '+91 98000 00000',
      email: newEmail || 'guest@example.com',
      roomAssigned: newRoom,
      nationality: 'Indian',
      idProofType: 'Aadhaar Card',
      idNumber: 'XXXX-XXXX-1234',
      bookingSource: newSource,
      policeFormCVerified: true,
      checkInTimestamp: 'Just now',
      checkOutDue: newOutDue,
      status: 'Checked-In',
    };
    setGuests([newG, ...guests]);
    setAddModalOpen(false);
    setNewName('');
    setNewPhone('');
    onNotify?.(`Checked in guest ${newName} to ${newRoom}!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest) return;
    setGuests(guests.map(g => g.id === editingGuest.id ? editingGuest : g));
    onNotify?.(`Updated folio for ${editingGuest.name}!`);
    setEditingGuest(null);
  };

  const handleDeleteGuest = (id: string, name: string) => {
    if (window.confirm(`Delete check-in record for ${name}?`)) {
      setGuests(guests.filter(g => g.id !== id));
      onNotify?.(`Removed guest folio #${id}`);
    }
  };

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
            <h2 className="text-xl font-bold text-gray-900">Guest Check-In & ID Verification</h2>
            <p className="text-sm text-gray-500">Fast guest check-in, Aadhaar/Passport ID records, room allocation, and digital signatures</p>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Quick Check-In
        </button>
      </div>

      {/* Guest Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Current Staying Guests ({guests.length})
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
                <th className="py-3 px-4 text-center">Status</th>
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
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      g.status === 'Checked-In' ? 'bg-emerald-100 text-emerald-800' :
                      g.status === 'Checked-Out' ? 'bg-gray-100 text-gray-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        type="button"
                        onClick={() => setEditingGuest({ ...g })}
                        className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg border border-purple-200 cursor-pointer"
                        title="Edit Guest Folio"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => onNotify?.(`Digital Keycard & Welcome WhatsApp sent to ${g.name}`)}
                        className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg border border-emerald-200 cursor-pointer"
                        title="Send Welcome WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDeleteGuest(g.id, g.name)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                        title="Delete Folio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Express Check-In Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form onSubmit={handleCreateCheckIn} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">New Check-In</span>
                <h3 className="text-base font-bold text-[#1E1B4B]">Guest Registration Card (GRC)</h3>
              </div>
              <button type="button" onClick={() => setAddModalOpen(false)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Guest Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98490 00000"
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="guest@domain.com"
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700">Room Assigned</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Booking Source</label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  >
                    <option value="Direct Website">Direct Website</option>
                    <option value="MakeMyTrip">MakeMyTrip</option>
                    <option value="Booking.com">Booking.com</option>
                    <option value="Corporate Walk-In">Corporate Walk-In</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Check-Out Due</label>
                <input
                  type="text"
                  value={newOutDue}
                  onChange={(e) => setNewOutDue(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Complete Check-In
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Guest Modal */}
      {editingGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form onSubmit={handleSaveEdit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">Edit Folio #{editingGuest.grcNumber}</span>
                <h3 className="text-base font-bold text-[#1E1B4B]">{editingGuest.name}</h3>
              </div>
              <button type="button" onClick={() => setEditingGuest(null)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Guest Name</label>
                <input
                  type="text"
                  required
                  value={editingGuest.name}
                  onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={editingGuest.phone}
                  onChange={(e) => setEditingGuest({ ...editingGuest, phone: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700">Room Assigned</label>
                  <input
                    type="text"
                    value={editingGuest.roomAssigned}
                    onChange={(e) => setEditingGuest({ ...editingGuest, roomAssigned: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Stay Status</label>
                  <select
                    value={editingGuest.status}
                    onChange={(e) => setEditingGuest({ ...editingGuest, status: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  >
                    <option value="Checked-In">Checked-In</option>
                    <option value="Pre-Registered">Pre-Registered</option>
                    <option value="Checked-Out">Checked-Out</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Check-Out Due Date/Time</label>
                <input
                  type="text"
                  value={editingGuest.checkOutDue}
                  onChange={(e) => setEditingGuest({ ...editingGuest, checkOutDue: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingGuest(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Save Folio Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
