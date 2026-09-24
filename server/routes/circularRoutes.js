import express from 'express';
import { getCirculars, createCircular } from '../controllers/circularController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCirculars);
router.post('/', protect, createCircular);

export default router;
