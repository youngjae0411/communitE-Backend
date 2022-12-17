const PostsService = require('../services/posts.service');

class PostsController {
    constructor() {
        this.postsService = new PostsService();
    }

    findAllPosts = async (req, res) => {
        try {
            const posts = await this.postsService.findAllPosts();
            res.status(400).json({ posts });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '게시글 조회에 실패하였습니다.',
            });
        }
    };

    createPost = async (req, res) => {
        try {
            const { title, content } = req.body;
            const userId = 1;
            //const { userId } = res.locals.user;
            //아직 User가 없어서 FR키가 안됩니다 DB에 insert로 user를 만들고 하셔야 됩니다.

            await this.postsService.createPost(title, content, userId);
            return res
                .status(201)
                .json({ success: true, message: '생성 성공' });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                errorMessage: '생성 실패',
            });
        }
    };
}

module.exports = PostsController;
