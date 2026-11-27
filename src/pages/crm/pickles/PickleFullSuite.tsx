import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Layers, Package, ShoppingCart, Store, ShoppingBag, 
  Flame, Truck, Plane, BarChart3, ChevronRight, Printer,
  Menu, X, ChevronDown
} from 'lucide-react';
import { PickleCuring } from './PickleCuring';
import { PickleInventory } from './PickleInventory';
import { PickleOrders } from './PickleOrders';
import { PickleWholesale } from './PickleWholesale';
import { PickleProcurement } from './PickleProcurement';
import { PickleNonVegKitchen } from './PickleNonVegKitchen';
import { PickleShipping } from './PickleShipping';
import { PickleExport } from './PickleExport';
import { PickleAnalytics } from './PickleAnalytics';

export type PickleSubPage = 
  | 'curing' 
  | 'inventory' 
  | 'orders' 
  | 'wholesale' 
  | 'procurement' 
  | 'non-veg' 
  | 'shipping' 
  | 'export' 
  | 'analytics';

export const PickleFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const validTabs: PickleSubPage[] = [
    'curing', 'inventory', 'orders', 'wholesale', 'procurement', 
    'non-veg', 'shipping', 'export', 'analytics'
  ];
  const tabFromUrl = searchParams.get('tab') as PickleSubPage;
  const activeSubPage: PickleSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'curing';

  const setActiveSubPage = (tab: PickleSubPage) => {
    setSearchParams({ tab });
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: 'curing', label: 'Jaadi Curing', icon: Layers, badge: '4 Bharanis' },
    { id: 'inventory', label: 'Bottled Stock', icon: Package, badge: '8 SKUs' },
    { id: 'orders', label: 'Customer Orders', icon: ShoppingCart, badge: 'Live Orders' },
    { id: 'wholesale', label: 'Supermarket Khata', icon: Store, badge: '4 Chains' },
    { id: 'procurement', label: 'Raw Oils & Mangoes', icon: ShoppingBag, badge: 'Nuzvid/Tenali' },
    { id: 'non-veg', label: 'Non-Veg Kitchen', icon: Flame, badge: 'HACCP Safe' },
    { id: 'shipping', label: 'Glass Shipping', icon: Truck, badge: 'Delhivery' },
    { id: 'export', label: 'Export Orders', icon: Plane, badge: 'USA/UK/UAE' },
    { id: 'analytics', label: 'Flavor Margins', icon: BarChart3, badge: '58% Margin' },
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
                onClick={() => setActiveSubPage(item.id as PickleSubPage)}
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
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Pickle OS</span>
                  <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="space-y-1">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeSubPage === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSubPage(item.id as PickleSubPage)}
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

            {/* Quick Action Button in Drawer */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNotify?.("Pickle Aging Matrix & HACCP Report Printed!");
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Aging & Lab Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Navigation Sidebar - Styled exactly like the Admin Panel */}
      <aside className="hidden lg:block lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Pickle OS</span>
            <h3 className="font-extrabold text-sm text-[#1E1B4B]">Navigation Menu</h3>
          </div>
          <span className="px-2 py-0.5 bg-[#EDE9FE] text-[#5B21B6] text-[10px] font-extrabold rounded-full border border-purple-200">
            9 Modules
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
                onClick={() => setActiveSubPage(item.id as PickleSubPage)}
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

        {/* Quick Pickle Status Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#FAF8FF] to-[#EDE9FE]/40 rounded-xl border border-[#DDD6FE] space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#1E1B4B]">
            <span>Curing & Aging Status</span>
            <span className="text-emerald-700 font-extrabold">450 Kg Curing</span>
          </div>
          <div className="space-y-1 text-[11px] text-[#475569]">
            <div className="flex justify-between">
              <span>Bottled Jars:</span>
              <span className="font-bold text-[#1E1B4B]">1,675 Jars</span>
            </div>
            <div className="flex justify-between">
              <span>Average pH Level:</span>
              <span className="font-bold text-emerald-700">3.4 pH (Fungus-proof)</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Volume:</span>
              <span className="font-bold text-[#5B21B6]">2,170 Jars Sold</span>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.("Daily Bharani Curing Manifest & Bottling Schedule Printed!")}
          className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Curing Schedule</span>
        </button>
      </aside>

      {/* Right Main Content Area */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        {/* Dynamic Breadcrumb Header */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>Pickle Sales CRM</span>
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
          {activeSubPage === 'curing' && <PickleCuring onNotify={onNotify} />}
          {activeSubPage === 'inventory' && <PickleInventory onNotify={onNotify} />}
          {activeSubPage === 'orders' && <PickleOrders onNotify={onNotify} />}
          {activeSubPage === 'wholesale' && <PickleWholesale onNotify={onNotify} />}
          {activeSubPage === 'procurement' && <PickleProcurement onNotify={onNotify} />}
          {activeSubPage === 'non-veg' && <PickleNonVegKitchen onNotify={onNotify} />}
          {activeSubPage === 'shipping' && <PickleShipping onNotify={onNotify} />}
          {activeSubPage === 'export' && <PickleExport onNotify={onNotify} />}
          {activeSubPage === 'analytics' && <PickleAnalytics onNotify={onNotify} />}
        </div>
      </div>
    </div>
  );
};
