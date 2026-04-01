import React, { useState } from 'react';
import {
  Zap, Search, PlusCircle, User, BarChart3,
  ShieldCheck, Command, MoveRight, Layers3,
  Wallet, Filter, ArrowRight
} from 'lucide-react';

// --- Clean Palette Definition ---
const pal = {
  bg: 'bg-white',
  comp: 'bg-zinc-50',
  border: 'border-zinc-100',
  txt: 'text-zinc-950',
  sub: 'text-zinc-600',
  muted: 'text-zinc-400',
  // --- Accents ---
  accent: 'text-indigo-600',
  accentBg: 'bg-indigo-600',
  accentFocus: 'focus:ring-indigo-100 focus:border-indigo-600',
  statusOk: 'text-emerald-500',
};

// --- Real-World Data (Professionally Phrased) ---
const TRADES = [
  {
    id: 1,
    entity: "Vercel DX",
    project: "AI SDK Docs Redesign",
    description: "Seeking a React engineer with deep Next.js knowledge to refactor component documentation.",
    seeking: "Next.js Engineer",
    offering: "Deployment Consultancy",
    category: "Development"
  },
  {
    id: 2,
    entity: "Linear Product",
    project: "Desktop App Performance",
    description: "Need an Electron specialist to audit render cycles and optimize startup time.",
    seeking: "Electron Expert",
    offering: "UI System Design Audit",
    category: "Engineering"
  },
  {
    id: 3,
    entity: "Supabase Growth",
    project: "Postgres Realtime Demo",
    description: "Building a complex dashboard to showcase Postgres changes in real-time. Need Three.js/D3.",
    seeking: "Data Viz Specialist",
    offering: "Auth Implementation",
    category: "Engineering"
  }
];

// --- Components ---

const Navbar = () => (
  <nav className={`sticky top-0 z-50 ${pal.bg}/90 backdrop-blur-lg border-b ${pal.border} px-6 md:px-10 py-5 flex items-center justify-between`}>
    <div className="flex items-center gap-8">
      <div className={`flex items-center gap-2 font-black text-xl tracking-tighter ${pal.txt} uppercase`}>
        <div className={`w-8 h-8 ${pal.txt === 'text-zinc-950' ? 'bg-zinc-950' : 'bg-white'} rounded-xl flex items-center justify-center`}>
          <Command className={`${pal.txt === 'text-zinc-950' ? 'text-white' : 'text-zinc-950'} w-4 h-4`} />
        </div>
        Nexus
      </div>
      <div className={`hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] ${pal.muted}`}>
        {['Dashboard', 'Ledger', 'Nodes', 'Protocol'].map((item, i) => (
          <a key={item} href="#" className={`hover:${pal.txt} transition-colors ${i === 0 ? pal.txt : ''}`}>
            {item}
          </a>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className={`flex items-center gap-2.5 px-4 py-2 border ${pal.border} rounded-full`}>
        <div className={`w-1.5 h-1.5 rounded-full ${pal.statusOk} bg-emerald-500`}></div>
        <span className={`text-xs font-bold ${pal.txt}`}>1,240 CR</span>
      </div>
      <div className={`w-10 h-10 rounded-full ${pal.comp} border ${pal.border}`}></div>
    </div>
  </nav>
);

const TradeCard = ({ trade }) => (
  <div className={`group ${pal.bg} border ${pal.border} p-8 rounded-3xl hover:border-zinc-300 hover:shadow-2xl hover:shadow-zinc-100 transition-all duration-500`}>
    <div className="flex justify-between items-start mb-10">
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${pal.muted} mb-1.5`}>
          {trade.entity}
        </p>
        <h3 className={`text-2xl font-black tracking-tight ${pal.txt}`}>
          {trade.project}
        </h3>
      </div>
      <div className={`px-3 py-1 border ${pal.border} rounded-full text-[10px] font-bold ${pal.sub}`}>
        {trade.category}
      </div>
    </div>

    <p className={`${pal.sub} text-sm leading-relaxed mb-12 max-w-xl`}>
      {trade.description}
    </p>

    {/* Clean Barter UI */}
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 ${pal.comp} rounded-3xl border ${pal.border}`}>
      <div className="space-y-1">
        <p className={`text-[9px] font-black uppercase tracking-widest ${pal.muted}`}>Seeking</p>
        <p className={`text-sm font-bold ${pal.txt}`}>{trade.seeking}</p>
      </div>
      <MoveRight className="w-5 h-5 text-zinc-300 hidden sm:block" />
      <div className="space-y-1 sm:text-right">
        <p className={`text-[9px] font-black uppercase tracking-widest ${pal.accent}`}>Offering In Return</p>
        <p className={`text-sm font-extrabold ${pal.accent} italic underline underline-offset-4 decoration-indigo-200`}>
          {trade.offering}
        </p>
      </div>
    </div>
  </div>
);

export default function NexusPureApp() {
  const [filter, setFilter] = useState('All');

  return (
    <div className={`min-h-screen ${pal.bg} ${pal.txt} font-sans selection:bg-indigo-50 selection:text-indigo-950`}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Extreme Clean Hero */}
        <header className="mb-32 md:mb-40 space-y-8">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 ${pal.comp} border ${pal.border} rounded-full`}>
            <Zap className={`w-3.5 h-3.5 ${pal.statusOk}`} />
            <span className={`text-[11px] font-bold uppercase tracking-widest ${pal.sub}`}>
              Status: Live Liquidity
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85]">
            Exchange Expertise. <br />
            <span className={`${pal.accent}`}>Build Reputation.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pt-4">
            <p className={`${pal.sub} text-xl leading-relaxed max-w-lg font-medium`}>
              Nexus is the frictionless layer where teams direct-barter skills, skip procurement, and grow their verifiable proof-of-work graph.
            </p>
            <div className="flex gap-4">
              <button className={`${pal.accentBg} text-white px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:brightness-110 shadow-lg shadow-indigo-100 transition-all active:scale-95`}>
                <PlusCircle className="w-5 h-5" /> Post Project
              </button>
              <button className={`${pal.bg} border ${pal.border} ${pal.txt} px-10 py-5 rounded-2xl font-black text-sm hover:border-zinc-900 transition-colors`}>
                Browse Ledger
              </button>
            </div>
          </div>
        </header>

        {/* Bento Stats - Simplified */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 md:mb-40">
          {[
            { label: 'Network Value Exchange', value: '$12.8M', icon: <Wallet /> },
            { label: 'Nodes Active', value: '42,901', icon: <Layers3 /> },
            { label: 'Match Precision', value: '98.2%', icon: <ShieldCheck /> },
          ].map((stat, i) => (
            <div key={i} className={`p-8 ${pal.comp} border ${pal.border} rounded-3xl flex items-center justify-between`}>
              <div className="space-y-1">
                <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${pal.muted}`}>
                  {stat.label}
                </p>
                <p className={`text-4xl font-black tracking-tighter ${pal.txt} ${i === 0 ? pal.accent : ''}`}>
                  {stat.value}
                </p>
              </div>
              <div className="text-zinc-200">{stat.icon}</div>
            </div>
          ))}
        </section>

        {/* Marketplace Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 pb-8 border-b border-zinc-100">
            <div>
              <h2 className={`text-4xl font-black tracking-tight ${pal.txt}`}>Marketplace</h2>
              <p className={`${pal.muted} text-sm font-medium pt-1`}>Live peer-to-peer exchange ledger</p>
            </div>

            <div className="flex items-center gap-3">
              <div className={`relative group`}>
                <Search className={`absolute left-5 top-1/2 -translate-y-1/2 ${pal.muted} w-4 h-4 group-focus-within:${pal.accent}`} />
                <input
                  type="text"
                  placeholder="Filter by tech stack or need..."
                  className={`w-full md:w-80 pl-12 pr-6 py-4 ${pal.comp} border ${pal.border} rounded-full outline-none ${pal.accentFocus} text-sm font-medium transition-all`}
                />
              </div>
              <button className={`p-4 ${pal.comp} border ${pal.border} rounded-full ${pal.muted} hover:${pal.txt} hover:border-zinc-300 transition-colors`}>
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {TRADES.map(trade => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className={`inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest ${pal.sub} hover:${pal.accent} transition-colors`}>
              View Archived Trades <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer - Extreme Minimal */}
      <footer className={`py-16 border-t ${pal.border} text-center`}>
        <div className={`font-black text-sm tracking-tighter ${pal.txt} uppercase mb-3 grayscale opacity-30`}>
          Nexus Protocol 2026
        </div>
        <p className={`${pal.muted} text-[10px] font-bold uppercase tracking-[0.4em]`}>
          Build Verifiable Reputation
        </p>
      </footer>
    </div>
  );
}