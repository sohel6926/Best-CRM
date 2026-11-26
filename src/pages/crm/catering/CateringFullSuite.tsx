import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, Utensils, ShoppingBag, Calculator, Users, 
  Truck, FileText, Sparkles, Building2, ChevronRight, Download, Share2,
  Printer, CheckCircle2, DollarSign, Clock, Layers
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

export type CateringSubPage = 
  | 'events' 
  | 'menus' 
  | 'grocery' 
  | 'costing' 
  | 'staff' 
  | 'vessels' 
  | 'invoices' 
  | 'tasting' 
  | 'vendors';

export const CateringFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validTabs: CateringSubPage[] = [
    'events', 'menus', 'grocery', 'costing', 'staff', 'vessels', 'invoices', 'tasting', 'vendors'
  ];
  const tabFromUrl = searchParams.get('tab') as CateringSubPage;
  const activeSubPage: CateringSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'events';

  const setActiveSubPage = (tab: CateringSubPage) => {
    setSearchParams({ tab });
  };

  const navigationItems = [
    { id: 'events', label: 'Functions & Diary', icon: Calendar, badge: '5 Booked' },
    { id: 'menus', label: 'Menu & Plate Rates', icon: Utensils, badge: '3 Packages' },
    { id: 'grocery', label: 'Kirana & Mandi Estimator', icon: ShoppingBag, badge: 'Auto Qty' },
    { id: 'costing', label: 'True Plate Cost & Margin', icon: Calculator, badge: 'Profit Engine' },
    { id: 'staff', label: 'Cooks & Waiter Roster', icon: Users, badge: '7 Staff' },
    { id: 'vessels', label: 'Degs & Loading Gate-Pass', icon: Truck, badge: 'Loading Sheet' },
    { id: 'invoices', label: 'Milestone Bills & GST', icon: FileText, badge: '20/50/30' },
    { id: 'tasting', label: 'Food Tasting Sessions', icon: Sparkles, badge: '3 Sessions' },
    { id: 'vendors', label: 'Wholesale Mandi Khata', icon: Building2, badge: '5 Vendors' },
  ];

  const currentNav = navigationItems.find(n => n.id === activeSubPage) || navigationItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Navigation Sidebar - Styled just like the Admin Panel */}
      <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Catering Suite</span>
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
          </div>
          <span className="px-2 py-0.5 bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-extrabold rounded-full border border-purple-200">
            9 Pages
          </span>
        </div>

        {/* Vertical Navigation Buttons - Identical to Admin Panel */}
        <nav className="space-y-1">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSubPage(item.id as CateringSubPage)}
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

        {/* Quick Function Operations Summary Widget in Sidebar */}
        <div className="p-3.5 bg-gradient-to-br from-[#FAF8FF] to-[#EDE9FE]/40 rounded-xl border border-[#DDD6FE] space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#1E1B4B]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5B21B6]" />
              This Week's Orders
            </span>
            <span className="text-emerald-700 font-extrabold">3 Active</span>
          </div>
          <div className="space-y-1 text-[11px] text-[#475569]">
            <div className="flex justify-between">
              <span>Srikanth Wedding:</span>
              <span className="font-bold text-[#1E1B4B]">1,600 Plates</span>
            </div>
            <div className="flex justify-between">
              <span>Dr. Rahul Sangeet:</span>
              <span className="font-bold text-[#1E1B4B]">800 Plates</span>
            </div>
            <div className="flex justify-between">
              <span>Tech Mahindra Summit:</span>
              <span className="font-bold text-[#1E1B4B]">350 Plates</span>
            </div>
          </div>
          <div className="pt-2 border-t border-purple-100 flex items-center justify-between font-bold text-[#5B21B6] text-[11px]">
            <span>Total Week Headcount:</span>
            <span>2,750 Plates</span>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.("Kirana Parchi & Function schedule printed for kitchen head cook!")}
          className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition"
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
            <span>Catering CRM</span>
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
          {activeSubPage === 'grocery' && <CateringGrocery onNotify={onNotify} />}
          {activeSubPage === 'costing' && <CateringCosting onNotify={onNotify} />}
          {activeSubPage === 'staff' && <CateringStaff onNotify={onNotify} />}
          {activeSubPage === 'vessels' && <CateringVessels onNotify={onNotify} />}
          {activeSubPage === 'invoices' && <CateringInvoices onNotify={onNotify} />}
          {activeSubPage === 'tasting' && <CateringTasting onNotify={onNotify} />}
          {activeSubPage === 'vendors' && <CateringVendors onNotify={onNotify} />}
        </div>
      </div>
    </div>
  );
};
