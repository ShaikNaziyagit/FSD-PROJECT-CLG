import Circular from '../models/Circular.js';

const fallbackCirculars = [
  {
    _id: 'circ_01',
    circularNumber: 'CAMPUS-OS/REG/2026/CIRC-1082-FLASH',
    title: 'FLASH ALERT: Campus Holiday Declared Tomorrow Due to Severe Meteorological Rainfall Advisory',
    summary: 'District administration red alert issued for cyclonic precipitation. All physical lectures suspended; online laboratory simulations will operate on LMS.',
    fullText: 'As per direct instructions from the District Collectorate and State Disaster Management Authority regarding severe torrential rainfall, the University administration hereby announces suspension of all in-person classes, physical examinations, and campus bus transit operations for tomorrow.\n\nKey Directives:\n1. All semester practical exams scheduled for tomorrow stand deferred. Revised time slots will be issued within 48 hours.\n2. Hostel residents are strictly advised to remain within designated hostel perimeters and avoid low-lying campus grounds.\n3. Essential services (Campus Medical Dispensary, Dining Mess, and Server Operations Core) will function round the clock.\n4. Faculty members may conduct scheduled review sessions via Zoom / CampusOS Classroom.',
    category: 'Emergency / Sudden',
    priority: 'Flash Emergency',
    isFlashTicker: true,
    issuedBy: 'Dr. Rajeshwari Raman, Registrar & Dean Academic Affairs',
    authorityTitle: 'Office of Vice Chancellor & Executive Syndicate',
    targetAudience: 'All Students, Faculty & Campus Residents',
    departments: ['All Departments'],
    effectiveDate: new Date(),
    validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    actionRequired: 'Immediate compliance and adherence to safety directives.',
  },
  {
    _id: 'circ_02',
    circularNumber: 'CAMPUS-OS/COE/2026/CIRC-1078',
    title: 'URGENT: Rescheduling of Autumn Mid-Term II Examination for CS301 & EC304',
    summary: 'Due to clash with National Gate Assessment Mock drive, CS301 (Distributed Systems) is rescheduled to Monday 09:30 AM.',
    fullText: 'In response to representations from the Student Placement & Technical Council regarding clash with the National GATE Competitive Assessment, the Controller of Examinations has approved rescheduling of CS301 and EC304 Mid-Term II papers.\n\nRevised Schedule:\n- CS301: Distributed Systems & Cloud Computing -> Rescheduled to Monday, 09:30 AM - 12:30 PM (Exam Hall 302)\n- EC304: VLSI Circuit Engineering -> Rescheduled to Monday, 02:00 PM - 05:00 PM (Exam Hall 204)\n\nAll existing Hall Tickets remain valid.',
    category: 'Examination',
    priority: 'Urgent',
    isFlashTicker: false,
    issuedBy: 'Prof. S. V. Nair, Controller of Examinations',
    authorityTitle: 'Examination Branch, CampusOS Central Secretariat',
    targetAudience: 'B.Tech 3rd & 4th Year Students',
    departments: ['CSE', 'ECE'],
    effectiveDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    actionRequired: 'Verify updated seating allotment on CampusOS Examination Portal.',
  },
  {
    _id: 'circ_03',
    circularNumber: 'CAMPUS-OS/FIN/2026/CIRC-1065',
    title: 'NOTICE: Extension of Semester Tuition Fee Payment Window Without Late Surcharge',
    summary: 'Last date for Autumn Semester fee payment extended to the 15th of next month without any late penalty fee.',
    fullText: 'Pursuant to requests submitted by the Student Welfare Association regarding banking server delays during state education scholarship disbursements, the Competent Authority has sanctioned an extension of the deadline for payment of Semester Tuition Fees.\n\nRevised Due Date: 15th of Next Month.\nNo late surcharge of ₹500/day will be levied until this date. Students may utilize the digital simulated Razorpay gateway on the CampusOS Fee Portal for zero-convenience fee transactions.',
    category: 'Fee & Finance',
    priority: 'Important',
    isFlashTicker: false,
    issuedBy: 'Shri A. K. Banerjee, Chief Finance Officer',
    authorityTitle: 'Directorate of Finance & Accounts',
    targetAudience: 'All Registered Students',
    departments: ['All Departments'],
    effectiveDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    validUntil: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    actionRequired: 'Clear dues before deadline to ensure uninterrupted access to exam hall tickets.',
  },
  {
    _id: 'circ_04',
    circularNumber: 'CAMPUS-OS/PROCT/2026/CIRC-1051',
    title: 'STRICT ADVISORY: ZERO TOLERANCE ON CAMPUS DISCIPLINE & ANTI-RAGGING SQUAD PATROLLING',
    summary: 'Intensified night vigilance squads deployed at hostel dining zones and campus quadrangles. Disciplinary actions outlined for misconduct.',
    fullText: 'All students are reminded that CampusOS operates under a zero-tolerance policy regarding physical fights, group altercations, cyber harassment, and ragging. Any student found engaging in or abetting unruly disputes will face immediate suspension pending Proctorial Board inquiry, hostel rustication, and filing of formal police FIR.\n\nConfidential complaints may be lodged directly via the Campus Safety & Vigilance Portal or by contacting the Emergency SOS Helpline.',
    category: 'Disciplinary & Safety',
    priority: 'Urgent',
    isFlashTicker: false,
    issuedBy: 'Dr. Marcus Vance, Chief Proctor',
    authorityTitle: 'Proctorial Vigilance Board & Anti-Ragging Committee',
    targetAudience: 'All Campus Students & Hostellers',
    departments: ['All Departments'],
    effectiveDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    actionRequired: 'Strict compliance by all students. Carry digital ID card at all times.',
  },
];

export const getCirculars = async (req, res) => {
  try {
    let circulars = await Circular.find().sort({ effectiveDate: -1 });
    if (!circulars || circulars.length === 0) {
      circulars = fallbackCirculars;
    }
    res.json({ success: true, count: circulars.length, data: circulars });
  } catch (error) {
    res.json({ success: true, count: fallbackCirculars.length, data: fallbackCirculars });
  }
};

export const createCircular = async (req, res) => {
  try {
    const newCircular = await Circular.create({
      ...req.body,
      circularNumber: req.body.circularNumber || `CAMPUS-OS/CIRC/${Date.now().toString().slice(-6)}`,
    });
    res.status(201).json({ success: true, data: newCircular });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
