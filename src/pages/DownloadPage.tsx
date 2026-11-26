import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppPhoneMockup, QrCodeSvg, StoreBadges } from '../components/Mockups';
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';

export function DownloadPage() {
  const { selectedPlan, selectedCrm, checkout } = useApp();

  const startSteps = [
    {
      step: '1',
      title: 'Download & install bestCRM',
      desc: 'Tap Google Play or App Store below—or scan the QR code with your phone camera.',
    },
    {
      step: '2',
      title: 'Sign in with your subscribed details',
      desc: `Use ${
        checkout.customerEmail || 'your registered email or phone number'
      } to verify your account.`,
    },
    {
      step: '3',
      title: `${selectedCrm.name} loads automatically`,
      desc: `Once logged in, your ${selectedCrm.name} workspace, menus, and pipelines appear automatically inside the app.`,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Confirmation Banner */}
        <div className="hero-entrance rounded-[24px] border border-[#DDD6FE] bg-white p-7 sm:p-10 shadow-[0_20px_50px_-18px_rgba(76,29,149,0.16)]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3.5 py-1.5 text-xs font-bold text-[#15803D]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                <span>Workspace Ready</span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-4xl [text-wrap:balance]">
                You’re subscribed to {selectedPlan.name} for {selectedCrm.name}
              </h1>

              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                Your mobile workspace is ready. Install the bestCRM app below and log in—your{' '}
                <span className="font-semibold text-[#5B21B6]">{selectedCrm.name}</span>{' '}
                configuration appears automatically.
              </p>

              <div className="mt-7">
                <StoreBadges />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6">
                <QrCodeSvg />
                <div className="max-w-xs space-y-1.5 text-xs text-[#475569]">
                  <p className="font-bold text-[#1E1B4B]">Prefer scanning?</p>
                  <p>
                    Point your Android or iPhone camera at this QR code to open the store download page directly.
                  </p>
                  <Link
                    to="/packages"
                    className="inline-flex items-center gap-1 pt-1 font-semibold text-[#5B21B6] hover:underline"
                  >
                    <span>Change plan or CRM</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AppPhoneMockup crmName={selectedCrm.name} />
            </div>
          </div>
        </div>

        {/* 3-Step How to Get Started */}
        <section className="mt-10">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-[#1E1B4B] sm:text-2xl">
              How to get started
            </h2>
          </ScrollReveal>
          <StaggerGrid className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {startSteps.map((item) => (
              <StaggerItem key={item.step}>
                <div className="h-full rounded-[18px] border border-[#E9D5FF] bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#5B21B6] text-xs font-bold text-white tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#1E1B4B]">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </div>
    </div>
  );
}
