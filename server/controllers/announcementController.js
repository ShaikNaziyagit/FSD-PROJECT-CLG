import Announcement from '../models/Announcement.js';

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    const { priority, category } = req.query;
    let query = {};

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const announcements = await Announcement.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching announcements.',
    });
  }
};

// @desc    Create announcement
// @route   POST /api/announcements
// @access  Private (Admin / Faculty)
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, category, priority, department, targetAudience } = req.body;
    const announcement = await Announcement.create({
      title,
      description,
      category: category || 'Academic',
      priority: priority || 'Normal',
      author: {
        name: req.user.name,
        role: req.user.role,
      },
      department: department || req.user.department || 'All Departments',
      targetAudience: targetAudience || 'All Students',
    });

    res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error publishing announcement.',
    });
  }
};

// @desc    Delete announcement
// @route   DELETE /api/announcements/:id
// @access  Private (Admin)
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found.',
      });
    }

    await announcement.deleteOne();
    res.json({
      success: true,
      message: 'Announcement removed successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error removing announcement.',
    });
  }
};
