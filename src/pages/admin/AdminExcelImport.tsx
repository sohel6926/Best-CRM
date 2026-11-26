import React, { useState } from 'react';
import { 
  FileSpreadsheet, Upload, Download, CheckCircle2, 
  AlertCircle, Table, ArrowRight, RefreshCw, FileText 
} from 'lucide-react';

export function AdminExcelImport() {
  const [importType, setImportType] = useState('leads');
  const [importedStatus, setImportedStatus] = useState<string | null>(null);

  const importPresets = [
    { id: 'leads', name: 'Event Leads & Inquiries', count: '14 Columns', template: 'leads_template.xlsx', desc: 'Client name, phone, function date, venue, budget & plate counts' },
    { id: 'customers', name: 'Corporate Subscriber Khata', count: '12 Columns', template: 'subscribers_template.xlsx', desc: 'Subscriber company, tech park desk, meal plan, auto-debit ID' },
    { id: 'mandi', name: 'Wholesale Mandi Price Sheet', count: '8 Columns', template: 'mandi_rates.xlsx', desc: 'Item name, unit, Begum Bazar wholesale rate, buffer qty' },
    { id: 'menus', name: 'Custom Recipes & Dish Costs', count: '10 Columns', template: 'recipe_master.xlsx', desc: 'Dish name, category, standard portion grams, raw food cost' },
  ];

  const handleSimulateImport = () => {
    setImportedStatus('Successfully validated and imported 48 records with 0 duplicate errors!');
    setTimeout(() => setImportedStatus(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Data Migration & Batch Sync</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Excel & CSV Bulk Import/Export Hub</h2>
          <p className="text-xs text-[#64748B]">
            Bulk import client leads, mandi kirana prices, recipes, corporate rosters, or export GST Tally/QuickBooks sheets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulateImport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Excel File</span>
          </button>
        </div>
      </div>

      {importedStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-700" />
          {importedStatus}
        </div>
      )}

      {/* Preset Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {importPresets.map((p) => (
          <div 
            key={p.id}
            onClick={() => setImportType(p.id)}
            className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
              importType === p.id 
                ? 'bg-purple-50/70 border-[#5B21B6] shadow-xs ring-1 ring-[#5B21B6]' 
                : 'bg-white border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-xl bg-white border border-gray-200 text-[#5B21B6]">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {p.count}
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-[#1E1B4B]">{p.name}</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">{p.desc}</p>
            <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#5B21B6]">
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" /> Template
              </span>
              <span>Select →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Drag & Drop Upload Zone */}
      <div className="p-8 bg-white rounded-2xl border-2 border-dashed border-purple-200 text-center space-y-3">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-purple-50 text-[#5B21B6] flex items-center justify-center">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-[#1E1B4B]">Drag & Drop .XLSX, .XLS, or .CSV File</h4>
          <p className="text-xs text-gray-500 mt-1">
            Standard format: Headers on row 1, clean phone numbers with +91 country codes.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSimulateImport}
            className="px-4 py-2 rounded-xl bg-[#5B21B6] text-white text-xs font-bold hover:bg-[#4C1D95] transition cursor-pointer"
          >
            Browse Files from Computer
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-50 transition cursor-pointer"
          >
            Download Sample CSV
          </button>
        </div>
      </div>
    </div>
  );
}
