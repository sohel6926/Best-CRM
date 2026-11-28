import React, { useState } from 'react';
import { 
  Send, MessageSquare, Tag, Users, Sparkles, 
  Clock, CheckCircle2, AlertCircle, Plus, Calendar, Gift
} from 'lucide-react';

interface PickleCampaign {
  id: string;
  title: string;
  targetAudience: string;
  recipientCount: number;
  deliveryRate: string;
  dateSent: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  messageBody: string;
}

export const PickleMarketing: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'coupons'>('campaigns');
  const [showModal, setShowModal] = useState(false);

  const [campaigns, setCampaigns] = useState<PickleCampaign[]>([
    {
      id: 'CMP-PKL-01',
      title: 'New Season Nuzvid Avakaya Pre-Booking',
      targetAudience: 'All Past Jar Buyers (3,200 WhatsApp contacts)',
      recipientCount: 3200,
      deliveryRate: '94.2%',
      dateSent: '2026-11-26',
      status: 'Sent',
      messageBody: 'The legendary Nuzvid Cut Mango Avakaya Bharanis are now fermenting! Book your ceramic jar now & get 10% early-bird discount with free doorstep delivery.'
    },
    {
      id: 'CMP-PKL-02',
      title: 'Automated 30-Day Jar Reorder Alert',
      targetAudience: 'Customers whose jar is estimated 80% consumed',
      recipientCount: 185,
      deliveryRate: '96.5%',
      dateSent: 'Daily Automation',
      status: 'Sent',
      messageBody: 'Is your pickle jar running empty? Order freshly packed Natu Kodi or Tenali Gongura today and get next-day express delivery.'
    },
    {
      id: 'CMP-PKL-03',
      title: 'Diwali & New Year Assorted Gourmet Hamper',
      targetAudience: 'Corporate HR & Bulk Gifting Clients',
      recipientCount: 450,
      deliveryRate: '—',
      dateSent: '2026-12-08',
      status: 'Scheduled',
      messageBody: 'Luxury Wooden Gift Casket containing 4 miniature ceramic bharanis (Avakaya, Gongura, Chicken, Prawn) with pure brass spoons. Custom corporate branding available.'
    }
  ]);

  const coupons = [
    { code: 'AVAKAYA10', discount: '10% OFF', category: 'Seasonal Pre-booking', usedCount: 512, expires: '31 Dec 2026' },
    { code: 'KODIPICKLE', discount: 'Flat ₹75 OFF', category: 'Non-Veg 500g Jar', usedCount: 340, expires: '15 Jan 2027' },
    { code: 'BHARANI50', discount: 'Flat ₹50 OFF', category: 'First Bharani Purchase', usedCount: 780, expires: 'Ongoing' }
  ];

  const [newTitle, setNewTitle] = useState('');
  const [newMsg, setNewMsg] = useState('');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMsg) return;
    const newCamp: PickleCampaign = {
      id: `CMP-PKL-${Date.now()}`,
      title: newTitle,
      targetAudience: 'Pickle Club Retailers (2,100 Members)',
      recipientCount: 2100,
      deliveryRate: 'Queued',
      dateSent: 'Instant Broadcast',
      status: 'Sent',
      messageBody: newMsg
    };
    setCampaigns([newCamp, ...campaigns]);
    setShowModal(false);
    setNewTitle('');
    setNewMsg('');
    onNotify?.(`WhatsApp pickle campaign "${newTitle}" dispatched to 2,100 customers!`);
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Send className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">WhatsApp Broadcast & Festival Pre-Orders</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Broadcast seasonal Avakaya harvest bookings, 30-day consumption alerts, and gift hamper drops.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('campaigns')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'campaigns' ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Campaigns ({campaigns.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'coupons' ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Festival Coupons ({coupons.length})
          </button>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs ml-1"
          >
            <Plus className="w-4 h-4" />
            <span>New Broadcast</span>
          </button>
        </div>
      </div>

      {activeTab === 'campaigns' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    c.status === 'Sent' ? 'bg-emerald-100 text-emerald-800' :
                    c.status === 'Scheduled' ? 'bg-purple-100 text-[#5B21B6]' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {c.status}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{c.dateSent}</span>
                </div>
                <h3 className="font-extrabold text-sm text-gray-900">{c.title}</h3>
                <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                  "{c.messageBody}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                <span>Recipients: <span className="text-gray-900 font-bold">{c.recipientCount}</span></span>
                <span>Delivery: <span className="text-emerald-700 font-bold">{c.deliveryRate}</span></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Coupons Grid */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {coupons.map((cp, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-dashed border-purple-300 shadow-2xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm font-extrabold text-[#5B21B6] bg-purple-50 px-2.5 py-1 rounded-lg">
                  {cp.code}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {cp.discount}
                </span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Applicable: <span className="font-bold text-gray-900">{cp.category}</span></div>
                <div>Claimed: <span className="font-bold text-gray-900">{cp.usedCount} times</span></div>
                <div>Expiry: <span className="font-bold text-gray-900">{cp.expires}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: New Broadcast */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Broadcast Seasonal Offer</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Campaign Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Mango Avakaya Season Open"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Include offer, preorder link, or coupon..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#25D366] text-white text-xs font-bold rounded-xl hover:bg-[#20ba59] cursor-pointer"
                >
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
