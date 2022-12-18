const UserRepository = require('../repositories/user.repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

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

    updateUser = async (userId, nickname, image) => {
        const user = await this.userRepository.findOneUser(userId);
        if (!user) throw new Error('존재하지않는 사용자입니다.');

        await this.userRepository.updatePost(userId, nickname, image);
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
