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
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  Tag,
  ExternalLink,
} from 'lucide-react';

const categories = ['All', 'Technical', 'Hackathons', 'Cultural', 'Workshops', 'Seminars', 'Sports'];

const EventsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form for creating new event
  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Technical',
    date: '',
    time: '10:00 AM',
    location: '',
    description: '',
    maxCapacity: 150,
    banner: '',
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory !== 'All' ? `category=${selectedCategory}` : '';
      const searchParam = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
      const query = [categoryParam, searchParam].filter(Boolean).join('&');

      const res = await api.get(`/events${query ? `?${query}` : ''}`);
      if (res.success) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, searchQuery]);

  const handleRegisterToggle = async (eventId, isRegistered) => {
    if (!isAuthenticated) {
      alert('Please log in to register for campus events.');
      return;
    }

    try {
      const endpoint = isRegistered
        ? `/events/${eventId}/cancel`
        : `/events/${eventId}/register`;
      const res = await api.post(endpoint);

      if (res.success) {
        // Optimistic refresh
        fetchEvents();
      }
    } catch (err) {
      alert(err.message || 'Action failed.');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/events', {
        ...newEvent,
        banner: newEvent.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      });
      if (res.success) {
        setCreateModalOpen(false);
        setNewEvent({
          title: '',
          category: 'Technical',
          date: '',
          time: '10:00 AM',
          location: '',
          description: '',
          maxCapacity: 150,
          banner: '',
        });
        fetchEvents();
      }
    } catch (err) {
      alert(err.message || 'Error creating event');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        badge={<Badge variant="purple">Campus Calendar</Badge>}
        title="Events & Hackathons"
        subtitle="Discover collegiate hackathons, guest lectures, technical summits, and cultural celebrations."
      >
        {isAuthenticated && ['faculty', 'club_admin', 'super_admin'].includes(user?.role) && (
          <GlassButton
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setCreateModalOpen(true)}
          >
            Host New Event
          </GlassButton>
        )}
      </PageHeader>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
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
          placeholder="Search events, workshops, hackathons..."
          className="w-full md:w-72"
        />
      </div>

      {/* Events Grid */}
      {loading ? (
        <LoadingSpinner size="lg" label="Querying Campus Event Grid..." />
      ) : events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No Campus Events Found"
          description="There are currently no events matching your criteria. Try adjusting the category or search keywords."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => {
            const isRegistered = ev.attendees?.some(
              (a) => a.user?._id === user?._id || a.user === user?._id
            );
            const remainingSeats = Math.max(0, ev.maxCapacity - (ev.attendees?.length || 0));

            return (
              <GlassCard key={ev._id} hoverEffect className="overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Banner Image */}
                  <div className="h-44 relative overflow-hidden bg-slate-900">
                    <img
                      src={
                        ev.banner ||
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
                      }
                      alt={ev.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1226] via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="purple" size="xs">
                        {ev.category}
                      </Badge>
                    </div>
                    {ev.featured && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="cyan" size="xs">
                          Featured Flagship
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{new Date(ev.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Organized by {ev.organizer}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-5 pt-0 mt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span className="text-cyan-300 font-bold">{remainingSeats}</span> spots left
                  </div>

                  <GlassButton
                    variant={isRegistered ? 'danger' : 'primary'}
                    size="sm"
                    onClick={() => handleRegisterToggle(ev._id, isRegistered)}
                    icon={isRegistered ? XCircle : CheckCircle2}
                  >
                    {isRegistered ? 'Withdraw' : 'Register Pass'}
                  </GlassButton>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Host New Event Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Publish Campus Event"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              required
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="e.g. AI Agent Hackathon 2026"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              >
                <option value="Technical">Technical</option>
                <option value="Hackathons">Hackathons</option>
                <option value="Cultural">Cultural</option>
                <option value="Workshops">Workshops</option>
                <option value="Seminars">Seminars</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Seat Capacity
              </label>
              <input
                type="number"
                value={newEvent.maxCapacity}
                onChange={(e) => setNewEvent({ ...newEvent, maxCapacity: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Event Date
              </label>
              <input
                type="date"
                required
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Time Slot
              </label>
              <input
                type="text"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                placeholder="10:00 AM - 04:00 PM"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Campus Venue / Location
            </label>
            <input
              type="text"
              required
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="e.g. APJ Abdul Kalam Auditorium"
              className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description & Highlights
            </label>
            <textarea
              required
              rows={3}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Provide event schedule, rules, and speaker details..."
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
              Confirm & Publish Event
            </GlassButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventsPage;
