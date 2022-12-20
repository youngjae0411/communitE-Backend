const jwt = require('jsonwebtoken');
const UserService = require('../services/users.service');
require('dotenv').config();
const env = process.env;

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
            const { userId } = jwt.verify(
                tokens.accessToken,
                env.TOKEN_SECRET_KEY
            );

            console.log(tokens.accessToken);
            console.log(tokens.refreshToken);

            res.header({
                accessToken: `Bearer ${tokens.accessToken}`,
                refreshToken: `Bearer ${tokens.refreshToken}`,
            });
            res.status(200).json({
                userId: userId,
            });
        } catch (error) {
            console.log(error);
            res.status(error.status).json({
                errorMessage: error.message,
            });
        }
    };
    findOneUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await this.userService.findOneUser(userId);
            res.status(200).json({ user });
        } catch (error) {
            if (error.message === '존재하지않는 사용자입니다.') {
                return res.status(404).json({
                    errorMessage: '존재하지않는 사용자입니다.',
                });
            }
            console.log(error);
            res.status(400).json({
                errorMessage: '사용자정보 불러오기에 실패하였습니다.',
            });
        }
    };

    updateUser = async (req, res) => {
        try {
            const { userId } = req.params;

            const tokenUserId = res.locals.user.userId;
            console.log(tokenUserId);
            const { nickname } = req.body;
            let image = undefined;

            if (req.file) {
                image = req.file.location;
            } else if (req.body.image === 'null') {
                image = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            }

            await this.userService.updateUser(
                userId,
                nickname,
                tokenUserId,
                image
            );
            return res
                .status(201)
                .json({ message: '사용자 정보가 수정되었습니다.' });
        } catch (error) {
            console.log(error);
            if (error.message === '존재하지않는 사용자입니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 사용자입니다.' });
            }
            if (error.message === '권한이 없습니다.') {
                return res
                    .status(401)
                    .json({ errorMessage: '권한이 없습니다.' });
            }
            res.status(400).json({
                errorMessage: '사용자 정보 수정에 실패하였습니다.',
            });
        }
    };
}

module.exports = UserController;
