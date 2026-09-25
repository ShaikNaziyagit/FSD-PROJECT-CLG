import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Building,
  Calendar,
  Sparkles,
  Save,
  CheckCircle2,
  Code,
  Heart,
} from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [bio, setBio] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [interestsStr, setInterestsStr] = useState('');
  const [avatar, setAvatar] = useState('');

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setStudentId(user.studentId || '');
      setDepartment(user.department || 'CSE');
      setYear(user.year || '3rd Year');
      setBio(user.bio || '');
      setSkillsStr(user.skills ? user.skills.join(', ') : '');
      setInterestsStr(user.interests ? user.interests.join(', ') : '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      await updateUserProfile({
        name,
        studentId,
        department,
        year,
        bio,
        skills: skillsStr.split(',').map((s) => s.trim()).filter(Boolean),
        interests: interestsStr.split(',').map((s) => s.trim()).filter(Boolean),
        avatar,
      });

      setSuccessMessage('Node profile configuration committed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      alert(err.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        badge={<Badge variant="orange">Identity Matrix</Badge>}
        title="Scholar Node Profile"
        subtitle="Manage personal identification, technical skill matrix, campus department affiliations, and interests."
      />

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-sm text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card Header */}
        <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-glass-glow border-orange-500/20">
          <div className="relative group">
            <img
              src={
                avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
              }
              alt={name}
              className="w-24 h-24 rounded-2xl object-cover ring-2 ring-orange-400/50 shadow-xl"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h2 className="text-xl font-bold text-white">{name || 'Scholar Name'}</h2>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-mono">{user?.email}</p>
            <p className="text-xs text-stone-300 pt-1 max-w-md">{bio || 'No status bio provided.'}</p>
          </div>
        </GlassCard>

        {/* Profile Form Details */}
        <GlassCard className="p-6 md:p-8 space-y-5">
          <h3 className="text-base font-bold text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <User className="w-4 h-4 text-orange-400" />
            <span>Academic Identification Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">Student / Faculty ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. 22BCSE1042"
                className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
              >
                <option value="CSE">Computer Science & Engineering</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="EEE">Electrical & Electronics</option>
                <option value="Mechanical">Mechanical Engineering</option>
                <option value="Civil">Civil Engineering</option>
                <option value="General Administration">General Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">Year / Level</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Faculty">Faculty</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">Avatar Image URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-300 mb-1.5">Academic Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief summary of research, interests, or campus involvement..."
              className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-orange-400" />
                Technical Skills (comma-separated)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="React, Go, Docker, Python"
                className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-orange-400" />
                Interests & Domains (comma-separated)
              </label>
              <input
                type="text"
                value={interestsStr}
                onChange={(e) => setInterestsStr(e.target.value)}
                placeholder="Distributed Systems, Hackathons, AI"
                className="w-full px-3 py-2 rounded-xl bg-stone-900/80 border border-white/10 text-sm text-stone-100 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-500/30"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <GlassButton
              type="submit"
              variant="primary"
              size="md"
              disabled={saving}
              icon={Save}
              iconPosition="left"
            >
              {saving ? 'Synchronizing...' : 'Save Profile Changes'}
            </GlassButton>
          </div>
        </GlassCard>
      </form>
    </div>
  );
};

export default ProfilePage;
