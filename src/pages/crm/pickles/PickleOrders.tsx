import React, { useState } from 'react';
import { 
  ShoppingCart, Send, CheckCircle2, Clock, 
  Truck, Search, Filter, Share2, DollarSign, Package
} from 'lucide-react';

interface PickleOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  destinationCity: string;
  channel: 'Website D2C' | 'Direct WhatsApp Store' | 'Amazon India';
  itemsSummary: string;
  totalAmount: number;
  paymentMode: 'Prepaid UPI' | 'Cash on Delivery (COD)';
  cushionPackaging: 'Bubble Wrapped Double Corrugated Box' | 'Standard Corrugated Box';
  fulfillmentStatus: 'New Order' | 'Packed & Bubble Wrapped' | 'Dispatched' | 'Delivered';
  orderDate: string;
}

export const PickleOrders: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('All');

  const [orders, setOrders] = useState<PickleOrder[]>([
    {
      id: 'ord-1',
      orderNumber: 'ORD-PICKLE-8812',
      customerName: 'Anil Kumar Varma',
      phone: '+91 98480 33412',
      destinationCity: 'Bengaluru, Karnataka',
      channel: 'Direct WhatsApp Store',
      itemsSummary: '2x 500g Mango Avakaya, 1x 500g Boneless Chicken Pickle',
      totalAmount: 1140,
      paymentMode: 'Prepaid UPI',
      cushionPackaging: 'Bubble Wrapped Double Corrugated Box',
      fulfillmentStatus: 'Packed & Bubble Wrapped',
      orderDate: 'Today, 09:30 AM'
    },
    {
      id: 'ord-2',
      orderNumber: 'ORD-PICKLE-8813',
      customerName: 'Pooja Iyer',
      phone: '+91 97112 00418',
      destinationCity: 'Mumbai, Maharashtra',
      channel: 'Website D2C',
      itemsSummary: '1x 500g Gongura Pachadi, 1x 500g Prawn Pickle',
      totalAmount: 960,
      paymentMode: 'Prepaid UPI',
      cushionPackaging: 'Bubble Wrapped Double Corrugated Box',
      fulfillmentStatus: 'Dispatched',
      orderDate: 'Today, 10:15 AM'
    },
    {
      id: 'ord-3',
      orderNumber: 'ORD-PICKLE-8814',
      customerName: 'Sanjay Deshmukh',
      phone: '+91 96541 33201',
      destinationCity: 'Nagpur, Maharashtra',
      channel: 'Amazon India',
      itemsSummary: '1x 1kg Mango Avakaya PET Jar',
      totalAmount: 540,
      paymentMode: 'Cash on Delivery (COD)',
      cushionPackaging: 'Bubble Wrapped Double Corrugated Box',
      fulfillmentStatus: 'New Order',
      orderDate: 'Today, 11:45 AM'
    }
  ]);

  const markDispatched = (id: string) => {
    setOrders(prev => 
      prev.map(o => o.id === id ? { ...o, fulfillmentStatus: 'Dispatched' } : o)
    );
    onNotify?.("Order dispatched with Delhivery Fragile Glass AWB tracking link sent via WhatsApp!");
  };

  const filtered = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.destinationCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = channelFilter === 'All' || o.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">D2C Customer Orders & Multi-Jar Bubble Packing</h2>
            <p className="text-sm text-gray-500">Track online website, WhatsApp catalog & Amazon orders with heavy-duty glass cushion bubble wrapping</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Batch Fragile Packing Manifest Printed")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Truck className="w-4 h-4" /> Print Fragile Glass Manifest
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <div className="flex flex-wrap gap-2">
            {['All', 'Direct WhatsApp Store', 'Website D2C', 'Amazon India'].map(ch => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  channelFilter === ch ? 'bg-[#5B21B6] text-white' : 'bg-purple-50 text-[#5B21B6] hover:bg-purple-100'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search customer, order # or city..."
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
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & City</th>
                <th className="py-3 px-4">Sales Channel</th>
                <th className="py-3 px-4">Jars Ordered</th>
                <th className="py-3 px-4 text-right">Order Total</th>
                <th className="py-3 px-4 text-center">Packaging Cushion</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-purple-50/30 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                    <div>{o.orderNumber}</div>
                    <div className="text-[10px] text-gray-400 font-sans">{o.orderDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{o.customerName}</div>
                    <div className="text-[10px] text-gray-400">{o.destinationCity} • {o.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-100">
                      {o.channel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 max-w-xs">{o.itemsSummary}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-purple-950 text-sm">
                    ₹{o.totalAmount}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Bubble Wrap Air-Pouch
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      o.fulfillmentStatus === 'Dispatched' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      o.fulfillmentStatus === 'Packed & Bubble Wrapped' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {o.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {o.fulfillmentStatus !== 'Dispatched' ? (
                      <button 
                        onClick={() => markDispatched(o.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-sm"
                      >
                        Dispatch
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold text-[11px]">Shipped</span>
                    )}
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
