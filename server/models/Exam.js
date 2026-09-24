import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    examType: {
      type: String,
      enum: ['Mid-Term 1', 'Mid-Term 2', 'Semester End Theory', 'Practical / Lab Viva'],
      default: 'Semester End Theory',
    },
    semester: {
      type: Number,
      required: true,
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
    department: {
      type: String,
      default: 'CSE',
    },
    subjectCode: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    session: {
      type: String,
      default: 'Morning (09:30 AM - 12:30 PM)',
    },
    durationMinutes: {
      type: Number,
      default: 180,
    },
    hallNumber: {
      type: String,
      default: 'Exam Block - Hall 402',
    },
    maxMarks: {
      type: Number,
      default: 100,
    },
    invigilator: {
      type: String,
      default: 'Prof. Vikram Sen / Dr. R. Raman',
    },
    seatingAllotments: [
      {
        rollNumber: String,
        studentName: String,
        deskNumber: String,
        hallNumber: String,
        rowNumber: String,
      },
    ],
    guidelines: [String],
  },
  { timestamps: true }
);

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
