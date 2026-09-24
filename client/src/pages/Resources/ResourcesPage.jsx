import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  Layers,
  BookOpen,
  Cpu,
  Monitor,
  Briefcase,
  HeartPulse,
  Wrench,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Building,
} from 'lucide-react';

const categories = ['All', 'Library', 'Labs', 'Computer Center', 'Placement Cell', 'Medical Center'];

// Map icon strings to Lucide components
const iconMap = {
  BookOpen,
  Cpu,
  Monitor,
  Briefcase,
  HeartPulse,
  Wrench,
  Building,
};

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchResources = async () => {
    try {
      setLoading(true);
      const catParam = selectedCategory !== 'All' ? `category=${encodeURIComponent(selectedCategory)}` : '';
      const searchParam = searchQuery ? `search=${encodeURIComponent(searchQuery)}` : '';
      const query = [catParam, searchParam].filter(Boolean).join('&');

      const res = await api.get(`/resources${query ? `?${query}` : ''}`);
      if (res.success) {
        setResources(res.data);
      }
    } catch (err) {
      console.error('Failed to load campus resources:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      <PageHeader
        badge={<Badge variant="blue">Infrastructure Directory</Badge>}
        title="Campus Facilities & Resources"
        subtitle="Directory of research laboratories, 24/7 central libraries, medical hubs, and academic support cells."
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
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
          placeholder="Search facilities or services..."
          className="w-full md:w-72"
        />
      </div>

      {/* Resources Cards Grid */}
      {loading ? (
        <LoadingSpinner size="lg" label="Querying Campus Facility Systems..." />
      ) : resources.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No Facility Records Found"
          description="No facilities match the chosen category or search criteria."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedCategory('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => {
            const IconComponent = iconMap[res.iconName] || Building;

            return (
              <GlassCard key={res._id} hoverEffect className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-sm">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {res.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {res.name}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-300 py-3 border-y border-white/5 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{res.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{res.openingHours}</span>
                    </div>
                    {res.contact?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{res.contact.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Available Services */}
                  {res.availableServices && res.availableServices.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold tracking-wider">
                        Available Services
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {res.availableServices.map((svc, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-slate-900/60 text-slate-300 border border-white/5"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {res.contact?.incharge && (
                  <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Officer in charge:</span>
                    <span className="text-slate-200 font-medium truncate max-w-[170px]">
                      {res.contact.incharge}
                    </span>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
