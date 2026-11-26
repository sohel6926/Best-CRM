import { useState } from 'react';
import {
  ShieldCheck,
  UserCog,
  Key,
  Database,
  Download,
  CheckCircle2,
  Lock,
  Globe,
  DollarSign,
  Activity,
} from 'lucide-react';
import { AdminRole, useAdmin } from '../../context/AdminContext';

export function AdminSettings() {
  const { role, setRole, auditLogs, logAuditAction } = useAdmin();
  const [razorpayKey, setRazorpayKey] = useState('rzp_live_928374829103847');
  const [gstRate, setGstRate] = useState(18);
  const [savedSettings, setSavedSettings] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    logAuditAction(`Updated payment gateway keys & tax rate (${gstRate}%)`);
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      role,
      system: 'bestCRM Enterprise Cloud Platform',
      version: '1.0.0',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bestCRM_System_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logAuditAction('Generated and downloaded full system data backup');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Security, Roles & System Settings</h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Role-based admin access control, payment gateway integration credentials, GST compliance, and immutable audit logs.
        </p>
      </div>

      {savedSettings && (
        <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Settings updated successfully!
        </div>
      )}

      {/* Role Switcher (For Demo & Multi-Staff Simulation) */}
      <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">Simulate Active Staff Role</h2>
            <p className="text-xs text-[#64748B]">Switch permission levels as defined in CODTECH Scope Section 3 & 11</p>
          </div>
          <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-extrabold uppercase text-[#5B21B6]">
            Active: {role.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              r: 'super_admin' as AdminRole,
              label: 'Super Admin',
              desc: 'Full access: Pricing, User Deletion, Gateway Keys, App Broadcasts & Staff Management',
            },
            {
              r: 'sales_staff' as AdminRole,
              label: 'Sales Staff (Kiran / Priya)',
              desc: 'Access to Leads Pipeline, Conversions, CRM Plan Demonstrations & Sales Reports',
            },
            {
              r: 'support_staff' as AdminRole,
              label: 'Support Staff (Vikram)',
              desc: 'Read-only users, Ticket resolution, User history inspection & FAQ publishing',
            },
          ].map((item) => (
            <div
              key={item.r}
              onClick={() => {
                setRole(item.r);
                logAuditAction(`Switched active session view to ${item.label}`);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                role === item.r
                  ? 'border-[#7C3AED] bg-[#FAF8FF] ring-2 ring-[#EDE9FE]'
                  : 'border-[#EDE9FE] hover:bg-[#FAF8FF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1E1B4B]">{item.label}</span>
                {role === item.r && <CheckCircle2 className="h-4 w-4 text-[#7C3AED]" />}
              </div>
              <p className="mt-1 text-[11px] text-[#64748B] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gateway & Tax Settings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#1E1B4B]">Payment Gateway & Tax Configuration</h2>
          <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-gray-700">Razorpay Key ID (Live)</label>
              <input
                type="text"
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 font-mono text-xs text-[#1E1B4B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-700">GST Output Rate (%)</label>
                <input
                  type="number"
                  value={gstRate}
                  onChange={(e) => setGstRate(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Currency Code</label>
                <input
                  type="text"
                  disabled
                  value="INR (₹) Indian Rupee"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 p-2.5 text-xs text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-bold text-white hover:bg-[#4C1D95] cursor-pointer"
            >
              Save Credentials
            </button>
          </form>
        </div>

        {/* Database Backup & Disaster Recovery */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">Data Backup & Database Export</h2>
            <p className="text-xs text-[#64748B]">Section 11 Deliverable: Secure encrypted snapshots for enterprise records</p>

            <div className="mt-4 p-4 rounded-xl bg-[#FAF8FF] border border-[#F3EEFF] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Last Automated Cloud Backup:</span>
                <span className="font-bold text-green-700">Today, 03:00 AM IST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Backup Size:</span>
                <span className="font-bold text-[#1E1B4B]">14.8 MB (JSON & SQL dump)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Encryption Level:</span>
                <span className="font-bold text-[#5B21B6]">AES-256 GCM</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportBackup}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#DDD6FE] bg-white py-2.5 text-xs font-bold text-[#5B21B6] hover:bg-[#F3EEFF] cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download Offline System Backup (.json)</span>
          </button>
        </div>
      </div>

      {/* Audit Trail & Activity Logs */}
      <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">System Audit Trail & Security Logs</h2>
            <p className="text-xs text-[#64748B]">Real-time immutable history of all administrative operations</p>
          </div>
          <Activity className="h-5 w-5 text-[#5B21B6]" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EDE9FE] bg-[#FAF8FF] text-[#64748B]">
                <th className="px-4 py-3 font-bold">Timestamp</th>
                <th className="px-4 py-3 font-bold">Admin User & Role</th>
                <th className="px-4 py-3 font-bold">Operation / Action Executed</th>
                <th className="px-4 py-3 font-bold text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EEFF]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF8FF]">
                  <td className="px-4 py-3 font-mono text-[11px] text-[#64748B]">{log.timestamp}</td>
                  <td className="px-4 py-3 font-bold text-[#1E1B4B]">
                    {log.user} <span className="text-[10px] text-[#5B21B6] font-semibold uppercase">({log.role})</span>
                  </td>
                  <td className="px-4 py-3 text-[#475569]">{log.action}</td>
                  <td className="px-4 py-3 text-right font-mono text-[11px] text-gray-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
