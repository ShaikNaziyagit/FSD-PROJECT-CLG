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
  Users,
  UserCheck,
  UserPlus,
  Mail,
  Github,
  Compass,
  Plus,
  Shield,
  Sparkles,
} from 'lucide-react';

const categories = ['All', 'Coding & Tech', 'Robotics & AI', 'Cultural & Arts', 'Entrepreneurship'];

const ClubsPage = () => {
  const { user, isAuthenticated, refreshUser } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New club form
  const [newClub, setNewClub] = useState({
    name: '',
    shortTag: '',
    category: 'Coding & Tech',
    description: '',
    contactEmail: '',
    logo: '',
    coverImage: '',
    facultyCoordinatorName: '',
  });

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const catParam = selectedCategory !== 'All' ? `category=${encodeURIComponent(selectedCategory)}` : '';
      const searchParam = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
      const query = [catParam, searchParam].filter(Boolean).join('&');

      const res = await api.get(`/clubs${query ? `?${query}` : ''}`);
      if (res.success) {
        setClubs(res.data);
      }
    } catch (err) {
      console.error('Failed to load clubs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [selectedCategory, searchQuery]);

  const handleToggleJoin = async (clubId, isMember) => {
    if (!isAuthenticated) {
      alert('Please sign in to join student societies & clubs.');
      return;
    }
    try {
      const res = await api.post(`/clubs/${clubId}/join`);
      if (res.success) {
        await refreshUser();
        fetchClubs();
      }
    } catch (err) {
      alert(err.message || 'Error updating membership');
    }
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newClub.name,
        shortTag: newClub.shortTag,
        category: newClub.category,
        description: newClub.description,
        contactEmail: newClub.contactEmail,
        logo: newClub.logo || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200',
        coverImage: newClub.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        facultyCoordinator: {
          name: newClub.facultyCoordinatorName || 'Faculty Advisor',
        },
      };

      const res = await api.post('/clubs', payload);
      if (res.success) {
        setCreateModalOpen(false);
        fetchClubs();
      }
    } catch (err) {
      alert(err.message || 'Error creating society');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        badge={<Badge variant="orange">Campus Guilds</Badge>}
        title="Student Societies & Clubs"
        subtitle="Join technical guilds, robotics labs, competitive programming teams, and cultural collectives."
      >
        {isAuthenticated && ['super_admin', 'faculty'].includes(user?.role) && (
          <GlassButton
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setCreateModalOpen(true)}
          >
            Charter New Club
          </GlassButton>
        )}
      </PageHeader>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'text-stone-300 hover:text-white bg-stone-900/50 hover:bg-stone-800/80 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by club name or topic..."
          className="w-full md:w-72"
        />
      </div>

      {/* Clubs Grid */}
      {loading ? (
        <LoadingSpinner size="lg" label="Synchronizing Campus Guild Directory..." />
      ) : clubs.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Societies Found"
          description="No student clubs match your current search query."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => {
            const isMember = club.members?.some(
              (m) => m === user?._id || m._id === user?._id
            );

            return (
              <GlassCard key={club._id} hoverEffect className="overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Cover Header */}
                  <div className="h-32 relative bg-stone-900 overflow-hidden">
                    <img
                      src={club.coverImage || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'}
                      alt={club.name}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120e0b] via-transparent to-transparent" />
                    
                    {/* Club Logo Avatar */}
                    <div className="absolute bottom-2 left-4 w-14 h-14 rounded-2xl bg-[#18120e] p-1 border border-orange-500/20 shadow-lg">
                      <img
                        src={club.logo || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200'}
                        alt={club.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>

                    <div className="absolute top-3 right-3">
                      <Badge variant="orange" size="xs">
                        {club.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 pt-3 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-base font-bold text-white line-clamp-1">{club.name}</h3>
                      {club.shortTag && (
                        <span className="text-[10px] font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                          {club.shortTag}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                      {club.description}
                    </p>

                    <div className="space-y-1.5 pt-2 text-xs text-stone-300">
                      {club.facultyCoordinator?.name && (
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          <span className="truncate">Advisor: {club.facultyCoordinator.name}</span>
                        </div>
                      )}
                      {club.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-orange-300 shrink-0" />
                          <span className="truncate">{club.contactEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Join Actions */}
                <div className="p-5 pt-0 mt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    <span className="text-white font-bold">{club.members?.length || 0}</span> members
                  </div>

                  <GlassButton
                    variant={isMember ? 'outline' : 'primary'}
                    size="sm"
                    icon={isMember ? UserCheck : UserPlus}
                    onClick={() => handleToggleJoin(club._id, isMember)}
                  >
                    {isMember ? 'Joined Guild' : 'Join Guild'}
                  </GlassButton>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Charter Club Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Charter New Student Society"
      >
        <form onSubmit={handleCreateClub} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Society / Club Name
            </label>
            <input
              type="text"
              required
              value={newClub.name}
              onChange={(e) => setNewClub({ ...newClub, name: e.target.value })}
              placeholder="e.g. Quantum Computing Guild"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Tag / Acronym
              </label>
              <input
                type="text"
                value={newClub.shortTag}
                onChange={(e) => setNewClub({ ...newClub, shortTag: e.target.value })}
                placeholder="e.g. QCG"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={newClub.category}
                onChange={(e) => setNewClub({ ...newClub, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              >
                <option value="Coding & Tech">Coding & Tech</option>
                <option value="Robotics & AI">Robotics & AI</option>
                <option value="Cultural & Arts">Cultural & Arts</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Faculty Advisor Name
              </label>
              <input
                type="text"
                value={newClub.facultyCoordinatorName}
                onChange={(e) => setNewClub({ ...newClub, facultyCoordinatorName: e.target.value })}
                placeholder="e.g. Dr. Priya Nair"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Official Contact Email
              </label>
              <input
                type="email"
                value={newClub.contactEmail}
                onChange={(e) => setNewClub({ ...newClub, contactEmail: e.target.value })}
                placeholder="club@campusos.edu"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Mission Statement & Description
            </label>
            <textarea
              required
              rows={3}
              value={newClub.description}
              onChange={(e) => setNewClub({ ...newClub, description: e.target.value })}
              placeholder="Charter purpose, planned activities, and meeting frequency..."
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
              Ratify & Charter Club
            </GlassButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClubsPage;
