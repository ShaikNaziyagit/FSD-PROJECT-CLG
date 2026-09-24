import express from 'express';
import {
  getEvents,
  getEventById,
  registerForEvent,
  cancelEventRegistration,
  createEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/:id/register', protect, registerForEvent);
router.post('/:id/cancel', protect, cancelEventRegistration);
router.post('/', protect, authorizeRoles('faculty', 'club_admin', 'super_admin'), createEvent);
router.delete('/:id', protect, authorizeRoles('super_admin', 'faculty'), deleteEvent);

export default router;
