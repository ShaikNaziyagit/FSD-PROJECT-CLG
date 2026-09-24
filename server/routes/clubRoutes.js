import express from 'express';
import {
  getClubs,
  getClubById,
  toggleJoinClub,
  createClub,
} from '../controllers/clubController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getClubs);
router.get('/:id', getClubById);
router.post('/:id/join', protect, toggleJoinClub);
router.post('/', protect, authorizeRoles('faculty', 'club_admin', 'super_admin'), createClub);

export default router;
