import React, { useState } from 'react';
import { 
  Smartphone, PauseCircle, PlayCircle, Utensils, 
  CreditCard, MapPin, CheckCircle2, Clock, Truck, ShieldCheck, ChevronRight
} from 'lucide-react';

export const LunchCustomerPortal: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [isPausedTomorrow, setIsPausedTomorrow] = useState(false);
  const [selectedCurry, setSelectedCurry] = useState('Paneer Butter Masala');
  const [selectedBread, setSelectedBread] = useState('3 Phulkas (Ghee)');
  const [walletBalance, setWalletBalance] = useState(1650);

  const handleTogglePause = () => {
    setIsPausedTomorrow(!isPausedTomorrow);
    if (!isPausedTomorrow) {
      onNotify?.('Tomorrow’s lunch paused! Kitchen manifest updated & ₹110 credited to your wallet.');
      setWalletBalance(walletBalance + 110);
    } else {
      onNotify?.('Tomorrow’s lunch resumed! Hot tiffin will be delivered by 12:45 PM.');
      setWalletBalance(walletBalance - 110);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Smartphone className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Subscriber App Simulation</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Simulate customer self-service: 1-click meal pause before 08:30 AM cutoff, curry choices, and live tracking.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Daily Kitchen Cutoff: 08:30 AM</span>
        </div>
      </div>

      {/* Mobile App Device Mockup Frame */}
      <div className="max-w-md mx-auto bg-white rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="bg-gray-800 px-6 py-2.5 flex justify-between items-center text-white text-[11px] font-bold">
          <span>12:15 PM</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <span className="text-[10px]">5G</span>
            <span>98%</span>
          </div>
        </div>

        {/* In-App Header */}
        <div className="bg-gradient-to-r from-[#1E1B4B] to-[#5B21B6] text-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-purple-200 font-extrabold uppercase tracking-wider">Daily Dabba App</span>
              <h3 className="text-base font-extrabold">Arjun Menon</h3>
              <p className="text-xs text-purple-100">Mindspace Madhapur • Desk #4B</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-purple-200 font-bold">Tiffin Wallet</span>
              <div className="text-base font-extrabold text-white">₹{walletBalance}</div>
            </div>
          </div>
        </div>

        {/* App Body Content */}
        <div className="p-4 space-y-4 bg-gray-50 min-h-[440px]">
          {/* Live Delivery Status Card */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500">Today's Lunch Dispatch</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-[#5B21B6] flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Rider in Transit
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-extrabold text-gray-900">ETA: 12:40 PM</div>
              <p className="text-xs text-gray-500">Rider Suresh • Van Route #2 (Madhapur IT Corridor)</p>
            </div>

            {/* Micro Delivery Step Tracker */}
            <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] font-bold text-center">
              <div className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                1. Packed 10:30 AM
              </div>
              <div className="p-1.5 bg-purple-50 text-[#5B21B6] rounded-lg border border-purple-200">
                2. On Van 11:45 AM
              </div>
              <div className="p-1.5 bg-gray-100 text-gray-400 rounded-lg">
                3. Deliver Desk
              </div>
            </div>
          </div>

          {/* Tomorrow's Meal Pause / Resume Switch */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-gray-900">Tomorrow's Lunch Status</h4>
                <p className="text-[11px] text-gray-500">
                  {isPausedTomorrow ? 'Meal is currently PAUSED (₹110 saved)' : 'Meal scheduled for delivery'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleTogglePause}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  isPausedTomorrow 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {isPausedTomorrow ? (
                  <>
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Resume Lunch</span>
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-3.5 h-3.5" />
                    <span>Pause Meal</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tomorrow's Thali Menu Selector */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#5B21B6]" />
                Tomorrow's Custom Choices
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">Locks 08:30 AM</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Select Main Curry:</label>
                <select
                  value={selectedCurry}
                  onChange={(e) => {
                    setSelectedCurry(e.target.value);
                    onNotify?.(`Tomorrow's curry updated to ${e.target.value}!`);
                  }}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 bg-white"
                >
                  <option value="Paneer Butter Masala">Paneer Butter Masala (Chef Special)</option>
                  <option value="Aloo Methi Sukhi Sabzi">Aloo Methi Sukhi Sabzi (Low Oil)</option>
                  <option value="Tadka Dal Makhani">Tadka Dal Makhani with Garlic</option>
                  <option value="Egg Curry (2 Eggs)">Egg Curry (2 Boiled Eggs in Gravy)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Select Bread / Rice:</label>
                <select
                  value={selectedBread}
                  onChange={(e) => {
                    setSelectedBread(e.target.value);
                    onNotify?.(`Bread preference set to ${e.target.value}!`);
                  }}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 bg-white"
                >
                  <option value="3 Phulkas (Ghee)">3 Soft Wheat Phulkas (Ghee)</option>
                  <option value="2 Phulkas + Jeera Rice">2 Phulkas + Half Jeera Rice</option>
                  <option value="Brown Rice Bowl">Healthy Brown Rice (Zero Roti)</option>
                  <option value="4 Dry Phulkas">4 Dry Phulkas (No Ghee Diet)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
