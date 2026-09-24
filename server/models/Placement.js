import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      required: true,
    },
    ctc: {
      type: String,
      required: true,
    },
    ctcNumber: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: 'Pan India / Hybrid',
    },
    category: {
      type: String,
      enum: ['Product', 'Service', 'FinTech', 'Core Engineering', 'Startup'],
      default: 'Product',
    },
    eligibility: {
      minCgpa: { type: Number, default: 7.0 },
      allowedBranches: [String],
      maxBacklogs: { type: Number, default: 0 },
    },
    jobDescription: {
      type: String,
      required: true,
    },
    keySkills: [String],
    driveDate: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    hiringRounds: [String],
    status: {
      type: String,
      enum: ['Upcoming', 'Active Registration', 'In Progress', 'Completed'],
      default: 'Active Registration',
    },
    totalOpenings: {
      type: Number,
      default: 10,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: String,
        studentId: String,
        email: String,
        cgpa: Number,
        status: {
          type: String,
          enum: ['Applied', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected'],
          default: 'Applied',
        },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Placement = mongoose.model('Placement', placementSchema);
export default Placement;
