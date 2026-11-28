import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, Search, Plus, Tag, 
  Utensils, Users, DollarSign, ArrowRight, ShieldCheck, Download
} from 'lucide-react';

interface MealPlan {
  id: string;
  name: string;
  duration: 'Weekly (5 Days)' | 'Monthly (22 Days)' | 'Monthly (26 Days)' | 'Daily Trial';
  dietType: 'Pure Veg' | 'Non-Veg (3 Days/wk)' | 'Diet / High Protein' | 'South Indian Traditional';
  mealTiming: 'Lunch Only' | 'Dinner Only' | 'Lunch + Dinner';
  price: number;
  perMealCost: number;
  activeSubscribers: number;
  features: string[];
}

export const LunchPlans: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [plans, setPlans] = useState<MealPlan[]>([
    {
      id: 'PLN-01',
      name: 'Homestyle Standard Veg Lunch',
      duration: 'Monthly (22 Days)',
      dietType: 'Pure Veg',
      mealTiming: 'Lunch Only',
      price: 2400,
      perMealCost: 109,
      activeSubscribers: 64,
      features: ['3 Ghee Phulkas or Steamed Rice', 'Dal Tadka / Sambar', 'Seasonal Dry Sabzi', 'Curd & Salad']
    },
    {
      id: 'PLN-02',
      name: 'Executive Non-Veg Power Meal',
      duration: 'Monthly (22 Days)',
      dietType: 'Non-Veg (3 Days/wk)',
      mealTiming: 'Lunch Only',
      price: 3200,
      perMealCost: 145,
      activeSubscribers: 32,
      features: ['Chicken Curry / Egg Curry (3x/wk)', 'Ghee Rotis + Flavored Rice', 'High Protein Dal', 'Spiced Buttermilk']
    },
    {
      id: 'PLN-03',
      name: 'Health & Calorie-Counted Millet Box',
      duration: 'Monthly (22 Days)',
      dietType: 'Diet / High Protein',
      mealTiming: 'Lunch Only',
      price: 2850,
      perMealCost: 129,
      activeSubscribers: 18,
      features: ['Foxtail/Jowar Roti', 'Sprouted Moong Salad', 'Grilled Paneer / Tofu', 'Low Oil Dal']
    },
    {
      id: 'PLN-04',
      name: 'Techie Dual Combo (Lunch + Dinner)',
      duration: 'Monthly (26 Days)',
      dietType: 'Pure Veg',
      mealTiming: 'Lunch + Dinner',
      price: 5200,
      perMealCost: 100,
      activeSubscribers: 12,
      features: ['Both Lunch (12:30 PM) & Dinner (08:00 PM)', 'No Cook Hassle', 'Weekend flexibility']
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newDiet, setNewDiet] = useState<'Pure Veg' | 'Non-Veg (3 Days/wk)' | 'Diet / High Protein'>('Pure Veg');
  const [newPrice, setNewPrice] = useState(2500);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newP: MealPlan = {
      id: `PLN-0${plans.length + 1}`,
      name: newName,
      duration: 'Monthly (22 Days)',
      dietType: newDiet as any,
      mealTiming: 'Lunch Only',
      price: newPrice,
      perMealCost: Math.round(newPrice / 22),
      activeSubscribers: 0,
      features: ['Fresh Daily Delivery', 'Customizable Roti/Rice split', 'Pause anytime']
    };
    setPlans([...plans, newP]);
    setShowModal(false);
    setNewName('');
    onNotify?.(`Subscription plan "${newName}" published to subscriber catalog!`);
  };

  const filtered = plans.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Calendar className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Subscription Packages & Pricing Slabs</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Configurable corporate and homestyle meal packages with per-meal deduction rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Exported subscription pricing menu for IT tech parks!')}
            className="px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Plan Brochure</span>
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Plan</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Active Subscriptions</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">
            {plans.reduce((sum, p) => sum + p.activeSubscribers, 0)} Subscribers
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">+14% Growth</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Monthly Run Rate</span>
          <div className="text-xl font-extrabold text-[#5B21B6] mt-1">
            ₹{plans.reduce((sum, p) => sum + (p.price * p.activeSubscribers), 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400">Prepaid Recurring</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Average Per-Meal Realization</span>
          <div className="text-xl font-extrabold text-gray-900 mt-1">₹118 / Dabba</div>
          <span className="text-[11px] text-emerald-700 font-bold">Healthy 38% Gross Margin</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-xs font-bold text-gray-500">Weekend Skip Rate</span>
          <div className="text-xl font-extrabold text-amber-600 mt-1">82% Opt-Out</div>
          <span className="text-[11px] text-gray-400">Corporate Mon-Fri Focus</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search subscription plans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
        />
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4 hover:border-purple-300 transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {p.id} • {p.duration}
                </span>
                <h3 className="font-extrabold text-sm text-gray-900 mt-1.5">{p.name}</h3>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                p.dietType === 'Pure Veg' ? 'bg-emerald-100 text-emerald-800' :
                p.dietType === 'Non-Veg (3 Days/wk)' ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-[#5B21B6]'
              }`}>
                {p.dietType}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-500">/ month (~₹{p.perMealCost}/meal)</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-1.5">
              <div className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">Included Thali Inclusions:</div>
              {p.features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-100">
              <span className="text-gray-500 font-medium">
                Active Enrolled: <span className="font-extrabold text-gray-900">{p.activeSubscribers} Subscribed</span>
              </span>
              <button
                type="button"
                onClick={() => onNotify?.(`Plan details WhatsApp link copied for ${p.name}!`)}
                className="text-[#5B21B6] hover:text-[#4C1D95] font-bold text-xs cursor-pointer"
              >
                Share Link
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Plan */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Create Subscription Package</h3>
            <form onSubmit={handleCreatePlan} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. South Indian Traditional Lunch"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Diet Style</label>
                <select
                  value={newDiet}
                  onChange={(e) => setNewDiet(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                >
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Non-Veg (3 Days/wk)">Non-Veg (3 Days/wk)</option>
                  <option value="Diet / High Protein">Diet / High Protein</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Monthly Subscription Fee (₹)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B21B6] text-white text-xs font-bold rounded-xl hover:bg-[#4C1D95] cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
