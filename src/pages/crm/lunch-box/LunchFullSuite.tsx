import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Utensils, Users, Calendar, Truck, Sparkles, 
  RotateCcw, Building2, MessageSquare, Package, 
  ChevronRight, Printer, Share2, CheckCircle2, ShieldCheck, Clock
} from 'lucide-react';
import { LunchManifest } from './LunchManifest';
import { LunchSubscribers } from './LunchSubscribers';
import { LunchCalendar } from './LunchCalendar';
import { LunchRoutes } from './LunchRoutes';
import { LunchMenu } from './LunchMenu';
import { LunchDabbaReturn } from './LunchDabbaReturn';
import { LunchCorporate } from './LunchCorporate';
import { LunchFeedback } from './LunchFeedback';
import { LunchInventory } from './LunchInventory';

export type LunchSubPage = 
  | 'manifest' 
  | 'subscribers' 
  | 'calendar' 
  | 'routes' 
  | 'menu' 
  | 'dabba' 
  | 'corporate' 
  | 'feedback' 
  | 'inventory';

export const LunchFullSuite: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const validTabs: LunchSubPage[] = [
    'manifest', 'subscribers', 'calendar', 'routes', 'menu', 
    'dabba', 'corporate', 'feedback', 'inventory'
  ];
  const tabFromUrl = searchParams.get('tab') as LunchSubPage;
  const activeSubPage: LunchSubPage = validTabs.includes(tabFromUrl) ? tabFromUrl : 'manifest';

  const setActiveSubPage = (tab: LunchSubPage) => {
    setSearchParams({ tab });
  };

  const navigationItems = [
    { id: 'manifest', label: 'Daily Kitchen Manifest', icon: Utensils, badge: '9:00 AM Lock' },
    { id: 'subscribers', label: 'Active Subscribers & Mandates', icon: Users, badge: '112 Active' },
    { id: 'calendar', label: 'WFH Pause & Day Credits', icon: Calendar, badge: '8:30 AM Cut' },
    { id: 'routes', label: 'Route Clustering & Riders', icon: Truck, badge: '4 Corridors' },
    { id: 'menu', label: '4-Week Rotating Food Menu', icon: Sparkles, badge: 'Week 1 Live' },
    { id: 'dabba', label: 'Dabba Return & Deposits', icon: RotateCcw, badge: '97% Return' },
    { id: 'corporate', label: 'Corporate Tech Contracts', icon: Building2, badge: '4 Tech Hubs' },
    { id: 'feedback', label: 'WhatsApp Ratings & Churn Desk', icon: MessageSquare, badge: '4.85 ★' },
    { id: 'inventory', label: 'Raw Pantry & Bagasse Trays', icon: Package, badge: 'Begum Bazar' },
  ];

  const currentNav = navigationItems.find(n => n.id === activeSubPage) || navigationItems[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left Navigation Sidebar - Styled exactly like the Admin Panel */}
      <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs space-y-4 lg:sticky lg:top-20">
        <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Lunch Box OS</span>
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
                onClick={() => setActiveSubPage(item.id as LunchSubPage)}
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

        {/* Quick Kitchen Operations Card */}
        <div className="p-3.5 bg-gradient-to-br from-[#FAF8FF] to-[#EDE9FE]/40 rounded-xl border border-[#DDD6FE] space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#1E1B4B]">
            <span>Today's Lunch Dispatch</span>
            <span className="text-emerald-700 font-extrabold">264 Boxes</span>
          </div>
          <div className="space-y-1 text-[11px] text-[#475569]">
            <div className="flex justify-between">
              <span>Veg Deluxe:</span>
              <span className="font-semibold text-gray-800">160 Boxes</span>
            </div>
            <div className="flex justify-between">
              <span>Non-Veg Special:</span>
              <span className="font-semibold text-red-700">52 Boxes</span>
            </div>
            <div className="flex justify-between">
              <span>High-Protein / Diet:</span>
              <span className="font-semibold text-purple-700">52 Boxes</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-purple-200/60 text-purple-900 font-bold">
              <span>Riders in Transit:</span>
              <span>4 Corridors</span>
            </div>
          </div>
        </div>

        {/* Quick Dispatch Action Button */}
        <button
          type="button"
          onClick={() => onNotify?.('Triggered all corridor route manifests to delivery riders via WhatsApp!')}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1E1B4B] hover:bg-[#2E1065] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
        >
          <Clock className="h-3.5 w-3.5 text-amber-300" />
          <span>Dispatch Rider Alert</span>
        </button>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 space-y-4">
        {/* Breadcrumb Header */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] px-5 py-3 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-gray-500">Lunch Box OS</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="font-extrabold text-[#5B21B6]">{currentNav.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNotify?.(`Generated daily run report for ${currentNav.label}`)}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#5B21B6] bg-gray-50 hover:bg-purple-50 px-3 py-1.5 rounded-lg border border-gray-200 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print Daily Sheet</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sub-Page Content */}
        {activeSubPage === 'manifest' && <LunchManifest onNotify={onNotify} />}
        {activeSubPage === 'subscribers' && <LunchSubscribers onNotify={onNotify} />}
        {activeSubPage === 'calendar' && <LunchCalendar onNotify={onNotify} />}
        {activeSubPage === 'routes' && <LunchRoutes onNotify={onNotify} />}
        {activeSubPage === 'menu' && <LunchMenu onNotify={onNotify} />}
        {activeSubPage === 'dabba' && <LunchDabbaReturn onNotify={onNotify} />}
        {activeSubPage === 'corporate' && <LunchCorporate onNotify={onNotify} />}
        {activeSubPage === 'feedback' && <LunchFeedback onNotify={onNotify} />}
        {activeSubPage === 'inventory' && <LunchInventory onNotify={onNotify} />}
      </main>
    </div>
  );
};
