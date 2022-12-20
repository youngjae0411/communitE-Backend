const { Op } = require('sequelize');
const { User } = require('../models');

class CommentRepository {
    constructor(commentsModel) {
        this.comments = commentsModel;
    }
    createComment = async (postId, userId, content) => {
        return this.comments.create({
            postId,
            userId,
            content,
        });
    };

    findAllComments = async (postId) => {
        return this.comments.findAll({
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

    findOneComment = async (commentId) => {
        return this.comments.findOne({
            where: {
                [Op.or]: [{ commentId }],
            },
        });
    };

    updateComment = async (commentId, content) => {
        await this.comments.update(
            {
                content,
            },
            { where: { commentId } }
        );
    };

    deleteComment = async (commentId) => {
        await this.comments.destroy({
            where: {
                commentId,
            },
        });
    };
}
module.exports = CommentRepository;
