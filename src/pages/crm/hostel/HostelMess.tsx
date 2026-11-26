import React, { useState } from 'react';
import { 
  Utensils, Calendar, Users, TrendingDown, 
  CheckCircle, Clock, Plus, Share2, Sparkles, ChefHat
} from 'lucide-react';

interface DayMenu {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  breakfast: string;
  lunch: string;
  eveningSnacks: string;
  dinner: string;
  specialDiet: string;
}

export const HostelMess: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeDay, setActiveDay] = useState<string>('Monday');
  const [totalEnrolledResidents, setTotalEnrolledResidents] = useState<number>(120);

  // Today's meal attendance
  const [skippedBreakfast, setSkippedBreakfast] = useState<number>(12);
  const [skippedLunch, setSkippedLunch] = useState<number>(38); // Out for college/office
  const [skippedDinner, setSkippedDinner] = useState<number>(15);

  const [weeklyMenu, setWeeklyMenu] = useState<DayMenu[]>([
    {
      day: 'Monday',
      breakfast: 'Idli, Medu Vada, Sambar & Coconut Chutney + Tea/Coffee',
      lunch: 'Rajma Masala, Steamed Basmati Rice, Chapati, Boondi Raita & Salad',
      eveningSnacks: 'Poha with Sev & Masala Tea',
      dinner: 'Aloo Gobi Matar, Dal Tadka, Phulkas, Steamed Rice & Gulab Jamun',
      specialDiet: 'Standard Balanced North & South'
    },
    {
      day: 'Tuesday',
      breakfast: 'Aloo Paratha with Fresh Curd, Butter & Pickle + Tea/Coffee',
      lunch: 'Chole Bhature / Rice, Jeera Rice, Dal Fry & Masala Papad',
      eveningSnacks: 'Veg Sandwich & Filter Coffee',
      dinner: 'Paneer Butter Masala, Tawa Roti, Dal Makhani, Jeera Rice & Kheer',
      specialDiet: 'Rich Punjabi Dinner'
    },
    {
      day: 'Wednesday',
      breakfast: 'Masala Dosa with Chutneys & Sambar + Tea/Coffee',
      lunch: 'Kadhi Pakora, Steamed Rice, Phulkas, Dry Bhindi Masala & Salad',
      eveningSnacks: 'Samosa with Mint Chutney & Tea',
      dinner: 'Egg Curry / Dum Aloo (for Veg), Steamed Rice, Rotis & Suji Halwa',
      specialDiet: 'Non-Veg Option Available (Egg Curry)'
    },
    {
      day: 'Thursday',
      breakfast: 'Upma with Chutney / Cornflakes with Milk + Tea/Coffee',
      lunch: 'Mixed Veg Sabzi, Dal Palak, Steamed Rice, Chapatis & Curd',
      eveningSnacks: 'Bhel Puri & Lemon Iced Tea',
      dinner: 'Kashmiri Dum Aloo, Dal Fry, Jeera Rice, Butter Rotis & Rasgulla',
      specialDiet: 'Pure Veg Fasting Friendly Options'
    },
    {
      day: 'Friday',
      breakfast: 'Puri Bhaji with Pickle & Curd + Tea/Coffee',
      lunch: 'South Indian Sambar Rice, Potato Roast, Curd Rice & Appalam',
      eveningSnacks: 'Crispy Pakoras & Cutting Chai',
      dinner: 'Veg Manchurian with Fried Rice / Hakka Noodles & Sweet Corn Soup',
      specialDiet: 'Indo-Chinese Night'
    },
    {
      day: 'Saturday',
      breakfast: 'Uttapam with Sambar & Tomato Chutney + Tea/Coffee',
      lunch: 'Dal Khichdi with Pure Desi Ghee, Papad, Pickle & Curd',
      eveningSnacks: 'Biscuits, Rusks & Filter Coffee',
      dinner: 'Shahi Paneer, Dal Makhani, Missi Roti, Steamed Rice & Fruit Custard',
      specialDiet: 'Chef Special Dessert'
    },
    {
      day: 'Sunday',
      breakfast: 'Chole Kulche with Lassi + Tea/Coffee',
      lunch: 'Hyderabadi Chicken Dum Biryani / Paneer Dum Biryani, Mirchi Ka Salan, Raita',
      eveningSnacks: 'French Fries & Milkshake',
      dinner: 'Light Moong Dal Khichdi, Tomato Soup, Rotis & Ice Cream Cup',
      specialDiet: 'Grand Sunday Non-Veg Feast'
    }
  ]);

  // Food calculations
  const expectedBreakfastCount = totalEnrolledResidents - skippedBreakfast;
  const expectedLunchCount = totalEnrolledResidents - skippedLunch;
  const expectedDinnerCount = totalEnrolledResidents - skippedDinner;

  const currentMenu = weeklyMenu.find(m => m.day === activeDay) || weeklyMenu[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Hostel Mess Menu & Kitchen Wastage Engine</h2>
            <p className="text-sm text-gray-500">7-day revolving menu, live skip-meal headcount for head cook, and leave rebate calculator</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("WhatsApp weekly menu sent to all residents broadcast!")}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Share2 className="w-4 h-4" /> Broadcast Menu to WhatsApp
        </button>
      </div>

      {/* Real-time Headcount Cards for Kitchen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Morning Breakfast</span>
            <span className="text-purple-600">{skippedBreakfast} Skipped</span>
          </div>
          <div className="text-3xl font-extrabold text-purple-950 mt-2">{expectedBreakfastCount} <span className="text-xs font-normal text-gray-500">Plates</span></div>
          <div className="text-[11px] text-gray-500 mt-1">Serve Time: 07:30 AM - 09:30 AM</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Afternoon Lunch</span>
            <span className="text-amber-600">{skippedLunch} Out at College</span>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-2">{expectedLunchCount} <span className="text-xs font-normal text-gray-500">Plates</span></div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">Saves 38 plates grocery wastage!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Night Dinner</span>
            <span className="text-purple-600">{skippedDinner} Skipped</span>
          </div>
          <div className="text-3xl font-extrabold text-purple-950 mt-2">{expectedDinnerCount} <span className="text-xs font-normal text-gray-500">Plates</span></div>
          <div className="text-[11px] text-gray-500 mt-1">Serve Time: 08:00 PM - 10:00 PM</div>
        </div>
      </div>

      {/* 7-Day Day Selector Ribbon */}
      <div className="bg-white rounded-2xl p-2 border border-purple-100 shadow-sm flex items-center gap-1.5 overflow-x-auto">
        {weeklyMenu.map(m => (
          <button
            key={m.day}
            onClick={() => setActiveDay(m.day)}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all ${
              activeDay === m.day 
                ? 'bg-purple-700 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-900'
            }`}
          >
            <div>{m.day}</div>
            <div className={`text-[10px] font-normal ${activeDay === m.day ? 'text-purple-100' : 'text-gray-400'}`}>
              {m.day === 'Sunday' ? 'Feast' : 'Regular'}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Day's Detailed Menu Card */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-purple-50 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{currentMenu.day}'s Dining Timetable</span>
              <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">
                {currentMenu.specialDiet}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Prepared fresh with pure groundnut oil and certified dairy</p>
          </div>

          <button 
            onClick={() => onNotify?.(`Kitchen grocery requirement sheet printed for ${currentMenu.day}`)}
            className="px-3.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold border border-purple-200"
          >
            Print Kitchen Prep Slip
          </button>
        </div>

        {/* 4 Meal Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 space-y-2">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">01. Breakfast (07:30 - 09:30)</span>
            <p className="text-xs font-bold text-gray-900 leading-relaxed">{currentMenu.breakfast}</p>
          </div>

          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 space-y-2">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">02. Lunch (12:30 - 02:30)</span>
            <p className="text-xs font-bold text-gray-900 leading-relaxed">{currentMenu.lunch}</p>
          </div>

          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 space-y-2">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">03. Evening Tea (05:00 - 06:00)</span>
            <p className="text-xs font-bold text-gray-900 leading-relaxed">{currentMenu.eveningSnacks}</p>
          </div>

          <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 space-y-2">
            <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide">04. Dinner (08:00 - 10:00)</span>
            <p className="text-xs font-bold text-gray-900 leading-relaxed">{currentMenu.dinner}</p>
          </div>
        </div>

        {/* Mess Rebate Policy Note */}
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div>
            <strong className="font-bold">Automated Mess Leave Rebate:</strong> Residents traveling home for 4 or more consecutive days receive an automatic ₹100/day mess deduction on their upcoming rent invoice.
          </div>
          <button 
            onClick={() => onNotify?.("Mess Rebate Adjustment applied")}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm ml-4 flex-shrink-0"
          >
            Apply Rebate
          </button>
        </div>
      </div>
    </div>
  );
};
