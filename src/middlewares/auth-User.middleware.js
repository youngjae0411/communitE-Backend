const { User } = require('../models');
const jwt = require('jsonwebtoken');
const env = process.env;
module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');
    console.log(authToken);
    if (!authToken || authType !== 'Bearer') {
        res.status(401).json({
            errorMessage: '로그인이 필요한 기능입니다.',
        });
        return;
    }
    try {
        const { userId } = jwt.verify(authToken, env.TOKEN_SECRET_KEY);
        User.findByPk(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: '로그인이 필요한 기능입니다.' });
    }
};
