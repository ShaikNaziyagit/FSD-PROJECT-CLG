import Exam from '../models/Exam.js';

const fallbackExams = [
  {
    _id: 'exam_01',
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
      'Mobile phones, smartwatch, and bluetooth electronics are strictly prohibited.',
    ],
  },
  {
    _id: 'exam_02',
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
  {
    _id: 'exam_03',
    examType: 'Semester End Theory',
    semester: 6,
    academicYear: '2025-2026',
    department: 'CSE',
    subjectCode: 'CS303',
    subjectName: 'Cyber-Physical Systems & Network Security',
    date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    session: 'Morning (09:30 AM - 12:30 PM)',
    durationMinutes: 180,
    hallNumber: 'Exam Block Hall 301',
    maxMarks: 100,
    invigilator: 'Dr. Marcus Vance',
    seatingAllotments: [
      { rollNumber: '22BCSE1042', studentName: 'Arjun Sharma', deskNumber: 'B-08', hallNumber: 'Hall 301', rowNumber: 'Row 2' },
    ],
    guidelines: ['Standard university cryptographic tables allowed.'],
  },
  {
    _id: 'exam_04',
    examType: 'Practical / Lab Viva',
    semester: 6,
    academicYear: '2025-2026',
    department: 'CSE',
    subjectCode: 'CS305L',
    subjectName: 'Quantum Information & Computing Lab',
    date: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
    session: 'Afternoon (02:00 PM - 05:00 PM)',
    durationMinutes: 180,
    hallNumber: 'Quantum Computing Wing Lab 2',
    maxMarks: 50,
    invigilator: 'Dr. Priya Nair & External Examiner',
    seatingAllotments: [
      { rollNumber: '22BCSE1042', studentName: 'Arjun Sharma', deskNumber: 'Terminal-06', hallNumber: 'Lab 2', rowNumber: 'Batch A' },
    ],
    guidelines: ['Bring verified practical record book and laboratory observation sheets.'],
  },
];

export const getExams = async (req, res) => {
  try {
    let exams = await Exam.find().sort({ date: 1 });
    if (!exams || exams.length === 0) {
      exams = fallbackExams;
    }
    res.json({ success: true, count: exams.length, data: exams });
  } catch (error) {
    res.json({ success: true, count: fallbackExams.length, data: fallbackExams });
  }
};

export const getHallTicket = async (req, res) => {
  try {
    const studentUser = req.user;
    const hallTicketData = {
      institutionName: 'CAMPUS OPERATING SYSTEM (CAMPUSOS) UNIVERSITY',
      examTitle: 'B.TECH AUTUMN SEMESTER END EXAMINATIONS 2026',
      hallTicketNumber: `HT-${studentUser.studentId || '22BCSE1042'}-2026`,
      studentName: studentUser.name || 'Arjun Sharma',
      rollNumber: studentUser.studentId || '22BCSE1042',
      department: studentUser.department || 'Computer Science & Engineering',
      semester: 6,
      dob: '15-Aug-2003',
      examCenter: 'Main Academic Quadrangle & Examination Complex',
      photoUrl: studentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      barcode: '||| ||||||| |||||| |||||||| |||||| ||||',
      controllerSign: 'Dr. S. V. Nair (Controller of Examinations)',
      schedule: fallbackExams.map((e) => ({
        subjectCode: e.subjectCode,
        subjectName: e.subjectName,
        date: e.date,
        session: e.session,
        hallNumber: e.hallNumber,
        deskNumber: 'D-14',
      })),
      instructions: [
        'Candidate must be seated in the examination hall at least 15 minutes before commencement.',
        'No candidate will be admitted after 30 minutes from start of examination.',
        'Possession of smart phones, smartwatch, or unauthorized paper constitutes malpractice.',
        'Hall Ticket must be preserved until final semester grade sheet is issued.',
      ],
    };

    res.json({ success: true, data: hallTicketData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
