import React, { useState } from 'react';
import { 
  Smartphone, CreditCard, Download, Wrench, Utensils, Bell, 
  CheckCircle2, Clock, QrCode, FileText, Send, AlertTriangle, ShieldCheck
} from 'lucide-react';

export const HostelTenantPortal: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [selectedResident, setSelectedResident] = useState<'rohan' | 'sneha' | 'karthik'>('rohan');
  const [activeTab, setActiveTab] = useState<'overview' | 'rent' | 'tickets' | 'mess'>('overview');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Plumbing / Bathroom');
  const [ticketDescription, setTicketDescription] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  // Resident profiles
  const residentsData = {
    rohan: {
      name: 'Rohan Sharma',
      room: 'Room 101 - Bed A (2-Sharing AC)',
      joined: '01 July 2026',
      depositPaid: 15000,
      monthlyRent: 8500,
      powerUnits: 45,
      powerBill: 495,
      messDues: 0,
      totalDue: 8995,
      dueDate: '05 Dec 2026',
      status: 'Rent Due',
      tickets: [
        { id: 'TKT-101', subject: 'Geyser thermostat auto-cutoff issue', date: '2026-11-20', status: 'Resolved' },
        { id: 'TKT-104', subject: 'Bedside reading lamp flickering', date: '2026-11-27', status: 'In Progress' }
      ]
    },
    sneha: {
      name: 'Sneha Patel',
      room: 'Room 202 - Bed A (3-Sharing Non-AC)',
      joined: '15 Aug 2026',
      depositPaid: 12000,
      monthlyRent: 6500,
      powerUnits: 28,
      powerBill: 308,
      messDues: 0,
      totalDue: 0,
      dueDate: '05 Dec 2026',
      status: 'Paid',
      tickets: [
        { id: 'TKT-098', subject: 'Almirah lock key duplicate request', date: '2026-11-15', status: 'Resolved' }
      ]
    },
    karthik: {
      name: 'Karthik Raja',
      room: 'Room 102 - Bed A (Single AC Premium)',
      joined: '10 Sept 2026',
      depositPaid: 20000,
      monthlyRent: 12000,
      powerUnits: 80,
      powerBill: 880,
      messDues: 500,
      totalDue: 13380,
      dueDate: '05 Nov 2026',
      status: 'Overdue (3 Weeks)',
      tickets: []
    }
  };

  const current = residentsData[selectedResident];

  const handlePayRent = () => {
    setPaymentDone(true);
    onNotify?.(`₹${current.totalDue} paid successfully via UPI QR simulation! Receipt generated.`);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject) return;
    onNotify?.(`Maintenance ticket "${ticketSubject}" logged for ${current.room}! Warden alerted.`);
    setTicketSubject('');
    setTicketDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Smartphone className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Tenant Mobile App Simulation</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Simulate resident self-service: pay rent with UPI QR, raise maintenance tickets, and check mess menu.
          </p>
        </div>

        {/* Tenant Selector for Live Testing */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">Switch Resident:</span>
          <select
            value={selectedResident}
            onChange={(e) => {
              setSelectedResident(e.target.value as any);
              setPaymentDone(false);
            }}
            className="px-3 py-1.5 border border-purple-200 bg-purple-50 text-[#5B21B6] font-bold text-xs rounded-xl focus:ring-2 focus:ring-[#5B21B6]"
          >
            <option value="rohan">Rohan Sharma (Room 101 - Due ₹8,995)</option>
            <option value="sneha">Sneha Patel (Room 202 - All Clear)</option>
            <option value="karthik">Karthik Raja (Room 102 - Overdue ₹13,380)</option>
          </select>
        </div>
      </div>

      {/* Mobile App Device Frame Mockup */}
      <div className="max-w-md mx-auto bg-white rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden">
        {/* Phone Notch Bar */}
        <div className="bg-gray-800 px-6 py-2.5 flex justify-between items-center text-white text-[11px] font-bold">
          <span>09:41 AM</span>
          <div className="w-16 h-4 bg-black rounded-full" />
          <div className="flex items-center gap-1">
            <span className="text-[10px]">5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* In-App Header */}
        <div className="bg-gradient-to-r from-[#1E1B4B] to-[#5B21B6] text-white p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-purple-200 font-extrabold uppercase tracking-wider">Hostel Resident App</span>
              <h3 className="text-base font-extrabold">{current.name}</h3>
              <p className="text-xs text-purple-100">{current.room}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-extrabold text-sm">
              {current.name[0]}
            </div>
          </div>

          {/* Quick Sub-navigation within mobile app */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-1.5 rounded-lg font-bold text-center transition cursor-pointer ${activeTab === 'overview' ? 'bg-white text-[#5B21B6] shadow-xs' : 'text-purple-100'}`}
            >
              Summary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              className={`flex-1 py-1.5 rounded-lg font-bold text-center transition cursor-pointer ${activeTab === 'rent' ? 'bg-white text-[#5B21B6] shadow-xs' : 'text-purple-100'}`}
            >
              Pay Rent
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 py-1.5 rounded-lg font-bold text-center transition cursor-pointer ${activeTab === 'tickets' ? 'bg-white text-[#5B21B6] shadow-xs' : 'text-purple-100'}`}
            >
              Tickets
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mess')}
              className={`flex-1 py-1.5 rounded-lg font-bold text-center transition cursor-pointer ${activeTab === 'mess' ? 'bg-white text-[#5B21B6] shadow-xs' : 'text-purple-100'}`}
            >
              Mess
            </button>
          </div>
        </div>

        {/* In-App Content Body */}
        <div className="p-4 space-y-4 bg-gray-50 min-h-[420px]">
          {activeTab === 'overview' && (
            <div className="space-y-3">
              {/* Payment Status Card */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500">Rent Status</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    paymentDone || current.totalDue === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {paymentDone || current.totalDue === 0 ? 'Fully Paid' : current.status}
                  </span>
                </div>

                <div className="text-xl font-extrabold text-gray-900">
                  {paymentDone || current.totalDue === 0 ? '₹0 Pending' : `₹${current.totalDue.toLocaleString('en-IN')}`}
                </div>

                <div className="text-[11px] text-gray-500 space-y-1 border-t border-gray-100 pt-2">
                  <div className="flex justify-between">
                    <span>Base Room Rent:</span>
                    <span className="font-bold text-gray-800">₹{current.monthlyRent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Electricity ({current.powerUnits} units):</span>
                    <span className="font-bold text-gray-800">₹{current.powerBill}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit in Trust:</span>
                    <span className="font-bold text-emerald-700">₹{current.depositPaid.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {!(paymentDone || current.totalDue === 0) ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab('rent')}
                    className="w-full py-2.5 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{current.totalDue.toLocaleString('en-IN')} Now</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNotify?.(`Rent receipt PDF downloaded!`)}
                    className="w-full py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Paid Receipt</span>
                  </button>
                )}
              </div>

              {/* Quick Wi-Fi & Gate Info */}
              <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                  <ShieldCheck className="w-4 h-4 text-[#5B21B6]" />
                  <span>Hostel Living Amenities</span>
                </div>
                <div className="text-[11px] text-gray-600 space-y-1">
                  <div>High-Speed Wi-Fi: <span className="font-bold text-gray-900">Hostel_Guest_5G</span></div>
                  <div>Gate Curfew: <span className="font-bold text-red-600">09:30 PM Nightly</span></div>
                  <div>Warden Desk: <span className="font-bold text-gray-900">+91 98480 11223</span></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rent' && (
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-4 text-center">
              <h4 className="font-extrabold text-sm text-gray-900">UPI Instant Rent Payment</h4>
              <p className="text-[11px] text-gray-500">Scan using PhonePe, Google Pay, or Paytm</p>

              {/* QR Simulation Box */}
              <div className="w-44 h-44 mx-auto bg-gray-50 rounded-2xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center p-3">
                <QrCode className="w-24 h-24 text-[#5B21B6]" />
                <span className="text-[10px] font-extrabold text-gray-700 mt-2">bestcrm.hostel@icici</span>
              </div>

              <div className="text-base font-extrabold text-gray-900">
                Amount: ₹{current.totalDue.toLocaleString('en-IN')}
              </div>

              <button
                type="button"
                onClick={handlePayRent}
                disabled={paymentDone || current.totalDue === 0}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  paymentDone || current.totalDue === 0 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{paymentDone || current.totalDue === 0 ? 'Payment Verified' : 'Simulate Successful UPI Payment'}</span>
              </button>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-3">
              {/* Active Tickets List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700">My Maintenance Tickets</span>
                {current.tickets.length > 0 ? (
                  current.tickets.map(t => (
                    <div key={t.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs text-xs space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-extrabold text-gray-900">{t.subject}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                          t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">Ref #{t.id} • {t.date}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-white rounded-xl border border-gray-200 text-center text-xs text-gray-400">
                    No open complaints recorded.
                  </div>
                )}
              </div>

              {/* Raise New Ticket Form */}
              <form onSubmit={handleCreateTicket} className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-2.5">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#5B21B6]" />
                  Raise Maintenance Request
                </span>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
                >
                  <option value="Plumbing / Bathroom">Plumbing / Bathroom</option>
                  <option value="Electrical / Fan / AC">Electrical / Fan / AC</option>
                  <option value="Carpentry / Bed / Almirah">Carpentry / Bed / Almirah</option>
                  <option value="Wi-Fi / Internet">Wi-Fi / Internet Connectivity</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Issue title (e.g. Tap leaking)"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#5B21B6] text-white rounded-xl text-xs font-bold hover:bg-[#4C1D95] transition cursor-pointer"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          )}

          {activeTab === 'mess' && (
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <Utensils className="w-4 h-4 text-[#5B21B6]" />
                <span>Today's Dining Schedule</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="font-extrabold text-[#5B21B6] text-[11px]">Breakfast (07:30 AM - 09:30 AM)</div>
                  <div className="text-gray-700 text-xs mt-0.5">Idli, Vada, Sambar, Coconut Chutney & Tea/Coffee</div>
                </div>
                <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="font-extrabold text-[#5B21B6] text-[11px]">Lunch (12:30 PM - 02:30 PM)</div>
                  <div className="text-gray-700 text-xs mt-0.5">Steamed Sona Masoori, Tomato Dal, Palak Paneer, Curd & Papad</div>
                </div>
                <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="font-extrabold text-[#5B21B6] text-[11px]">Dinner (07:30 PM - 09:30 PM)</div>
                  <div className="text-gray-700 text-xs mt-0.5">Phulka Roti, Aloo Gobi Masala, Dal Tadka & Rasam</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
