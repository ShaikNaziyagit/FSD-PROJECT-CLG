import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Library', 'Labs', 'Computer Center', 'Placement Cell', 'Student Support', 'Hostel', 'Transport', 'Cafeteria', 'Medical Center'],
      default: 'Library',
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    contact: {
      phone: String,
      email: String,
      incharge: String,
    },
    availableServices: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Operational', 'Maintenance', 'Restricted Hours', 'Closed'],
      default: 'Operational',
    },
    iconName: {
      type: String,
      default: 'Building',
    }
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
