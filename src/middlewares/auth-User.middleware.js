const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { createToken } = require('../util/auth-jwtToken.util');
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
    const refreshToken = req.headers.refresh;

    if (!accessToken || !refreshToken) {
        res.status(401).json({
            errorMessage: '로그인이 필요한 기능입니다.',
        });
        return;
    }

    const [accessTokenType, accessTokenValue] = (accessToken || '').split(' ');
    const [refreshTokenType, refreshTokenValue] = (refreshToken || '').split(
        ' '
    );

    try {
        if (!validateToken(accessTokenValue)) {
            console.log('일단 엑세스 토큰 만료!');
            if (!validateToken(refreshTokenValue)) {
                console.log('리프레쉬토큰도 만료!');
                const error = new Error('RefreshToken Expired');
                error.status = 419;
                error.message = 'Token이 만료되었습니다. 다시 로그인해주세요.';
                throw error;
            }
            const user = await User.findOne({
                where: { token: refreshTokenValue },
            });
            if (!user) {
                const error = new Error('No Refresh Token');
                error.status = 404;
                error.message = '존재하지 않는 사용자입니다.';
                throw error;
            }
            const newAccessToken = createToken(user.dataValues.userId, '1h');
            console.log(`새로발급받은 액세스: ${newAccessToken}`);
            res.header({ accessToken: `Bearer ${newAccessToken}` });

            res.locals.userId = user.dataValues.userId;
            return next();
        }
        const { userId } = jwt.verify(accessTokenValue, env.TOKEN_SECRETE_KEY);
        res.locals.userId = userId;
        next();
    } catch (error) {
        if (error.message === 'Token이 만료되었습니다. 다시 로그인해주세요.') {
            res.status(error.status).json({ errorMessage: error.message });
        } else {
            console.log(error);
            res.status(400).json({
                errorMessage: '로그인이 필요한 기능입니다.',
            });
        }
    }
};
