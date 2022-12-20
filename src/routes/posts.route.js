const express = require('express');
const router = express.Router();
const upload = require('../modules/postImg');
const authUserMiddleware = require('../middlewares/auth-User.middleware.js');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.findAllPosts);

router.get('/:postId', postsController.findOnePost);

router.get('/user/:userId', postsController.findUserPosts);

router.post(
    '/',
    upload.single('image'),
    authUserMiddleware,
    postsController.createPost
);

router.put(
    '/:postId',
    upload.single('image'),
    authUserMiddleware,
    postsController.updatePost
);

router.delete('/:postId', postsController.deletePost);
module.exports = router;
