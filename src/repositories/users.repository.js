const { Op } = require('sequelize');

class UserRepository {
    #userModel;
    constructor(UserModel) {
        this.#userModel = UserModel;
    }

    findUserByLoginId = async (loginId) => {
        const findUser = await this.#userModel.findOne({
            where: { loginId },
            attributes: { exclude: ['password'] },
        });
        return findUser;
    };
    findUserByNickname = async (nickname) => {
        const findUser = await this.#userModel.findOne({
            where: { nickname },
            attributes: { exclude: ['password'] },
        });
        return findUser;
    };
    findUserByAuth = async (loginId, password) => {
        const findUser = await this.#userModel.findOne({
            where: { [Op.and]: [{ loginId }, { password }] },
            attributes: { exclude: ['password'] },
        });
        return findUser;
    };

    createUser = async (loginId, nickname, password) => {
        const createUser = await this.#userModel.create({
            loginId,
            nickname,
            password,
        });
        return createUser;
    };

    updateRefreshToken = async (token, loginId) => {
        await this.#userModel.update(
            { token },
            { where: { loginId: loginId } }
        );
    };
}

module.exports = UserRepository;
