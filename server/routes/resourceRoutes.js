import express from 'express';
import {
  getResources,
  getResourceById,
  createResource,
} from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getResources);
router.get('/:id', getResourceById);
router.post('/', protect, authorizeRoles('super_admin', 'faculty'), createResource);

export default router;
