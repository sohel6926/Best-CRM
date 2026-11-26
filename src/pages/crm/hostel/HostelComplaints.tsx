import React, { useState } from 'react';
import { 
  Wrench, CheckCircle2, Clock, AlertCircle, 
  Plus, Search, User, Filter, Camera, ArrowRight
} from 'lucide-react';

interface Ticket {
  id: string;
  category: 'Plumbing & Taps' | 'AC & Electrical' | 'High-Speed Wi-Fi' | 'Carpentry & Lock' | 'Daily Housekeeping';
  roomNumber: string;
  residentName: string;
  issueDescription: string;
  priority: 'Urgent' | 'High' | 'Normal';
  reportedDate: string;
  assignedStaff: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

export const HostelComplaints: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TCK-201',
      category: 'AC & Electrical',
      roomNumber: 'Room 101',
      residentName: 'Rohan Sharma',
      issueDescription: 'Split AC showing error code E4 and not cooling properly',
      priority: 'Urgent',
      reportedDate: 'Today, 09:15 AM',
      assignedStaff: 'Ramesh (Electrician)',
      status: 'In Progress'
    },
    {
      id: 'TCK-202',
      category: 'High-Speed Wi-Fi',
      roomNumber: 'Room 202',
      residentName: 'Sneha Patel',
      issueDescription: 'Wi-Fi 6 access point on 1st Floor dropping connection during online class',
      priority: 'High',
      reportedDate: 'Today, 10:30 AM',
      assignedStaff: 'Vinod (Network Tech)',
      status: 'Open'
    },
    {
      id: 'TCK-203',
      category: 'Plumbing & Taps',
      roomNumber: 'Room 203',
      residentName: 'Kavita Das',
      issueDescription: 'Bathroom washbasin mixer tap dripping continuously',
      priority: 'Normal',
      reportedDate: 'Yesterday, 04:00 PM',
      assignedStaff: 'Shankar (Plumber)',
      status: 'Resolved'
    },
    {
      id: 'TCK-204',
      category: 'Carpentry & Lock',
      roomNumber: 'Room 102',
      residentName: 'Karthik Raja',
      issueDescription: 'Wardrobe drawer lock jammed; key turning loosely',
      priority: 'Normal',
      reportedDate: '24 Nov 2026',
      assignedStaff: 'Babu Carpenter',
      status: 'Resolved'
    }
  ]);

  const [filterCat, setFilterCat] = useState('All');

  const resolveTicket = (id: string) => {
    setTickets(prev => 
      prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t)
    );
    onNotify?.("Complaint marked as resolved with resident OTP sign-off!");
  };

  const openTickets = tickets.filter(t => t.status !== 'Resolved').length;

  const filtered = filterCat === 'All' 
    ? tickets 
    : tickets.filter(t => t.category === filterCat);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Maintenance & Complaints Ticketing Desk</h2>
            <p className="text-sm text-gray-500">Track resident repairs (Plumbing, AC, High-Speed Wi-Fi, Carpentry, Housekeeping) with fast SLA timers</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Resident Maintenance Ticket Form opened")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Raise Maintenance Ticket
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Active Open Tickets</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">{openTickets} Pending</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Assigned to duty technicians</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Avg Resolution Turnaround</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">2.4 Hours</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Guaranteed same-day repair</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Resident Satisfaction Rating</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">4.8 / 5.0 ⭐</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">High Google Reviews impact</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Tickets Closed</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {tickets.filter(t => t.status === 'Resolved').length} Resolved
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">With photo evidence verify</div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <div className="flex flex-wrap gap-2">
            {['All', 'AC & Electrical', 'High-Speed Wi-Fi', 'Plumbing & Taps', 'Carpentry & Lock'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterCat === cat ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Room & Resident</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Issue Description</th>
                <th className="py-3 px-4 text-center">Priority</th>
                <th className="py-3 px-4">Handyman Assigned</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-purple-900">{t.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{t.roomNumber}</div>
                    <div className="text-[10px] text-gray-500">{t.residentName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-800 border border-purple-100">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 max-w-xs">{t.issueDescription}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      t.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                      t.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 font-medium">{t.assignedStaff}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      t.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      t.status === 'In Progress' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {t.status !== 'Resolved' ? (
                      <button 
                        onClick={() => resolveTicket(t.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-[11px] flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Closed
                      </span>
                    )}
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
