const express = require('express');
const router = express.Router();

router.use('/api/posts', require('./posts.route'));
router.use('/api/user', require('./users.route'));
router.use('/api/posts', require('./comments.route'));

module.exports = router;
