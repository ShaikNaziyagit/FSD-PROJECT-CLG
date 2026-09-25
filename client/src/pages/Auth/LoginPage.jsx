import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import CampiiLogo from '../../components/common/CampiiLogo';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityKey, setSecurityKey] = useState('CAMPII-ROOT-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [landingDestination, setLandingDestination] = useState('/admin'); // '/admin' | '/dashboard'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (activeTab === 'admin' ? landingDestination : '/dashboard');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'admin' && securityKey.trim() !== 'CAMPII-ROOT-2026') {
        throw new Error('Invalid Institutional Security Key. Use demo key: CAMPII-ROOT-2026');
      }

      await login(email, password);
      const targetRoute = activeTab === 'admin' ? landingDestination : (location.state?.from?.pathname || '/dashboard');
      navigate(targetRoute, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your academic credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Switch to Student tab and prefill demo
  const handleSelectStudentTab = () => {
    setActiveTab('student');
    setEmail('student@campusos.demo');
    setPassword('CampusOS@2026');
    setError('');
  };

  // Switch to Admin tab and prefill demo
  const handleSelectAdminTab = () => {
    setActiveTab('admin');
    setEmail('admin@campusos.demo');
    setPassword('CampusOS@2026');
    setSecurityKey('CAMPII-ROOT-2026');
    setError('');
  };

  // Instant 1-Click One-Shot Admin Login
  const handleInstantAdminLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await login('admin@campusos.demo', 'CampusOS@2026');
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Instant Admin Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative select-none">
      
      {/* Back to Home Navigation Button */}
      <div className="fixed top-5 left-5 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-white/15 text-xs font-bold text-white hover:text-orange-300 shadow-lg backdrop-blur-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus Quad</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-4">
        <Link to="/" className="inline-flex items-center gap-3 group mb-3">
          <CampiiLogo size={46} showWordmark={true} />
        </Link>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
          {activeTab === 'admin' ? 'Institutional Administrator Gateway' : 'Sign In to CAMPII'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
          {activeTab === 'admin'
            ? 'Root clearance node for deans, department heads, and platform governors'
            : 'Enter your academic credentials to synchronize with campus systems'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <GlassCard className="p-6 sm:p-8 shadow-2xl border-white/20 backdrop-blur-2xl">
          
          {/* Dual Gateway Mode Switch (Student vs Institutional Admin) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-stone-950/80 border border-white/10 mb-6">
            <button
              type="button"
              onClick={handleSelectStudentTab}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-orange-500/25 text-orange-200 border border-orange-400/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-4 h-4 text-orange-400" />
              <span>Student / Scholar</span>
            </button>

            <button
              type="button"
              onClick={handleSelectAdminTab}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Super Admin Portal</span>
            </button>
          </div>

          {/* Admin Security Banner when Admin mode is active */}
          {activeTab === 'admin' && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <div>
                  <div className="font-mono font-bold text-amber-200 text-[11px] uppercase tracking-wider">
                    LEVEL 4 ROOT CLEARANCE
                  </div>
                  <div className="text-[10px] text-slate-300">Super Admin privileges will be verified</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleInstantAdminLogin}
                className="px-2.5 py-1 rounded-lg bg-orange-500/25 hover:bg-orange-500/35 text-[10px] font-mono font-bold text-orange-100 border border-orange-400/40 transition-colors"
                title="1-Click Instant Bypass for Demo Evaluators"
              >
                1-Click Root Login ⚡
              </button>
            </div>
          )}

          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center gap-2.5 text-xs font-bold text-rose-200 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wide mb-1.5 font-mono">
                {activeTab === 'admin' ? 'Institutional Admin Email' : 'Campus Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 'admin' ? 'admin@campusos.demo' : 'student@campusos.demo'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-orange-300 hover:text-orange-200 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Admin Security Key Verification */}
            {activeTab === 'admin' && (
              <div className="animate-in fade-in space-y-3 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-amber-300 uppercase tracking-wide font-mono flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      <span>Institutional Security Passcode</span>
                    </label>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
                      CAMPII-ROOT-2026
                    </span>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-amber-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={securityKey}
                      onChange={(e) => setSecurityKey(e.target.value)}
                      placeholder="CAMPII-ROOT-2026"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-amber-500/40 text-sm text-amber-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-mono tracking-wider"
                    />
                  </div>
                </div>

                {/* Direct Destination Selector */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wide mb-1.5 font-mono">
                    Post-Login Landing Console:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLandingDestination('/admin')}
                      className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        landingDestination === '/admin'
                          ? 'bg-amber-500/20 text-amber-200 border-amber-400/50 shadow-sm'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      Institutional Console (/admin)
                    </button>
                    <button
                      type="button"
                      onClick={() => setLandingDestination('/dashboard')}
                      className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                        landingDestination === '/dashboard'
                          ? 'bg-orange-500/20 text-orange-200 border-orange-400/50 shadow-sm'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                      }`}
                    >
                      Campus Overview (/dashboard)
                    </button>
                  </div>
                </div>
              </div>
            )}

            <GlassButton
              type="submit"
              variant={activeTab === 'admin' ? 'accent' : 'primary'}
              size="md"
              disabled={loading}
              className="w-full mt-3 font-bold"
              icon={ArrowRight}
              iconPosition="right"
            >
              {loading
                ? 'Authenticating Security Node...'
                : activeTab === 'admin'
                ? 'Authorize Admin Console'
                : 'Sign In to CAMPII'}
            </GlassButton>
          </form>

          {/* Quick Evaluator Helpers */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>1-Click Evaluator Auto-Fill</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Pre-configured Demo Nodes</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleSelectStudentTab}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-400/40 text-xs font-bold text-orange-200 transition-colors shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>Scholar Demo</span>
              </button>
              <button
                type="button"
                onClick={handleSelectAdminTab}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-xs font-bold text-amber-200 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Super Admin Demo</span>
              </button>
            </div>
          </div>

          {/* Security Telemetry Pill */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>TLS 1.3 Node Active</span>
            </span>
            <span className="text-orange-300 font-bold">256-Bit Encrypted</span>
          </div>

          <div className="mt-4 text-center text-xs font-medium text-slate-300">
            Don't have a campus node yet?{' '}
            <Link to="/signup" className="text-orange-300 hover:text-orange-200 font-bold underline">
              Create an account
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginPage;
