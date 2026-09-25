import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/common/GlassCard';
import GlassButton from '../../components/common/GlassButton';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import api from '../../services/api';
import {
  ShieldAlert,
  AlertTriangle,
  PhoneCall,
  UserX,
  Lock,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  FileWarning,
  Send,
  Sparkles,
  X,
  EyeOff,
  Flame,
} from 'lucide-react';

const CampusSafetyPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [codeOfConduct, setCodeOfConduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [incidentForm, setIncidentForm] = useState({
    incidentType: 'Campus Altercation / Fight',
    location: '',
    description: '',
    severity: 'High',
    personsInvolved: '',
    contactPhone: '',
  });

  // SOS Quick State
  const [sosTriggered, setSosTriggered] = useState(false);
  const [reportSuccess, setReportSuccess] = useState('');

  useEffect(() => {
    fetchSafetyData();
  }, []);

  const fetchSafetyData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/safety');
      if (res.data) setIncidents(res.data);
      if (res.emergencyContacts) setEmergencyContacts(res.emergencyContacts);
      if (res.codeOfConductRules) setCodeOfConduct(res.codeOfConductRules);
    } catch (err) {
      console.error('Failed to load safety data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReportIncident = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...incidentForm,
        isAnonymous,
      };

      const res = await api.post('/safety/report', payload);
      if (res.data) {
        setIncidents((prev) => [res.data, ...prev]);
      }
      setReportSuccess('Confidential Incident Report logged! Proctorial Squad assigned.');
      setTimeout(() => {
        setReportSuccess('');
        setReportModalOpen(false);
        setIncidentForm({
          incidentType: 'Campus Altercation / Fight',
          location: '',
          description: '',
          severity: 'High',
          personsInvolved: '',
          contactPhone: '',
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to submit incident report:', err);
    }
  };

  const handleTriggerSOS = () => {
    setSosTriggered(true);
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Connecting to Campus Vigilance Core..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-rose-500/30 overflow-hidden shadow-glass-glow">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-500/20 via-red-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-mono">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              CAMPUS VIGILANCE, ANTI-RAGGING & STUDENT SAFETY HUB
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Campus Safety &{' '}
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-red-400 bg-clip-text text-transparent">
                Disciplinary Vigilance
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Confidential, 100% anonymous incident reporting for campus fights, harassment, ragging, hostel disputes, and 24/7 rapid emergency SOS response.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTriggerSOS}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/40 flex items-center gap-2 animate-pulse transition-all hover:scale-105"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>Emergency SOS Alert</span>
            </button>

            <GlassButton
              variant="primary"
              size="sm"
              icon={Lock}
              onClick={() => setReportModalOpen(true)}
            >
              Report Incident (Anonymous)
            </GlassButton>
          </div>
        </div>
      </div>

      {/* SOS Active Modal */}
      {sosTriggered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in zoom-in-95">
          <div className="max-w-md w-full bg-rose-950/90 border-2 border-rose-500 p-6 sm:p-8 rounded-3xl space-y-4 shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500 flex items-center justify-center mx-auto animate-bounce">
              <ShieldAlert className="w-8 h-8 text-rose-300" />
            </div>

            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              EMERGENCY SOS SIGNAL ACTIVATED
            </h3>

            <p className="text-xs text-rose-200 leading-relaxed">
              Campus Security Patrol and Quick Response Team (QRT) have been notified of an immediate distress signal. Your geolocation has been dispatched to the Main Gate Control Room.
            </p>

            <div className="p-3 bg-black/60 rounded-xl text-left font-mono text-xs space-y-1 text-slate-300 border border-rose-500/30">
              <p>CSO Hotline: <strong className="text-white">+91 11 2659 7999</strong></p>
              <p>Ambulance Dispatch: <strong className="text-white">108 / +91 11 2659 7108</strong></p>
              <p>Proctorial Squad: <strong className="text-white">+91 94120 44556</strong></p>
            </div>

            <button
              onClick={() => setSosTriggered(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Acknowledge & Dismiss Alert
            </button>
          </div>
        </div>
      )}

      {/* 2-Column: Left = Incident Board, Right = 24x7 Hotlines & Code of Conduct */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Incidents Log & Resolution Status */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-rose-400" />
              <span>Campus Vigilance Incident Log</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {incidents.length} Reported Events
            </span>
          </div>

          <div className="space-y-4">
            {incidents.map((inc) => (
              <GlassCard key={inc._id} hoverEffect className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={
                          inc.severity === 'Critical Emergency'
                            ? 'rose'
                            : inc.severity === 'High'
                            ? 'amber'
                            : 'purple'
                        }
                        size="xs"
                      >
                        {inc.severity}
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {inc.incidentType}
                      </span>
                      {inc.isAnonymous && (
                        <span className="text-[10px] font-mono text-orange-300 flex items-center gap-1">
                          <EyeOff className="w-3 h-3" /> Anonymous
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white">{inc.location}</h4>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400">
                    {new Date(inc.date).toLocaleDateString()} • {inc.time}
                  </span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {inc.description}
                </p>

                {/* Status & Action */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Investigation Status:</span>
                    <span className="font-semibold text-orange-400">{inc.status}</span>
                  </div>
                  {inc.actionTaken && (
                    <div className="text-[11px] text-stone-300 pt-1 border-t border-white/5">
                      <strong className="text-emerald-400">Action Enforced: </strong>
                      {inc.actionTaken}
                    </div>
                  )}
                  {inc.investigator && (
                    <div className="text-[10px] text-stone-400 font-mono">
                      Assigned Officer: {inc.investigator}
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: 24/7 Campus Emergency Hotlines & Anti-Ragging Policy */}
        <div className="lg:col-span-5 space-y-6">
          {/* Emergency Hotlines Directory */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-orange-400" />
              <span>24/7 Campus Emergency Desk</span>
            </h2>

            <div className="space-y-3">
              {emergencyContacts.map((contact, idx) => (
                <GlassCard key={idx} hoverEffect className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{contact.unit}</span>
                    <Badge variant="orange" size="xs">
                      {contact.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">{contact.location}</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="font-mono font-bold text-orange-300 hover:text-orange-200 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono block">
                    Availability: {contact.available}
                  </span>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Official Code of Conduct */}
          <GlassCard className="p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Campus Code of Conduct & Anti-Ragging Rules</span>
            </h3>

            <ul className="space-y-2 text-xs text-stone-300">
              {codeOfConduct.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>

      {/* Incident Reporting Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 space-y-5 shadow-2xl relative my-8">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                CONFIDENTIAL PROCTORIAL SQUAD DISPATCH
              </span>
              <h3 className="text-lg font-bold text-white">
                Report Campus Altercation, Ragging or Dispute
              </h3>
            </div>

            {/* Anonymous Toggle */}
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-orange-400" />
                  Anonymous Reporting Mode
                </span>
                <span className="text-[10px] text-stone-400 block">
                  Your name, roll number, and student IP will not be logged.
                </span>
              </div>

              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 accent-orange-500 cursor-pointer"
              />
            </div>

            <form onSubmit={handleReportIncident} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Incident Classification:</label>
                <select
                  value={incidentForm.incidentType}
                  onChange={(e) =>
                    setIncidentForm({ ...incidentForm, incidentType: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-rose-400"
                >
                  <option value="Campus Altercation / Fight">Campus Altercation / Fight</option>
                  <option value="Ragging & Bullying">Ragging & Bullying</option>
                  <option value="Harassment & Misconduct">Harassment & Misconduct</option>
                  <option value="Hostel Dispute & Noise">Hostel Dispute & Noise</option>
                  <option value="Vandalism & Damage">Vandalism & Damage</option>
                  <option value="Campus Safety Threat">Campus Safety Threat</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Specific Location:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hostel 2 Basketball Court, Canteen"
                    value={incidentForm.location}
                    onChange={(e) =>
                      setIncidentForm({ ...incidentForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Urgency Level:</label>
                  <select
                    value={incidentForm.severity}
                    onChange={(e) =>
                      setIncidentForm({ ...incidentForm, severity: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-rose-400"
                  >
                    <option value="Low">Low - Information Only</option>
                    <option value="Medium">Medium - Disturbance</option>
                    <option value="High">High - Physical Dispute</option>
                    <option value="Critical Emergency">Critical - Immediate Threat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Persons Involved (Optional):</label>
                <input
                  type="text"
                  placeholder="Names, batch, or hostel block of parties involved (if known)"
                  value={incidentForm.personsInvolved}
                  onChange={(e) =>
                    setIncidentForm({ ...incidentForm, personsInvolved: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Description of Incident:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide objective facts regarding what happened, timeline, and present status..."
                  value={incidentForm.description}
                  onChange={(e) =>
                    setIncidentForm({ ...incidentForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                />
              </div>

              {!isAnonymous && (
                <div>
                  <label className="text-slate-300 block mb-1">Contact Phone (For Follow-up):</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={incidentForm.contactPhone}
                    onChange={(e) =>
                      setIncidentForm({ ...incidentForm, contactPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                  />
                </div>
              )}

              {reportSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  {reportSuccess}
                </div>
              )}

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
                  Transmit Confidential Report
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusSafetyPage;
