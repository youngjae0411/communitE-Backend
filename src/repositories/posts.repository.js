const { User } = require('../models');
const { Op } = require('sequelize');

class PostsRepository {
    constructor(postsModel) {
        this.posts = postsModel;
    }

    findAllPosts = async () => {
        return this.posts.findAll({
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
        return this.posts.findOne({
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

    findUserPost = async (userId) => {
        return this.posts.findAll({
            where: {
                [Op.or]: [{ userId }],
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
        await this.posts.create({
            userId: data.userId,
            title: data.title,
            content: data.content,
            postImg: data.image,
        });
    };

    updatePost = async (postId, title, content, image) => {
        await this.posts.update(
            { title, content, postImg: image },
            { where: { postId } }
        );
    };

    deletePost = async (postId) => {
        await this.posts.destroy({
            where: { postId },
        });
    };
}

module.exports = PostsRepository;
