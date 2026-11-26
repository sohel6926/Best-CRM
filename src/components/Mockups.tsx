import { HERO_CONTENT, SITE_INFO } from '../data/content';
import { TrendingUp, CheckCircle2, Bell, Search } from 'lucide-react';
import { FloatElement } from './MotionPrimitives';

export function HeroDashboardMockup({ compact = false }: { compact?: boolean }) {
  const { dashboardPreview } = HERO_CONTENT;

  return (
    <div
      className={`relative mx-auto w-full ${
        compact ? 'max-w-[500px]' : 'max-w-[600px]'
      } select-none`}
      aria-label="bestCRM web dashboard and mobile companion app preview"
      role="img"
    >
      {/* Subtle decorative glow behind laptop */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#EDE9FE]/80 via-[#F3EEFF]/60 to-white/40 blur-xl"
        aria-hidden="true"
      />

      <FloatElement distance={7} duration={6}>
        {/* Laptop Shell */}
      <div className="relative rounded-2xl border border-[#DDD6FE] bg-white p-2.5 shadow-[0_24px_60px_-15px_rgba(76,29,149,0.18)]">
        {/* Browser top chrome */}
        <div className="flex items-center justify-between border-b border-[#F3EEFF] px-3 pb-2.5 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#DDD6FE]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E9D5FF]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#C4B5FD]" />
          </div>
          <div className="rounded-md bg-[#F8F5FF] px-3 py-1 text-[11px] font-medium text-[#5B21B6]">
            app.bestcrm.com
          </div>
          <div className="flex items-center gap-2 text-[#7C3AED]">
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
            <Bell className="h-3.5 w-3.5" aria-hidden="true" />
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="grid grid-cols-12 gap-3 p-3 sm:p-4 bg-[#FCFAFF] rounded-b-xl">
          {/* Mini Left Sidebar */}
          <div className="hidden sm:flex col-span-3 flex-col gap-1.5 rounded-xl bg-white p-2.5 border border-[#EDE9FE]">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <div className="h-5 w-5 rounded-md bg-[#5B21B6] text-white text-[10px] font-bold flex items-center justify-center">
                b
              </div>
              <span className="text-xs font-bold text-[#1E1B4B]">bestCRM</span>
            </div>
            {['Overview', 'Leads', 'Orders', 'Customers', 'Reports'].map((item, idx) => (
              <div
                key={item}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${
                  idx === 0
                    ? 'bg-[#EDE9FE] text-[#4C1D95] font-semibold'
                    : 'text-[#64748B]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="col-span-12 sm:col-span-9 space-y-3">
            {/* Greeting Row */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm sm:text-base font-bold text-[#1E1B4B]">
                  {dashboardPreview.greeting}
                </p>
                <p className="text-[11px] text-[#64748B]">{dashboardPreview.subtitle}</p>
              </div>
              <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-semibold text-[#15803D] whitespace-nowrap">
                All systems active
              </span>
            </div>

            {/* 3 KPI Cards */}
            <div className="grid grid-cols-3 gap-2">
              {dashboardPreview.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-[#EDE9FE] bg-white p-2.5 shadow-xs"
                >
                  <p className="text-[10px] font-medium text-[#64748B] truncate">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#1E1B4B] tabular-nums truncate">
                    {metric.value}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#15803D] tabular-nums">
                    <TrendingUp className="h-2.5 w-2.5" aria-hidden="true" />
                    {metric.delta}
                  </p>
                </div>
              ))}
            </div>

            {/* Purple Area Chart Card */}
            <div className="rounded-xl border border-[#EDE9FE] bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold text-[#1E1B4B]">
                  Weekly Revenue Growth
                </p>
                <span className="text-[10px] font-medium text-[#7C3AED]">Last 7 days</span>
              </div>
              <svg
                viewBox="0 0 320 96"
                className="w-full h-20 overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="purpleAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Horizontal gridlines */}
                <line x1="0" y1="22" x2="320" y2="22" stroke="#F3EEFF" strokeWidth="1" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="#F3EEFF" strokeWidth="1" />
                <line x1="0" y1="78" x2="320" y2="78" stroke="#F3EEFF" strokeWidth="1" />
                {/* Area */}
                <path
                  d="M0 72 C36 66, 54 44, 92 48 C130 52, 152 26, 190 30 C226 34, 250 14, 320 10 L320 88 L0 88 Z"
                  fill="url(#purpleAreaFill)"
                />
                {/* Line */}
                <path
                  d="M0 72 C36 66, 54 44, 92 48 C130 52, 152 26, 190 30 C226 34, 250 14, 320 10"
                  fill="none"
                  stroke="#6D28D9"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Data dots */}
                <circle cx="92" cy="48" r="3" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="2" />
                <circle cx="190" cy="30" r="3" fill="#FFFFFF" stroke="#6D28D9" strokeWidth="2" />
                <circle cx="320" cy="10" r="3.5" fill="#7C3AED" />
              </svg>
              <div className="mt-1 flex justify-between text-[9px] font-medium text-[#94A3B8]">
                {dashboardPreview.chartLabels.map((lbl) => (
                  <span key={lbl}>{lbl}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Base Lip */}
      <div
        className="mx-auto h-2.5 w-[92%] rounded-b-xl bg-gradient-to-b from-[#DDD6FE] to-[#C4B5FD]"
        aria-hidden="true"
      />
      </FloatElement>

      {/* Overlapping Mobile Phone Mockup */}
      <FloatElement
        distance={11}
        duration={4.8}
        delay={0.6}
        className="hidden sm:block absolute -bottom-4 -right-2 md:-right-4 w-[164px]"
      >
        <div className="w-full rounded-[24px] border-[3px] border-[#1E1B4B] bg-white p-2.5 shadow-[0_20px_45px_-10px_rgba(30,27,75,0.28)]">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#E2E8F0]" />
          <div className="rounded-2xl bg-[#FAF8FF] p-2.5 border border-[#EDE9FE]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#1E1B4B]">Today</span>
              <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
            </div>
            <p className="text-[10px] text-[#64748B]">Revenue</p>
            <p className="text-xs font-extrabold text-[#4C1D95] tabular-nums">₹24,50,000</p>
            <div className="mt-2.5 space-y-1.5">
              {[
                { name: 'New Enquiry', tag: '₹42,000' },
                { name: 'Repeat Order', tag: 'Paid' },
                { name: 'Follow-up Due', tag: '2:30 PM' },
              ].map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5 border border-[#EDE9FE]"
                >
                  <span className="text-[9px] font-medium text-[#1E1B4B] truncate">
                    {row.name}
                  </span>
                  <span className="text-[9px] font-semibold text-[#7C3AED] tabular-nums">
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FloatElement>
    </div>
  );
}

export function AboutBuildingIllustration() {
  return (
    <FloatElement distance={6} duration={6.2}>
      <div
        className="relative overflow-hidden rounded-[22px] border border-[#DDD6FE] bg-gradient-to-br from-[#F3EEFF] via-white to-[#EDE9FE] p-6 shadow-[0_18px_45px_-16px_rgba(76,29,149,0.16)]"
        role="img"
        aria-label="Illustration of bestCRM modern workspace office building in Hyderabad"
      >
      {/* Easy-to-swap illustrated placeholder frame */}
      <svg
        viewBox="0 0 480 340"
        className="w-full h-auto rounded-2xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#FAF8FF" />
          </linearGradient>
          <linearGradient id="towerGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5B21B6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
        <rect width="480" height="340" rx="16" fill="url(#skyGrad)" />
        {/* Soft clouds / hills */}
        <circle cx="95" cy="78" r="32" fill="#FFFFFF" opacity="0.85" />
        <circle cx="385" cy="64" r="24" fill="#FFFFFF" opacity="0.7" />
        <path d="M0 295 Q130 260 250 288 T480 282 L480 340 L0 340 Z" fill="#DDD6FE" />

        {/* Secondary left wing */}
        <rect x="78" y="138" width="110" height="162" rx="10" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />
        {[158, 190, 222, 254].map((y) => (
          <g key={y}>
            <rect x="96" y={y} width="30" height="18" rx="4" fill="#EDE9FE" />
            <rect x="138" y={y} width="30" height="18" rx="4" fill="#EDE9FE" />
          </g>
        ))}

        {/* Main headquarters building */}
        <rect x="176" y="74" width="154" height="226" rx="14" fill="url(#towerGrad)" />
        <rect x="196" y="96" width="114" height="28" rx="6" fill="#7C3AED" />
        <text
          x="253"
          y="115"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          bestCRM HQ
        </text>
        {[142, 174, 206, 238].map((y) => (
          <g key={y}>
            <rect x="198" y={y} width="46" height="20" rx="4" fill="#DDD6FE" opacity="0.92" />
            <rect x="262" y={y} width="46" height="20" rx="4" fill="#DDD6FE" opacity="0.92" />
          </g>
        ))}
        {/* Entrance */}
        <rect x="232" y="268" width="42" height="32" rx="6" fill="#F3EEFF" />

        {/* Right glass pavilion */}
        <rect x="318" y="156" width="90" height="144" rx="10" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2" />
        {[176, 208, 240].map((y) => (
          <rect key={y} x="336" y={y} width="54" height="18" rx="4" fill="#EDE9FE" />
        ))}

        {/* Foreground trees */}
        <circle cx="52" cy="272" r="24" fill="#A78BFA" opacity="0.45" />
        <circle cx="426" cy="276" r="22" fill="#A78BFA" opacity="0.45" />
      </svg>

      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-sm font-bold text-[#1E1B4B]">bestCRM Operations Center</p>
          <p className="text-xs text-[#64748B]">{SITE_INFO.contact.address}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#5B21B6] border border-[#DDD6FE]">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" aria-hidden="true" />
          24/7 Support Desk
        </span>
      </div>
    </div>
    </FloatElement>
  );
}

export function AppPhoneMockup({ crmName = 'Your Business CRM' }: { crmName?: string }) {
  return (
    <FloatElement distance={8} duration={5.4}>
      <div
        className="mx-auto w-[210px] rounded-[28px] border-[4px] border-[#1E1B4B] bg-white p-3 shadow-[0_20px_50px_-15px_rgba(76,29,149,0.22)]"
        role="img"
        aria-label="bestCRM mobile application preview"
      >
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#E2E8F0]" />
        <div className="rounded-2xl bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] p-3 text-white">
          <p className="text-[10px] font-medium text-[#EDE9FE]">Active Workspace</p>
          <p className="mt-0.5 text-sm font-bold truncate">{crmName}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white/15 p-2">
              <p className="text-[9px] text-[#EDE9FE]">Today</p>
              <p className="text-xs font-bold tabular-nums">48 Orders</p>
            </div>
            <div className="rounded-lg bg-white/15 p-2">
              <p className="text-[9px] text-[#EDE9FE]">Collected</p>
              <p className="text-xs font-bold tabular-nums">₹64,200</p>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {['Lead Follow-ups', 'Pending Payments', 'Daily Dispatch'].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] px-3 py-2"
            >
              <span className="text-[11px] font-semibold text-[#1E1B4B]">{item}</span>
              <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
            </div>
          ))}
        </div>
      </div>
    </FloatElement>
  );
}

export function StoreBadges({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${centered ? 'justify-center' : ''}`}>
      <a
        href={SITE_INFO.appLinks.googlePlay}
        aria-label="Get bestCRM on Google Play"
        className="inline-flex items-center gap-3 rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-white transition hover:bg-[#312E81] active:scale-[0.99]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 2.8L13.8 12L3 21.2V2.8Z" fill="#34D399" />
          <path d="M13.8 12L17.4 8.9L4.7 1.8L13.8 12Z" fill="#60A5FA" />
          <path d="M13.8 12L4.7 22.2L17.4 15.1L13.8 12Z" fill="#F87171" />
          <path d="M17.4 8.9L21 10.9C21.8 11.4 21.8 12.6 21 13.1L17.4 15.1L13.8 12L17.4 8.9Z" fill="#FBBF24" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wider text-[#C7D2FE]">
            Get it on
          </span>
          <span className="block text-sm font-bold">Google Play</span>
        </span>
      </a>

      <a
        href={SITE_INFO.appLinks.appStore}
        aria-label="Download bestCRM on the App Store"
        className="inline-flex items-center gap-3 rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-white transition hover:bg-[#312E81] active:scale-[0.99]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-wider text-[#C7D2FE]">
            Download on the
          </span>
          <span className="block text-sm font-bold">App Store</span>
        </span>
      </a>
    </div>
  );
}

export function QrCodeSvg() {
  return (
    <div className="inline-flex flex-col items-center rounded-2xl border border-[#DDD6FE] bg-white p-4 shadow-xs">
      <svg
        width="136"
        height="136"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="QR code to download the bestCRM mobile app"
      >
        <rect width="120" height="120" rx="8" fill="#FFFFFF" />
        {/* Top-left finder */}
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="#1E1B4B" strokeWidth="5" />
        <rect x="18" y="18" width="12" height="12" rx="2" fill="#5B21B6" />
        {/* Top-right finder */}
        <rect x="80" y="8" width="32" height="32" rx="4" stroke="#1E1B4B" strokeWidth="5" />
        <rect x="90" y="18" width="12" height="12" rx="2" fill="#5B21B6" />
        {/* Bottom-left finder */}
        <rect x="8" y="80" width="32" height="32" rx="4" stroke="#1E1B4B" strokeWidth="5" />
        <rect x="18" y="90" width="12" height="12" rx="2" fill="#5B21B6" />
        {/* Matrix blocks */}
        <rect x="48" y="10" width="8" height="8" fill="#1E1B4B" />
        <rect x="62" y="10" width="8" height="8" fill="#1E1B4B" />
        <rect x="48" y="24" width="14" height="8" fill="#5B21B6" />
        <rect x="10" y="48" width="12" height="8" fill="#1E1B4B" />
        <rect x="28" y="48" width="8" height="16" fill="#5B21B6" />
        <rect x="44" y="46" width="16" height="16" rx="3" fill="#7C3AED" />
        <rect x="66" y="48" width="10" height="8" fill="#1E1B4B" />
        <rect x="84" y="48" width="12" height="12" fill="#1E1B4B" />
        <rect x="102" y="48" width="8" height="16" fill="#5B21B6" />
        <rect x="10" y="64" width="10" height="8" fill="#1E1B4B" />
        <rect x="48" y="68" width="8" height="12" fill="#1E1B4B" />
        <rect x="64" y="66" width="14" height="14" fill="#5B21B6" />
        <rect x="88" y="68" width="8" height="8" fill="#1E1B4B" />
        <rect x="50" y="88" width="14" height="10" fill="#1E1B4B" />
        <rect x="72" y="88" width="10" height="14" fill="#5B21B6" />
        <rect x="90" y="88" width="18" height="8" fill="#1E1B4B" />
        <rect x="50" y="104" width="10" height="8" fill="#5B21B6" />
        <rect x="90" y="102" width="10" height="10" fill="#1E1B4B" />
      </svg>
      <span className="mt-2 text-xs font-medium text-[#64748B]">Scan to install app</span>
    </div>
  );
}
