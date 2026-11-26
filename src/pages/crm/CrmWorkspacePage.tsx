import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  Utensils,
  BedDouble,
  Building2,
  Flame,
  Jar,
  PackageCheck,
  Send,
  MessageSquare,
  FileText,
  Printer,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { CRM_PRODUCTS } from '../../data/content';
import { CrmIcon } from '../../components/CrmIcon';

export function CrmWorkspacePage() {
  const { crmId } = useParams<{ crmId: string }>();
  const [selectedCrmId, setSelectedCrmId] = useState<string>(crmId || 'catering-crm');
  const currentCrm = CRM_PRODUCTS.find((c) => c.id === selectedCrmId) || CRM_PRODUCTS[0];

  // Global search & tab within workspace
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'inventory' | 'customers'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* Top Workspace Bar */}
      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-xs font-bold text-[#475569] shadow-xs hover:bg-[#F1F5F9] transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Admin Panel</span>
            </Link>

            <span className="h-4 w-px bg-gray-300" />

            {/* Quick CRM Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {CRM_PRODUCTS.map((crm) => (
                <button
                  key={crm.id}
                  type="button"
                  onClick={() => setSelectedCrmId(crm.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCrmId === crm.id
                      ? 'bg-[#5B21B6] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <CrmIcon name={crm.icon} className="h-3.5 w-3.5" />
                  <span>{crm.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-800">
              ● Live Client Workspace
            </span>
            <Link
              to="/"
              className="text-xs font-bold text-[#5B21B6] hover:underline"
            >
              Public Website →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Dynamic CRM Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#4C1D95] p-6 text-white shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/20 backdrop-blur-md">
                <CrmIcon name={currentCrm.icon} className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DDD6FE]">
                  Industry Workflows & Business OS
                </span>
                <h1 className="text-2xl font-extrabold sm:text-3xl">{currentCrm.name}</h1>
                <p className="text-xs sm:text-sm text-[#E2E8F0] mt-0.5">{currentCrm.shortDesc}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => showNotification('Demo WhatsApp invoice & order PDF dispatched to customer!')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-green-700 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Trigger WhatsApp Bill</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-bold text-white border border-white/20 hover:bg-white/25 cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Daily Run</span>
              </button>
            </div>
          </div>
        </div>

        {statusNotification && (
          <div className="p-3.5 rounded-xl bg-green-100 border border-green-300 text-green-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            {statusNotification}
          </div>
        )}

        {/* Industry Specific Specialized Modules */}
        {selectedCrmId === 'catering-crm' && (
          <CateringSpecificWorkspace onNotify={showNotification} />
        )}

        {selectedCrmId === 'hostel-crm' && (
          <HostelSpecificWorkspace onNotify={showNotification} />
        )}

        {selectedCrmId === 'hotel-crm' && (
          <HotelSpecificWorkspace onNotify={showNotification} />
        )}

        {selectedCrmId === 'karam-podi-crm' && (
          <KaramPodiSpecificWorkspace onNotify={showNotification} />
        )}

        {selectedCrmId === 'pickles-sales-crm' && (
          <PicklesSpecificWorkspace onNotify={showNotification} />
        )}

        {selectedCrmId === 'lunch-box-crm' && (
          <LunchBoxSpecificWorkspace onNotify={showNotification} />
        )}
      </main>
    </div>
  );
}

// -------------------------------------------------------------
// 1. Catering CRM Specific Modules
// -------------------------------------------------------------
function CateringSpecificWorkspace({ onNotify }: { onNotify: (msg: string) => void }) {
  const [orders, setOrders] = useState([
    { id: 'CAT-101', event: 'Wedding Reception', client: 'Varma Family', guests: 800, date: '2026-03-04', plateRate: 650, total: 520000, status: 'Confirmed' },
    { id: 'CAT-102', event: 'Sangeet & Dinner', client: 'Reddy Group', guests: 350, date: '2026-03-08', plateRate: 550, total: 192500, status: 'Cooking' },
    { id: 'CAT-103', event: 'Corporate Annual Meet', client: 'Infosys Team', guests: 200, date: '2026-03-12', plateRate: 450, total: 90000, status: 'Draft Quote' },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Upcoming Event Guests</span>
          <p className="text-2xl font-extrabold text-[#5B21B6] mt-1">1,350 Plates</p>
          <span className="text-[11px] text-green-600 font-semibold">3 Major Functions this week</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Avg Plate Value</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">₹585 / plate</p>
          <span className="text-[11px] text-gray-500">Live grocery costing enabled</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Event Revenue</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">₹8,02,500</p>
          <span className="text-[11px] text-green-600 font-semibold">₹4,50,000 advance received</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1B4B]">Catering Event Contracts & Plate Estimator</h3>
          <button
            type="button"
            onClick={() => onNotify('New catering wedding event quote generated!')}
            className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95]"
          >
            + Create Event Contract
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-3 font-bold">Event & Contract</th>
                <th className="p-3 font-bold">Client / Family</th>
                <th className="p-3 font-bold">Event Date</th>
                <th className="p-3 font-bold text-right">Plates Count</th>
                <th className="p-3 font-bold text-right">Plate Rate</th>
                <th className="p-3 font-bold text-right">Contract Value</th>
                <th className="p-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-[#5B21B6]">{o.event} <span className="text-gray-400 font-normal">({o.id})</span></td>
                  <td className="p-3 font-semibold text-gray-800">{o.client}</td>
                  <td className="p-3 text-gray-600">{o.date}</td>
                  <td className="p-3 text-right font-bold tabular-nums">{o.guests}</td>
                  <td className="p-3 text-right tabular-nums">₹{o.plateRate}</td>
                  <td className="p-3 text-right font-extrabold text-[#1E1B4B] tabular-nums">₹{o.total.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-center">
                    <span className="rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-[10px] font-bold">{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Hostel CRM Specific Modules
// -------------------------------------------------------------
function HostelSpecificWorkspace({ onNotify }: { onNotify: (msg: string) => void }) {
  const rooms = [
    { room: '101 - A Block', type: '3-Sharing', totalBeds: 3, occupied: 3, rent: 8500, status: 'Full' },
    { room: '102 - A Block', type: '2-Sharing', totalBeds: 2, occupied: 1, rent: 10500, status: '1 Bed Vacant' },
    { room: '201 - B Block', type: '4-Sharing', totalBeds: 4, occupied: 4, rent: 7000, status: 'Full' },
    { room: '202 - B Block', type: 'Private AC', totalBeds: 1, occupied: 0, rent: 14000, status: 'Vacant' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Capacity</span>
          <p className="text-2xl font-extrabold text-[#5B21B6] mt-1">120 Beds</p>
          <span className="text-[11px] text-green-600 font-semibold">92% Occupancy Rate</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Monthly Mess Dues</span>
          <p className="text-2xl font-extrabold text-green-600 mt-1">₹8,45,000</p>
          <span className="text-[11px] text-gray-500">Collected via UPI automated links</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Pending Rent Alerts</span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">8 Students</p>
          <span className="text-[11px] text-amber-700">Auto WhatsApp reminder due</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">In/Out Gate Passes</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">14 Today</p>
          <span className="text-[11px] text-gray-500">SMS alert sent to parents</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1B4B]">Room & Bed Availability Matrix</h3>
          <button
            type="button"
            onClick={() => onNotify('Allocated Bed #2 in Room 102 to new student!')}
            className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95]"
          >
            + Allocate Student Bed
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((r) => (
            <div key={r.room} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-sm text-[#1E1B4B]">{r.room}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === 'Full' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-xs text-gray-600">{r.type} • ₹{r.rent.toLocaleString('en-IN')}/mo</p>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div style={{ width: `${(r.occupied / r.totalBeds) * 100}%` }} className="bg-[#5B21B6] h-full" />
              </div>
              <span className="text-[11px] text-gray-500">{r.occupied} of {r.totalBeds} beds occupied</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Hotel CRM Specific Modules
// -------------------------------------------------------------
function HotelSpecificWorkspace({ onNotify }: { onNotify: (msg: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Today's Check-ins</span>
          <p className="text-2xl font-extrabold text-[#5B21B6] mt-1">18 Rooms</p>
          <span className="text-[11px] text-green-600">Avg room tariff ₹3,200</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Housekeeping Clean</span>
          <p className="text-2xl font-extrabold text-green-600 mt-1">42 / 45 Ready</p>
          <span className="text-[11px] text-gray-500">3 in maintenance</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Today's Folio Revenue</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">₹68,400</p>
          <span className="text-[11px] text-green-600 font-semibold">12% GST auto-computed</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1B4B]">Live Guest Check-In & Folio Billing</h3>
          <button
            type="button"
            onClick={() => onNotify('Guest checked in Room 304! Digital key card sent via WhatsApp.')}
            className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95]"
          >
            + Guest Fast Check-In
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 font-bold">Room #</th>
                <th className="p-3 font-bold">Guest Name</th>
                <th className="p-3 font-bold">Check-In / Out</th>
                <th className="p-3 font-bold text-right">Tariff / Night</th>
                <th className="p-3 font-bold text-right">Food & Extras</th>
                <th className="p-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { room: '104 (Executive Suite)', guest: 'Vikramaditya Varma', dates: '25 Feb - 28 Feb', tariff: 4500, extras: 1250, st: 'Occupied' },
                { room: '202 (Deluxe AC)', guest: 'Dr. Anand Joshi', dates: '26 Feb - 27 Feb', tariff: 3200, extras: 450, st: 'Occupied' },
                { room: '301 (Standard Double)', guest: 'Sanjay Deshmukh', dates: '24 Feb - 26 Feb', tariff: 2400, extras: 0, st: 'Checked Out' },
              ].map((h) => (
                <tr key={h.room}>
                  <td className="p-3 font-bold text-[#5B21B6]">{h.room}</td>
                  <td className="p-3 font-semibold text-gray-800">{h.guest}</td>
                  <td className="p-3 text-gray-600">{h.dates}</td>
                  <td className="p-3 text-right font-bold tabular-nums">₹{h.tariff}</td>
                  <td className="p-3 text-right tabular-nums">₹{h.extras}</td>
                  <td className="p-3 text-center">
                    <span className="rounded-full bg-blue-100 text-blue-800 px-2.5 py-0.5 text-[10px] font-bold">{h.st}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Karam Podi CRM Specific Modules
// -------------------------------------------------------------
function KaramPodiSpecificWorkspace({ onNotify }: { onNotify: (msg: string) => void }) {
  const inventory = [
    { podi: 'Kandi Podi (Gunpowder)', batch: 'BATCH-2026-08', stock100g: 140, stock250g: 85, stock1kg: 24, price100g: 75, price250g: 175 },
    { podi: 'Idli Karam Podi', batch: 'BATCH-2026-09', stock100g: 95, stock250g: 110, stock1kg: 18, price100g: 80, price250g: 190 },
    { podi: 'Garlic (Vellulli) Karam', batch: 'BATCH-2026-10', stock100g: 220, stock250g: 60, stock1kg: 15, price100g: 85, price250g: 200 },
    { podi: 'Curry Leaf (Karivepaku) Podi', batch: 'BATCH-2026-11', stock100g: 70, stock250g: 40, stock1kg: 10, price100g: 90, price250g: 210 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Finished Goods Stock</span>
          <p className="text-2xl font-extrabold text-[#5B21B6] mt-1">420 Kg</p>
          <span className="text-[11px] text-green-600">Packed in 100g, 250g & 1kg pouches</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Today's Dispatch</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">86 Retail Orders</p>
          <span className="text-[11px] text-gray-500">Thermal barcodes attached</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Wholesale D2C Revenue</span>
          <p className="text-2xl font-extrabold text-green-600 mt-1">₹1,48,200</p>
          <span className="text-[11px] text-gray-500">This week's sales total</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1B4B]">Karam Podi Batch Inventory & Pack-Size Pricing</h3>
          <button
            type="button"
            onClick={() => onNotify('New 50kg batch of Kandi Podi logged to inventory with barcodes!')}
            className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95]"
          >
            + Add New Production Batch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 font-bold">Podi Variety</th>
                <th className="p-3 font-bold">Batch Code</th>
                <th className="p-3 font-bold text-right">100g Stock</th>
                <th className="p-3 font-bold text-right">250g Stock</th>
                <th className="p-3 font-bold text-right">1kg Stock</th>
                <th className="p-3 font-bold text-right">Price (100g)</th>
                <th className="p-3 font-bold text-right">Price (250g)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inventory.map((p) => (
                <tr key={p.podi}>
                  <td className="p-3 font-bold text-[#1E1B4B]">{p.podi}</td>
                  <td className="p-3 font-mono text-[11px] text-[#5B21B6]">{p.batch}</td>
                  <td className="p-3 text-right font-bold tabular-nums">{p.stock100g} pkts</td>
                  <td className="p-3 text-right font-bold tabular-nums">{p.stock250g} pkts</td>
                  <td className="p-3 text-right font-bold tabular-nums">{p.stock1kg} kg</td>
                  <td className="p-3 text-right tabular-nums text-green-700 font-bold">₹{p.price100g}</td>
                  <td className="p-3 text-right tabular-nums text-green-700 font-bold">₹{p.price250g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Pickles Sales CRM Specific Modules
// -------------------------------------------------------------
function PicklesSpecificWorkspace({ onNotify }: { onNotify: (msg: string) => void }) {
  const pickles = [
    { name: 'Avakaya Pickle (Cut Mango)', oil: 'Gingelly (Sesame)', stockJars: 240, wholesalePrice: 280, retailPrice: 350, agingDays: '21 Days Cured' },
    { name: 'Gongura Red Chilli Pickle', oil: 'Groundnut Oil', stockJars: 180, wholesalePrice: 240, retailPrice: 300, agingDays: 'Ready to Ship' },
    { name: 'Tomato Pickle with Garlic', oil: 'Gingelly Oil', stockJars: 310, wholesalePrice: 220, retailPrice: 280, agingDays: 'Ready to Ship' },
    { name: 'Lemon (Nimmakaya) Pickle', oil: 'Cold Pressed Mustard', stockJars: 120, wholesalePrice: 200, retailPrice: 260, agingDays: '45 Days Matured' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Jar Inventory</span>
          <p className="text-2xl font-extrabold text-[#5B21B6] mt-1">850 Glass Jars</p>
          <span className="text-[11px] text-green-600 font-semibold">Quality sealed & FSSAI certified</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Distributor Accounts</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">24 Active Kiranas</p>
          <span className="text-[11px] text-gray-500">Across Hyderabad & Vijayawada</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Online Order Shipments</span>
          <p className="text-2xl font-extrabold text-green-600 mt-1">114 Dispatched</p>
          <span className="text-[11px] text-gray-500">Through Delhivery & India Post</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1B4B]">Pickle Variety Jars & Aging Lifecycle</h3>
          <button
            type="button"
            onClick={() => onNotify('New 200-jar batch of Avakaya pickle logged!')}
            className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95]"
          >
            + Log New Jar Batch
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3 font-bold">Pickle Variety</th>
                <th className="p-3 font-bold">Traditional Oil Used</th>
                <th className="p-3 font-bold text-right">Available Jars</th>
                <th className="p-3 font-bold text-right">Wholesale Rate</th>
                <th className="p-3 font-bold text-right">Retail MRP</th>
                <th className="p-3 font-bold text-center">Curing Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pickles.map((p) => (
                <tr key={p.name}>
                  <td className="p-3 font-bold text-[#1E1B4B]">{p.name}</td>
                  <td className="p-3 text-gray-600">{p.oil}</td>
                  <td className="p-3 text-right font-bold text-[#5B21B6] tabular-nums">{p.stockJars} jars</td>
                  <td className="p-3 text-right tabular-nums">₹{p.wholesalePrice}</td>
                  <td className="p-3 text-right tabular-nums font-bold text-green-700">₹{p.retailPrice}</td>
                  <td className="p-3 text-center">
                    <span className="rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-[10px] font-bold">
                      {p.agingDays}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. Lunch Box CRM Specific Modules
// -------------------------------------------------------------
function LunchBoxSpecificWorkspace({ onNotify }: { onNotify: (msg: string) => void }) {
  const routes = [
    { route: 'Route A - Hitec City & Madhapur', boxes: 65, riders: 2, status: 'Out for Delivery' },
    { route: 'Route B - Gachibowli & Financial Dist', boxes: 48, riders: 2, status: 'Kitchen Packed' },
    { route: 'Route C - Jubilee Hills & Banjara', boxes: 32, riders: 1, status: 'Preparing' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Today's Meal Boxes</span>
          <p className="text-2xl font-extrabold text-[#5B21B6] mt-1">145 Lunches</p>
          <span className="text-[11px] text-green-600">95 Veg Deluxe • 50 Non-Veg</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Active Subscribers</span>
          <p className="text-2xl font-extrabold text-[#1E1B4B] mt-1">112 Working Pros</p>
          <span className="text-[11px] text-gray-500">Monthly auto-debit plans</span>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase">Paused for Holiday</span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">6 Customers</p>
          <span className="text-[11px] text-gray-500">Days credited forward automatically</span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1E1B4B]">Daily Delivery Route & Kitchen Manifests</h3>
          <button
            type="button"
            onClick={() => onNotify('Route manifest dispatched to rider WhatsApp groups!')}
            className="rounded-xl bg-[#5B21B6] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#4C1D95]"
          >
            + Dispatch Route Manifest
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {routes.map((rt) => (
            <div key={rt.route} className="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
              <span className="font-bold text-sm text-[#1E1B4B]">{rt.route}</span>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Boxes: <strong>{rt.boxes}</strong></span>
                <span className="text-gray-600">Riders: <strong>{rt.riders}</strong></span>
              </div>
              <span className="inline-block rounded-full bg-blue-100 text-blue-800 px-2 py-0.5 text-[10px] font-bold">
                {rt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
