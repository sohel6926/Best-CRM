import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { CRM_PRODUCTS, SITE_INFO } from '../data/content';
import { AppPhoneMockup, StoreBadges } from '../components/Mockups';
import { ScrollReveal } from '../components/MotionPrimitives';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState(CRM_PRODUCTS[0].name);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please complete all required fields before sending your message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }

    // TODO: connect to API — Submit contact form payload to backend support/CRM route
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F3EEFF] via-[#FAF8FF] to-white pt-8 pb-8 sm:pt-10 sm:pb-9">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 hero-entrance">
          <span className="inline-block rounded-full border border-[#DDD6FE] bg-white px-3.5 py-1 text-xs font-semibold text-[#5B21B6]">
            Get in Touch
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1E1B4B] sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#475569] sm:text-lg">
            Have questions, need a demo or want to know more about bestCRM? We’re here to help.
          </p>
        </div>
      </section>

      {/* 3-Column Layout */}
      <section className="py-6 sm:py-8 pb-12 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Contact Info + WhatsApp + Socials */}
            <div className="card-surface p-6 sm:p-7 lg:col-span-4 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#1E1B4B]">Direct Contact</h2>
                <p className="mt-1 text-sm text-[#475569]">
                  Reach our onboarding and support specialists directly.
                </p>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-[#5B21B6]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B]">Phone</p>
                    <a
                      href={SITE_INFO.contact.phoneHref}
                      className="font-semibold text-[#1E1B4B] hover:text-[#5B21B6] tabular-nums"
                    >
                      {SITE_INFO.contact.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-[#5B21B6]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B]">Email</p>
                    <a
                      href={`mailto:${SITE_INFO.contact.email}`}
                      className="font-semibold text-[#1E1B4B] hover:text-[#5B21B6]"
                    >
                      {SITE_INFO.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-[#5B21B6]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B]">Address</p>
                    <p className="font-semibold text-[#1E1B4B]">
                      {SITE_INFO.contact.address}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3EEFF] text-[#5B21B6]">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#64748B]">Support Hours</p>
                    <p className="font-semibold text-[#1E1B4B]">
                      {SITE_INFO.contact.hours}
                    </p>
                  </div>
                </li>
              </ul>

              <a
                href={SITE_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166534]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="border-t border-[#F3EEFF] pt-5">
                <p className="text-xs font-bold text-[#1E1B4B]">Follow Us</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SITE_INFO.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3 py-1.5 text-xs font-semibold text-[#5B21B6] transition hover:bg-[#EDE9FE]"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column: Send Us a Message Form */}
            <div className="card-surface p-6 sm:p-8 lg:col-span-5">
              <h2 className="text-xl font-bold text-[#1E1B4B]">Send Us a Message</h2>
              <p className="mt-1 text-sm text-[#475569]">
                Fill out the form below and we will reply within one business day.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-6 text-center">
                  <CheckCircle2
                    className="mx-auto h-10 w-10 text-[#16A34A]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-lg font-bold text-[#1E1B4B]">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-1.5 text-sm text-[#475569]">
                    Thanks for contacting bestCRM, <span className="font-semibold">{name}</span>. Our team has received your enquiry for{' '}
                    <span className="font-semibold text-[#5B21B6]">{requirement}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="mt-5 rounded-xl bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@business.com"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Phone <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-requirement"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Select Requirement
                    </label>
                    <select
                      id="contact-requirement"
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    >
                      {CRM_PRODUCTS.map((crm) => (
                        <option key={crm.id} value={crm.name}>
                          {crm.name}
                        </option>
                      ))}
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Demo Request">Demo Request</option>
                      <option value="Pricing">Pricing</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#1E1B4B]"
                    >
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help your business?"
                      className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B21B6] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Download Our Apps */}
            <div className="card-surface bg-gradient-to-b from-[#FAF8FF] to-white p-6 sm:p-7 lg:col-span-3 flex flex-col items-center text-center">
              <h2 className="text-lg font-bold text-[#1E1B4B]">Download Our Apps</h2>
              <p className="mt-1 text-xs text-[#475569]">
                Manage leads, orders, and follow-ups on Android and iOS.
              </p>

              <div className="my-6 w-full">
                <AppPhoneMockup crmName="bestCRM Mobile" />
              </div>

              <StoreBadges centered />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
