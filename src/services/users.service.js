const UserRepository = require('../repositories/users.repository.js');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//const CHECK_PASSWORD = /^[a-zA-Z0-9]{4,30}$/;
//const CHECK_LOGINID = /^[a-zA-Z0-9]{3,10}$/;
const hash = require('../util/auth-encryption.util.js');
const {
    createToken,
    setCookieExpiration,
} = require('../util/auth-jwtToken.util.js');
const env = process.env;

class UserService {
    userRepository = new UserRepository(User);

    signUp = async (loginId, nickname, password) => {
        const hashValue = hash(password);
        const user = await this.userRepository.createUser(
            loginId,
            nickname,
            hashValue
        );
        return user;
    };

    logIn = async (loginId, password) => {
        const hashValue = hash(password);
        const user = await this.userRepository.findUserByAuth(
            loginId,
            hashValue
        );
        console.log(user);
        if (!user) {
            const err = new Error(`UserService Error`);
            err.status = 412;
            err.message = '아이디 또는 패스워드가 일치하지 않습니다.';
            throw err;
        }

        const accessToken = createToken(user.userId, '1h');
        const refreshToken = createToken('refreshToken', '1d');
        await this.userRepository.updateRefreshToken(refreshToken, loginId);

        const tokens = {
            accessToken,
            accessTokenName: env.ACCESSTOKEN_NAME,
            refreshToken,
            refreshTokenName: env.REFRESHTOKEN_NAME,
            cookieExpiration: setCookieExpiration(24),
        };
        return tokens;
    };

    findOneUser = async (userId) => {
        const user = await this.userRepository.findOneUser(userId);
        if (!user) throw new Error('존재하지않는 사용자입니다.');
        if (user)
            return {
                userId: user.userId,
                image: user.profileImg,
                nickname: user.nickname,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
    };

    updateUser = async (userId, nickname, tokenUserId, image) => {
        const user = await this.userRepository.findOneUser(userId);
        if (!user) throw new Error('존재하지않는 사용자입니다.');
        if (user.userId !== tokenUserId) throw new Error('권한이 없습니다.');
        await this.userRepository.updatePost(userId, nickname, image);
    };

    findDupLoginId = async (text) => {
        const findDupId = await this.userRepository.findUserByLoginIdOrNick(
            text
        );
        if (findDupId && findDupId.loginId === text) {
            const error = new Error('Same LoginId exists');
            error.status = 412;
            error.message = '중복된 아이디입니다.';
            throw error;
        } else if (findDupId && findDupId.nickname === text) {
            const error = new Error('Same Nickname exists');
            error.status = 412;
            error.message = '중복된 닉네임입니다.';
            throw error;
        } else {
            return '사용 가능한 아이디입니다.';
        }
    };
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = UserService;
