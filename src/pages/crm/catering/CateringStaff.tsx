import React, { useState } from 'react';
import { 
  Users, UserPlus, Clock, CheckCircle, AlertTriangle, 
  Phone, Calendar, Award, Banknote, ShieldCheck, ChevronRight
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: 'Head Chef (Ustaad)' | 'Halwai / Sweet Master' | 'Tandoor Karigar' | 'Service Boy / Waiter' | 'Bartender' | 'Cleaner / Deg Washer';
  phone: string;
  dailyBhatta: number; // Daily wage in INR
  advancePaid: number;
  status: 'Confirmed' | 'Pending Attendance' | 'Paid & Cleared';
  assignedEvent: string;
}

export const CateringStaff: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedEvent, setSelectedEvent] = useState('Verma Royal Wedding (600 guests)');
  const [guestCount, setGuestCount] = useState(600);
  const [serviceRatio, setServiceRatio] = useState(25); // 1 server per 25 guests

  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: 'st-1', name: 'Master Chef Ramzan Ali', role: 'Head Chef (Ustaad)', phone: '+91 98210 44102', dailyBhatta: 3500, advancePaid: 1500, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
    { id: 'st-2', name: 'Kishore Halwai (Bengali Sweets)', role: 'Halwai / Sweet Master', phone: '+91 98451 22901', dailyBhatta: 2800, advancePaid: 1000, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
    { id: 'st-3', name: 'Munna Bhai Tandoor', role: 'Tandoor Karigar', phone: '+91 97112 00412', dailyBhatta: 1800, advancePaid: 500, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
    { id: 'st-4', name: 'Dinesh Kumar (Team Captain)', role: 'Service Boy / Waiter', phone: '+91 96541 33219', dailyBhatta: 1200, advancePaid: 0, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
    { id: 'st-5', name: 'Suraj & 15 Boys (Agency)', role: 'Service Boy / Waiter', phone: '+91 98114 99018', dailyBhatta: 10500, advancePaid: 3000, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
    { id: 'st-6', name: 'Deepak Mixologist', role: 'Bartender', phone: '+91 99230 11842', dailyBhatta: 2000, advancePaid: 1000, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
    { id: 'st-7', name: 'Bablu Deg Cleaning Crew', role: 'Cleaner / Deg Washer', phone: '+91 94120 77319', dailyBhatta: 2400, advancePaid: 1000, status: 'Confirmed', assignedEvent: 'Verma Royal Wedding' },
  ]);

  // Calculations
  const recommendedWaiters = Math.ceil(guestCount / serviceRatio);
  const totalWages = staffList.reduce((acc, curr) => acc + curr.dailyBhatta, 0);
  const totalAdvances = staffList.reduce((acc, curr) => acc + curr.advancePaid, 0);
  const balanceToPay = totalWages - totalAdvances;

  const markPaid = (id: string) => {
    setStaffList(prev => 
      prev.map(st => st.id === id ? { ...st, status: 'Paid & Cleared', advancePaid: st.dailyBhatta } : st)
    );
    onNotify?.("Staff bhatta marked as settled & cleared");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cooks, Halwai & Service Roster</h2>
            <p className="text-sm text-gray-500">Auto-calculate waiter count based on guest scale, track daily bhatta, and clear advances</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Opening staff deployment dialog...")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <UserPlus className="w-4 h-4" /> Add Crew Member
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Recommended Service Boys</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{recommendedWaiters} <span className="text-xs font-normal text-gray-500">crew</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Ratio: 1 waiter per {serviceRatio} guests</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Crew Daily Bhatta</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹{totalWages.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">{staffList.length} roster assignments</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Advances Handed Out</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalAdvances.toLocaleString()}</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Pre-event kitchen prep cash</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Post-Event Balance Due</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{balanceToPay.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Payable at midnight shift end</div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Assigned Kitchen & Dining Personnel ({staffList.length})
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Service Ratio:</span>
            <select
              value={serviceRatio}
              onChange={e => setServiceRatio(Number(e.target.value))}
              className="text-xs bg-purple-50 text-purple-900 font-bold px-2 py-1 rounded-lg border border-purple-200 focus:outline-none"
            >
              <option value={20}>1 per 20 guests (VIP Luxe)</option>
              <option value={25}>1 per 25 guests (Standard Buffet)</option>
              <option value={35}>1 per 35 guests (Economy)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Staff / Karigar Name</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4 text-right">Daily Bhatta</th>
                <th className="py-3 px-4 text-right">Advance Paid</th>
                <th className="py-3 px-4 text-right">Pending Balance</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {staffList.map(st => {
                const pending = st.dailyBhatta - st.advancePaid;
                return (
                  <tr key={st.id} className="hover:bg-purple-50/30 transition-all">
                    <td className="py-3.5 px-4 font-bold text-gray-900">{st.name}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 font-semibold rounded-md border border-purple-100">
                        {st.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-mono">{st.phone}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{st.dailyBhatta.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right text-amber-700 font-semibold">₹{st.advancePaid.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-purple-900">₹{pending.toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        st.status === 'Paid & Cleared' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {st.status !== 'Paid & Cleared' ? (
                        <button 
                          onClick={() => markPaid(st.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg shadow-sm"
                        >
                          Clear Bhatta
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Cleared
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
