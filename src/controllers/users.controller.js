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

    logIn = async (req, res, next) => {
        try {
            const { loginId, password } = req.body;

            const tokens = await this.userService.logIn(loginId, password);

            res.cookie(tokens.accessTokenName, `Bearer ${tokens.accessToken}`, {
                expires: tokens.cookieExpiration,
            });
            res.cookie(
                tokens.refreshTokenName,
                `Bearer ${tokens.refreshToken}`,
                {
                    expires: tokens.cookieExpiration,
                }
            );
            res.status(200).json({
                accessToken: `Bearer[${tokens.accessToken}]`,
                refreshToken: `Bearer[${tokens.refreshToken}]`,
            });
        } catch (error) {
            console.log(error);
            res.status(error.status).json({
                errorMessage: error.message,
            });
        }
    };
}

module.exports = UserController;
