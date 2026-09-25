import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import FlashTicker from '../common/FlashTicker';
import CampiiLogo from '../common/CampiiLogo';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Bell,
  Search,
  Menu,
  X,
  Sparkles,
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
  LogOut,
  Briefcase,
  CreditCard,
  FileText,
  Calculator,
  ShieldAlert,
} from 'lucide-react';

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const { user, logout, isAdmin } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Placements & CRT', path: '/placements', icon: Briefcase, badge: 'HOT' },
    { label: 'Sudden Circulars', path: '/circulars', icon: Megaphone, badge: 'FLASH' },
    { label: 'Fee Payments', path: '/fees', icon: CreditCard },
    { label: 'Exams & Hall Ticket', path: '/exams', icon: FileText },
    { label: 'Semesters & CGPA', path: '/semesters', icon: Calculator },
    { label: 'Academics', path: '/academics', icon: GraduationCap },
    { label: 'Events & Fests', path: '/events', icon: Calendar },
    { label: 'Lost & Found', path: '/lost-found', icon: Search },
    { label: 'Safety & Vigilance', path: '/campus-safety', icon: ShieldAlert, badge: 'SOS' },
    { label: 'Opportunities', path: '/opportunities', icon: Compass },
    { label: 'Clubs', path: '/clubs', icon: Users },
    { label: 'Resources & Labs', path: '/resources', icon: Layers },
    { label: 'Community Feed', path: '/community', icon: MessageSquare },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  if (isAdmin) {
    navItems.push({ label: 'Admin Console', path: '/admin', icon: ShieldCheck, badge: 'ROOT' });
  }

  return (
    <div className="flex min-h-screen bg-transparent text-slate-100">
      {/* Desktop Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Flash Emergency Alert Ticker */}
        <FlashTicker />

        {/* Top App Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/15 glass-panel px-4 lg:px-8 flex items-center justify-between backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {/* Mobile drawer button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl bg-stone-900/80 border border-white/15 text-slate-200 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Current Campus Layer Indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_#f97316]" />
              <span className="text-xs font-mono font-bold uppercase text-orange-300 hidden sm:inline-block">
                CAMPII 3D NODE // {user?.department || 'Main Campus'} • {user?.studentId || 'FACULTY'}
              </span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3">
            {/* Notification Menu */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl bg-stone-900/80 border border-white/15 text-slate-200 hover:text-white hover:border-orange-400/50 transition-all shadow-sm"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-[10px] font-black text-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel p-4 shadow-2xl border border-orange-500/30 animate-in fade-in zoom-in-95 z-50">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-sm font-bold text-white">System Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-orange-400 font-bold hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-300 text-center py-6">No notifications</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n._id}
                          onClick={() => {
                            markAsRead(n._id);
                            if (n.link) navigate(n.link);
                            setNotificationsOpen(false);
                          }}
                          className={`p-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                            n.isRead ? 'bg-white/5 text-slate-200' : 'bg-orange-500/20 text-white border border-orange-400/30'
                          } hover:bg-white/10`}
                        >
                          <div className="font-bold mb-0.5 text-white">{n.title}</div>
                          <div className="text-slate-300 text-[11px] line-clamp-2">{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Profile Pill */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-stone-900/80 border border-white/15 hover:border-orange-400/60 shadow-sm transition-all"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-orange-400/60"
              />
              <span className="text-xs font-bold text-white hidden sm:inline-block">
                {user?.name?.split(' ')[0]}
              </span>
            </Link>

            {/* Disconnect / Logout */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 transition-all shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Route View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <div className="relative w-72 glass-panel border-r border-white/15 h-full p-4 flex flex-col z-10 animate-in slide-in-from-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <CampiiLogo size={32} showWordmark={true} />
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold ${
                      isActive
                        ? 'bg-orange-500/20 text-orange-200 border border-orange-400/40 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[8px] font-mono px-1 py-0.5 rounded bg-orange-500/20 text-orange-200 font-bold border border-orange-400/40">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 mt-auto">
              <button
                onClick={() => {
                  logout();
                  setMobileDrawerOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/20 text-rose-200 border border-rose-500/30 text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect Node</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
