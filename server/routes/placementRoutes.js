import express from 'express';
import { getPlacements, applyToPlacement } from '../controllers/placementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPlacements);
router.post('/:id/apply', protect, applyToPlacement);

export default router;
