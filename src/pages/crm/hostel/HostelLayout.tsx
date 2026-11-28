import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BedDouble,
  Users,
  CreditCard,
  Zap,
  Utensils,
  ShieldAlert,
  ShieldCheck,
  Wrench,
  UserCog,
  Menu,
  X,
  Bell,
  Layers,
  ArrowLeft,
  Share2,
  Sparkles,
  Building2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { BrandLogo } from '../../../components/BrandLogo';
import { HostelRooms } from './HostelRooms';
import { HostelResidents } from './HostelResidents';
import { HostelBilling } from './HostelBilling';
import { HostelPower } from './HostelPower';
import { HostelMess } from './HostelMess';
import { HostelGatePass } from './HostelGatePass';
import { HostelDeposits } from './HostelDeposits';
import { HostelComplaints } from './HostelComplaints';
import { HostelStaff } from './HostelStaff';

export function HostelLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'rooms';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const setTab = (tab: string) => {
    setSearchParams({ tab });
    setSidebarOpen(false);
  };

  const navItems = [
    { id: 'rooms', label: 'Rooms', icon: BedDouble, badge: '91% Full' },
    { id: 'residents', label: 'Residents', icon: Users, badge: '120 Active' },
    { id: 'billing', label: 'Rent', icon: CreditCard, badge: 'Due 5th' },
    { id: 'power', label: 'Electricity Bills', icon: Zap, badge: '₹11/unit' },
    { id: 'mess', label: 'Mess', icon: Utensils, badge: '7 Days' },
    { id: 'gate-pass', label: 'Gate Passes', icon: ShieldAlert, badge: '09:30 PM' },
    { id: 'deposits', label: 'Deposits', icon: ShieldCheck, badge: 'No Dues' },
    { id: 'complaints', label: 'Maintenance', icon: Wrench, badge: '2 Open' },
    { id: 'staff', label: 'Staff', icon: UserCog, badge: '5 Staff' },
  ];

  const currentNav = navItems.find(n => n.id === currentTab) || navItems[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-[#1E293B]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white px-4 py-3 shadow-xs sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" aria-label="Go to bestCRM public site" className="flex items-center gap-2">
              <BrandLogo />
              <span className="hidden sm:inline-block rounded-md bg-[#EDE9FE] px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#5B21B6]">
                HOSTEL & PG CRM
              </span>
            </Link>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-xl border border-purple-100 text-xs">
              <Building2 className="w-4 h-4 text-purple-700" />
              <span className="font-bold text-purple-950">Royal Palms Executive Hostel & PG (Block A)</span>
            </div>

            <Link
              to="/app/catering-crm"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3 py-1.5 text-xs font-bold text-[#5B21B6] hover:bg-[#F3EEFF] transition"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Switch Industry CRM</span>
            </Link>

            <button
              type="button"
              onClick={() => showNotification('New admission wizard opened!')}
              className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95] shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>+ New Admission</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-purple-950 px-4 py-2.5 text-xs font-semibold text-white shadow-xl flex items-center gap-2 border border-purple-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Body */}
      <div className="flex flex-1">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}

        {/* Left Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-[#E2E8F0] p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-0 hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 lg:hidden">
            <span className="text-xs font-bold text-gray-500 uppercase">Hostel Navigation</span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Occupancy Mini Meter */}
          <div className="my-3 p-3 bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-xl border border-purple-100">
            <div className="flex justify-between text-[11px] font-bold text-purple-900 mb-1">
              <span>Bed Occupancy</span>
              <span>120 / 132 Beds</span>
            </div>
            <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-700 h-full rounded-full" style={{ width: '91%' }} />
            </div>
            <div className="text-[10px] text-gray-500 mt-1 flex justify-between">
              <span>91% Occupied</span>
              <span className="text-emerald-700 font-bold">12 Vacant</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    isActive 
                      ? 'bg-purple-700 text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isActive ? 'bg-purple-800 text-purple-100' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Bottom link to Admin Panel */}
          <div className="mt-8 pt-4 border-t border-gray-100 space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-purple-700 hover:bg-gray-50 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Master Admin</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Breadcrumb Header */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-4 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Link to="/app" className="hover:text-purple-700">Hostel & PG CRM</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="font-bold text-purple-900">{currentNav.label}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 mt-1">{currentNav.label}</h1>
            </div>
          </div>

          {/* Active Individual Page */}
          {currentTab === 'rooms' && <HostelRooms onNotify={showNotification} />}
          {currentTab === 'residents' && <HostelResidents onNotify={showNotification} />}
          {currentTab === 'billing' && <HostelBilling onNotify={showNotification} />}
          {currentTab === 'power' && <HostelPower onNotify={showNotification} />}
          {currentTab === 'mess' && <HostelMess onNotify={showNotification} />}
          {currentTab === 'gate-pass' && <HostelGatePass onNotify={showNotification} />}
          {currentTab === 'deposits' && <HostelDeposits onNotify={showNotification} />}
          {currentTab === 'complaints' && <HostelComplaints onNotify={showNotification} />}
          {currentTab === 'staff' && <HostelStaff onNotify={showNotification} />}
        </main>
      </div>
    </div>
  );
}
