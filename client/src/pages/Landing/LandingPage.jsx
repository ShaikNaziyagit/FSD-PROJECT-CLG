import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CampusEcosystemMap from '../../components/common/CampusEcosystemMap';
import DashboardPreview from '../../components/common/DashboardPreview';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import CampiiLogo from '../../components/common/CampiiLogo';
import api from '../../services/api';
import {
  ArrowRight,
  GraduationCap,
  Calendar,
  Compass,
  Users,
  Megaphone,
  Layers,
  MessageSquare,
  Shield,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  Briefcase,
  CreditCard,
  FileText,
  Calculator,
  Search,
  ShieldAlert,
  ArrowUpRight,
  UserCheck,
  Building,
  Activity,
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';

const LandingPage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredOpportunities, setFeaturedOpportunities] = useState([]);

  useEffect(() => {
    const loadPreviewData = async () => {
      try {
        const [eventsRes, oppsRes] = await Promise.all([
          api.get('/events?limit=3'),
          api.get('/opportunities?limit=3'),
        ]);
        if (eventsRes?.success && eventsRes?.data) setFeaturedEvents(eventsRes.data.slice(0, 3));
        if (oppsRes?.success && oppsRes?.data) setFeaturedOpportunities(oppsRes.data.slice(0, 3));
      } catch (err) {
        // Safe graceful fallback
      }
    };
    loadPreviewData();
  }, []);

  const featureCards = [
    {
      title: 'Academics & CGPA',
      description: 'Manage subjects, timetables, digital assignments, attendance thresholds, and real-time CGPA calculator.',
      icon: GraduationCap,
      color: '#f97316',
      path: '/academics',
      tag: 'Core Hub',
    },
    {
      title: 'Exams & Hall Tickets',
      description: 'Automated mid-term and semester schedules, scannable digital admit cards, and live desk seating allocations.',
      icon: FileText,
      color: '#f59e0b',
      path: '/exams',
      tag: 'Hall Ticket Ready',
    },
    {
      title: 'Placements & CRT',
      description: 'Discover Tier-1 recruitment drives (Google, Microsoft, Oracle), aptitude sprints, and direct mock interviews.',
      icon: Briefcase,
      color: '#ea580c',
      path: '/placements',
      tag: 'Tier-1 Drives',
    },
    {
      title: 'Events & Hackathons',
      description: 'Find hackathons, workshops, cultural fests, tech symposiums, and inter-collegiate competitions.',
      icon: Calendar,
      color: '#fbbf24',
      path: '/events',
      tag: 'Cultural & Tech',
    },
    {
      title: 'Peer Community',
      description: 'Connect with students, clubs, technical forums, batch discussions, and departmental updates.',
      icon: Users,
      color: '#fdba74',
      path: '/community',
      tag: 'Peer Feeds',
    },
    {
      title: 'Digital Labs & Notes',
      description: 'Access verified study materials, lab manuals, past question archives, and research papers.',
      icon: Layers,
      color: '#d97706',
      path: '/resources',
      tag: 'Digital Repository',
    },
    {
      title: 'Campus SOS & Safety',
      description: '24/7 security dispatch, emergency alert broadcast beacons, and instant warden contact SOS.',
      icon: ShieldAlert,
      color: '#ef4444',
      path: '/campus-safety',
      tag: '24/7 Monitored',
    },
    {
      title: 'Opportunities',
      description: 'Handpicked internships, research fellowships, competitions, and merit scholarships updated live.',
      icon: Compass,
      color: '#fb923c',
      path: '/opportunities',
      tag: 'Career Growth',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Discover',
      tagline: 'Comprehensive Visibility',
      description: 'Explore live placement drives, class timetables, and campus happenings across academic streams.',
      color: 'text-orange-400',
      badgeVariant: 'orange',
    },
    {
      step: '02',
      title: 'Connect',
      tagline: 'Cross-Campus Network',
      description: 'Interact with faculty mentors, student clubs, study circles, and corporate recruiters.',
      color: 'text-amber-400',
      badgeVariant: 'amber',
    },
    {
      step: '03',
      title: 'Manage',
      tagline: 'Intelligent Control',
      description: 'Keep track of attendance thresholds, admit cards, fee balances, and assignment deadlines.',
      color: 'text-orange-500',
      badgeVariant: 'orange',
    },
    {
      step: '04',
      title: 'Excel',
      tagline: 'Accelerate Potential',
      description: 'Land dream job offers, win hackathon prizes, and graduate with stellar academic distinction.',
      color: 'text-emerald-400',
      badgeVariant: 'emerald',
    },
  ];

  return (
    <div className="relative min-h-screen text-white bg-transparent selection:bg-orange-500/30 selection:text-orange-200">
      
      {/* Floating Glassmorphic Navbar */}
      <Navbar />

      {/* SECTION 1 — HERO SECTION ON 3D CAMPUS */}
      <section id="hero" className="relative min-h-screen flex items-center pt-28 sm:pt-36 pb-16 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Product Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-400/40 shadow-[0_0_15px_rgba(249,115,22,0.25)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                <span className="text-xs font-bold text-orange-300 tracking-wider font-mono uppercase">
                  CAMPII 3D • NEXT-GEN CAMPUS OS
                </span>
              </div>

              {/* Main Headline — High Contrast */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                One Campus.{' '}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent block mt-1 drop-shadow-md">
                  Every Connection.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Connect students, faculty, academics, placement drives, exams, and campus life through one intelligent 3D-powered digital operating system.
              </p>

              {/* Primary & Secondary Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/signup" className="w-full sm:w-auto">
                  <GlassButton
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="w-full font-bold"
                  >
                    Enter CAMPII
                  </GlassButton>
                </Link>
                <a
                  href="#ecosystem"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto"
                >
                  <GlassButton
                    variant="secondary"
                    size="lg"
                    className="w-full font-bold"
                  >
                    Explore 3D Ecosystem
                  </GlassButton>
                </a>
              </div>

              {/* Status metrics pill */}
              <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/15 max-w-md mx-auto lg:mx-0 text-left">
                <div className="glass-panel p-3 rounded-2xl border border-white/15 shadow-sm">
                  <div className="text-lg sm:text-xl font-black text-white font-mono">100%</div>
                  <div className="text-[11px] font-bold text-orange-300">Unified Cloud</div>
                </div>
                <div className="glass-panel p-3 rounded-2xl border border-white/15 shadow-sm">
                  <div className="text-lg sm:text-xl font-black text-orange-400 font-mono">Realtime</div>
                  <div className="text-[11px] font-bold text-stone-300">Campus Sync</div>
                </div>
                <div className="glass-panel p-3 rounded-2xl border border-white/15 shadow-sm">
                  <div className="text-lg sm:text-xl font-black text-amber-300 font-mono">60 FPS</div>
                  <div className="text-[11px] font-bold text-amber-300">3D Campus</div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 3D Campus Radar & Live Telemetry HUD */}
            <div className="lg:col-span-6 relative">
              
              <GlassCard className="p-6 sm:p-7 border border-white/20 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_10px_#f97316]" />
                    <span className="text-xs font-mono font-bold text-orange-300 uppercase tracking-widest">
                      CAMPUS 3D TELEMETRY HUB
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-400/40">
                    ALL 6 WINGS NOMINAL
                  </span>
                </div>

                {/* Campus Buildings Quick Telemetry Deck */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { name: 'Admin Citadel', wing: 'Central Tower', status: 'Online', icon: Building, color: 'text-orange-400' },
                    { name: 'Tech Complex', wing: 'CS & IT Wing', status: 'Active', icon: Zap, color: 'text-amber-400' },
                    { name: 'Central Library', wing: 'Reading Rotunda', status: 'Open', icon: Layers, color: 'text-orange-300' },
                    { name: 'Careers & CRT', wing: 'Placement Hub', status: '3 Drives', icon: Briefcase, color: 'text-emerald-400' },
                    { name: 'Student Quad', wing: 'Auditorium', status: 'Event Live', icon: Calendar, color: 'text-amber-400' },
                    { name: 'Safety Control', wing: 'SOS Dispatch', status: '24/7 Watch', icon: Shield, color: 'text-rose-400' },
                  ].map((b, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-400/40 transition-all group">
                      <b.icon className={`w-4 h-4 ${b.color} mb-1.5 group-hover:scale-110 transition-transform`} />
                      <div className="text-xs font-bold text-white leading-tight">{b.name}</div>
                      <div className="text-[10px] text-stone-300 mt-0.5">{b.wing}</div>
                      <div className="text-[9px] font-mono font-bold text-orange-300 mt-1">{b.status}</div>
                    </div>
                  ))}
                </div>

                {/* Live Campus Feed Ticker */}
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Live Campus Activity Feed</span>
                    <span className="text-orange-400 text-[10px] font-bold">SYNCED</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                    <span className="text-white font-medium">Google SDE Placement Drive</span>
                    <span className="font-mono text-emerald-400 font-bold">₹38.5 LPA</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-white font-medium">Semester Hall Tickets Issued</span>
                    <span className="font-mono text-orange-400 font-bold">Desk Allocated</span>
                  </div>
                </div>

                {/* Quick Launch Buttons */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <Link to="/placements" className="flex-1">
                    <GlassButton variant="secondary" size="sm" className="w-full text-xs">
                      Placements Hub
                    </GlassButton>
                  </Link>
                  <Link to="/exams" className="flex-1">
                    <GlassButton variant="outline" size="sm" className="w-full text-xs">
                      Admit Cards
                    </GlassButton>
                  </Link>
                </div>
              </GlassCard>

              {/* Floating Luminous Badges */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-30 animate-pulse">
                <Badge variant="orange" size="sm">
                  3D Buildings Active
                </Badge>
              </div>
              <div className="absolute -bottom-4 left-6 z-30">
                <Badge variant="amber" size="sm">
                  CAMPUSOS v3.0
                </Badge>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — CAMPUS ECOSYSTEM: "A Campus That Works Together" */}
      <section id="ecosystem" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <Badge variant="orange">Ecosystem Architecture</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              A Campus That Works Together.
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Students, faculty, deans, placement coordinators, and campus facilities communicate harmoniously through CAMPII’s digital nexus.
            </p>
          </div>

          {/* Interactive Ecosystem Map Visual */}
          <CampusEcosystemMap />

        </div>
      </section>

      {/* SECTION 3 — "EVERYTHING CONNECTED" (FEATURES) */}
      <section id="features" className="py-20 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="orange">Unified Capabilities</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Everything Connected.
            </h2>
            <p className="text-stone-200 text-base leading-relaxed">
              One unified intelligent ecosystem for every dimension of campus life. No more scattered circulars, lost exam notices, or clunky outdated legacy portals.
            </p>
          </div>

          {/* Responsive 4-Column Feature Grid with Deep Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link key={idx} to={item.path} className="group block">
                  <GlassCard
                    hoverEffect
                    className="p-6 h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                        style={{
                          backgroundColor: `${item.color}25`,
                          color: item.color,
                          border: `1px solid ${item.color}50`,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Header + Tag */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-orange-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                          {item.tag}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Action Link */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-orange-300 group-hover:text-orange-200">
                      <span>Launch module</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4 — HOW CAMPII WORKS */}
      <section id="workflow" className="py-20 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="amber">Frictionless Lifecycle</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              One Platform. Every Experience.
            </h2>
            <p className="text-stone-200 text-sm sm:text-base">
              Four streamlined steps to orchestrate your entire collegiate life.
            </p>
          </div>

          {/* 4-Step Interactive Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((st, i) => (
              <GlassCard key={i} className="p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-4xl font-black font-mono ${st.color} opacity-80`}>
                      {st.step}
                    </span>
                    <Badge variant={st.badgeVariant} size="xs">
                      {st.tagline}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">{st.description}</p>
                </div>
                
                <div className="mt-6 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Integrated live system</span>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 — CAMPUS DASHBOARD PREVIEW */}
      <section id="preview" className="py-20 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <Badge variant="orange">Student & Faculty Cockpit</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Everything you need, at a glance.
            </h2>
            <p className="text-stone-200 text-base leading-relaxed">
              A unified operating dashboard providing instant attendance analytics, real-time timetable changes, exam alerts, and placement pipelines.
            </p>
          </div>

          {/* Interactive Deep Glass Dashboard Mockup */}
          <DashboardPreview />

        </div>
      </section>

      {/* SECTION 6 — LIVE OPPORTUNITIES & EVENT BRIEFS */}
      <section className="py-20 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="orange">Campus Opportunities</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                Accelerate Career & Research
              </h2>
              <p className="text-stone-200 text-sm mt-1">
                Handpicked internships, hackathons, and corporate fellowship drives updated live.
              </p>
            </div>
            <Link to="/opportunities">
              <GlassButton variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Opportunities
              </GlassButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(featuredOpportunities.length > 0
              ? featuredOpportunities
              : [
                  {
                    title: 'Software Development Engineer Intern',
                    organization: 'Microsoft IDC',
                    category: 'Internships',
                    stipendOrPrize: '₹1,25,000 / month',
                    location: 'Hyderabad / Hybrid',
                  },
                  {
                    title: 'ISRO Satellite Telemetry Fellowship',
                    organization: 'Indian Space Research Org',
                    category: 'Scholarships',
                    stipendOrPrize: '₹45,000 / month',
                    location: 'UR Rao Centre',
                  },
                  {
                    title: 'Google Summer of Code Mentorship',
                    organization: 'Open Source Initiative',
                    category: 'Workshops',
                    stipendOrPrize: '$1,500 - $3,000 Stipend',
                    location: 'Remote',
                  },
                ]
            ).map((opp, idx) => (
              <GlassCard key={idx} hoverEffect className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="orange">{opp.category}</Badge>
                    <span className="text-xs text-stone-400 font-mono">{opp.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1 line-clamp-1">{opp.title}</h4>
                  <p className="text-xs text-stone-300 mb-4">{opp.organization}</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 font-mono">{opp.stipendOrPrize}</span>
                  <Link to="/opportunities" className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1">
                    Details <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7 — FINAL CALL TO ACTION */}
      <section className="py-24 relative z-10 overflow-hidden border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <Badge variant="orange">Join the Connected Campus</Badge>
          
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Your Campus Is More Than a Classroom.{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent block mt-1">
              One Campus. Every Connection.
            </span>
          </h2>

          <p className="text-stone-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Discover a smarter way to learn, collaborate, participate, and lead. Experience seamless academic tracking, placement drives, and student communities with CAMPII.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <GlassButton variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Join CAMPII Today
              </GlassButton>
            </Link>
            <Link to="/login">
              <GlassButton variant="secondary" size="lg">
                Sign In to Console
              </GlassButton>
            </Link>
          </div>

          <div className="pt-4 text-xs font-mono font-bold text-stone-400">
            Powered by CAMPII 3D Connected Campus Operating System.
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default LandingPage;
