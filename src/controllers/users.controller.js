const jwt = require('jsonwebtoken');
const UserService = require('../services/users.service');
require('dotenv').config();

class UserController {
    userService = new UserService();

    signUp = async (req, res, next) => {
        try {
            const { loginId, nickname, password } = req.body;
            await this.userService.signUp(loginId, nickname, password);

            res.status(201).json({ message: '회원가입에 성공하였습니다.' });
        } catch (error) {
            console.log(error);
            res.status(error.status).json({
                errorMessage: error.message,
            });
        }
    };
}

module.exports = UserController;
