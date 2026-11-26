import React, { useState } from 'react';
import { 
  Users, UserPlus, Phone, ShieldCheck, FileCheck, 
  Search, Filter, ExternalLink, Calendar, MapPin, AlertCircle, Share2
} from 'lucide-react';

interface Resident {
  id: string;
  name: string;
  roomBed: string; // e.g. "Room 101 - Bed A"
  phone: string;
  email: string;
  institution: string; // College or Corporate company
  role: 'Student' | 'Working Professional';
  parentName: string;
  parentPhone: string;
  bloodGroup: string;
  joiningDate: string;
  kycVerified: boolean;
  rentStatus: 'Paid' | 'Due' | 'Overdue';
  monthlyRent: number;
}

export const HostelResidents: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const [residents, setResidents] = useState<Resident[]>([
    {
      id: 'res-1',
      name: 'Rohan Sharma',
      roomBed: 'Room 101 - Bed A',
      phone: '+91 98210 44921',
      email: 'rohan.sharma@iith.ac.in',
      institution: 'IIT Hyderabad (B.Tech CS)',
      role: 'Student',
      parentName: 'Surendra Sharma',
      parentPhone: '+91 94140 12891',
      bloodGroup: 'B+',
      joiningDate: '15 Jul 2025',
      kycVerified: true,
      rentStatus: 'Paid',
      monthlyRent: 11500
    },
    {
      id: 'res-2',
      name: 'Aditya Varma',
      roomBed: 'Room 101 - Bed B',
      phone: '+91 99881 22340',
      email: 'aditya.v@tcs.com',
      institution: 'Tata Consultancy Services',
      role: 'Working Professional',
      parentName: 'V. R. K. Varma',
      parentPhone: '+91 98480 33412',
      bloodGroup: 'O+',
      joiningDate: '01 Sep 2025',
      kycVerified: true,
      rentStatus: 'Paid',
      monthlyRent: 11500
    },
    {
      id: 'res-3',
      name: 'Pooja Iyer',
      roomBed: 'Room 201 - Bed A',
      phone: '+91 97112 88401',
      email: 'pooja.iyer@amazon.com',
      institution: 'Amazon Development Centre',
      role: 'Working Professional',
      parentName: 'Subramanian Iyer',
      parentPhone: '+91 94440 88921',
      bloodGroup: 'A+',
      joiningDate: '10 Aug 2025',
      kycVerified: true,
      rentStatus: 'Paid',
      monthlyRent: 12500
    },
    {
      id: 'res-4',
      name: 'Sneha Patel',
      roomBed: 'Room 202 - Bed A',
      phone: '+91 96541 33201',
      email: 'sneha.p@osmania.ac.in',
      institution: 'Osmania Medical College (MBBS)',
      role: 'Student',
      parentName: 'Bhavin Patel',
      parentPhone: '+91 98250 44981',
      bloodGroup: 'AB+',
      joiningDate: '01 Oct 2025',
      kycVerified: true,
      rentStatus: 'Due',
      monthlyRent: 9000
    },
    {
      id: 'res-5',
      name: 'Karthik Raja',
      roomBed: 'Room 102 - Bed A',
      phone: '+91 99001 77412',
      email: 'karthik.raja@bits.edu',
      institution: 'BITS Pilani Hyderabad',
      role: 'Student',
      parentName: 'Raja Sundaram',
      parentPhone: '+91 94431 00219',
      bloodGroup: 'O-',
      joiningDate: '12 Jul 2025',
      kycVerified: true,
      rentStatus: 'Overdue',
      monthlyRent: 8500
    }
  ]);

  const filtered = residents.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.roomBed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || r.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Resident Master Directory & Digital KYC</h2>
            <p className="text-sm text-gray-500">Student & professional profiles, emergency parent contacts, Aadhaar proofs & admission agreements</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Opening Resident Admission Form...")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <UserPlus className="w-4 h-4" /> Register New Resident
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Registered Residents</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{residents.length} Active</div>
          <div className="text-[11px] text-gray-500 mt-0.5">100% Police Verified & KYC</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">College Students</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {residents.filter(r => r.role === 'Student').length} Students
          </div>
          <div className="text-[11px] text-purple-600 mt-0.5">IIT, BITS & Medical Colleges</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Working Professionals</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {residents.filter(r => r.role === 'Working Professional').length} Corporate
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Tech parks & IT Corridors</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Pending Rent Clearance</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">
            {residents.filter(r => r.rentStatus !== 'Paid').length} Residents
          </div>
          <div className="text-[11px] text-amber-600 mt-0.5">Automated WhatsApp alert ready</div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <div className="flex flex-wrap gap-2">
            {['All', 'Student', 'Working Professional'].map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  roleFilter === role ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search by name, room or college..."
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
                <th className="py-3 px-4">Resident Name</th>
                <th className="py-3 px-4">Room & Bed</th>
                <th className="py-3 px-4">College / Corporate Firm</th>
                <th className="py-3 px-4">Parent / Guardian Contact</th>
                <th className="py-3 px-4 text-center">KYC & Aadhaar</th>
                <th className="py-3 px-4 text-right">Monthly Rent</th>
                <th className="py-3 px-4 text-center">Rent Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(res => (
                <tr key={res.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{res.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{res.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 bg-purple-50 text-purple-800 font-bold rounded border border-purple-100">
                      {res.roomBed}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div>{res.institution}</div>
                    <span className="text-[10px] text-gray-400 font-medium">Blood: {res.bloodGroup}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <div>{res.parentName}</div>
                    <div className="text-[10px] text-purple-700 font-mono font-medium">{res.parentPhone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-purple-950">
                    ₹{res.monthlyRent.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      res.rentStatus === 'Paid' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : res.rentStatus === 'Due' 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {res.rentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Sending WhatsApp notice to ${res.name} and parent ${res.parentName}`)}
                      className="p-1.5 text-gray-400 hover:text-purple-700 rounded-lg"
                      title="Send WhatsApp Info"
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
