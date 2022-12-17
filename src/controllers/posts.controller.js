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
            console.log(error);
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
            console.log(error);
            res.status(400).json({
                errorMessage: '게시물 상세 조회에 실패하였습니다.',
            });
        }
    };

    createPost = async (req, res) => {
        try {
            const { title, content } = req.body;
            const image = req.file.location;
            const userId = 1;
            //const { userId } = res.locals.user;
            //아직 User가 없어서 FR키가 안됩니다 DB에 insert로 user를 만들고 하셔야 됩니다.

            await this.postsService.createPost(title, content, userId, image);
            return res
                .status(201)
                .json({ message: '게시글이 생성되었습니다.' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                errorMessage: '게시글 생성에 실패하였습니다.',
            });
        }
    };

    updatePost = async (req, res) => {
        try {
            const { postId } = req.params;
            const { title, content } = req.body;
            await this.postsService.updatePost(postId, title, content);
            return res
                .status(201)
                .json({ message: '게시글이 수정되었습니다.' });
        } catch (error) {
            if ((error.message = '게시글이 존재하지않습니다.')) {
                return res
                    .status(404)
                    .json({ errorMessage: '존재하지않는 게시글입니다.' });
            }
            res.status(400).json({
                errorMessage: '게시글 수정에 실패하였습니다.',
            });
        }
    };
}

module.exports = PostsController;
