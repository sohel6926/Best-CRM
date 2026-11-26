import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Bell,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Search,
  TrendingUp,
} from 'lucide-react';
import { CrmProduct, ShowcaseRowItem } from '../data/content';
import { CrmIcon } from './CrmIcon';

const CYCLE_DURATION_MS = 3600;
const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getStatusClasses(tone: ShowcaseRowItem['tone']): string {
  switch (tone) {
    case 'green':
      return 'bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]';
    case 'purple':
      return 'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]';
    case 'blue':
      return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]';
    case 'amber':
      return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
  }
}

export function CrmDashboardShowcase({ crm }: { crm: CrmProduct }) {
  const pages = crm.showcasePages;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setActiveIndex(0);
    setIsPlaying(true);
  }, [crm.id]);

  useEffect(() => {
    if (!isPlaying || pages.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pages.length);
    }, CYCLE_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, pages.length]);

  const currentPage = pages[activeIndex] ?? pages[0];

  return (
    <div className="relative">
      {/* Ambient backdrop glow */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-[#EDE9FE]/80 via-[#F3EEFF]/60 to-[#DBEAFE]/40 blur-2xl"
        aria-hidden="true"
      />

      {/* Dashboard Frame */}
      <div className="relative overflow-hidden rounded-[22px] border border-[#DDD6FE] bg-white shadow-[0_28px_70px_-18px_rgba(76,29,149,0.22)]">
        {/* Top Window Chrome + Showcase Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE9FE] bg-[#FAF8FF] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#FCA5A5]" />
              <span className="h-3 w-3 rounded-full bg-[#FCD34D]" />
              <span className="h-3 w-3 rounded-full bg-[#86EFAC]" />
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-[#E9D5FF] bg-white px-3 py-1 text-xs font-medium text-[#5B21B6]">
              <span className="truncate">app.bestcrm.com/{crm.id}/{currentPage.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-[#64748B] tabular-nums">
              Screen {activeIndex + 1} of {pages.length}
            </span>

            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause walkthrough' : 'Play walkthrough'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDD6FE] bg-white px-3 py-1.5 text-xs font-semibold text-[#5B21B6] transition hover:bg-[#EDE9FE] cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Play Demo</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveIndex(0);
                setIsPlaying(true);
              }}
              aria-label="Restart walkthrough"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDD6FE] bg-white text-[#5B21B6] transition hover:bg-[#EDE9FE] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* App Body: Left Navigation Pane + Main Animated Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Left Navigation Pane */}
          <aside
            aria-label={`${crm.name} navigation preview`}
            className="border-b border-[#EDE9FE] bg-[#FCFAFF] p-4 lg:col-span-3 lg:border-b-0 lg:border-r lg:p-5 flex flex-col justify-between"
          >
            <div>
              {/* App Brand Header */}
              <div className="mb-5 flex items-center gap-2.5 px-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white shadow-xs">
                  <CrmIcon name={crm.icon} className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-extrabold text-[#1E1B4B] truncate">
                    {crm.name}
                  </p>
                  <p className="text-[11px] font-medium text-[#64748B] truncate">
                    Workspace Console
                  </p>
                </div>
              </div>

              {/* Animated Navigation Items */}
              <nav className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-1 lg:space-y-1.5">
                {pages.map((page, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsPlaying(false);
                      }}
                      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-xl px-3 py-2.5 text-left text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                        isActive ? 'text-[#4C1D95]' : 'text-[#475569] hover:text-[#1E1B4B]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId={`crm-nav-pill-${crm.id}`}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-xl border border-[#DDD6FE] bg-[#EDE9FE]"
                          aria-hidden="true"
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-2 truncate">
                        <span
                          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold tabular-nums ${
                            isActive
                              ? 'bg-[#5B21B6] text-white'
                              : 'bg-[#F3EEFF] text-[#64748B]'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="truncate">{page.navLabel}</span>
                      </span>

                      <ChevronRight
                        className={`relative z-10 hidden lg:block h-3.5 w-3.5 shrink-0 transition-transform ${
                          isActive
                            ? 'translate-x-0.5 text-[#5B21B6]'
                            : 'text-[#94A3B8] opacity-0 group-hover:opacity-100'
                        }`}
                        aria-hidden="true"
                      />

                      {/* Auto-advance progress bar along bottom edge of active nav item */}
                      {isActive && isPlaying && (
                        <motion.span
                          key={`progress-${crm.id}-${activeIndex}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: CYCLE_DURATION_MS / 1000, ease: 'linear' }}
                          style={{ originX: 0 }}
                          className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-[#7C3AED]"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Nav Tip */}
            <div className="mt-6 hidden lg:block rounded-xl border border-[#EDE9FE] bg-white p-3.5">
              <p className="text-[11px] font-bold text-[#1E1B4B]">
                Interactive Walkthrough
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                Screens cycle automatically, or click any module above to inspect it.
              </p>
            </div>
          </aside>

          {/* Main Animated Dashboard Canvas */}
          <div className="bg-white p-5 sm:p-7 lg:col-span-9 flex flex-col">
            {/* Top Search / Notification Sub-header */}
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#F3EEFF] pb-4">
              <div className="flex items-center gap-2 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] px-3 py-1.5 text-xs text-[#64748B] w-full max-w-xs">
                <Search className="h-3.5 w-3.5 text-[#7C3AED]" aria-hidden="true" />
                <span className="truncate">Search {crm.name.toLowerCase()} records...</span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] text-[#5B21B6]">
                  <Bell className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#5B21B6] text-xs font-bold text-white">
                  b
                </span>
              </div>
            </div>

            {/* Animated Module Viewport */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${crm.id}-${currentPage.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.34, ease: EASE_SMOOTH }}
                className="flex-1 space-y-6"
              >
                {/* Module Page Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B]">
                      {currentPage.pageTitle}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#64748B]">
                      {currentPage.pageSubtitle}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-xl bg-[#5B21B6] px-3.5 py-2 text-xs font-semibold text-white shadow-xs">
                    {currentPage.actionLabel}
                  </span>
                </div>

                {/* 3 Animated KPI Cards */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  {currentPage.kpis.map((kpi, idx) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.32,
                        delay: 0.06 + idx * 0.06,
                        ease: EASE_SMOOTH,
                      }}
                      className="rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] p-4"
                    >
                      <p className="text-xs font-medium text-[#64748B]">{kpi.label}</p>
                      <p className="mt-1 text-xl font-extrabold text-[#1E1B4B] tabular-nums">
                        {kpi.value}
                      </p>
                      <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#15803D] tabular-nums">
                        <TrendingUp className="h-3 w-3" aria-hidden="true" />
                        <span>{kpi.delta}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Grid: Records Table + Progress Widget */}
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                  {/* Staggered Activity Rows */}
                  <div className="rounded-2xl border border-[#EDE9FE] bg-white p-4 xl:col-span-8">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold text-[#1E1B4B]">
                        {currentPage.tableTitle}
                      </p>
                      <span className="text-[11px] font-semibold text-[#7C3AED]">
                        Live View
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {currentPage.rows.map((row, rIdx) => (
                        <motion.div
                          key={row.title}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.14 + rIdx * 0.06,
                            ease: EASE_SMOOTH,
                          }}
                          className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#F3EEFF] bg-[#FCFAFF] px-3.5 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-[#1E1B4B] truncate">
                              {row.title}
                            </p>
                            <p className="text-[11px] text-[#64748B] truncate">
                              {row.meta}
                            </p>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <span className="text-xs font-bold text-[#1E1B4B] tabular-nums">
                              {row.metric}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap ${getStatusClasses(
                                row.tone
                              )}`}
                            >
                              {row.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Animated Breakdown Bars */}
                  <div className="rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] p-4 xl:col-span-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1E1B4B]">
                        {currentPage.widgetTitle}
                      </p>
                      <div className="mt-4 space-y-4">
                        {currentPage.widgetBars.map((bar, bIdx) => (
                          <div key={bar.label}>
                            <div className="mb-1.5 flex items-center justify-between text-[11px]">
                              <span className="font-medium text-[#475569] truncate">
                                {bar.label}
                              </span>
                              <span className="font-bold text-[#5B21B6] tabular-nums">
                                {bar.valueLabel}
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#EDE9FE]">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${bar.percent}%` }}
                                transition={{
                                  duration: 0.65,
                                  delay: 0.2 + bIdx * 0.08,
                                  ease: EASE_SMOOTH,
                                }}
                                className="h-full rounded-full bg-gradient-to-r from-[#5B21B6] to-[#8B5CF6]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#E9D5FF] bg-white p-3">
                      <p className="text-[11px] font-bold text-[#1E1B4B]">
                        Mobile App Synced
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#64748B]">
                        Updates reflect instantly across Android, iOS, and Web.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
