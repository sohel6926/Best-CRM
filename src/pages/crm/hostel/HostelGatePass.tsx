import React, { useState } from 'react';
import { 
  ShieldAlert, Clock, CheckCircle2, XCircle, AlertTriangle, 
  Search, Phone, Calendar, ArrowRight, UserCheck, MessageSquare
} from 'lucide-react';

interface GatePassEntry {
  id: string;
  residentName: string;
  roomBed: string;
  type: 'Daily Outing' | 'Night Out / Home Leave' | 'Late Entry';
  outTime: string;
  expectedInTime: string;
  actualInTime?: string;
  reason: string;
  parentConsentVerified: boolean;
  parentPhone: string;
  status: 'Approved & Out' | 'Returned On Time' | 'Curfew Violation' | 'Pending Approval';
}

export const HostelGatePass: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [entries, setEntries] = useState<GatePassEntry[]>([
    {
      id: 'gp-101',
      residentName: 'Rohan Sharma',
      roomBed: 'Room 101 - Bed A',
      type: 'Daily Outing',
      outTime: '06:00 PM',
      expectedInTime: '09:00 PM',
      actualInTime: '08:45 PM',
      reason: 'Library study session at IIT campus',
      parentConsentVerified: true,
      parentPhone: '+91 94140 12891',
      status: 'Returned On Time'
    },
    {
      id: 'gp-102',
      residentName: 'Karthik Raja',
      roomBed: 'Room 102 - Bed A',
      type: 'Late Entry',
      outTime: '05:30 PM',
      expectedInTime: '09:30 PM',
      actualInTime: '10:45 PM',
      reason: 'College annual fest rehearsal',
      parentConsentVerified: true,
      parentPhone: '+91 94431 00219',
      status: 'Curfew Violation'
    },
    {
      id: 'gp-103',
      residentName: 'Sneha Patel',
      roomBed: 'Room 202 - Bed A',
      type: 'Night Out / Home Leave',
      outTime: 'Nov 27, 08:00 AM',
      expectedInTime: 'Nov 30, 08:00 PM',
      reason: 'Going to native hometown for family wedding',
      parentConsentVerified: true,
      parentPhone: '+91 98250 44981',
      status: 'Approved & Out'
    },
    {
      id: 'gp-104',
      residentName: 'Aditya Varma',
      roomBed: 'Room 101 - Bed B',
      type: 'Night Out / Home Leave',
      outTime: 'Tonight 10:00 PM',
      expectedInTime: 'Tomorrow 08:00 AM',
      reason: 'Night shift sprint at TCS office',
      parentConsentVerified: false,
      parentPhone: '+91 98480 33412',
      status: 'Pending Approval'
    }
  ]);

  const verifyParentConsent = (id: string) => {
    setEntries(prev => 
      prev.map(e => e.id === id ? { ...e, parentConsentVerified: true, status: 'Approved & Out' } : e)
    );
    onNotify?.("Parent OTP verified & Gate-pass issued!");
  };

  const curfewViolationsCount = entries.filter(e => e.status === 'Curfew Violation').length;
  const currentlyOutCount = entries.filter(e => e.status === 'Approved & Out').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Biometric Gate Pass & Night Curfew Monitor</h2>
            <p className="text-sm text-gray-500">Night curfew enforcement (09:30 PM deadline), parent SMS approval workflow & leave register</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Digital Gate Pass Creator opened")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Issue Outing Gate Pass
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Curfew Deadline</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">09:30 PM</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Biometric Turnstile Auto-Lock</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Currently Out on Pass</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">{currentlyOutCount} Residents</div>
          <div className="text-[11px] text-blue-600 mt-0.5">Expected back before curfew</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Curfew Breaches Tonight</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{curfewViolationsCount} Violations</div>
          <div className="text-[11px] text-red-500 mt-0.5 font-medium">Automated Parent Alert Sent</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Parent Consent Gate</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">100% Mandatory</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">For night-outs & weekend trips</div>
        </div>
      </div>

      {/* Gate Pass Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Live Gate Register & Night Out Requests ({entries.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Resident</th>
                <th className="py-3 px-4">Pass Type</th>
                <th className="py-3 px-4">Out Time</th>
                <th className="py-3 px-4">Curfew Return Due</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4 text-center">Parent Verified</th>
                <th className="py-3 px-4 text-center">Security Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {entries.map(e => (
                <tr key={e.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{e.residentName}</div>
                    <div className="text-[10px] text-purple-700 font-mono">{e.roomBed}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-800 border border-purple-100">
                      {e.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">{e.outTime}</td>
                  <td className="py-3.5 px-4 text-gray-900 font-bold">{e.expectedInTime}</td>
                  <td className="py-3.5 px-4 text-gray-600 italic">"{e.reason}"</td>
                  <td className="py-3.5 px-4 text-center">
                    {e.parentConsentVerified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <button 
                        onClick={() => verifyParentConsent(e.id)}
                        className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold rounded"
                      >
                        Verify OTP
                      </button>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      e.status === 'Returned On Time' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      e.status === 'Approved & Out' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      e.status === 'Curfew Violation' ? 'bg-red-50 text-red-700 border border-red-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Parent WhatsApp alert sent for ${e.residentName}`)}
                      className="p-1.5 text-gray-400 hover:text-purple-700 rounded-lg"
                      title="Send WhatsApp SMS"
                    >
                      <MessageSquare className="w-4 h-4" />
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
