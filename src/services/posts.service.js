const PostsRepository = require('../repositories/posts.repository');
const UserRepository = require('../repositories/users.repository');
const { User, Posts } = require('../../models/index.js');

class PostsService {
    constructor() {
        this.postsRepository = new PostsRepository(Posts);
        this.userRepository = new UserRepository(User);
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
        if (!post) throw new Error('게시글이 존재하지않습니다.');

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

    findUserPost = async (userId) => {
        const user = await this.userRepository.findOneUser(userId);
        if (!user) throw new Error('존재하지않는 사용자입니다.');

        const userPost = await this.postsRepository.findUserPost(userId);

        return userPost.map((userPost) => {
            return {
                postId: userPost.postId,
                userId: userPost.userId,
                title: userPost.title,
                image: userPost.postImg,
                nickname: userPost.User.nickname,
                createdAt: formatDate(userPost.createdAt),
                updatedAt: formatDate(userPost.updatedAt),
            };
        });
    };

    createPost = async (title, content, userId, image) => {
        return await this.postsRepository.createPost({
            title,
            content,
            userId,
            image,
        });
    };

    updatePost = async (postId, title, content, userId, image) => {
        const post = await this.postsRepository.findOnePost(postId);
        if (!post) throw new Error('게시글이 존재하지않습니다.');
        if (post.userId !== userId) throw new Error('권한이 없습니다.');

        await this.postsRepository.updatePost(postId, title, content, image);
    };

    deletePost = async (postId, userId) => {
        const post = await this.postsRepository.findOnePost(postId);

        if (!post) throw new Error('게시글이 존재하지않습니다.');
        if (post.userId !== userId) throw new Error('권한이 없습니다.');

        await this.postsRepository.deletePost(postId);
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
