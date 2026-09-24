import Opportunity from '../models/Opportunity.js';
import User from '../models/User.js';

// @desc    Get all opportunities with filters
// @route   GET /api/opportunities
// @access  Public
export const getOpportunities = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { organization: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } },
      ];
    }

    const opportunities = await Opportunity.find(query).sort({ deadline: 1 });
    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching opportunities.',
    });
  }
};

// @desc    Get single opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Public
export const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found.',
      });
    }

    res.json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching opportunity details.',
    });
  }
};

// @desc    Bookmark or unbookmark opportunity
// @route   POST /api/opportunities/:id/save
// @access  Private
export const toggleSaveOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found.',
      });
    }

    const user = await User.findById(req.user._id);
    const isSaved = user.savedOpportunities.includes(opportunity._id);

    if (isSaved) {
      user.savedOpportunities.pull(opportunity._id);
      opportunity.savedBy.pull(user._id);
    } else {
      user.savedOpportunities.push(opportunity._id);
      opportunity.savedBy.push(user._id);
    }

    await user.save();
    await opportunity.save();

    res.json({
      success: true,
      isSaved: !isSaved,
      message: isSaved ? 'Removed from saved opportunities' : 'Saved to your opportunities bookmark!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating bookmark.',
    });
  }
};

// @desc    Create opportunity
// @route   POST /api/opportunities
// @access  Private (Admin / Faculty)
export const createOpportunity = async (req, res) => {
  try {
    const { title, organization, category, description, stipendOrPrize, location, deadline, eligibility, skills, applicationUrl, featured } = req.body;
    const opportunity = await Opportunity.create({
      title,
      organization,
      category,
      description,
      stipendOrPrize,
      location,
      deadline,
      eligibility,
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
      applicationUrl: applicationUrl || '#',
      featured: Boolean(featured),
    });

    res.status(201).json({
      success: true,
      data: opportunity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating opportunity.',
    });
  }
};

// @desc    Delete opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private (Admin)
export const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found.',
      });
    }

    await opportunity.deleteOne();
    res.json({
      success: true,
      message: 'Opportunity successfully removed.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting opportunity.',
    });
  }
};
