import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, BellRing, ArrowRight, X } from 'lucide-react';
import api from '../../services/api';

const FlashTicker = () => {
  const [flashCircular, setFlashCircular] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchFlashCircular = async () => {
      try {
        const res = await api.get('/circulars');
        if (res.data && res.data.length > 0) {
          const emergencyOne = res.data.find(
            (c) => c.isFlashTicker || c.priority === 'Flash Emergency' || c.priority === 'Urgent'
          );
          if (emergencyOne) {
            setFlashCircular(emergencyOne);
          }
        }
      } catch (err) {
        // Fallback demo banner
        setFlashCircular({
          _id: 'flash_demo',
          title: 'FLASH ALERT: Weather advisory in effect. All practical labs moved online.',
          circularNumber: 'CAMPUS-OS/REG/2026/CIRC-1082-FLASH',
          priority: 'Flash Emergency',
        });
      }
    };

    fetchFlashCircular();
  }, []);

  if (!flashCircular || dismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-rose-950/90 via-red-900/80 to-amber-950/90 border-b border-rose-500/40 px-4 py-2.5 shadow-lg shadow-rose-950/50 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="shrink-0 flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>

          <span className="shrink-0 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/30 uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            {flashCircular.priority || 'FLASH NOTICE'}
          </span>

          <p className="text-rose-100 font-medium truncate">
            <span className="font-semibold text-white">{flashCircular.title}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/circulars"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 text-xs font-semibold transition-all hover:scale-105"
          >
            <span>Read Circular</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-rose-300/70 hover:text-white rounded transition-colors"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashTicker;
