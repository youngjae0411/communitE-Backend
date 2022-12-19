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

    findOnePost = async (postId) => {
        return Posts.findOne({
            where: {
                [Op.or]: [{ postId }],
            },
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
            ],
        });
    };

    createPost = async (data) => {
        console.log(data);
        await Posts.create({
            userId: data.userId,
            title: data.title,
            content: data.content,
            postImg: data.image,
        });
    };

    updatePost = async (postId, title, content, image) => {
        console.log(image);
        await Posts.update(
            { title, content, postImg: image },
            { where: { postId } }
        );
    };
}

module.exports = PostsRepository;
