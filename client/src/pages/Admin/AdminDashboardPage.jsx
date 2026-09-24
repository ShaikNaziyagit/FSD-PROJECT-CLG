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
} from 'lucide-react';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (usersRes.success) setUsers(usersRes.data);
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
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
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
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (err) {
      alert(err.message || 'Error deleting user');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Initializing Admin Core Console..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        badge={<Badge variant="rose">Campus Super Admin</Badge>}
        title="Institutional Control Console"
        subtitle="Manage platform membership, authorize roles, monitor telemetry across the campus operating system."
      >
        <GlassButton variant="outline" size="sm" icon={RefreshCw} onClick={fetchAdminData}>
          Refresh Metrics
        </GlassButton>
      </PageHeader>

      {/* Aggregate System Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats?.totalUsers || 0}
          color="cyan"
        />
        <StatCard
          icon={Calendar}
          label="Events"
          value={stats?.totalEvents || 0}
          color="purple"
        />
        <StatCard
          icon={Compass}
          label="Opportunities"
          value={stats?.totalOpportunities || 0}
          color="blue"
        />
        <StatCard
          icon={Megaphone}
          label="Bulletins"
          value={stats?.totalAnnouncements || 0}
          color="emerald"
        />
        <StatCard
          icon={MessageSquare}
          label="Discussions"
          value={stats?.totalPosts || 0}
          color="cyan"
        />
        <StatCard
          icon={Layers}
          label="Facilities"
          value={stats?.totalResources || 0}
          color="purple"
        />
      </div>

      {/* User Directory Management Table */}
      <GlassCard className="p-6 overflow-hidden space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Campus User Registry ({users.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Change permissions or manage account status across academic departments
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-3">User & Email</th>
                <th className="py-3 px-3">Student / Faculty ID</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Role Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          u.avatar ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
                        }
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <div className="font-semibold text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-300">
                    {u.studentId || 'N/A'}
                  </td>

                  <td className="py-3 px-3 text-slate-300">
                    {u.department} ({u.year})
                  </td>

                  <td className="py-3 px-3">
                    <select
                      value={u.role}
                      disabled={updatingId === u._id || u._id === user._id}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono uppercase"
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
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Deactivate account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminDashboardPage;
