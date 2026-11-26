import React, { useState } from 'react';
import { 
  Building2, Phone, MapPin, DollarSign, ArrowUpRight, 
  CheckCircle, Plus, Search, FileText, ShoppingCart
} from 'lucide-react';

interface MandiVendor {
  id: string;
  name: string;
  category: 'Vegetables & Mandi' | 'Dairy & Paneer' | 'Grains & Kirana' | 'Meat & Poultry' | 'LPG Fuel & Dry Ice';
  contactPerson: string;
  phone: string;
  mandiLocation: string;
  outstandingBalance: number;
  lastPaymentDate: string;
  paymentTerms: string;
}

export const CateringVendors: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [vendors, setVendors] = useState<MandiVendor[]>([
    {
      id: 'v-1',
      name: 'Vikas Mandi Trading Co.',
      category: 'Vegetables & Mandi',
      contactPerson: 'Vikas Patil',
      phone: '+91 98221 78901',
      mandiLocation: 'APMC Yard, Shed 14',
      outstandingBalance: 34500,
      lastPaymentDate: 'Nov 20, 2026',
      paymentTerms: 'Weekly Clearing (Every Monday)'
    },
    {
      id: 'v-2',
      name: 'Gokul Dairy & Chhena Center',
      category: 'Dairy & Paneer',
      contactPerson: 'Mukesh Sharma',
      phone: '+91 98902 44321',
      mandiLocation: 'Dairy Colony Road',
      outstandingBalance: 48000,
      lastPaymentDate: 'Nov 24, 2026',
      paymentTerms: 'Payment on Morning Delivery'
    },
    {
      id: 'v-3',
      name: 'Mahalaxmi Kirana Wholesalers',
      category: 'Grains & Kirana',
      contactPerson: 'Sunil Agrawal',
      phone: '+91 97650 99812',
      mandiLocation: 'Grain Market Gate 2',
      outstandingBalance: 82000,
      lastPaymentDate: 'Nov 18, 2026',
      paymentTerms: '15 Days Credit'
    },
    {
      id: 'v-4',
      name: 'Al-Madina Fresh Meat & Poultry',
      category: 'Meat & Poultry',
      contactPerson: 'Javed Qureshi',
      phone: '+91 98230 55431',
      mandiLocation: 'Central Slaughter House Road',
      outstandingBalance: 29000,
      lastPaymentDate: 'Nov 22, 2026',
      paymentTerms: 'Per Function Bill Settlement'
    },
    {
      id: 'v-5',
      name: 'Bharat Gas Commercial Agency',
      category: 'LPG Fuel & Dry Ice',
      contactPerson: 'Ramesh Kadam',
      phone: '+91 98112 66782',
      mandiLocation: 'Industrial Estate Depot',
      outstandingBalance: 12500,
      lastPaymentDate: 'Nov 25, 2026',
      paymentTerms: 'Immediate UPI on Cylinder Drop'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const totalOutstanding = vendors.reduce((sum, v) => sum + v.outstandingBalance, 0);

  const clearBalance = (id: string) => {
    setVendors(prev => 
      prev.map(v => v.id === id ? { ...v, outstandingBalance: 0, lastPaymentDate: 'Today' } : v)
    );
    onNotify?.("Vendor payment cleared via RTGS/UPI");
  };

  const filtered = vendors.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Wholesale Mandi & Supplier Ledger</h2>
            <p className="text-sm text-gray-500">Manage wholesale rate contracts, purchase orders, and track pending credit dues</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Add Vendor modal opened")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Wholesale Supplier
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Mandi Payable Balance</div>
          <div className="text-2xl font-bold text-amber-700 mt-1">₹{totalOutstanding.toLocaleString()}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Across {vendors.length} certified suppliers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Procurement Credit Period</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">7 - 15 Days</div>
          <div className="text-[11px] text-purple-600 mt-0.5 font-medium">Negotiated wholesale terms</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">GST Input Credit (ITC) Available</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹18,450</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-medium">Eligible commercial tax credit</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Supplier Directory & Khata</h3>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search vendor or mandi..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-purple-200 rounded-xl text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Supplier Firm Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Mandi Depot</th>
                <th className="py-3 px-4 text-right">Credit Balance</th>
                <th className="py-3 px-4 text-center">Payment Terms</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{v.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[11px] font-medium border border-purple-100">
                      {v.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    <div>{v.contactPerson}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{v.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-purple-600" /> {v.mandiLocation}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-purple-950">
                    ₹{v.outstandingBalance.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center text-gray-500 text-[11px]">{v.paymentTerms}</td>
                  <td className="py-3.5 px-4 text-right">
                    {v.outstandingBalance > 0 ? (
                      <button 
                        onClick={() => clearBalance(v.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold shadow-sm"
                      >
                        Settle Balance
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-[11px] flex items-center justify-end gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> All Settled
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
