import express from 'express';
import { getFeeLedger, payFee } from '../controllers/feeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getFeeLedger);
router.post('/pay', protect, payFee);

export default router;
