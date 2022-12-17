const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.findAllPosts);

router.get('/:postId', postsController.findOnePost);

router.post('/', upload.single('image'), postsController.createPost);

router.put('/:postId', postsController.updatePost);
module.exports = router;
