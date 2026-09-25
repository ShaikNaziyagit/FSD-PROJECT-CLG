import User from '../models/User.js';

/**
 * Ensures baseline demo evaluator accounts (Student & Admin) exist with verified credentials.
 * Automatically synchronizes passwords if an existing user was created with a legacy double-hash.
 */
export const ensureDemoAccounts = async () => {
  try {
    const demoAccounts = [
      {
        name: 'Arjun Sharma',
        email: 'student@campusos.demo',
        password: 'CampusOS@2026',
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
        password: 'CampusOS@2026',
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
        password: 'CampusOS@2026',
        role: 'faculty',
        studentId: 'FAC-CSE-018',
        department: 'CSE',
        year: 'Faculty',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        bio: 'Associate Professor, Department of Computer Science. Research lead for Cloud-Native and Distributed Networks.',
        skills: ['Distributed Algorithms', 'Kubernetes', 'High-Performance Systems'],
        interests: ['Microservices', 'Edge Computing', 'Compiler Optimizations'],
      },
    ];

    for (const acc of demoAccounts) {
      const existingUser = await User.findOne({ email: acc.email }).select('+password');
      if (!existingUser) {
        await User.create(acc);
        console.log(`[CampusOS Engine] Auto-initialized demo account: ${acc.email}`);
      } else {
        const passwordMatches = await existingUser.matchPassword('CampusOS@2026');
        if (!passwordMatches) {
          existingUser.password = 'CampusOS@2026';
          await existingUser.save();
          console.log(`[CampusOS Engine] Re-synced credentials for: ${acc.email}`);
        }
      }
    }
  } catch (error) {
    console.warn(`[CampusOS Engine] Notice during demo accounts check: ${error.message}`);
  }
};

export default ensureDemoAccounts;
