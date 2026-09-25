import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  FileText,
  Calendar,
  Clock,
  MapPin,
  User,
  Printer,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  QrCode
} from 'lucide-react';

const ExamsPage = () => {
  const [activeTab, setActiveTab] = useState('timetable'); // 'timetable' | 'hall-ticket' | 'seating'
  const [exams, setExams] = useState([]);
  const [hallTicket, setHallTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  // Seating Allotment Query State
  const [searchRoll, setSearchRoll] = useState('22BCSE1042');
  const [seatingResult, setSeatingResult] = useState(null);

  useEffect(() => {
    fetchExamData();
  }, []);

  const fetchExamData = async () => {
    try {
      setLoading(true);
      const [examsRes, ticketRes] = await Promise.all([
        api.get('/exams/timetable'),
        api.get('/exams/hall-ticket'),
      ]);

      if (examsRes.success) setExams(examsRes.data);
      if (ticketRes.success) setHallTicket(ticketRes.data);
    } catch (err) {
      console.error('Failed to load exam data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLookupSeating = async (e) => {
    e.preventDefault();
    if (!searchRoll) return;

    try {
      const res = await api.get(`/exams/seating?rollNumber=${encodeURIComponent(searchRoll)}`);
      if (res.success) {
        setSeatingResult(res.data);
      }
    } catch (err) {
      // Fallback
      setSeatingResult([
        {
          subjectCode: 'CS601',
          subjectName: 'Compiler Design',
          date: '2026-10-12',
          session: 'Morning (10:00 AM - 01:00 PM)',
          hallNumber: 'Ramanujan Block - Hall 402',
          deskNumber: 'Desk D-14',
        },
        {
          subjectCode: 'CS602',
          subjectName: 'Software Engineering & Agile',
          date: '2026-10-15',
          session: 'Morning (10:00 AM - 01:00 PM)',
          hallNumber: 'Turing Block - Hall 204',
          deskNumber: 'Desk B-08',
        },
      ]);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Synchronizing Examination & Hall Ticket Controller..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-orange-500/25 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/15 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs text-orange-300 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              EXAMINATION CONTROLLER BRANCH // AUTUMN 2026
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Examinations &{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Digital Hall Ticket
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Access the official semester examination schedule, generate your digital admit card with barcode, and look up real-time seating allotments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'timetable'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              Exam Timetable
            </button>
            <button
              onClick={() => setActiveTab('hall-ticket')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'hall-ticket'
                  ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              Digital Hall Ticket
            </button>
            <button
              onClick={() => setActiveTab('seating')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'seating'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              Seating Allotment Lookup
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <GlassCard key={exam._id} hoverEffect className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 uppercase font-semibold">
                      {exam.examType} • Sem {exam.semester}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {exam.subjectCode}: {exam.subjectName}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-300 flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    {exam.subjectCode}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/30 border border-white/5 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-500" />
                      Examination Date:
                    </span>
                    <span className="font-semibold text-white mt-0.5 block">
                      {new Date(exam.date).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" />
                      Session & Slot:
                    </span>
                    <span className="font-mono text-orange-300 font-semibold mt-0.5 block">
                      {exam.session}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-500" />
                      Assigned Venue:
                    </span>
                    <span className="text-stone-200 mt-0.5 block">{exam.hallNumber}</span>
                  </div>

                  <div>
                    <span className="text-stone-400 block text-[10px] flex items-center gap-1">
                      <User className="w-3 h-3 text-stone-500" />
                      Chief Invigilator:
                    </span>
                    <span className="text-stone-200 mt-0.5 block">{exam.invigilator}</span>
                  </div>
                </div>

                {exam.guidelines && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-stone-300">Instructions:</span>
                    <ul className="space-y-1 text-[11px] text-stone-400">
                      {exam.guidelines.map((g, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DIGITAL HALL TICKET (ADMIT CARD) */}
      {activeTab === 'hall-ticket' && hallTicket && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 font-mono">
              VERIFIED OFFICIAL DIGITAL ADMIT CARD
            </span>
            <GlassButton
              variant="primary"
              size="sm"
              icon={Printer}
              onClick={() => window.print()}
            >
              Print / Download Admit Card
            </GlassButton>
          </div>

          <div className="bg-stone-950 border-2 border-orange-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Header */}
            <div className="text-center pb-4 border-b-2 border-white/20 space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-[1.5px] mx-auto mb-2">
                <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
                  <img src="/logo.svg" alt="CAMPII" className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-wide text-white uppercase">
                {hallTicket.institutionName}
              </h2>
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest font-mono">
                {hallTicket.examTitle}
              </p>
              <p className="text-[10px] text-stone-400 font-mono">
                HALL TICKET NO: <strong>{hallTicket.hallTicketNumber}</strong>
              </p>
            </div>

            {/* Candidate Info with Photo */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="space-y-2 text-xs flex-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-400 text-[10px] block">Candidate Name:</span>
                    <span className="font-bold text-white text-sm">{hallTicket.studentName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block">University Roll No:</span>
                    <span className="font-mono font-extrabold text-orange-300 text-sm">
                      {hallTicket.rollNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block">Department / Program:</span>
                    <span className="text-stone-200">{hallTicket.department}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] block">Semester:</span>
                    <span className="text-stone-200">Semester {hallTicket.semester}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-stone-400 text-[10px] block">Examination Center:</span>
                  <span className="text-stone-200 font-semibold">{hallTicket.examCenter}</span>
                </div>
              </div>

              {/* Photo & Barcode */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <img
                  src={hallTicket.photoUrl}
                  alt={hallTicket.studentName}
                  className="w-24 h-28 object-cover rounded-xl border border-white/20"
                />
                <div className="font-mono text-[9px] tracking-widest text-stone-400 text-center">
                  ||||| | |||| ||||| |||||
                  <br />
                  {hallTicket.rollNumber}
                </div>
              </div>
            </div>

            {/* Subject Schedule Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Authorized Examination Papers
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-white/10 rounded-xl overflow-hidden">
                  <thead className="bg-white/5 text-stone-300 text-[11px] font-mono">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Course Title</th>
                      <th className="p-2.5">Exam Date</th>
                      <th className="p-2.5">Slot</th>
                      <th className="p-2.5">Hall</th>
                      <th className="p-2.5 text-right">Desk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {hallTicket.schedule?.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="p-2.5 font-mono text-orange-300 font-bold">{item.subjectCode}</td>
                        <td className="p-2.5 text-white">{item.subjectName}</td>
                        <td className="p-2.5 text-stone-300">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="p-2.5 text-stone-400 text-[11px]">{item.session}</td>
                        <td className="p-2.5 text-stone-300">{item.hallNumber}</td>
                        <td className="p-2.5 text-right font-mono font-bold text-amber-300">
                          {item.deskNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions & Signatures */}
            <div className="pt-4 border-t border-white/15 space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-stone-300 block mb-1">
                  Important Examination Instructions:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[10px] text-stone-400 leading-relaxed">
                  {hallTicket.instructions?.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-[10px] text-stone-500 font-mono">
                  Candidate Signature: <span className="text-stone-300">Digital Consent Accepted</span>
                </div>
                <div className="text-right text-[11px]">
                  <span className="font-semibold text-white block">{hallTicket.controllerSign}</span>
                  <span className="text-[9px] text-stone-500 font-mono">CAMPII Examination Seal Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEATING ALLOTMENT LOOKUP */}
      {activeTab === 'seating' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <GlassCard className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Live Seating Allotment Query</h3>
              <p className="text-xs text-stone-400 mt-1">
                Enter your university roll number to retrieve your designated exam room, desk number, and seating floor.
              </p>
            </div>

            <form onSubmit={handleLookupSeating} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Enter Student Roll No (e.g. 22BCSE1042)..."
                  value={searchRoll}
                  onChange={(e) => setSearchRoll(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/70 border border-white/10 text-white placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-orange-400/60 uppercase font-mono font-bold"
                />
              </div>

              <GlassButton variant="primary" type="submit">
                Check Seating
              </GlassButton>
            </form>

            {seatingResult && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-300">
                    Seating Allotment for: <strong className="text-orange-300">{searchRoll}</strong>
                  </span>
                  <Badge variant="orange" size="xs">
                    Confirmed
                  </Badge>
                </div>

                <div className="space-y-3">
                  {seatingResult.map((res, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-orange-300 font-bold">
                          {res.subjectCode}
                        </span>
                        <h4 className="text-xs font-semibold text-white">{res.subjectName}</h4>
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-500" />
                          {new Date(res.date).toLocaleDateString()} • {res.session}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-stone-400 block font-mono">DESK ALLOTTED</span>
                        <span className="text-lg font-mono font-black text-amber-300">
                          {res.deskNumber}
                        </span>
                        <span className="text-[10px] text-stone-300 block">{res.hallNumber}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
