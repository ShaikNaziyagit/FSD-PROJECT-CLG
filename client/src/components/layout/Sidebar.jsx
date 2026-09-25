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
      className={`relative hidden md:flex flex-col shrink-0 transition-all duration-300 z-30 border-r border-white/15 glass-panel h-screen sticky top-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">
        <div className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}>
          <img src="/logo.svg" alt="CAMPII" className="w-8 h-8 object-contain shrink-0" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white">
                CAMPII
              </span>
              <span className="text-[9px] text-orange-400 font-mono tracking-wider font-bold">ECOSYSTEM v3.0</span>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto my-2 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
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
                flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative
                ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500/25 via-amber-500/15 to-transparent text-orange-200 border border-orange-500/40 shadow-lg shadow-orange-500/15 font-bold'
                    : 'text-slate-200 hover:text-white hover:bg-white/10 border border-transparent'
                }
                ${collapsed ? 'justify-center px-0' : ''}
              `}
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-orange-400' : 'text-slate-300 group-hover:text-white'
                    }`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span
                      className={`ml-auto text-[8px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        item.badge === 'FLASH' || item.badge === 'SOS'
                          ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 animate-pulse'
                          : 'bg-orange-500/25 text-orange-200 border border-orange-400/40'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-orange-500 rounded-r-full shadow-[0_0_8px_#f97316]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* User Status Footer */}
      <div className="p-3 border-t border-white/10 mt-auto bg-black/40">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-orange-400/60 shrink-0"
          />
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <p className="text-[9px] text-orange-300 font-mono truncate uppercase font-semibold">{user?.role} • {user?.department}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
