import express from 'express';
import { getLostFoundItems, createLostFoundItem, claimItem } from '../controllers/lostFoundController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLostFoundItems);
router.post('/', protect, createLostFoundItem);
router.post('/:id/claim', protect, claimItem);

export default router;
