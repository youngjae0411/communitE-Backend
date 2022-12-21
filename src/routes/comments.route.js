const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controllers');
const commentsController = new CommentsController();
const authUserMiddleware = require('../middlewares/auth-User.middleware');

router.get('/:postId/comments', commentsController.findAllComments);

router.post(
    '/:postId/comments',
    authUserMiddleware,
    commentsController.createComment
);

router.put(
    '/comments/:commentId',
    authUserMiddleware,
    commentsController.updateComment
);

router.delete(
    '/comments/:commentId',
    authUserMiddleware,
    commentsController.deleteComment
);

module.exports = router;
