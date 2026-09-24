import Subject from '../models/Subject.js';
import Assignment from '../models/Assignment.js';

// @desc    Get all enrolled subjects & attendance stats
// @route   GET /api/academics/subjects
// @access  Private
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ code: 1 });
    res.json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching academic subjects.',
    });
  }
};

// @desc    Get all assignments
// @route   GET /api/academics/assignments
// @access  Private
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('subject', 'name code faculty').sort({ dueDate: 1 });
    res.json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching assignments.',
    });
  }
};

// @desc    Submit an assignment
// @route   POST /api/academics/assignments/:id/submit
// @access  Private
export const submitAssignment = async (req, res) => {
  try {
    const { submissionUrl } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found.',
      });
    }

    assignment.status = 'submitted';
    assignment.submissionUrl = submissionUrl || 'https://campusos.cloud/submissions/demo-doc.pdf';
    await assignment.save();

    res.json({
      success: true,
      message: 'Assignment submitted successfully!',
      data: assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting assignment.',
    });
  }
};

// @desc    Get weekly timetable schedule
// @route   GET /api/academics/timetable
// @access  Private
export const getTimetable = async (req, res) => {
  try {
    // Generate realistic schedule
    const schedule = [
      { day: 'Monday', slots: [
        { time: '09:00 - 10:00', code: 'CS301', subject: 'Distributed Systems', room: 'Hall 302', faculty: 'Dr. Aris Thorne' },
        { time: '10:15 - 11:15', code: 'CS302', subject: 'Deep Learning & Neural Nets', room: 'AI Lab 2', faculty: 'Prof. Elena Rostova' },
        { time: '11:30 - 12:30', code: 'CS304', subject: 'Cloud Native Architectures', room: 'Hall 204', faculty: 'Dr. Vikram Sen' },
      ]},
      { day: 'Tuesday', slots: [
        { time: '09:30 - 10:30', code: 'CS303', subject: 'Cyber-Physical Security', room: 'Security Lab', faculty: 'Dr. Marcus Vance' },
        { time: '11:00 - 01:00', code: 'CS305L', subject: 'Quantum Computing Lab', room: 'Quantum Wing', faculty: 'Dr. Priya Nair' },
      ]},
      { day: 'Wednesday', slots: [
        { time: '09:00 - 10:00', code: 'CS301', subject: 'Distributed Systems', room: 'Hall 302', faculty: 'Dr. Aris Thorne' },
        { time: '10:30 - 12:30', code: 'CS306', subject: 'Compiler Design Workshop', room: 'Hall 105', faculty: 'Prof. Maya Lin' },
      ]},
      { day: 'Thursday', slots: [
        { time: '10:00 - 11:30', code: 'CS302', subject: 'Deep Learning & Neural Nets', room: 'AI Lab 2', faculty: 'Prof. Elena Rostova' },
        { time: '02:00 - 04:00', code: 'CS307', subject: 'Full Stack Systems Studio', room: 'Innovation Hub', faculty: 'Prof. Dev Patel' },
      ]},
      { day: 'Friday', slots: [
        { time: '09:30 - 11:00', code: 'CS304', subject: 'Cloud Native Architectures', room: 'Hall 204', faculty: 'Dr. Vikram Sen' },
        { time: '11:15 - 12:45', code: 'CS303', subject: 'Cyber-Physical Security', room: 'Security Lab', faculty: 'Dr. Marcus Vance' },
      ]},
    ];

    res.json({
      success: true,
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching timetable.',
    });
  }
};
