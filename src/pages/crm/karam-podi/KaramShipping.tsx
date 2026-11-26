import React, { useState } from 'react';
import { 
  Truck, Printer, Share2, Search, CheckCircle2, 
  MapPin, Clock, AlertTriangle, ExternalLink, QrCode
} from 'lucide-react';

interface Shipment {
  id: string;
  awbNumber: string;
  courierPartner: 'Delhivery Surface' | 'Shiprocket Air' | 'BlueDart Express' | 'India Post Speed Post';
  customerName: string;
  destinationCity: string;
  parcelWeightKg: number;
  shippingCharges: number;
  dispatchTime: string;
  deliveryEstimate: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Label Generated';
}

export const KaramShipping: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: 'shp-1',
      awbNumber: 'DEL-882109412',
      courierPartner: 'Delhivery Surface',
      customerName: 'Praveen Varma',
      destinationCity: 'Hyderabad, Telangana',
      parcelWeightKg: 0.85,
      shippingCharges: 65,
      dispatchTime: 'Today 11:30 AM',
      deliveryEstimate: 'Tomorrow by 04:00 PM',
      status: 'In Transit'
    },
    {
      id: 'shp-2',
      awbNumber: 'SR-771204918',
      courierPartner: 'Shiprocket Air',
      customerName: 'Deepa Narayanan',
      destinationCity: 'Bengaluru, Karnataka',
      parcelWeightKg: 1.2,
      shippingCharges: 110,
      dispatchTime: 'Today 09:00 AM',
      deliveryEstimate: 'Tomorrow by 01:00 PM',
      status: 'In Transit'
    },
    {
      id: 'shp-3',
      awbNumber: 'BD-334102911',
      courierPartner: 'BlueDart Express',
      customerName: 'Rajesh Singhania',
      destinationCity: 'Mumbai, Maharashtra',
      parcelWeightKg: 1.5,
      shippingCharges: 140,
      dispatchTime: 'Yesterday',
      deliveryEstimate: 'Today by 06:00 PM',
      status: 'Out for Delivery'
    },
    {
      id: 'shp-4',
      awbNumber: 'IP-990184210',
      courierPartner: 'India Post Speed Post',
      customerName: 'Dr. Subba Rao',
      destinationCity: 'Visakhapatnam, AP',
      parcelWeightKg: 0.6,
      shippingCharges: 50,
      dispatchTime: '24 Nov 2026',
      deliveryEstimate: 'Delivered',
      status: 'Delivered'
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
            <h2 className="text-xl font-bold text-gray-900">Courier Shipping, AWB Labels & WhatsApp Tracking</h2>
            <p className="text-sm text-gray-500">Instant shipping label generator (Delhivery, Shiprocket, BlueDart, India Post) with automated customer tracking links</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Batch AWB Shipping Labels Printed on 4x6 Thermal Paper")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Printer className="w-4 h-4" /> Print Thermal AWB Labels
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Parcels Dispatched Today</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">28 Parcels</div>
          <div className="text-[11px] text-purple-600 mt-0.5">Average dispatch time: 4.2 hrs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">In Transit Active Shipments</div>
          <div className="text-2xl font-bold text-blue-700 mt-1">
            {shipments.filter(s => s.status === 'In Transit' || s.status === 'Out for Delivery').length} Parcels
          </div>
          <div className="text-[11px] text-blue-600 mt-0.5">Live tracking enabled</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">On-Time Delivery Rate</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">98.6%</div>
          <div className="text-[11px] text-emerald-600 font-medium">Delhivery & Shiprocket Air</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Avg Domestic Shipping Cost</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹72 <span className="text-xs font-normal text-gray-500">/ 500g</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Surface commercial negotiated rate</div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Live Courier Dispatch Manifest ({shipments.length})
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search by AWB # or customer..."
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
                <th className="py-3 px-4">AWB & Tracking No</th>
                <th className="py-3 px-4">Courier Partner</th>
                <th className="py-3 px-4">Customer & Destination</th>
                <th className="py-3 px-4 text-center">Weight</th>
                <th className="py-3 px-4">Estimated Delivery</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    <div>{s.awbNumber}</div>
                    <div className="text-[10px] text-gray-400 font-sans">{s.dispatchTime}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-100">
                      {s.courierPartner}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{s.customerName}</div>
                    <div className="text-[10px] text-gray-500">{s.destinationCity}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-gray-800">{s.parcelWeightKg} kg</td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">{s.deliveryEstimate}</td>
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
                      onClick={() => onNotify?.(`Live WhatsApp tracking link sent to ${s.customerName}!`)}
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
