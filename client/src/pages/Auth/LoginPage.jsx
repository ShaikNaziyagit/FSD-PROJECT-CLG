import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Demo account quick fill helpers
  const fillStudentDemo = () => {
    setEmail('student@campusos.demo');
    setPassword('CampusOS@2026');
    setError('');
  };

  const fillAdminDemo = () => {
    setEmail('admin@campusos.demo');
    setPassword('CampusOS@2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#050713] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-indigo-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#050713] rounded-[9px] flex items-center justify-center">
              <img src="/logo.svg" alt="CampusOS" className="w-6 h-6" />
            </div>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Campus<span className="text-cyan-400">OS</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Sign in to your Campus Node
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Enter your academic credentials to synchronize with campus systems
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard className="p-8 shadow-glass-glow border-indigo-500/20">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@campusos.demo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full mt-2"
              icon={ArrowRight}
              iconPosition="right"
            >
              {loading ? 'Authenticating...' : 'Sign In to CampusOS'}
            </GlassButton>
          </form>

          {/* 1-Click Demo Logins */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <span className="block text-[11px] font-mono text-slate-400 text-center uppercase tracking-wider mb-3">
              One-Click Demo Evaluator Logins
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={fillStudentDemo}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 text-xs text-cyan-300 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Demo Student</span>
              </button>
              <button
                type="button"
                onClick={fillAdminDemo}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/25 text-xs text-purple-300 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have a campus node yet?{' '}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold underline">
              Create an account
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginPage;
