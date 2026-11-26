import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function AdminPricingSimulation() {
  const { customPlanPrices, updatePlanPrice } = useAdmin();

  // Current live rates
  const currentStarter = customPlanPrices.starter || 999;
  const currentPro = customPlanPrices.professional || 2499;
  const currentEnterprise = customPlanPrices.enterprise || 4999;

  // Simulated proposed rates
  const [simStarter, setSimStarter] = useState<number>(currentStarter);
  const [simPro, setSimPro] = useState<number>(currentPro);
  const [simEnterprise, setSimEnterprise] = useState<number>(currentEnterprise);

  // Subscriber base assumptions
  const [activeSubscribers, setActiveSubscribers] = useState<number>(180);
  const [churnRateSensitivity, setChurnRateSensitivity] = useState<number>(2.5); // % change per ₹500 increase

  // Calculation
  const starterShare = 0.50; // 50% on starter
  const proShare = 0.40;     // 40% on pro
  const entShare = 0.10;     // 10% on enterprise

  // Current MRR
  const currentMRR = Math.round(
    activeSubscribers * (starterShare * currentStarter + proShare * currentPro + entShare * currentEnterprise)
  );

  // Price delta ratio
  const avgCurrentPrice = starterShare * currentStarter + proShare * currentPro + entShare * currentEnterprise;
  const avgSimPrice = starterShare * simStarter + proShare * simPro + entShare * simEnterprise;
  const priceIncreasePct = ((avgSimPrice - avgCurrentPrice) / avgCurrentPrice) * 100;

  // Estimated churn impact
  const estimatedSubscribers = Math.round(
    activeSubscribers * Math.max(0.7, 1 - (priceIncreasePct > 0 ? (priceIncreasePct / 10) * (churnRateSensitivity / 100) : 0))
  );

  // Simulated MRR
  const simMRR = Math.round(
    estimatedSubscribers * (starterShare * simStarter + proShare * simPro + entShare * simEnterprise)
  );

  const mrrDifference = simMRR - currentMRR;
  const percentageGain = ((mrrDifference / currentMRR) * 100).toFixed(1);

  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handleApplySimulatedPrices = () => {
    updatePlanPrice('starter', simStarter, `Published from Pricing Simulation tool (+${percentageGain}%)`);
    updatePlanPrice('professional', simPro, `Published from Pricing Simulation tool (+${percentageGain}%)`);
    updatePlanPrice('enterprise', simEnterprise, `Published from Pricing Simulation tool (+${percentageGain}%)`);
    setPublishedSuccess(true);
    setTimeout(() => setPublishedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">Pricing Simulation & Revenue Impact Modeler</h1>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Section 9 Scope: Test hypothetical price or plan changes, model subscriber churn sensitivity, and compare side-by-side before publishing live.
        </p>
      </div>

      {publishedSuccess && (
        <div className="p-4 rounded-xl bg-green-100 border border-green-300 text-green-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-700" />
          Simulated prices have been successfully published live to the public website and CRM checkout!
        </div>
      )}

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Input Controls (5 cols) */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-5 space-y-5">
          <h2 className="text-base font-bold text-[#1E1B4B]">Configure Simulated Price Points</h2>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-[#1E1B4B]">
                <span>Starter Plan (Current: ₹{currentStarter})</span>
                <span className="text-[#5B21B6] font-bold">Simulated: ₹{simStarter}</span>
              </div>
              <input
                type="range"
                min={499}
                max={1999}
                step={50}
                value={simStarter}
                onChange={(e) => setSimStarter(Number(e.target.value))}
                className="w-full mt-2 accent-[#5B21B6]"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#1E1B4B]">
                <span>Professional Plan (Current: ₹{currentPro})</span>
                <span className="text-[#5B21B6] font-bold">Simulated: ₹{simPro}</span>
              </div>
              <input
                type="range"
                min={1499}
                max={4999}
                step={100}
                value={simPro}
                onChange={(e) => setSimPro(Number(e.target.value))}
                className="w-full mt-2 accent-[#5B21B6]"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-[#1E1B4B]">
                <span>Enterprise Plan (Current: ₹{currentEnterprise})</span>
                <span className="text-[#5B21B6] font-bold">Simulated: ₹{simEnterprise}</span>
              </div>
              <input
                type="range"
                min={2999}
                max={9999}
                step={250}
                value={simEnterprise}
                onChange={(e) => setSimEnterprise(Number(e.target.value))}
                className="w-full mt-2 accent-[#5B21B6]"
              />
            </div>

            <div className="pt-3 border-t border-[#F3EEFF] space-y-3">
              <span className="font-bold text-[#64748B] uppercase text-[10px]">Subscriber Model Assumptions:</span>
              <div>
                <label className="text-[11px] text-[#475569]">Active Base Subscribers: <strong>{activeSubscribers}</strong></label>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={10}
                  value={activeSubscribers}
                  onChange={(e) => setActiveSubscribers(Number(e.target.value))}
                  className="w-full mt-1 accent-[#7C3AED]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#475569]">Churn Sensitivity Index: <strong>{churnRateSensitivity}%</strong></label>
                <input
                  type="range"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={churnRateSensitivity}
                  onChange={(e) => setChurnRateSensitivity(Number(e.target.value))}
                  className="w-full mt-1 accent-[#7C3AED]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Estimated Impact & Comparison (7 cols) */}
        <div className="rounded-2xl border border-[#EDE9FE] bg-white p-6 shadow-xs lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-base font-bold text-[#1E1B4B]">Projected Revenue Impact</h2>
            <p className="text-xs text-[#64748B]">Monthly Recurring Revenue (MRR) & Annualized Run Rate (ARR)</p>

            <div className="grid grid-cols-2 gap-4 mt-5">
              {/* Current */}
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                <span className="text-[10px] font-bold uppercase text-gray-500">Current MRR</span>
                <p className="mt-1 text-2xl font-extrabold text-gray-800 tabular-nums">
                  ₹{currentMRR.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-gray-500 mt-1">Based on {activeSubscribers} clients</p>
              </div>

              {/* Simulated */}
              <div className="p-4 rounded-xl border border-[#7C3AED] bg-[#F3EEFF]">
                <span className="text-[10px] font-bold uppercase text-[#5B21B6]">Simulated Projected MRR</span>
                <p className="mt-1 text-2xl font-extrabold text-[#5B21B6] tabular-nums">
                  ₹{simMRR.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-[#7C3AED] font-bold mt-1">
                  {mrrDifference >= 0 ? `+₹${mrrDifference.toLocaleString('en-IN')} (${percentageGain}%)` : `-₹${Math.abs(mrrDifference).toLocaleString('en-IN')} (${percentageGain}%)`}
                </p>
              </div>
            </div>

            {/* Side-by-side Table */}
            <div className="mt-6 border border-[#EDE9FE] rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#FAF8FF] text-[#64748B]">
                  <tr>
                    <th className="p-3 font-bold">Tier</th>
                    <th className="p-3 font-bold">Current Rate</th>
                    <th className="p-3 font-bold">Simulated Rate</th>
                    <th className="p-3 font-bold text-right">Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EEFF]">
                  <tr>
                    <td className="p-3 font-bold text-[#1E1B4B]">Starter</td>
                    <td className="p-3 tabular-nums">₹{currentStarter}</td>
                    <td className="p-3 tabular-nums font-bold text-[#5B21B6]">₹{simStarter}</td>
                    <td className="p-3 text-right tabular-nums text-green-700 font-semibold">
                      {simStarter >= currentStarter ? `+₹${simStarter - currentStarter}` : `-₹${currentStarter - simStarter}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#1E1B4B]">Professional</td>
                    <td className="p-3 tabular-nums">₹{currentPro}</td>
                    <td className="p-3 tabular-nums font-bold text-[#5B21B6]">₹{simPro}</td>
                    <td className="p-3 text-right tabular-nums text-green-700 font-semibold">
                      {simPro >= currentPro ? `+₹${simPro - currentPro}` : `-₹${currentPro - simPro}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-[#1E1B4B]">Enterprise</td>
                    <td className="p-3 tabular-nums">₹{currentEnterprise}</td>
                    <td className="p-3 tabular-nums font-bold text-[#5B21B6]">₹{simEnterprise}</td>
                    <td className="p-3 text-right tabular-nums text-green-700 font-semibold">
                      {simEnterprise >= currentEnterprise ? `+₹${simEnterprise - currentEnterprise}` : `-₹${currentEnterprise - simEnterprise}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#F3EEFF] flex items-center justify-between">
            <span className="text-xs text-[#64748B]">
              Ready to deploy this pricing scheme?
            </span>
            <button
              type="button"
              onClick={handleApplySimulatedPrices}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#5B21B6] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#4C1D95] cursor-pointer"
            >
              <span>Publish Simulated Prices Live</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
