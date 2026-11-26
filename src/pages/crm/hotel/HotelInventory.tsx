import React, { useState } from 'react';
import { 
  Package, AlertTriangle, CheckCircle2, Plus, 
  Search, RefreshCw, ShoppingCart, ArrowRight
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: 'Linen & Bedding' | 'Guest Toiletries' | 'Minibar F&B' | 'Room Stationery & Tea Kit';
  inStock: number;
  minThreshold: number;
  unit: string;
  unitCost: number;
  supplier: string;
  status: 'In Stock' | 'Low Stock Alert';
}

export const HotelInventory: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: 'inv-1', name: 'Egyptian Cotton King Bedsheets (300 TC)', category: 'Linen & Bedding', inStock: 140, minThreshold: 60, unit: 'pcs', unitCost: 850, supplier: 'Bombay Dyeing Hotel Supplies', status: 'In Stock' },
    { id: 'inv-2', name: 'Plush White Bath Towels (650 GSM)', category: 'Linen & Bedding', inStock: 180, minThreshold: 80, unit: 'pcs', unitCost: 450, supplier: 'Bombay Dyeing Hotel Supplies', status: 'In Stock' },
    { id: 'inv-3', name: 'Herbal Shampoo & Body Wash Bottles (50ml)', category: 'Guest Toiletries', inStock: 35, minThreshold: 50, unit: 'bottles', unitCost: 35, supplier: 'Kama Luxury Amenities', status: 'Low Stock Alert' },
    { id: 'inv-4', name: 'Dental Kit (Bamboo Toothbrush + Toothpaste)', category: 'Guest Toiletries', inStock: 120, minThreshold: 40, unit: 'kits', unitCost: 22, supplier: 'Kama Luxury Amenities', status: 'In Stock' },
    { id: 'inv-5', name: 'Assorted Roasted Cashews & Almonds (50g)', category: 'Minibar F&B', inStock: 22, minThreshold: 30, unit: 'jars', unitCost: 95, supplier: 'Haldiram Gourmet', status: 'Low Stock Alert' },
    { id: 'inv-6', name: 'Twinings English Breakfast Tea & Coffee Sachets', category: 'Room Stationery & Tea Kit', inStock: 450, minThreshold: 100, unit: 'pouches', unitCost: 12, supplier: 'Nestle Professional', status: 'In Stock' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = items.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hotel Linen, Toiletries & Minibar Inventory</h2>
            <p className="text-sm text-gray-500">Track cotton linens, guest vanity amenities, minibar snacks, and automatic reorder alerts</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Restock Purchase Order PO-2026-09 dispatched to suppliers!")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" /> Generate Restock Order
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Housekeeping Store & Amenities Stockroom
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search linen, toiletries..."
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
                <th className="py-3 px-4">Item & Specification</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Available Stock</th>
                <th className="py-3 px-4 text-center">Reorder Level</th>
                <th className="py-3 px-4 text-right">Unit Rate</th>
                <th className="py-3 px-4">Approved Supplier</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(i => (
                <tr key={i.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{i.name}</td>
                  <td className="py-3.5 px-4 text-gray-500">{i.category}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-950">
                    {i.inStock} {i.unit}
                  </td>
                  <td className="py-3.5 px-4 text-center text-gray-500 font-semibold">
                    {i.minThreshold} {i.unit}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">₹{i.unitCost}</td>
                  <td className="py-3.5 px-4 text-gray-600 text-[11px]">{i.supplier}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      i.status === 'In Stock' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {i.status}
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
