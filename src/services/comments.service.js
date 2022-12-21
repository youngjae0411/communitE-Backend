const CommentsRepository = require('../repositories/comments.repository');
const PostsRepository = require('../repositories/posts.repository');
const { Comments, Posts } = require('../models/index');

class CommentService {
    constructor() {
        (this.commentsRepository = new CommentsRepository(Comments)),
            (this.postsRepository = new PostsRepository(Posts));
    }

    createComment = async (postId, userId, content) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error('게시글이 존재하지않습니다.');

        const comment = await this.commentsRepository.createComment(
            postId,
            userId,
            content
        );

        return {
            commentId: comment.commentId,
            postId: comment.postId,
            userId: comment.userId,
            content: comment.content,
            createdAt: formatDate(comment.createdAt),
            updatedAt: formatDate(comment.updatedAt),
        };
    };

    findAllComments = async (postId) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error('게시글이 존재하지않습니다.');

        const comments = await this.commentsRepository.findAllComments(postId);

        return comments.map((allComment) => {
            return {
                commentId: allComment.commentId,
                postId: allComment.postId,
                userId: allComment.userId,
                content: allComment.content,
                nickname: allComment.User.nickname,
                createdAt: formatDate(allComment.createdAt),
                updatedAt: formatDate(allComment.updatedAt),
            };
        });
    };

    updateComment = async (commentId, content, userId) => {
        const comment = await this.commentsRepository.findOneComment(commentId);
        if (!comment) throw new Error('존재하지않는 댓글입니다.');
        if (comment.userId !== userId) throw new Error('권한이 없습니다.');
        await this.commentsRepository.updateComment(commentId, content);
    };

    deleteComment = async (commentId, userId) => {
        const comment = await this.commentsRepository.findOneComment(commentId);
        if (!comment) throw new Error('존재하지않는 댓글입니다.');
        if (comment.userId !== userId) throw new Error('권한이 없습니다.');
        await this.commentsRepository.deleteComment(commentId);
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

module.exports = CommentService;
