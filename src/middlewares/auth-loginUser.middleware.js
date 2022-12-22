const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const env = process.env;

const validateToken = function (tokenValue) {
    try {
        jwt.verify(tokenValue, env.TOKEN_SECRETE_KEY);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = async (req, res, next) => {
    const accessToken = req.headers.access;
    const [accessTokenType, accessTokenValue] = (accessToken || '').split(' ');

    try {
        if (accessToken && validateToken(accessToken)) {
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
        } else {
            res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
        }
    }
};
