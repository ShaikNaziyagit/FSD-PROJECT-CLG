import express from 'express';
import {
  getSubjects,
  getAssignments,
  submitAssignment,
  getTimetable,
} from '../controllers/academicController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/subjects', protect, getSubjects);
router.get('/assignments', protect, getAssignments);
router.post('/assignments/:id/submit', protect, submitAssignment);
router.get('/timetable', protect, getTimetable);

export default router;
