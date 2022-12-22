const PostsService = require('../services/posts.service');

class PostsController {
    constructor() {
        this.postsService = new PostsService();
    }

    findAllPosts = async (req, res) => {
        try {
            const posts = await this.postsService.findAllPosts();
            res.status(200).json({ posts });
        } catch (error) {
            res.status(400).json({
                errorMessage: '게시글 조회에 실패하였습니다.',
            });
        }
    };

    findOnePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await this.postsService.findOnePost(postId);
            res.status(200).json({ post });
        } catch (error) {
            if (error.message === '게시글이 존재하지않습니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 게시글입니다.' });
            }
            res.status(400).json({
                errorMessage: '게시물 상세 조회에 실패하였습니다.',
            });
        }
    };

    findUserPosts = async (req, res) => {
        try {
            const { userId } = req.params;

            const posts = await this.postsService.findUserPost(userId);
            res.status(200).json({ posts });
        } catch (error) {
            if (error.message === '존재하지않는 사용자입니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 사용자입니다.' });
            }
            res.status(400).json({
                errorMessage: '게시물 조회에 실패하였습니다.',
            });
        }
    };

    createPost = async (req, res) => {
        try {
            const { title, content } = req.body;
            const { userId } = res.locals;

            let image = undefined;
            if (req.file) {
                image = req.file.location;
            } else {
                image =
                    'https://communite.s3.ap-northeast-2.amazonaws.com/postImg/Noimage.jpg';
            }

            await this.postsService.createPost(title, content, userId, image);
            return res
                .status(201)
                .json({ message: '게시글이 생성되었습니다.' });
        } catch (error) {
            return res.status(400).json({
                errorMessage: '게시글 생성에 실패하였습니다.',
            });
        }
    };

    updatePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const { title, content } = req.body;
            const { userId } = res.locals;
            let image = undefined;

            if (req.file) {
                image = req.file.location;
            } else if (req.body.image === 'null') {
                image =
                    'https://communite.s3.ap-northeast-2.amazonaws.com/postImg/Noimage.jpg';
            }

            await this.postsService.updatePost(
                postId,
                title,
                content,
                userId,
                image
            );
            return res
                .status(201)
                .json({ message: '게시글이 수정되었습니다.' });
        } catch (error) {
            if (error.message === '게시글이 존재하지않습니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 게시글입니다.' });
            }
            if (error.message === '권한이 없습니다.') {
                return res
                    .status(404)
                    .json({ errorMessage: '권한이 없습니다.' });
            }
            res.status(400).json({
                errorMessage: '게시글 수정에 실패하였습니다.',
            });
        }
    };

    deletePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals;

            await this.postsService.deletePost(postId, userId);
            return res.status(200).json({ message: '게시글이 삭제되었습니다' });
        } catch (error) {
            if (error.message === '게시글이 존재하지않습니다.') {
                return res
                    .status(401)
                    .json({ errorMessage: '존재하지않는 게시글입니다.' });
            }
            if (error.message === '권한이 없습니다.') {
                return res
                    .status(401)
                    .json({ errorMessage: '권한이 없습니다.' });
            }
            res.status(400).json({
                errorMessage: '게시글 삭제에 실패하였습니다.',
            });
        }
    };
}

module.exports = PostsController;
