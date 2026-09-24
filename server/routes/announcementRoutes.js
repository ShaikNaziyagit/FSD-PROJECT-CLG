import express from 'express';
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/', protect, authorizeRoles('faculty', 'super_admin', 'club_admin'), createAnnouncement);
router.delete('/:id', protect, authorizeRoles('super_admin', 'faculty'), deleteAnnouncement);

export default router;
