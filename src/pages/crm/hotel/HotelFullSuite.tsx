import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Building2, UserCheck, Utensils, Sparkles, FileText, 
  Globe, Landmark, Car, Moon, Package, ChevronRight, Printer,
  Menu, X, ChevronDown, BookmarkCheck, Clock, Star
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
import { HotelReservations } from './HotelReservations';
import { HotelStaffShifts } from './HotelStaffShifts';
import { HotelReviewsReports } from './HotelReviewsReports';

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
  | 'inventory'
  | 'reservations'
  | 'shifts'
  | 'reviews';

export const HotelFullSuite: React.FC<{ onNotify?: (msg: string) => void; banner?: React.ReactNode; statusNotification?: React.ReactNode }> = ({ onNotify, banner, statusNotification }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const validTabs: HotelSubPage[] = [
    'tape-chart', 'check-in', 'dining-pos', 'housekeeping', 'folio-billing', 
    'channel-manager', 'banquets', 'concierge', 'night-audit', 'inventory',
    'reservations', 'shifts', 'reviews'
  ];
  const tabFromUrl = searchParams.get('tab') as HotelSubPage;
  const activeSubPage: HotelSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'tape-chart';

  const setActiveSubPage = (tab: HotelSubPage) => {
    setSearchParams({ tab });
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'tape-chart', label: 'Calendar', icon: Building2, badge: '85% Full' },
    { id: 'check-in', label: 'Check-In', icon: UserCheck, badge: 'Verified' },
    { id: 'dining-pos', label: 'Dining', icon: Utensils, badge: 'Live Orders' },
    { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles, badge: 'Clean Desk' },
    { id: 'folio-billing', label: 'Billing', icon: FileText, badge: 'Split Bill' },
    { id: 'channel-manager', label: 'Rates', icon: Globe, badge: 'OTAs' },
    { id: 'banquets', label: 'Banquets', icon: Landmark, badge: '3 Halls' },
    { id: 'concierge', label: 'Cabs', icon: Car, badge: 'Airport Cabs' },
    { id: 'night-audit', label: 'Closing', icon: Moon, badge: 'Day Summary' },
    { id: 'inventory', label: 'Linen', icon: Package, badge: 'Stockroom' },
    { id: 'reservations', label: 'Bookings', icon: BookmarkCheck, badge: 'Direct/OTA' },
    { id: 'shifts', label: 'Roster', icon: Clock, badge: '5 Staff' },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: '4.7 ★' },
  ];

  const currentNav = navigationItems.find(n => n.id === activeSubPage) || navigationItems[0];

  return (
    <div className="flex flex-col lg:flex-row flex-1 w-full min-h-[calc(100vh-57px)]">
      {/* Mobile-Only Navigation Bar & Quick Tabs */}
      <div className="lg:hidden w-full space-y-2.5">
        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-2 text-xs font-extrabold text-[#1E1B4B] bg-[#F1F5F9] hover:bg-[#E2E8F0] px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <Menu className="h-4 w-4 text-[#5B21B6]" />
            <span className="truncate max-w-[170px]">{currentNav.label}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-[#5B21B6] text-white">
              {currentNav.badge}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-xs font-bold text-[#5B21B6] px-3 py-2 rounded-xl border border-purple-200 bg-purple-50 cursor-pointer"
          >
            All 10 Modules ▾
          </button>
        </div>

        {/* Mobile Swipeable Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSubPage(item.id as HotelSubPage)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#5B21B6] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#5B21B6]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl p-4 overflow-y-auto z-10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Hotel & Resort PMS</span>
                  <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Hotel Stats Card */}
              <div className="p-3 bg-gradient-to-br from-[#FAF8FF] to-[#EDE9FE]/40 rounded-xl border border-[#DDD6FE] space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-[#1E1B4B]">
                  <span>Tonight's Status</span>
                  <span className="text-emerald-700 font-extrabold">34/40 Rooms</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#475569]">
                  <span>Occupancy: 85%</span>
                  <span>ADR: ₹4,076</span>
                </div>
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
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNotify?.("Manager Night Audit Flash Summary Printed!");
                }}
                className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Flash Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Left Navigation Sidebar - Docked to left edge like Admin Panel */}
      <aside className="hidden lg:block w-64 lg:w-72 shrink-0 border-r border-[#E2E8F0] bg-white p-4 space-y-4 lg:sticky lg:top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Hotel & Resort PMS</span>
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
          </div>
          <span className="px-2 py-0.5 bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-extrabold rounded-full border border-purple-200">
            13 Modules
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
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-6 space-y-5">
        {banner}
        {statusNotification}

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
          {activeSubPage === 'reservations' && <HotelReservations onNotify={onNotify} />}
          {activeSubPage === 'shifts' && <HotelStaffShifts onNotify={onNotify} />}
          {activeSubPage === 'reviews' && <HotelReviewsReports onNotify={onNotify} />}
        </div>
      </main>
    </div>
  );
};
