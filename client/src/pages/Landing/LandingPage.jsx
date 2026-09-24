import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CampusScene from '../../components/three/CampusScene';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
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
} from 'lucide-react';

const LandingPage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredOpportunities, setFeaturedOpportunities] = useState([]);

  useEffect(() => {
    // Load preview data from backend (with safe fallback if initial fetch)
    const loadPreviewData = async () => {
      try {
        const [eventsRes, oppsRes] = await Promise.all([
          api.get('/events?limit=3'),
          api.get('/opportunities?limit=3'),
        ]);
        if (eventsRes.success) setFeaturedEvents(eventsRes.data.slice(0, 3));
        if (oppsRes.success) setFeaturedOpportunities(oppsRes.data.slice(0, 3));
      } catch (err) {
        console.warn('Using default demo preview data.');
      }
    };
    loadPreviewData();
  }, []);

  const ecosystemModules = [
    {
      title: 'Placements & CRT Hub',
      description: 'Tier-1 company recruitment drives (Microsoft, Google), salary packages, and intensive aptitude & coding mock test sprints.',
      icon: Briefcase,
      color: 'cyan',
    },
    {
      title: 'Sudden Flash Circulars',
      description: 'Immediate official university advisories, emergency weather holidays, and real-time exam rescheduling bulletins.',
      icon: Megaphone,
      color: 'rose',
    },
    {
      title: 'Digital Fee Ledger',
      description: 'Pay semester tuition, exam, hostel & bus pass fees with 0% gateway charges and instant official verified PDF receipts.',
      icon: CreditCard,
      color: 'emerald',
    },
    {
      title: 'Exams & Digital Hall Ticket',
      description: 'Mid-term & semester timetables, digital admit card with scannable barcode, and live desk seating allotment lookup.',
      icon: FileText,
      color: 'indigo',
    },
    {
      title: 'Semesters & CGPA Engine',
      description: 'Semester 1 to 8 tracker, interactive SGPA/CGPA simulator, and smart 75% attendance safe-bunk compliance meter.',
      icon: Calculator,
      color: 'purple',
    },
    {
      title: 'Lost Belongings & Found Hub',
      description: 'Report lost cash, wallets, keys, smart devices, or calculators across campus and track claim verifications.',
      icon: Search,
      color: 'amber',
    },
    {
      title: 'Campus Safety & SOS Alert',
      description: 'Confidential & anonymous altercation reporting, anti-ragging helpline, 24x7 security dispatch, and proctorial logbook.',
      icon: ShieldAlert,
      color: 'rose',
    },
    {
      title: 'Cultural & Tech Fests',
      description: 'Flagship cultural fests (Mirage), hackathons, robo-battles, battle of bands, and 1-click registration passes.',
      icon: Calendar,
      color: 'cyan',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Account',
      description: 'Sign up with your campus email to unlock access mapped precisely to your department and academic year.',
    },
    {
      step: '02',
      title: 'Personalize Your Node',
      description: 'Select your technical stack, favorite campus clubs, and alert preferences to tailor your daily operating dashboard.',
    },
    {
      step: '03',
      title: 'Connect, Learn & Grow',
      description: 'Track submissions, register for flagship hackathons, explore top internships, and collaborate with peers.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050713] text-slate-100 selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section with Interactive 3D Campus Experience */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-cyan-glow">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Next-Gen Collegiate Operating System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Your Campus.{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  One Operating System.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                CampusOS brings your academic life, campus community, opportunities, events, and facilities together in one intelligent, cinematic platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/signup" className="w-full sm:w-auto">
                  <GlassButton variant="primary" size="lg" icon={ArrowRight} iconPosition="right" className="w-full">
                    Explore CampusOS
                  </GlassButton>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <GlassButton variant="secondary" size="lg" className="w-full">
                    Launch Console
                  </GlassButton>
                </Link>
              </div>

              {/* Status metrics pill */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl font-bold text-white font-mono">100%</div>
                  <div className="text-xs text-slate-400">Unified Cloud</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">Realtime</div>
                  <div className="text-xs text-slate-400">Campus Sync</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-400 font-mono">Zero</div>
                  <div className="text-xs text-slate-400">Information Silos</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Holographic Campus Model */}
            <div className="lg:col-span-6 h-[460px] sm:h-[540px] relative rounded-3xl glass-panel p-2 shadow-glass-glow border border-indigo-500/20 overflow-hidden">
              <CampusScene className="w-full h-full" />
              
              {/* Overlay HUD indicators */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  INTERACTIVE 3D CAMPUS CORE
                </div>
              </div>

              <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-right">
                <span className="text-[10px] font-mono text-slate-400 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                  DRAG / MOVE CURSOR TO PARALLAX
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: What is CampusOS? */}
      <section id="features" className="py-20 relative border-t border-white/5 bg-[#050817]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="cyan">Architecture Overview</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              More than a portal. A complete campus brain.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Traditional college portals are clunky, fragmented, and outdated. CampusOS replaces disjointed websites, WhatsApp groups, and notice boards with one elegant, high-performance interface.
            </p>
          </div>

          {/* Core Ecosystem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemModules.map((item, idx) => {
              const Icon = item.icon;
              return (
                <GlassCard key={idx} hoverEffect className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-cyan-300 mb-4 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-medium">
                    <span>Explore module</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: How CampusOS Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="purple">Streamlined Workflow</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How CampusOS Works
            </h2>
            <p className="text-slate-400 text-sm">
              Three seamless steps to power up your collegiate journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, i) => (
              <GlassCard key={i} className="p-8 relative overflow-hidden">
                <div className="text-5xl font-extrabold font-mono text-cyan-500/20 mb-4">
                  {st.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{st.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{st.description}</p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none" />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Featured Opportunities & Events Preview */}
      <section className="py-20 bg-[#06091b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="blue">Campus Opportunities</Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mt-2">
                Accelerate Your Career & Research
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Handpicked internships, hackathons, and research fellowships updated daily.
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
                    <Badge variant="cyan">{opp.category}</Badge>
                    <span className="text-xs text-slate-400 font-mono">{opp.location}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1 line-clamp-1">{opp.title}</h4>
                  <p className="text-xs text-slate-400 mb-4">{opp.organization}</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 font-mono">{opp.stipendOrPrize}</span>
                  <Link to="/opportunities" className="text-xs text-slate-300 hover:text-white flex items-center gap-1">
                    Details <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-transparent to-[#050713] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          <Badge variant="cyan">Join the Future of Campus Life</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everything your campus needs.{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              In one place.
            </span>
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Experience the digital transformation with high-speed academics, opportunity discovery, and student collaboration.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <GlassButton variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Enter CampusOS
              </GlassButton>
            </Link>
            <Link to="/login">
              <GlassButton variant="secondary" size="lg">
                Sign In with Credentials
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
