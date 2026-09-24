import express from 'express';
import { getExams, getHallTicket } from '../controllers/examController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getExams);
router.get('/hall-ticket', protect, getHallTicket);

export default router;
