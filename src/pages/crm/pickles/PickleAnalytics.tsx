import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, PieChart, DollarSign, 
  Sparkles, Award, ShieldCheck, ArrowUpRight
} from 'lucide-react';

export const PickleAnalytics: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const varieties = [
    { name: 'Grandmother Mango Avakaya', share: 36, monthlyJars: 850, revenue: 250750, marginPercent: 62 },
    { name: 'Sour Gongura Pachadi', share: 24, monthlyJars: 580, revenue: 162400, marginPercent: 65 },
    { name: 'Boneless Chicken Pickle', share: 18, monthlyJars: 320, revenue: 176000, marginPercent: 54 },
    { name: 'Royal Prawn Pickle', share: 12, monthlyJars: 180, revenue: 122400, marginPercent: 51 },
    { name: 'Country Garlic & Amla Achar', share: 10, monthlyJars: 240, revenue: 50400, marginPercent: 59 }
  ];

  const totalMonthlyPickleRevenue = varieties.reduce((sum, v) => sum + v.revenue, 0);
  const totalJarsSold = varieties.reduce((sum, v) => sum + v.monthlyJars, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pickle Variety Popularity Matrix & Gross Profit Margins</h2>
            <p className="text-sm text-gray-500">Sales volume per variety, fruit/oil raw cost breakdown vs retail margin (51% - 65% healthy artisanal food margins)</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Quarterly Pickle Profit Audit Exported")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          Export Profit Audit PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Monthly Pickle Turnover</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">₹{totalMonthlyPickleRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">D2C + Supermarkets + NRI Exports</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Monthly Jars Shipped</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalJarsSold.toLocaleString()} <span className="text-xs font-normal text-gray-500">jars</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Across glass jars & PET containers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Average Brand Gross Margin</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">58.2%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">High direct-to-consumer margin</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Top Revenue Contributor</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">Avakaya Mango</div>
          <div className="text-[11px] text-[#5B21B6] mt-0.5 font-bold">36% of all pickle sales</div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Pickle Variety Share & Profit Margin Performance
          </h3>

          {/* Visual Percentage Stack */}
          <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: '36%' }} className="bg-[#5B21B6]" title="Mango Avakaya 36%" />
            <div style={{ width: '24%' }} className="bg-purple-600" title="Gongura 24%" />
            <div style={{ width: '18%' }} className="bg-rose-500" title="Chicken Pickle 18%" />
            <div style={{ width: '12%' }} className="bg-amber-500" title="Prawn Pickle 12%" />
            <div style={{ width: '10%' }} className="bg-emerald-500" title="Garlic & Amla 10%" />
          </div>

          <div className="space-y-3 pt-2">
            {varieties.map((v, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-purple-50 bg-purple-50/20 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-xs">{v.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDE9FE] text-[#5B21B6]">
                      {v.share}% share
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Monthly Volume: {v.monthlyJars} jars bottled</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-purple-950 text-sm">₹{v.revenue.toLocaleString()}</div>
                  <div className="text-[11px] font-bold text-emerald-700">{v.marginPercent}% Gross Margin</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Intelligence Insights */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B21B6]" /> Artisanal Margin Optimization
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-gray-600">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <strong className="text-purple-950 block font-bold mb-1">Gongura High-Yield Margin</strong>
                Gongura Pachadi commands the highest gross margin (<span className="text-emerald-700 font-bold">65%</span>) due to high sun-dried leaf yield and premium sesame oil appreciation.
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <strong className="text-rose-950 block font-bold mb-1">Non-Veg Basket Value</strong>
                Chicken and Prawn pickles have 3x higher average order values (₹550–₹680 per jar), driving superior D2C profitability even with higher raw meat costs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
