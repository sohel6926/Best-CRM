import React, { useState } from 'react';
import { 
  Building2, UserCheck, Utensils, Sparkles, FileText, 
  Globe, Landmark, Car, Moon, Package, ChevronRight, Printer
} from 'lucide-react';
import { HotelTapeChart } from './HotelTapeChart';
import { HotelCheckIn } from './HotelCheckIn';
import { HotelDiningPos } from './HotelDiningPos';
import { HotelHousekeeping } from './HotelHousekeeping';
import { HotelFolioBilling } from './HotelFolioBilling';
import { HotelChannelManager } from './HotelChannelManager';
import { HotelBanquets } from './HotelBanquets';
import { HotelConcierge } from './HotelConcierge';
import { HotelNightAudit } from './HotelNightAudit';
import { HotelInventory } from './HotelInventory';

export type HotelSubPage = 
  | 'tape-chart' 
  | 'check-in' 
  | 'dining-pos' 
  | 'housekeeping' 
  | 'folio-billing' 
  | 'channel-manager' 
  | 'banquets' 
  | 'concierge' 
  | 'night-audit'
  | 'inventory';

export const HotelFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeSubPage, setActiveSubPage] = useState<HotelSubPage>('tape-chart');

  const navigationItems = [
    { id: 'tape-chart', label: 'Room Tape Chart', icon: Building2, badge: '85% Full' },
    { id: 'check-in', label: 'Express Check-In & KYC', icon: UserCheck, badge: 'Form C' },
    { id: 'dining-pos', label: 'Room Dining POS & KOT', icon: Utensils, badge: 'Live Orders' },
    { id: 'housekeeping', label: 'Housekeeping Turnover', icon: Sparkles, badge: 'Clean Desk' },
    { id: 'folio-billing', label: 'Master Folio & GST Bill', icon: FileText, badge: 'Split B2B' },
    { id: 'channel-manager', label: 'OTA Channel Rates', icon: Globe, badge: 'MMT/Agoda' },
    { id: 'banquets', label: 'Banquet & MICE Booking', icon: Landmark, badge: '3 Halls' },
    { id: 'concierge', label: 'Concierge & VIP Desk', icon: Car, badge: 'Airport Cabs' },
    { id: 'night-audit', label: 'Night Audit & RevPAR', icon: Moon, badge: 'Flash Close' },
    { id: 'inventory', label: 'Linen & Amenities Stock', icon: Package, badge: 'Stockroom' },
  ];

  const currentNav = navigationItems.find(n => n.id === activeSubPage) || navigationItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Navigation Sidebar - Styled exactly like Admin Panel */}
      <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Hotel & Resort PMS</span>
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
          </div>
          <span className="px-2 py-0.5 bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-extrabold rounded-full border border-purple-200">
            10 Modules
          </span>
        </div>

        {/* Vertical Navigation Buttons */}
        <nav className="space-y-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSubPage(item.id as HotelSubPage)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#5B21B6] text-white shadow-xs'
                    : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E1B4B]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#5B21B6]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                      isActive ? 'bg-white text-[#5B21B6]' : 'bg-[#EDE9FE] text-[#5B21B6]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Hotel Stats Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#FAF8FF] to-[#EDE9FE]/40 rounded-xl border border-[#DDD6FE] space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#1E1B4B]">
            <span>Tonight's Status</span>
            <span className="text-emerald-700 font-extrabold">34/40 Occupied</span>
          </div>
          <div className="space-y-1 text-[11px] text-[#475569]">
            <div className="flex justify-between">
              <span>Occupancy:</span>
              <span className="font-bold text-[#1E1B4B]">85%</span>
            </div>
            <div className="flex justify-between">
              <span>ADR:</span>
              <span className="font-bold text-[#1E1B4B]">₹4,076</span>
            </div>
            <div className="flex justify-between">
              <span>RevPAR:</span>
              <span className="font-bold text-[#1E1B4B]">₹3,465</span>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.("Manager Night Audit Flash Summary Printed!")}
          className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Daily Flash Report</span>
        </button>
      </aside>

      {/* Right Main Content Area */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        {/* Dynamic Breadcrumb Header */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>Hotel & Resort CRM</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-[#5B21B6]">{currentNav.label}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#64748B]">Current Section:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#5B21B6] font-extrabold text-[11px]">
              {currentNav.label} ({currentNav.badge})
            </span>
          </div>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="transition-all">
          {activeSubPage === 'tape-chart' && <HotelTapeChart onNotify={onNotify} />}
          {activeSubPage === 'check-in' && <HotelCheckIn onNotify={onNotify} />}
          {activeSubPage === 'dining-pos' && <HotelDiningPos onNotify={onNotify} />}
          {activeSubPage === 'housekeeping' && <HotelHousekeeping onNotify={onNotify} />}
          {activeSubPage === 'folio-billing' && <HotelFolioBilling onNotify={onNotify} />}
          {activeSubPage === 'channel-manager' && <HotelChannelManager onNotify={onNotify} />}
          {activeSubPage === 'banquets' && <HotelBanquets onNotify={onNotify} />}
          {activeSubPage === 'concierge' && <HotelConcierge onNotify={onNotify} />}
          {activeSubPage === 'night-audit' && <HotelNightAudit onNotify={onNotify} />}
          {activeSubPage === 'inventory' && <HotelInventory onNotify={onNotify} />}
        </div>
      </div>
    </div>
  );
};
