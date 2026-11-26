import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, Utensils, ShoppingBag, Calculator, Users, 
  Truck, FileText, Sparkles, Building2, ChevronRight, 
  Printer, CheckCircle2, DollarSign, Clock, Layers,
  Camera, Moon, Receipt, ShieldCheck, Car
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

export const CateringFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validTabs: CateringSubPage[] = [
    'events', 'menus', 'photos', 'muhurtham', 'tasting',
    'invoices', 'costing', 'expenses', 'vendors',
    'grocery', 'vessels', 'safety', 'vehicles', 'staff'
  ];
  const tabFromUrl = searchParams.get('tab') as CateringSubPage;
  const activeSubPage: CateringSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'events';

  const setActiveSubPage = (tab: CateringSubPage) => {
    setSearchParams({ tab });
  };

  const navSections = [
    {
      title: 'Events & Sales',
      items: [
        { id: 'events', label: 'Functions & Diary', icon: Calendar, badge: '5 Booked' },
        { id: 'menus', label: 'Menu & Plate Packages', icon: Utensils, badge: '3 Packages' },
        { id: 'photos', label: 'Food Photos & Portfolio', icon: Camera, badge: 'Gallery' },
        { id: 'muhurtham', label: 'Festivals & Muhurthams', icon: Moon, badge: 'Panchangam' },
        { id: 'tasting', label: 'Food Tasting Sessions', icon: Sparkles, badge: '3 Sessions' },
      ],
    },
    {
      title: 'Money & Financials',
      items: [
        { id: 'invoices', label: 'Milestone Bills & GST', icon: FileText, badge: '20/50/30' },
        { id: 'costing', label: 'True Plate Cost & Profit', icon: Calculator, badge: 'Profit Engine' },
        { id: 'expenses', label: 'Kitchen Daily Expenses', icon: Receipt, badge: 'Petty Cash' },
        { id: 'vendors', label: 'Wholesale Mandi Khata', icon: Building2, badge: '5 Mandis' },
      ],
    },
    {
      title: 'Kitchen & Operations',
      items: [
        { id: 'grocery', label: 'Kirana & Mandi Estimator', icon: ShoppingBag, badge: 'Auto Qty' },
        { id: 'vessels', label: 'Degs & Loading Gate-Pass', icon: Truck, badge: 'Loading Sheet' },
        { id: 'safety', label: 'Food Safety & Hygiene', icon: ShieldCheck, badge: 'FSSAI Pass' },
        { id: 'vehicles', label: 'Vehicles & Transit Fleet', icon: Car, badge: '3 Vans' },
        { id: 'staff', label: 'Cooks & Waiter Roster', icon: Users, badge: '7 Staff' },
      ],
    },
  ];

  const allItems = navSections.flatMap(s => s.items);
  const currentNav = allItems.find(n => n.id === activeSubPage) || allItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Navigation Sidebar - Grouped with Section Headers matching Screenshot */}
      <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
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
      <div className="flex-1 min-w-0 w-full space-y-4">
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
      </div>
    </div>
  );
};
