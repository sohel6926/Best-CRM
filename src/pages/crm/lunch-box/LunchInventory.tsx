import React, { useState } from 'react';
import { 
  Package, ShoppingCart, AlertTriangle, CheckCircle2, 
  ArrowDownUp, RefreshCw, Plus, Building2, ExternalLink
} from 'lucide-react';

interface InventoryItem {
  id: string;
  itemName: string;
  category: 'Grains & Atta' | 'Dairy & Paneer' | 'Oils & Ghee' | 'Packaging & Containers';
  currentStock: number;
  unit: string;
  bufferThreshold: number;
  supplierName: string;
  leadTime: string;
  status: 'In Stock' | 'Low Stock' | 'Critical Reorder';
}

export const LunchInventory: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 'INV-101',
      itemName: 'MP Sharbati Whole Wheat Atta',
      category: 'Grains & Atta',
      currentStock: 180,
      unit: 'Kg',
      bufferThreshold: 80,
      supplierName: 'Sri Balaji Mandi Wholesalers, Begum Bazar',
      leadTime: '1 Day',
      status: 'In Stock',
    },
    {
      id: 'INV-102',
      itemName: 'Kurnool Sona Masoori Raw Rice (Aged)',
      category: 'Grains & Atta',
      currentStock: 240,
      unit: 'Kg',
      bufferThreshold: 100,
      supplierName: 'Kurnool Rice Mills Depot',
      leadTime: '2 Days',
      status: 'In Stock',
    },
    {
      id: 'INV-103',
      itemName: 'Fresh Malai Paneer Blocks',
      category: 'Dairy & Paneer',
      currentStock: 14,
      unit: 'Kg',
      bufferThreshold: 20,
      supplierName: 'Heritage Dairy Fresh Hub',
      leadTime: 'Daily 05:00 AM',
      status: 'Low Stock',
    },
    {
      id: 'INV-104',
      itemName: 'Cold Pressed Sunflower Oil',
      category: 'Oils & Ghee',
      currentStock: 65,
      unit: 'Liters',
      bufferThreshold: 30,
      supplierName: 'Tenali Natural Oils Depot',
      leadTime: '1 Day',
      status: 'In Stock',
    },
    {
      id: 'INV-105',
      itemName: 'Eco Sugarcane Bagasse 5-CP Meal Trays',
      category: 'Packaging & Containers',
      currentStock: 450,
      unit: 'Pieces',
      bufferThreshold: 500,
      supplierName: 'EcoPack India Ltd, Cherlapally',
      leadTime: '3 Days',
      status: 'Low Stock',
    },
    {
      id: 'INV-106',
      itemName: 'Leak-Proof Gravy Bowls (150ml PP Grade)',
      category: 'Packaging & Containers',
      currentStock: 850,
      unit: 'Pieces',
      bufferThreshold: 400,
      supplierName: 'Universal Packaging Hub',
      leadTime: '2 Days',
      status: 'In Stock',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Kitchen Pantry & Packaging Depot</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Raw Grocery & Meal Box Inventory</h2>
          <p className="text-xs text-[#64748B]">
            Atta, rice, dairy, cold pressed oils & eco sugarcane meal tray stocks with automatic reorder triggers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Draft purchase order dispatched to Heritage Dairy & EcoPack!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Generate Mandi Purchase Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Pantry Stock Value</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">₹1,42,800</p>
          <span className="text-[11px] text-gray-500">7-Day Kitchen Runway</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Bagasse Meal Trays</span>
          <p className="text-2xl font-black text-amber-600 mt-1">450 Trays</p>
          <span className="text-[11px] text-amber-700 font-medium">Reorder required by Friday</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Dairy & Paneer Standing Order</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">Daily 05:00 AM</p>
          <span className="text-[11px] text-gray-500">Fresh morning procurement</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Reorder Alerts</span>
          <p className="text-2xl font-black text-red-600 mt-1">2 Items</p>
          <span className="text-[11px] text-red-700 font-medium">Paneer & 5-CP Trays below buffer</span>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Stock Buffer & Reorder Management</h3>
          <span className="text-xs text-gray-500">Begum Bazar & Cherlapally Hubs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
              <tr>
                <th className="p-3 font-bold">Item Description</th>
                <th className="p-3 font-bold">Category</th>
                <th className="p-3 font-bold text-right">Current In-Stock</th>
                <th className="p-3 font-bold text-right">Buffer Threshold</th>
                <th className="p-3 font-bold">Preferred Vendor</th>
                <th className="p-3 font-bold">Lead Time</th>
                <th className="p-3 font-bold text-center">Status</th>
                <th className="p-3 font-bold text-center">Quick PO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((it) => (
                <tr key={it.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3 font-bold text-[#1E1B4B]">{it.itemName}</td>
                  <td className="p-3 text-gray-600">{it.category}</td>
                  <td className="p-3 text-right font-extrabold text-[#5B21B6] tabular-nums">
                    {it.currentStock} {it.unit}
                  </td>
                  <td className="p-3 text-right text-gray-600 tabular-nums">
                    {it.bufferThreshold} {it.unit}
                  </td>
                  <td className="p-3 text-gray-700 font-medium">{it.supplierName}</td>
                  <td className="p-3 text-gray-500">{it.leadTime}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      it.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' :
                      it.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {it.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => onNotify?.(`PO draft created for ${it.itemName}!`)}
                      className="text-[11px] font-bold text-[#5B21B6] hover:underline cursor-pointer"
                    >
                      Order +Stock
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
