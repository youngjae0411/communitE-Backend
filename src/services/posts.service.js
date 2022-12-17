const PostsRepository = require('../repositories/posts.repository');

class PostsService {
    constructor() {
        this.postsRepository = new PostsRepository();
    }

    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();

        return posts.map((allPosts) => {
            console.log(allPosts);
            return {
                postId: allPosts.postId,
                userId: allPosts.userId,
                title: allPosts.title,
                image: null,
                nickname: allPosts.User.nickname,
                createdAt: allPosts.createdAt,
                updatedAt: allPosts.updatedAt,
            };
        });
    };

    findOnePost = async (postId) => {
        const post = await this.postsRepository.findOnePost(postId);

        return {
            postId: post.postId,
            userId: post.userId,
            title: post.title,
            image: post.postImg,
            content: post.content,
            nickname: post.User.nickname,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    };

    createPost = async (title, content, userId) => {
        return await this.postsRepository.createPost({
            title,
            content,
            userId,
        });
    };

    updatePost = async (postId, title, content) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error('게시글이 존재하지않습니다.');

        await this.postsRepository.updatePost(postId, title, content);
    };
}

module.exports = PostsService;
