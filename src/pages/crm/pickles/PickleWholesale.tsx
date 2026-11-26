import React, { useState } from 'react';
import { 
  Store, Building2, Phone, MapPin, DollarSign, 
  CheckCircle2, Plus, Search, Share2, ArrowRight
} from 'lucide-react';

interface SupermarketStore {
  id: string;
  chainName: string;
  storeLocation: string;
  contactManager: string;
  phone: string;
  creditCycle: '15 Days Credit' | '30 Days Credit';
  monthlySupplyJars: number;
  outstandingBalance: number;
  lastPaymentDate: string;
}

export const PickleWholesale: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [stores, setStores] = useState<SupermarketStore[]>([
    {
      id: 'sm-1',
      chainName: 'Ratnadeep Supermarket (Madhapur & Jubilee Hills)',
      storeLocation: 'Hyderabad, Telangana (2 Outlets)',
      contactManager: 'T. R. K. Murthy',
      phone: '+91 98480 99812',
      creditCycle: '30 Days Credit',
      monthlySupplyJars: 550,
      outstandingBalance: 68500,
      lastPaymentDate: '12 Nov 2026'
    },
    {
      id: 'sm-2',
      chainName: 'Vijetha Supermarket (Kondapur)',
      storeLocation: 'Hyderabad, Telangana',
      contactManager: 'Naveen Kumar',
      phone: '+91 98210 44321',
      creditCycle: '30 Days Credit',
      monthlySupplyJars: 400,
      outstandingBalance: 46200,
      lastPaymentDate: '16 Nov 2026'
    },
    {
      id: 'sm-3',
      chainName: 'MK Retail Gourmet (Indiranagar)',
      storeLocation: 'Bengaluru, Karnataka',
      contactManager: 'Shankar Gowda',
      phone: '+91 97112 00418',
      creditCycle: '15 Days Credit',
      monthlySupplyJars: 320,
      outstandingBalance: 38400,
      lastPaymentDate: '20 Nov 2026'
    },
    {
      id: 'sm-4',
      chainName: 'Shri Venkateswara Organic Store',
      storeLocation: 'Vijayawada, AP',
      contactManager: 'M. Ramesh',
      phone: '+91 94401 22901',
      creditCycle: '15 Days Credit',
      monthlySupplyJars: 200,
      outstandingBalance: 19800,
      lastPaymentDate: '22 Nov 2026'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const totalB2bOutstanding = stores.reduce((sum, s) => sum + s.outstandingBalance, 0);

  const settleDues = (id: string) => {
    setStores(prev => 
      prev.map(s => s.id === id ? { ...s, outstandingBalance: 0, lastPaymentDate: 'Today' } : s)
    );
    onNotify?.("Supermarket wholesale account settled via RTGS/UPI!");
  };

  const filtered = stores.filter(s => 
    s.chainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.storeLocation.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h2 className="text-xl font-bold text-gray-900">Supermarket B2B Distribution & Kirana Khata</h2>
            <p className="text-sm text-gray-500">Retail distributor margins (25-30%), supermarket billing schedules, and automated credit payment tracking</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Add Supermarket / Retail Distributor dialog opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Supermarket Partner
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">B2B Wholesale Outstanding</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalB2bOutstanding.toLocaleString()}</div>
          <div className="text-[11px] text-amber-600 mt-0.5 font-medium">Across {stores.length} retail chains</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Monthly B2B Jar Movement</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">
            {stores.reduce((sum, s) => sum + s.monthlySupplyJars, 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">jars</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">High repeat grocery velocity</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Retailer Gross Margin Given</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">28.5%</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Attractive retail partner margin</div>
        </div>
      </div>

      {/* Supermarket Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Retail Chains & Distributor Accounts
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search chain or city..."
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
                <th className="py-3 px-4">Supermarket Chain</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Store Manager</th>
                <th className="py-3 px-4 text-center">Credit Term</th>
                <th className="py-3 px-4 text-center">Monthly Volume</th>
                <th className="py-3 px-4 text-right">Outstanding Dues</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{s.chainName}</td>
                  <td className="py-3.5 px-4 text-gray-600">{s.storeLocation}</td>
                  <td className="py-3.5 px-4 text-gray-700">
                    <div>{s.contactManager}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{s.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-medium text-purple-900">{s.creditCycle}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-900">{s.monthlySupplyJars} jars</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-purple-950 text-sm">
                    ₹{s.outstandingBalance.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {s.outstandingBalance > 0 ? (
                      <button 
                        onClick={() => settleDues(s.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Settle Khata
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-[11px]">All Settled</span>
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
