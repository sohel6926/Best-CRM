import React, { useState } from 'react';
import { 
  Users, Shield, Phone, Clock, CheckCircle2, 
  Calendar, Award, UserPlus, DollarSign, Sparkles
} from 'lucide-react';

interface HostelStaffMember {
  id: string;
  name: string;
  role: 'Resident Warden' | 'Night Security Guard' | 'Day Security Guard' | 'Head Mess Cook' | 'Kitchen Helper' | 'Daily Housekeeper / Sweeper';
  phone: string;
  shiftTiming: string;
  monthlySalary: number;
  advanceTaken: number;
  todayAttendance: 'Present' | 'On Leave' | 'Night Duty';
}

export const HostelStaff: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [staff, setStaff] = useState<HostelStaffMember[]>([
    {
      id: 'st-1',
      name: 'Col. R. S. Rathore (Retd.)',
      role: 'Resident Warden',
      phone: '+91 98210 11200',
      shiftTiming: '24/7 Campus Resident',
      monthlySalary: 45000,
      advanceTaken: 0,
      todayAttendance: 'Present'
    },
    {
      id: 'st-2',
      name: 'Bahadur Singh (Ex-Army)',
      role: 'Night Security Guard',
      phone: '+91 97110 44321',
      shiftTiming: '08:00 PM - 08:00 AM',
      monthlySalary: 18500,
      advanceTaken: 2000,
      todayAttendance: 'Night Duty'
    },
    {
      id: 'st-3',
      name: 'Mohan Lal',
      role: 'Day Security Guard',
      phone: '+91 96540 22109',
      shiftTiming: '08:00 AM - 08:00 PM',
      monthlySalary: 16500,
      advanceTaken: 0,
      todayAttendance: 'Present'
    },
    {
      id: 'st-4',
      name: 'Ustaad Maharaj Badri Prasad',
      role: 'Head Mess Cook',
      phone: '+91 98450 99812',
      shiftTiming: '06:00 AM - 02:00 PM & 06:00 PM - 09:30 PM',
      monthlySalary: 28000,
      advanceTaken: 5000,
      todayAttendance: 'Present'
    },
    {
      id: 'st-5',
      name: 'Sunita Bai',
      role: 'Daily Housekeeper / Sweeper',
      phone: '+91 99002 33418',
      shiftTiming: '07:00 AM - 04:00 PM',
      monthlySalary: 14000,
      advanceTaken: 1000,
      todayAttendance: 'Present'
    }
  ]);

  const totalMonthlyPayroll = staff.reduce((sum, s) => sum + s.monthlySalary, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hostel Warden, Security & Housekeeping Roster</h2>
            <p className="text-sm text-gray-500">24/7 security guard shifts, daily housekeeping checklist, warden night desk & staff payroll</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Add Staff dialog opened")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Add Staff Member
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total On-Campus Staff</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{staff.length} Members</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Warden, Guards, Cooks & Maids</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Monthly Payroll</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹{totalMonthlyPayroll.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Monthly salary budget</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Night Security Cover</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">100% Armed / Ex-Army</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Campus perimeter safe</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Daily Room Cleaning Status</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">Floor 1 & 2 Completed</div>
          <div className="text-[11px] text-blue-600 mt-0.5">Bathrooms sanitized daily</div>
        </div>
      </div>

      {/* Staff Roster Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Staff Directory & Duty Shifts ({staff.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Duty Shift Timing</th>
                <th className="py-3 px-4 text-right">Monthly Salary</th>
                <th className="py-3 px-4 text-right">Advance Taken</th>
                <th className="py-3 px-4 text-center">Today's Attendance</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {staff.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{s.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 font-semibold rounded border border-purple-100 text-[11px]">
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono">{s.phone}</td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">{s.shiftTiming}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{s.monthlySalary.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right text-amber-700 font-semibold">
                    {s.advanceTaken > 0 ? `₹${s.advanceTaken.toLocaleString()}` : '—'}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      s.todayAttendance === 'Present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      s.todayAttendance === 'Night Duty' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {s.todayAttendance}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Staff wage slip printed for ${s.name}`)}
                      className="text-purple-700 hover:text-purple-900 font-bold"
                    >
                      Salary Slip
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
