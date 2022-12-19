const CommentService = require('../services/comments.service');

class CommentController {
    commentService = new CommentService();

    createComment = async (req, res, next) => {
        const { content } = req.body;
        const { postId } = req.params;
        const { user } = res.locals;
        const userId = 1;

        const comment = await this.commentService.createComment(
            postId,
            userId,
            content
        );
        res.status(201).json({ message: '댓글이 생성하였습니다.' });
    };
}
module.exports = CommentController;
