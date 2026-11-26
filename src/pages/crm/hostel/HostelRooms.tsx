import React, { useState } from 'react';
import { 
  BedDouble, CheckCircle2, AlertCircle, Clock, 
  Plus, Search, Filter, Shield, User, ArrowRight, Layers
} from 'lucide-react';

interface Bed {
  id: string;
  bedCode: string; // e.g., "101-A", "101-B"
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

export const HostelRooms: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedFloor, setSelectedFloor] = useState<string>('All');
  const [selectedWing, setSelectedWing] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const [rooms, setRooms] = useState<Room[]>([
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
  ]);

  // Bed stats
  const allBeds = rooms.flatMap(r => r.beds);
  const totalBeds = allBeds.length;
  const occupiedBeds = allBeds.filter(b => b.status === 'Occupied').length;
  const vacantBeds = allBeds.filter(b => b.status === 'Vacant').length;
  const noticeBeds = allBeds.filter(b => b.status === 'Notice Period').length;
  const maintenanceBeds = allBeds.filter(b => b.status === 'Under Maintenance').length;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const filteredRooms = rooms.filter(r => {
    const matchFloor = selectedFloor === 'All' || r.floor === selectedFloor;
    const matchWing = selectedWing === 'All' || r.wing === selectedWing;
    return matchFloor && matchWing;
  });

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
              <option value="Girls Wing C">Girls Wing C</option>
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Occupied
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Vacant
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Notice Period
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Maintenance
          </span>

          <button 
            onClick={() => onNotify?.("New Room Addition Modal Opened")}
            className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 ml-2 shadow-sm"
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

              <div className="text-right">
                <span className="text-xs font-bold text-gray-600">
                  {room.beds.filter(b => b.status === 'Occupied').length}/{room.totalBeds} Filled
                </span>
              </div>
            </div>

            {/* Individual Beds in this room */}
            <div className="space-y-2.5">
              {room.beds.map(bed => (
                <div 
                  key={bed.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    bed.status === 'Occupied' 
                      ? 'bg-emerald-50/40 border-emerald-200' 
                      : bed.status === 'Vacant'
                      ? 'bg-blue-50/50 border-blue-200 border-dashed hover:bg-blue-50'
                      : bed.status === 'Notice Period'
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-rose-50/40 border-rose-200'
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
                      </div>
                      <div className="text-[11px] text-gray-600 font-medium">
                        {bed.residentName || <span className="text-blue-700 font-semibold italic">Ready for Allocation</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-purple-900">₹{bed.monthlyRent.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400">/ month</div>
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
    </div>
  );
};
