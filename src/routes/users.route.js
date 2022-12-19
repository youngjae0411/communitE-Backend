const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();
const authLoginUserMiddleware = require('../middlewares/auth-loginUser.middleware.js');

router.post('/signup', authLoginUserMiddleware, usersController.signUp);
router.post('/login', authLoginUserMiddleware, usersController.logIn);
//router.get('/signup/:loginId', usersController.findDupId);

module.exports = router;
