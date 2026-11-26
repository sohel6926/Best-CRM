import React, { useState } from 'react';
import { 
  History, User, Clock, ShieldCheck, Filter, 
  FileEdit, AlertTriangle, ArrowRight, Search 
} from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  category: 'Price Override' | 'Menu Edit' | 'Invoice Generated' | 'User Role Changed' | 'Discount Applied';
  performedBy: string;
  role: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export function AdminAuditHistory() {
  const [logs] = useState<AuditLog[]>([
    {
      id: 'AUD-901',
      action: 'Plate Price Override Approved',
      category: 'Price Override',
      performedBy: 'Srikanth Varma (Director)',
      role: 'Super Admin',
      timestamp: 'Today 02:40 PM',
      ipAddress: '182.74.192.4',
      details: 'Overrode standard Platinum buffet rate from ₹950 to ₹880 for Reddy Family 1,200 plate wedding.',
    },
    {
      id: 'AUD-902',
      action: 'Updated Begum Bazar Oil Mandi Rate',
      category: 'Price Override',
      performedBy: 'Naresh Goud (Procurement)',
      role: 'Procurement Officer',
      timestamp: 'Today 11:15 AM',
      ipAddress: '182.74.192.4',
      details: 'Updated Freedom Sunflower Oil wholesale benchmark from ₹135/L to ₹138/L.',
    },
    {
      id: 'AUD-903',
      action: 'GST Tax Invoice Dispatched',
      category: 'Invoice Generated',
      performedBy: 'Pooja Reddy (Accounts)',
      role: 'Accountant',
      timestamp: 'Today 09:30 AM',
      ipAddress: '182.74.192.12',
      details: 'Issued Invoice #INV-2026-0304 for ₹8,80,000 to Srikanth & Deepthi Wedding.',
    },
    {
      id: 'AUD-904',
      action: 'New Kitchen Staff Role Assigned',
      category: 'User Role Changed',
      performedBy: 'System Security Master',
      role: 'System Security',
      timestamp: 'Yesterday 05:20 PM',
      ipAddress: 'Internal System',
      details: 'Granted "Chef Manifest Read-Only" permission to tablet station #04.',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Security & Audit Trail</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Change History & System Audit Ledger</h2>
          <p className="text-xs text-[#64748B]">
            Immutable log of price changes, contract discounts, menu alterations, invoice deletions & staff logins.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold">2,840 Historical Logs Saved</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Recent Admin Activity Logs</h3>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
            Audit Retention: 7 Years
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Log ID</th>
                <th className="p-3 font-bold">Action & Category</th>
                <th className="p-3 font-bold">User & Role</th>
                <th className="p-3 font-bold">Timestamp</th>
                <th className="p-3 font-bold">IP Address</th>
                <th className="p-3 font-bold">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-mono font-bold text-[#5B21B6]">{l.id}</td>
                  <td className="p-3">
                    <p className="font-bold text-[#1E1B4B]">{l.action}</p>
                    <span className="text-[10px] font-bold text-gray-500">{l.category}</span>
                  </td>
                  <td className="p-3">
                    <p className="font-bold text-gray-800">{l.performedBy}</p>
                    <p className="text-[10px] text-[#5B21B6] font-semibold">{l.role}</p>
                  </td>
                  <td className="p-3 text-gray-600">{l.timestamp}</td>
                  <td className="p-3 font-mono text-gray-500">{l.ipAddress}</td>
                  <td className="p-3 text-gray-700 max-w-xs">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
