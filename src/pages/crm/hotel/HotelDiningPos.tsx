import React, { useState } from 'react';
import { 
  Utensils, Coffee, Printer, CheckCircle2, Plus, 
  Trash2, DollarSign, ArrowRight, Share2, Sparkles, Clock
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  category: 'Breakfast' | 'Starters' | 'Main Course' | 'Beverages' | 'Desserts';
  price: number;
}

interface KotOrder {
  id: string;
  kotNumber: string;
  roomNumber: string;
  guestName: string;
  items: { name: string; qty: number; price: number }[];
  totalAmount: number;
  specialInstructions: string;
  status: 'In Kitchen' | 'Delivered to Room' | 'Posted to Folio';
  orderTime: string;
}

export const HotelDiningPos: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedRoom, setSelectedRoom] = useState('Room 101 (Dr. Vikramaditya)');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const menuItems: FoodItem[] = [
    { id: 'f-1', name: 'Club Chicken Sandwich with Fries', category: 'Breakfast', price: 350 },
    { id: 'f-2', name: 'South Indian Masala Dosa Platter', category: 'Breakfast', price: 240 },
    { id: 'f-3', name: 'Paneer Malai Tikka (6 pcs)', category: 'Starters', price: 380 },
    { id: 'f-4', name: 'Crispy Salt & Pepper Prawns', category: 'Starters', price: 550 },
    { id: 'f-5', name: 'Murg Makhani (Butter Chicken)', category: 'Main Course', price: 480 },
    { id: 'f-6', name: 'Dal Makhani with Garlic Naan', category: 'Main Course', price: 320 },
    { id: 'f-7', name: 'Fresh Watermelon Mint Cooler', category: 'Beverages', price: 180 },
    { id: 'f-8', name: 'Hot Chocolate Brownie with Sizzling Ice Cream', category: 'Desserts', price: 260 }
  ];

  const [activeKots, setActiveKots] = useState<KotOrder[]>([
    {
      id: 'kot-101',
      kotNumber: 'KOT-2026-901',
      roomNumber: 'Suite 101',
      guestName: 'Dr. Vikramaditya Varma',
      items: [
        { name: 'Murg Makhani', qty: 1, price: 480 },
        { name: 'Dal Makhani with Garlic Naan', qty: 2, price: 320 }
      ],
      totalAmount: 1120,
      specialInstructions: 'Medium spicy, deliver extra green salad and cutlery',
      status: 'Delivered to Room',
      orderTime: '08:15 PM'
    },
    {
      id: 'kot-102',
      kotNumber: 'KOT-2026-902',
      roomNumber: 'Room 201',
      guestName: 'Michael Henderson',
      items: [
        { name: 'Club Chicken Sandwich with Fries', qty: 1, price: 350 },
        { name: 'Fresh Watermelon Cooler', qty: 2, price: 180 }
      ],
      totalAmount: 710,
      specialInstructions: 'No ice in juice, brown bread sandwich',
      status: 'In Kitchen',
      orderTime: '08:40 PM'
    }
  ]);

  const postToRoomFolio = (id: string) => {
    setActiveKots(prev => 
      prev.map(k => k.id === id ? { ...k, status: 'Posted to Folio' } : k)
    );
    onNotify?.("Dining charge posted to Guest Master Room Folio!");
  };

  const filteredMenu = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(m => m.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">In-Room Dining POS & Kitchen Order Tickets (KOT)</h2>
            <p className="text-sm text-gray-500">Order room dining, dispatch thermal kitchen tickets (KOT), and post bills directly to guest room folios</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Thermal Kitchen Ticket (KOT) Printed for Chef")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Kitchen KOT
        </button>
      </div>

      {/* Main Grid: Active Orders & Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active KOT Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Live Room Service Orders & Kitchen Pipeline
            </h3>

            <div className="space-y-4">
              {activeKots.map(kot => (
                <div key={kot.id} className="p-4 rounded-xl border border-purple-100 bg-purple-50/20 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-purple-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#5B21B6]">{kot.kotNumber}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                          {kot.roomNumber}
                        </span>
                        <span className="text-xs font-bold text-gray-900">{kot.guestName}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Ordered at {kot.orderTime}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-purple-950">₹{kot.totalAmount.toLocaleString()}</div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        kot.status === 'Posted to Folio' ? 'bg-emerald-100 text-emerald-800' :
                        kot.status === 'Delivered to Room' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {kot.status}
                      </span>
                    </div>
                  </div>

                  {/* Item List */}
                  <div className="space-y-1 text-xs text-gray-700">
                    {kot.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span>{it.qty}x {it.name}</span>
                        <span className="font-semibold">₹{(it.qty * it.price).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[11px] text-gray-500 italic bg-white p-2 rounded-lg border border-purple-50">
                    Note: "{kot.specialInstructions}"
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    {kot.status !== 'Posted to Folio' ? (
                      <button 
                        onClick={() => postToRoomFolio(kot.id)}
                        className="px-3 py-1.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-lg shadow-sm"
                      >
                        Charge to Room Folio
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Charged to Folio
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Menu Ordering */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Quick Room Service Menu
            </h3>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Breakfast', 'Main Course', 'Beverages'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    activeCategory === cat ? 'bg-[#5B21B6] text-white' : 'bg-purple-50 text-[#5B21B6] hover:bg-purple-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
              {filteredMenu.map(item => (
                <div key={item.id} className="p-3 rounded-xl border border-purple-50 hover:border-purple-200 flex justify-between items-center transition-all">
                  <div>
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-[10px] text-gray-400">{item.category}</div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="font-bold text-purple-900">₹{item.price}</span>
                    <button 
                      onClick={() => onNotify?.(`Added ${item.name} to Room 101 KOT`)}
                      className="p-1 rounded bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
