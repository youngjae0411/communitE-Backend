const express = require('express');
const router = express.Router();
const upload = require('../modules/userImg');

const PostsController = require('../controllers/user.controller');
const postsController = new PostsController();

router.get('/:userId', postsController.findOneUser);
router.put('/:userId', upload.single('image'), postsController.updateUser);

module.exports = router;
