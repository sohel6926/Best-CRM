import React, { useState } from 'react';
import { 
  Coffee, Calendar, CheckCircle2, Clock, 
  Plus, Printer, DollarSign, ArrowRight, Share2
} from 'lucide-react';

interface TiffinContract {
  id: string;
  hotelName: string;
  contactPerson: string;
  phone: string;
  location: string;
  weeklyPodiType: string;
  weeklyQuantityKg: number;
  deliveryDays: string;
  ratePerKg: number;
  monthlyBilling: number;
  paymentCycle: 'Weekly Cheque' | 'Monthly Account Transfer';
}

export const KaramTiffinSupply: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [contracts, setContracts] = useState<TiffinContract[]>([
    {
      id: 'tif-1',
      hotelName: 'Sri Balaji Babai Idli Hotel',
      contactPerson: 'K. Subrahmanyam',
      phone: '+91 98480 77412',
      location: 'Hyderabad (Kukatpally & Dilsukhnagar)',
      weeklyPodiType: 'Special Ghee Idli Gunpowder (Extra Sesame)',
      weeklyQuantityKg: 50,
      deliveryDays: 'Every Monday & Thursday',
      ratePerKg: 380,
      monthlyBilling: 76000,
      paymentCycle: 'Weekly Cheque'
    },
    {
      id: 'tif-2',
      hotelName: 'Varalakshmi Tiffins & Dosa Point',
      contactPerson: 'N. Prasad',
      phone: '+91 98210 22341',
      location: 'Hyderabad (Filmnagar)',
      weeklyPodiType: 'Spicy Guntur Podi + Nalla Karam',
      weeklyQuantityKg: 35,
      deliveryDays: 'Every Tuesday & Friday',
      ratePerKg: 400,
      monthlyBilling: 56000,
      paymentCycle: 'Weekly Cheque'
    },
    {
      id: 'tif-3',
      hotelName: 'MTR & Udupi Grand Breakfast Hub',
      contactPerson: 'Ramesh Bhat',
      phone: '+91 97112 88401',
      location: 'Bengaluru (Jayanagar)',
      weeklyPodiType: 'Kandi Podi + Curry Leaf Podi',
      weeklyQuantityKg: 40,
      deliveryDays: 'Every Wednesday',
      ratePerKg: 390,
      monthlyBilling: 62400,
      paymentCycle: 'Monthly Account Transfer'
    }
  ]);

  const totalMonthlyHoreca = contracts.reduce((sum, c) => sum + c.monthlyBilling, 0);
  const totalWeeklyKg = contracts.reduce((sum, c) => sum + c.weeklyQuantityKg, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">HORECA Hotel & Tiffin Center Bulk Supply Contracts</h2>
            <p className="text-sm text-gray-500">Recurring 5kg & 10kg commercial buckets for busy idli-dosa restaurants with scheduled weekly deliveries</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Restaurant Recurring Supply Contract dialog opened")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Restaurant Contract
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Monthly Recurring HORECA Revenue</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{totalMonthlyHoreca.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">High-predictability subscription revenue</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Weekly Bulk Volume</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">{totalWeeklyKg} kg / week</div>
          <div className="text-[11px] text-purple-600 mt-0.5">{totalWeeklyKg * 4} kg monthly consumption</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Contracted Tiffin Outlets</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{contracts.length} Chains</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Babai Idli, Varalakshmi, Udupi Grand</div>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">Restaurant & Contact</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Custom Podi Blend</th>
                <th className="py-3 px-4 text-center">Weekly Dispatch</th>
                <th className="py-3 px-4">Delivery Days</th>
                <th className="py-3 px-4 text-right">Rate / Kg</th>
                <th className="py-3 px-4 text-right">Monthly Billing</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {contracts.map(c => (
                <tr key={c.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div>{c.hotelName}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{c.contactPerson} • {c.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">{c.location}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                      {c.weeklyPodiType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-950 text-sm">
                    {c.weeklyQuantityKg} kg
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">{c.deliveryDays}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{c.ratePerKg}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700 text-sm">
                    ₹{c.monthlyBilling.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`Printed Delivery Challan for ${c.hotelName}`)}
                      className="text-[#5B21B6] hover:underline font-bold text-xs"
                    >
                      Print Challan
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
