const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users.controller.js');
const usersController = new UsersController();
const authLoginUserMiddleware = require('../middleWares/auth-loginUser.middleware.js');
const authUserMiddleware = require('../middleWares/auth-User.middleware');
const upload = require('../modules/userImg');

router.post('/signup', authLoginUserMiddleware, usersController.signUp);
router.post('/login', authLoginUserMiddleware, usersController.logIn);
//router.get('/signup/:loginId', usersController.findDupId);
router.get('/:userId', usersController.findOneUser);
router.put(
    '/:userId',
    authUserMiddleware,
    upload.single('image'),
    usersController.updateUser
);

module.exports = router;
