import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Assignment from '../models/Assignment.js';
import Event from '../models/Event.js';
import Opportunity from '../models/Opportunity.js';
import Club from '../models/Club.js';
import Announcement from '../models/Announcement.js';
import Resource from '../models/Resource.js';
import Post from '../models/Post.js';
import Notification from '../models/Notification.js';

import Placement from '../models/Placement.js';
import CRT from '../models/CRT.js';
import Circular from '../models/Circular.js';
import FeePayment from '../models/FeePayment.js';
import Exam from '../models/Exam.js';
import LostFound from '../models/LostFound.js';
import SafetyIncident from '../models/SafetyIncident.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusos';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB database successfully.');

    // Clear existing collections
    await Promise.all([
      User.deleteMany(),
      Subject.deleteMany(),
      Assignment.deleteMany(),
      Event.deleteMany(),
      Opportunity.deleteMany(),
      Club.deleteMany(),
      Announcement.deleteMany(),
      Resource.deleteMany(),
      Post.deleteMany(),
      Notification.deleteMany(),
      Placement.deleteMany(),
      CRT.deleteMany(),
      Circular.deleteMany(),
      FeePayment.deleteMany(),
      Exam.deleteMany(),
      LostFound.deleteMany(),
      SafetyIncident.deleteMany(),
    ]);
    console.log('[Seed] Cleared existing records.');

    // Baseline demo password (User model pre('save') hook handles proper bcrypt hashing)
    const demoPassword = 'CampusOS@2026';

    // 1. Create Users
    const users = await User.create([
      {
        name: 'Arjun Sharma',
        email: 'student@campusos.demo',
        password: demoPassword,
        role: 'student',
        studentId: '22BCSE1042',
        department: 'CSE',
        year: '3rd Year',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        bio: '3rd Year CSE student passionate about Distributed Systems, Full-Stack Architecture, and AI agents.',
        skills: ['React', 'Node.js', 'Go', 'Docker', 'MongoDB', 'Python'],
        interests: ['Competitive Coding', 'Hackathons', 'Cloud Infrastructure', 'Autonomous Systems'],
      },
      {
        name: 'Dr. Rajeshwari Raman',
        email: 'admin@campusos.demo',
        password: demoPassword,
        role: 'super_admin',
        studentId: 'FAC-DIR-001',
        department: 'General Administration',
        year: 'Staff',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
        bio: 'Dean of Academic Innovations & Systems Architect. Overseeing next-gen digital infrastructure.',
        skills: ['Academic Administration', 'Strategic Planning', 'Computer Science Research'],
        interests: ['Smart Campus Tech', 'Pedagogy', 'Higher Education Reform'],
      },
      {
        name: 'Prof. Vikram Sen',
        email: 'faculty@campusos.demo',
        password: demoPassword,
        role: 'faculty',
        studentId: 'FAC-CSE-018',
        department: 'CSE',
        year: 'Faculty',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        bio: 'Associate Professor, Department of Computer Science. Research lead for Cloud-Native and Distributed Networks.',
        skills: ['Distributed Algorithms', 'Kubernetes', 'High-Performance Systems'],
        interests: ['Microservices', 'Edge Computing', 'Compiler Optimizations'],
      },
      {
        name: 'Ananya Verma',
        email: 'club@campusos.demo',
        password: demoPassword,
        role: 'club_admin',
        studentId: '22BCSE1108',
        department: 'CSE',
        year: '3rd Year',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
        bio: 'Lead Coordinator at Turing Coding Society & Competitive Programmer. Candidate Master on Codeforces.',
        skills: ['C++', 'Algorithms', 'Event Organization', 'Mentorship'],
        interests: ['Data Structures', 'Open Source', 'Hackathons'],
      },
    ]);

    const studentUser = users[0];
    const adminUser = users[1];
    const facultyUser = users[2];

    console.log('[Seed] Created Demo Users (student, admin, faculty, club).');

    // 2. Create Academic Subjects
    const subjects = await Subject.create([
      {
        code: 'CS301',
        name: 'Distributed Systems & Cloud Computing',
        faculty: 'Prof. Vikram Sen',
        facultyEmail: 'faculty@campusos.demo',
        credits: 4,
        department: 'CSE',
        semester: 6,
        nextClass: { day: 'Monday', time: '09:00 AM', room: 'Hall 302' },
        attendanceRate: 88,
        totalClasses: 34,
        attendedClasses: 30,
      },
      {
        code: 'CS302',
        name: 'Deep Learning & Neural Architectures',
        faculty: 'Dr. Elena Rostova',
        facultyEmail: 'elena.rostova@campusos.edu',
        credits: 4,
        department: 'CSE',
        semester: 6,
        nextClass: { day: 'Monday', time: '10:15 AM', room: 'AI Lab 2' },
        attendanceRate: 92,
        totalClasses: 30,
        attendedClasses: 28,
      },
      {
        code: 'CS303',
        name: 'Cyber-Physical Systems & Network Security',
        faculty: 'Dr. Marcus Vance',
        facultyEmail: 'marcus.vance@campusos.edu',
        credits: 3,
        department: 'CSE',
        semester: 6,
        nextClass: { day: 'Tuesday', time: '09:30 AM', room: 'Security Center' },
        attendanceRate: 81,
        totalClasses: 26,
        attendedClasses: 21,
      },
      {
        code: 'CS304',
        name: 'Full-Stack Systems & Microservice Engineering',
        faculty: 'Prof. Dev Patel',
        facultyEmail: 'dev.patel@campusos.edu',
        credits: 4,
        department: 'CSE',
        semester: 6,
        nextClass: { day: 'Wednesday', time: '11:30 AM', room: 'Innovation Studio' },
        attendanceRate: 95,
        totalClasses: 28,
        attendedClasses: 27,
      },
      {
        code: 'CS305L',
        name: 'Quantum Information & Computing Lab',
        faculty: 'Dr. Priya Nair',
        facultyEmail: 'priya.nair@campusos.edu',
        credits: 2,
        department: 'CSE',
        semester: 6,
        nextClass: { day: 'Thursday', time: '02:00 PM', room: 'Quantum Wing' },
        attendanceRate: 85,
        totalClasses: 20,
        attendedClasses: 17,
      },
    ]);

    // 3. Create Assignments
    await Assignment.create([
      {
        title: 'Raft Consensus Protocol Implementation in Go',
        subject: subjects[0]._id,
        subjectCode: 'CS301',
        subjectName: 'Distributed Systems & Cloud Computing',
        description: 'Build leader election, log replication, and persistence for a 5-node cluster following the Raft paper.',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        totalMarks: 100,
        status: 'pending',
      },
      {
        title: 'Transformer Vision Attention Map Visualization',
        subject: subjects[1]._id,
        subjectCode: 'CS302',
        subjectName: 'Deep Learning & Neural Architectures',
        description: 'Fine-tune a ViT model on CIFAR-100 and extract multi-head self-attention heatmaps for interpretability.',
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        totalMarks: 100,
        status: 'pending',
      },
      {
        title: 'Network Packet Analysis & Zero-Trust Audit',
        subject: subjects[2]._id,
        subjectCode: 'CS303',
        subjectName: 'Cyber-Physical Systems & Network Security',
        description: 'Analyze PCAP capture logs, identify DDoS signatures, and construct firewall rules.',
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        totalMarks: 50,
        status: 'submitted',
        grade: 48,
        feedback: 'Excellent detection rules and clean analysis report.',
      },
    ]);

    // 4. Create Campus Events
    const events = await Event.create([
      {
        title: 'HackCampus 2026: 36-Hour National Flagship Hackathon',
        banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
        description: 'The largest annual collegiate hackathon featuring tracks in Agentic AI, Cyber Systems, Sustainable Green Tech, and Web3 infra. Over ₹5,00,000 in bounties.',
        category: 'Hackathons',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: '09:00 AM IST onwards',
        location: 'APJ Abdul Kalam Auditorium & Innovation Center',
        organizer: 'Turing Coding Society & Google Developer Student Club',
        organizerContact: 'hackathon@campusos.edu',
        maxCapacity: 350,
        attendees: [{ user: studentUser._id }],
        tags: ['Hackathon', 'AI', 'Coding', 'Prizes'],
        featured: true,
      },
      {
        title: 'Keynote & Panel: Building Autonomous Generative AI Agents',
        banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
        description: 'Distinguished lecture series with industry researchers from Google DeepMind and IISc Bengaluru discussing the future of AI engineering.',
        category: 'Seminars',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        time: '04:30 PM - 07:00 PM',
        location: 'Vikram Sarabhai Hall',
        organizer: 'Department of Computer Science & Engineering',
        organizerContact: 'cse.events@campusos.edu',
        maxCapacity: 250,
        attendees: [],
        tags: ['Keynote', 'AI Agents', 'Research'],
        featured: true,
      },
      {
        title: 'RoboWars 2026: Battle of Autonomous & Combat Bots',
        banner: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800',
        description: 'Witness heavy-duty 15kg and 30kg combat bots battle inside a bulletproof arena, plus autonomous line-tracer and maze solver challenges.',
        category: 'Technical',
        date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        time: '10:00 AM - 06:00 PM',
        location: 'Campus Amphitheater Arena',
        organizer: 'Robotics & Mechatronics Society',
        organizerContact: 'robotics@campusos.edu',
        maxCapacity: 400,
        attendees: [{ user: studentUser._id }],
        tags: ['Robotics', 'Hardware', 'Competition'],
        featured: false,
      },
      {
        title: 'Mirage 2026: Annual Inter-College Cultural & Music Extravaganza',
        banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
        description: '3 days of electrifying concerts, battle of the bands, pro-nites, choreography showdowns, and theatrical drama.',
        category: 'Cultural',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        time: '05:00 PM - 11:00 PM',
        location: 'Main University Stadium Grounds',
        organizer: 'Student Cultural Council',
        organizerContact: 'mirage@campusos.edu',
        maxCapacity: 2500,
        attendees: [],
        tags: ['Cultural', 'Music', 'Fest'],
        featured: true,
      },
    ]);

    // 5. Create Opportunities
    const opportunities = await Opportunity.create([
      {
        title: 'Software Development Engineer Intern (Summer 2026)',
        organization: 'Microsoft India Development Center (IDC)',
        category: 'Internships',
        description: 'Work alongside Azure Cloud and Developer Tools teams building planet-scale microservices, SDKs, and developer experiences.',
        stipendOrPrize: '₹1,25,000 / month + Relocation',
        location: 'Hyderabad / Bengaluru (Hybrid)',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        eligibility: 'Pre-final year B.Tech/Dual Degree students with CGPA >= 7.5',
        skills: ['C++', 'Java', 'Distributed Systems', 'Data Structures', 'Cloud Systems'],
        applicationUrl: 'https://careers.microsoft.com',
        featured: true,
        savedBy: [studentUser._id],
      },
      {
        title: 'ISRO Research Fellowship: Satellite Telemetry & Onboard Computing',
        organization: 'Indian Space Research Organisation (ISRO)',
        category: 'Scholarships',
        description: 'Prestigious undergraduate research fellowship to develop fault-tolerant real-time software for low-earth orbit student satellites.',
        stipendOrPrize: '₹45,000 / month + Research Grant',
        location: 'UR Rao Satellite Centre, Bengaluru',
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        eligibility: '3rd & 4th Year CSE, ECE, Aerospace students',
        skills: ['Embedded C', 'RTOS', 'Signal Processing', 'Telemetry'],
        applicationUrl: 'https://isro.gov.in/fellowships',
        featured: true,
        savedBy: [studentUser._id],
      },
      {
        title: 'Google Summer of Code (GSoC 2026) Mentorship Cohort',
        organization: 'Open Source Initiative & CampusOS Hub',
        category: 'Workshops',
        description: 'Intensive 4-week preparatory boot camp for students applying to Linux Foundation, CNCF, Apache, and Mozilla organizations.',
        stipendOrPrize: '$1,500 - $3,000 Stipend upon completion',
        location: 'Virtual / Campus Innovation Lab',
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        eligibility: 'All students with open-source code contributions',
        skills: ['Git', 'Go', 'Rust', 'Python', 'Open Source Etiquette'],
        applicationUrl: 'https://summerofcode.withgoogle.com',
        featured: true,
        savedBy: [],
      },
      {
        title: 'Smart India Hackathon (SIH 2026) Internal Campus Shortlist',
        organization: 'Ministry of Education & AICTE',
        category: 'Competitions',
        description: 'Submit your 6-member team solutions for National Problem Statements across Smart Automation, Agriculture, and HealthTech.',
        stipendOrPrize: '₹1,00,000 per winning problem statement',
        location: 'On-Campus Evaluation',
        deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        eligibility: 'Teams of 6 students (minimum 1 female member mandated)',
        skills: ['Prototyping', 'IoT', 'AI / ML', 'Full-Stack Development'],
        applicationUrl: 'https://sih.gov.in',
        featured: false,
        savedBy: [],
      },
      {
        title: 'Tata Trust Technology Merit Fellowship',
        organization: 'Tata Trusts & Higher Education Council',
        category: 'Scholarships',
        description: 'Merit-cum-means scholarship for top engineering students providing full tuition reimbursement and mentorship from industry leaders.',
        stipendOrPrize: 'Full Tuition Fee Reimbursement + Laptop Grant',
        location: 'All India',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        eligibility: 'B.Tech 1st to 3rd Year with annual family income < 8 LPA',
        skills: ['Academic Excellence', 'Leadership'],
        applicationUrl: 'https://tatatrusts.org',
        featured: false,
        savedBy: [],
      },
    ]);

    // 6. Create Clubs
    const clubs = await Club.create([
      {
        name: 'Turing Coding Society',
        shortTag: 'TCS',
        logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200',
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        description: 'The premier software engineering, algorithm design, and competitive programming collective on campus. Organizing weekly contests and open-source sprints.',
        category: 'Coding & Tech',
        facultyCoordinator: {
          name: 'Prof. Vikram Sen',
          department: 'CSE',
          email: 'vikram.sen@campusos.edu',
        },
        studentCoordinators: [
          { name: 'Ananya Verma', role: 'President', email: 'club@campusos.demo' },
          { name: 'Arjun Sharma', role: 'Technical Lead', email: 'student@campusos.demo' },
        ],
        members: [studentUser._id],
        contactEmail: 'turing@campusos.edu',
        socialLinks: {
          github: 'https://github.com/turing-campus',
          discord: 'https://discord.gg/campusos',
        },
      },
      {
        name: 'AeroRobotics & Drone Systems Guild',
        shortTag: 'ARDS',
        logo: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=200',
        coverImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=800',
        description: 'Building autonomous UAVs, hexacopter swarms, computer vision navigation systems, and competition combat robots.',
        category: 'Robotics & AI',
        facultyCoordinator: {
          name: 'Dr. Marcus Vance',
          department: 'ECE',
          email: 'marcus.vance@campusos.edu',
        },
        studentCoordinators: [
          { name: 'Rohan Mehra', role: 'Captain', email: 'rohan.mehra@campusos.demo' },
        ],
        members: [],
        contactEmail: 'robotics@campusos.edu',
        socialLinks: {
          github: 'https://github.com/aerorobotics-campus',
        },
      },
      {
        name: 'Design & Creative Media Studio',
        shortTag: 'DCMS',
        logo: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=200',
        coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
        description: 'A playground for UI/UX designers, 3D artists, cinematographers, brand builders, and digital illustrators.',
        category: 'Cultural & Arts',
        facultyCoordinator: {
          name: 'Prof. Maya Lin',
          department: 'Architecture & Design',
          email: 'maya.lin@campusos.edu',
        },
        studentCoordinators: [
          { name: 'Ishita Roy', role: 'Creative Director', email: 'ishita.roy@campusos.demo' },
        ],
        members: [],
        contactEmail: 'design@campusos.edu',
      },
      {
        name: 'E-Cell: Entrepreneurship & Incubation Hub',
        shortTag: 'ECELL',
        logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200',
        coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
        description: 'Fostering campus startups through seed funding grants, venture capital pitch days, and alumni founder mentorship networks.',
        category: 'Entrepreneurship',
        facultyCoordinator: {
          name: 'Dr. Rajeshwari Raman',
          department: 'Innovation & Incubation',
          email: 'admin@campusos.demo',
        },
        studentCoordinators: [
          { name: 'Sameer Gupta', role: 'Convenor', email: 'sameer.gupta@campusos.demo' },
        ],
        members: [studentUser._id],
        contactEmail: 'ecell@campusos.edu',
      },
    ]);

    // Update user references
    studentUser.savedOpportunities = [opportunities[0]._id, opportunities[1]._id];
    studentUser.registeredEvents = [events[0]._id, events[2]._id];
    studentUser.joinedClubs = [clubs[0]._id, clubs[3]._id];
    await studentUser.save();

    // 7. Create Campus Announcements
    await Announcement.create([
      {
        title: 'Mandatory Guidelines: B.Tech Autumn 2026 End-Semester Examinations',
        description: 'The controller of examinations has published the complete timetable and seating arrangements. Students must bring their digital CampusOS Identity Card and arrive 15 minutes before slot time.',
        category: 'Examination',
        priority: 'Urgent',
        author: { name: 'Office of Dean Academic Affairs', role: 'Dean / Administrator' },
        department: 'All Departments',
        targetAudience: 'All Students',
      },
      {
        title: 'Campus Placement Season: Day-1 Tier-1 Tech Company Registrations',
        description: 'Registrations are now active for Microsoft, Google, Oracle, and Goldman Sachs recruitment drives. Verify your resumes on the placement portal by Friday midnight.',
        category: 'Placement',
        priority: 'Important',
        author: { name: 'Training & Placement Cell (TPO)', role: 'Faculty / Admin' },
        department: 'CSE / ECE / IT / EEE',
        targetAudience: 'B.Tech All Years',
      },
      {
        title: 'Campus High-Performance Computing (HPC) & GPU Cluster Maintenance',
        description: 'The NVIDIA A100 GPU cluster will undergo scheduled firmware upgrades this Sunday between 02:00 AM and 06:00 AM. Background training jobs should be checkpointed.',
        category: 'Academic',
        priority: 'Normal',
        author: { name: 'Supercomputing Operations Desk', role: 'Staff' },
        department: 'Computer Science & Engineering',
        targetAudience: 'All Students',
      },
    ]);

    // 8. Create Campus Facilities & Resources Directory
    await Resource.create([
      {
        name: 'Rabindranath Tagore Central Library & Digital Sandbox',
        category: 'Library',
        description: 'A 5-floor repository housing over 1,50,000 physical volumes, 24/7 quiet air-conditioned reading halls, and IEEE/ACM digital access terminals.',
        location: 'Central Academic Quadrangle, Block C',
        openingHours: '08:00 AM - 12:00 AM (24/7 during Exam Weeks)',
        contact: {
          phone: '+91 11 2659 7100',
          email: 'library@campusos.edu',
          incharge: 'Dr. S. K. Mukherjee (Chief Librarian)',
        },
        availableServices: ['Book Checkout', 'IEEE Xplore Access', 'Private Study Pods', 'RFID Auto Return', 'Photocopy & Binding'],
        status: 'Operational',
        iconName: 'BookOpen',
      },
      {
        name: 'High-Performance Computing & AI Research Lab',
        category: 'Labs',
        description: 'State-of-the-art supercomputing facility equipped with 16x NVIDIA H100 and A100 GPU nodes for LLM training, physics simulations, and robotics.',
        location: 'Turing Advanced Research Complex, 4th Floor',
        openingHours: '09:00 AM - 10:00 PM',
        contact: {
          phone: '+91 11 2659 7250',
          email: 'hpc-admin@campusos.edu',
          incharge: 'Prof. Vikram Sen',
        },
        availableServices: ['Slurm Cluster Access', 'CUDA Benchmarking', 'JupyterHub Server', 'Model Checkpointing'],
        status: 'Operational',
        iconName: 'Cpu',
      },
      {
        name: 'Central Computer Center (CCC) & Server Core',
        category: 'Computer Center',
        description: 'Over 400 networked workstations running dual-boot Linux/Windows with 10Gbps campus fiber backbone.',
        location: 'Babbage Wing, Ground Floor',
        openingHours: '08:30 AM - 11:00 PM',
        contact: {
          phone: '+91 11 2659 7300',
          email: 'ccc@campusos.edu',
          incharge: 'Er. Rakesh Sharma',
        },
        availableServices: ['Semester Lab Practical Sessions', 'Online Testing Center', 'VPN & Wi-Fi Token Desk'],
        status: 'Operational',
        iconName: 'Monitor',
      },
      {
        name: 'Training & Corporate Placement Cell (TPO)',
        category: 'Placement Cell',
        description: 'Dedicated recruitment hub connecting graduating engineers with top multinational tech giants, research labs, and startups.',
        location: 'Administrative Block, 2nd Floor',
        openingHours: '09:00 AM - 06:00 PM',
        contact: {
          phone: '+91 11 2659 7500',
          email: 'tpo@campusos.edu',
          incharge: 'Dr. Arvind Swaminathan',
        },
        availableServices: ['Resume Audits', 'Mock Technical Interviews', 'On-Campus Recruitment Drives', 'Internship NOC Processing'],
        status: 'Operational',
        iconName: 'Briefcase',
      },
      {
        name: 'Campus Health & Medical Emergency Center',
        category: 'Medical Center',
        description: 'Full-time medical facility with residential doctors, round-the-clock ambulance dispatch, pharmacy, and diagnostic services.',
        location: 'Near Hostel Complex Sector 2',
        openingHours: '24 Hours Open (Emergency & OPD)',
        contact: {
          phone: '+91 11 2659 7999 (Emergency Hotline)',
          email: 'health@campusos.edu',
          incharge: 'Dr. Meenakshi Sundaram',
        },
        availableServices: ['Emergency Trauma Care', 'Free Prescription Medicines', 'Mental Wellness Counseling', 'Pathology Lab'],
        status: 'Operational',
        iconName: 'HeartPulse',
      },
      {
        name: 'Student Innovation & Robotics Sandbox',
        category: 'Labs',
        description: 'Equipped with 3D printers, laser cutters, CNC milling machines, oscilloscopes, and soldering workbenches.',
        location: 'Mechanical Workshop Wing A',
        openingHours: '10:00 AM - 09:00 PM',
        contact: {
          phone: '+91 11 2659 7440',
          email: 'maker@campusos.edu',
          incharge: 'Er. Anupam Roy',
        },
        availableServices: ['Rapid 3D Prototyping', 'PCB Milling', 'Component Inventory Checkout'],
        status: 'Operational',
        iconName: 'Wrench',
      },
    ]);

    // 9. Create Community Posts
    await Post.create([
      {
        author: studentUser._id,
        authorName: 'Arjun Sharma',
        authorRole: 'student',
        authorDepartment: 'CSE',
        category: 'Academics',
        title: 'Tips for Raft consensus assignment in CS301 (Distributed Systems)?',
        content: 'Hey everyone, for the Raft leader election milestone, are you guys simulating network partition delays using Go channels or using a mock RPC proxy? Would love to compare notes on edge case handling for split votes.',
        tags: ['DistributedSystems', 'Go', 'CS301', 'Raft'],
        likes: [studentUser._id],
        comments: [
          {
            author: facultyUser._id,
            authorName: 'Prof. Vikram Sen',
            authorRole: 'faculty',
            authorDepartment: 'CSE',
            content: 'Great initiative Arjun. Using buffered channels with random jitter tickers simulates RPC partition timeouts reliably. Make sure term counter increments are strictly atomic.',
            createdAt: new Date(),
          },
        ],
      },
      {
        author: studentUser._id,
        authorName: 'Ananya Verma',
        authorRole: 'club_admin',
        authorDepartment: 'CSE',
        category: 'Opportunities',
        title: 'Looking for a UI/UX Designer + Three.js Dev for HackCampus 2026 team!',
        content: 'We are forming a 4-person team for the National Flagship Hackathon track on "Smart University Digital Twin". We currently have 2 backend & systems engineers. If you love 3D web design and sleek glassmorphism, drop a comment or ping me on CampusOS!',
        tags: ['HackCampus', 'TeamFormation', 'ThreeJS', 'Design'],
        likes: [studentUser._id],
        comments: [
          {
            author: studentUser._id,
            authorName: 'Arjun Sharma',
            authorRole: 'student',
            authorDepartment: 'CSE',
            content: 'Count me in! I have been working with React Three Fiber and shaders for interactive campus layouts.',
            createdAt: new Date(),
          },
        ],
      },
    ]);

    // 10. Create Notifications
    await Notification.create([
      {
        recipient: studentUser._id,
        title: 'Registration Confirmed: HackCampus 2026',
        message: 'Your registration for HackCampus 2026 has been approved. Check your email for team credentials.',
        type: 'event',
        link: '/events',
        isRead: false,
      },
      {
        recipient: studentUser._id,
        title: 'Assignment Deadline Approaching',
        message: 'CS301: Raft Consensus Protocol Implementation is due in 5 days.',
        type: 'academic',
        link: '/academics',
        isRead: false,
      },
      {
        recipient: studentUser._id,
        title: 'New Announcement: End-Semester Exam Schedule',
        message: 'Dean of Academic Affairs published the official examination timetable for Autumn 2026.',
        type: 'announcement',
        link: '/announcements',
        isRead: true,
      },
      {
        recipient: studentUser._id,
        title: 'New Opportunity Matched: Microsoft IDC Internship',
        message: 'A new SDE Summer 2026 internship matching your skills in Go & Cloud Systems was posted.',
        type: 'opportunity',
        link: '/opportunities',
        isRead: false,
      },
    ]);

    // 11. Create Campus Placement Drives
    await Placement.create([
      {
        companyName: 'Microsoft IDC',
        logo: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?auto=format&fit=crop&q=80&w=200',
        role: 'Software Development Engineer - I (Cloud & AI)',
        ctc: '₹44.5 LPA',
        ctcNumber: 44.5,
        location: 'Hyderabad / Bengaluru',
        category: 'Product',
        eligibility: { minCgpa: 8.0, allowedBranches: ['CSE', 'IT', 'ECE'], maxBacklogs: 0 },
        jobDescription: 'Build next-generation distributed systems, Azure hyper-scale cloud infra, and autonomous AI agents.',
        keySkills: ['Go', 'C++', 'Distributed Systems', 'Azure', 'Kubernetes'],
        driveDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        hiringRounds: ['Online Coding Challenge', 'Technical Interview 1', 'Technical Interview 2', 'AA / HR Round'],
        status: 'Active Registration',
        totalOpenings: 18,
        featured: true,
      },
      {
        companyName: 'Google India',
        logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=200',
        role: 'Silicon & Systems Software Engineer',
        ctc: '₹42.0 LPA',
        ctcNumber: 42.0,
        location: 'Bengaluru',
        category: 'Product',
        eligibility: { minCgpa: 8.2, allowedBranches: ['CSE', 'ECE', 'EEE'], maxBacklogs: 0 },
        jobDescription: 'Develop low-level firmware, kernel drivers, and high-performance ML accelerator pipelines for Google Cloud TPUs.',
        keySkills: ['C', 'C++', 'Computer Architecture', 'Linux Kernel', 'Compilers'],
        driveDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        hiringRounds: ['Google Online Challenge', '3 Technical Coding Rounds', 'Googliness Round'],
        status: 'Active Registration',
        totalOpenings: 12,
        featured: true,
      },
      {
        companyName: 'Goldman Sachs',
        logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=200',
        role: 'Quantitative Engineering Analyst',
        ctc: '₹34.0 LPA',
        ctcNumber: 34.0,
        location: 'Bengaluru / Mumbai',
        category: 'FinTech',
        eligibility: { minCgpa: 7.5, allowedBranches: ['All Engineering Branches'], maxBacklogs: 0 },
        jobDescription: 'Design low-latency algorithmic trading infrastructure, mathematical derivatives pricing, and high-frequency risk management software.',
        keySkills: ['Java', 'C++', 'Algorithms', 'Probability & Statistics', 'SQL'],
        driveDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        hiringRounds: ['Aptitude & Math Assessment', 'CoderPad Live Coding', 'Systems Architecture Round', 'MD Round'],
        status: 'Upcoming',
        totalOpenings: 15,
        featured: true,
      },
    ]);

    // 12. Create Sudden & Emergency Circulars
    await Circular.create([
      {
        circularNumber: 'CAMPUS-OS/REG/2026/CIRC-1082-FLASH',
        title: 'FLASH ALERT: Campus Holiday Declared Tomorrow Due to Severe Meteorological Rainfall Advisory',
        summary: 'District administration red alert issued for cyclonic precipitation. All physical lectures suspended; online simulations active on LMS.',
        fullText: 'As per direct instructions from the District Collectorate and State Disaster Management Authority regarding severe rainfall, the University administration hereby announces suspension of in-person classes and examinations for tomorrow.',
        category: 'Emergency / Sudden',
        priority: 'Flash Emergency',
        isFlashTicker: true,
        issuedBy: 'Dr. Rajeshwari Raman, Registrar & Dean Academic Affairs',
        departments: ['All Departments'],
      },
      {
        circularNumber: 'CAMPUS-OS/COE/2026/CIRC-1078',
        title: 'URGENT: Rescheduling of Autumn Mid-Term II Examination for CS301 & EC304',
        summary: 'Due to clash with National Gate Mock drive, CS301 is rescheduled to Monday 09:30 AM.',
        fullText: 'Controller of Examinations has approved rescheduling of CS301 and EC304 Mid-Term II papers to avoid clash with National GATE testing.',
        category: 'Examination',
        priority: 'Urgent',
        isFlashTicker: false,
        issuedBy: 'Prof. S. V. Nair, Controller of Examinations',
        departments: ['CSE', 'ECE'],
      },
      {
        circularNumber: 'CAMPUS-OS/FIN/2026/CIRC-1065',
        title: 'NOTICE: Extension of Semester Tuition Fee Payment Window Without Late Surcharge',
        summary: 'Last date for Autumn Semester fee payment extended to the 15th of next month without any late penalty fee.',
        fullText: 'Pursuant to requests from the Student Welfare Association, the Competent Authority has sanctioned an extension of the deadline for semester fee payment without late fees.',
        category: 'Fee & Finance',
        priority: 'Important',
        isFlashTicker: false,
        issuedBy: 'Shri A. K. Banerjee, Chief Finance Officer',
        departments: ['All Departments'],
      },
    ]);

    // 13. Create Fee Ledger Records
    await FeePayment.create([
      {
        student: studentUser._id,
        studentName: studentUser.name,
        rollNumber: studentUser.studentId,
        department: studentUser.department,
        feeType: 'Semester Tuition Fee',
        academicYear: '2025-2026',
        semester: 6,
        amount: 65000,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: 'Pending',
        breakdown: [
          { item: 'Academic Instruction & Lab Access', amount: 48000 },
          { item: 'Digital Library & Research Subscriptions', amount: 7000 },
          { item: 'Campus High-Speed Wi-Fi & IT Infrastructure', amount: 5000 },
          { item: 'Student Welfare & Sports Facilities', amount: 5000 },
        ],
      },
      {
        student: studentUser._id,
        studentName: studentUser.name,
        rollNumber: studentUser.studentId,
        department: studentUser.department,
        feeType: 'Semester Examination Fee',
        academicYear: '2025-2026',
        semester: 6,
        amount: 3200,
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        status: 'Pending',
        breakdown: [
          { item: 'Theory Examination Evaluation & OMR Processing', amount: 2000 },
          { item: 'Practical Viva External Examiner Remuneration', amount: 800 },
          { item: 'Official Grade Card & Digital Hall Ticket Issuance', amount: 400 },
        ],
      },
      {
        student: studentUser._id,
        studentName: studentUser.name,
        rollNumber: studentUser.studentId,
        department: studentUser.department,
        feeType: 'Hostel & Mess Charges',
        academicYear: '2025-2026',
        semester: 6,
        amount: 42500,
        dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        status: 'Paid',
        paidAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        transactionId: 'TXN_CAMPUS_981423871',
        paymentMethod: 'UPI',
        receiptNumber: 'REC-2026-HSTL-04912',
        breakdown: [
          { item: 'Dual Occupancy Room (Hostel 4)', amount: 24000 },
          { item: 'Dining Mess Subscription (4 Months)', amount: 16500 },
          { item: 'Hostel Maintenance & Laundry Core', amount: 2000 },
        ],
      },
    ]);

    // 14. Create Examinations & Seating Allotments
    await Exam.create([
      {
        examType: 'Semester End Theory',
        semester: 6,
        academicYear: '2025-2026',
        department: 'CSE',
        subjectCode: 'CS301',
        subjectName: 'Distributed Systems & Cloud Computing',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        session: 'Morning (09:30 AM - 12:30 PM)',
        durationMinutes: 180,
        hallNumber: 'Exam Block Hall 402',
        maxMarks: 100,
        invigilator: 'Prof. Vikram Sen',
        seatingAllotments: [
          { rollNumber: '22BCSE1042', studentName: 'Arjun Sharma', deskNumber: 'D-14', hallNumber: 'Hall 402', rowNumber: 'Row 3' },
          { rollNumber: '22BCSE1108', studentName: 'Ananya Verma', deskNumber: 'D-15', hallNumber: 'Hall 402', rowNumber: 'Row 3' },
        ],
        guidelines: [
          'Digital Hall Ticket must be produced upon entering the hall.',
          'Non-programmable scientific calculators are permitted.',
          'Smart phones, smartwatch, and bluetooth electronics are strictly prohibited.',
        ],
      },
      {
        examType: 'Semester End Theory',
        semester: 6,
        academicYear: '2025-2026',
        department: 'CSE',
        subjectCode: 'CS302',
        subjectName: 'Deep Learning & Neural Architectures',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        session: 'Morning (09:30 AM - 12:30 PM)',
        durationMinutes: 180,
        hallNumber: 'Exam Block Hall 402',
        maxMarks: 100,
        invigilator: 'Dr. Elena Rostova',
        seatingAllotments: [
          { rollNumber: '22BCSE1042', studentName: 'Arjun Sharma', deskNumber: 'D-14', hallNumber: 'Hall 402', rowNumber: 'Row 3' },
        ],
        guidelines: ['Statistical formulation tables will be provided by invigilator.'],
      },
    ]);

    // 15. Create Lost & Found Items
    await LostFound.create([
      {
        type: 'Lost',
        title: 'Brown Leather Wallet with ₹2,500 Cash & Campus ID',
        category: 'Cash / Money',
        description: 'Lost brown Tommy Hilfiger leather wallet containing ₹2,500 cash, student ID (22BCSE1042), SBI ATM card. Last seen in library reading hall.',
        location: 'Central Library 2nd Floor, Desk #44',
        dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        approximateTime: '03:30 PM Yesterday',
        rewardAmount: 500,
        contactName: 'Arjun Sharma',
        contactPhone: '+91 98765 43210',
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400',
        status: 'Active',
      },
      {
        type: 'Found',
        title: 'Apple AirPods Pro (2nd Gen) in White MagSafe Case',
        category: 'Earbuds / Headphones',
        description: 'Found a pair of AirPods Pro lying on the bench near Food Court staircase. Handed over to campus security desk.',
        location: 'Campus Food Court & Cafeteria Staircase',
        dateReported: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        approximateTime: '12:45 PM',
        rewardAmount: 0,
        contactName: 'Rohan Mehra',
        contactPhone: '+91 98450 11223',
        imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=400',
        status: 'Active',
      },
    ]);

    // 16. Create Safety Incidents
    await SafetyIncident.create([
      {
        incidentType: 'Campus Altercation / Fight',
        location: 'Hostel 2 Quadrangle Basketball Court',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        time: '10:45 PM',
        description: 'Physical altercation and heated argument broke out between student groups following sports match.',
        severity: 'High',
        isAnonymous: true,
        reporter: { name: 'Anonymous Student Reporter', rollNumber: 'CONFIDENTIAL' },
        personsInvolved: 'Students from 3rd & 4th Year Mechanical vs Civil',
        status: 'Disciplinary Action Enforced',
        actionTaken: 'Proctorial Board summoned all parties. Written undertakings and suspension from sports facilities enforced with parent notification.',
        investigator: 'Dr. Marcus Vance (Chief Proctor)',
      },
      {
        incidentType: 'Ragging & Bullying',
        location: 'Freshers Hostel Block 1 Corridor',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        time: '11:30 PM',
        description: 'Reported verbal intimidation and forced late-night assembly in corridor by senior batch hostellers.',
        severity: 'Critical Emergency',
        isAnonymous: true,
        reporter: { name: 'Anonymous Fresher', rollNumber: 'CONFIDENTIAL' },
        personsInvolved: 'Senior Hostellers (Hostel 1)',
        status: 'Resolved & Closed',
        actionTaken: 'Anti-Ragging Squad conducted surprise midnight inspection. Identified students reprimanded, hostel rooms changed, and monetary penalty imposed.',
        investigator: 'Prof. Vikram Sen & Anti-Ragging Flying Squad',
      },
    ]);

    console.log('[Seed] Database populated successfully with realistic campus dataset.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
