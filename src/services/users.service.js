const UserRepository = require('../repositories/users.repository.js');
const { User } = require('../models');
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
        const isSameId = await this.userRepository.findUserByLoginId(loginId);
        const isSameNickname = await this.userRepository.findUserByNickname(
            nickname
        );

        if (isSameId) {
            const err = new Error('UserService Error');
            err.status = 409;
            err.message = '이미 가입된 아이디가 존재합니다.';
            throw err;
        }
        if (isSameNickname) {
            const err = new Error('UserService Error');
            err.status = 409;
            err.message = '이미 가입된 닉네임이 존재합니다.';
            throw err;
        }
        /* if (!CHECK_LOGINID.test(loginId)) {
            const err = new Error(`UserService Error`);
            err.status = 403;
            err.message = '아이디는 최소 3자리 이상으로 해주세요.';
            throw err;
        }
        if (!CHECK_PASSWORD.test(password)) {
            const err = new Error(`UserService Error`);
            err.status = 403;
            err.message = '비밀번호는 최소 4자리수를 넘겨주세요';
            throw err;
        } */

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
        if (!user) {
            const err = new Error(`UserService Error`);
            err.status = 412;
            err.message = '아이디 또는 패스워드가 일치하지 않습니다.';
            throw err;
        }

        const accessToken = createToken(user.userId, '3m');
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
}

module.exports = UserService;