import express from 'express';
import { getCRTModules } from '../controllers/crtController.js';

const router = express.Router();

router.get('/', getCRTModules);

export default router;
