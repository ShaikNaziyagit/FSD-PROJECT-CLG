import User from '../models/User.js';
import Event from '../models/Event.js';
import Opportunity from '../models/Opportunity.js';
import Club from '../models/Club.js';
import Announcement from '../models/Announcement.js';
import Post from '../models/Post.js';
import Resource from '../models/Resource.js';

// @desc    Get aggregate platform metrics
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getPlatformStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalEvents,
      totalOpportunities,
      totalClubs,
      totalAnnouncements,
      totalPosts,
      totalResources,
    ] = await Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Opportunity.countDocuments(),
      Club.countDocuments(),
      Announcement.countDocuments(),
      Post.countDocuments(),
      Resource.countDocuments(),
    ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalEvents,
        totalOpportunities,
        totalClubs,
        totalAnnouncements,
        totalPosts,
        totalResources,
        usersByRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching system metrics.',
    });
  }
};

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching users list.',
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['student', 'faculty', 'club_admin', 'super_admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role assignment requested.',
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: `User role updated to ${role}.`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating user role.',
    });
  }
};

// @desc    Delete user account
// @route   DELETE /api/admin/users/:id
// @access  Private (Super Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own administrator account.',
      });
    }

    await user.deleteOne();
    res.json({
      success: true,
      message: 'User removed from CampusOS directory.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error removing user.',
    });
  }
};
