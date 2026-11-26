import React, { useState } from 'react';
import { 
  Smile, Frown, Star, MessageSquare, AlertCircle, 
  CheckCircle2, RefreshCw, ThumbsUp, Send, HeartHandshake
} from 'lucide-react';

interface FeedbackTicket {
  id: string;
  subscriber: string;
  company: string;
  rating: 1 | 2 | 3 | 4 | 5;
  dishReviewed: string;
  comment: string;
  timestamp: string;
  resolutionStatus: 'Resolved / Credit Given' | 'Investigating Kitchen' | 'Delighted (No Action)';
}

export const LunchFeedback: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [feedbacks, setFeedbacks] = useState<FeedbackTicket[]>([
    {
      id: 'FB-901',
      subscriber: 'Aditi Deshmukh',
      company: 'Qualcomm, Mindspace',
      rating: 5,
      dishReviewed: 'Paneer Butter Masala & Phulkas',
      comment: 'Paneer was super soft and rotis were still piping hot when delivered! Loved the mint chutney.',
      timestamp: 'Today 01:25 PM (via WhatsApp 1-Click)',
      resolutionStatus: 'Delighted (No Action)',
    },
    {
      id: 'FB-902',
      subscriber: 'Karthik Raman',
      company: 'Amazon HYD11, Fin-Dist',
      rating: 2,
      dishReviewed: 'Tomato Pappu & Appadam',
      comment: 'Salt was slightly on the higher side in dal today, and rider arrived at 12:45 PM instead of 12:20 PM.',
      timestamp: 'Today 01:40 PM',
      resolutionStatus: 'Resolved / Credit Given',
    },
    {
      id: 'FB-903',
      subscriber: 'Sneha Kapur',
      company: 'Deloitte, Knowledge City',
      rating: 5,
      dishReviewed: 'High-Protein Fitness Bowl',
      comment: 'Perfect portioning of grilled paneer and quinoa. Exactly what I need for my fitness macros!',
      timestamp: 'Today 01:10 PM',
      resolutionStatus: 'Delighted (No Action)',
    },
    {
      id: 'FB-904',
      subscriber: 'Harish Varma',
      company: 'Tech Mahindra, Madhapur',
      rating: 3,
      dishReviewed: 'Gongura Chicken Curry',
      comment: 'Taste was authentic Andhra style, but gravy container seal had a small leak inside the bag.',
      timestamp: 'Yesterday 02:00 PM',
      resolutionStatus: 'Resolved / Credit Given',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Quality Assurance & Retention</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Daily WhatsApp Ratings & Customer Desk</h2>
          <p className="text-xs text-[#64748B]">
            Automated post-lunch 1-click WhatsApp feedback, immediate quality alert desk, and churn prevention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Triggered WhatsApp 1-Click Rating request to all delivered subscribers!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Send 01:30 PM WhatsApp Rating Prompt</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Customer Satisfaction Score</span>
          <p className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-1">
            4.85 <Star className="h-5 w-5 fill-amber-400 text-amber-400 inline" />
          </p>
          <span className="text-[11px] text-gray-500">Based on 98 reviews this week</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Piping Hot On-Time Deliveries</span>
          <p className="text-2xl font-black text-[#5B21B6] mt-1">98.2%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Under 12:30 PM delivery guarantee</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Monthly Churn Rate</span>
          <p className="text-2xl font-black text-[#1E1B4B] mt-1">2.4%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Industry leading retention</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase">Quality Escalations Today</span>
          <p className="text-2xl font-black text-amber-600 mt-1">1 Resolved</p>
          <span className="text-[11px] text-gray-500">Instant credit issued to subscriber</span>
        </div>
      </div>

      {/* Feedbacks Stream */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E1B4B]">Today's Meal Review Feed</h3>
          <span className="text-xs text-gray-500">Verified subscribers only</span>
        </div>

        <div className="space-y-3">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="p-4 rounded-xl border border-gray-100 hover:border-purple-200 bg-slate-50/60 transition space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${i < fb.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-extrabold text-xs text-[#1E1B4B]">{fb.subscriber}</span>
                  <span className="text-xs text-gray-500">({fb.company})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">{fb.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    fb.resolutionStatus.includes('Delighted') ? 'bg-emerald-100 text-emerald-800' :
                    fb.resolutionStatus.includes('Resolved') ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {fb.resolutionStatus}
                  </span>
                </div>
              </div>

              <div className="text-xs">
                <span className="font-bold text-[#5B21B6]">{fb.dishReviewed}: </span>
                <span className="text-gray-700 font-medium">"{fb.comment}"</span>
              </div>

              {fb.rating <= 3 && (
                <div className="pt-2 flex items-center justify-between border-t border-gray-200/60 text-xs">
                  <span className="text-amber-800 font-medium flex items-center gap-1">
                    <HeartHandshake className="h-3.5 w-3.5 text-amber-600" />
                    Apology message & ₹120 Free Meal credit issued to wallet.
                  </span>
                  <button
                    type="button"
                    onClick={() => onNotify?.(`Called ${fb.subscriber} for chef feedback alignment!`)}
                    className="font-bold text-[#5B21B6] hover:underline"
                  >
                    Retention Call Desk →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
