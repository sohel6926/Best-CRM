import React, { useState } from 'react';
import { 
  Sparkles, Calendar, CheckCircle2, Star, Clock, 
  UserCheck, ThumbsUp, MessageSquare, Plus, FileCheck
} from 'lucide-react';

interface TastingSession {
  id: string;
  clientName: string;
  phone: string;
  eventType: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed & Approved' | 'Revision Requested';
  guestCount: number;
  dishesToTaste: string[];
  feedbackNotes: string;
  spicePreference: 'Mild / Jain' | 'Medium / Balanced' | 'Spicy / Desi';
  contractSigned: boolean;
}

export const CateringTasting: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [sessions, setSessions] = useState<TastingSession[]>([
    {
      id: 't-1',
      clientName: 'Sunil Verma & Family',
      phone: '+91 98234 11209',
      eventType: 'Daughter Wedding (600 guests)',
      date: 'Nov 28, 2026',
      time: '02:00 PM',
      status: 'Completed & Approved',
      guestCount: 4,
      dishesToTaste: ['Dal Makhani', 'Paneer Tikka Angara', 'Subz Dum Handi Biryani', 'Kesari Rasmalai'],
      feedbackNotes: 'Loved the Dal Makhani rich texture. Requested slightly less cardamom in Rasmalai. Approved final menu on spot.',
      spicePreference: 'Medium / Balanced',
      contractSigned: true
    },
    {
      id: 't-2',
      clientName: 'Vikramaditya Oberoi',
      phone: '+91 99100 87342',
      eventType: 'Silver Jubilee Gala (350 guests)',
      date: 'Dec 02, 2026',
      time: '07:30 PM',
      status: 'Scheduled',
      guestCount: 6,
      dishesToTaste: ['Mutton Dum Biryani', 'Chicken Malai Tikka', 'Tawa Ice Cream Rolls', 'Live Chaat'],
      feedbackNotes: 'Client family visiting from UK. Prefers authentic Lucknowi aroma.',
      spicePreference: 'Mild / Jain',
      contractSigned: false
    },
    {
      id: 't-3',
      clientName: 'Dr. Anjali Deshmukh',
      phone: '+91 97654 32100',
      eventType: 'Medical Conference Dinner (250 guests)',
      date: 'Dec 04, 2026',
      time: '01:00 PM',
      status: 'Revision Requested',
      guestCount: 3,
      dishesToTaste: ['Hara Bhara Kebab', 'Paneer Butter Masala', 'Gulab Jamun with Rabdi'],
      feedbackNotes: 'Paneer gravy had too much butter; requested lighter homestyle gravy recipe for doctors summit.',
      spicePreference: 'Medium / Balanced',
      contractSigned: false
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'All' | 'Scheduled' | 'Completed & Approved'>('All');

  const filteredSessions = activeFilter === 'All' 
    ? sessions 
    : sessions.filter(s => s.status === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Food Tasting & Client Menu Sign-Off</h2>
            <p className="text-sm text-gray-500">Record live tasting sessions, capture specific spice preferences, and secure client sign-off</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Tasting session booking sheet opened")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Book Food Tasting
        </button>
      </div>

      {/* Tasting Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map(session => (
          <div key={session.id} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-purple-300 transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                    session.status === 'Completed & Approved' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : session.status === 'Scheduled' 
                      ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {session.status}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2">{session.clientName}</h3>
                  <p className="text-xs text-gray-500">{session.eventType}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-purple-900">{session.date}</div>
                  <div className="text-[11px] text-gray-400">{session.time}</div>
                </div>
              </div>

              {/* Sample Dishes */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Dishes Sampled</div>
                <div className="flex flex-wrap gap-1.5">
                  {session.dishesToTaste.map((dish, i) => (
                    <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded text-[11px] font-medium border border-purple-100">
                      {dish}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tasting Notes */}
              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-purple-900">
                  <span>Spice Level: {session.spicePreference}</span>
                  <span>{session.guestCount} Family Members</span>
                </div>
                <p className="text-xs text-gray-600 italic">"{session.feedbackNotes}"</p>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-50 flex items-center justify-between">
              {session.contractSigned ? (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Menu Signed Off & Locked
                </span>
              ) : (
                <button 
                  onClick={() => onNotify?.(`Menu signed off for ${session.clientName}`)}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold shadow-sm"
                >
                  Confirm Menu Sign-Off
                </button>
              )}

              <button 
                onClick={() => onNotify?.(`WhatsApp tasting summary sent to ${session.clientName}`)}
                className="p-1.5 text-gray-400 hover:text-purple-700 rounded-lg"
                title="Send WhatsApp Summary"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
