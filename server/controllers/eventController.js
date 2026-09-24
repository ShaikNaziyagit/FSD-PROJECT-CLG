import Event from '../models/Event.js';
import User from '../models/User.js';

// @desc    Get all events with search & category filters
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { organizer: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(query).sort({ date: 1 });
    res.json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching events.',
    });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('attendees.user', 'name email department avatar');
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Campus event not found.',
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching event details.',
    });
  }
};

// @desc    Register for event
// @route   POST /api/events/:id/register
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    // Check if already registered
    const alreadyRegistered = event.attendees.some(
      (a) => a.user.toString() === req.user._id.toString()
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event.',
      });
    }

    if (event.attendees.length >= event.maxCapacity) {
      return res.status(400).json({
        success: false,
        message: 'Event has reached maximum seat capacity.',
      });
    }

    event.attendees.push({ user: req.user._id });
    await event.save();

    // Add to user's registeredEvents
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { registeredEvents: event._id },
    });

    res.json({
      success: true,
      message: 'Successfully registered for event!',
      attendeesCount: event.attendees.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering for event.',
    });
  }
};

// @desc    Cancel event registration
// @route   POST /api/events/:id/cancel
// @access  Private
export const cancelEventRegistration = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    event.attendees = event.attendees.filter(
      (a) => a.user.toString() !== req.user._id.toString()
    );
    await event.save();

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { registeredEvents: event._id },
    });

    res.json({
      success: true,
      message: 'Event registration successfully cancelled.',
      attendeesCount: event.attendees.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error cancelling event registration.',
    });
  }
};

// @desc    Create new event (Admin / Faculty / Club Admin)
// @route   POST /api/events
// @access  Private (Admin / Faculty / Club)
export const createEvent = async (req, res) => {
  try {
    const { title, banner, description, category, date, time, location, organizer, maxCapacity, tags, featured } = req.body;
    const event = await Event.create({
      title,
      banner,
      description,
      category,
      date,
      time,
      location,
      organizer: organizer || req.user.name,
      maxCapacity: maxCapacity || 150,
      tags: tags || [],
      featured: Boolean(featured),
    });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating event.',
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    await event.deleteOne();
    res.json({
      success: true,
      message: 'Event successfully removed.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting event.',
    });
  }
};
