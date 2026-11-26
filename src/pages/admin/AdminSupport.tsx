import { useState } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  User,
  Plus,
  HelpCircle,
} from 'lucide-react';
import { SupportTicket, useAdmin } from '../../context/AdminContext';

export function AdminSupport() {
  const { tickets, updateTicketStatus, assignTicket, addTicketReply } = useAdmin();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket>(tickets[0]);
  const [replyText, setReplyText] = useState('');
  const [activeTab, setActiveTab] = useState<'tickets' | 'faqs'>('tickets');

  // FAQ Manager state
  const [faqs, setFaqs] = useState([
    { id: 'faq-1', q: 'How does WhatsApp automation work for catering invoices?', a: 'Once an order is confirmed, our automated API dispatches PDF bills with UPI payment links directly to the customer’s phone.' },
    { id: 'faq-2', q: 'Can multiple branches of a hostel be managed from one account?', a: 'Yes, with our Professional and Enterprise plans, you can add unlimited buildings and branches under a single master dashboard.' },
    { id: 'faq-3', q: 'Is GST invoice auto-calculated for retail spice sales?', a: 'Yes! Karam Podi and Pickles CRM automatically split CGST and SGST on retail receipts and wholesale orders.' },
  ]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addTicketReply(selectedTicket.id, replyText.trim());
    setReplyText('');
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQ || !newFaqA) return;
    setFaqs((prev) => [...prev, { id: `faq-${Date.now()}`, q: newFaqQ, a: newFaqA }]);
    setNewFaqQ('');
    setNewFaqA('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Support & Help Desk Management</h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Resolve client issues, assign engineers, and manage knowledge base FAQs shown on bestcrm.in.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-xl bg-[#F3EEFF] p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('tickets')}
            className={`rounded-lg px-4 py-2 font-bold transition cursor-pointer ${
              activeTab === 'tickets' ? 'bg-[#5B21B6] text-white shadow-xs' : 'text-[#5B21B6]'
            }`}
          >
            Support Tickets ({tickets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`rounded-lg px-4 py-2 font-bold transition cursor-pointer ${
              activeTab === 'faqs' ? 'bg-[#5B21B6] text-white shadow-xs' : 'text-[#5B21B6]'
            }`}
          >
            FAQ & Content Manager ({faqs.length})
          </button>
        </div>
      </div>

      {activeTab === 'tickets' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Ticket List (5 cols) */}
          <div className="rounded-2xl border border-[#EDE9FE] bg-white p-4 shadow-xs lg:col-span-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Active Ticket Queue
            </h2>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
              {tickets.map((t) => {
                const isSelected = selectedTicket?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicket(t)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-[#7C3AED] bg-[#FAF8FF] shadow-xs'
                        : 'border-[#EDE9FE] hover:bg-[#F3EEFF]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#5B21B6]">{t.ticketNo}</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full uppercase ${
                          t.priority === 'high' || t.priority === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>

                    <h4 className="mt-1 font-bold text-xs text-[#1E1B4B] line-clamp-1">{t.subject}</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{t.userName} • {t.crmName}</p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-[#94A3B8]">
                      <span>Assigned: <strong>{t.assignedTo}</strong></span>
                      <span className={`font-semibold capitalize ${t.status === 'open' ? 'text-amber-600' : 'text-green-600'}`}>
                        ● {t.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Conversation Thread (7 cols) */}
          <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-7 flex flex-col justify-between">
            {selectedTicket ? (
              <div className="space-y-5">
                {/* Header details */}
                <div className="border-b border-[#F3EEFF] pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#5B21B6]">{selectedTicket.ticketNo}</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedTicket.status}
                        onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value as any)}
                        className="rounded-lg border border-[#EDE9FE] px-2 py-1 text-xs font-semibold"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <select
                        value={selectedTicket.assignedTo}
                        onChange={(e) => assignTicket(selectedTicket.id, e.target.value)}
                        className="rounded-lg border border-[#EDE9FE] px-2 py-1 text-xs text-[#1E1B4B]"
                      >
                        <option value="Vikram (Tech Support)">Vikram (Tech Support)</option>
                        <option value="Rohit (Accounts)">Rohit (Accounts)</option>
                        <option value="Priya (Sales Rep)">Priya (Sales Rep)</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-[#1E1B4B]">{selectedTicket.subject}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    User: <strong>{selectedTicket.userName}</strong> ({selectedTicket.userEmail}) • CRM: {selectedTicket.crmName}
                  </p>
                </div>

                {/* Messages Loop */}
                <div className="space-y-3 max-h-80 overflow-y-auto p-2">
                  {selectedTicket.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] rounded-2xl p-3.5 text-xs ${
                        msg.sender === 'admin'
                          ? 'ml-auto bg-[#5B21B6] text-white'
                          : 'bg-[#F3EEFF] text-[#1E1B4B]'
                      }`}
                    >
                      <span className={`text-[10px] font-bold mb-1 ${msg.sender === 'admin' ? 'text-[#DDD6FE]' : 'text-[#7C3AED]'}`}>
                        {msg.sender === 'admin' ? 'Support Specialist (bestCRM)' : selectedTicket.userName}
                      </span>
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className={`text-[9px] mt-1 text-right ${msg.sender === 'admin' ? 'text-white/75' : 'text-gray-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="flex gap-2 pt-3 border-t border-[#F3EEFF]">
                  <input
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type official reply to send to user via portal & email..."
                    className="flex-1 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] px-3.5 py-2 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-xl bg-[#5B21B6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4C1D95] cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-center text-xs text-[#94A3B8] py-20">Select a ticket from the left to inspect conversation.</p>
            )}
          </div>
        </div>
      ) : (
        /* FAQ & Content Manager Tab */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* FAQ List */}
          <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-[#1E1B4B]">Live Public FAQ Articles</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl border border-[#EDE9FE] bg-[#FAF8FF]">
                  <h4 className="font-bold text-xs text-[#1E1B4B]">{faq.q}</h4>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add New FAQ Form */}
          <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-5 space-y-4">
            <h2 className="text-base font-bold text-[#1E1B4B]">Add New FAQ Question</h2>
            <form onSubmit={handleAddFaq} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Question Title *</label>
                <input
                  type="text"
                  required
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  placeholder="e.g. How do I import my customer phonebook?"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Detailed Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  placeholder="Provide clear steps for small business owners..."
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#5B21B6] py-2.5 text-xs font-bold text-white hover:bg-[#4C1D95] cursor-pointer"
              >
                Publish FAQ to Public Site
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
