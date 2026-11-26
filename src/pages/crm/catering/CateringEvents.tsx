import { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Phone,
  Eye,
  FileText,
  X,
  Filter,
} from 'lucide-react';
import { WhatsAppIcon } from '../../../components/WhatsAppIcon';

export interface CateringEvent {
  id: string;
  eventName: string;
  eventType: 'Wedding' | 'Reception' | 'Sangeet' | 'Birthday' | 'Corporate' | 'Housewarming';
  clientName: string;
  phone: string;
  eventDate: string;
  venue: string;
  meals: { mealName: string; time: string; plates: number; plateRate: number }[];
  totalPlates: number;
  totalBudget: number;
  advancePaid: number;
  status: 'Inquiry' | 'Tasting' | 'Confirmed' | 'Cooking' | 'Completed';
  muhurthamTime?: string;
  notes: string;
}

const INITIAL_EVENTS: CateringEvent[] = [
  {
    id: 'CAT-2026-01',
    eventName: 'Srikanth & Deepthi Grand Wedding',
    eventType: 'Wedding',
    clientName: 'M. Varma & Family',
    phone: '+91 98490 22334',
    eventDate: '2026-03-04',
    muhurthamTime: '08:45 AM (Dhanur Lagnam)',
    venue: 'N Convention, Madhapur, Hyderabad',
    meals: [
      { mealName: 'Muhurtham Breakfast', time: '07:30 AM', plates: 400, plateRate: 250 },
      { mealName: 'Traditional Grand Lunch', time: '12:30 PM', plates: 1200, plateRate: 650 },
    ],
    totalPlates: 1600,
    totalBudget: 880000,
    advancePaid: 350000,
    status: 'Confirmed',
    notes: 'Pure vegetarian South Indian feast on traditional banana leaves. Special Mysore Pak counter.',
  },
  {
    id: 'CAT-2026-02',
    eventName: 'Dr. Rahul & Sneha Sangeet Night',
    eventType: 'Sangeet',
    clientName: 'Dr. K. S. Rao',
    phone: '+91 97001 88992',
    eventDate: '2026-03-08',
    venue: 'Fort Grand, Shamshabad',
    meals: [
      { mealName: 'Cocktail & Hi-Tea', time: '05:30 PM', plates: 300, plateRate: 350 },
      { mealName: 'Dinner & Live Chaat Buffet', time: '08:30 PM', plates: 500, plateRate: 750 },
    ],
    totalPlates: 800,
    totalBudget: 480000,
    advancePaid: 200000,
    status: 'Cooking',
    notes: 'Live Pasta counter + Dosa cart + Jalebi live station required.',
  },
  {
    id: 'CAT-2026-03',
    eventName: 'Tech Mahindra Annual Leadership Summit',
    eventType: 'Corporate',
    clientName: 'Anil Gupta (Admin VP)',
    phone: '+91 99887 11223',
    eventDate: '2026-03-12',
    venue: 'HICC Novotel Hall 2, Hitec City',
    meals: [
      { mealName: 'Executive Lunch Buffet', time: '01:00 PM', plates: 350, plateRate: 550 },
      { mealName: 'Evening High Tea', time: '04:30 PM', plates: 350, plateRate: 180 },
    ],
    totalPlates: 700,
    totalBudget: 255500,
    advancePaid: 100000,
    status: 'Confirmed',
    notes: 'Corporate PO received. GST tax invoice with corporate PAN required.',
  },
  {
    id: 'CAT-2026-04',
    eventName: 'Aarav 1st Birthday & Cradle Ceremony',
    eventType: 'Birthday',
    clientName: 'Suresh & Preeti',
    phone: '+91 96111 44556',
    eventDate: '2026-03-15',
    venue: 'Radisson Blu, Banjara Hills',
    meals: [
      { mealName: 'Dinner Buffet', time: '07:30 PM', plates: 250, plateRate: 600 },
    ],
    totalPlates: 250,
    totalBudget: 150000,
    advancePaid: 50000,
    status: 'Tasting',
    notes: 'Food tasting scheduled for Sunday 11 AM.',
  },
];

export function CateringEvents({ onNotify }: { onNotify: (msg: string) => void }) {
  const [events, setEvents] = useState<CateringEvent[]>(INITIAL_EVENTS);
  const [filterType, setFilterType] = useState<string>('All');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CateringEvent | null>(null);

  // New Event Form
  const [name, setName] = useState('');
  const [type, setType] = useState<CateringEvent['eventType']>('Wedding');
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-03-20');
  const [venue, setVenue] = useState('');
  const [plates, setPlates] = useState<number>(500);
  const [rate, setRate] = useState<number>(600);
  const [muhurtham, setMuhurtham] = useState('');
  const [notes, setNotes] = useState('');

  const filtered = events.filter((e) => filterType === 'All' || e.eventType === filterType);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !client) return;
    const newEv: CateringEvent = {
      id: `CAT-2026-0${events.length + 1}`,
      eventName: name,
      eventType: type,
      clientName: client,
      phone: phone || '+91 98000 00000',
      eventDate: date,
      venue: venue || 'Client Residence / Banquet',
      meals: [{ mealName: 'Main Meal', time: '12:30 PM', plates: Number(plates), plateRate: Number(rate) }],
      totalPlates: Number(plates),
      totalBudget: Number(plates) * Number(rate),
      advancePaid: Math.round(Number(plates) * Number(rate) * 0.25),
      status: 'Confirmed',
      muhurthamTime: muhurtham,
      notes,
    };
    setEvents([newEv, ...events]);
    setAddModalOpen(false);
    onNotify(`Created new catering contract for ${name}!`);
    setName('');
    setClient('');
  };

  return (
    <div className="space-y-5">
      {/* Action Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1E1B4B]">Events & Muhurtham Schedule</h2>
          <p className="text-xs text-[#64748B]">Manage wedding contracts, guest plate counts, multi-meal timelines and venues.</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-[#1E1B4B]"
          >
            <option value="All">All Event Types</option>
            <option value="Wedding">Weddings</option>
            <option value="Reception">Receptions</option>
            <option value="Sangeet">Sangeet Nights</option>
            <option value="Corporate">Corporate Summits</option>
            <option value="Birthday">Birthdays & Anniversaries</option>
          </select>

          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#5B21B6] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#4C1D95] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Book New Event</span>
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs hover:border-[#7C3AED] transition space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block rounded-full bg-[#EDE9FE] px-2.5 py-0.5 text-[10px] font-bold text-[#5B21B6]">
                  {ev.eventType} • {ev.id}
                </span>
                <h3 className="mt-1 text-base font-bold text-[#1E1B4B]">{ev.eventName}</h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                  <span>{ev.venue}</span>
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                  ev.status === 'Confirmed'
                    ? 'bg-green-100 text-green-800'
                    : ev.status === 'Cooking'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                ● {ev.status}
              </span>
            </div>

            {/* Date, Muhurtham & Plate Metrics */}
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-[#FAF8FF] p-3 text-xs border border-[#F3EEFF]">
              <div>
                <span className="text-[#64748B]">Date & Time:</span>
                <p className="font-bold text-[#1E1B4B]">{ev.eventDate}</p>
                {ev.muhurthamTime && <p className="text-[10px] text-[#7C3AED] font-semibold">{ev.muhurthamTime}</p>}
              </div>

              <div>
                <span className="text-[#64748B]">Total Guests:</span>
                <p className="font-extrabold text-[#5B21B6] tabular-nums text-sm">{ev.totalPlates.toLocaleString('en-IN')} Plates</p>
                <p className="text-[10px] text-gray-500">{ev.meals.length} Meal Session(s)</p>
              </div>

              <div className="text-right">
                <span className="text-[#64748B]">Contract Value:</span>
                <p className="font-extrabold text-[#1E1B4B] tabular-nums text-sm">₹{ev.totalBudget.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-green-700 font-semibold">Advance: ₹{ev.advancePaid.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Client & Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
              <span className="text-gray-600">
                Client: <strong>{ev.clientName}</strong> ({ev.phone})
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${ev.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95"
                  title="Chat with client on WhatsApp"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] hover:from-[#4C1D95] hover:to-[#6D28D9] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Drawer */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-xs font-bold text-[#5B21B6]">{selectedEvent.id}</span>
                <h3 className="text-lg font-bold text-[#1E1B4B]">{selectedEvent.eventName}</h3>
                <p className="text-xs text-gray-500">{selectedEvent.venue}</p>
              </div>
              <button type="button" onClick={() => setSelectedEvent(null)} className="text-gray-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border space-y-1">
                <span className="font-bold text-gray-700">Scheduled Meal Sessions:</span>
                {selectedEvent.meals.map((m, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b last:border-0">
                    <span className="font-semibold">{m.mealName} ({m.time})</span>
                    <span className="tabular-nums font-bold text-[#5B21B6]">{m.plates} Plates @ ₹{m.plateRate} = ₹{(m.plates * m.plateRate).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8FF] border border-[#EDE9FE] space-y-1">
                <span className="font-bold text-[#1E1B4B]">Special Food Notes & Instructions:</span>
                <p className="text-gray-600">{selectedEvent.notes}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2.5 pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-500 font-medium">Client Contact: <strong className="text-gray-800">{selectedEvent.phone}</strong></span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedEvent.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold transition shadow-2xs"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                  <span>WhatsApp Client</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Event Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-3 text-xs animate-in fade-in"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-base font-bold text-[#1E1B4B]">Book New Catering Function</h3>
              <button type="button" onClick={() => setAddModalOpen(false)} className="text-gray-400">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="font-semibold text-gray-700">Event Function Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Madhav & Lavanya Wedding Reception"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Event Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Sangeet">Sangeet / Mehendi</option>
                  <option value="Corporate">Corporate Summit</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Housewarming">Housewarming (Gruhapravesam)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700">Function Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Client / Family Name *</label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="e.g. S. R. Varma"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">WhatsApp Phone *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98490 00000"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-gray-700">Venue / Function Hall</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. N Convention, Hall 1, Madhapur"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Estimated Plates</label>
                <input
                  type="number"
                  value={plates}
                  onChange={(e) => setPlates(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700">Agreed Plate Rate (₹)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-gray-700">Muhurtham Timings (if applicable)</label>
                <input
                  type="text"
                  value={muhurtham}
                  onChange={(e) => setMuhurtham(e.target.value)}
                  placeholder="e.g. 09:15 AM (Simha Lagnam)"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>

              <div className="col-span-2">
                <label className="font-semibold text-gray-700">Special Instructions / Menu Preferences</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Traditional banana leaf dining + live sweet counters"
                  className="mt-1 w-full rounded-xl border border-gray-300 p-2 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setAddModalOpen(false)} className="px-3 py-1.5 text-gray-500">Cancel</button>
              <button type="submit" className="rounded-xl bg-[#5B21B6] px-4 py-1.5 font-bold text-white">Save & Lock Event</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
