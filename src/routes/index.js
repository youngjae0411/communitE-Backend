const express = require('express');
const router = express.Router();

router.use('/api/posts', require('./posts.route'));
router.use('/api/post', require('./comments'));

module.exports = router;
