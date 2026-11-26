import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  BedDouble, Users, CreditCard, Zap, Utensils, 
  ShieldAlert, ShieldCheck, Wrench, UserCog, ChevronRight, Printer,
  Menu, X, ChevronDown
} from 'lucide-react';
import { HostelRooms } from './HostelRooms';
import { HostelResidents } from './HostelResidents';
import { HostelBilling } from './HostelBilling';
import { HostelPower } from './HostelPower';
import { HostelMess } from './HostelMess';
import { HostelGatePass } from './HostelGatePass';
import { HostelDeposits } from './HostelDeposits';
import { HostelComplaints } from './HostelComplaints';
import { HostelStaff } from './HostelStaff';

export type HostelSubPage = 
  | 'rooms' 
  | 'residents' 
  | 'billing' 
  | 'power' 
  | 'mess' 
  | 'gate-pass' 
  | 'deposits' 
  | 'complaints' 
  | 'staff';

export const HostelFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const validTabs: HostelSubPage[] = [
    'rooms', 'residents', 'billing', 'power', 'mess', 'gate-pass', 'deposits', 'complaints', 'staff'
  ];
  const tabFromUrl = searchParams.get('tab') as HostelSubPage;
  const activeSubPage: HostelSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'rooms';

  const setActiveSubPage = (tab: HostelSubPage) => {
    setSearchParams({ tab });
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'rooms', label: 'Rooms & Bed Matrix', icon: BedDouble, badge: '91% Full' },
    { id: 'residents', label: 'Residents Directory & KYC', icon: Users, badge: '120 Active' },
    { id: 'billing', label: 'Monthly Rent & Fees', icon: CreditCard, badge: 'Due 5th' },
    { id: 'power', label: 'Sub-Meter Splitter', icon: Zap, badge: '₹11/unit' },
    { id: 'mess', label: 'Mess & Meal Planner', icon: Utensils, badge: '7 Days' },
    { id: 'gate-pass', label: 'Gate Pass & Curfew Log', icon: ShieldAlert, badge: '09:30 PM' },
    { id: 'deposits', label: 'Deposits & Move-Out', icon: ShieldCheck, badge: 'No Dues' },
    { id: 'complaints', label: 'Maintenance Desk', icon: Wrench, badge: '2 Open' },
    { id: 'staff', label: 'Warden & Staff Roster', icon: UserCog, badge: '5 Staff' },
  ];

  const currentNav = navigationItems.find(n => n.id === activeSubPage) || navigationItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
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
            All 9 Tools ▾
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
                onClick={() => setActiveSubPage(item.id as HostelSubPage)}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Hostel & PG Suite</span>
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

              {/* Occupancy Mini Meter */}
              <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-xl border border-purple-100">
                <div className="flex justify-between text-[11px] font-bold text-purple-900 mb-1">
                  <span>Bed Occupancy</span>
                  <span>120 / 132 Beds</span>
                </div>
                <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#5B21B6] h-full rounded-full" style={{ width: '91%' }} />
                </div>
                <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
                  <span>91% Occupied</span>
                  <span className="text-emerald-700 font-bold">12 Vacant Beds</span>
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
                      onClick={() => setActiveSubPage(item.id as HostelSubPage)}
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
                  onNotify?.("Hostel Rent Collection Schedule & Mess List Printed!");
                }}
                className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Rent Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Left Navigation Sidebar */}
      <aside className="hidden lg:block lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Hostel & PG Suite</span>
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
          </div>
          <span className="px-2 py-0.5 bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-extrabold rounded-full border border-purple-200">
            9 Pages
          </span>
        </div>

        {/* Occupancy Mini Meter */}
        <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-xl border border-purple-100">
          <div className="flex justify-between text-[11px] font-bold text-purple-900 mb-1">
            <span>Bed Occupancy</span>
            <span>120 / 132 Beds</span>
          </div>
          <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#5B21B6] h-full rounded-full" style={{ width: '91%' }} />
          </div>
          <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
            <span>91% Occupied</span>
            <span className="text-emerald-700 font-bold">12 Vacant Beds</span>
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
                onClick={() => setActiveSubPage(item.id as HostelSubPage)}
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

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.("Hostel Rent Collection Schedule & Mess List Printed!")}
          className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Monthly Rent Sheet</span>
        </button>
      </aside>

      {/* Right Main Content Area */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        {/* Dynamic Breadcrumb Header */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>Hostel & PG CRM</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-bold text-[#5B21B6]">{currentNav.label}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#64748B]">Active Section:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#5B21B6] font-extrabold text-[11px]">
              {currentNav.label} ({currentNav.badge})
            </span>
          </div>
        </div>

        {/* Active Page Component */}
        <div className="transition-all">
          {activeSubPage === 'rooms' && <HostelRooms onNotify={onNotify} />}
          {activeSubPage === 'residents' && <HostelResidents onNotify={onNotify} />}
          {activeSubPage === 'billing' && <HostelBilling onNotify={onNotify} />}
          {activeSubPage === 'power' && <HostelPower onNotify={onNotify} />}
          {activeSubPage === 'mess' && <HostelMess onNotify={onNotify} />}
          {activeSubPage === 'gate-pass' && <HostelGatePass onNotify={onNotify} />}
          {activeSubPage === 'deposits' && <HostelDeposits onNotify={onNotify} />}
          {activeSubPage === 'complaints' && <HostelComplaints onNotify={onNotify} />}
          {activeSubPage === 'staff' && <HostelStaff onNotify={onNotify} />}
        </div>
      </div>
    </div>
  );
};
