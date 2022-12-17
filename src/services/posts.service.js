const PostsRepository = require('../repositories/posts.repository');

class PostsService {
    constructor() {
        this.postsRepository = new PostsRepository();
    }

    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();

        return posts.map((allPosts) => {
            return {
                postId: allPosts.postId,
                userId: allPosts.userId,
                title: allPosts.title,
                image: allPosts.postImg,
                nickname: allPosts.User.nickname,
                createdAt: formatDate(allPosts.createdAt),
                updatedAt: formatDate(allPosts.updatedAt),
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
            createdAt: formatDate(post.createdAt),
            updatedAt: formatDate(post.updatedAt),
        };
    };

    createPost = async (title, content, userId, image) => {
        if (!image) {
            image =
                'https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg';
        }
        return await this.postsRepository.createPost({
            title,
            content,
            userId,
            image,
        });
    };

    updatePost = async (postId, title, content) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error('게시글이 존재하지않습니다.');

        await this.postsRepository.updatePost(postId, title, content);
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

module.exports = PostsService;
