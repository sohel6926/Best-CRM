import React, { useState } from 'react';
import { 
  Bot, MessageSquare, Sparkles, CheckCircle2, 
  Clock, Settings, Power, Zap, Shield, RefreshCw 
} from 'lucide-react';

interface AgentItem {
  id: string;
  name: string;
  model: string;
  role: string;
  channel: 'WhatsApp Business API' | 'Website Live Chat' | 'Auto SMS / Email';
  activeSessionsToday: number;
  accuracy: string;
  status: 'Active (Online)' | 'Standby / Paused';
}

export function AdminAgents() {
  const [agents, setAgents] = useState<AgentItem[]>([
    {
      id: 'AGT-01',
      name: 'Swastik Wedding Menu AI Concierge',
      model: 'Gemini 1.5 Pro (Fine-Tuned on Telugu & Veg Menus)',
      role: 'Instantly suggests 3-course menus based on client budget, muhurtham time & guest count.',
      channel: 'WhatsApp Business API',
      activeSessionsToday: 42,
      accuracy: '98.5%',
      status: 'Active (Online)',
    },
    {
      id: 'AGT-02',
      name: 'LunchBox Pause & WFH Day Credit Bot',
      model: 'Fast Intent Classifier',
      role: 'Processes subscriber pause messages before 08:30 AM cutoff and auto-rolls forward credit.',
      channel: 'WhatsApp Business API',
      activeSessionsToday: 18,
      accuracy: '100%',
      status: 'Active (Online)',
    },
    {
      id: 'AGT-03',
      name: 'Mandi Wholesale Price Sentinel',
      model: 'Price Scraping & Anomaly Engine',
      role: 'Monitors Begum Bazar dal and oil rates; alerts chefs if edible oil surges > ₹5/L.',
      channel: 'Auto SMS / Email',
      activeSessionsToday: 6,
      accuracy: '99.2%',
      status: 'Active (Online)',
    },
    {
      id: 'AGT-04',
      name: 'Client Payment Follow-up Agent',
      model: 'Polite Conversational Agent',
      role: 'Sends WhatsApp payment reminders for 20% advance booking dues before function dates.',
      channel: 'WhatsApp Business API',
      activeSessionsToday: 12,
      accuracy: '97.0%',
      status: 'Active (Online)',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5B21B6]">AI Orchestration & Bots</span>
          <h2 className="text-xl font-extrabold text-[#1E1B4B] mt-0.5">Autonomous AI Agents & Automations</h2>
          <p className="text-xs text-[#64748B]">
            Manage WhatsApp menu assistants, automated pause classification bots, and payment reminder agents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 Agents Active</span>
          </span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((ag) => (
          <div key={ag.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-purple-100 text-[#5B21B6] flex items-center justify-center font-bold">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1E1B4B]">{ag.name}</h3>
                  <span className="text-[11px] font-mono text-purple-700 font-semibold">{ag.model}</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                {ag.status}
              </span>
            </div>

            <p className="text-xs text-gray-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
              {ag.role}
            </p>

            <div className="flex justify-between items-center text-xs pt-1 border-t border-gray-100">
              <span className="text-gray-500">Channel: <strong className="text-gray-800">{ag.channel}</strong></span>
              <span className="text-gray-500">Chats Today: <strong className="text-[#5B21B6]">{ag.activeSessionsToday}</strong></span>
              <span className="text-emerald-700 font-bold">{ag.accuracy} Resolution</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
