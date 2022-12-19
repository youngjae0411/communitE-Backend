const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

function createToken(id, duration) {
    return jwt.sign({ userId: id }, env.TOKEN_SECRET_KEY, {
        expiresIn: duration,
    });
}
const setCookieExpiration = function (hours) {
    const expires = new Date();
    expires.setHours(expires.getHours() + hours);
    return expires;
};

module.exports = { createToken, setCookieExpiration };
