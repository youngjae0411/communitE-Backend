const Comments = require('../models/comments');

class CommentRepository {
    constructor(Comments) {
        this.Comments = Comments;
    }

    createComment = async (postId, userId, content) => {
        const comment = await this.Comments.create({
            postId,
            userId,
            content,
        });
        return comment;
    };
}
module.exports = CommentRepository;
