const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.findAllPosts);

router.get('/:postId', postsController.findOnePost);

router.post('/', postsController.createPost);

router.put('/:postId', postsController.updatePost);
module.exports = router;
