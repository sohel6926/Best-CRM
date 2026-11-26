import React, { useState } from 'react';
import { 
  Calculator, PieChart, TrendingUp, AlertCircle, 
  CheckCircle, ArrowUpRight, DollarSign, Sliders, ShieldCheck
} from 'lucide-react';

export const CateringCosting: React.FC<{ onNotify?: (msg: string) => void }> = ({ onNotify }) => {
  const [plates, setPlates] = useState<number>(500);
  const [quotedRatePerPlate, setQuotedRatePerPlate] = useState<number>(850);

  // Breakdown costs
  const [rawGroceryPerPlate, setRawGroceryPerPlate] = useState<number>(290);
  const [dairyGheePerPlate, setDairyGheePerPlate] = useState<number>(95);
  const [halwaiLabourPerPlate, setHalwaiLabourPerPlate] = useState<number>(75);
  const [serviceWaitersPerPlate, setServiceWaitersPerPlate] = useState<number>(45);
  const [lpgFuelPerPlate, setLpgFuelPerPlate] = useState<number>(25);
  const [transportTempoCost, setTransportTempoCost] = useState<number>(8000); // flat
  const [crockeryWashCost, setCrockeryWashCost] = useState<number>(6500); // flat
  const [dryIceWaterNapkins, setDryIceWaterNapkins] = useState<number>(7000); // flat
  const [bufferContingencyPercent, setBufferContingencyPercent] = useState<number>(5);

  // Math
  const variableCostPerPlate = rawGroceryPerPlate + dairyGheePerPlate + halwaiLabourPerPlate + serviceWaitersPerPlate + lpgFuelPerPlate;
  const flatOverheads = transportTempoCost + crockeryWashCost + dryIceWaterNapkins;
  const flatOverheadsPerPlate = plates > 0 ? Math.round(flatOverheads / plates) : 0;
  
  const subtotalCostPerPlate = variableCostPerPlate + flatOverheadsPerPlate;
  const contingencyPerPlate = Math.round(subtotalCostPerPlate * (bufferContingencyPercent / 100));
  const trueCostPerPlate = subtotalCostPerPlate + contingencyPerPlate;

  const netProfitPerPlate = quotedRatePerPlate - trueCostPerPlate;
  const netMarginPercent = quotedRatePerPlate > 0 ? Math.round((netProfitPerPlate / quotedRatePerPlate) * 100) : 0;

  const totalContractRevenue = quotedRatePerPlate * plates;
  const totalCostBudget = trueCostPerPlate * plates;
  const totalNetProfit = netProfitPerPlate * plates;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Per-Plate True Cost & Margin Engine</h2>
            <p className="text-sm text-gray-500">Account for hidden leakages: fuel, bhatta, transport, wastage & verify your net margin before committing</p>
          </div>
        </div>

        <button
          onClick={() => onNotify?.(`Exported Cost Audit Sheet for ${plates} plates at ₹${quotedRatePerPlate}/plate`)}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold shadow-sm"
        >
          Export Cost Audit PDF
        </button>
      </div>

      {/* Top Banner KPI Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Client Quoted Rate</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹{quotedRatePerPlate} <span className="text-xs font-normal text-gray-500">/ plate</span></div>
          <div className="text-[11px] text-purple-700 mt-0.5">Total: ₹{totalContractRevenue.toLocaleString()} ({plates} guests)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">True Landed Cost</div>
          <div className="text-2xl font-bold text-purple-950 mt-1">₹{trueCostPerPlate} <span className="text-xs font-normal text-gray-500">/ plate</span></div>
          <div className="text-[11px] text-gray-500 mt-0.5">Total Outflow: ₹{totalCostBudget.toLocaleString()}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Net Profit / Plate</div>
          <div className={`text-2xl font-bold mt-1 ${netProfitPerPlate >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
            ₹{netProfitPerPlate} <span className="text-xs font-normal text-gray-500">/ plate</span>
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-semibold">Total Net Gain: ₹{totalNetProfit.toLocaleString()}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="text-xs text-gray-500 font-medium">Operating Profit Margin</div>
          <div className={`text-2xl font-bold mt-1 ${netMarginPercent >= 30 ? 'text-emerald-600' : netMarginPercent >= 20 ? 'text-amber-600' : 'text-red-600'}`}>
            {netMarginPercent}%
          </div>
          <div className="text-[11px] text-gray-500 mt-0.5">
            {netMarginPercent >= 30 ? 'High-Margin Sweet Spot' : netMarginPercent >= 20 ? 'Healthy Industry Standard' : 'Warning: Thin Margin'}
          </div>
        </div>
      </div>

      {/* Main Interactive Controls & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sliders & Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Base Parameters */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Deal Scope</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Guaranteed Plate Count</label>
                <input 
                  type="number"
                  value={plates}
                  onChange={e => setPlates(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold border border-purple-200 rounded-xl text-gray-900 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Quoted Rate Per Plate (₹)</label>
                <input 
                  type="number"
                  value={quotedRatePerPlate}
                  onChange={e => setQuotedRatePerPlate(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-bold border border-purple-200 rounded-xl text-purple-900 focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Variable Costs Per Plate */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Variable Production Costs (Per Plate)</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">1. Raw Kirana, Rice, Oil & Vegetables</span>
                  <span className="text-purple-900">₹{rawGroceryPerPlate}</span>
                </div>
                <input 
                  type="range" min="150" max="600" step="5"
                  value={rawGroceryPerPlate}
                  onChange={e => setRawGroceryPerPlate(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-purple-100 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">2. Pure Ghee, Paneer, Cream & Sweets Milk</span>
                  <span className="text-purple-900">₹{dairyGheePerPlate}</span>
                </div>
                <input 
                  type="range" min="40" max="250" step="5"
                  value={dairyGheePerPlate}
                  onChange={e => setDairyGheePerPlate(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-purple-100 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">3. Head Cook (Karigar) & Halwai Labour</span>
                  <span className="text-purple-900">₹{halwaiLabourPerPlate}</span>
                </div>
                <input 
                  type="range" min="30" max="180" step="5"
                  value={halwaiLabourPerPlate}
                  onChange={e => setHalwaiLabourPerPlate(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-purple-100 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">4. Uniformed Service Boys & Bartenders</span>
                  <span className="text-purple-900">₹{serviceWaitersPerPlate}</span>
                </div>
                <input 
                  type="range" min="20" max="120" step="5"
                  value={serviceWaitersPerPlate}
                  onChange={e => setServiceWaitersPerPlate(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-purple-100 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">5. Commercial LPG Gas & Coal Fuel</span>
                  <span className="text-purple-900">₹{lpgFuelPerPlate}</span>
                </div>
                <input 
                  type="range" min="10" max="60" step="5"
                  value={lpgFuelPerPlate}
                  onChange={e => setLpgFuelPerPlate(Number(e.target.value))}
                  className="w-full accent-purple-600 h-1.5 bg-purple-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Fixed & Logistics Overheads */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Event Fixed Overheads (Total Inflow)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-600 block mb-1">Tempo / Truck Transport</label>
                <input 
                  type="number"
                  value={transportTempoCost}
                  onChange={e => setTransportTempoCost(Number(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-purple-200 rounded-lg text-gray-900"
                />
                <span className="text-[10px] text-gray-400">≈ ₹{plates > 0 ? Math.round(transportTempoCost / plates) : 0}/plate</span>
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">Crockery & Deg Washing</label>
                <input 
                  type="number"
                  value={crockeryWashCost}
                  onChange={e => setCrockeryWashCost(Number(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-purple-200 rounded-lg text-gray-900"
                />
                <span className="text-[10px] text-gray-400">≈ ₹{plates > 0 ? Math.round(crockeryWashCost / plates) : 0}/plate</span>
              </div>

              <div>
                <label className="text-xs text-gray-600 block mb-1">Dry Ice, Water Jars & Tissue</label>
                <input 
                  type="number"
                  value={dryIceWaterNapkins}
                  onChange={e => setDryIceWaterNapkins(Number(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-xs font-semibold border border-purple-200 rounded-lg text-gray-900"
                />
                <span className="text-[10px] text-gray-400">≈ ₹{plates > 0 ? Math.round(dryIceWaterNapkins / plates) : 0}/plate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Cost Structure Visualizer */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" /> Plate Cost Distribution
            </h3>

            {/* Visual Bar Stack */}
            <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${(rawGroceryPerPlate / trueCostPerPlate) * 100}%` }} className="bg-purple-600" title="Groceries" />
              <div style={{ width: `${(dairyGheePerPlate / trueCostPerPlate) * 100}%` }} className="bg-purple-400" title="Dairy & Ghee" />
              <div style={{ width: `${(halwaiLabourPerPlate / trueCostPerPlate) * 100}%` }} className="bg-amber-500" title="Halwai Labor" />
              <div style={{ width: `${(serviceWaitersPerPlate / trueCostPerPlate) * 100}%` }} className="bg-sky-500" title="Service Boys" />
              <div style={{ width: `${(flatOverheadsPerPlate / trueCostPerPlate) * 100}%` }} className="bg-rose-400" title="Fixed Overheads" />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Raw Groceries & Kirana</span>
                <span className="font-bold text-gray-900">₹{rawGroceryPerPlate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Paneer, Milk & Pure Ghee</span>
                <span className="font-bold text-gray-900">₹{dairyGheePerPlate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Cooking Bhatta / Halwai</span>
                <span className="font-bold text-gray-900">₹{halwaiLabourPerPlate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Uniform Service Boys</span>
                <span className="font-bold text-gray-900">₹{serviceWaitersPerPlate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="flex items-center gap-1.5 text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Transport, Washing & Ice</span>
                <span className="font-bold text-gray-900">₹{flatOverheadsPerPlate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gray-50">
                <span className="flex items-center gap-1.5 text-gray-600">Gas & Contingency Reserve</span>
                <span className="font-bold text-gray-900">₹{lpgFuelPerPlate + contingencyPerPlate}</span>
              </div>

              <div className="pt-2 border-t border-purple-100 flex justify-between text-sm font-bold text-purple-950">
                <span>Total True Plate Cost:</span>
                <span>₹{trueCostPerPlate}</span>
              </div>
            </div>

            {/* Recommendation banner */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-purple-900">
                <ShieldCheck className="w-4 h-4 text-purple-700" /> Pricing Safety Audit
              </div>
              <p className="text-gray-600 leading-relaxed">
                At ₹{quotedRatePerPlate}/plate, your profit is <strong className="text-purple-900">₹{netProfitPerPlate}</strong> per plate. If client demands a discount below <strong className="text-red-700">₹{trueCostPerPlate + 100}</strong>, either reduce menu item count or negotiate extra guest billing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
