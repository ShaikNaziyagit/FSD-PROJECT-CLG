import Club from '../models/Club.js';
import User from '../models/User.js';

// @desc    Get all clubs
// @route   GET /api/clubs
// @access  Public
export const getClubs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortTag: { $regex: search, $options: 'i' } },
      ];
    }

    const clubs = await Club.find(query).sort({ name: 1 });
    res.json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching clubs.',
    });
  }
};

// @desc    Get single club by ID
// @route   GET /api/clubs/:id
// @access  Public
export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('members', 'name email department avatar role');
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found.',
      });
    }

    res.json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching club details.',
    });
  }
};

// @desc    Join or leave a club
// @route   POST /api/clubs/:id/join
// @access  Private
export const toggleJoinClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found.',
      });
    }

    const user = await User.findById(req.user._id);
    const isMember = club.members.includes(user._id);

    if (isMember) {
      club.members.pull(user._id);
      user.joinedClubs.pull(club._id);
    } else {
      club.members.push(user._id);
      user.joinedClubs.push(club._id);
    }

    await club.save();
    await user.save();

    res.json({
      success: true,
      isMember: !isMember,
      membersCount: club.members.length,
      message: isMember ? `Left ${club.name}` : `Joined ${club.name}! Welcome aboard.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error joining/leaving club.',
    });
  }
};

// @desc    Create new club
// @route   POST /api/clubs
// @access  Private (Admin)
export const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json({
      success: true,
      data: club,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating club.',
    });
  }
};
