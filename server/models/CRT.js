import mongoose from 'mongoose';

const crtSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true,
      enum: [
        'Quantitative Aptitude',
        'Logical Reasoning',
        'Verbal Ability',
        'Technical & Coding',
        'Soft Skills & Group Discussion',
      ],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trainer: {
      name: { type: String, required: true },
      designation: { type: String, default: 'Senior CRT Master Trainer' },
      experience: { type: String, default: '10+ Years Corporate Experience' },
      avatar: String,
    },
    schedule: {
      day: { type: String, default: 'Every Saturday & Sunday' },
      time: { type: String, default: '09:30 AM - 01:00 PM' },
      venue: { type: String, default: 'Seminar Hall 3 / Live Hybrid' },
      mode: { type: String, enum: ['Offline', 'Online Live', 'Hybrid'], default: 'Hybrid' },
    },
    topicsCovered: [String],
    resources: [
      {
        title: String,
        link: String,
        type: { type: String, default: 'PDF Cheatsheet' },
      },
    ],
    mockTests: [
      {
        testTitle: String,
        durationMinutes: { type: Number, default: 30 },
        totalQuestions: { type: Number, default: 10 },
        difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
        questions: [
          {
            question: String,
            options: [String],
            correctAnswer: Number, // index 0-3
            explanation: String,
          },
        ],
      },
    ],
    companyPrepKits: [
      {
        company: String,
        pattern: String,
        rounds: [String],
        tips: String,
      },
    ],
  },
  { timestamps: true }
);

const CRT = mongoose.model('CRT', crtSchema);
export default CRT;
