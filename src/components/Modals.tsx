import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CRM_PRODUCTS } from '../data/content';
import { CrmIcon } from './CrmIcon';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

function AccessibleModal({
  open,
  onClose,
  titleId,
  children,
  maxWidthClass = 'max-w-lg',
}: BaseModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      const el = containerRef.current;
      if (!el) return;
      const focusables = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        el.focus();
      }
    };

    const timer = window.setTimeout(focusFirst, 10);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && containerRef.current) {
        const focusables = Array.from(
          containerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1B4B]/55 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto rounded-[20px] border border-[#DDD6FE] bg-white p-6 sm:p-7 shadow-[0_25px_70px_-15px_rgba(30,27,75,0.35)]`}
      >
        {children}
      </div>
    </div>
  );
}

interface LeadModalFormProps {
  mode: 'demo' | 'enquiry';
  open: boolean;
  onClose: () => void;
  initialRequirement: string;
}

function LeadModalForm({ mode, open, onClose, initialRequirement }: LeadModalFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState(initialRequirement);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setRequirement(initialRequirement);
      setError('');
      setSubmitted(false);
    }
  }, [open, initialRequirement]);

  const title = mode === 'demo' ? 'Request a Live Demo' : 'Talk to Our Team';
  const subtitle =
    mode === 'demo'
      ? 'See how bestCRM fits your business in a guided 15-minute walkthrough.'
      : 'Share your requirements and our CRM specialists will get back to you.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please enter your name, email address, and phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 8) {
      setError('Please enter a valid contact phone number.');
      return;
    }

    // TODO: connect to API — Submit lead/demo enquiry payload to backend CRM endpoint
    setError('');
    setSubmitted(true);
  };

  return (
    <AccessibleModal
      open={open}
      onClose={onClose}
      titleId={`modal-title-${mode}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-[#7C3AED]">
            {mode === 'demo' ? 'Product Demo' : 'Business Enquiry'}
          </p>
          <h2 id={`modal-title-${mode}`} className="mt-1 text-xl font-bold text-[#1E1B4B]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[#475569]">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#EDE9FE] text-[#475569] transition hover:bg-[#F3EEFF] hover:text-[#1E1B4B] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-[#16A34A]" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-bold text-[#1E1B4B]">Request Received</h3>
          <p className="mt-1.5 text-sm text-[#475569]">
            Thank you, <span className="font-semibold text-[#1E1B4B]">{name}</span>. Our team will reach out shortly regarding{' '}
            <span className="font-semibold text-[#5B21B6]">{requirement}</span>.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
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
              htmlFor={`${mode}-name`}
              className="block text-xs font-semibold text-[#1E1B4B]"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id={`${mode}-name`}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Karthik Reddy"
              className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${mode}-email`}
                className="block text-xs font-semibold text-[#1E1B4B]"
              >
                Work Email <span className="text-red-600">*</span>
              </label>
              <input
                id={`${mode}-email`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`${mode}-phone`}
                className="block text-xs font-semibold text-[#1E1B4B]"
              >
                Phone / WhatsApp <span className="text-red-600">*</span>
              </label>
              <input
                id={`${mode}-phone`}
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor={`${mode}-requirement`}
              className="block text-xs font-semibold text-[#1E1B4B]"
            >
              Select Requirement
            </label>
            <select
              id={`${mode}-requirement`}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
            >
              {CRM_PRODUCTS.map((crm) => (
                <option key={crm.id} value={crm.name}>
                  {crm.name}
                </option>
              ))}
              <option value="Demo Request">Demo Request</option>
              <option value="Enterprise Custom Plan">Enterprise Custom Plan</option>
              <option value="Pricing & Onboarding">Pricing & Onboarding</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`${mode}-message`}
              className="block text-xs font-semibold text-[#1E1B4B]"
            >
              Notes (optional)
            </label>
            <textarea
              id={`${mode}-message`}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your team size or workflow needs..."
              className="mt-1.5 w-full rounded-xl border border-[#DDD6FE] bg-[#FAF8FF] px-3.5 py-2.5 text-sm text-[#1E1B4B] placeholder:text-[#94A3B8] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DDD6FE] px-4 py-2.5 text-sm font-semibold text-[#475569] transition hover:bg-[#FAF8FF] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
            >
              <span>{mode === 'demo' ? 'Submit Demo Request' : 'Send Enquiry'}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </AccessibleModal>
  );
}

export function CrmDetailModal() {
  const { activeCrmModal, closeCrmModal, setCheckout, openDemoModal } = useApp();
  const navigate = useNavigate();

  if (!activeCrmModal) return null;

  const handleGetStartedWithCrm = () => {
    setCheckout((prev) => ({ ...prev, crmId: activeCrmModal.id }));
    closeCrmModal();
    navigate('/checkout');
  };

  const handleRequestDemoForCrm = () => {
    const name = activeCrmModal.name;
    closeCrmModal();
    openDemoModal(name);
  };

  return (
    <AccessibleModal
      open={Boolean(activeCrmModal)}
      onClose={closeCrmModal}
      titleId="crm-detail-modal-title"
      maxWidthClass="max-w-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#5B21B6]">
            <CrmIcon name={activeCrmModal.icon} className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#7C3AED]">Ready-Made Industry CRM</p>
            <h2 id="crm-detail-modal-title" className="text-xl font-bold text-[#1E1B4B]">
              {activeCrmModal.name}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={closeCrmModal}
          aria-label="Close CRM details"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#EDE9FE] text-[#475569] transition hover:bg-[#F3EEFF] hover:text-[#1E1B4B] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#475569]">
        {activeCrmModal.fullDesc}
      </p>

      <div className="mt-4 text-xs font-medium text-[#5B21B6]">
        {activeCrmModal.tags.join('  ·  ')}
      </div>

      <div className="mt-5 rounded-2xl border border-[#EDE9FE] bg-[#FAF8FF] p-4">
        <p className="text-xs font-bold text-[#1E1B4B]">Included Key Workflows</p>
        <ul className="mt-3 space-y-2.5">
          {activeCrmModal.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-[#475569]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleRequestDemoForCrm}
          className="inline-flex items-center justify-center rounded-xl border border-[#DDD6FE] bg-white px-4 py-2.5 text-sm font-semibold text-[#5B21B6] transition hover:bg-[#F3EEFF] cursor-pointer"
        >
          Request Demo
        </button>
        <button
          type="button"
          onClick={handleGetStartedWithCrm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4C1D95] cursor-pointer"
        >
          <span>Get Started with {activeCrmModal.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </AccessibleModal>
  );
}

export function GlobalModals() {
  const {
    demoModalOpen,
    closeDemoModal,
    enquiryModalOpen,
    closeEnquiryModal,
    enquiryContext,
    modalPreselectedReq,
  } = useApp();

  return (
    <>
      <LeadModalForm
        mode="demo"
        open={demoModalOpen}
        onClose={closeDemoModal}
        initialRequirement={modalPreselectedReq}
      />
      <LeadModalForm
        mode="enquiry"
        open={enquiryModalOpen}
        onClose={closeEnquiryModal}
        initialRequirement={enquiryContext}
      />
      <CrmDetailModal />
    </>
  );
}
