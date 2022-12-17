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
    createPost = async (title, content, userId) => {
        return await this.postsRepository.createPost({
            title,
            content,
            userId,
        });
    };
}

module.exports = PostsService;
