const { User } = require('../models');
const jwt = require('jsonwebtoken');
const env = process.env;
module.exports = async (req, res, next) => {
    const accessToken = req.headers.access;
    const [accessTokenType, accessTokenValue] = (accessToken || '').split(' ');

    try {
        if (
            accessToken &&
            jwt.verify(accessTokenValue, env.TOKEN_SECRETE_KEY)
        ) {
            const error = new Error('Already Logined');
            error.status = 401;
            error.message = '이미 로그인 되어있습니다.';
            throw error;
        }
        next();
    } catch (error) {
        if (error.message === '이미 로그인 되어있습니다.') {
            return res
                .status(error.status)
                .json({ errorMessage: error.message });
        }
        if (error.message === 'invalid token') {
            console.log('invalid token');
            res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
        }
    }
};
