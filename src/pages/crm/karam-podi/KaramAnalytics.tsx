import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, PieChart, DollarSign, 
  Sparkles, Award, ShieldCheck, ArrowUpRight
} from 'lucide-react';

export const KaramAnalytics: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const flavorShares = [
    { name: 'Kandi Podi (Gunpowder)', share: 38, monthlySalesKg: 420, revenue: 315000, marginPercent: 54 },
    { name: 'Vellulli (Garlic) Karam', share: 27, monthlySalesKg: 300, revenue: 240000, marginPercent: 58 },
    { name: 'Idli / Dosa Karam Podi', share: 20, monthlySalesKg: 220, revenue: 165000, marginPercent: 51 },
    { name: 'Karivepaku (Curry Leaf) Podi', share: 9, monthlySalesKg: 100, revenue: 85000, marginPercent: 62 },
    { name: 'Nalla Karam (Black Sesame)', share: 6, monthlySalesKg: 65, revenue: 58500, marginPercent: 56 }
  ];

  const totalMonthlyRevenue = flavorShares.reduce((sum, f) => sum + f.revenue, 0);
  const totalKgSold = flavorShares.reduce((sum, f) => sum + f.monthlySalesKg, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-[#5B21B6] rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Flavor Popularity Matrix & Gross Profit Margins</h2>
            <p className="text-sm text-gray-500">Real-time flavor revenue distribution, raw material costs vs retail margins (51% - 62% healthy FMCG margins)</p>
          </div>
        </div>

        <button 
          onClick={() => onNotify?.("Quarterly Spice Profitability Audit Exported")}
          className="px-4 py-2 bg-[#5B21B6] hover:bg-[#4C1D95] text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          Export Profit Audit PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Monthly Podi Turnover</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">₹{totalMonthlyRevenue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">D2C + Supermarkets + HORECA</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Total Spice Movement</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{totalKgSold.toLocaleString()} <span className="text-xs font-normal text-gray-500">kg / mo</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">1.105 metric tons packaged</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Average Brand Gross Margin</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">56.2%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">High D2C volume margin cushion</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Top Revenue Contributor</div>
          <div className="text-2xl font-bold text-[#5B21B6] mt-1">Kandi Podi</div>
          <div className="text-[11px] text-[#5B21B6] mt-0.5 font-bold">38% of total brand sales</div>
        </div>
      </div>

      {/* Flavor Matrix Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Flavor Sales Share & Profit Margin Performance
          </h3>

          {/* Visual Percentage Stack */}
          <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: '38%' }} className="bg-[#5B21B6]" title="Kandi Podi 38%" />
            <div style={{ width: '27%' }} className="bg-purple-600" title="Vellulli Karam 27%" />
            <div style={{ width: '20%' }} className="bg-indigo-500" title="Idli Karam 20%" />
            <div style={{ width: '9%' }} className="bg-emerald-500" title="Curry Leaf 9%" />
            <div style={{ width: '6%' }} className="bg-amber-500" title="Nalla Karam 6%" />
          </div>

          <div className="space-y-3 pt-2">
            {flavorShares.map((f, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-purple-50 bg-purple-50/20 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-xs">{f.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDE9FE] text-[#5B21B6]">
                      {f.share}% share
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Monthly Volume: {f.monthlySalesKg} kg packaged</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-purple-950 text-sm">₹{f.revenue.toLocaleString()}</div>
                  <div className="text-[11px] font-bold text-emerald-700">{f.marginPercent}% Gross Margin</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Intelligence Insights */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5B21B6]" /> FMCG Margin Optimization
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-gray-600">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                <strong className="text-purple-950 block font-bold mb-1">Curry Leaf Health Surge</strong>
                Curry Leaf Podi yields the highest margin (<span className="text-emerald-700 font-bold">62%</span>) due to low raw leaf procurement cost and high retail pricing. Recommended for D2C bundle upsells.
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <strong className="text-emerald-950 block font-bold mb-1">Guntur Chili Crop Advantage</strong>
                Direct farmer procurement from Guntur mirchi yard increased overall gunpowder gross margins by <span className="font-bold text-emerald-700">+3.8%</span> this quarter.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
