import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { CRM_PRODUCTS } from '../../data/content';
import { CrmIcon } from '../../components/CrmIcon';
import { CateringFullSuite } from './catering/CateringFullSuite';
import { HostelFullSuite } from './hostel/HostelFullSuite';
import { HotelFullSuite } from './hotel/HotelFullSuite';
import { KaramFullSuite } from './karam-podi/KaramFullSuite';
import { PickleFullSuite } from './pickles/PickleFullSuite';
import { LunchFullSuite } from './lunch-box/LunchFullSuite';

export const CRM_ROUTE_MAP: Record<string, string> = {
  'catering-crm': 'catering-crm',
  'hostel-crm': 'hostel-crm',
  'hotel-crm': 'hotel-crm',
  'karampodi-crm': 'karam-podi-crm',
  'karam-podi-crm': 'karam-podi-crm',
  'picklesales-crm': 'pickles-sales-crm',
  'pickle-sales-crm': 'pickles-sales-crm',
  'pickles-sales-crm': 'pickles-sales-crm',
  'lunchboxes-crm': 'lunch-box-crm',
  'lunch-boxes-crm': 'lunch-box-crm',
  'lunch-box-crm': 'lunch-box-crm',
};

export function CrmWorkspacePage({ fixedCrmId }: { fixedCrmId?: string } = {}) {
  const { crmId } = useParams<{ crmId: string }>();
  const { pathname } = useLocation();

  // Resolve target CRM ID from prop, param, or pathname
  const pathKey = pathname.replace(/^\//, '').split('?')[0].split('/')[0];
  const targetId = fixedCrmId || (crmId ? CRM_ROUTE_MAP[crmId] || crmId : CRM_ROUTE_MAP[pathKey] || 'catering-crm');
  const selectedCrmId = CRM_ROUTE_MAP[targetId] || targetId;
  const currentCrm = CRM_PRODUCTS.find((c) => c.id === selectedCrmId) || CRM_PRODUCTS[0];

  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Top Workspace Bar - Standalone Isolated Header (No cross-links) */}
      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 shadow-2xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left: CRM Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#5B21B6] border border-purple-200">
              <CrmIcon name={currentCrm.icon} className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-[#1E1B4B]">{currentCrm.name}</span>
              <span className="hidden sm:inline-block rounded-md bg-purple-50 px-2 py-0.5 text-[10px] font-extrabold text-[#5B21B6] border border-purple-200">
                CLIENT WORKSPACE
              </span>
            </div>
          </div>

          {/* Right: Clean Live Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Client Workspace</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Dynamic CRM Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#4C1D95] p-4 sm:p-6 text-white shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/20 backdrop-blur-md">
                <CrmIcon name={currentCrm.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DDD6FE]">
                  Industry Workflows & Business OS
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold lg:text-3xl text-white drop-shadow-xs">{currentCrm.name}</h1>
                <p className="text-xs sm:text-sm text-[#E2E8F0] mt-0.5">{currentCrm.shortDesc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => showNotification('Demo WhatsApp invoice & order PDF dispatched to customer!')}
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white px-4 py-2 text-xs font-extrabold shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>WhatsApp Bill</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-bold text-white border border-white/20 hover:bg-white/25 active:scale-95 transition cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Run</span>
              </button>
            </div>
          </div>
        </div>

        {statusNotification && (
          <div className="p-3.5 rounded-xl bg-green-100 border border-green-300 text-green-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            {statusNotification}
          </div>
        )}

        {/* Industry Specific Specialized Modules */}
        {selectedCrmId === 'catering-crm' && (
          <CateringFullSuite onNotify={showNotification} />
        )}

        {selectedCrmId === 'hostel-crm' && (
          <HostelFullSuite onNotify={showNotification} />
        )}

        {selectedCrmId === 'hotel-crm' && (
          <HotelFullSuite onNotify={showNotification} />
        )}

        {selectedCrmId === 'karam-podi-crm' && (
          <KaramFullSuite onNotify={showNotification} />
        )}

        {selectedCrmId === 'pickles-sales-crm' && (
          <PickleFullSuite onNotify={showNotification} />
        )}

        {selectedCrmId === 'lunch-box-crm' && (
          <LunchFullSuite onNotify={showNotification} />
        )}
      </main>
    </div>
  );
}
