import mongoose from 'mongoose';

const circularSchema = new mongoose.Schema(
  {
    circularNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    fullText: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        'Emergency / Sudden',
        'Examination',
        'Fee & Finance',
        'Academic Holiday',
        'Disciplinary & Safety',
        'General Administration',
      ],
      default: 'Emergency / Sudden',
    },
    priority: {
      type: String,
      enum: ['Flash Emergency', 'Urgent', 'Important', 'Normal'],
      default: 'Urgent',
    },
    isFlashTicker: {
      type: Boolean,
      default: false,
    },
    issuedBy: {
      type: String,
      default: 'Registrar & Dean of Academic Affairs',
    },
    authorityTitle: {
      type: String,
      default: 'Office of Vice Chancellor & Campus Administration',
    },
    targetAudience: {
      type: String,
      default: 'All Students & Faculty Members',
    },
    departments: {
      type: [String],
      default: ['All Departments'],
    },
    effectiveDate: {
      type: Date,
      default: Date.now,
    },
    validUntil: Date,
    actionRequired: {
      type: String,
      default: 'For immediate compliance and information.',
    },
  },
  { timestamps: true }
);

const Circular = mongoose.model('Circular', circularSchema);
export default Circular;
