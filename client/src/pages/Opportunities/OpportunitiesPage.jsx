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
  Compass,
  Briefcase,
  Award,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Plus,
  Clock,
  MapPin,
  CheckCircle,
} from 'lucide-react';

const categories = ['All', 'Internships', 'Hackathons', 'Jobs', 'Scholarships', 'Competitions', 'Certifications', 'Workshops'];

const OpportunitiesPage = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Creation form state
  const [newOpp, setNewOpp] = useState({
    title: '',
    organization: '',
    category: 'Internships',
    description: '',
    stipendOrPrize: '',
    location: 'Remote',
    deadline: '',
    eligibility: 'All students',
    skills: '',
    applicationUrl: '',
  });

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const catParam = selectedCategory !== 'All' ? `category=${selectedCategory}` : '';
      const searchParam = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
      const query = [catParam, searchParam].filter(Boolean).join('&');

      const res = await api.get(`/opportunities${query ? `?${query}` : ''}`);
      if (res.success) {
        setOpportunities(res.data);
      }
    } catch (err) {
      console.error('Failed to load opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [selectedCategory, searchQuery]);

  const handleToggleBookmark = async (oppId) => {
    if (!isAuthenticated) {
      alert('Please log in to save and bookmark opportunities.');
      return;
    }
    try {
      await api.post(`/opportunities/${oppId}/save`);
      await refreshUser();
      fetchOpportunities();
    } catch (err) {
      alert(err.message || 'Error updating bookmark');
    }
  };

  const handleCreateOpportunity = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/opportunities', newOpp);
      if (res.success) {
        setCreateModalOpen(false);
        setNewOpp({
          title: '',
          organization: '',
          category: 'Internships',
          description: '',
          stipendOrPrize: '',
          location: 'Remote',
          deadline: '',
          eligibility: 'All students',
          skills: '',
          applicationUrl: '',
        });
        fetchOpportunities();
      }
    } catch (err) {
      alert(err.message || 'Error posting opportunity');
    }
  };

  const displayedOpportunities = onlySaved
    ? opportunities.filter((o) =>
        user?.savedOpportunities?.some((savedId) => savedId === o._id || savedId._id === o._id)
      )
    : opportunities;

  return (
    <div className="space-y-6">
      <PageHeader
        badge={<Badge variant="emerald">Opportunity Discovery Radar</Badge>}
        title="Career & Growth Radar"
        subtitle="Curated summer internships, enterprise hackathons, research fellowships, and prestigious scholarships."
      >
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                onlySaved
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              {onlySaved ? <BookmarkCheck className="w-3.5 h-3.5 text-cyan-400" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>Saved ({user?.savedOpportunities?.length || 0})</span>
            </button>
          )}

          {isAuthenticated && ['faculty', 'club_admin', 'super_admin'].includes(user?.role) && (
            <GlassButton
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setCreateModalOpen(true)}
            >
              Post Opportunity
            </GlassButton>
          )}
        </div>
      </PageHeader>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-slate-900/50 hover:bg-white/5 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by role, skills, company..."
          className="w-full md:w-72"
        />
      </div>

      {/* Opportunities List */}
      {loading ? (
        <LoadingSpinner size="lg" label="Searching Campus Opportunity Network..." />
      ) : displayedOpportunities.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No Opportunities Found"
          description={onlySaved ? "You haven't bookmarked any opportunities yet." : "No open opportunities match your current filter parameters."}
          actionLabel="Reset Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSearchQuery('');
            setOnlySaved(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedOpportunities.map((opp) => {
            const isBookmarked = user?.savedOpportunities?.some(
              (id) => id === opp._id || id._id === opp._id
            );

            return (
              <GlassCard key={opp._id} hoverEffect className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="cyan" size="xs">
                      {opp.category}
                    </Badge>
                    <button
                      onClick={() => handleToggleBookmark(opp._id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark opportunity'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-300 mb-3">{opp.organization}</p>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Skills tags */}
                  {opp.skills && opp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {opp.skills.slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-white/5"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-400 mb-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    {opp.stipendOrPrize}
                  </div>

                  <a
                    href={opp.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center"
                  >
                    <GlassButton variant="primary" size="sm" icon={ExternalLink} iconPosition="right">
                      Apply Now
                    </GlassButton>
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Modal for Creating Opportunity */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Broadcast Campus Opportunity"
      >
        <form onSubmit={handleCreateOpportunity} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Title
            </label>
            <input
              type="text"
              required
              value={newOpp.title}
              onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
              placeholder="e.g. SDE Summer Intern 2026"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Organization / Company
              </label>
              <input
                type="text"
                required
                value={newOpp.organization}
                onChange={(e) => setNewOpp({ ...newOpp, organization: e.target.value })}
                placeholder="e.g. Microsoft / ISRO"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={newOpp.category}
                onChange={(e) => setNewOpp({ ...newOpp, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              >
                <option value="Internships">Internships</option>
                <option value="Hackathons">Hackathons</option>
                <option value="Jobs">Jobs</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Competitions">Competitions</option>
                <option value="Certifications">Certifications</option>
                <option value="Workshops">Workshops</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Stipend / Prize
              </label>
              <input
                type="text"
                value={newOpp.stipendOrPrize}
                onChange={(e) => setNewOpp({ ...newOpp, stipendOrPrize: e.target.value })}
                placeholder="e.g. ₹1,20,000 / month"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Deadline
              </label>
              <input
                type="date"
                required
                value={newOpp.deadline}
                onChange={(e) => setNewOpp({ ...newOpp, deadline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={newOpp.skills}
              onChange={(e) => setNewOpp({ ...newOpp, skills: e.target.value })}
              placeholder="e.g. React, Node.js, Go, Kubernetes"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Application URL / Portal Link
            </label>
            <input
              type="url"
              required
              value={newOpp.applicationUrl}
              onChange={(e) => setNewOpp({ ...newOpp, applicationUrl: e.target.value })}
              placeholder="https://company.com/apply"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={newOpp.description}
              onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
              placeholder="Eligibility, job requirements, and selection process..."
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
              Publish Opportunity
            </GlassButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OpportunitiesPage;
