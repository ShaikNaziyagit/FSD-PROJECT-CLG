import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  Compass,
  Search,
  Filter,
  PlusCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  X,
  HelpCircle,
  Tag,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

const LostFoundPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'Lost' | 'Found'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportType, setReportType] = useState('Lost'); // 'Lost' | 'Found'
  const [claimingItem, setClaimingItem] = useState(null);
  const [claimNotes, setClaimNotes] = useState('');
  const [claimSuccess, setClaimSuccess] = useState('');

  // New Item Form
  const [form, setForm] = useState({
    title: '',
    category: 'Wallet / Purse',
    description: '',
    location: '',
    approximateTime: '',
    rewardAmount: 0,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get('/lost-found');
      if (res.data) setItems(res.data);
    } catch (err) {
      console.error('Failed to load lost & found items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        type: reportType,
        rewardAmount: parseInt(form.rewardAmount || '0', 10),
      };

      const res = await api.post('/lost-found', payload);
      if (res.data) {
        setItems((prev) => [res.data, ...prev]);
      }
      setReportModalOpen(false);
      setForm({
        title: '',
        category: 'Wallet / Purse',
        description: '',
        location: '',
        approximateTime: '',
        rewardAmount: 0,
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        imageUrl: '',
      });
    } catch (err) {
      console.error('Error reporting item:', err);
    }
  };

  const handleClaim = async (e) => {
    e.preventDefault();
    if (!claimingItem) return;

    try {
      await api.post(`/lost-found/${claimingItem._id}/claim`, { claimNotes });
      setClaimSuccess('Claim submitted! Campus Security has been alerted for identification verification.');
      setTimeout(() => {
        setClaimSuccess('');
        setClaimingItem(null);
        setClaimNotes('');
      }, 2000);
    } catch (err) {
      console.error('Claim error:', err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) {
    return <LoadingSpinner size="lg" label="Retrieving Campus Lost & Found Registry..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-amber-500/20 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/15 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              CAMPUS SECURITY PROPERTY REPOSITORY & LOST LEDGER
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Lost Belongings &{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Found Property
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Report lost money, cash wallets, smart devices, earbuds, keys, or calculators. Track items found across campus and submit verification claims.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <GlassButton
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={() => {
                setReportType('Lost');
                setReportModalOpen(true);
              }}
            >
              Report Lost Item
            </GlassButton>
            <GlassButton
              variant="secondary"
              size="sm"
              icon={CheckCircle2}
              onClick={() => {
                setReportType('Found');
                setReportModalOpen(true);
              }}
            >
              Report Found Item
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search lost cash, wallet, calculator, keys, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400/50"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Lost', 'Found'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedType === t
                  ? t === 'Lost'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : t === 'Found'
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                    : 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {t === 'All' ? 'All Items' : t === 'Lost' ? 'Lost Belongings' : 'Found Items'}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isLost = item.type === 'Lost';

          return (
            <GlassCard key={item._id} hoverEffect className="p-5 flex flex-col justify-between space-y-4">
              <div>
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={isLost ? 'rose' : 'emerald'} size="xs">
                      {isLost ? 'MISSING / LOST' : 'FOUND & RECOVERED'}
                    </Badge>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {item.category}
                    </span>
                  </div>

                  {item.rewardAmount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      ₹{item.rewardAmount} Reward
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white leading-snug mb-2">{item.title}</h3>

                {/* Image if available */}
                {item.imageUrl && (
                  <div className="w-full h-36 rounded-xl overflow-hidden mb-3 border border-white/10 bg-black/40">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  {item.description}
                </p>

                {/* Location & Time Box */}
                <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Location: <strong className="text-white">{item.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Reported: {new Date(item.dateReported).toLocaleDateString()} • {item.approximateTime}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Contact & Claim */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-400 overflow-hidden">
                  <span className="block truncate">Contact: <strong className="text-slate-200">{item.contactName}</strong></span>
                  {item.contactPhone && (
                    <span className="text-[10px] font-mono text-cyan-300 block truncate">{item.contactPhone}</span>
                  )}
                </div>

                {item.status === 'Resolved / Returned' ? (
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Returned
                  </span>
                ) : (
                  <GlassButton
                    variant="primary"
                    size="sm"
                    onClick={() => setClaimingItem(item)}
                  >
                    {isLost ? 'I Found This' : 'Claim Item'}
                  </GlassButton>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                CAMPUS PROPERTY DIRECTORY
              </span>
              <h3 className="text-lg font-bold text-white">
                Report {reportType === 'Lost' ? 'Lost Belonging / Cash' : 'Found Campus Property'}
              </h3>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Item Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Black Leather Wallet with ₹2,000 cash & ID Card"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Category:</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Cash / Money">Cash / Money</option>
                    <option value="Wallet / Purse">Wallet / Purse</option>
                    <option value="Student ID Card / Keys">Student ID Card / Keys</option>
                    <option value="Laptop / Phone / Electronics">Laptop / Phone / Electronics</option>
                    <option value="Earbuds / Headphones">Earbuds / Headphones</option>
                    <option value="Books / Calculators / Notes">Books / Calculators / Notes</option>
                    <option value="Bags & Backpacks">Bags & Backpacks</option>
                    <option value="Other Belongings">Other Belongings</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Reward (Optional, INR):</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 500"
                    value={form.rewardAmount}
                    onChange={(e) => setForm({ ...form, rewardAmount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Location Lost / Found:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Central Library 2nd Floor, Food Court Bench, Lab 3"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Approximate Time / Date:</label>
                <input
                  type="text"
                  placeholder="e.g. Today around 01:30 PM after lunch"
                  value={form.approximateTime}
                  onChange={(e) => setForm({ ...form, approximateTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Detailed Description & Distinct Features:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mention unique identifying marks, stickers, color, currency denominations, etc."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Image URL (Optional):</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Your Name / Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="Arjun Sharma"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Contact Phone / WhatsApp:</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <GlassButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                >
                  Cancel
                </GlassButton>
                <GlassButton variant="primary" size="sm" type="submit">
                  Publish to Campus Board
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {claimingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setClaimingItem(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              Claim: {claimingItem.title}
            </h3>

            <p className="text-xs text-slate-300">
              Please enter proof of ownership or exact description (e.g. serial numbers, specific stickers, contents of wallet) so the campus security desk or finder can verify.
            </p>

            <form onSubmit={handleClaim} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder="Explain how you can prove ownership of this item..."
                value={claimNotes}
                onChange={(e) => setClaimNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />

              {claimSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  {claimSuccess}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <GlassButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setClaimingItem(null)}
                >
                  Cancel
                </GlassButton>
                <GlassButton variant="primary" size="sm" type="submit">
                  Submit Claim Verification
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFoundPage;
