import React, { useState } from 'react';
import { 
  Truck, Navigation, Phone, CheckCircle2, 
  Clock, Shield, Plus, Fuel, AlertCircle 
} from 'lucide-react';

interface VehicleItem {
  id: string;
  vehicleNumber: string;
  model: string;
  driverName: string;
  driverPhone: string;
  assignedEvent: string;
  departureTime: string;
  status: 'Loading at Kitchen' | 'In Transit to Venue' | 'At Function Venue' | 'Returned to Depot';
  dieselFilledLiters: number;
}

export const CateringVehicles: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [vehicles] = useState<VehicleItem[]>([
    {
      id: 'VEH-01',
      vehicleNumber: 'TS 09 UA 4421',
      model: 'Tata Ace Gold (Closed Container Van)',
      driverName: 'Raju Yadav',
      driverPhone: '+91 98854 77119',
      assignedEvent: 'Srikanth Wedding (N Convention, Madhapur)',
      departureTime: '10:30 AM',
      status: 'In Transit to Venue',
      dieselFilledLiters: 18,
    },
    {
      id: 'VEH-02',
      vehicleNumber: 'TS 08 EB 9912',
      model: 'Mahindra Bolero Maxi Truck (Insulated Body)',
      driverName: 'K. Shiva Kumar',
      driverPhone: '+91 97003 66331',
      assignedEvent: 'Dr. Rahul Sangeet (Fort Grand, Shamshabad)',
      departureTime: '11:15 AM',
      status: 'Loading at Kitchen',
      dieselFilledLiters: 25,
    },
    {
      id: 'VEH-03',
      vehicleNumber: 'TS 09 UB 1044',
      model: 'Tata 407 Heavy Deg Hauler',
      driverName: 'Naresh Goud',
      driverPhone: '+91 98492 55110',
      assignedEvent: 'Tech Mahindra Summit (Hitex Exhibition)',
      departureTime: '01:00 PM',
      status: 'Loading at Kitchen',
      dieselFilledLiters: 30,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">Event Logistics & Fleet</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Vehicles, Loading Transit & Fleet Dispatch</h2>
          <p className="text-xs text-[#64748B]">
            Manage Tata Ace container vans, heavy deg haulers, drivers, venue delivery permits & diesel consumption.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNotify?.('Dispatched venue loading pass to all drivers via WhatsApp!')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5B21B6] hover:bg-[#4C1D95] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Dispatch Gate-Pass to Drivers</span>
          </button>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5B21B6] bg-purple-50 px-2 py-0.5 rounded-md">
                  {v.id}
                </span>
                <h3 className="font-extrabold text-sm text-[#1E1B4B] mt-1">{v.vehicleNumber}</h3>
                <p className="text-xs text-gray-500">{v.model}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                v.status === 'In Transit to Venue' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {v.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
              <div>
                <span className="text-gray-500">Destination Venue:</span>
                <p className="font-bold text-[#1E1B4B]">{v.assignedEvent}</p>
              </div>
              <div className="flex justify-between pt-1 border-t border-gray-200/60">
                <span className="text-gray-500">Driver:</span>
                <span className="font-bold text-gray-800">{v.driverName} ({v.driverPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Departure:</span>
                <span className="font-semibold text-purple-700">{v.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Diesel Logged:</span>
                <span className="font-bold text-emerald-700">{v.dieselFilledLiters} Liters</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNotify?.(`Initiated phone call to ${v.driverName} (${v.driverPhone})`)}
                className="flex-1 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5 text-[#5B21B6]" />
                <span>Call Driver</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
