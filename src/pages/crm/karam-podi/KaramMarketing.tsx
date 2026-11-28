import React, { useState } from 'react';
import { 
  Send, MessageSquare, Tag, Users, Sparkles, 
  Clock, CheckCircle2, AlertCircle, Plus, Calendar, Gift
} from 'lucide-react';

interface CampaignItem {
  id: string;
  name: string;
  audience: string;
  reachCount: number;
  openRate: string;
  dateSent: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  messagePreview: string;
}

export const KaramMarketing: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState<'broadcasts' | 'coupons'>('broadcasts');
  const [showModal, setShowModal] = useState(false);

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: 'CMP-01',
      name: 'Weekend Gunpowder Feast Offer',
      audience: 'All Repeat Retail Buyers (2,450 Numbers)',
      reachCount: 2450,
      openRate: '88.4%',
      dateSent: '2026-11-27',
      status: 'Sent',
      messagePreview: 'Hot Idli with pure Ghee & Nalla Karam Podi! Get Flat 15% OFF on our 500g family pack this weekend. Use code GUNTUR15.'
    },
    {
      id: 'CMP-02',
      name: 'Automated 21-Day Pouch Reorder Alert',
      audience: 'Customers who bought 21 days ago',
      reachCount: 140,
      openRate: '92.1%',
      dateSent: 'Daily Trigger (11:00 AM)',
      status: 'Sent',
      messagePreview: 'Running low on your favorite Karivepaku Podi? Tap here to 1-click reorder and get freshly ground batch delivered in 24 hours.'
    },
    {
      id: 'CMP-03',
      name: 'Upcoming Sankranti Assorted Hamper Pre-orders',
      audience: 'Corporate & NRI Gifting Circle',
      reachCount: 820,
      openRate: '—',
      dateSent: '2026-12-05',
      status: 'Scheduled',
      messagePreview: 'Festive authentic Andhra Spice Gift Box with 6 artisanal podis in handcrafted brass spoons & jars. Limited 500 sets only.'
    }
  ]);

  const coupons = [
    { code: 'GUNTUR15', discount: '15% OFF', minOrder: '₹500', usedCount: 382, expiry: '31 Dec 2026' },
    { code: 'FIRSTPODI', discount: 'Flat ₹50 OFF', minOrder: '₹299', usedCount: 890, expiry: 'Ongoing' },
    { code: 'HOTELBULK', discount: '20% OFF Bulk 5kg', minOrder: '₹2500', usedCount: 45, expiry: '31 Jan 2027' }
  ];

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newBody) return;
    const newCamp: CampaignItem = {
      id: `CMP-${Date.now()}`,
      name: newTitle,
      audience: 'Active Retail Subscribers (1,850 Users)',
      reachCount: 1850,
      openRate: 'Pending',
      dateSent: 'Instant Broadcast',
      status: 'Sent',
      messagePreview: newBody
    };
    setCampaigns([newCamp, ...campaigns]);
    setShowModal(false);
    setNewTitle('');
    setNewBody('');
    onNotify?.(`WhatsApp campaign "${newTitle}" dispatched to 1,850 customers!`);
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
            <h2 className="text-lg font-extrabold text-gray-900">WhatsApp Marketing & Automated Reorders</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Broadcast promotional spice drops, automated 21-day pouch reorder reminders, and coupon codes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('broadcasts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'broadcasts' ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Broadcasts ({campaigns.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('coupons')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'coupons' ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Promo Coupons ({coupons.length})
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

      {activeTab === 'broadcasts' ? (
        <div className="space-y-4">
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
                  <h3 className="font-extrabold text-sm text-gray-900">{c.name}</h3>
                  <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                    "{c.messagePreview}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                  <span>Reach: <span className="text-gray-900 font-bold">{c.reachCount}</span></span>
                  <span>Read Rate: <span className="text-emerald-700 font-bold">{c.openRate}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Coupons List */
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
                <div>Minimum Spend: <span className="font-bold text-gray-900">{cp.minOrder}</span></div>
                <div>Total Redemptions: <span className="font-bold text-gray-900">{cp.usedCount} orders</span></div>
                <div>Valid Till: <span className="font-bold text-gray-900">{cp.expiry}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: New Broadcast */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Create WhatsApp Customer Campaign</h3>
            <form onSubmit={handleCreateBroadcast} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Batch Hot Podi Alert"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Message Body</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type promotional text with offer link..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
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
                  Broadcast Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
