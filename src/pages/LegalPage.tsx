import { Link } from 'react-router-dom';
import { SITE_INFO } from '../data/content';

export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <span className="inline-block rounded-full border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
          Legal Documentation
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-[#1E1B4B] sm:text-4xl">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">Effective Date: January 1, 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#475569]">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-[#1E1B4B]">
                  1. Information We Collect
                </h2>
                <p>
                  bestCRM collects business contact details you voluntarily submit when requesting a demo, submitting an enquiry, or creating a workspace subscription—including your name, business name, email address, and phone number.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-[#1E1B4B]">
                  2. How We Use Your Data
                </h2>
                <p>
                  We use your contact details solely to provision your selected CRM workspace, schedule requested demos, and provide customer support. We never sell or rent customer lists to third parties.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-[#1E1B4B]">
                  3. Data Security & Retention
                </h2>
                <p>
                  All records are protected using industry-standard encryption in transit and at rest. For privacy requests or data deletion inquiries, contact us at{' '}
                  <a
                    href={`mailto:${SITE_INFO.contact.email}`}
                    className="font-semibold text-[#5B21B6] underline"
                  >
                    {SITE_INFO.contact.email}
                  </a>
                  .
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-[#1E1B4B]">
                  1. Subscription & Plan Scope
                </h2>
                <p>
                  bestCRM grants your business a non-transferable license to access your selected industry CRM module according to the user limits and features included in your Starter, Professional, or Enterprise plan.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-[#1E1B4B]">
                  2. Acceptable Business Use
                </h2>
                <p>
                  You are responsible for maintaining the confidentiality of team login credentials and ensuring customer communications sent through connected channels comply with applicable local regulations.
                </p>
              </section>
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-[#1E1B4B]">
                  3. Plan Changes & Support
                </h2>
                <p>
                  Plans may be upgraded or modified at any time. For enterprise SLAs or billing assistance, reach our team at{' '}
                  <a
                    href={`mailto:${SITE_INFO.contact.email}`}
                    className="font-semibold text-[#5B21B6] underline"
                  >
                    {SITE_INFO.contact.email}
                  </a>
                  .
                </p>
              </section>
            </>
          )}
        </div>

        <div className="mt-10 border-t border-[#EDE9FE] pt-6">
          <Link
            to="/"
            className="text-sm font-semibold text-[#5B21B6] hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
