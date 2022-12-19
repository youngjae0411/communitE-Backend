const Comments = require('../models/comments');
const CommentRepository = require('../repositories/comments.repository');

class CommentService {
    commentRepository = new CommentRepository(Comments);

    createComment = async (postId, userId, content) => {
        const comment = await this.commentRepository.createComment(
            postId,
            userId,
            content
        );
        if (!comment) {
            throw ('댓글 생성에 실패 했습니다.', 400);
        }
        return comment;
    };
    // getComment = async ({ postId }) => {
    //     const comment = await this.commentRepository.getComment({
    //         postId,
    //     });
    //     if (!comment) {
    //         throw ('댓글 조회에 실패 하렸습니다.', 400);
    //     }
    //     return comment;
    // };
}

module.exports = CommentService;
