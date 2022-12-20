const { User } = require('../models');
const jwt = require('jsonwebtoken');
const env = process.env;
module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const [authType, authToken] = (authorization || '').split(' ');
    console.log(authToken);
    try {
        if (authToken && authType === 'Bearer') {
            const { userId } = jwt.verify(authToken, env.TOKEN_SECRET_KEY);
            User.findByPk(userId).then((user) => {
                if (user) {
                    if (user.token === '') {
                        return next();
                    }
                    res.status(401).send({
                        errorMessage: '이미 로그인이 되어있습니다.',
                    });
                }
            });
            return;
        }
        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            console.log('gg');
            next();
        } else {
            console.log(error);
            res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
        }
    }
};
