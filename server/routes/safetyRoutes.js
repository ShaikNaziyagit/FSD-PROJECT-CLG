import express from 'express';
import { getSafetyData, reportIncident } from '../controllers/safetyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSafetyData);
router.post('/report', protect, reportIncident);

export default router;
