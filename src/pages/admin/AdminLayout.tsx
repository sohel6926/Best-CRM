import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Target,
  LifeBuoy,
  CreditCard,
  Zap,
  TrendingUp,
  Sliders,
  ShieldCheck,
  Menu,
  X,
  Bell,
  Globe,
  LogOut,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  Trophy,
  Building2,
  FileSpreadsheet,
  History,
} from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { useAdmin } from '../../context/AdminContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminUsers } from './AdminUsers';
import { AdminSalesReports } from './AdminSalesReports';
import { AdminLeads } from './AdminLeads';
import { AdminSupport } from './AdminSupport';
import { AdminPricingPlans } from './AdminPricingPlans';
import { AdminDynamicPricing } from './AdminDynamicPricing';
import { AdminPricingSimulation } from './AdminPricingSimulation';
import { AdminAppControl } from './AdminAppControl';
import { AdminSettings } from './AdminSettings';
import { AdminTargets } from './AdminTargets';
import { AdminBranches } from './AdminBranches';
import { AdminExcelImport } from './AdminExcelImport';
import { AdminAuditHistory } from './AdminAuditHistory';
import { CRM_PRODUCTS } from '../../data/content';

const STANDALONE_CRM_URLS: Record<string, string> = {
  'catering-crm': '/catering-crm',
  'hostel-crm': '/hostel-crm',
  'hotel-crm': '/hotel-crm',
  'karam-podi-crm': '/karampodi-crm',
  'pickles-sales-crm': '/picklesales-crm',
  'lunch-box-crm': '/lunchboxes-crm',
};

export function AdminLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get('tab') || 'dashboard';
  const currentTab = rawTab === 'agents' ? 'dashboard' : rawTab;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { role, setRole, leads, tickets } = useAdmin();
  const navigate = useNavigate();

  const setTab = (tab: string) => {
    setSearchParams({ tab });
    setSidebarOpen(false);
  };

  const pendingLeadsCount = leads.filter((l) => l.status === 'new').length;
  const openTicketsCount = tickets.filter((t) => t.status === 'open').length;

  const navSections = [
    {
      title: 'Growth',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'targets', label: 'Targets', icon: Trophy },
        { id: 'leads', label: 'Leads', icon: Target, badge: pendingLeadsCount },
        { id: 'users', label: 'Users', icon: Users },
      ],
    },
    {
      title: 'Financials',
      items: [
        { id: 'sales', label: 'Sales', icon: BarChart3 },
        { id: 'plans', label: 'Pricing', icon: CreditCard },
        { id: 'dynamic_pricing', label: 'Dynamic Pricing', icon: Zap },
        { id: 'simulation', label: 'Price Simulation', icon: TrendingUp },
      ],
    },
    {
      title: 'Operations',
      items: [
        { id: 'branches', label: 'Branches', icon: Building2 },
        { id: 'excel_import', label: 'Excel Import', icon: FileSpreadsheet },
        { id: 'audit', label: 'Change History', icon: History },
        { id: 'support', label: 'Support Desk', icon: LifeBuoy, badge: openTicketsCount },
        { id: 'app_control', label: 'Website Control', icon: Sliders },
        { id: 'settings', label: 'Security', icon: ShieldCheck },
      ],
    },
  ];

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
                ADMIN
              </span>
            </Link>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Link to Launch the 6 Industry CRMs */}
            <Link
              to="/catering-crm"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold text-[#5B21B6] hover:bg-[#F3EEFF] transition shrink-0"
            >
              <Layers className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Launch 6 Industry CRMs</span>
              <span className="sm:hidden">6 CRMs</span>
            </Link>

            {/* Role indicator */}
            <div className="hidden md:flex items-center gap-1.5 rounded-xl bg-[#F1F5F9] px-3 py-1 text-xs">
              <span className="text-[#64748B]">Role:</span>
              <span className="font-extrabold capitalize text-[#1E1B4B]">
                {role.replace('_', ' ')}
              </span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer"
              >
                <Bell className="h-4 w-4" />
                {(pendingLeadsCount > 0 || openTicketsCount > 0) && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {pendingLeadsCount + openTicketsCount}
                  </span>
                )}
              </button>

              {/* Notification Flyout */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#EDE9FE] bg-white p-4 shadow-xl z-50 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-bold text-[#1E1B4B]">Recent Activity Alerts</span>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pendingLeadsCount > 0 && (
                      <div
                        onClick={() => { setTab('leads'); setNotificationsOpen(false); }}
                        className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100"
                      >
                        <p className="font-bold text-blue-900">{pendingLeadsCount} New Lead Enquiries</p>
                        <p className="text-[11px] text-blue-700">Awaiting contact call or assignment.</p>
                      </div>
                    )}
                    {openTicketsCount > 0 && (
                      <div
                        onClick={() => { setTab('support'); setNotificationsOpen(false); }}
                        className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 cursor-pointer hover:bg-amber-100"
                      >
                        <p className="font-bold text-amber-900">{openTicketsCount} Open Support Tickets</p>
                        <p className="text-[11px] text-amber-700">Client awaiting response from support team.</p>
                      </div>
                    )}
                    <div className="p-2.5 rounded-xl bg-gray-50 text-gray-600">
                      <p className="font-semibold">Razorpay Gateway Live</p>
                      <p className="text-[10px] text-gray-400">All automated webhook events healthy.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Back to Public Website */}
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#5B21B6] hover:underline"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Horizontal Quick Navigation Strip */}
      <div className="lg:hidden border-b border-[#E2E8F0] bg-white px-3 py-2 overflow-x-auto no-scrollbar shadow-2xs">
        <div className="flex items-center gap-1.5 min-w-max">
          {navSections.flatMap((s) => s.items).map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#5B21B6] text-white shadow-xs'
                    : 'bg-[#F8FAFC] border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#5B21B6]'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                      isActive ? 'bg-white text-[#5B21B6]' : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Shell: Sidebar + Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[#E2E8F0] bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col justify-between p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between lg:hidden border-b pb-3">
                <span className="font-bold text-sm text-[#1E1B4B]">Admin Menu</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Categorized Navigation Links with Group Headers */}
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
                      const isActive = currentTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTab(item.id)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer ${
                            isActive
                              ? 'bg-[#5B21B6] text-white shadow-xs'
                              : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#1E1B4B]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#5B21B6]'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
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

              {/* Industry CRMs Hub Shortcut */}
              <div className="rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">
                    6 Industry CRMs
                  </span>
                  <Sparkles className="h-3 w-3 text-[#7C3AED]" />
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Test the actual day-to-day software for catering, hostels, hotels, spices, etc.
                </p>
                <Link
                  to="/catering-crm"
                  className="flex items-center justify-between text-xs font-bold text-[#5B21B6] hover:underline pt-1"
                >
                  <span>Open Workspaces</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bottom Profile Info */}
            <div className="border-t border-[#F1F5F9] pt-4 text-xs text-[#64748B]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5B21B6] text-white font-bold">
                  S
                </div>
                <div className="flex-1 truncate">
                  <p className="font-bold text-[#1E1B4B] truncate">Sohel (Admin)</p>
                  <p className="text-[10px] text-gray-400 capitalize">{role.replace('_', ' ')}</p>
                </div>
                <Link to="/" title="Exit Admin" className="text-gray-400 hover:text-red-600">
                  <LogOut className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && <AdminDashboard onNavigate={setTab} />}
          {currentTab === 'targets' && <AdminTargets />}
          {currentTab === 'users' && <AdminUsers />}
          {currentTab === 'sales' && <AdminSalesReports />}
          {currentTab === 'leads' && <AdminLeads />}
          {currentTab === 'support' && <AdminSupport />}
          {currentTab === 'plans' && <AdminPricingPlans />}
          {currentTab === 'dynamic_pricing' && <AdminDynamicPricing />}
          {currentTab === 'simulation' && <AdminPricingSimulation />}
          {currentTab === 'branches' && <AdminBranches />}
          {currentTab === 'excel_import' && <AdminExcelImport />}
          {currentTab === 'audit' && <AdminAuditHistory />}
          {currentTab === 'app_control' && <AdminAppControl />}
          {currentTab === 'settings' && <AdminSettings />}
          {currentTab === 'crm_workspaces' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Industry CRM Workspaces Hub</h1>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Access and test the full daily operations dashboards for all 6 target industries.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {CRM_PRODUCTS.map((crm) => (
                  <div
                    key={crm.id}
                    className="p-6 rounded-2xl border border-[#EDE9FE] bg-white shadow-xs hover:border-[#7C3AED] hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-bold text-[#5B21B6] uppercase">
                        Ready-Made CRM
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-[#1E1B4B]">{crm.name}</h3>
                      <p className="mt-2 text-xs text-[#64748B] leading-relaxed">{crm.shortDesc}</p>
                    </div>

                    <Link
                      to={STANDALONE_CRM_URLS[crm.id] || '/catering-crm'}
                      className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#5B21B6] px-4 py-2 text-xs font-bold text-white hover:bg-[#4C1D95]"
                    >
                      <span>Launch {crm.name}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
