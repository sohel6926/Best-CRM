import React, { useState } from 'react';
import { 
  Bell, UserCheck, ShieldCheck, Search, Plus, Calendar, Clock, 
  Send, Phone, MessageSquare, AlertCircle, FileText, CheckCircle2 
} from 'lucide-react';

interface NoticeItem {
  id: string;
  title: string;
  category: 'General' | 'Maintenance' | 'Emergency' | 'Event';
  date: string;
  targetAudience: 'All Residents' | 'Girls Wing' | 'Boys Wing' | 'Block A';
  priority: 'High' | 'Normal' | 'Urgent';
  body: string;
  pinned: boolean;
}

interface VisitorItem {
  id: string;
  visitorName: string;
  phone: string;
  residentName: string;
  roomBed: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'In Campus' | 'Checked Out';
}

export const HostelNotices: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState<'notices' | 'visitors'>('notices');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Notices State
  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: 'not-1',
      title: 'Monthly Solar Water Heater Scheduled Maintenance',
      category: 'Maintenance',
      date: '2026-11-28',
      targetAudience: 'All Residents',
      priority: 'Normal',
      body: 'Solar water lines will undergo descaling on Saturday 06:00 AM - 09:00 AM. Geysers will remain active on backup power.',
      pinned: true
    },
    {
      id: 'not-2',
      title: 'Strict Curfew & Biometric Attendance Reminder',
      category: 'Emergency',
      date: '2026-11-25',
      targetAudience: 'All Residents',
      priority: 'High',
      body: 'Main gates close promptly at 09:30 PM. Late entries require prior warden approval and parent notification.',
      pinned: true
    },
    {
      id: 'not-3',
      title: 'Sunday Special Feast Menu Voting',
      category: 'Event',
      date: '2026-11-24',
      targetAudience: 'All Residents',
      priority: 'Normal',
      body: 'Cast your vote on the hostel app for this weekend’s special biryani selection before Friday night.',
      pinned: false
    }
  ]);

  // Visitor Register State
  const [visitors, setVisitors] = useState<VisitorItem[]>([
    {
      id: 'vis-1',
      visitorName: 'Suresh Verma',
      phone: '+91 98480 22334',
      residentName: 'Rohan Sharma',
      roomBed: 'Room 101 - Bed A',
      purpose: 'Parent visiting with study materials',
      checkInTime: '11:15 AM',
      status: 'In Campus'
    },
    {
      id: 'vis-2',
      visitorName: 'K. Anitha',
      phone: '+91 97001 88992',
      residentName: 'Sneha Patel',
      roomBed: 'Room 202 - Bed A',
      purpose: 'Family guardian visit',
      checkInTime: '10:00 AM',
      checkOutTime: '12:30 PM',
      status: 'Checked Out'
    },
    {
      id: 'vis-3',
      visitorName: 'Amazon Logistics (Raju)',
      phone: '+91 99887 66554',
      residentName: 'Aditya Rao',
      roomBed: 'Room 304 - Bed B',
      purpose: 'Parcel delivery to lobby counter',
      checkInTime: '01:45 PM',
      checkOutTime: '02:00 PM',
      status: 'Checked Out'
    }
  ]);

  // Quick New Notice Modal State
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'General' | 'Maintenance' | 'Emergency' | 'Event'>('General');
  const [newNoticeBody, setNewNoticeBody] = useState('');

  // Quick New Visitor State
  const [showVisitorModal, setShowVisitorModal] = useState(false);
  const [newVisName, setNewVisName] = useState('');
  const [newVisPhone, setNewVisPhone] = useState('');
  const [newVisResident, setNewVisResident] = useState('');
  const [newVisRoom, setNewVisRoom] = useState('');
  const [newVisPurpose, setNewVisPurpose] = useState('');

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeBody) return;
    const newNotice: NoticeItem = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: new Date().toISOString().split('T')[0],
      targetAudience: 'All Residents',
      priority: 'Normal',
      body: newNoticeBody,
      pinned: false
    };
    setNotices([newNotice, ...notices]);
    setShowNoticeModal(false);
    setNewNoticeTitle('');
    setNewNoticeBody('');
    onNotify?.(`Notice "${newNoticeTitle}" broadcasted to residents!`);
  };

  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisName || !newVisResident) return;
    const newEntry: VisitorItem = {
      id: `vis-${Date.now()}`,
      visitorName: newVisName,
      phone: newVisPhone || '+91 98000 00000',
      residentName: newVisResident,
      roomBed: newVisRoom || 'Room 101',
      purpose: newVisPurpose || 'Personal Visit',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'In Campus'
    };
    setVisitors([newEntry, ...visitors]);
    setShowVisitorModal(false);
    setNewVisName('');
    setNewVisPhone('');
    setNewVisResident('');
    setNewVisRoom('');
    setNewVisPurpose('');
    onNotify?.(`Visitor entry logged for ${newVisName}!`);
  };

  const handleCheckOutVisitor = (id: string) => {
    setVisitors(visitors.map(v => v.id === id ? {
      ...v,
      status: 'Checked Out',
      checkOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : v));
    onNotify?.('Visitor checked out successfully');
  };

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Bell className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Notices & Visitor Register</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Broadcast digital circulars, manage entry/exit gate log & visitor verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('notices')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'notices' 
                ? 'bg-[#5B21B6] text-white shadow-xs' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Digital Notices ({notices.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('visitors')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'visitors' 
                ? 'bg-[#5B21B6] text-white shadow-xs' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Gate Visitor Log ({visitors.filter(v => v.status === 'In Campus').length} Active)
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'notices' ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices by title or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowNoticeModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Announcement</span>
            </button>
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices
              .filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.body.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(notice => (
                <div key={notice.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3 relative hover:border-purple-300 transition">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      notice.category === 'Emergency' ? 'bg-red-100 text-red-700' :
                      notice.category === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                      notice.category === 'Event' ? 'bg-purple-100 text-[#5B21B6]' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {notice.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-gray-900">{notice.title}</h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{notice.body}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-gray-500 font-semibold">
                      Target: <span className="text-gray-800">{notice.targetAudience}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onNotify?.(`Notice shared to WhatsApp resident broadcast group!`)}
                      className="text-[#5B21B6] hover:text-[#4C1D95] font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      WhatsApp Broadcast
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        /* Visitor Register */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search visitor name or resident..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowVisitorModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Log Visitor Entry</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-extrabold uppercase tracking-wider text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3">Visitor Name</th>
                    <th className="px-4 py-3">Resident & Room</th>
                    <th className="px-4 py-3">Purpose</th>
                    <th className="px-4 py-3">In / Out Time</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {visitors
                    .filter(v => v.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) || v.residentName.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(vis => (
                      <tr key={vis.id} className="hover:bg-gray-50/80 transition">
                        <td className="px-4 py-3">
                          <div className="font-extrabold text-gray-900">{vis.visitorName}</div>
                          <div className="text-[11px] text-gray-400">{vis.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-[#5B21B6]">{vis.residentName}</div>
                          <div className="text-[11px] text-gray-500">{vis.roomBed}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                          {vis.purpose}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-900 font-semibold">{vis.checkInTime}</div>
                          <div className="text-[11px] text-gray-400">{vis.checkOutTime ? `Out: ${vis.checkOutTime}` : 'Currently inside'}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            vis.status === 'In Campus' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {vis.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {vis.status === 'In Campus' ? (
                            <button
                              type="button"
                              onClick={() => handleCheckOutVisitor(vis.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold cursor-pointer transition"
                            >
                              Check Out
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-400 italic">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Notice */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Broadcast Resident Notice</h3>
            <form onSubmit={handleAddNotice} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Water Pipeline Repair"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newNoticeCategory}
                  onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                >
                  <option value="General">General</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Emergency">Emergency / Urgent</option>
                  <option value="Event">Event / Festival</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Notice Content</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Enter message details for residents..."
                  value={newNoticeBody}
                  onChange={(e) => setNewNoticeBody(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B21B6] text-white text-xs font-bold rounded-xl hover:bg-[#4C1D95] cursor-pointer"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Visitor */}
      {showVisitorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Log Campus Visitor</h3>
            <form onSubmit={handleAddVisitor} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Visitor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newVisName}
                  onChange={(e) => setNewVisName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98480 00000"
                  value={newVisPhone}
                  onChange={(e) => setNewVisPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Resident to Meet</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={newVisResident}
                    onChange={(e) => setNewVisResident(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Room / Bed</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 101"
                    value={newVisRoom}
                    onChange={(e) => setNewVisRoom(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Purpose of Visit</label>
                <input
                  type="text"
                  placeholder="e.g. Family visit"
                  value={newVisPurpose}
                  onChange={(e) => setNewVisPurpose(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVisitorModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B21B6] text-white text-xs font-bold rounded-xl hover:bg-[#4C1D95] cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
