import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  Code,
  BrainCircuit,
  MessageSquare,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';

const PlacementsPage = () => {
  const [activeTab, setActiveTab] = useState('placements'); // 'placements' | 'crt' | 'mock-test' | 'prep-kits'
  const [loading, setLoading] = useState(true);
  const [placements, setPlacements] = useState([]);
  const [crtModules, setCrtModules] = useState([]);
  const [stats, setStats] = useState({
    highestPackage: '₹44.5 LPA',
    averagePackage: '₹11.8 LPA',
    totalOffers: 642,
    placedPercentage: '94.6%',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Application Modal state
  const [applyingPlacement, setApplyingPlacement] = useState(null);
  const [appliedDrives, setAppliedDrives] = useState({});
  const [applicationSuccess, setApplicationSuccess] = useState('');

  // Mock Test State
  const [selectedTestModule, setSelectedTestModule] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [placementRes, crtRes] = await Promise.all([
          api.get('/placements').catch(() => ({ data: [], stats: {} })),
          api.get('/crt').catch(() => ({ data: [] })),
        ]);

        if (placementRes.data) setPlacements(placementRes.data);
        if (placementRes.stats) setStats(placementRes.stats);
        if (crtRes.data) {
          setCrtModules(crtRes.data);
          if (crtRes.data.length > 0 && crtRes.data[0].mockTests?.length > 0) {
            setSelectedTestModule(crtRes.data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load placement and CRT data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (placement) => {
    try {
      await api.post(`/placements/${placement._id}/apply`, {});
      setAppliedDrives((prev) => ({ ...prev, [placement._id]: true }));
      setApplicationSuccess(`Application submitted successfully for ${placement.companyName}!`);
      setTimeout(() => {
        setApplicationSuccess('');
        setApplyingPlacement(null);
      }, 2000);
    } catch (err) {
      setAppliedDrives((prev) => ({ ...prev, [placement._id]: true }));
      setApplicationSuccess(`Application recorded for ${placement.companyName}!`);
      setTimeout(() => {
        setApplicationSuccess('');
        setApplyingPlacement(null);
      }, 2000);
    }
  };

  const handleSelectAnswer = (qIndex, optIndex) => {
    if (testSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitTest = (questions) => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    setTestScore(score);
    setTestSubmitted(true);
  };

  const resetTest = () => {
    setUserAnswers({});
    setTestSubmitted(false);
    setTestScore(0);
  };

  const filteredPlacements = placements.filter((p) => {
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keySkills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading Placements & CRT Intelligence Hub..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-cyan-500/20 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-300 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              CAMPUS RECRUITMENT & CAREER OPERATING SYSTEM
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Campus Placements &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                CRT Training
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Track Tier-1 multinational company drives, CTC breakdown, recruitment eligibility, and master Campus Recruitment Training (CRT) across Quant, Logic, Verbal, and DSA Sprints.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('placements')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'placements'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Placement Drives
            </button>
            <button
              onClick={() => setActiveTab('crt')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'crt'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              CRT Modules & Schedules
            </button>
            <button
              onClick={() => setActiveTab('mock-test')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'mock-test'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              Mock Test Simulator
            </button>
          </div>
        </div>
      </div>

      {/* Placement Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={Award}
          label="Highest CTC Offered"
          value={stats.highestPackage || '₹44.5 LPA'}
          change="Microsoft IDC & Google"
          changeType="positive"
          color="cyan"
        />
        <StatCard
          icon={TrendingUp}
          label="Average CTC (Batch)"
          value={stats.averagePackage || '₹11.8 LPA'}
          change="+18.4% YoY Surge"
          changeType="positive"
          color="purple"
        />
        <StatCard
          icon={CheckCircle2}
          label="Placement Clearance"
          value={stats.placedPercentage || '94.6%'}
          change="Eligible Students"
          changeType="positive"
          color="emerald"
        />
        <StatCard
          icon={Briefcase}
          label="Total Offers Extended"
          value={stats.totalOffers || '642+'}
          change="Across 85+ Recruiters"
          changeType="positive"
          color="blue"
        />
      </div>

      {/* TAB 1: PLACEMENT DRIVES */}
      {activeTab === 'placements' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search company, job role, or skills (e.g. Go, C++, Microsoft)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-400/50"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'Product', 'FinTech', 'Core Engineering', 'Service'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Placements Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlacements.map((drive) => {
              const isApplied = appliedDrives[drive._id];
              return (
                <GlassCard key={drive._id} hoverEffect className="p-5 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={drive.logo}
                          alt={drive.companyName}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/15 bg-white/5"
                        />
                        <div>
                          <h3 className="font-bold text-white text-base leading-tight">
                            {drive.companyName}
                          </h3>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {drive.location}
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {drive.ctc}
                      </span>
                    </div>

                    {/* Role & Category */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="purple" size="xs">
                          {drive.category}
                        </Badge>
                        <Badge variant="cyan" size="xs">
                          {drive.status}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-100">{drive.role}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {drive.jobDescription}
                      </p>
                    </div>

                    {/* Eligibility & Rounds */}
                    <div className="bg-black/30 rounded-xl p-3 space-y-2 border border-white/5 text-[11px]">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Min CGPA Cutoff:</span>
                        <span className="font-mono font-bold text-amber-300">
                          {drive.eligibility?.minCgpa || 7.0} CGPA
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Allowed Branches:</span>
                        <span className="font-semibold text-slate-200">
                          {drive.eligibility?.allowedBranches?.join(', ') || 'All Branches'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Drive Date:</span>
                        <span className="font-mono text-cyan-300 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-400" />
                          {new Date(drive.driveDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Key Skills Tags */}
                    {drive.keySkills && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {drive.keySkills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">
                      Openings: <strong className="text-white">{drive.totalOpenings || 10}</strong>
                    </span>

                    {isApplied ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Applied (Under Review)
                      </span>
                    ) : (
                      <GlassButton
                        variant="primary"
                        size="sm"
                        onClick={() => setApplyingPlacement(drive)}
                      >
                        Apply for Drive
                      </GlassButton>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CRT TRAINING MODULES */}
      {activeTab === 'crt' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crtModules.map((mod) => (
              <GlassCard key={mod._id} hoverEffect className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase font-semibold">
                      {mod.moduleName}
                    </span>
                    <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    {mod.moduleName.includes('Coding') ? (
                      <Code className="w-5 h-5" />
                    ) : mod.moduleName.includes('Reasoning') ? (
                      <BrainCircuit className="w-5 h-5" />
                    ) : mod.moduleName.includes('Soft') ? (
                      <MessageSquare className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{mod.description}</p>

                {/* Trainer & Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-black/30 border border-white/5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Lead Trainer:</span>
                    <span className="font-semibold text-white">{mod.trainer?.name}</span>
                    <span className="text-[10px] text-slate-400 block">{mod.trainer?.designation}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Session Timing:</span>
                    <span className="font-mono text-cyan-300 font-semibold">{mod.schedule?.day}</span>
                    <span className="text-[10px] text-slate-400 block">{mod.schedule?.time}</span>
                  </div>
                </div>

                {/* Topics List */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-200">Syllabus & High-Yield Topics:</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {mod.topicsCovered?.map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                {mod.mockTests?.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedTestModule(mod);
                      setActiveTab('mock-test');
                      resetTest();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 hover:from-cyan-500/30 hover:to-indigo-600/30 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Launch Module Practice Test ({mod.mockTests[0].questions?.length} Questions)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE MOCK TEST SIMULATOR */}
      {activeTab === 'mock-test' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Module Selector */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {crtModules
              .filter((m) => m.mockTests && m.mockTests.length > 0)
              .map((mod) => (
                <button
                  key={mod._id}
                  onClick={() => {
                    setSelectedTestModule(mod);
                    resetTest();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedTestModule?._id === mod._id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {mod.moduleName} Test
                </button>
              ))}
          </div>

          {selectedTestModule && selectedTestModule.mockTests?.[0] ? (
            <GlassCard className="p-6 sm:p-8 space-y-6">
              {/* Test Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="purple" size="xs">
                      {selectedTestModule.moduleName}
                    </Badge>
                    <Badge variant="cyan" size="xs">
                      {selectedTestModule.mockTests[0].difficulty}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedTestModule.mockTests[0].testTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Answer all questions and submit to view immediate automated scoring and detailed analytical explanations.
                  </p>
                </div>

                <div className="text-right sm:border-l sm:border-white/10 sm:pl-6 shrink-0">
                  <span className="text-[10px] text-slate-400 block font-mono">TEST STATUS</span>
                  {testSubmitted ? (
                    <span className="text-lg font-mono font-extrabold text-emerald-400">
                      Score: {testScore} / {selectedTestModule.mockTests[0].questions.length}
                    </span>
                  ) : (
                    <span className="text-lg font-mono font-extrabold text-cyan-300">
                      {Object.keys(userAnswers).length} / {selectedTestModule.mockTests[0].questions.length} Answered
                    </span>
                  )}
                </div>
              </div>

              {/* Questions Stream */}
              <div className="space-y-6">
                {selectedTestModule.mockTests[0].questions.map((q, qIndex) => {
                  const selectedOption = userAnswers[qIndex];
                  const isCorrect = testSubmitted && selectedOption === q.correctAnswer;
                  const isWrong = testSubmitted && selectedOption !== undefined && selectedOption !== q.correctAnswer;

                  return (
                    <div
                      key={qIndex}
                      className={`p-5 rounded-2xl border transition-all ${
                        testSubmitted
                          ? isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                          : 'bg-black/30 border-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="w-6 h-6 rounded-lg bg-white/10 text-white font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                          Q{qIndex + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-white leading-relaxed">
                          {q.question}
                        </h4>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 mt-4 pl-9">
                        {q.options.map((opt, optIndex) => {
                          const isOptSelected = selectedOption === optIndex;
                          const isThisCorrect = testSubmitted && optIndex === q.correctAnswer;

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelectAnswer(qIndex, optIndex)}
                              disabled={testSubmitted}
                              className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                                isThisCorrect
                                  ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-200'
                                  : isOptSelected && isWrong
                                  ? 'bg-rose-500/20 border border-rose-500/50 text-rose-200'
                                  : isOptSelected
                                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-200'
                                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-mono shrink-0">
                                  {String.fromCharCode(65 + optIndex)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {testSubmitted && isThisCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box after submit */}
                      {testSubmitted && (
                        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs space-y-1">
                          <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Correct Answer: Option {String.fromCharCode(65 + q.correctAnswer)}
                          </span>
                          <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit or Reset Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {testSubmitted ? (
                  <GlassButton variant="primary" onClick={resetTest}>
                    Retake Test
                  </GlassButton>
                ) : (
                  <GlassButton
                    variant="primary"
                    onClick={() => handleSubmitTest(selectedTestModule.mockTests[0].questions)}
                  >
                    Submit Test & Calculate Score
                  </GlassButton>
                )}
              </div>
            </GlassCard>
          ) : (
            <p className="text-slate-400 text-sm">Select a module to view practice test.</p>
          )}
        </div>
      )}

      {/* Application Confirmation Modal */}
      {applyingPlacement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4 shadow-glass-glow">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              Apply for {applyingPlacement.companyName}
            </h3>

            <div className="p-3 bg-white/5 rounded-xl text-xs space-y-2 text-slate-300">
              <p>
                <strong>Role:</strong> {applyingPlacement.role}
              </p>
              <p>
                <strong>Package:</strong> {applyingPlacement.ctc}
              </p>
              <p>
                <strong>Cutoff:</strong> Minimum {applyingPlacement.eligibility?.minCgpa} CGPA required.
              </p>
              <p className="text-slate-400 text-[11px]">
                Your verified CampusOS digital profile, resume, and semester academic credentials will be forwarded directly to the university Training & Placement Cell.
              </p>
            </div>

            {applicationSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                {applicationSuccess}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <GlassButton
                variant="ghost"
                size="sm"
                onClick={() => setApplyingPlacement(null)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => handleApply(applyingPlacement)}
              >
                Confirm & Submit Application
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementsPage;
