import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, Utensils, ShoppingBag, Calculator, Users, 
  Truck, FileText, Sparkles, Building2, ChevronRight, 
  Printer, CheckCircle2, DollarSign, Clock, Layers,
  Camera, Moon, Receipt, ShieldCheck, Car, Menu, X, ChevronDown
} from 'lucide-react';
import { CateringEvents } from './CateringEvents';
import { CateringMenus } from './CateringMenus';
import { CateringGrocery } from './CateringGrocery';
import { CateringCosting } from './CateringCosting';
import { CateringStaff } from './CateringStaff';
import { CateringVessels } from './CateringVessels';
import { CateringInvoices } from './CateringInvoices';
import { CateringTasting } from './CateringTasting';
import { CateringVendors } from './CateringVendors';
import { CateringPhotos } from './CateringPhotos';
import { CateringMuhurtham } from './CateringMuhurtham';
import { CateringExpenses } from './CateringExpenses';
import { CateringFoodSafety } from './CateringFoodSafety';
import { CateringVehicles } from './CateringVehicles';

export type CateringSubPage = 
  | 'events' 
  | 'menus' 
  | 'photos'
  | 'muhurtham'
  | 'tasting'
  | 'invoices' 
  | 'costing' 
  | 'expenses'
  | 'vendors'
  | 'grocery' 
  | 'vessels' 
  | 'safety'
  | 'vehicles'
  | 'staff';

export const CateringFullSuite: React.FC<{ onNotify?: (msg: string) => void; banner?: React.ReactNode; statusNotification?: React.ReactNode }> = ({ onNotify, banner, statusNotification }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const validTabs: CateringSubPage[] = [
    'events', 'menus', 'photos', 'muhurtham', 'tasting',
    'invoices', 'costing', 'expenses', 'vendors',
    'grocery', 'vessels', 'safety', 'vehicles', 'staff'
  ];
  const tabFromUrl = searchParams.get('tab') as CateringSubPage;
  const activeSubPage: CateringSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'events';

  const setActiveSubPage = (tab: CateringSubPage) => {
    setSearchParams({ tab });
    setMobileMenuOpen(false);
  };

  const navSections = [
    {
      title: 'Sales',
      items: [
        { id: 'events', label: 'Bookings', icon: Calendar, badge: '5 Booked' },
        { id: 'menus', label: 'Menus', icon: Utensils, badge: '3 Packages' },
        { id: 'photos', label: 'Gallery', icon: Camera, badge: 'Gallery' },
        { id: 'muhurtham', label: 'Calendar', icon: Moon, badge: 'Dates' },
        { id: 'tasting', label: 'Tasting', icon: Sparkles, badge: '3 Sessions' },
      ],
    },
    {
      title: 'Finance',
      items: [
        { id: 'invoices', label: 'Invoices', icon: FileText, badge: '20/50/30' },
        { id: 'costing', label: 'Costing', icon: Calculator, badge: 'Profit Engine' },
        { id: 'expenses', label: 'Expenses', icon: Receipt, badge: 'Petty Cash' },
        { id: 'vendors', label: 'Vendors', icon: Building2, badge: '5 Mandis' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { id: 'grocery', label: 'Groceries', icon: ShoppingBag, badge: 'Auto Qty' },
        { id: 'vessels', label: 'Vessels', icon: Truck, badge: 'Loading Sheet' },
        { id: 'safety', label: 'Safety', icon: ShieldCheck, badge: 'FSSAI Pass' },
        { id: 'vehicles', label: 'Vehicles', icon: Car, badge: '3 Vans' },
        { id: 'staff', label: 'Staff', icon: Users, badge: '7 Staff' },
      ],
    },
  ];

  const allItems = navSections.flatMap(s => s.items);
  const currentNav = allItems.find(n => n.id === activeSubPage) || allItems[0];

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
            All 14 Tools ▾
          </button>
        </div>

        {/* Mobile Swipeable Quick Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
          {allItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSubPage(item.id as CateringSubPage)}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Catering Suite</span>
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

              {/* Categorized Navigation Buttons */}
              <nav className="space-y-4">
                {navSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <div className="px-3 pt-1 pb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                        {section.title}
                      </span>
                    </div>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSubPage === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveSubPage(item.id as CateringSubPage)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer text-left ${
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
                  </div>
                ))}
              </nav>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNotify?.("Kirana Parchi & Function schedule printed for kitchen head cook!");
                }}
                className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Schedule</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Left Navigation Sidebar - Docked to left edge like Admin Panel */}
      <aside className="hidden lg:block w-64 lg:w-72 shrink-0 border-r border-[#E2E8F0] bg-white p-4 space-y-4 lg:sticky lg:top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Catering Suite</span>
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
          </div>
          <span className="px-2 py-0.5 bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-extrabold rounded-full border border-purple-200">
            14 Tools
          </span>
        </div>

        {/* Categorized Navigation Buttons */}
        <nav className="space-y-4">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 pt-1 pb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                  {section.title}
                </span>
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSubPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSubPage(item.id as CateringSubPage)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer text-left ${
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
            </div>
          ))}
        </nav>

        {/* Event Snapshot Widget */}
        <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-xl border border-purple-100 text-xs space-y-2">
          <div className="flex justify-between font-bold text-[#1E1B4B]">
            <span>Upcoming Muhurtham</span>
            <span className="text-[#5B21B6]">Tomorrow</span>
          </div>
          <div className="space-y-1 text-[11px] text-[#64748B]">
            <div className="flex justify-between">
              <span>Srikanth & Deepthi:</span>
              <span className="font-bold text-[#1E1B4B]">1,600 Plates</span>
            </div>
            <div className="flex justify-between">
              <span>Dr. Rahul Sangeet:</span>
              <span className="font-bold text-[#1E1B4B]">800 Plates</span>
            </div>
          </div>
          <div className="pt-2 border-t border-purple-100 flex items-center justify-between font-bold text-[#5B21B6] text-[11px]">
            <span>Week Headcount:</span>
            <span>2,750 Plates</span>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.("Kirana Parchi & Function schedule printed for kitchen head cook!")}
          className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Kitchen Schedule</span>
        </button>
      </aside>

      {/* Right Main Content Area for the Active Page */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-6 space-y-5">
        {banner}
        {statusNotification}

        {/* Active Page Header Breadcrumb */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>Catering Suite</span>
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

        {/* Dynamic Sub-Page View */}
        <div className="transition-all">
          {activeSubPage === 'events' && <CateringEvents onNotify={onNotify} />}
          {activeSubPage === 'menus' && <CateringMenus onNotify={onNotify} />}
          {activeSubPage === 'photos' && <CateringPhotos onNotify={onNotify} />}
          {activeSubPage === 'muhurtham' && <CateringMuhurtham onNotify={onNotify} />}
          {activeSubPage === 'tasting' && <CateringTasting onNotify={onNotify} />}
          {activeSubPage === 'invoices' && <CateringInvoices onNotify={onNotify} />}
          {activeSubPage === 'costing' && <CateringCosting onNotify={onNotify} />}
          {activeSubPage === 'expenses' && <CateringExpenses onNotify={onNotify} />}
          {activeSubPage === 'vendors' && <CateringVendors onNotify={onNotify} />}
          {activeSubPage === 'grocery' && <CateringGrocery onNotify={onNotify} />}
          {activeSubPage === 'vessels' && <CateringVessels onNotify={onNotify} />}
          {activeSubPage === 'safety' && <CateringFoodSafety onNotify={onNotify} />}
          {activeSubPage === 'vehicles' && <CateringVehicles onNotify={onNotify} />}
          {activeSubPage === 'staff' && <CateringStaff onNotify={onNotify} />}
        </div>
      </main>
    </div>
  );
};
