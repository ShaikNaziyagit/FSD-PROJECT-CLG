import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Briefcase,
  Calendar,
  Layers,
  Users,
  Search,
  Bell,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import CampiiLogo from './CampiiLogo';

const DashboardPreview = () => {
  return (
    <div className="w-full rounded-3xl glass-panel p-3 sm:p-5 border border-white/20 shadow-2xl overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

      {/* Mock Browser/Window Controls Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 bg-stone-900/80 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-[11px] font-mono text-orange-300 ml-2 hidden sm:inline-block font-semibold">
            https://campii.internal/dashboard
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-orange-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span>LIVE 3D CAMPUS SYNC</span>
        </div>
      </div>

      {/* Mock Dashboard Layout */}
      <div className="grid grid-cols-12 gap-4 bg-stone-950/70 rounded-2xl p-3 sm:p-4 border border-white/10">
        
        {/* Mock Sidebar */}
        <aside className="hidden lg:col-span-3 lg:flex flex-col justify-between bg-stone-900/90 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-sm">
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
              <CampiiLogo size={28} />
              <div>
                <div className="text-sm font-extrabold text-white tracking-tight leading-none">CAMPII</div>
                <div className="text-[9px] font-mono text-orange-400 font-bold uppercase tracking-wider">Console v3.0</div>
              </div>
            </div>

            {/* Nav list */}
            <nav className="space-y-1">
              {[
                { label: 'Dashboard', icon: LayoutDashboard, active: true },
                { label: 'Academics', icon: GraduationCap, active: false },
                { label: 'Exams & Seating', icon: FileText, active: false },
                { label: 'Placements & CRT', icon: Briefcase, active: false },
                { label: 'Events & Fests', icon: Calendar, active: false },
                { label: 'Resources & Labs', icon: Layers, active: false },
                { label: 'Community Hub', icon: Users, active: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                    item.active
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-400/40 shadow-sm'
                      : 'text-stone-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* User pill */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Scholar"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-400"
            />
            <div className="truncate">
              <div className="text-xs font-bold text-white">Alex Rivera</div>
              <div className="text-[10px] text-orange-300 font-mono">B.Tech CSE • Sem 6</div>
            </div>
          </div>
        </aside>

        {/* Mock Main Dashboard Content */}
        <main className="col-span-12 lg:col-span-9 space-y-4">
          {/* Welcome Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-600/20 to-orange-600/10 border border-orange-400/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-orange-300 uppercase tracking-widest font-bold">
                Student Terminal // 22BCSE1042
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                Good morning, Alex. All 6 nodes online.
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                Next session: Advanced Distributed Systems at 11:30 AM in Turing Hall.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono border border-emerald-400/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              94.8% Nominal
            </span>
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: 'ATTENDANCE', val: '88.5%', sub: 'Safe (>75%)', color: 'text-emerald-400' },
              { label: 'CGPA', val: '9.24', sub: 'Top 5% Batch', color: 'text-orange-400' },
              { label: 'CRT DRIVES', val: '6 Open', sub: 'Highest ₹44 LPA', color: 'text-amber-400' },
              { label: 'ASSIGNMENTS', val: '2 Due', sub: 'Deadline in 3d', color: 'text-orange-300' },
            ].map((k, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-900/80 border border-white/10">
                <div className="text-[10px] font-mono text-stone-400 font-bold">{k.label}</div>
                <div className={`text-lg font-black ${k.color} mt-0.5`}>{k.val}</div>
                <div className="text-[10px] text-stone-300 font-medium">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Split Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Live CRT Placements */}
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-white/10">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-orange-400" />
                  Upcoming Placement Drives
                </span>
                <span className="text-[10px] text-orange-400 font-bold cursor-pointer hover:underline">View All</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Google Cloud Platform', role: 'Software Engineer', ctc: '₹38.5 LPA' },
                  { name: 'Microsoft IDC', role: 'Full Stack Dev', ctc: '₹44.0 LPA' },
                ].map((co, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5 border border-white/5">
                    <div>
                      <div className="font-bold text-white">{co.name}</div>
                      <div className="text-[10px] text-stone-400">{co.role}</div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-xs">{co.ctc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sudden Circulars Alert */}
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-white/10">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  Flash Institutional Circulars
                </span>
                <span className="text-[10px] text-rose-400 font-bold font-mono">FLASH NOTICE</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs">
                  <div className="font-bold text-rose-300">Semester Exam Hall Tickets Released</div>
                  <div className="text-[10px] text-stone-300 mt-0.5">Download admit cards with desk seat numbers from Exams node.</div>
                </div>
                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-xs">
                  <div className="font-bold text-orange-300">Campus Hackathon 2026 Registration</div>
                  <div className="text-[10px] text-stone-300 mt-0.5">48-hour inter-collegiate coding sprint. Cash prize ₹2,50,000.</div>
                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardPreview;
