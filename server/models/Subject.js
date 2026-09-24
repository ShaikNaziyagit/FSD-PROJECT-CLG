import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    facultyEmail: {
      type: String,
      default: '',
    },
    credits: {
      type: Number,
      default: 4,
    },
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      default: 6,
    },
    nextClass: {
      day: String,
      time: String,
      room: String,
    },
    attendanceRate: {
      type: Number,
      default: 85,
    },
    totalClasses: {
      type: Number,
      default: 32,
    },
    attendedClasses: {
      type: Number,
      default: 28,
    }
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
