const express = require('express');
const router = express.Router();

router.use('/api/posts', require('./posts.route'));

module.exports = router;
