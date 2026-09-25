import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import CampiiLogo from '../../components/common/CampiiLogo';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative select-none">
      
      {/* Back to Home Navigation Button */}
      <div className="fixed top-5 left-5 z-20">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-white/15 text-xs font-bold text-white hover:text-orange-400 shadow-lg backdrop-blur-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 group mb-2">
          <CampiiLogo size={46} showWordmark={true} />
        </Link>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
          Reset Security Key
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-300 font-medium">
          We will send recovery instructions to your verified campus email
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <GlassCard className="p-7 sm:p-9 shadow-2xl border-white/20 backdrop-blur-2xl">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Recovery Link Dispatched</h3>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xs mx-auto">
                If an account exists for <span className="text-orange-300 font-bold font-mono">{email}</span>, a secure password reset token has been sent.
              </p>
              <Link to="/login" className="block pt-2">
                <GlassButton variant="primary" size="md" className="w-full font-bold">
                  Return to Sign In
                </GlassButton>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Campus Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@campii.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 font-medium"
                  />
                </div>
              </div>

              <GlassButton type="submit" variant="primary" size="md" className="w-full font-bold">
                Dispatch Reset Link
              </GlassButton>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-orange-400"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
