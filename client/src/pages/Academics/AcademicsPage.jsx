import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  GraduationCap,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  User,
  MapPin,
  TrendingUp,
} from 'lucide-react';

const AcademicsPage = () => {
  const [activeTab, setActiveTab] = useState('subjects'); // subjects, timetable, assignments
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assignment submission modal state
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const fetchAcademicData = async () => {
    try {
      setLoading(true);
      const [subsRes, assignsRes, ttRes] = await Promise.all([
        api.get('/academics/subjects'),
        api.get('/academics/assignments'),
        api.get('/academics/timetable'),
      ]);

      if (subsRes.success) setSubjects(subsRes.data);
      if (assignsRes.success) setAssignments(assignsRes.data);
      if (ttRes.success) setTimetable(ttRes.data);
    } catch (err) {
      console.error('Failed to load academic data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    try {
      setSubmitting(true);
      const res = await api.post(`/academics/assignments/${selectedAssignment._id}/submit`, {
        submissionUrl,
      });

      if (res.success) {
        setSubmitMessage('Assignment successfully submitted to faculty portal!');
        setTimeout(() => {
          setSelectedAssignment(null);
          setSubmitMessage('');
          setSubmissionUrl('');
          fetchAcademicData();
        }, 1200);
      }
    } catch (err) {
      alert(err.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  const getAttendanceColor = (rate) => {
    if (rate >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
    if (rate >= 75) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/25';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading Academic Records & Timetable..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        badge={<Badge variant="cyan">Academics Suite</Badge>}
        title="Curriculum & Academic Life"
        subtitle="Manage semester coursework, real-time class attendance thresholds, deliverables, and schedules."
      >
        <div className="flex p-1 rounded-xl bg-slate-900/80 border border-white/10">
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'subjects'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Subjects & Attendance
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'timetable'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Timetable
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'assignments'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Assignments ({assignments.filter((a) => a.status === 'pending').length})
          </button>
        </div>
      </PageHeader>

      {/* TAB 1: SUBJECTS & ATTENDANCE */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => (
            <GlassCard key={sub._id} hoverEffect className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {sub.code}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{sub.credits} Credits</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{sub.name}</h3>

                <div className="flex items-center gap-2 text-xs text-slate-300 mb-4">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{sub.faculty}</span>
                </div>

                {/* Next Class Pill */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1 mb-5">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                    Next Lecture
                  </div>
                  <div className="text-xs font-semibold text-white flex items-center justify-between">
                    <span>{sub.nextClass?.day || 'Monday'} at {sub.nextClass?.time || '10:00 AM'}</span>
                    <span className="text-cyan-300 font-mono">{sub.nextClass?.room || 'Hall 302'}</span>
                  </div>
                </div>
              </div>

              {/* Attendance Indicator Meter */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Attendance Ratio</span>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded-full border ${getAttendanceColor(sub.attendanceRate)}`}>
                    {sub.attendanceRate}% ({sub.attendedClasses}/{sub.totalClasses})
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sub.attendanceRate >= 85
                        ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                        : sub.attendanceRate >= 75
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                        : 'bg-gradient-to-r from-orange-400 to-rose-400'
                    }`}
                    style={{ width: `${sub.attendanceRate}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>Target: 75% required</span>
                  <span>{sub.attendanceRate >= 75 ? 'Safe Standing' : 'Below Safe Zone!'}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* TAB 2: WEEKLY TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timetable.map((daySchedule, i) => (
              <GlassCard key={i} className="p-4 flex flex-col space-y-4">
                <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{daySchedule.day}</h4>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {daySchedule.slots.length} Lectures
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {daySchedule.slots.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {slot.code}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {slot.time}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-200 line-clamp-1">
                        {slot.subject}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{slot.faculty}</span>
                        <span className="text-indigo-300 font-mono">{slot.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASSIGNMENTS */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assign) => (
              <GlassCard key={assign._id} hoverEffect className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {assign.subjectCode || 'CS301'}
                    </span>
                    <Badge
                      variant={
                        assign.status === 'submitted'
                          ? 'emerald'
                          : assign.status === 'graded'
                          ? 'purple'
                          : 'amber'
                      }
                      size="xs"
                    >
                      {assign.status}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {assign.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {assign.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Due: {new Date(assign.dueDate).toLocaleDateString()}
                    </span>
                    <span className="font-mono text-slate-300">Max: {assign.totalMarks} pts</span>
                  </div>

                  {assign.status === 'pending' ? (
                    <GlassButton
                      variant="primary"
                      size="sm"
                      icon={Upload}
                      className="w-full"
                      onClick={() => setSelectedAssignment(assign)}
                    >
                      Submit Solution
                    </GlassButton>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Submitted
                      </span>
                      {assign.grade !== undefined && (
                        <span className="font-mono font-bold">{assign.grade} / {assign.totalMarks}</span>
                      )}
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Assignment Submission Modal */}
      <Modal
        isOpen={!!selectedAssignment}
        onClose={() => setSelectedAssignment(null)}
        title={`Submit: ${selectedAssignment?.title || 'Assignment'}`}
      >
        {submitMessage ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <p className="text-sm font-semibold text-white">{submitMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleAssignmentSubmit} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-white">{selectedAssignment?.subjectName}</div>
              <div className="text-slate-400">Due: {selectedAssignment && new Date(selectedAssignment.dueDate).toLocaleString()}</div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Submission Artifact Link (GitHub Repository / Google Drive / Cloud Link)
              </label>
              <input
                type="url"
                required
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                placeholder="https://github.com/username/project-repo"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedAssignment(null)}
              >
                Cancel
              </GlassButton>
              <GlassButton
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting}
              >
                {submitting ? 'Transmitting...' : 'Confirm Submission'}
              </GlassButton>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AcademicsPage;
