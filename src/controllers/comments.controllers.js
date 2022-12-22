const CommentsService = require('../services/comments.service');

class CommentsController {
    constructor() {
        this.commentsService = new CommentsService();
    }

    createComment = async (req, res) => {
        try {
            const { content } = req.body;
            const postId = Number(req.params.postId);
            const { userId } = res.locals;

            const comment = await this.commentsService.createComment(
                postId,
                userId,
                content
            );
            res.status(201).json({ comment });
        } catch (error) {
            console.log(error);
            if (error.message === '게시글이 존재하지않습니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 게시글입니다.' });
            }
            res.status(400).json({
                errorMessage: '댓글 생성에 실패하였습니다.',
            });
        }
    };

    findAllComments = async (req, res) => {
        try {
            const { postId } = req.params;

            const comments = await this.commentsService.findAllComments(postId);

            res.status(200).json({ comments });
        } catch (error) {
            if (error.message === '게시글이 존재하지않습니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 게시글입니다.' });
            }
            res.status(400).json({
                errorMessage: '댓글 조회에 실패하였습니다.',
            });
        }
    };
    updateComment = async (req, res) => {
        try {
            const { commentId } = req.params;
            const { content } = req.body;
            const { userId } = res.locals;

            await this.commentsService.updateComment(
                commentId,
                content,
                userId
            );
            res.status(200).json({ message: '댓글이 수정되었습니다.' });
        } catch (error) {
            if (error.message === '존재하지않는 댓글입니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 댓글입니다.' });
            }
            if (error.message === '권한이 없습니다.') {
                return res
                    .status(401)
                    .json({ errorMessage: '권한이 없습니다.' });
            }

            res.status(400).json({
                errorMessage: '댓글 수정에 실패하였습니다.',
            });
        }
    };
    deleteComment = async (req, res) => {
        try {
            const { commentId } = req.params;
            const { userId } = res.locals;

            await this.commentsService.deleteComment(commentId, userId);

            res.status(200).json({ message: '댓글이 삭제되었습니다.' });
        } catch (error) {
            if (error.message === '존재하지않는 댓글입니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 댓글입니다.' });
            }
            if (error.message === '권한이 없습니다.') {
                return res
                    .status(401)
                    .json({ errorMessage: '권한이 없습니다.' });
            }

            res.status(400).json({
                errorMessage: '댓글 수정에 실패하였습니다.',
            });
        }
    };
}
module.exports = CommentsController;
