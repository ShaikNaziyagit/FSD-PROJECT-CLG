import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, studentId, department, year, role } = req.body;

    const cleanName = name ? name.trim() : '';
    const cleanEmail = email ? email.toLowerCase().trim() : '';

    if (!cleanName || !cleanEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password.',
      });
    }

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user account with this email address already exists.',
      });
    }

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password,
      studentId: studentId ? studentId.trim() : '',
      department: department || 'CSE',
      year: year || '3rd Year',
      role: role && ['student', 'faculty', 'club_admin'].includes(role) ? role : 'student',
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          department: user.department,
          year: user.year,
          avatar: user.avatar,
          bio: user.bio,
          skills: user.skills,
          interests: user.interests,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid user registration data provided.',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during user registration.',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const cleanEmail = email ? email.toLowerCase().trim() : '';
    if (!cleanEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          department: user.department,
          year: user.year,
          avatar: user.avatar,
          bio: user.bio,
          skills: user.skills,
          interests: user.interests,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during user login.',
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('savedOpportunities')
      .populate('registeredEvents')
      .populate('joinedClubs');

    if (user) {
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User account not found.',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching user profile.',
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.department = req.body.department || user.department;
      user.year = req.body.year || user.year;
      user.studentId = req.body.studentId !== undefined ? req.body.studentId : user.studentId;
      if (req.body.skills) user.skills = req.body.skills;
      if (req.body.interests) user.interests = req.body.interests;
      if (req.body.avatar !== undefined) user.avatar = req.body.avatar;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        data: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          studentId: updatedUser.studentId,
          department: updatedUser.department,
          year: updatedUser.year,
          avatar: updatedUser.avatar,
          bio: updatedUser.bio,
          skills: updatedUser.skills,
          interests: updatedUser.interests,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating profile.',
    });
  }
};
