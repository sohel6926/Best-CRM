import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Printer,
} from 'lucide-react';
import { CRM_PRODUCTS } from '../../data/content';
import { CrmIcon } from '../../components/CrmIcon';
import { CateringFullSuite } from './catering/CateringFullSuite';
import { HostelFullSuite } from './hostel/HostelFullSuite';
import { HotelFullSuite } from './hotel/HotelFullSuite';
import { KaramFullSuite } from './karam-podi/KaramFullSuite';
import { PickleFullSuite } from './pickles/PickleFullSuite';
import { LunchFullSuite } from './lunch-box/LunchFullSuite';

export function CrmWorkspacePage() {
  const { crmId } = useParams<{ crmId: string }>();

  // If user visits /app without a crmId, redirect to default catering-crm
  if (!crmId) {
    return <Navigate to="/app/catering-crm" replace />;
  }

  const selectedCrmId = crmId;
  const currentCrm = CRM_PRODUCTS.find((c) => c.id === selectedCrmId) || CRM_PRODUCTS[0];

  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Top Workspace Bar */}
      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-bold text-[#475569] shadow-xs hover:bg-[#F1F5F9] transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Admin Panel</span>
            </Link>

            <span className="h-4 w-px bg-gray-300" />

            {/* Quick CRM Switcher with Real URL Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CRM_PRODUCTS.map((crm) => (
                <Link
                  key={crm.id}
                  to={`/app/${crm.id}`}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCrmId === crm.id
                      ? 'bg-[#5B21B6] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <CrmIcon name={crm.icon} className="h-3.5 w-3.5" />
                  <span>{crm.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-800">
              ● Live Client Workspace
            </span>
            <Link
              to="/"
              className="text-xs font-bold text-[#5B21B6] hover:underline"
            >
              Public Website →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Dynamic CRM Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#4C1D95] p-6 text-white shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/20 backdrop-blur-md">
                <CrmIcon name={currentCrm.icon} className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DDD6FE]">
                  Industry Workflows & Business OS
                </span>
                <h1 className="text-2xl font-extrabold sm:text-3xl">{currentCrm.name}</h1>
                <p className="text-xs sm:text-sm text-[#E2E8F0] mt-0.5">{currentCrm.shortDesc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => showNotification('Demo WhatsApp invoice & order PDF dispatched to customer!')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Trigger WhatsApp Bill</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-bold text-white border border-white/20 hover:bg-white/25 cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Daily Run</span>
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
