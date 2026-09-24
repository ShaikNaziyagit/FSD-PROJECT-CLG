import express from 'express';
import {
  getPosts,
  createPost,
  toggleLikePost,
  addComment,
  deletePost,
} from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, toggleLikePost);
router.post('/:id/comment', protect, addComment);
router.delete('/:id', protect, deletePost);

export default router;
