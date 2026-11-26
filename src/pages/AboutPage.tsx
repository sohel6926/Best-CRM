import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Eye, HeartHandshake, Target } from 'lucide-react';
import { ABOUT_CONTENT } from '../data/content';
import { AboutBuildingIllustration } from '../components/Mockups';
import { useApp } from '../context/AppContext';
import {
  ScrollReveal,
  StaggerGrid,
  StaggerItem,
} from '../components/MotionPrimitives';

export function AboutPage() {
  const { openDemoModal } = useApp();
  const pillarIcons = [Eye, Target, HeartHandshake];

  return (
    <div className="bg-white">
      {/* Intro Hero */}
      <section className="bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white pt-8 pb-8 sm:pt-10 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 hero-entrance">
              <span className="inline-block rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
                {ABOUT_CONTENT.eyebrow}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-5xl [text-wrap:balance]">
                {ABOUT_CONTENT.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[#475569] sm:text-lg">
                {ABOUT_CONTENT.intro}
              </p>

              {/* Three small feature chips */}
              <div className="mt-7 flex flex-wrap gap-2.5">
                {ABOUT_CONTENT.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E9D5FF] bg-white px-4 py-1.5 text-xs font-semibold text-[#1E1B4B]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" aria-hidden="true" />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4C1D95]"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => openDemoModal('Demo Request')}
                  className="inline-flex items-center justify-center rounded-xl border border-[#C4B5FD] bg-white px-6 py-3 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#F3EEFF] cursor-pointer"
                >
                  Request Demo
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 hero-entrance-delayed">
              <AboutBuildingIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ABOUT_CONTENT.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx];
              return (
                <StaggerItem key={pillar.title}>
                  <article className="card-surface h-full p-7 transition duration-200 hover:-translate-y-1">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#5B21B6]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-xl font-bold text-[#1E1B4B]">
                      {pillar.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                      {pillar.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Business Expertise and Objectives */}
      <section className="border-t border-[#EDE9FE] bg-[#FAF8FF] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-2xl">
            <span className="inline-block rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
              {ABOUT_CONTENT.expertise.subtitle}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[#1E1B4B] sm:text-4xl [text-wrap:balance]">
              {ABOUT_CONTENT.expertise.title}
            </h2>
          </ScrollReveal>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ABOUT_CONTENT.expertise.items.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-[18px] border border-[#E9D5FF] bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5">
                  <h3 className="text-lg font-bold text-[#1E1B4B]">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </div>
  );
}
