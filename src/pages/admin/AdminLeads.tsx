import { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Send,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { LeadItem, useAdmin } from '../../context/AdminContext';
import { CRM_PRODUCTS } from '../../data/content';

export function AdminLeads() {
  const { leads, updateLeadStatus, addLeadNote, assignLead, addLead } = useAdmin();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'converted' | 'closed'>('all');
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [newModalOpen, setNewModalOpen] = useState(false);

  // New lead form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [biz, setBiz] = useState('');
  const [interest, setInterest] = useState(CRM_PRODUCTS[0].name);
  const [source, setSource] = useState<LeadItem['source']>('Website Demo');

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.businessType.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.crmInterest.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead || !noteInput.trim()) return;
    addLeadNote(activeLead.id, `${new Date().toLocaleDateString('en-IN')}: ${noteInput.trim()}`);
    setNoteInput('');
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    addLead({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone,
      businessType: biz || 'Local Business',
      crmInterest: interest,
      status: 'new',
      assignedTo: 'Kiran (Sales Lead)',
      source,
      notes: [`Inbound ${source} enquiry recorded.`],
      reminderDate: 'Tomorrow 10:30 AM',
    });
    setNewModalOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    setBiz('');
  };

  const staffMembers = ['Kiran (Sales Lead)', 'Priya (Sales Rep)', 'Anand (BizDev)', 'Unassigned'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Enquiry & Lead Pipeline</h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            All website demo requests, contact forms, and WhatsApp inquiries in one central CRM queue.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setNewModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#5B21B6] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#4C1D95] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Lead</span>
        </button>
      </div>

      {/* Pipeline Status Kanban Chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { key: 'new', label: 'New Enquiries', count: leads.filter(l => l.status === 'new').length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { key: 'contacted', label: 'Contacted / Follow-up', count: leads.filter(l => l.status === 'contacted').length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { key: 'converted', label: 'Converted to Paid', count: leads.filter(l => l.status === 'converted').length, color: 'bg-green-50 text-green-700 border-green-200' },
          { key: 'closed', label: 'Closed / Inactive', count: leads.filter(l => l.status === 'closed').length, color: 'bg-gray-50 text-gray-700 border-gray-200' },
        ].map((item) => (
          <div
            key={item.key}
            onClick={() => setStatusFilter(item.key as any)}
            className={`p-4 rounded-xl border cursor-pointer transition hover:shadow-xs ${item.color} ${
              statusFilter === item.key ? 'ring-2 ring-[#7C3AED]' : ''
            }`}
          >
            <span className="text-xs font-bold">{item.label}</span>
            <p className="mt-1 text-2xl font-extrabold">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#EDE9FE] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, phone, business or CRM product..."
            className="w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] py-1.5 pl-9 pr-3 text-xs text-[#1E1B4B] focus:border-[#7C3AED] focus:bg-white focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
            statusFilter === 'all' ? 'bg-[#5B21B6] text-white border-[#5B21B6]' : 'border-[#EDE9FE] text-[#5B21B6]'
          }`}
        >
          Reset Filter (Showing {filtered.length})
        </button>
      </div>

      {/* Leads List / Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            className="rounded-2xl border border-[#EDE9FE] bg-white p-5 shadow-xs hover:border-[#C4B5FD] transition space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-bold text-[#5B21B6]">
                  {lead.source}
                </span>
                <h3 className="mt-1 text-base font-bold text-[#1E1B4B]">{lead.name}</h3>
                <p className="text-xs text-[#64748B]">{lead.businessType}</p>
              </div>

              {/* Status Selector */}
              <select
                value={lead.status}
                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold uppercase cursor-pointer border ${
                  lead.status === 'new'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : lead.status === 'contacted'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : lead.status === 'converted'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* CRM Interest & Contact Info */}
            <div className="rounded-xl bg-[#FAF8FF] p-3 text-xs flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[#64748B]">Interested In:</span>{' '}
                <strong className="text-[#5B21B6]">{lead.crmInterest}</strong>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1 text-[#5B21B6] hover:underline font-bold"
                >
                  <Phone className="h-3 w-3" /> {lead.phone}
                </a>
                <a
                  href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-green-600 hover:underline font-bold"
                >
                  <MessageSquare className="h-3 w-3" /> WhatsApp
                </a>
              </div>
            </div>

            {/* Assigned Staff & Reminder */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F3EEFF]">
              <div className="flex items-center gap-2">
                <span className="text-[#64748B]">Assigned to:</span>
                <select
                  value={lead.assignedTo}
                  onChange={(e) => assignLead(lead.id, e.target.value)}
                  className="rounded-md border border-[#EDE9FE] bg-white px-2 py-0.5 text-xs text-[#1E1B4B]"
                >
                  {staffMembers.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {lead.reminderDate && (
                <span className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold">
                  <Clock className="h-3 w-3" /> Follow-up: {lead.reminderDate}
                </span>
              )}
            </div>

            {/* Notes Thread */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Staff Notes:</span>
              <ul className="text-xs text-[#475569] space-y-1">
                {lead.notes.map((note, idx) => (
                  <li key={idx} className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-start gap-1.5">
                    <span className="text-[#5B21B6] font-bold">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setActiveLead(lead)}
                className="text-[11px] font-bold text-[#7C3AED] hover:underline"
              >
                + Add Follow-up Note / Log Call
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Follow-up Note Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleAddNote}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-[#1E1B4B]">Follow-up Note for {activeLead.name}</h3>
              <button type="button" onClick={() => setActiveLead(null)} className="text-gray-400">✕</button>
            </div>

            <textarea
              rows={3}
              required
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="e.g. Discussed pricing over phone; client requested custom menu setup on Tuesday..."
              className="w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-3 text-xs focus:border-[#7C3AED] focus:bg-white focus:outline-none"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="px-3 py-1.5 text-xs text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B21B6] px-4 py-1.5 text-xs font-semibold text-white"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* New Lead Modal */}
      {newModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleCreateLead}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-[#1E1B4B]">Manually Add Inbound Lead</h3>
              <button type="button" onClick={() => setNewModalOpen(false)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-gray-700">Client / Contact Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Suresh Reddy"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Phone / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Business / Venture Name</label>
                <input
                  type="text"
                  value={biz}
                  onChange={(e) => setBiz(e.target.value)}
                  placeholder="e.g. Tirupati Tiffins"
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Interested Industry CRM</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                >
                  {CRM_PRODUCTS.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Inbound Channel</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs"
                >
                  <option value="Website Demo">Website Demo</option>
                  <option value="WhatsApp">WhatsApp Chat</option>
                  <option value="Contact Form">Contact Form</option>
                  <option value="Consultation">Consultation Call</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setNewModalOpen(false)}
                className="px-3 py-1.5 text-xs text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-semibold text-white"
              >
                Add Lead
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
