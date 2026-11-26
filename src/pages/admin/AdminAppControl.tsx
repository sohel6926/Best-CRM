import { useState } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Globe,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function AdminAppControl() {
  const { announcement, setAnnouncement, logAuditAction } = useAdmin();
  const [msg, setMsg] = useState(announcement.message);
  const [badge, setBadge] = useState(announcement.badge);
  const [linkText, setLinkText] = useState(announcement.linkText);
  const [linkUrl, setLinkUrl] = useState(announcement.linkUrl);
  const [savedBanner, setSavedBanner] = useState(false);

  // Campaign simulator
  const [campaignChannel, setCampaignChannel] = useState<'push' | 'whatsapp' | 'email'>('whatsapp');
  const [campaignTitle, setCampaignTitle] = useState('Exclusive CRM Feature Update');
  const [campaignBody, setCampaignBody] = useState('New GST automatic e-invoice dispatch is now live in your bestCRM workspace! Log in to view.');
  const [targetAudience, setTargetAudience] = useState<'all' | 'active' | 'catering' | 'hostels'>('all');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncement({
      enabled: announcement.enabled,
      badge,
      message: msg,
      linkText,
      linkUrl,
      theme: 'purple',
    });
    logAuditAction(`Updated website announcement banner: "${msg}"`);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    logAuditAction(`Dispatched ${campaignChannel.toUpperCase()} campaign to ${targetAudience} audience: "${campaignTitle}"`);
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Apps & Website Real-Time Content Control</h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Update public marketing banners, mobile app announcement ribbons, and broadcast push/WhatsApp/SMS campaigns.
        </p>
      </div>

      {/* Website Announcement Ribbon Editor */}
      <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#F3EEFF] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">Top Promotional Announcement Ribbon</h2>
            <p className="text-xs text-[#64748B]">Syncs across bestcrm.in and Android/iOS mobile application headers</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAnnouncement((prev) => ({ ...prev, enabled: !prev.enabled }));
              logAuditAction(`${!announcement.enabled ? 'Enabled' : 'Disabled'} website announcement banner`);
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              announcement.enabled
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {announcement.enabled ? '● Active Live' : '○ Disabled'}
          </button>
        </div>

        {/* Live Preview of the Banner */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Live Visual Preview:</span>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#7C3AED] px-4 py-2.5 text-xs text-white shadow-xs">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold">
              {badge || '🔥 Special'}
            </span>
            <span className="font-medium">{msg}</span>
            <span className="font-bold underline cursor-pointer">{linkText} →</span>
          </div>
        </div>

        {savedBanner && (
          <p className="text-xs font-bold text-green-600 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Banner saved and updated across all sessions!
          </p>
        )}

        {/* Form controls */}
        <form onSubmit={handleSaveBanner} className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
          <div>
            <label className="font-semibold text-gray-700">Badge Label</label>
            <input
              type="text"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs text-[#1E1B4B]"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Call to Action Link Text</label>
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs text-[#1E1B4B]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-semibold text-gray-700">Main Banner Message</label>
            <input
              type="text"
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="rounded-xl bg-[#5B21B6] px-5 py-2 text-xs font-bold text-white hover:bg-[#4C1D95] cursor-pointer"
            >
              Publish Banner
            </button>
          </div>
        </form>
      </div>

      {/* Campaign Broadcast Simulator */}
      <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#1E1B4B]">Push Notification, WhatsApp & SMS Campaign Broadcast</h2>
          <p className="text-xs text-[#64748B]">Simulate sending mass product updates and offer blasts to CRM users</p>
        </div>

        {broadcastSent && (
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Broadcast simulated successfully! Messages delivered to 180 subscribed devices.
          </div>
        )}

        <form onSubmit={handleSendBroadcast} className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
          <div>
            <label className="font-semibold text-gray-700">Communication Channel</label>
            <div className="mt-1 flex rounded-xl bg-[#F3EEFF] p-1">
              {(['whatsapp', 'push', 'email'] as const).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setCampaignChannel(ch)}
                  className={`flex-1 py-1.5 rounded-lg font-bold capitalize transition cursor-pointer ${
                    campaignChannel === ch ? 'bg-[#5B21B6] text-white shadow-xs' : 'text-[#5B21B6]'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Target Recipient Segment</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value as any)}
              className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs text-[#1E1B4B]"
            >
              <option value="all">All Registered Users (180 Businesses)</option>
              <option value="active">Active Paying Clients Only (142)</option>
              <option value="catering">Catering & Food Businesses</option>
              <option value="hostels">Hostels & Hotels</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Subject / Notification Headline</label>
            <input
              type="text"
              required
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2 text-xs text-[#1E1B4B]"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="font-semibold text-gray-700">Message Body Content</label>
            <textarea
              rows={3}
              required
              value={campaignBody}
              onChange={(e) => setCampaignBody(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#EDE9FE] bg-[#FAF8FF] p-2.5 text-xs text-[#1E1B4B]"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#5B21B6] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#4C1D95] cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
