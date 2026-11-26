import React, { useState } from 'react';
import { 
  Building2, Store, Phone, MapPin, DollarSign, 
  CheckCircle2, Plus, Search, Share2, ArrowRight
} from 'lucide-react';

interface RetailStore {
  id: string;
  storeName: string;
  contactPerson: string;
  phone: string;
  cityArea: string;
  storeType: 'Supermarket Chain' | 'Traditional Kirana' | 'Gourmet Food Store';
  creditTerms: '15 Days Credit' | '30 Days Credit' | 'Cash on Delivery';
  monthlySupplyPouches: number;
  outstandingBalance: number;
  lastPaymentDate: string;
}

export const KaramWholesale: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [stores, setStores] = useState<RetailStore[]>([
    {
      id: 'ret-1',
      storeName: 'Ratnadeep Supermarket (Banjara Hills)',
      contactPerson: 'Suresh Reddy (Store Manager)',
      phone: '+91 98490 22109',
      cityArea: 'Hyderabad (Road No 12)',
      storeType: 'Supermarket Chain',
      creditTerms: '30 Days Credit',
      monthlySupplyPouches: 600,
      outstandingBalance: 48500,
      lastPaymentDate: '10 Nov 2026'
    },
    {
      id: 'ret-2',
      storeName: 'Vijetha Supermarket (Gachibowli)',
      contactPerson: 'Venkatesh Rao',
      phone: '+91 98210 55431',
      cityArea: 'Hyderabad (Near DLF)',
      storeType: 'Supermarket Chain',
      creditTerms: '30 Days Credit',
      monthlySupplyPouches: 450,
      outstandingBalance: 32400,
      lastPaymentDate: '15 Nov 2026'
    },
    {
      id: 'ret-3',
      storeName: 'Balaji Kirana & General Stores',
      contactPerson: 'Gopichand Marwadi',
      phone: '+91 94401 88921',
      cityArea: 'Vijayawada (Governorpet)',
      storeType: 'Traditional Kirana',
      creditTerms: '15 Days Credit',
      monthlySupplyPouches: 250,
      outstandingBalance: 14200,
      lastPaymentDate: '18 Nov 2026'
    },
    {
      id: 'ret-4',
      storeName: 'Organic World & Gourmet Pantry',
      contactPerson: 'Pooja Hegde',
      phone: '+91 97112 00418',
      cityArea: 'Bengaluru (Indiranagar)',
      storeType: 'Gourmet Food Store',
      creditTerms: '15 Days Credit',
      monthlySupplyPouches: 300,
      outstandingBalance: 24800,
      lastPaymentDate: '20 Nov 2026'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const totalOutstanding = stores.reduce((sum, s) => sum + s.outstandingBalance, 0);

  const clearKhata = (id: string) => {
    setStores(prev => 
      prev.map(s => s.id === id ? { ...s, outstandingBalance: 0, lastPaymentDate: 'Today' } : s)
    );
    onNotify?.("Supermarket wholesale payment cleared & receipt dispatched!");
  };

  const filtered = stores.filter(s => 
    s.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cityArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">B2B Retail & Kirana Store Ledger (Khata)</h2>
            <p className="text-sm text-gray-500">Manage supermarket distributor contracts (Ratnadeep, Vijetha), 15/30-day credit cycles & payment dues</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Add Retail Store partner dialog opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Retail Partner
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">B2B Wholesale Receivables</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalOutstanding.toLocaleString()}</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Pending credit collections</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Partner Retail Outlets</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">{stores.length} Supermarkets</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Hyderabad, Bengaluru, Vijayawada</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Monthly B2B Pouch Movement</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">
            {stores.reduce((sum, s) => sum + s.monthlySupplyPouches, 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">pouches</span>
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Steady recurring retail velocity</div>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Retail Outlet Directory & Dues</h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search supermarket or location..."
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
                <th className="py-3 px-4">Supermarket & Contact</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Store Channel</th>
                <th className="py-3 px-4 text-center">Credit Terms</th>
                <th className="py-3 px-4 text-center">Monthly Volume</th>
                <th className="py-3 px-4 text-right">Outstanding Dues</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{s.storeName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{s.contactPerson} • {s.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5B21B6]" />
                    <span>{s.cityArea}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-100">
                      {s.storeType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-gray-600 font-medium">{s.creditTerms}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-900">{s.monthlySupplyPouches} units</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-purple-950 text-sm">
                    ₹{s.outstandingBalance.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {s.outstandingBalance > 0 ? (
                      <button 
                        onClick={() => clearKhata(s.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Settle Dues
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-bold text-[11px]">All Cleared</span>
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
