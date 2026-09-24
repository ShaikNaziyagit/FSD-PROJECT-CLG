import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  Megaphone,
  AlertTriangle,
  FileText,
  Calendar,
  Search,
  Filter,
  Printer,
  X,
  Building,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

const CircularsPage = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingCircular, setViewingCircular] = useState(null);

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        setLoading(true);
        const res = await api.get('/circulars');
        if (res.data) {
          setCirculars(res.data);
        }
      } catch (err) {
        console.error('Failed to load circulars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCirculars();
  }, []);

  const categories = [
    'All',
    'Emergency / Sudden',
    'Examination',
    'Fee & Finance',
    'Academic Holiday',
    'Disciplinary & Safety',
  ];

  const filteredCirculars = circulars.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.circularNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner size="lg" label="Synchronizing Official Campus Circulars..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-rose-500/20 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-500/15 via-red-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300 font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              OFFICIAL CENTRAL ADMINISTRATIVE GAZETTE
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sudden Circulars &{' '}
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
                Official Notices
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Real-time authoritative notifications issued by the Vice Chancellor, Controller of Examinations, Dean of Academics, and Campus Security Directorate.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars by title, reference number, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-rose-400/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Circulars List */}
      <div className="space-y-4">
        {filteredCirculars.map((circ) => {
          const isFlash = circ.priority === 'Flash Emergency';
          const isUrgent = circ.priority === 'Urgent';

          return (
            <GlassCard
              key={circ._id}
              hoverEffect
              className={`p-5 sm:p-6 transition-all ${
                isFlash
                  ? 'border-rose-500/40 bg-gradient-to-r from-rose-950/20 to-transparent'
                  : isUrgent
                  ? 'border-amber-500/30'
                  : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      REF: {circ.circularNumber}
                    </span>
                    <Badge
                      variant={isFlash ? 'rose' : isUrgent ? 'amber' : 'cyan'}
                      size="xs"
                    >
                      {circ.priority}
                    </Badge>
                    <Badge variant="purple" size="xs">
                      {circ.category}
                    </Badge>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(circ.effectiveDate).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {circ.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {circ.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>
                      Issued By: <strong className="text-slate-200">{circ.issuedBy}</strong>
                    </span>
                    <span>
                      Target: <strong className="text-slate-200">{circ.targetAudience}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 md:self-center">
                  <GlassButton
                    variant="primary"
                    size="sm"
                    icon={FileText}
                    onClick={() => setViewingCircular(circ)}
                  >
                    View Official Document
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Official Circular Document Modal */}
      {viewingCircular && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="max-w-2xl w-full bg-[#0a0f24] p-6 sm:p-8 rounded-3xl border border-white/20 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setViewingCircular(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official University Header */}
            <div className="text-center pb-4 border-b-2 border-white/20 space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] mx-auto mb-2">
                <div className="w-full h-full bg-[#050713] rounded-[14px] flex items-center justify-center">
                  <img src="/logo.svg" alt="CampusOS" className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-wide text-white uppercase">
                CAMPUS OPERATING SYSTEM (CAMPUSOS) UNIVERSITY
              </h2>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-mono">
                {viewingCircular.authorityTitle || 'OFFICE OF THE REGISTRAR & CENTRAL SECRETARIAT'}
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                CIRCULAR REF NO: {viewingCircular.circularNumber} • DATE: {new Date(viewingCircular.effectiveDate).toLocaleDateString()}
              </p>
            </div>

            {/* Circular Subject & Priority */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  CATEGORY: <strong>{viewingCircular.category}</strong>
                </span>
                <span className="text-[11px] font-mono text-rose-400 font-bold uppercase">
                  [{viewingCircular.priority}]
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                SUB: {viewingCircular.title}
              </h3>
            </div>

            {/* Full Official Body Text */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-serif max-h-72 overflow-y-auto">
              {viewingCircular.fullText}
            </div>

            {/* Directives & Signatures */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400 gap-4">
              <div>
                <p className="text-[11px] font-semibold text-slate-300">Action Required:</p>
                <p className="text-[11px] text-amber-300">{viewingCircular.actionRequired}</p>
              </div>

              <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                <div className="font-mono text-xs font-bold text-cyan-300">By Order of Vice Chancellor</div>
                <div className="text-[11px] text-white font-semibold">{viewingCircular.issuedBy}</div>
                <div className="text-[10px] text-slate-500 font-mono">Digital Signature Verified (CampusOS HSM)</div>
              </div>
            </div>

            {/* Print and Close buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <GlassButton
                variant="secondary"
                size="sm"
                icon={Printer}
                onClick={() => window.print()}
              >
                Print / Save PDF
              </GlassButton>
              <GlassButton
                variant="primary"
                size="sm"
                onClick={() => setViewingCircular(null)}
              >
                Acknowledge & Close
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularsPage;
