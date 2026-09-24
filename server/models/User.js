import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'club_admin', 'super_admin'],
      default: 'student',
    },
    studentId: {
      type: String,
      trim: true,
      default: '',
    },
    department: {
      type: String,
      enum: ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Information Technology', 'General Administration'],
      default: 'CSE',
    },
    year: {
      type: String,
      enum: ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty', 'Staff'],
      default: '3rd Year',
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: 'CampusOS Pioneer exploring tech, hackathons, and research.',
      maxlength: 300,
    },
    skills: {
      type: [String],
      default: ['React', 'JavaScript', 'Node.js', 'Python'],
    },
    interests: {
      type: [String],
      default: ['AI / ML', 'Web3', 'Competitive Programming', 'Robotics'],
    },
    savedOpportunities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity'
    }],
    registeredEvents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }],
    joinedClubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    }]
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
