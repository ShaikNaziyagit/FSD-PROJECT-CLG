import React, { useState } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import {
  GraduationCap,
  Calculator,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

const SemestersPage = () => {
  // Pre-configured Semester 6 curriculum
  const [courses, setCourses] = useState([
    { code: 'CS601', name: 'Compiler Design', credits: 4, gradePoint: 9 },
    { code: 'CS602', name: 'Software Engineering & Agile', credits: 3, gradePoint: 10 },
    { code: 'CS603', name: 'Computer Networks & Security', credits: 4, gradePoint: 9 },
    { code: 'CS604', name: 'Cloud Computing & DevOps', credits: 3, gradePoint: 8 },
    { code: 'CS605', name: 'Full Stack Development Lab', credits: 2, gradePoint: 10 },
    { code: 'CS606', name: 'Mini Project & Technical Seminar', credits: 2, gradePoint: 10 },
  ]);

  // Attendance Calculator State
  const [totalHeld, setTotalHeld] = useState(64);
  const [totalAttended, setTotalAttended] = useState(56);

  const gradeOptions = [
    { label: 'O (Outstanding)', point: 10 },
    { label: 'A+ (Excellent)', point: 9 },
    { label: 'A (Very Good)', point: 8 },
    { label: 'B+ (Good)', point: 7 },
    { label: 'B (Above Average)', point: 6 },
    { label: 'C (Average)', point: 5 },
    { label: 'P (Pass)', point: 4 },
    { label: 'F (Fail)', point: 0 },
  ];

  // Semester history mock
  const semesterHistory = [
    { sem: 1, sgpa: 8.85, credits: 20, status: 'Completed', topCourse: 'Engg. Mathematics I' },
    { sem: 2, sgpa: 9.10, credits: 22, status: 'Completed', topCourse: 'Data Structures & C' },
    { sem: 3, sgpa: 8.92, credits: 24, status: 'Completed', topCourse: 'Discrete Mathematics' },
    { sem: 4, sgpa: 9.35, credits: 24, status: 'Completed', topCourse: 'Design & Analysis of Algorithms' },
    { sem: 5, sgpa: 9.40, credits: 22, status: 'Completed', topCourse: 'Database Management Systems' },
    { sem: 6, sgpa: 0, credits: 18, status: 'In Progress (Active)', topCourse: 'Cloud Computing' },
    { sem: 7, sgpa: 0, credits: 16, status: 'Upcoming', topCourse: 'Major Project Phase I' },
    { sem: 8, sgpa: 0, credits: 14, status: 'Upcoming', topCourse: 'Industry Internship' },
  ];

  // Calculate SGPA
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const totalPoints = courses.reduce((acc, c) => acc + c.credits * c.gradePoint, 0);
  const calculatedSGPA = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  // Calculate Cumulative CGPA (Sem 1 to 5 + projected Sem 6)
  const pastCredits = 112;
  const pastPoints = 8.85 * 20 + 9.1 * 22 + 8.92 * 24 + 9.35 * 24 + 9.4 * 22;
  const cumulativeCredits = pastCredits + totalCredits;
  const overallCGPA = ((pastPoints + totalPoints) / cumulativeCredits).toFixed(2);

  // 75% Attendance engine
  const currentAttendancePct = totalHeld > 0 ? Math.round((totalAttended / totalHeld) * 100) : 0;
  // How many classes can be safely missed?
  // (totalAttended) / (totalHeld + x) >= 0.75  =>  totalHeld + x <= totalAttended / 0.75  => x = floor(totalAttended / 0.75) - totalHeld
  const safeBunkClasses = Math.max(0, Math.floor(totalAttended / 0.75) - totalHeld);
  // If below 75%, how many to attend consecutively?
  // (totalAttended + y) / (totalHeld + y) >= 0.75  => totalAttended + y >= 0.75*totalHeld + 0.75*y  => 0.25*y >= 0.75*totalHeld - totalAttended
  const neededToReach75 = currentAttendancePct < 75
    ? Math.max(0, Math.ceil((0.75 * totalHeld - totalAttended) / 0.25))
    : 0;

  const handleGradeChange = (index, newPoint) => {
    const updated = [...courses];
    updated[index].gradePoint = parseInt(newPoint, 10);
    setCourses(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-orange-500/25 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/15 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-xs text-orange-300 font-mono">
              <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
              ACADEMIC DEGREE AUDIT & SEMESTER METRICS
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Semesters &{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                CGPA Progress Hub
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Navigate Semester 1 through 8, simulate your semester SGPA & cumulative CGPA, and utilize the 75% attendance compliance engine to calculate safe skips or recovery classes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-black/40 rounded-2xl border border-white/10 text-right">
              <span className="text-[10px] text-stone-400 block font-mono">CURRENT CUMULATIVE</span>
              <span className="text-2xl font-mono font-extrabold text-orange-400">{overallCGPA}</span>
              <span className="text-[10px] text-emerald-400 block">First Class with Distinction</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          icon={Award}
          label="Cumulative CGPA"
          value={overallCGPA}
          change="Rank #4 in Department"
          changeType="positive"
          color="orange"
        />
        <StatCard
          icon={Calculator}
          label="Projected Sem 6 SGPA"
          value={calculatedSGPA}
          change="Based on simulated grades"
          changeType="positive"
          color="amber"
        />
        <StatCard
          icon={TrendingUp}
          label="Attendance Threshold"
          value={`${currentAttendancePct}%`}
          change={currentAttendancePct >= 75 ? 'Safe (>75% rule)' : 'Shortage Alert!'}
          changeType={currentAttendancePct >= 75 ? 'positive' : 'negative'}
          color="emerald"
        />
        <StatCard
          icon={Layers}
          label="Total Credits Earned"
          value={`${cumulativeCredits} / 160`}
          change="On track for graduation"
          changeType="positive"
          color="amber"
        />
      </div>

      {/* 2-Column Section: Left = SGPA Calculator, Right = 75% Attendance Compliance Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive SGPA Simulator */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-400" />
              <span>Interactive Semester 6 SGPA Simulator</span>
            </h2>
            <span className="text-xs font-mono font-bold text-orange-300">
              SGPA: {calculatedSGPA}
            </span>
          </div>

          <GlassCard className="p-5 sm:p-6 space-y-4">
            <p className="text-xs text-stone-400">
              Change the expected grade for any subject to immediately see the impact on your Semester SGPA.
            </p>

            <div className="space-y-3">
              {courses.map((course, idx) => (
                <div
                  key={course.code}
                  className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-orange-300 font-bold px-1.5 py-0.5 rounded bg-orange-500/10">
                        {course.code}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        Credits: {course.credits}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white">{course.name}</h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={course.gradePoint}
                      onChange={(e) => handleGradeChange(idx, e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-orange-400"
                    >
                      {gradeOptions.map((opt) => (
                        <option key={opt.point} value={opt.point}>
                          {opt.label} ({opt.point} pts)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block font-mono">SIMULATED SEMESTER 6 SGPA</span>
                <span className="text-xl font-mono font-extrabold text-orange-300">
                  {calculatedSGPA} / 10.00
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-emerald-300">
                Total Credits: {totalCredits}
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: 75% Attendance Compliance Calculator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>75% Attendance Compliance Tool</span>
            </h2>
          </div>

          <GlassCard className="p-5 sm:p-6 space-y-5">
            <p className="text-xs text-stone-400 leading-relaxed">
              University regulations strictly mandate a minimum of <strong>75% physical attendance</strong> to qualify for semester hall tickets.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-stone-400">Total Classes Held:</label>
                <input
                  type="number"
                  min="1"
                  value={totalHeld}
                  onChange={(e) => setTotalHeld(parseInt(e.target.value || '1', 10))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-stone-400">Classes Attended:</label>
                <input
                  type="number"
                  min="0"
                  max={totalHeld}
                  value={totalAttended}
                  onChange={(e) => setTotalAttended(parseInt(e.target.value || '0', 10))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Attendance Percentage Indicator */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Current Attendance:</span>
                <span
                  className={`font-mono text-lg font-black ${
                    currentAttendancePct >= 75 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {currentAttendancePct}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-500 ${
                    currentAttendancePct >= 75 ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, currentAttendancePct)}%` }}
                />
              </div>
            </div>

            {/* Smart Output Analysis */}
            {currentAttendancePct >= 75 ? (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-1 text-emerald-200">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  Attendance Status: Safe to Sit for Exams!
                </div>
                <p className="text-[11px] text-stone-300 pt-1 leading-relaxed">
                  You can safely miss up to <strong className="text-white font-mono font-bold text-sm">{safeBunkClasses}</strong> more classes and still remain comfortably above the mandatory 75% cutoff.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-1 text-rose-200">
                <div className="font-bold flex items-center gap-1.5 text-rose-300">
                  <AlertTriangle className="w-4 h-4" />
                  Attendance Shortage Warning!
                </div>
                <p className="text-[11px] text-stone-300 pt-1 leading-relaxed">
                  You must attend the next <strong className="text-white font-mono font-bold text-sm">{neededToReach75}</strong> consecutive classes without missing any to restore your attendance to 75.0%.
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* Semester History Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-orange-400" />
          <span>Semester Timeline & Academic Transcripts</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {semesterHistory.map((s) => (
            <GlassCard
              key={s.sem}
              hoverEffect
              className={`p-4 space-y-2 ${
                s.sem === 6 ? 'border-orange-500/40 bg-orange-950/10' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Semester {s.sem}</span>
                <Badge
                  variant={
                    s.status === 'Completed'
                      ? 'emerald'
                      : s.status.includes('Active')
                      ? 'orange'
                      : 'stone'
                  }
                  size="xs"
                >
                  {s.status}
                </Badge>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-[10px] text-stone-400 font-mono">SGPA</span>
                <span className="text-lg font-mono font-extrabold text-white">
                  {s.sgpa > 0 ? s.sgpa : '--'}
                </span>
              </div>

              <div className="text-[11px] text-stone-400 flex items-center justify-between border-t border-white/5 pt-2">
                <span>Credits: {s.credits}</span>
                <span className="truncate max-w-[120px] text-stone-300">{s.topCourse}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemestersPage;
