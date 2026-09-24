import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Academic', 'Administrative', 'Examination', 'Placement', 'Event', 'Emergency'],
      default: 'Academic',
    },
    priority: {
      type: String,
      enum: ['Normal', 'Important', 'Urgent'],
      default: 'Normal',
    },
    author: {
      name: {
        type: String,
        default: 'Dean Academic Affairs',
      },
      role: {
        type: String,
        default: 'Faculty / Admin',
      },
    },
    department: {
      type: String,
      default: 'All Departments',
    },
    targetAudience: {
      type: String,
      enum: ['All Students', 'Faculty Only', 'B.Tech All Years', 'Final Year Only'],
      default: 'All Students',
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
