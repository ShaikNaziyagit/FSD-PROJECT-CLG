import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Heart, Shield, ArrowUpRight } from 'lucide-react';
import CampiiLogo from '../common/CampiiLogo';

const Footer = () => {
  return (
    <footer className="border-t border-white/15 glass-panel relative overflow-hidden z-10 mt-auto">
      {/* Ambient warm orange background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-orange-500/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <CampiiLogo size={40} showWordmark={true} />
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              The next-generation connected campus operating system uniting students, faculty, academics, placements, events, exams, and institutional management on a live 3D realistic campus platform.
            </p>
            <div className="flex items-center gap-2.5 pt-2 text-slate-300">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 border border-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 border border-white/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 border border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span>Campus Ecosystem</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/academics" className="hover:text-orange-300 transition-colors">Academics & Timetable</Link></li>
              <li><Link to="/exams" className="hover:text-orange-300 transition-colors">Exams & Admit Cards</Link></li>
              <li><Link to="/placements" className="hover:text-orange-300 transition-colors">Placements & CRT</Link></li>
              <li><Link to="/events" className="hover:text-orange-300 transition-colors">Campus Events & Hackathons</Link></li>
              <li><Link to="/clubs" className="hover:text-orange-300 transition-colors">Clubs & Student Societies</Link></li>
            </ul>
          </div>

          {/* Quick Access Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Quick Console</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/resources" className="hover:text-orange-300 transition-colors">Digital Repository & Labs</Link></li>
              <li><Link to="/campus-safety" className="hover:text-rose-300 transition-colors">Campus SOS & Vigilance</Link></li>
              <li><Link to="/circulars" className="hover:text-orange-300 transition-colors">Sudden Circulars & Alerts</Link></li>
              <li><Link to="/login" className="hover:text-orange-300 transition-colors">Student & Faculty Login</Link></li>
              <li><Link to="/admin" className="hover:text-orange-300 transition-colors">Institutional Super Admin</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} CAMPII OS. All rights reserved. White & Orange Edition.</p>
          <p className="flex items-center gap-2 font-medium text-slate-300">
            <span>Powered by Live 3D Realistic Campus Engine</span>
            <Sparkles className="w-3.5 h-3.5 text-orange-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
