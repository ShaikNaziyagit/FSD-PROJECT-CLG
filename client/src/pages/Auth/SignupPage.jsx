import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import CampiiLogo from '../../components/common/CampiiLogo';
import { User, Mail, Lock, Building, Calendar, CreditCard, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: 'CSE',
    year: '3rd Year',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-white/15 text-xs font-bold text-white hover:text-orange-400 shadow-lg backdrop-blur-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus Quad</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-3 group mb-2">
          <CampiiLogo size={46} showWordmark={true} />
        </Link>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
          Provision Your CAMPII Node
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-stone-300 font-medium">
          Join the centralized 3D operating ecosystem for higher education
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <GlassCard className="p-7 sm:p-9 shadow-2xl border-white/20 backdrop-blur-2xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center gap-2.5 text-xs font-bold text-rose-200 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Roll / Student ID
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="22BCSE1042"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 font-mono font-medium"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex.rivera@campii.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-500/20 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Academic Department
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-400 font-medium"
                  >
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="AI & DS">Artificial Intelligence & Data Science</option>
                    <option value="MBA">School of Management (MBA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Academic Standing
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-white/15 text-sm text-white focus:outline-none focus:border-orange-400 font-medium"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Post-Graduate">Post-Graduate Scholar</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono tracking-wide mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    type="password"
                    required
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-type password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/80 border border-white/15 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 font-medium"
                  />
                </div>
              </div>
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full mt-4 font-bold"
              icon={ArrowRight}
              iconPosition="right"
            >
              {loading ? 'Initializing Node...' : 'Provision CAMPII Account'}
            </GlassButton>
          </form>

          <div className="mt-6 text-center text-xs font-medium text-stone-300">
            Already have an active campus node?{' '}
            <Link to="/login" className="text-orange-400 hover:text-orange-300 font-bold underline">
              Sign In to Console
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default SignupPage;
