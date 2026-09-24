import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import FlashTicker from '../common/FlashTicker';
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
    <div className="flex min-h-screen bg-[#050713] text-slate-100 tech-grid-bg">
      {/* Desktop Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Flash Emergency Alert Ticker */}
        <FlashTicker />

        {/* Top App Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/10 glass-panel px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile drawer button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Current Campus Layer Indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono uppercase text-slate-400 hidden sm:inline-block">
                CampusOS Node // {user?.department || 'Main Campus'} • {user?.studentId || 'FACULTY'}
              </span>
            </div>
          </div>

          {/* Right Header Utilities */}
          <div className="flex items-center gap-3">
            {/* Notification Menu */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl bg-slate-800/60 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-[10px] font-bold text-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel p-4 shadow-glass-glow border border-indigo-500/30 animate-in fade-in zoom-in-95 z-50">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span className="text-sm font-semibold text-white">System Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-cyan-400 hover:underline"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">No notifications</p>
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
                            n.isRead ? 'bg-white/5 text-slate-300' : 'bg-cyan-500/10 text-white border border-cyan-500/20'
                          } hover:bg-white/10`}
                        >
                          <div className="font-semibold mb-0.5">{n.title}</div>
                          <div className="text-slate-400 text-[11px] line-clamp-2">{n.message}</div>
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
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-800/60 border border-white/10 hover:border-cyan-400/40 transition-all"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                alt={user?.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-cyan-400/40"
              />
              <span className="text-xs font-medium text-slate-200 hidden sm:inline-block">
                {user?.name?.split(' ')[0]}
              </span>
            </Link>

            {/* Disconnect / Logout */}
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all"
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-72 bg-[#080d1e] border-r border-white/10 h-full p-4 flex flex-col z-10 animate-in slide-in-from-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="CampusOS" className="w-6 h-6" />
                <span className="font-extrabold text-white">CampusOS</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
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
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[8px] font-mono px-1 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
