import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  FileText,
  Briefcase,
  Calendar,
  Users,
  Layers,
  ShieldCheck,
  Compass,
  Building,
  UserCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import CampiiLogo from './CampiiLogo';

const CampusEcosystemMap = () => {
  const [activeNode, setActiveNode] = useState('students');

  const nodes = [
    {
      id: 'students',
      label: 'Students',
      category: 'Community Core',
      icon: Users,
      color: '#f97316', // bright orange
      x: 18,
      y: 22,
      description: 'Undergraduate, post-grad, and research scholars collaborating in real-time across academic streams.',
      path: '/community',
      metric: '14,200+ Active',
    },
    {
      id: 'faculty',
      label: 'Faculty',
      category: 'Mentorship',
      icon: UserCheck,
      color: '#f59e0b', // amber
      x: 50,
      y: 12,
      description: 'Professors, department heads, and lab instructors managing coursework, attendance, and research.',
      path: '/academics',
      metric: '680+ Mentors',
    },
    {
      id: 'academics',
      label: 'Academics',
      category: 'Core Curriculum',
      icon: GraduationCap,
      color: '#fb923c', // warm coral
      x: 82,
      y: 22,
      description: 'Syllabus, smart timetables, attendance trackers, digital assignments, and SGPA/CGPA engines.',
      path: '/academics',
      metric: '8 Semesters',
    },
    {
      id: 'exams',
      label: 'Exams & Hall Tickets',
      category: 'Assessments',
      icon: FileText,
      color: '#facc15', // yellow gold
      x: 88,
      y: 52,
      description: 'Automated mid-term timetables, scannable digital admit cards, and live desk seating allocations.',
      path: '/exams',
      metric: 'Live Schedules',
    },
    {
      id: 'placements',
      label: 'Placements & CRT',
      category: 'Career Launchpad',
      icon: Briefcase,
      color: '#ea580c', // rich tangerine
      x: 80,
      y: 82,
      description: 'Tier-1 tech drives (Microsoft, Google, Oracle), aptitude sprints, and direct interview pipelines.',
      path: '/placements',
      metric: '₹44.5 LPA Top',
    },
    {
      id: 'campus',
      label: 'Smart Campus',
      category: 'Infrastructure',
      icon: Building,
      color: '#d97706', // bronze amber
      x: 50,
      y: 88,
      description: 'Smart library catalog, laboratory equipment reservation, cafeteria passes, and transport routes.',
      path: '/resources',
      metric: '18 Campus Zones',
    },
    {
      id: 'safety',
      label: 'Campus Safety',
      category: 'Vigilance & SOS',
      icon: ShieldCheck,
      color: '#ef4444', // red
      x: 20,
      y: 82,
      description: '24/7 security dispatch, emergency alert broadcast beacons, and instant warden contact SOS.',
      path: '/campus-safety',
      metric: '24/7 Monitored',
    },
    {
      id: 'events',
      label: 'Fests & Events',
      category: 'Campus Life',
      icon: Calendar,
      color: '#fdba74', // peach orange
      x: 12,
      y: 52,
      description: 'Cultural fests, hackathons, workshops, guest lectures, and student club registrations.',
      path: '/events',
      metric: '48+ Yearly Events',
    },
  ];

  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[0];

  return (
    <div className="w-full relative rounded-3xl glass-panel p-6 sm:p-8 lg:p-10 border border-white/20 shadow-2xl overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-orange-500/20 via-amber-500/15 to-orange-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Header Info inside the card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider mb-2 border border-orange-400/40">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Interactive Campus Network</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CAMPII Ecosystem Nexus
          </h3>
          <p className="text-xs sm:text-sm text-stone-300">
            Hover over or tap any node to inspect connected workflows and live student & faculty hubs.
          </p>
        </div>

        {/* Selected Node Summary Badge */}
        <div className="flex items-center gap-3 bg-stone-900/80 px-4 py-2.5 rounded-2xl border border-white/15 shadow-sm">
          <div
            className="w-3 h-3 rounded-full animate-ping shadow-[0_0_10px_currentColor]"
            style={{ backgroundColor: currentNode.color, color: currentNode.color }}
          />
          <div>
            <div className="text-[10px] uppercase font-mono font-bold text-stone-400">Inspecting Node</div>
            <div className="text-xs font-bold text-white">{currentNode.label} ({currentNode.metric})</div>
          </div>
        </div>
      </div>

      {/* Visual Diagram Area */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] select-none flex items-center justify-center">
        {/* SVG Connection Lines */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Center concentric pulse rings */}
          <circle cx="50" cy="50" r="16" fill="none" stroke="#f97316" strokeWidth="0.5" strokeDasharray="1.5 1.5" strokeOpacity="0.3" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.25" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#fb923c" strokeWidth="0.4" strokeDasharray="3 3" strokeOpacity="0.2" />

          {/* Dynamic connecting lines from Center to each Node */}
          {nodes.map((node) => {
            const isSelected = activeNode === node.id;
            return (
              <g key={`line-${node.id}`}>
                <line
                  x1="50"
                  y1="50"
                  x2={node.x}
                  y2={node.y}
                  stroke={isSelected ? node.color : '#78716c'}
                  strokeWidth={isSelected ? '2.0' : '0.8'}
                  strokeDasharray={isSelected ? 'none' : '2 2'}
                  opacity={isSelected ? 1 : 0.4}
                  filter={isSelected ? 'url(#lineGlow)' : 'none'}
                  className="transition-all duration-300"
                />
                {isSelected && (
                  <circle
                    cx={(50 + node.x) / 2}
                    cy={(50 + node.y) / 2}
                    r="1.4"
                    fill={node.color}
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}

          {/* Cross connections between adjacent nodes */}
          <path
            d="M18 22 L50 12 L82 22 L88 52 L80 82 L50 88 L20 82 L12 52 Z"
            fill="none"
            stroke="#f97316"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            opacity="0.35"
          />
        </svg>

        {/* Central Luminous CAMPII Core Hub */}
        <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-stone-900/90 border-2 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.4)] flex flex-col items-center justify-center p-2 backdrop-blur-xl transition-transform duration-300 hover:scale-105">
            <CampiiLogo size={32} />
            <span className="text-[11px] font-black tracking-tight text-white mt-1">CAMPII</span>
            <span className="text-[8px] font-mono font-bold text-orange-300 tracking-wider">CORE OS</span>
          </div>
        </div>

        {/* Floating Digital Node Buttons */}
        {nodes.map((node) => {
          const isSelected = activeNode === node.id;
          const NodeIcon = node.icon;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20"
              onMouseEnter={() => setActiveNode(node.id)}
              onClick={() => setActiveNode(node.id)}
            >
              <button
                type="button"
                className={`group flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl transition-all duration-300 border ${
                  isSelected
                    ? 'bg-stone-900/95 border-orange-400 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.4)] text-white'
                    : 'bg-stone-900/80 hover:bg-stone-800 border-white/15 text-stone-200 hover:scale-105'
                }`}
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm"
                  style={{
                    backgroundColor: `${node.color}25`,
                    color: node.color,
                    border: `1px solid ${node.color}50`,
                  }}
                >
                  <NodeIcon className="w-4 h-4" />
                </div>
                <div className="hidden sm:block text-left pr-1.5">
                  <div className="text-xs font-bold text-white leading-tight">{node.label}</div>
                  <div className="text-[9px] font-mono text-stone-400">{node.metric}</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${currentNode.color}25`,
              color: currentNode.color,
              border: `1px solid ${currentNode.color}50`,
            }}
          >
            <currentNode.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-white">{currentNode.label}</h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-orange-300 border border-white/15">
                {currentNode.category}
              </span>
            </div>
            <p className="text-xs text-stone-300 max-w-2xl mt-0.5">{currentNode.description}</p>
          </div>
        </div>

        <Link
          to={currentNode.path}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 transition-all shadow-md shrink-0"
        >
          <span>Explore {currentNode.label}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default CampusEcosystemMap;
