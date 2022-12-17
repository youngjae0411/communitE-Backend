const { Posts, User } = require('../models');
const { Op } = require('sequelize');

class PostsRepository {
    findAllPosts = async () => {
        return Posts.findAll({
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
            ],
            order: [['updatedAt', 'desc']],
        });
    };

    createPost = async (data) => {
        console.log(data);
        await Posts.create({
            userId: data.userId,
            title: data.title,
            content: data.content,
            image: null,
        });
    };
}

module.exports = PostsRepository;
