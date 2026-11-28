import React, { useState } from 'react';
import { 
  Star, MessageSquare, TrendingUp, BarChart3, Globe, 
  CheckCircle2, AlertTriangle, Reply, Send, Download
} from 'lucide-react';

interface ReviewItem {
  id: string;
  guestName: string;
  rating: number;
  date: string;
  source: 'Google' | 'TripAdvisor' | 'MakeMyTrip' | 'In-Room QR';
  roomStayed: string;
  comment: string;
  responseStatus: 'Replied' | 'Pending Response';
  replyText?: string;
}

export const HotelReviewsReports: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'kpis'>('reviews');
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'REV-01',
      guestName: 'Dr. Siddharth Sen',
      rating: 5,
      date: '2026-11-27',
      source: 'Google',
      roomStayed: 'Executive Suite 402',
      comment: 'Exceptional hospitality! The breakfast spread at the restaurant was superb, and the airport shuttle was right on time.',
      responseStatus: 'Replied',
      replyText: 'Thank you Dr. Sen! It was a true pleasure hosting you. Looking forward to welcoming you back soon.'
    },
    {
      id: 'REV-02',
      guestName: 'Kavitha Nambiar',
      rating: 4,
      date: '2026-11-25',
      source: 'MakeMyTrip',
      roomStayed: 'Deluxe King 305',
      comment: 'Very clean linen and fast Wi-Fi. Check-in was smooth. Would recommend adding more South Indian filter coffee options at dining.',
      responseStatus: 'Pending Response'
    },
    {
      id: 'REV-03',
      guestName: 'Arunav Roy',
      rating: 2,
      date: '2026-11-22',
      source: 'In-Room QR',
      roomStayed: 'Standard Queen 204',
      comment: 'AC took almost 30 minutes to cool down the room in the afternoon. Housekeeping attended promptly, but maintenance should inspect it.',
      responseStatus: 'Replied',
      replyText: 'Dear Mr. Roy, apologies for the inconvenience. Our engineering team has serviced the unit condenser today. We hope to serve you better next time.'
    }
  ]);

  const handleSendReply = (id: string) => {
    const text = replyInput[id];
    if (!text) return;
    setReviews(reviews.map(r => r.id === id ? {
      ...r,
      responseStatus: 'Replied',
      replyText: text
    } : r));
    setReplyInput({ ...replyInput, [id]: '' });
    onNotify?.(`Official hotel response published to ${reviews.find(r => r.id === id)?.source}!`);
  };

  return (
    <div className="space-y-6">
      {/* Module Title Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-[#5B21B6]">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </span>
            <h2 className="text-lg font-extrabold text-gray-900">Guest Reviews & Revenue Metrics</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Monitor OTA guest sentiments, draft official responses, and analyze ADR & RevPAR profitability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'reviews' ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Guest Reviews (4.8 ★)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kpis')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'kpis' ? 'bg-[#5B21B6] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ADR & RevPAR Analytics
          </button>
        </div>
      </div>

      {activeTab === 'reviews' ? (
        <div className="space-y-4">
          {/* Reviews Scorecard */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-extrabold text-gray-900">4.7</div>
              <div>
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Based on 148 verified guest stays</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
              <div className="text-center px-3 py-1 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[#5B21B6]">Google:</span> 4.8 ★
              </div>
              <div className="text-center px-3 py-1 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[#5B21B6]">TripAdvisor:</span> 4.6 ★
              </div>
              <div className="text-center px-3 py-1 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[#5B21B6]">MakeMyTrip:</span> 4.7 ★
              </div>
            </div>
          </div>

          {/* Reviews Stream */}
          <div className="space-y-3">
            {reviews.map(r => (
              <div key={r.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-gray-900">{r.guestName}</span>
                      <span className="text-[11px] text-gray-400 font-semibold">• {r.roomStayed}</span>
                      <span className="text-[10px] bg-purple-50 text-[#5B21B6] font-bold px-2 py-0.5 rounded-full">
                        {r.source}
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 mt-1">
                      {[...Array(r.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">{r.date}</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  "{r.comment}"
                </p>

                {r.replyText ? (
                  <div className="ml-4 pl-3 border-l-2 border-[#5B21B6] space-y-1">
                    <span className="text-[11px] font-extrabold text-[#5B21B6] flex items-center gap-1">
                      <Reply className="w-3 h-3" />
                      Hotel Management Response:
                    </span>
                    <p className="text-xs text-gray-600">{r.replyText}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Write an official response to this guest..."
                      value={replyInput[r.id] || ''}
                      onChange={(e) => setReplyInput({ ...replyInput, [r.id]: e.target.value })}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#5B21B6]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSendReply(r.id)}
                      className="px-3 py-1.5 bg-[#5B21B6] text-white rounded-xl text-xs font-bold hover:bg-[#4C1D95] transition cursor-pointer flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Hospitality Financial KPIs: ADR, RevPAR, Occupancy */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-gray-500">Average Daily Rate (ADR)</span>
              <div className="text-2xl font-extrabold text-gray-900">₹4,076</div>
              <p className="text-[11px] text-emerald-700 font-bold">+8.4% vs last weekend</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-gray-500">Revenue Per Available Room (RevPAR)</span>
              <div className="text-2xl font-extrabold text-gray-900">₹3,465</div>
              <p className="text-[11px] text-emerald-700 font-bold">85% Occupancy Multiplier</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-gray-500">Tonight's Room Revenue</span>
              <div className="text-2xl font-extrabold text-[#5B21B6]">₹1,38,584</div>
              <p className="text-[11px] text-gray-500 font-medium">34 of 40 Rooms Booked</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">Channel Revenue Contribution</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span>Direct Website & Phone (Zero Commission)</span>
                <span className="text-[#5B21B6]">₹82,400 (59%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#5B21B6] h-full" style={{ width: '59%' }} />
              </div>

              <div className="flex justify-between font-bold pt-2">
                <span>MakeMyTrip & Goibibo (18% Commission)</span>
                <span className="text-gray-700">₹36,200 (26%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: '26%' }} />
              </div>

              <div className="flex justify-between font-bold pt-2">
                <span>Booking.com & Corporate Tie-ups</span>
                <span className="text-gray-700">₹19,984 (15%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full" style={{ width: '15%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
