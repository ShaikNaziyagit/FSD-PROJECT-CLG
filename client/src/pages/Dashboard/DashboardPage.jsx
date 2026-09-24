import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  GraduationCap,
  Calendar,
  Compass,
  Users,
  Megaphone,
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Bookmark,
  Sparkles,
  ExternalLink,
  Briefcase,
  CreditCard,
  FileText,
  Calculator,
  Search,
  ShieldAlert,
  Flame,
  Award,
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [circulars, setCirculars] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [fees, setFees] = useState([]);
  const [exams, setExams] = useState([]);
  const [lostFound, setLostFound] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          subRes,
          assignRes,
          evRes,
          oppRes,
          circRes,
          placeRes,
          feeRes,
          examRes,
          lfRes,
        ] = await Promise.all([
          api.get('/academics/subjects').catch(() => ({ data: [] })),
          api.get('/academics/assignments').catch(() => ({ data: [] })),
          api.get('/events?limit=3').catch(() => ({ data: [] })),
          api.get('/opportunities?limit=3').catch(() => ({ data: [] })),
          api.get('/circulars').catch(() => ({ data: [] })),
          api.get('/placements').catch(() => ({ data: [] })),
          api.get('/fees').catch(() => ({ data: [] })),
          api.get('/exams').catch(() => ({ data: [] })),
          api.get('/lost-found').catch(() => ({ data: [] })),
        ]);

        if (subRes.data) setSubjects(subRes.data);
        if (assignRes.data) setAssignments(assignRes.data);
        if (evRes.data) setEvents(evRes.data);
        if (oppRes.data) setOpportunities(oppRes.data);
        if (circRes.data) setCirculars(circRes.data);
        if (placeRes.data) setPlacements(placeRes.data);
        if (feeRes.data) setFees(feeRes.data);
        if (examRes.data) setExams(examRes.data);
        if (lfRes.data) setLostFound(lfRes.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute Greeting based on local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const avgAttendance = subjects.length
    ? Math.round(subjects.reduce((acc, s) => acc + (s.attendanceRate || 0), 0) / subjects.length)
    : 88;

  const pendingAssignments = assignments.filter((a) => a.status === 'pending').length;
  const pendingFees = fees.filter((f) => f.status === 'Pending');
  const totalPendingFeeAmount = pendingFees.reduce((acc, f) => acc + f.amount, 0);

  if (loading) {
    return <LoadingSpinner size="lg" label="Synchronizing CampusOS Node Metrics..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Operating Greeting Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-indigo-500/20 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SYSTEM NODE ACTIVE // ROLL: {user?.studentId || '22BCSE1042'}
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {getGreeting()},{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                {user?.name?.split(' ')[0] || 'Scholar'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Semester 6 • {user?.department || 'Computer Science & Engineering'}. Here is your live campus operational intelligence briefing.
            </p>
          </div>

          {/* Quick Hub Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/placements">
              <GlassButton variant="primary" size="sm" icon={Briefcase}>
                Placements & CRT
              </GlassButton>
            </Link>
            <Link to="/circulars">
              <GlassButton variant="secondary" size="sm" icon={Megaphone}>
                Sudden Circulars
              </GlassButton>
            </Link>
            <Link to="/campus-safety">
              <GlassButton variant="danger" size="sm" icon={ShieldAlert}>
                Campus SOS
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={TrendingUp}
          label="Attendance Threshold"
          value={`${avgAttendance}%`}
          change={avgAttendance >= 75 ? 'Safe (>75% rule)' : 'Shortage Alert'}
          changeType={avgAttendance >= 75 ? 'positive' : 'negative'}
          color="cyan"
        />
        <StatCard
          icon={Award}
          label="Placement Clearance"
          value="94.6%"
          change="Highest: ₹44.5 LPA"
          changeType="positive"
          color="purple"
        />
        <StatCard
          icon={CreditCard}
          label="Fee Dues Balance"
          value={totalPendingFeeAmount > 0 ? `₹${totalPendingFeeAmount.toLocaleString()}` : 'Cleared'}
          change={totalPendingFeeAmount > 0 ? 'Pay before deadline' : 'Zero dues'}
          changeType={totalPendingFeeAmount > 0 ? 'negative' : 'positive'}
          color="rose"
        />
        <StatCard
          icon={Clock}
          label="Pending Submissions"
          value={pendingAssignments}
          change={pendingAssignments === 0 ? 'All cleared' : 'Action required'}
          changeType={pendingAssignments === 0 ? 'positive' : 'neutral'}
          color="emerald"
        />
      </div>

      {/* Quick Access Action Deck */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Placements & CRT', path: '/placements', icon: Briefcase, color: 'text-cyan-400', badge: 'Drives' },
          { label: 'Sudden Circulars', path: '/circulars', icon: Megaphone, color: 'text-rose-400', badge: 'Flash' },
          { label: 'Fee Payments', path: '/fees', icon: CreditCard, color: 'text-emerald-400', badge: 'Pay' },
          { label: 'Exams & Admit Card', path: '/exams', icon: FileText, color: 'text-indigo-400', badge: 'Hall Ticket' },
          { label: 'Semesters & CGPA', path: '/semesters', icon: Calculator, color: 'text-purple-400', badge: 'Calc' },
          { label: 'Lost & Belongings', path: '/lost-found', icon: Search, color: 'text-amber-400', badge: 'Claims' },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="p-3.5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="text-xs font-semibold text-white leading-tight">
              {item.label}
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
              {item.badge}
            </span>
          </Link>
        ))}
      </div>

      {/* Middle Grid: Placements Spotlight & Sudden Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Placements Spotlight */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Campus Placement Drives & CRT Sprints</span>
            </h2>
            <Link to="/placements" className="text-xs text-cyan-400 hover:underline">
              View All Drives →
            </Link>
          </div>

          <div className="space-y-3">
            {placements.slice(0, 3).map((drive) => (
              <GlassCard key={drive._id} hoverEffect className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={drive.logo}
                    alt={drive.companyName}
                    className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/10 bg-white/5 shrink-0"
                  />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{drive.companyName}</h4>
                      <Badge variant="cyan" size="xs">
                        {drive.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-300">{drive.role}</p>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      Drive: {new Date(drive.driveDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm font-mono font-bold text-cyan-300 block">
                    {drive.ctc}
                  </span>
                  <Link to="/placements">
                    <span className="text-[11px] text-cyan-400 hover:underline font-semibold mt-1 inline-block">
                      Apply Now →
                    </span>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Sudden Circulars & Alerts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-rose-400" />
              <span>Sudden Circulars & Official Notices</span>
            </h2>
            <Link to="/circulars" className="text-xs text-rose-400 hover:underline">
              Gazette →
            </Link>
          </div>

          <div className="space-y-3">
            {circulars.slice(0, 3).map((circ) => (
              <GlassCard
                key={circ._id}
                hoverEffect
                className={`p-4 ${
                  circ.priority === 'Flash Emergency'
                    ? 'border-rose-500/40 bg-gradient-to-r from-rose-950/20 to-transparent'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Badge
                    variant={
                      circ.priority === 'Flash Emergency'
                        ? 'rose'
                        : circ.priority === 'Urgent'
                        ? 'amber'
                        : 'cyan'
                    }
                    size="xs"
                  >
                    {circ.priority}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(circ.effectiveDate).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                  {circ.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {circ.summary}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Exams Timetable & Lost/Found Belongings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Exams Timetable Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>Upcoming Semester Exams</span>
            </h2>
            <Link to="/exams" className="text-xs text-indigo-400 hover:underline">
              Digital Hall Ticket →
            </Link>
          </div>

          <div className="space-y-3">
            {exams.slice(0, 2).map((exam) => (
              <GlassCard key={exam._id} hoverEffect className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-cyan-300 font-bold px-1.5 py-0.5 rounded bg-cyan-500/10">
                      {exam.subjectCode}
                    </span>
                    <Badge variant="purple" size="xs">
                      {exam.examType}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{exam.subjectName}</h4>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {exam.hallNumber} • Slot: {exam.session}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-cyan-300 font-bold block">
                    {new Date(exam.date).toLocaleDateString()}
                  </span>
                  <Link to="/exams">
                    <span className="text-[10px] text-amber-300 font-mono block mt-1">
                      Desk: D-14 (View)
                    </span>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Lost & Found Belongings Preview */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-400" />
              <span>Lost Belongings & Found Items</span>
            </h2>
            <Link to="/lost-found" className="text-xs text-amber-400 hover:underline">
              Lost & Found Board →
            </Link>
          </div>

          <div className="space-y-3">
            {lostFound.slice(0, 2).map((item) => (
              <GlassCard key={item._id} hoverEffect className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.type === 'Lost' ? 'rose' : 'emerald'} size="xs">
                      {item.type}
                    </Badge>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h4>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {item.location}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <Link to="/lost-found">
                    <GlassButton variant="primary" size="sm">
                      {item.type === 'Lost' ? 'I Found This' : 'Claim'}
                    </GlassButton>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
