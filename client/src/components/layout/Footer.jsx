import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#04060f] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-indigo-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#050713] rounded-[7px] flex items-center justify-center">
                  <img src="/logo.svg" alt="CampusOS" className="w-5 h-5" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Campus<span className="text-cyan-400">OS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The intelligent digital operating system unifying academics, events, opportunities, and student productivity in one next-generation interface.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/#features" className="hover:text-cyan-400 transition-colors">Features</Link></li>
              <li><Link to="/academics" className="hover:text-cyan-400 transition-colors">Academics</Link></li>
              <li><Link to="/events" className="hover:text-cyan-400 transition-colors">Campus Events</Link></li>
              <li><Link to="/opportunities" className="hover:text-cyan-400 transition-colors">Opportunities</Link></li>
              <li><Link to="/clubs" className="hover:text-cyan-400 transition-colors">Societies & Clubs</Link></li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4 font-mono">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/resources" className="hover:text-cyan-400 transition-colors">Facility Directory</Link></li>
              <li><Link to="/community" className="hover:text-cyan-400 transition-colors">Student Community</Link></li>
              <li><Link to="/login" className="hover:text-cyan-400 transition-colors">Student Login</Link></li>
              <li><Link to="/login" className="hover:text-cyan-400 transition-colors">Faculty Portal</Link></li>
              <li><Link to="/admin" className="hover:text-cyan-400 transition-colors">Admin Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} CampusOS Platform. Engineered with React, Three.js & Node.js.</p>
          <p className="flex items-center gap-1">
            Built for modern engineering institutes <Sparkles className="w-3.5 h-3.5 text-cyan-400 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
