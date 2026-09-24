import express from 'express';
import {
  getOpportunities,
  getOpportunityById,
  toggleSaveOpportunity,
  createOpportunity,
  deleteOpportunity,
} from '../controllers/opportunityController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);
router.post('/:id/save', protect, toggleSaveOpportunity);
router.post('/', protect, authorizeRoles('faculty', 'club_admin', 'super_admin'), createOpportunity);
router.delete('/:id', protect, authorizeRoles('super_admin', 'faculty'), deleteOpportunity);

export default router;
