import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Megaphone,
  AlertTriangle,
  Bell,
  Clock,
  User,
  Plus,
  Trash2,
  CheckCircle,
} from 'lucide-react';

const priorities = ['All', 'Urgent', 'Important', 'Normal'];

const AnnouncementsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New announcement state
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    category: 'Academic',
    priority: 'Normal',
    department: 'All Departments',
    targetAudience: 'All Students',
    description: '',
  });

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const prioParam = selectedPriority !== 'All' ? `priority=${selectedPriority}` : '';
      const query = [prioParam].filter(Boolean).join('&');

      const res = await api.get(`/announcements${query ? `?${query}` : ''}`);
      if (res.success) {
        setAnnouncements(res.data);
      }
    } catch (err) {
      console.error('Failed to load announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [selectedPriority]);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/announcements', newAnnouncement);
      if (res.success) {
        setCreateModalOpen(false);
        setNewAnnouncement({
          title: '',
          category: 'Academic',
          priority: 'Normal',
          department: 'All Departments',
          targetAudience: 'All Students',
          description: '',
        });
        fetchAnnouncements();
      }
    } catch (err) {
      alert(err.message || 'Error publishing announcement');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('Are you sure you want to remove this official announcement?')) return;
    try {
      const res = await api.delete(`/announcements/${id}`);
      if (res.success) {
        fetchAnnouncements();
      }
    } catch (err) {
      alert(err.message || 'Error deleting announcement');
    }
  };

  const filteredAnnouncements = announcements.filter((a) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.department?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        badge={<Badge variant="amber">Official Bulletins</Badge>}
        title="Campus Announcements"
        subtitle="Real-time institutional bulletins, administrative circulars, and urgent academic notices."
      >
        {isAuthenticated && ['faculty', 'super_admin', 'club_admin'].includes(user?.role) && (
          <GlassButton
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setCreateModalOpen(true)}
          >
            Dispatch Bulletin
          </GlassButton>
        )}
      </PageHeader>

      {/* Priority Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPriority === p
                  ? p === 'Urgent'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : p === 'Important'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-white bg-stone-900/50 hover:bg-white/5 border border-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter announcements..."
          className="w-full md:w-72"
        />
      </div>

      {/* Announcements List */}
      {loading ? (
        <LoadingSpinner size="lg" label="Synchronizing Official Campus Bulletins..." />
      ) : filteredAnnouncements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No Bulletins Found"
          description="There are currently no announcements matching your filter criteria."
          actionLabel="View All Bulletins"
          onAction={() => {
            setSelectedPriority('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map((ann) => (
            <GlassCard
              key={ann._id}
              hoverEffect
              className={`p-6 border transition-all ${
                ann.priority === 'Urgent'
                  ? 'border-rose-500/30 bg-rose-500/[0.03] shadow-lg shadow-rose-500/5'
                  : ann.priority === 'Important'
                  ? 'border-amber-500/30 bg-amber-500/[0.03]'
                  : 'border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      ann.priority === 'Urgent'
                        ? 'rose'
                        : ann.priority === 'Important'
                        ? 'amber'
                        : 'orange'
                    }
                    size="sm"
                  >
                    {ann.priority} Notice
                  </Badge>
                  <span className="text-xs font-mono text-orange-300 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                    {ann.category}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    Audience: {ann.targetAudience}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone-500 shrink-0">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(ann.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>

                  {user?.role === 'super_admin' && (
                    <button
                      onClick={() => handleDeleteAnnouncement(ann._id)}
                      className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      title="Delete announcement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {ann.title}
              </h3>

              <p className="text-sm text-stone-300 leading-relaxed mb-4 whitespace-pre-line">
                {ann.description}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  Issued by: {ann.author?.name || 'Academic Dean'} ({ann.department})
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Digitally Verified
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Modal for Creating Announcement */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Broadcast Institutional Bulletin"
      >
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Bulletin Headline
            </label>
            <input
              type="text"
              required
              value={newAnnouncement.title}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              placeholder="e.g. Schedule for Mid-Term Examination Autumn 2026"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Priority Level
              </label>
              <select
                value={newAnnouncement.priority}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={newAnnouncement.category}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              >
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
                <option value="Placement">Placement</option>
                <option value="Administrative">Administrative</option>
                <option value="Event">Event</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Issuing Department
              </label>
              <input
                type="text"
                value={newAnnouncement.department}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, department: e.target.value })}
                placeholder="e.g. Office of Dean Academics"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Audience
              </label>
              <select
                value={newAnnouncement.targetAudience}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, targetAudience: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              >
                <option value="All Students">All Students</option>
                <option value="B.Tech All Years">B.Tech All Years</option>
                <option value="Final Year Only">Final Year Only</option>
                <option value="Faculty Only">Faculty Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Notice Full Body
            </label>
            <textarea
              required
              rows={4}
              value={newAnnouncement.description}
              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
              placeholder="Provide complete guidelines, timing details, and official instructions..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={() => setCreateModalOpen(false)}
            >
              Cancel
            </GlassButton>
            <GlassButton type="submit" variant="primary" size="sm">
              Publish Bulletin
            </GlassButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AnnouncementsPage;
