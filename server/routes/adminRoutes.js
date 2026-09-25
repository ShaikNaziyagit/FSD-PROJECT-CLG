import express from 'express';
import {
  getPlatformStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  createInstitutionalUser,
  broadcastEmergencyAlert,
  getSystemHealth,
  getAuditLogs,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('super_admin'));

router.get('/stats', getPlatformStats);
router.get('/users', getAllUsers);
router.post('/users/create', createInstitutionalUser);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

router.post('/broadcast', broadcastEmergencyAlert);
router.get('/system-health', getSystemHealth);
router.get('/audit-logs', getAuditLogs);

export default router;
