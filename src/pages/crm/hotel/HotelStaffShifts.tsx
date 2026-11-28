import React, { useState } from 'react';
import { 
  Users, Clock, Calendar, CheckCircle2, AlertCircle, 
  Search, Plus, ShieldCheck, UserCheck, DollarSign, Filter
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: 'Front Desk' | 'Housekeeping' | 'F&B Service' | 'Kitchen' | 'Security';
  shift: 'Morning (07:00 - 15:30)' | 'Evening (15:00 - 23:30)' | 'Night (23:00 - 07:30)';
  status: 'On Duty' | 'Off Duty' | 'On Leave';
  attendanceToday: 'Present' | 'Late' | 'Absent';
  monthlySalary: number;
  phone: string;
}

export const HotelStaffShifts: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShift, setSelectedShift] = useState('ALL');

  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: 'STF-01',
      name: 'Rajesh Goud',
      role: 'Front Desk',
      shift: 'Morning (07:00 - 15:30)',
      status: 'On Duty',
      attendanceToday: 'Present',
      monthlySalary: 28000,
      phone: '+91 98481 11223'
    },
    {
      id: 'STF-02',
      name: 'Sunita Mehra',
      role: 'Housekeeping',
      shift: 'Morning (07:00 - 15:30)',
      status: 'On Duty',
      attendanceToday: 'Present',
      monthlySalary: 18500,
      phone: '+91 97011 22334'
    },
    {
      id: 'STF-03',
      name: 'Vikram Chary',
      role: 'Front Desk',
      shift: 'Evening (15:00 - 23:30)',
      status: 'Off Duty',
      attendanceToday: 'Present',
      monthlySalary: 26000,
      phone: '+91 98882 33445'
    },
    {
      id: 'STF-04',
      name: 'Chef Harish Rawat',
      role: 'Kitchen',
      shift: 'Morning (07:00 - 15:30)',
      status: 'On Duty',
      attendanceToday: 'Present',
      monthlySalary: 38000,
      phone: '+91 99123 44556'
    },
    {
      id: 'STF-05',
      name: 'M. Ramesh',
      role: 'Security',
      shift: 'Night (23:00 - 07:30)',
      status: 'Off Duty',
      attendanceToday: 'Present',
      monthlySalary: 19000,
      phone: '+91 94411 55667'
    }
  ]);

  const toggleDuty = (id: string) => {
    setStaffList(staffList.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'On Duty' ? 'Off Duty' : 'On Duty';
        onNotify?.(`${s.name} marked ${nextStatus}`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const filtered = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesShift = selectedShift === 'ALL' || s.shift.startsWith(selectedShift);
    return matchesSearch && matchesShift;
  });

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Clock className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Hotel Staff Roster & Duty Shifts</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Manage front desk rotations, housekeeping floor allocations, and biometric attendance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify?.('Today’s hotel duty roster sent to staff WhatsApp group!')}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <Calendar className="w-4 h-4" />
          <span>Publish Shift Roster</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Currently On Duty</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            {staffList.filter(s => s.status === 'On Duty').length} / {staffList.length} Staff
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">100% Floor Coverage</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Morning Shift Staff</span>
          <div className="text-xl font-extrabold text-[#5B21B6] mt-1">3 Active</div>
          <span className="text-[11px] text-gray-400">Ends at 03:30 PM</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Evening Shift Handover</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">1 Checked In</div>
          <span className="text-[11px] text-gray-400">Briefing at 03:00 PM</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Monthly Payroll Estimate</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            ₹{staffList.reduce((sum, s) => sum + s.monthlySalary, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400">5 Team Members</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'Morning', 'Evening', 'Night'].map(shift => (
            <button
              key={shift}
              type="button"
              onClick={() => setSelectedShift(shift)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedShift === shift ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {shift}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Staff Profile</th>
                <th className="px-4 py-3">Role & Dept</th>
                <th className="px-4 py-3">Assigned Shift</th>
                <th className="px-4 py-3">Monthly Pay</th>
                <th className="px-4 py-3">Duty Status</th>
                <th className="px-4 py-3 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-gray-900">{s.name}</div>
                    <div className="text-[11px] text-gray-400">{s.id} • {s.phone}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-[#5B21B6]">{s.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-800 font-semibold">{s.shift}</div>
                    <div className="text-[10px] text-emerald-700">Today: {s.attendanceToday}</div>
                  </td>
                  <td className="px-4 py-3 font-extrabold text-gray-900">
                    ₹{s.monthlySalary.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      s.status === 'On Duty' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleDuty(s.id)}
                      className="px-2.5 py-1 bg-purple-50 text-[#5B21B6] hover:bg-purple-100 font-bold rounded-lg text-[11px] transition cursor-pointer"
                    >
                      {s.status === 'On Duty' ? 'Mark Off-Duty' : 'Punch In'}
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
