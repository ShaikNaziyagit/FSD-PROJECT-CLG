import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  User, 
  LayoutDashboard, 
  ShieldCheck, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import CampiiLogo from '../common/CampiiLogo';
import GlassButton from '../common/GlassButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Campus Quad', path: '/' },
    { label: 'Features', path: '/#features' },
    { label: 'Ecosystem', path: '/#ecosystem' },
    { label: 'How It Works', path: '/#workflow' },
    { label: 'Live Console', path: '/#preview' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 z-50 transition-all duration-300 max-w-7xl mx-auto">
      <div
        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
          scrolled
            ? 'glass-nav-floating shadow-2xl py-2.5 border-orange-500/35'
            : 'glass-nav-floating'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo: CAMPII White and Orange Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <CampiiLogo size={36} showWordmark={true} />
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-500/20 text-orange-200 border border-orange-400/40">
              v3.0 3D CAMPUS
            </span>
          </Link>

          {/* Desktop Navigation Links — High Contrast White & Orange */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  if (item.path.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }
                }}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-bold rounded-xl text-slate-100 hover:text-orange-300 hover:bg-white/10 transition-all cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User & Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setProfileDropdownOpen(false);
                    }}
                    className="relative p-2 rounded-xl bg-stone-900/80 border border-white/15 text-slate-100 hover:text-white hover:border-orange-400/50 transition-all shadow-sm"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-[10px] font-black text-black flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Dropdown Content */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel p-4 shadow-2xl border border-orange-500/30 animate-in fade-in zoom-in-95 z-50">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="text-sm font-bold text-white">Campus Notifications</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-orange-400 font-bold hover:underline"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-2">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-slate-300 text-center py-6">No notifications yet</p>
                        ) : (
                          notifications.slice(0, 5).map((n) => (
                            <div
                              key={n._id}
                              onClick={() => {
                                markAsRead(n._id);
                                if (n.link) navigate(n.link);
                                setNotificationsOpen(false);
                              }}
                              className={`p-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                                n.isRead ? 'bg-white/5 text-slate-200' : 'bg-orange-500/15 text-white border border-orange-400/30'
                              } hover:bg-white/15`}
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

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(!profileDropdownOpen);
                      setNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-stone-900/80 border border-white/15 hover:border-orange-400/60 shadow-sm transition-all"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                      alt={user?.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-orange-400/60"
                    />
                    <span className="text-xs font-bold text-white">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel p-2 shadow-2xl border border-orange-500/30 animate-in fade-in zoom-in-95 z-50">
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-300 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-200 border border-orange-400/40">
                          {user?.role}
                        </span>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-orange-400" />
                        <span>Operating Dashboard</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>Profile & Settings</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-orange-300 hover:bg-orange-500/20 rounded-xl transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                          <span>Admin Control Console</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 rounded-xl transition-colors mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>

                <Link to="/dashboard">
                  <GlassButton variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                    Open Hub
                  </GlassButton>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/login">
                  <GlassButton variant="ghost" size="sm">
                    Sign In
                  </GlassButton>
                </Link>
                <Link to="/signup">
                  <GlassButton variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                    Join CAMPII
                  </GlassButton>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-stone-900/80 border border-white/15 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-2 animate-in fade-in">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => {
                  if (item.path.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }
                }}
                className="block px-3 py-2 text-xs font-bold text-slate-100 hover:text-white hover:bg-white/10 rounded-xl"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 rounded-xl bg-orange-500/20 text-orange-200 font-bold text-xs border border-orange-400/40"
                  >
                    Open Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center py-2 rounded-xl bg-amber-500/20 text-amber-200 font-bold text-xs border border-amber-400/40"
                    >
                      Admin Console
                    </Link>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 rounded-xl bg-white/10 text-white font-bold text-xs border border-white/15"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
