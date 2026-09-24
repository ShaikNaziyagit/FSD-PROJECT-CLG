import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortTag: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Coding & Tech', 'Robotics & AI', 'Cultural & Arts', 'Sports & Fitness', 'Literary & Debating', 'Social Welfare', 'Entrepreneurship'],
      default: 'Coding & Tech',
    },
    facultyCoordinator: {
      name: String,
      department: String,
      email: String,
    },
    studentCoordinators: [
      {
        name: String,
        role: String,
        email: String,
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    contactEmail: {
      type: String,
      default: '',
    },
    socialLinks: {
      github: String,
      linkedin: String,
      discord: String,
    },
  },
  {
    timestamps: true,
  }
);

const Club = mongoose.model('Club', clubSchema);
export default Club;
