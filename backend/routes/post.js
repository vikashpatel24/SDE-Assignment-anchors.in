const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/create', authMiddleware, postController.createPost);
router.post('/create', postController.createPost);
router.get('/getAllPosts', postController.getAllPosts);
router.get('/:postId', postController.getPostById);
router.get('/commented-posts/:userId', postController.getCommentedPost);
router.get('/replied-posts/:userId', postController.getRepliedPosts);
// router.post('/:postId/comments', authMiddleware, postController.addComment);
router.post('/:postId/comments', postController.postComment);
// router.post('/:postId/comments/:commentId/replies', authMiddleware, postController.addReply);
router.post('/:postId/comments/:commentId/replies', postController.postReply);

module.exports = router;
