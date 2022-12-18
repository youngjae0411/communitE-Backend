const { User } = require('../models');
const { Op } = require('sequelize');

class UserRepository {
    findOneUser = async (userId) => {
        return User.findOne({
            where: {
                [Op.or]: [{ userId }],
            },
        });
    };

    updatePost = async (userId, nickname, image) => {
        return await User.update(
            { nickname, profileImg: image },
            { where: { userId } }
        );
    };
}

module.exports = UserRepository;
