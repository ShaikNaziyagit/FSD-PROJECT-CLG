import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  Compass,
  Users,
  Megaphone,
  Layers,
  MessageSquare,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CreditCard,
  FileText,
  Calculator,
  Search,
  ShieldAlert,
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, isAdmin } = useAuth();

  const navigationItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Placements & CRT', path: '/placements', icon: Briefcase, badge: 'DRIVES' },
    { label: 'Sudden Circulars', path: '/circulars', icon: Megaphone, badge: 'FLASH' },
    { label: 'Fee Payments', path: '/fees', icon: CreditCard },
    { label: 'Exams & Hall Ticket', path: '/exams', icon: FileText },
    { label: 'Semesters & CGPA', path: '/semesters', icon: Calculator },
    { label: 'My Academics', path: '/academics', icon: GraduationCap },
    { label: 'Campus Events', path: '/events', icon: Calendar },
    { label: 'Lost & Belongings', path: '/lost-found', icon: Search },
    { label: 'Safety & Vigilance', path: '/campus-safety', icon: ShieldAlert, badge: 'SOS' },
    { label: 'Opportunities', path: '/opportunities', icon: Compass },
    { label: 'Clubs & Societies', path: '/clubs', icon: Users },
    { label: 'Campus Facilities', path: '/resources', icon: Layers },
    { label: 'Community Feed', path: '/community', icon: MessageSquare },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  if (isAdmin) {
    navigationItems.push({
      label: 'Admin Console',
      path: '/admin',
      icon: ShieldCheck,
      badge: 'ROOT',
    });
  }

  return (
    <aside
      className={`relative hidden md:flex flex-col shrink-0 transition-all duration-300 z-30 border-r border-white/10 glass-panel h-screen sticky top-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
        <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shrink-0">
            <div className="w-full h-full bg-[#050713] rounded-[7px] flex items-center justify-center">
              <img src="/logo.svg" alt="CampusOS" className="w-5 h-5" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white">
                Campus<span className="text-cyan-400">OS</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-wider">ENTERPRISE v2.0</span>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto my-2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Expand sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative
                ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/15 to-transparent text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                }
                ${collapsed ? 'justify-center px-0' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-cyan-400 glow-cyan' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span
                      className={`ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        item.badge === 'FLASH' || item.badge === 'SOS'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-cyan-400 rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User Status Footer */}
      <div className="p-3 border-t border-white/10 mt-auto bg-black/30">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-cyan-400/40 shrink-0"
          />
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[9px] text-slate-400 font-mono truncate uppercase">{user?.role} • {user?.department}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
