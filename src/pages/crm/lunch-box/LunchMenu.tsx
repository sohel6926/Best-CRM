import React, { useState } from 'react';
import { 
  Utensils, Calendar, Sparkles, Send, Flame, 
  CheckCircle2, Share2, Info, ChevronRight, Apple
} from 'lucide-react';

interface DayMenu {
  day: string;
  theme: string;
  vegSabzi: string;
  dal: string;
  bread: string;
  rice: string;
  dessertOrSalad: string;
  nonVegSpecial?: string;
  calories: number;
  protein: string;
}

export const LunchMenu: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);

  const weeklySchedule: DayMenu[] = [
    {
      day: 'Monday',
      theme: 'Pind De Swaad (North Comfort)',
      vegSabzi: 'Paneer Butter Masala & Aloo Gobi Matar',
      dal: 'Dal Tadka (Yellow Lentil tempered with Cumin & Ghee)',
      bread: '3 Soft Whole Wheat Phulkas',
      rice: 'Steamed Sona Masoori Rice',
      dessertOrSalad: 'Cucumber-Carrot Crunch Salad + Sweet Gulab Jamun',
      calories: 620,
      protein: '19g Protein',
    },
    {
      day: 'Tuesday',
      theme: 'Godavari Ruchulu (Andhra Flavors)',
      vegSabzi: 'Gutti Vankaya (Stuffed Brinjal Curry) & Dondakaya Fry',
      dal: 'Tomato Pappu with Ghee & Crispy Appadam',
      bread: '2 Fresh Jowar Rotis (Gluten-Free)',
      rice: 'Bagara Rice with Fried Onions',
      dessertOrSalad: 'Homemade Lemon Pickle + Sweet Semiya Payasam',
      calories: 590,
      protein: '16g Protein',
    },
    {
      day: 'Wednesday',
      theme: 'Royal Feast Day (Non-Veg Optional)',
      vegSabzi: 'Shahi Paneer / Kadhai Veggies',
      dal: 'Dal Makhani (Slow-cooked overnight)',
      bread: '3 Phulkas with Cow Ghee brush',
      rice: 'Fragrant Jeera Pulao',
      dessertOrSalad: 'Boondi Raita + Moong Dal Halwa',
      nonVegSpecial: 'Telangana Special Gongura Chicken Curry',
      calories: 680,
      protein: '31g (NV) / 22g (Veg)',
    },
    {
      day: 'Thursday',
      theme: 'Satvik Balance (Light & Cleansing)',
      vegSabzi: 'Palak Corn Subzi & Methi Aloo',
      dal: 'Gujarati Khatti-Meethi Dal',
      bread: '3 Multi-Grain Phulkas',
      rice: 'Steamed Brown Rice or White Rice',
      dessertOrSalad: 'Sprouted Moong Kosambari Salad',
      calories: 530,
      protein: '18g Protein',
    },
    {
      day: 'Friday',
      theme: 'Weekend Kickoff Biryani & Pulao',
      vegSabzi: 'Paneer Tikka Masala / Veg Hyderabadi Dum Biryani',
      dal: 'Mirchi Ka Salan & Dahi Chutney',
      bread: '2 Butter Naan / Rumali Roti',
      rice: 'Authentic Hyderabadi Dum Rice',
      dessertOrSalad: 'Double Ka Meetha + Sirka Onions',
      nonVegSpecial: 'Hyderabadi Chicken Dum Biryani (Chicken Pieces + Boiled Egg)',
      calories: 740,
      protein: '34g (NV) / 24g (Veg)',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Menu Engineering & Calorie Lab</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">4-Week Rotating Food Calendar</h2>
          <p className="text-xs text-[#64748B]">
            Zero menu repetition within 20 working days, verified dietary macros & weekly subscriber menu broadcasts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('This week’s food menu PDF broadcasted to 112 subscriber WhatsApp chats!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Broadcast Menu on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-gray-200 shadow-xs max-w-fit">
        {[1, 2, 3, 4].map((wk) => (
          <button
            key={wk}
            type="button"
            onClick={() => setActiveWeek(wk)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeWeek === wk 
                ? 'bg-[#5B21B6] text-white shadow-xs' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Week {wk} Menu Cycle
          </button>
        ))}
      </div>

      {/* Daily Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weeklySchedule.map((m) => (
          <div key={m.day} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <span className="text-xs font-black text-[#5B21B6] uppercase tracking-wide">{m.day}</span>
                  <h4 className="font-extrabold text-sm text-[#1E1B4B] mt-0.5">{m.theme}</h4>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-md block">
                    {m.calories} kcal
                  </span>
                  <span className="text-[10px] font-bold text-gray-500">{m.protein}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Main Veg Sabzi:</span>
                  <p className="font-bold text-gray-800">{m.vegSabzi}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Dal & Lentil:</span>
                  <p className="text-gray-700">{m.dal}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Breads:</span>
                    <p className="text-gray-700">{m.bread}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Rice Prep:</span>
                    <p className="text-gray-700">{m.rice}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Accompaniment & Sweet:</span>
                  <p className="text-gray-600">{m.dessertOrSalad}</p>
                </div>

                {m.nonVegSpecial && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-xs">
                    <span className="text-[10px] text-red-600 font-extrabold uppercase flex items-center gap-1">
                      <Flame className="h-3 w-3" /> Non-Veg Upgrade (+₹40)
                    </span>
                    <p className="font-bold text-red-900 mt-0.5">{m.nonVegSpecial}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-medium">Standard 5-CP Tray</span>
              <button
                type="button"
                onClick={() => onNotify?.(`Previewed nutrition badge for ${m.day}!`)}
                className="text-xs font-bold text-[#5B21B6] hover:underline cursor-pointer"
              >
                View Recipe & Spices →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
