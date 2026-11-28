import React, { useState } from 'react';
import { 
  CreditCard, QrCode, Search, Plus, Download, 
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, RefreshCw
} from 'lucide-react';

interface WalletAccount {
  id: string;
  subscriberName: string;
  phone: string;
  officeHub: string;
  walletBalance: number;
  ratePerMeal: number;
  mealsRemaining: number;
  status: 'Healthy Balance' | 'Low Balance Warning' | 'Exhausted';
  lastRecharged: string;
}

export const LunchWallet: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<WalletAccount | null>(null);
  const [rechargeAmount, setRechargeAmount] = useState(1500);

  const [wallets, setWallets] = useState<WalletAccount[]>([
    {
      id: 'WAL-101',
      subscriberName: 'Arjun Menon',
      phone: '+91 98480 33441',
      officeHub: 'Mindspace Madhapur (Building 12)',
      walletBalance: 1650,
      ratePerMeal: 110,
      mealsRemaining: 15,
      status: 'Healthy Balance',
      lastRecharged: '2026-11-20'
    },
    {
      id: 'WAL-102',
      subscriberName: 'Priya Sundaram',
      phone: '+91 97001 22334',
      officeHub: 'DLF Cybercity Gachibowli',
      walletBalance: 220,
      ratePerMeal: 110,
      mealsRemaining: 2,
      status: 'Low Balance Warning',
      lastRecharged: '2026-11-04'
    },
    {
      id: 'WAL-103',
      subscriberName: 'Ramesh Balakrishnan',
      phone: '+91 99882 11223',
      officeHub: 'Divyasree Orion (Raidurg)',
      walletBalance: 0,
      ratePerMeal: 145,
      mealsRemaining: 0,
      status: 'Exhausted',
      lastRecharged: '2026-10-25'
    },
    {
      id: 'WAL-104',
      subscriberName: 'Divya Nambiar',
      phone: '+91 98491 55667',
      officeHub: 'Phoenix Avance (HITEC City)',
      walletBalance: 2900,
      ratePerMeal: 145,
      mealsRemaining: 20,
      status: 'Healthy Balance',
      lastRecharged: '2026-11-26'
    }
  ]);

  const handleSimulateRecharge = (id: string) => {
    setWallets(wallets.map(w => {
      if (w.id === id) {
        const newBal = w.walletBalance + rechargeAmount;
        const newMeals = Math.floor(newBal / w.ratePerMeal);
        return {
          ...w,
          walletBalance: newBal,
          mealsRemaining: newMeals,
          status: 'Healthy Balance',
          lastRecharged: 'Today (UPI Instant)'
        };
      }
      return w;
    }));
    setSelectedAccount(null);
    onNotify?.(`₹${rechargeAmount} credited to subscriber wallet! Auto-receipt dispatched on WhatsApp.`);
  };

  const filtered = wallets.filter(w => 
    w.subscriberName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.officeHub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <CreditCard className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Prepaid Tiffin Wallet & Meal Deductions</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Automated per-meal micro-deductions upon kitchen dispatch, UPI top-ups, and low balance alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNotify?.('Dispatched automated WhatsApp recharge reminders to 14 low-balance subscribers!')}
          className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Send WhatsApp Top-Up Nudges</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Customer Wallet Escrow</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            ₹{wallets.reduce((sum, w) => sum + w.walletBalance, 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">100% Prepaid Security</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Today's Meal Deductions</span>
          <div className="text-xl font-extrabold text-[#5B21B6] mt-1">₹12,480</div>
          <span className="text-[11px] text-gray-400">112 Tiffin Dispatches</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Low Balance Warnings</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">
            {wallets.filter(w => w.status === 'Low Balance Warning').length} Subscribers
          </div>
          <span className="text-[11px] text-amber-700 font-bold">&lt; 2 Meals Left</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Zero Balance Pauses</span>
          <div className="text-xl font-extrabold text-red-600 mt-1">
            {wallets.filter(w => w.status === 'Exhausted').length} Account
          </div>
          <span className="text-[11px] text-red-700 font-bold">Kitchen auto-held</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search subscriber or tech park corridor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
        />
      </div>

      {/* Wallets Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Subscriber</th>
                <th className="px-4 py-3">Tech Park Corridor</th>
                <th className="px-4 py-3">Wallet Balance</th>
                <th className="px-4 py-3">Per Meal Rate</th>
                <th className="px-4 py-3">Meals Remaining</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Top-up Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3">
                    <div className="font-extrabold text-gray-900">{w.subscriberName}</div>
                    <div className="text-[11px] text-gray-400">{w.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-bold">
                    {w.officeHub}
                  </td>
                  <td className="px-4 py-3 font-extrabold text-gray-900 text-sm">
                    ₹{w.walletBalance.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    ₹{w.ratePerMeal} / meal
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-extrabold text-[#5B21B6]">{w.mealsRemaining} Meals</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      w.status === 'Healthy Balance' ? 'bg-emerald-100 text-emerald-800' :
                      w.status === 'Low Balance Warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedAccount(w)}
                      className="px-2.5 py-1 bg-purple-50 text-[#5B21B6] hover:bg-purple-100 font-bold rounded-lg text-[11px] transition cursor-pointer"
                    >
                      Instant Top-Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Recharge Top-Up */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4 animate-in fade-in text-center">
            <h3 className="font-extrabold text-base text-gray-900">Wallet Recharge</h3>
            <p className="text-xs text-gray-500">Crediting {selectedAccount.subscriberName}</p>

            <div className="flex justify-center gap-2 py-2">
              {[1000, 1500, 2500].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setRechargeAmount(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                    rechargeAmount === amt ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-left space-y-1">
              <div className="flex justify-between">
                <span>Current Balance:</span>
                <span className="font-bold text-gray-900">₹{selectedAccount.walletBalance}</span>
              </div>
              <div className="flex justify-between">
                <span>Top-up Addition:</span>
                <span className="font-bold text-emerald-700">+₹{rechargeAmount}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-purple-200 font-extrabold">
                <span>New Balance:</span>
                <span className="text-[#5B21B6]">₹{selectedAccount.walletBalance + rechargeAmount}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedAccount(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSimulateRecharge(selectedAccount.id)}
                className="px-4 py-2 bg-[#5B21B6] text-white text-xs font-bold rounded-xl hover:bg-[#4C1D95] cursor-pointer"
              >
                Confirm Credit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
