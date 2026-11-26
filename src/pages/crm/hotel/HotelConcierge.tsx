import React, { useState } from 'react';
import { 
  Car, Star, Heart, Phone, MapPin, 
  Calendar, CheckCircle2, Clock, Plus, Share2, Sparkles
} from 'lucide-react';

interface ConciergeRequest {
  id: string;
  roomNumber: string;
  guestName: string;
  serviceType: 'Airport Pickup / Drop' | 'VIP Preference Profile' | 'City Sightseeing Tour' | 'Express Laundry / Dry Clean';
  details: string;
  scheduledTime: string;
  charge: number;
  status: 'Confirmed' | 'Completed' | 'In Progress';
}

export const HotelConcierge: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [requests, setRequests] = useState<ConciergeRequest[]>([
    {
      id: 'cc-1',
      roomNumber: 'Suite 101',
      guestName: 'Dr. Vikramaditya Varma',
      serviceType: 'VIP Preference Profile',
      details: 'High-floor room, extra firm orthopedic pillow, lactose-free milk with morning tea',
      scheduledTime: 'Continuous Stay',
      charge: 0,
      status: 'Confirmed'
    },
    {
      id: 'cc-2',
      roomNumber: 'Room 201',
      guestName: 'Michael Henderson',
      serviceType: 'Airport Pickup / Drop',
      details: 'Sedan (Toyota Innova) airport drop to Hyderabad RGI International Airport (Flight BA 276)',
      scheduledTime: '30 Nov, 06:30 AM',
      charge: 1800,
      status: 'Confirmed'
    },
    {
      id: 'cc-3',
      roomNumber: 'Room 203',
      guestName: 'Kishore Kumar',
      serviceType: 'Express Laundry / Dry Clean',
      details: '2 Formal Suits + 3 Shirts steam pressing before conference',
      scheduledTime: 'Today by 06:00 PM',
      charge: 650,
      status: 'In Progress'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Concierge Desk, VIP Preferences & Travel</h2>
            <p className="text-sm text-gray-500">Airport taxi pickups, customized VIP pillow/dietary preferences, city tour packages, and express laundry</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("New Travel Desk & Concierge Request logged")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          + Log Concierge Request
        </button>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map(req => (
          <div key={req.id} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-purple-300 transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-[#5B21B6] border border-purple-100">
                    {req.serviceType}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2">{req.guestName}</h3>
                  <div className="text-xs text-purple-700 font-bold">{req.roomNumber}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-purple-950">
                    {req.charge > 0 ? `₹${req.charge}` : 'Complimentary VIP'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-50 text-xs text-gray-700 leading-relaxed">
                "{req.details}"
              </div>

              <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>Scheduled: <strong>{req.scheduledTime}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-purple-50 flex items-center justify-between">
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                req.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {req.status}
              </span>

              <button 
                onClick={() => onNotify?.(`Driver dispatch & WhatsApp confirmed for ${req.guestName}`)}
                className="text-xs font-bold text-[#5B21B6] hover:underline"
              >
                Send Driver Slip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
