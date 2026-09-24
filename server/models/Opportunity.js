import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Internships', 'Hackathons', 'Jobs', 'Scholarships', 'Competitions', 'Certifications', 'Workshops'],
      default: 'Internships',
    },
    description: {
      type: String,
      required: true,
    },
    stipendOrPrize: {
      type: String,
      default: 'Competitive / Unpaid / Not Specified',
    },
    location: {
      type: String,
      default: 'Remote / On-Campus',
    },
    deadline: {
      type: Date,
      required: true,
    },
    eligibility: {
      type: String,
      default: 'Open to all years',
    },
    skills: {
      type: [String],
      default: [],
    },
    applicationUrl: {
      type: String,
      default: '#',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;
