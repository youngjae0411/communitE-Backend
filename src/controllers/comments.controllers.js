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

    getComment = async (req, res, next) => {
        try {
            const { postId } = req.params;
            if (!postId) throw '요청한 데이터 형식이 올바르지 않습니다.';
            const result = await this.CommentService.getComment({
                postId,
            });
            res.status(200).json({ result: result });
        } catch (error) {
            next(error);
        }
    };
    editComment = async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;
            const userId = 1;

            if (!commentId || !userId || !comment) {
                throw '요청한 데이터 형식이 올바르지 않습니다.';
            }
            await this.commentService.editComment({
                commentId,
                userId,
                comment,
            });

            res.json({ result: '댓글이수정되었습니다.' });
        } catch (error) {
            next(error);
        }
    };
    deleteComment = async (req,res,next) => {
        try {
            const {commentId} = req.params;
            const userId = 1;
            if(!userId)throw '요청한 데이터 형식이 올바르지 않습니다.'
        }
    }
}

module.exports = CommentController;
