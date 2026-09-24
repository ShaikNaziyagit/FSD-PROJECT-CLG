import Resource from '../models/Resource.js';

// @desc    Get all campus resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res) => {
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
        { location: { $regex: search, $options: 'i' } },
        { availableServices: { $regex: search, $options: 'i' } },
      ];
    }

    const resources = await Resource.find(query).sort({ category: 1, name: 1 });
    res.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching campus resources.',
    });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found.',
      });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching resource.',
    });
  }
};

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private (Admin)
export const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating campus resource.',
    });
  }
};
