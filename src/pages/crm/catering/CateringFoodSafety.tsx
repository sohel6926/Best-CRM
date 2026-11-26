import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Thermometer, 
  Droplets, FileCheck, Check, Sparkles 
} from 'lucide-react';

interface AuditItem {
  parameter: string;
  category: 'Temperature Control' | 'Water & Hygiene' | 'Oil & Cooking Quality' | 'Staff Medical & Pest Control';
  benchmark: string;
  currentReading: string;
  inspector: string;
  lastChecked: string;
  status: 'Compliant' | 'Action Needed';
}

export const CateringFoodSafety: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [audits] = useState<AuditItem[]>([
    {
      parameter: 'Dairy & Paneer Walk-in Chiller Temp',
      category: 'Temperature Control',
      benchmark: '< 4.0 °C',
      currentReading: '2.8 °C (Digital Thermometer)',
      inspector: 'Safety Lead Anji Reddy',
      lastChecked: 'Today 06:00 AM',
      status: 'Compliant',
    },
    {
      parameter: 'Deep Fry Sunflower Oil TPM (Total Polar Materials)',
      category: 'Oil & Cooking Quality',
      benchmark: '< 25% TPM (FSSAI Rule)',
      currentReading: '14.2% TPM (Fresh Oil Batch)',
      inspector: 'Sous Chef Raju',
      lastChecked: 'Today 08:30 AM',
      status: 'Compliant',
    },
    {
      parameter: 'Hot Holding Buffet Gravy Temperature',
      category: 'Temperature Control',
      benchmark: '> 65.0 °C',
      currentReading: '72.4 °C (Bain-marie holding)',
      inspector: 'Service Supervisor Srinivas',
      lastChecked: 'Today 12:00 PM',
      status: 'Compliant',
    },
    {
      parameter: 'RO Purified Cooking Water TDS & Purity',
      category: 'Water & Hygiene',
      benchmark: '50 - 150 PPM',
      currentReading: '88 PPM (Safe for Cooking)',
      inspector: 'Lab Tech M. Rao',
      lastChecked: 'Yesterday 04:00 PM',
      status: 'Compliant',
    },
    {
      parameter: 'Headcaps, Aprons & Nail Hygiene Check',
      category: 'Staff Medical & Pest Control',
      benchmark: '100% Chef & Helper Staff',
      currentReading: '34/34 Staff Passed Morning Inspection',
      inspector: 'Master Chef Venkatesh',
      lastChecked: 'Today 07:15 AM',
      status: 'Compliant',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Hygiene & FSSAI Standards</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Food Safety & Kitchen Quality Audit</h2>
          <p className="text-xs text-[#64748B]">
            FSSAI compliance logs, walk-in cold room temps, cooking oil TPM tests, and water purity verification.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>FSSAI Certified 100%</span>
          </span>
        </div>
      </div>

      {/* Safety Scores */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Hygiene Audit Score</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">99.4%</p>
          <span className="text-[11px] text-gray-500">Gold Standard Kitchen</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Cooking Oil Freshness</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">14.2% TPM</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Strictly well below 25% max</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Walk-in Chiller Temp</span>
          <p className="text-2xl font-black text-blue-600 mt-1">2.8 °C</p>
          <span className="text-[11px] text-gray-500">Target below 4.0 °C</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Staff Medical Certs</span>
          <p className="text-2xl font-black text-gray-800 mt-1">34/34 Staff</p>
          <span className="text-[11px] text-gray-500">Annual fitness tests current</span>
        </div>
      </div>

      {/* Audit Checklist Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <h3 className="font-extrabold text-sm text-[#1E1B4B]">Daily Station-Wise Safety Inspection</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Safety Parameter</th>
                <th className="p-3 font-bold">Category</th>
                <th className="p-3 font-bold">FSSAI Benchmark</th>
                <th className="p-3 font-bold">Current Log Reading</th>
                <th className="p-3 font-bold">Checked By</th>
                <th className="p-3 font-bold">Timestamp</th>
                <th className="p-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {audits.map((a) => (
                <tr key={a.parameter} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-bold text-[#1E1B4B]">{a.parameter}</td>
                  <td className="p-3 text-gray-600">{a.category}</td>
                  <td className="p-3 font-mono text-gray-700">{a.benchmark}</td>
                  <td className="p-3 font-bold text-[#5B21B6]">{a.currentReading}</td>
                  <td className="p-3 text-gray-700">{a.inspector}</td>
                  <td className="p-3 text-gray-500 text-[11px]">{a.lastChecked}</td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                      {a.status}
                    </span>
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
