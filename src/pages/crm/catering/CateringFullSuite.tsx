import React, { useState } from 'react';
import { 
  Calendar, Utensils, ShoppingBag, Calculator, Users, 
  Truck, FileText, Sparkles, Building2, ChevronRight, Download, Share2
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
  const [activeSubPage, setActiveSubPage] = useState<CateringSubPage>('events');

  const navigationItems = [
    { id: 'events', label: 'Functions & Diary', icon: Calendar, badge: '5 Booked' },
    { id: 'menus', label: 'Menu & Plate Rates', icon: Utensils, badge: '3 Packages' },
    { id: 'grocery', label: 'Kirana & Mandi Calculator', icon: ShoppingBag, badge: 'Auto Qty' },
    { id: 'costing', label: 'True Plate Cost & Margin', icon: Calculator, badge: 'Profit Engine' },
    { id: 'staff', label: 'Cooks & Waiter Roster', icon: Users, badge: '7 Staff' },
    { id: 'vessels', label: 'Degs & Truck Loading Sheet', icon: Truck, badge: 'Loading Gate' },
    { id: 'invoices', label: 'Milestone Bills & GST', icon: FileText, badge: '20/50/30' },
    { id: 'tasting', label: 'Food Tasting Sessions', icon: Sparkles, badge: '3 Sessions' },
    { id: 'vendors', label: 'Wholesale Mandi Khata', icon: Building2, badge: '5 Vendors' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Secondary Navigation Ribbon for Catering CRM */}
      <div className="bg-white rounded-2xl p-2 border border-purple-100 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSubPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubPage(item.id as CateringSubPage)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-purple-700 text-white shadow-sm ring-1 ring-purple-600' 
                    : 'text-gray-600 hover:text-purple-900 hover:bg-purple-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                <span>{item.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  isActive ? 'bg-purple-800 text-purple-100' : 'bg-purple-100 text-purple-700'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Module */}
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
  );
};
