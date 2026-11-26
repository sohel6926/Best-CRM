import React, { useState } from 'react';
import { 
  Truck, Printer, Share2, Search, CheckCircle2, 
  MapPin, Clock, AlertTriangle, ShieldCheck
} from 'lucide-react';

interface PickleShipment {
  id: string;
  awbNumber: string;
  courierPartner: 'Delhivery Fragile Glass Surface' | 'Shiprocket Air Express' | 'BlueDart Fragile' | 'India Post Registered Parcel';
  customerName: string;
  destinationCity: string;
  jarsCount: number;
  parcelWeightKg: number;
  glassBreakageInsurance: boolean;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Fragile Inspected';
  dispatchDate: string;
}

export const PickleShipping: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [shipments, setShipments] = useState<PickleShipment[]>([
    {
      id: 'shp-1',
      awbNumber: 'DEL-FRG-99210',
      courierPartner: 'Delhivery Fragile Glass Surface',
      customerName: 'Anil Kumar Varma',
      destinationCity: 'Bengaluru, Karnataka',
      jarsCount: 3,
      parcelWeightKg: 2.1,
      glassBreakageInsurance: true,
      status: 'In Transit',
      dispatchDate: 'Today 11:15 AM'
    },
    {
      id: 'shp-2',
      awbNumber: 'SR-AIR-88120',
      courierPartner: 'Shiprocket Air Express',
      customerName: 'Pooja Iyer',
      destinationCity: 'Mumbai, Maharashtra',
      jarsCount: 2,
      parcelWeightKg: 1.4,
      glassBreakageInsurance: true,
      status: 'In Transit',
      dispatchDate: 'Today 09:30 AM'
    },
    {
      id: 'shp-3',
      awbNumber: 'BD-FRG-44102',
      courierPartner: 'BlueDart Fragile',
      customerName: 'Dr. Mohan Rao',
      destinationCity: 'New Delhi (Vasant Kunj)',
      jarsCount: 4,
      parcelWeightKg: 3.2,
      glassBreakageInsurance: true,
      status: 'Out for Delivery',
      dispatchDate: 'Yesterday'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filtered = shipments.filter(s => 
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.awbNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destinationCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Fragile Glass Courier Logistics & AWB Tracking</h2>
            <p className="text-sm text-gray-500">Bubble-wrapped glass jar dispatch, courier damage insurance cover, and automated customer WhatsApp live tracking</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Batch Fragile Glass Shipping Labels Printed on 4x6 Thermal Paper")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Fragile AWB Labels
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Jars Shipped Today</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">42 Jars</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Double-corrugated packaging</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Transit Breakage Rate</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">0.12%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Industry standard &lt; 1.5%</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Glass Insurance Covered</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">100% Parcels</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Zero customer refund loss</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Avg Delivery Turnaround</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">2.4 Days</div>
          <div className="text-[11px] text-[#5B21B6] mt-0.5">Express surface logistics</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Live Glass Parcel Manifest ({shipments.length})
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search by AWB or customer..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-purple-200 rounded-xl text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-600 w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/70 text-purple-900 font-semibold border-b border-purple-100">
              <tr>
                <th className="py-3 px-4">AWB & Tracking</th>
                <th className="py-3 px-4">Courier Partner</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4 text-center">Jars Shipped</th>
                <th className="py-3 px-4 text-center">Insurance Protection</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    <div>{s.awbNumber}</div>
                    <div className="text-[10px] text-gray-400 font-sans">{s.dispatchDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                      {s.courierPartner}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{s.customerName}</div>
                    <div className="text-[10px] text-gray-400">{s.destinationCity}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-900">{s.jarsCount} jars ({s.parcelWeightKg} kg)</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Insured
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      s.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      s.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onNotify?.(`WhatsApp live glass tracking sent to ${s.customerName}!`)}
                      className="p-1.5 text-gray-400 hover:text-[#5B21B6] rounded-lg"
                      title="Send WhatsApp Tracking"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
