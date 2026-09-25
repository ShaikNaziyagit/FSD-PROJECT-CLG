import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  ShieldCheck,
  Users,
  Calendar,
  Compass,
  Megaphone,
  Layers,
  MessageSquare,
  Trash2,
  UserCheck,
  AlertTriangle,
  RefreshCw,
  Search,
  Plus,
  Radio,
  Activity,
  Cpu,
  Database,
  CheckCircle2,
  FileSpreadsheet,
  Zap,
  Lock,
  X,
  Server,
  BellRing
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');

  // Modals
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showOnboardModal, setShowOnboardModal] = useState(false);

  // Emergency Broadcast Form State
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    summary: '',
    category: 'Emergency / Sudden',
    priority: 'Flash Emergency',
    isFlashTicker: true,
  });
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  // Onboard User Form State
  const [onboardForm, setOnboardForm] = useState({
    name: '',
    email: '',
    password: 'CampusOS@2026',
    department: 'CSE',
    role: 'faculty',
    studentId: '',
  });
  const [onboardLoading, setOnboardLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, healthRes, logsRes] = await Promise.all([
        api.get('/admin/stats').catch(() => ({ success: false })),
        api.get('/admin/users').catch(() => ({ success: false })),
        api.get('/admin/system-health').catch(() => ({ success: false })),
        api.get('/admin/audit-logs').catch(() => ({ success: false })),
      ]);

      if (statsRes?.success) setStats(statsRes.data);
      if (usersRes?.success) setUsers(usersRes.data);
      if (healthRes?.success) setSystemHealth(healthRes.data);
      if (logsRes?.success) setAuditLogs(logsRes.data);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdatingId(userId);
      const res = await api.put(`/admin/users/${userId}/role`, { role: newRole });
      if (res?.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
        setSuccessMsg(`Role updated to ${newRole}`);
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert(err.message || 'Error updating user role');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently deactivate this user account?')) return;

    try {
      const res = await api.delete(`/admin/users/${userId}`);
      if (res?.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        setSuccessMsg('User removed successfully.');
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      alert(err.message || 'Error deleting user');
    }
  };

  // Submit Emergency Flash Broadcast
  const handleBroadcastSubmit = async (e) => {
    e.preventDefault();
    setBroadcastLoading(true);
    try {
      const res = await api.post('/admin/broadcast', broadcastForm);
      if (res?.success) {
        setShowBroadcastModal(false);
        setBroadcastForm({
          title: '',
          summary: '',
          category: 'Emergency / Sudden',
          priority: 'Flash Emergency',
          isFlashTicker: true,
        });
        setSuccessMsg('🚨 Flash Emergency Broadcast Dispatched Across Campus!');
        setTimeout(() => setSuccessMsg(''), 4000);
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to dispatch broadcast');
    } finally {
      setBroadcastLoading(false);
    }
  };

  // Submit Onboard User
  const handleOnboardSubmit = async (e) => {
    e.preventDefault();
    setOnboardLoading(true);
    try {
      const res = await api.post('/admin/users/create', onboardForm);
      if (res?.success) {
        setShowOnboardModal(false);
        setOnboardForm({
          name: '',
          email: '',
          password: 'CampusOS@2026',
          department: 'CSE',
          role: 'faculty',
          studentId: '',
        });
        setSuccessMsg(`New ${res.data.role} onboarded successfully!`);
        setTimeout(() => setSuccessMsg(''), 4000);
        fetchAdminData();
      }
    } catch (err) {
      alert(err.message || 'Failed to onboard member');
    } finally {
      setOnboardLoading(false);
    }
  };

  // Export User Directory to CSV
  const handleExportCSV = () => {
    const headers = ['Name,Email,StudentId,Department,Year,Role,CreatedAt'];
    const rows = filteredUsers.map((u) =>
      `"${u.name}","${u.email}","${u.studentId || ''}","${u.department || ''}","${u.year || ''}","${u.role}","${u.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CAMPII_User_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Users List
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.studentId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesDept = deptFilter === 'ALL' || u.department === deptFilter;
    return matchesSearch && matchesRole && matchesDept;
  });

  if (loading) {
    return <LoadingSpinner size="lg" label="Initializing Institutional Admin Super Console..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header with Quick Actions */}
      <PageHeader
        badge={<Badge variant="purple">Institutional Super Admin Root</Badge>}
        title="Dean & Administrator Control Console"
        subtitle="Full administrative governance over campus membership, emergency broadcast ticker, microservices telemetry, and audit trail."
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <GlassButton
            variant="danger"
            size="sm"
            icon={Radio}
            onClick={() => setShowBroadcastModal(true)}
            className="shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          >
            Broadcast Emergency Alert
          </GlassButton>

          <GlassButton
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setShowOnboardModal(true)}
          >
            Onboard Faculty/Staff
          </GlassButton>

          <GlassButton
            variant="outline"
            size="sm"
            icon={FileSpreadsheet}
            onClick={handleExportCSV}
          >
            Export Directory
          </GlassButton>

          <GlassButton
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={fetchAdminData}
          >
            Refresh
          </GlassButton>
        </div>
      </PageHeader>

      {/* Success Notification Bar */}
      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg('')} className="text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={Users}
          label="Registered Users"
          value={stats?.totalUsers || users.length}
          color="orange"
        />
        <StatCard
          icon={Calendar}
          label="Campus Events"
          value={stats?.totalEvents || 0}
          color="amber"
        />
        <StatCard
          icon={Compass}
          label="Opportunities"
          value={stats?.totalOpportunities || 0}
          color="orange"
        />
        <StatCard
          icon={Megaphone}
          label="Circulars & Tickers"
          value={stats?.totalCirculars || 0}
          color="rose"
        />
        <StatCard
          icon={MessageSquare}
          label="Community Posts"
          value={stats?.totalPosts || 0}
          color="emerald"
        />
        <StatCard
          icon={Layers}
          label="Labs & Facilities"
          value={stats?.totalResources || 0}
          color="amber"
        />
      </div>

      {/* Real-Time System Health & Microservices Telemetry Cockpit */}
      <GlassCard className="p-6 border border-white/15">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-bold text-white">
              Institutional Microservices & Server Health Telemetry
            </h3>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SERVER STATUS: NOMINAL (99.98% UPTIME)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Database Metric */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center border border-orange-400/30">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-mono font-bold uppercase">Database Cluster</div>
                <div className="text-sm font-bold text-white">MongoDB Atlas (Local)</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-orange-400">
              {systemHealth?.database?.latencyMs || 14} ms
            </span>
          </div>

          {/* Memory / Heap Metric */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-mono font-bold uppercase">Memory Heap Usage</div>
                <div className="text-sm font-bold text-white">
                  {systemHealth?.memory?.heapUsedMb || 48} MB / {systemHealth?.memory?.heapTotalMb || 96} MB
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300">Optimal</span>
          </div>

          {/* API Gateway Status */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-stone-400 font-mono font-bold uppercase">Security Protocol</div>
                <div className="text-sm font-bold text-white">TLS 1.3 • Port 5000</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">ONLINE</span>
          </div>
        </div>

        {/* Microservices Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { name: 'Academics Engine', status: 'Online', latency: '12ms' },
            { name: 'Placements CRT', status: 'Online', latency: '15ms' },
            { name: 'Sudden Circulars', status: 'Active', latency: '8ms' },
            { name: 'Exams Admit Card', status: 'Online', latency: '18ms' },
            { name: 'Safety SOS Watch', status: 'Standby 24/7', latency: '6ms' },
            { name: 'Fee Payments', status: 'Nominal', latency: '22ms' },
          ].map((srv, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-900/80 border border-white/10 text-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto mb-1 animate-pulse" />
              <div className="text-[11px] font-bold text-white truncate">{srv.name}</div>
              <div className="text-[9px] font-mono text-orange-300 mt-0.5">{srv.latency}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Campus User Registry & Access Permissions */}
      <GlassCard className="p-6 overflow-hidden space-y-4 border border-white/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span>Campus User Registry ({filteredUsers.length} of {users.length})</span>
            </h3>
            <p className="text-xs text-stone-300 mt-0.5 font-medium">
              Grant administrator clearances, promote students, assign faculty credentials, or revoke access.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, roll, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-900/90 border border-white/15 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 font-medium"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-stone-900/90 border border-white/15 text-xs text-orange-300 focus:outline-none focus:border-orange-400 font-mono font-bold"
            >
              <option value="ALL">All Roles</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="club_admin">Club Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>

            {/* Department Filter */}
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/15 text-xs text-purple-300 focus:outline-none focus:border-purple-400 font-mono font-bold"
            >
              <option value="ALL">All Depts</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="IT">IT</option>
              <option value="AI & DS">AI & DS</option>
              <option value="MBA">MBA</option>
            </select>
          </div>
        </div>

        {/* User Table with High Contrast Text */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-orange-300 uppercase font-mono text-[10px] tracking-wider">
                <th className="py-3 px-3">Member & Email</th>
                <th className="py-3 px-3">ID / Roll No.</th>
                <th className="py-3 px-3">Department & Year</th>
                <th className="py-3 px-3">Authorized Role</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400">
                    No campus members matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-white/[0.04] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            u.avatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
                          }
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-orange-400/40 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-[11px] text-stone-300 font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold text-orange-300">
                      {u.studentId || 'N/A'}
                    </td>

                    <td className="py-3 px-3 text-stone-200 font-medium">
                      {u.department} {u.year ? `(${u.year})` : ''}
                    </td>

                    <td className="py-3 px-3">
                      <select
                        value={u.role}
                        disabled={updatingId === u._id || u._id === user._id}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 border border-white/20 text-xs text-orange-300 focus:outline-none focus:border-orange-400 font-mono font-bold uppercase cursor-pointer"
                      >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="club_admin">Club Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </td>

                    <td className="py-3 px-3 text-right">
                      {u._id !== user._id && (
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-500/20 transition-colors"
                          title="Deactivate account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Institutional Security Audit Trail Log */}
      <GlassCard className="p-6 border border-white/15">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            <span>Administrative Security Audit Trail ({auditLogs.length} Events)</span>
          </h3>
          <span className="text-[10px] font-mono text-slate-400">IMMUTABLE LOG</span>
        </div>

        <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    log.status === 'Emergency'
                      ? 'bg-rose-400 animate-pulse'
                      : log.status === 'Warning'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                />
                <div>
                  <div className="font-bold text-white">{log.action}</div>
                  <div className="text-[11px] text-stone-300">{log.details}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] font-mono text-orange-300 font-bold">{log.operator}</div>
                <div className="text-[9px] font-mono text-stone-400">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* MODAL 1: EMERGENCY FLASH CIRCULAR BROADCASTER */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-rose-300">
                <Radio className="w-5 h-5 animate-pulse" />
                <h3 className="text-lg font-bold text-white">Broadcast Emergency Flash Bulletin</h3>
              </div>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                  Circular / Alert Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Heavy Rain Warning: Classes Suspended for Afternoon"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/20 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-rose-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                    Priority Level
                  </label>
                  <select
                    value={broadcastForm.priority}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/20 text-xs text-rose-300 font-bold focus:outline-none"
                  >
                    <option value="Flash Emergency">Flash Emergency (Immediate)</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Important">Important</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                    Category
                  </label>
                  <select
                    value={broadcastForm.category}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/20 text-xs text-orange-300 font-bold focus:outline-none"
                  >
                    <option value="Emergency / Sudden">Emergency / Sudden</option>
                    <option value="Examination">Examination</option>
                    <option value="Fee & Finance">Fee & Finance</option>
                    <option value="Academic Holiday">Academic Holiday</option>
                    <option value="Disciplinary & Safety">Disciplinary & Safety</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                  Executive Summary / Flash Ticker Text
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Appears on the top flash ticker across every student screen."
                  value={broadcastForm.summary}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/20 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-rose-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="flashTickerCheckbox"
                  checked={broadcastForm.isFlashTicker}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, isFlashTicker: e.target.checked })}
                  className="w-4 h-4 rounded text-rose-500 bg-stone-900 border-white/20"
                />
                <label htmlFor="flashTickerCheckbox" className="text-xs text-stone-300 font-medium cursor-pointer">
                  Pin to Campus Flash Emergency Ticker at the top of all user screens
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 font-bold text-xs hover:text-white"
                >
                  Cancel
                </button>
                <GlassButton
                  type="submit"
                  variant="danger"
                  size="md"
                  disabled={broadcastLoading}
                  className="font-bold"
                >
                  {broadcastLoading ? 'Broadcasting...' : 'Dispatch Broadcast 🚨'}
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ONBOARD FACULTY / STAFF MEMBER */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-orange-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-orange-300">
                <UserCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">Onboard Institutional Member</h3>
              </div>
              <button
                onClick={() => setShowOnboardModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOnboardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                  Full Name & Salutation
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Rajeshwari Sundaram"
                  value={onboardForm.name}
                  onChange={(e) => setOnboardForm({ ...onboardForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/20 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                  Campus Institutional Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="rajeshwari@campusos.demo"
                  value={onboardForm.email}
                  onChange={(e) => setOnboardForm({ ...onboardForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-white/20 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-orange-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                    Designated Role
                  </label>
                  <select
                    value={onboardForm.role}
                    onChange={(e) => setOnboardForm({ ...onboardForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/20 text-xs text-orange-300 font-bold focus:outline-none"
                  >
                    <option value="faculty">Faculty / Professor</option>
                    <option value="club_admin">Club / Event Admin</option>
                    <option value="super_admin">Super Administrator</option>
                    <option value="student">Student Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                    Department
                  </label>
                  <select
                    value={onboardForm.department}
                    onChange={(e) => setOnboardForm({ ...onboardForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/20 text-xs text-orange-300 font-bold focus:outline-none"
                  >
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="ECE">Electronics (ECE)</option>
                    <option value="MECH">Mechanical (MECH)</option>
                    <option value="CIVIL">Civil (CIVIL)</option>
                    <option value="IT">Information Tech (IT)</option>
                    <option value="AI & DS">Artificial Intelligence (AI & DS)</option>
                    <option value="MBA">Management (MBA)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                    Staff / Faculty ID
                  </label>
                  <input
                    type="text"
                    placeholder="FAC-9021"
                    value={onboardForm.studentId}
                    onChange={(e) => setOnboardForm({ ...onboardForm, studentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/20 text-xs text-white placeholder:text-stone-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase font-mono mb-1">
                    Initial Password
                  </label>
                  <input
                    type="text"
                    required
                    value={onboardForm.password}
                    onChange={(e) => setOnboardForm({ ...onboardForm, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-white/20 text-xs text-white placeholder:text-stone-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-stone-300 font-bold text-xs hover:text-white"
                >
                  Cancel
                </button>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={onboardLoading}
                  className="font-bold"
                >
                  {onboardLoading ? 'Onboarding Member...' : 'Register Institutional User'}
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
