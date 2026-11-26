import React, { useState } from 'react';
import { 
  Flame, Package, ShoppingCart, Store, ShoppingBag, 
  Coffee, Truck, Plane, BarChart3, ChevronRight, Printer
} from 'lucide-react';
import { KaramBatches } from './KaramBatches';
import { KaramInventory } from './KaramInventory';
import { KaramOrders } from './KaramOrders';
import { KaramWholesale } from './KaramWholesale';
import { KaramProcurement } from './KaramProcurement';
import { KaramTiffinSupply } from './KaramTiffinSupply';
import { KaramShipping } from './KaramShipping';
import { KaramExport } from './KaramExport';
import { KaramAnalytics } from './KaramAnalytics';

export type KaramSubPage = 
  | 'batches' 
  | 'inventory' 
  | 'orders' 
  | 'wholesale' 
  | 'procurement' 
  | 'tiffin-supply' 
  | 'shipping' 
  | 'export' 
  | 'analytics';

export const KaramFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeSubPage, setActiveSubPage] = useState<KaramSubPage>('batches');

  const navigationItems = [
    { id: 'batches', label: 'Roasting & Grinding Batches', icon: Flame, badge: '4 Batches' },
    { id: 'inventory', label: 'Packaged Stock & Barcodes', icon: Package, badge: '8 SKUs' },
    { id: 'orders', label: 'D2C Online & WhatsApp Orders', icon: ShoppingCart, badge: 'Live Orders' },
    { id: 'wholesale', label: 'B2B Supermarket Khata', icon: Store, badge: '4 Chains' },
    { id: 'procurement', label: 'Raw Mandi Spice Sourcing', icon: ShoppingBag, badge: 'Guntur/Byadgi' },
    { id: 'tiffin-supply', label: 'HORECA Tiffin Contracts', icon: Coffee, badge: 'Weekly 125kg' },
    { id: 'shipping', label: 'Courier Shipping & AWB Labels', icon: Truck, badge: 'Delhivery' },
    { id: 'export', label: 'NRI Global Export Desk', icon: Plane, badge: 'USA/UK/UAE' },
    { id: 'analytics', label: 'Flavor Margins & Analytics', icon: BarChart3, badge: '56% Margin' },
  ];

  const currentNav = navigationItems.find(n => n.id === activeSubPage) || navigationItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Navigation Sidebar - Styled exactly like the Admin Panel */}
      <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Karam Podi OS</span>
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
                onClick={() => setActiveSubPage(item.id as KaramSubPage)}
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

        {/* Quick Production Status Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#FAF8FF] to-[#EDE9FE]/40 rounded-xl border border-[#DDD6FE] space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#1E1B4B]">
            <span>Today's Grinding Run</span>
            <span className="text-emerald-700 font-extrabold">310.9 Kg</span>
          </div>
          <div className="space-y-1 text-[11px] text-[#475569]">
            <div className="flex justify-between">
              <span>Finished Stock:</span>
              <span className="font-bold text-[#1E1B4B]">2,070 Pouches</span>
            </div>
            <div className="flex justify-between">
              <span>Moisture Test:</span>
              <span className="font-bold text-emerald-700">&lt; 2.4% (Passed)</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Volume:</span>
              <span className="font-bold text-[#5B21B6]">1.10 Metric Tons</span>
            </div>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.("Daily Mill Grinding Sheet & QC Lab Report Printed!")}
          className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-[#5B21B6] text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Daily Grinding Sheet</span>
        </button>
      </aside>

      {/* Right Main Content Area */}
      <div className="flex-1 min-w-0 w-full space-y-4">
        {/* Dynamic Breadcrumb Header */}
        <div className="bg-white rounded-2xl px-5 py-3 border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>Karam Podi CRM</span>
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

        {/* Dynamic Component Rendering */}
        <div className="transition-all">
          {activeSubPage === 'batches' && <KaramBatches onNotify={onNotify} />}
          {activeSubPage === 'inventory' && <KaramInventory onNotify={onNotify} />}
          {activeSubPage === 'orders' && <KaramOrders onNotify={onNotify} />}
          {activeSubPage === 'wholesale' && <KaramWholesale onNotify={onNotify} />}
          {activeSubPage === 'procurement' && <KaramProcurement onNotify={onNotify} />}
          {activeSubPage === 'tiffin-supply' && <KaramTiffinSupply onNotify={onNotify} />}
          {activeSubPage === 'shipping' && <KaramShipping onNotify={onNotify} />}
          {activeSubPage === 'export' && <KaramExport onNotify={onNotify} />}
          {activeSubPage === 'analytics' && <KaramAnalytics onNotify={onNotify} />}
        </div>
      </div>
    </div>
  );
};
