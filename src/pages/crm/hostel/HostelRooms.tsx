import React, { useState, useEffect } from 'react';
import { 
  BedDouble, CheckCircle2, AlertCircle, Clock, 
  Plus, Search, Filter, Shield, User, ArrowRight, Layers,
  Edit3, Trash2, X
} from 'lucide-react';

interface Bed {
  id: string;
  bedCode: string;
  status: 'Occupied' | 'Vacant' | 'Notice Period' | 'Under Maintenance';
  residentName?: string;
  monthlyRent: number;
}

interface Room {
  id: string;
  roomNumber: string;
  floor: 'Ground Floor' | '1st Floor' | '2nd Floor' | '3rd Floor';
  wing: 'Boys Wing A' | 'Boys Wing B' | 'Girls Wing C' | 'Executive Block';
  type: 'Private Single AC' | '2-Sharing AC' | '3-Sharing Non-AC' | '4-Sharing Economy';
  totalBeds: number;
  beds: Bed[];
  amenities: string[];
}

const INITIAL_ROOMS: Room[] = [
  {
    id: 'r-101',
    roomNumber: '101',
    floor: 'Ground Floor',
    wing: 'Boys Wing A',
    type: '2-Sharing AC',
    totalBeds: 2,
    amenities: ['Split AC', 'Attached Washroom', 'Study Table', 'Balcony'],
    beds: [
      { id: 'b-101a', bedCode: '101-A', status: 'Occupied', residentName: 'Rohan Sharma (IIT-H)', monthlyRent: 11500 },
      { id: 'b-101b', bedCode: '101-B', status: 'Occupied', residentName: 'Aditya Varma (TCS)', monthlyRent: 11500 },
    ]
  },
  {
    id: 'r-102',
    roomNumber: '102',
    floor: 'Ground Floor',
    wing: 'Boys Wing A',
    type: '3-Sharing Non-AC',
    totalBeds: 3,
    amenities: ['Ceiling Fan', 'Attached Washroom', 'Individual Wardrobes'],
    beds: [
      { id: 'b-102a', bedCode: '102-A', status: 'Occupied', residentName: 'Karthik Raja (BITS)', monthlyRent: 8500 },
      { id: 'b-102b', bedCode: '102-B', status: 'Vacant', monthlyRent: 8500 },
      { id: 'b-102c', bedCode: '102-C', status: 'Notice Period', residentName: 'Saurabh Jha (Vacating 30th)', monthlyRent: 8500 },
    ]
  },
  {
    id: 'r-103',
    roomNumber: '103',
    floor: 'Ground Floor',
    wing: 'Boys Wing A',
    type: 'Private Single AC',
    totalBeds: 1,
    amenities: ['1.5 Ton AC', 'Smart TV', 'Attached Washroom', 'Fridge'],
    beds: [
      { id: 'b-103a', bedCode: '103-Single', status: 'Occupied', residentName: 'Dr. Nikhil Kulkarni', monthlyRent: 18000 }
    ]
  },
  {
    id: 'r-201',
    roomNumber: '201',
    floor: '1st Floor',
    wing: 'Girls Wing C',
    type: '2-Sharing AC',
    totalBeds: 2,
    amenities: ['Split AC', 'Attached Washroom', 'Full Mirror', 'Wi-Fi 6'],
    beds: [
      { id: 'b-201a', bedCode: '201-A', status: 'Occupied', residentName: 'Pooja Iyer (Amazon)', monthlyRent: 12500 },
      { id: 'b-201b', bedCode: '201-B', status: 'Vacant', monthlyRent: 12500 },
    ]
  },
  {
    id: 'r-202',
    roomNumber: '202',
    floor: '1st Floor',
    wing: 'Girls Wing C',
    type: '3-Sharing Non-AC',
    totalBeds: 3,
    amenities: ['Attached Washroom', 'High-Speed Wi-Fi', 'Study Desks'],
    beds: [
      { id: 'b-202a', bedCode: '202-A', status: 'Occupied', residentName: 'Sneha Patel (Osmania Univ)', monthlyRent: 9000 },
      { id: 'b-202b', bedCode: '202-B', status: 'Occupied', residentName: 'Ananya Roy (Deloitte)', monthlyRent: 9000 },
      { id: 'b-202c', bedCode: '202-C', status: 'Occupied', residentName: 'Megha Reddy (Intern)', monthlyRent: 9000 },
    ]
  },
  {
    id: 'r-203',
    roomNumber: '203',
    floor: '1st Floor',
    wing: 'Girls Wing C',
    type: '4-Sharing Economy',
    totalBeds: 4,
    amenities: ['2 Bunk Beds', 'Attached Washroom', 'Individual Lockers'],
    beds: [
      { id: 'b-203a', bedCode: '203-A', status: 'Occupied', residentName: 'Kavita Das', monthlyRent: 6500 },
      { id: 'b-203b', bedCode: '203-B', status: 'Occupied', residentName: 'Simran Kaur', monthlyRent: 6500 },
      { id: 'b-203c', bedCode: '203-C', status: 'Vacant', monthlyRent: 6500 },
      { id: 'b-203d', bedCode: '203-D', status: 'Under Maintenance', monthlyRent: 6500 },
    ]
  }
];

export const HostelRooms: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedFloor, setSelectedFloor] = useState<string>('All');
  const [selectedWing, setSelectedWing] = useState<string>('All');

  const [rooms, setRooms] = useState<Room[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_hostel_rooms');
      return saved ? JSON.parse(saved) : INITIAL_ROOMS;
    } catch {
      return INITIAL_ROOMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bestcrm_hostel_rooms', JSON.stringify(rooms));
    } catch {}
  }, [rooms]);

  // Modal states
  const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [editingBed, setEditingBed] = useState<{ roomId: string; bed: Bed } | null>(null);

  // New room form
  const [newRoomNo, setNewRoomNo] = useState('');
  const [newFloor, setNewFloor] = useState<Room['floor']>('Ground Floor');
  const [newWing, setNewWing] = useState<Room['wing']>('Boys Wing A');
  const [newType, setNewType] = useState<Room['type']>('2-Sharing AC');
  const [newBedCount, setNewBedCount] = useState<number>(2);
  const [newRent, setNewRent] = useState<number>(10000);

  // Bed stats
  const allBeds = rooms.flatMap(r => r.beds);
  const totalBeds = allBeds.length;
  const occupiedBeds = allBeds.filter(b => b.status === 'Occupied').length;
  const vacantBeds = allBeds.filter(b => b.status === 'Vacant').length;
  const noticeBeds = allBeds.filter(b => b.status === 'Notice Period').length;
  const maintenanceBeds = allBeds.filter(b => b.status === 'Under Maintenance').length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  const filteredRooms = rooms.filter(r => {
    const matchFloor = selectedFloor === 'All' || r.floor === selectedFloor;
    const matchWing = selectedWing === 'All' || r.wing === selectedWing;
    return matchFloor && matchWing;
  });

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNo) return;
    const suffix = ['A', 'B', 'C', 'D', 'E', 'F'];
    const generatedBeds: Bed[] = Array.from({ length: newBedCount }).map((_, i) => ({
      id: `b-${newRoomNo}-${i}`,
      bedCode: `${newRoomNo}-${suffix[i] || i + 1}`,
      status: 'Vacant',
      monthlyRent: newRent,
    }));

    const newRoom: Room = {
      id: `r-${Date.now()}`,
      roomNumber: newRoomNo,
      floor: newFloor,
      wing: newWing,
      type: newType,
      totalBeds: newBedCount,
      beds: generatedBeds,
      amenities: ['Attached Washroom', 'Wi-Fi', 'Wardrobe'],
    };

    setRooms([...rooms, newRoom]);
    setAddRoomModalOpen(false);
    setNewRoomNo('');
    onNotify?.(`Added Room ${newRoomNo} with ${newBedCount} beds!`);
  };

  const handleSaveBed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBed) return;
    setRooms(rooms.map(r => {
      if (r.id === editingBed.roomId) {
        return {
          ...r,
          beds: r.beds.map(b => b.id === editingBed.bed.id ? editingBed.bed : b)
        };
      }
      return r;
    }));
    onNotify?.(`Updated Bed ${editingBed.bed.bedCode} status to ${editingBed.bed.status}!`);
    setEditingBed(null);
  };

  const handleDeleteRoom = (roomId: string, roomNumber: string) => {
    if (window.confirm(`Delete Room ${roomNumber} and its beds?`)) {
      setRooms(rooms.filter(r => r.id !== roomId));
      onNotify?.(`Deleted Room ${roomNumber}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner KPI Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Bed Capacity</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalBeds} Beds</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-0.5">{rooms.length} Active Rooms</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Occupied Beds</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{occupiedBeds} Beds</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">{occupancyRate}% Overall Occupancy</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Ready Vacant Beds</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{vacantBeds} Beds</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-0.5">Immediate Check-in ready</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Notice Period (Vacating)</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{noticeBeds} Beds</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Available for pre-booking</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Maintenance / Cleaning</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">{maintenanceBeds} Beds</div>
          <div className="text-[11px] text-rose-500 font-semibold mt-0.5">Mattress / Paint repair</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Select Floor</label>
            <select
              value={selectedFloor}
              onChange={e => setSelectedFloor(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg focus:outline-none"
            >
              <option value="All">All Floors</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
              <option value="3rd Floor">3rd Floor</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Select Wing</label>
            <select
              value={selectedWing}
              onChange={e => setSelectedWing(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-lg focus:outline-none"
            >
              <option value="All">All Wings</option>
              <option value="Boys Wing A">Boys Wing A</option>
              <option value="Boys Wing B">Boys Wing B</option>
              <option value="Girls Wing C">Girls Wing C</option>
              <option value="Executive Block">Executive Block</option>
            </select>
          </div>
        </div>

        {/* Legend & Action */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Occupied
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Vacant
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Notice
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Maintenance
          </span>

          <button 
            type="button"
            onClick={() => setAddRoomModalOpen(true)}
            className="px-3.5 py-1.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 ml-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Room
          </button>
        </div>
      </div>

      {/* Visual Floor & Room Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 space-y-4 hover:border-purple-300 transition-all">
            <div className="flex justify-between items-start pb-3 border-b border-purple-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-purple-950">Room {room.roomNumber}</span>
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-md border border-purple-100">
                    {room.type}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{room.floor} • {room.wing}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">
                  {room.beds.filter(b => b.status === 'Occupied').length}/{room.totalBeds} Filled
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteRoom(room.id, room.roomNumber)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                  title="Delete Room"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Individual Beds in this room - Click to Edit! */}
            <div className="space-y-2.5">
              {room.beds.map(bed => (
                <div 
                  key={bed.id}
                  onClick={() => setEditingBed({ roomId: room.id, bed: { ...bed } })}
                  title="Click to edit bed status, occupant or rent"
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer hover:shadow-xs hover:scale-[1.01] ${
                    bed.status === 'Occupied' 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : bed.status === 'Vacant'
                      ? 'bg-blue-50/50 border-blue-200 border-dashed hover:bg-blue-50'
                      : bed.status === 'Notice Period'
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg font-bold text-xs ${
                      bed.status === 'Occupied' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : bed.status === 'Vacant'
                        ? 'bg-blue-100 text-blue-800'
                        : bed.status === 'Notice Period'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      <BedDouble className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900">{bed.bedCode}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          bed.status === 'Occupied' ? 'bg-emerald-500' :
                          bed.status === 'Vacant' ? 'bg-blue-500' :
                          bed.status === 'Notice Period' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        <span className="text-[10px] font-bold text-gray-500 uppercase">({bed.status})</span>
                      </div>
                      <div className="text-[11px] text-gray-600 font-medium">
                        {bed.residentName || <span className="text-blue-700 font-semibold italic">Ready for Allocation (Click to Edit)</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-purple-900">₹{bed.monthlyRent.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-gray-400">/ month ✎</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Room Amenities */}
            <div className="pt-2 flex flex-wrap gap-1">
              {room.amenities.map((am, i) => (
                <span key={i} className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  {am}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bed Allocation & Status Modal */}
      {editingBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form onSubmit={handleSaveBed} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">Bed Allocation</span>
                <h3 className="text-base font-bold text-[#1E1B4B]">Edit Bed {editingBed.bed.bedCode}</h3>
              </div>
              <button type="button" onClick={() => setEditingBed(null)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Bed Status</label>
                <select
                  value={editingBed.bed.status}
                  onChange={(e) => setEditingBed({
                    ...editingBed,
                    bed: { ...editingBed.bed, status: e.target.value as any }
                  })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Occupied">Occupied</option>
                  <option value="Vacant">Vacant</option>
                  <option value="Notice Period">Notice Period (Vacating)</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Resident / Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Varma (Company/College)"
                  value={editingBed.bed.residentName || ''}
                  onChange={(e) => setEditingBed({
                    ...editingBed,
                    bed: { ...editingBed.bed, residentName: e.target.value }
                  })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Monthly Rent (₹)</label>
                <input
                  type="number"
                  required
                  value={editingBed.bed.monthlyRent}
                  onChange={(e) => setEditingBed({
                    ...editingBed,
                    bed: { ...editingBed.bed, monthlyRent: Number(e.target.value) }
                  })}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingBed(null)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Save Bed Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Room Modal */}
      {addRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form onSubmit={handleCreateRoom} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">New Room</span>
                <h3 className="text-base font-bold text-[#1E1B4B]">Add Room to Wing</h3>
              </div>
              <button type="button" onClick={() => setAddRoomModalOpen(false)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Room Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 301"
                  value={newRoomNo}
                  onChange={(e) => setNewRoomNo(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-gray-700">Floor</label>
                  <select
                    value={newFloor}
                    onChange={(e) => setNewFloor(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  >
                    <option value="Ground Floor">Ground Floor</option>
                    <option value="1st Floor">1st Floor</option>
                    <option value="2nd Floor">2nd Floor</option>
                    <option value="3rd Floor">3rd Floor</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700">Wing / Block</label>
                  <select
                    value={newWing}
                    onChange={(e) => setNewWing(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-xs text-[#1E1B4B]"
                  >
                    <option value="Boys Wing A">Boys Wing A</option>
                    <option value="Boys Wing B">Boys Wing B</option>
                    <option value="Girls Wing C">Girls Wing C</option>
                    <option value="Executive Block">Executive Block</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Sharing / Room Type</label>
                <select
                  value={newType}
                  onChange={(e) => {
                    const t = e.target.value as Room['type'];
                    setNewType(t);
                    setNewBedCount(t.includes('Single') ? 1 : t.includes('2-') ? 2 : t.includes('3-') ? 3 : 4);
                  }}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                >
                  <option value="Private Single AC">Private Single AC (1 Bed)</option>
                  <option value="2-Sharing AC">2-Sharing AC (2 Beds)</option>
                  <option value="3-Sharing Non-AC">3-Sharing Non-AC (3 Beds)</option>
                  <option value="4-Sharing Economy">4-Sharing Economy (4 Beds)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Monthly Rent per Bed (₹)</label>
                <input
                  type="number"
                  value={newRent}
                  onChange={(e) => setNewRent(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-200 p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setAddRoomModalOpen(false)}
                className="px-4 py-2 rounded-xl border text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-xs font-bold text-white shadow-xs cursor-pointer"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
