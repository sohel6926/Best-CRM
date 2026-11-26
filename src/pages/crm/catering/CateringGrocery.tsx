import React, { useState } from 'react';
import { 
  ShoppingBag, Printer, Share2, CheckSquare, Square, 
  RefreshCw, TrendingUp, Download, Truck, AlertTriangle, Layers
} from 'lucide-react';

interface GroceryItem {
  id: string;
  category: 'Grains & Pulses' | 'Dairy & Fats' | 'Vegetables & Mandi' | 'Spices & Condiments' | 'Fuel & Gas';
  name: string;
  per100PlateRatio: number; // e.g., 8kg per 100 plates
  unit: 'kg' | 'litres' | 'cylinders' | 'packets' | 'grams';
  approxUnitRate: number; // in INR
  isPurchased?: boolean;
  supplierNotes?: string;
}

export const CateringGrocery: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [eventGuests, setEventGuests] = useState<number>(600);
  const [bufferPercent, setBufferPercent] = useState<number>(10); // 10% safety buffer
  const [selectedEventName, setSelectedEventName] = useState<string>('Grand Wedding Reception - Verma Family');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Baseline standard Kirana benchmark per 100 plates
  const [ingredients, setIngredients] = useState<GroceryItem[]>([
    // Grains & Pulses
    { id: 'g1', category: 'Grains & Pulses', name: 'Royal Long Grain Basmati Rice', per100PlateRatio: 8.5, unit: 'kg', approxUnitRate: 110 },
    { id: 'g2', category: 'Grains & Pulses', name: 'Sharbati Wheat Atta (Tandoor & Roti)', per100PlateRatio: 7.0, unit: 'kg', approxUnitRate: 42 },
    { id: 'g3', category: 'Grains & Pulses', name: 'Whole Urad Sabut (Dal Makhani)', per100PlateRatio: 3.0, unit: 'kg', approxUnitRate: 135 },
    { id: 'g4', category: 'Grains & Pulses', name: 'Kabuli Chana / Chickpeas', per100PlateRatio: 3.5, unit: 'kg', approxUnitRate: 140 },
    { id: 'g5', category: 'Grains & Pulses', name: 'Besan (Gram Flour for Snacks/Kadhi)', per100PlateRatio: 2.0, unit: 'kg', approxUnitRate: 90 },

    // Dairy & Fats
    { id: 'd1', category: 'Dairy & Fats', name: 'Fresh Malai Paneer (Vacuum Packed)', per100PlateRatio: 9.0, unit: 'kg', approxUnitRate: 360 },
    { id: 'd2', category: 'Dairy & Fats', name: 'Pure Desi Cow Ghee (Tins)', per100PlateRatio: 3.0, unit: 'kg', approxUnitRate: 620 },
    { id: 'd3', category: 'Dairy & Fats', name: 'Refined Sunflower Oil (15L Tin)', per100PlateRatio: 4.5, unit: 'litres', approxUnitRate: 145 },
    { id: 'd4', category: 'Dairy & Fats', name: 'Full Cream Milk (Rabdi & Sweets)', per100PlateRatio: 12.0, unit: 'litres', approxUnitRate: 68 },
    { id: 'd5', category: 'Dairy & Fats', name: 'Fresh Amul Cream (1 Litre pack)', per100PlateRatio: 1.5, unit: 'packets', approxUnitRate: 220 },

    // Vegetables & Mandi
    { id: 'v1', category: 'Vegetables & Mandi', name: 'Nashik Red Onions (Grade A)', per100PlateRatio: 15.0, unit: 'kg', approxUnitRate: 32 },
    { id: 'v2', category: 'Vegetables & Mandi', name: 'Firm Hybrid Tomatoes', per100PlateRatio: 12.0, unit: 'kg', approxUnitRate: 38 },
    { id: 'v3', category: 'Vegetables & Mandi', name: 'Storage Potatoes (Chips & Curries)', per100PlateRatio: 12.0, unit: 'kg', approxUnitRate: 24 },
    { id: 'v4', category: 'Vegetables & Mandi', name: 'Fresh Ginger (Adrak)', per100PlateRatio: 1.8, unit: 'kg', approxUnitRate: 110 },
    { id: 'v5', category: 'Vegetables & Mandi', name: 'Garlic Bulbs (Lahsun Peeled)', per100PlateRatio: 1.8, unit: 'kg', approxUnitRate: 180 },
    { id: 'v6', category: 'Vegetables & Mandi', name: 'Fresh Coriander (Dhaniya Gaddi)', per100PlateRatio: 2.5, unit: 'kg', approxUnitRate: 60 },

    // Spices & Condiments
    { id: 's1', category: 'Spices & Condiments', name: 'Cashew Nuts / Kaju Tukda (Gravy)', per100PlateRatio: 1.5, unit: 'kg', approxUnitRate: 720 },
    { id: 's2', category: 'Spices & Condiments', name: 'Kashmiri Degi Mirch Powder', per100PlateRatio: 0.6, unit: 'kg', approxUnitRate: 480 },
    { id: 's3', category: 'Spices & Condiments', name: 'Shahi Garam Masala (Special Blend)', per100PlateRatio: 0.4, unit: 'kg', approxUnitRate: 850 },
    { id: 's4', category: 'Spices & Condiments', name: 'Tata Iodized Salt', per100PlateRatio: 2.5, unit: 'kg', approxUnitRate: 28 },
    { id: 's5', category: 'Spices & Condiments', name: 'Kasturi Methi & Khada Masala Box', per100PlateRatio: 0.5, unit: 'kg', approxUnitRate: 350 },

    // Fuel & Gas
    { id: 'f1', category: 'Fuel & Gas', name: 'Commercial 19kg LPG Cylinders', per100PlateRatio: 0.8, unit: 'cylinders', approxUnitRate: 1850 },
  ]);

  const togglePurchased = (id: string) => {
    setIngredients(prev => 
      prev.map(it => it.id === id ? { ...it, isPurchased: !it.isPurchased } : it)
    );
  };

  // Calculate required amount with buffer
  const effectivePlateCount = eventGuests * (1 + bufferPercent / 100);
  const factor = effectivePlateCount / 100;

  const calculatedItems = ingredients.map(it => {
    const totalQty = Math.round(it.per100PlateRatio * factor * 10) / 10;
    const estCost = Math.round(totalQty * it.approxUnitRate);
    return {
      ...it,
      calculatedQty: totalQty,
      calculatedCost: estCost
    };
  });

  const totalGroceryExpense = calculatedItems.reduce((acc, curr) => acc + curr.calculatedCost, 0);
  const purchasedCount = ingredients.filter(i => i.isPurchased).length;
  const filteredItems = activeCategory === 'All' 
    ? calculatedItems 
    : calculatedItems.filter(i => i.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Kirana, Mandi & Raw Material Estimator</h2>
              <p className="text-sm text-gray-500">Automate raw rations based on total guest plates, buffer %, and mandi market rates</p>
            </div>
          </div>
        </div>

        {/* Quick Guest Scale Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-purple-50 p-2 rounded-xl border border-purple-100">
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 block">Total Plates</label>
            <input 
              type="number"
              step="50"
              value={eventGuests}
              onChange={e => setEventGuests(Number(e.target.value) || 0)}
              className="w-24 px-2.5 py-1 text-sm font-bold bg-white border border-purple-200 rounded-lg text-purple-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 block">Safety Buffer %</label>
            <select
              value={bufferPercent}
              onChange={e => setBufferPercent(Number(e.target.value))}
              className="px-2.5 py-1 text-sm font-semibold bg-white border border-purple-200 rounded-lg text-gray-800 focus:outline-none"
            >
              <option value={5}>+5% (Tight)</option>
              <option value={10}>+10% (Standard)</option>
              <option value={15}>+15% (Buffet Safe)</option>
              <option value={20}>+20% (VIP Lavish)</option>
            </select>
          </div>

          <div className="flex gap-1.5 pt-3">
            {[400, 600, 1000, 1500].map(cnt => (
              <button
                key={cnt}
                onClick={() => setEventGuests(cnt)}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  eventGuests === cnt ? 'bg-purple-700 text-white' : 'bg-white text-gray-700 hover:bg-purple-100'
                }`}
              >
                {cnt}p
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium">Estimated Raw Kirana Total</div>
            <div className="text-2xl font-bold text-purple-900 mt-1">₹{totalGroceryExpense.toLocaleString()}</div>
            <div className="text-[11px] text-gray-500 mt-0.5">₹{Math.round(totalGroceryExpense / (eventGuests || 1))} / plate raw ration</div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium">Effective Cooked Target</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{Math.round(effectivePlateCount)} <span className="text-sm font-normal text-gray-500">plates</span></div>
            <div className="text-[11px] text-emerald-600 mt-0.5">Includes {bufferPercent}% backup buffer</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium">Procurement Status</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{purchasedCount} / {ingredients.length}</div>
            <div className="text-[11px] text-purple-600 mt-0.5">{Math.round((purchasedCount / ingredients.length) * 100)}% packed & verified</div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium">LPG Cylinder Requirement</div>
            <div className="text-2xl font-bold text-amber-700 mt-1">
              {Math.ceil(0.8 * factor)} <span className="text-sm font-normal text-gray-500">bottles</span>
            </div>
            <div className="text-[11px] text-gray-500 mt-0.5">Commercial 19 KG Grade</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Table & Filters */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <div className="flex flex-wrap gap-2">
            {['All', 'Grains & Pulses', 'Dairy & Fats', 'Vegetables & Mandi', 'Spices & Condiments', 'Fuel & Gas'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === cat 
                    ? 'bg-purple-700 text-white' 
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => onNotify?.(`Exported Mandi WhatsApp Slip for ${eventGuests} plates`)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" /> WhatsApp Mandi Parchi
            </button>
            <button 
              onClick={() => onNotify?.("Printing Kitchen Stores Receipt...")}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-purple-200"
            >
              <Printer className="w-3.5 h-3.5" /> Print Store List
            </button>
          </div>
        </div>

        {/* Grocery Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-3 w-10 text-center">Done</th>
                <th className="py-3 px-4">Ingredient / Raw Material</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Base / 100p</th>
                <th className="py-3 px-4 text-right">Calculated Need ({eventGuests}p + buffer)</th>
                <th className="py-3 px-4 text-right">Avg Mandi Rate</th>
                <th className="py-3 px-4 text-right">Estimated Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filteredItems.map(item => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-purple-50/30 transition-all ${
                    item.isPurchased ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  <td className="py-3 px-3 text-center">
                    <button 
                      onClick={() => togglePurchased(item.id)}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      {item.isPurchased ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400 inline" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900 flex items-center gap-2">
                    <span className={item.isPurchased ? 'line-through text-gray-400' : ''}>{item.name}</span>
                    {item.isPurchased && (
                      <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[9px] font-semibold">Loaded</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-500">{item.category}</td>
                  <td className="py-3 px-4 text-center font-medium text-gray-600">
                    {item.per100PlateRatio} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-purple-900 text-sm">
                    {item.calculatedQty} <span className="text-xs font-normal text-gray-500">{item.unit}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ₹{item.approxUnitRate} / {item.unit}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">
                    ₹{item.calculatedCost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-purple-50 font-bold text-purple-950 text-xs">
                <td colSpan={6} className="py-3 px-4 text-right">TOTAL ESTIMATED RATION BUDGET:</td>
                <td className="py-3 px-4 text-right text-base text-purple-900">₹{totalGroceryExpense.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
