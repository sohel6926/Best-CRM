import React, { useState } from 'react';
import { 
  ShoppingCart, Send, CheckCircle2, Clock, 
  Truck, Search, Filter, Share2, DollarSign, Package
} from 'lucide-react';

interface D2COrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  channel: 'Website D2C' | 'Direct WhatsApp Store' | 'Amazon Marketplace' | 'Swiggy Minis';
  itemsSummary: string;
  totalAmount: number;
  paymentMode: 'Prepaid UPI' | 'Cash on Delivery (COD)' | 'Prepaid Card';
  fulfillmentStatus: 'New Order' | 'Packed & Weighed' | 'Dispatched via Courier' | 'Delivered';
  orderDate: string;
}

export const KaramOrders: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('All');

  const [orders, setOrders] = useState<D2COrder[]>([
    {
      id: 'ord-1',
      orderNumber: 'ORD-PODI-9921',
      customerName: 'Praveen Varma',
      phone: '+91 98480 11209',
      city: 'Hyderabad (Madhapur)',
      channel: 'Direct WhatsApp Store',
      itemsSummary: '2x 250g Kandi Podi, 1x 250g Vellulli Karam',
      totalAmount: 605,
      paymentMode: 'Prepaid UPI',
      fulfillmentStatus: 'Packed & Weighed',
      orderDate: 'Today, 10:15 AM'
    },
    {
      id: 'ord-2',
      orderNumber: 'ORD-PODI-9922',
      customerName: 'Deepa Narayanan',
      phone: '+91 98200 44321',
      city: 'Bengaluru (Koramangala)',
      channel: 'Website D2C',
      itemsSummary: '4x 250g Idli Gunpowder, 2x 100g Karivepaku Podi',
      totalAmount: 910,
      paymentMode: 'Prepaid UPI',
      fulfillmentStatus: 'Dispatched via Courier',
      orderDate: 'Today, 08:30 AM'
    },
    {
      id: 'ord-3',
      orderNumber: 'ORD-PODI-9923',
      customerName: 'Sanjay Deshmukh',
      phone: '+91 97650 99812',
      city: 'Pune (Kothrud)',
      channel: 'Amazon Marketplace',
      itemsSummary: '1x Podi Lovers Combo Pack (4 Varieties)',
      totalAmount: 750,
      paymentMode: 'Prepaid Card',
      fulfillmentStatus: 'New Order',
      orderDate: 'Today, 11:45 AM'
    },
    {
      id: 'ord-4',
      orderNumber: 'ORD-PODI-9924',
      customerName: 'Anand Kumar',
      phone: '+91 99002 55418',
      city: 'Chennai (Adyar)',
      channel: 'Swiggy Minis',
      itemsSummary: '2x 100g Nalla Karam, 2x 250g Kandi Podi',
      totalAmount: 610,
      paymentMode: 'Cash on Delivery (COD)',
      fulfillmentStatus: 'New Order',
      orderDate: 'Today, 12:10 PM'
    }
  ]);

  const markDispatched = (id: string) => {
    setOrders(prev => 
      prev.map(o => o.id === id ? { ...o, fulfillmentStatus: 'Dispatched via Courier' } : o)
    );
    onNotify?.("Order dispatched with Delhivery AWB tracking link sent via WhatsApp!");
  };

  const filtered = orders.filter(o => {
    const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = filterChannel === 'All' || o.channel === filterChannel;
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
            <h2 className="text-xl font-bold text-gray-900">D2C Multi-Channel Customer Orders Hub</h2>
            <p className="text-sm text-gray-500">Track orders from your Website, WhatsApp catalog, Amazon, and Swiggy with unified packaging workflow</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Batch Packing Slips & Thermal Shipping Labels Printed")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <Truck className="w-4 h-4" /> Print Daily Batch Manifest
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-purple-50">
          <div className="flex flex-wrap gap-2">
            {['All', 'Direct WhatsApp Store', 'Website D2C', 'Amazon Marketplace'].map(ch => (
              <button
                key={ch}
                onClick={() => setFilterChannel(ch)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filterChannel === ch ? 'bg-[#5B21B6] text-white' : 'bg-purple-50 text-[#5B21B6] hover:bg-purple-100'
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
                <th className="py-3 px-4">Items Ordered</th>
                <th className="py-3 px-4 text-right">Order Total</th>
                <th className="py-3 px-4 text-center">Payment</th>
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
                    <div className="text-[10px] text-gray-400">{o.city} • {o.phone}</div>
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
                      {o.paymentMode}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      o.fulfillmentStatus === 'Dispatched via Courier' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      o.fulfillmentStatus === 'Packed & Weighed' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {o.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {o.fulfillmentStatus !== 'Dispatched via Courier' ? (
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
