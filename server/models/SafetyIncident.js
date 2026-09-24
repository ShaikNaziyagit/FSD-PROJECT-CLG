import mongoose from 'mongoose';

const safetyIncidentSchema = new mongoose.Schema(
  {
    incidentType: {
      type: String,
      enum: [
        'Campus Altercation / Fight',
        'Ragging & Bullying',
        'Harassment & Misconduct',
        'Hostel Dispute & Noise',
        'Vandalism & Damage',
        'Campus Safety Threat',
        'Medical Emergency',
      ],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
      type: String,
      default: 'Immediate',
    },
    description: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical Emergency', 'Critical / Immediate SOS'],
      default: 'High',
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    reporter: {
      name: { type: String, default: 'Confidential / Anonymous' },
      rollNumber: { type: String, default: 'ANON' },
      contact: { type: String, default: '' },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    personsInvolved: {
      type: String,
      default: 'Unknown / Under verification',
    },
    status: {
      type: String,
      enum: [
        'Reported',
        'Security Dispatched',
        'Proctorial Board Investigation',
        'Disciplinary Action Enforced',
        'Resolved & Closed',
      ],
      default: 'Reported',
    },
    actionTaken: {
      type: String,
      default: 'Incident logged in campus vigilance logbook. Under review by Proctorial Squad.',
    },
    investigator: {
      type: String,
      default: 'Chief Proctor & Campus Security Officer',
    },
  },
  { timestamps: true }
);

const SafetyIncident = mongoose.model('SafetyIncident', safetyIncidentSchema);
export default SafetyIncident;
