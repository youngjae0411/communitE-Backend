const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();
const authLoginUserMiddleware = require('../middlewares/auth-loginUser.middleware.js');
const authUserMiddleware = require('../middlewares/auth-User.middleware');
const upload = require('../modules/userImg');

router.post('/signup', authLoginUserMiddleware, usersController.signUp);
router.get('/:userId', usersController.findOneUser);
router.get('/signup/:text', usersController.findDupId);
router.post('/login', authLoginUserMiddleware, usersController.logIn);
router.put(
    '/:userId',
    authUserMiddleware,
    upload.single('image'),
    usersController.updateUser
);
module.exports = router;
