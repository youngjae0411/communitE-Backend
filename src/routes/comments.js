const express = require('express');
const router = express.Router();

const { Posts } = require('../models');
const { Comments } = require('../models');
const { Op } = require('sequelize');
const { User } = require('../models');

//댓글 작성 하기
router.post('/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { user } = res.locals;
        const posting = await Posts.findByPk(postId);
        console.log(posting);
        if (posting === null) {
            return res
                .status(404)
                .json({ errorMessage: '존재하지않는 게시글입니다' });
        }

        await Comments.create({
            userId: 1,
            postId: postId,
            content: req.body.content,
        });

        return res.status(201).json({ message: '댓글이 생성하였습니다.' });
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ errorMessage: '댓글 생성에 실패하였습니다.' });
    }
});

//댓글 불러오기
router.get('/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const posting = await Posts.findByPk(postId);
        if (posting === null) {
            return res
                .status(404)
                .json({ errorMessage: '존재하지않는 게시글입니다' });
        }
        const comment = await Comments.findAll({
            where: {
                [Op.or]: [{ postId }],
            },
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
            ],
        });
        const comments = comment.map((comment) => {
            console.log(comment.User.nickname);
            return {
                commentId: comment.commentId,
                postId: comment.postId,
                userId: comment.userId,
                content: comment.content,
                nickname: comment.User.nickname,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            };
        });

        return res.status(201).json({ comments });
    } catch (error) {
        res.status(400).json({ errorMessage: '댓글 조회에 실패하였습니다.' });
    }
});

//댓글 수정
// router.put('/comments/:commentId', async (req, res) => {
//     try {
//         const { commentId } = req.params;

//         const { content } = req.body;

//         const commenting = await comment.findOne({ _id: commentId });

//         if (commenting === null) {
//             return res
//                 .status(404)
//                 .json({ message: '댓글 조회에 실패하였습니다.' });
//         }
//         if (content.length === 0) {
//             return res
//                 .status(400)
//                 .json({ message: '댓글을 내용을 입력해주세요.' });
//         }

//         await comment.updateOne(
//             { _id: _commentId },
//             { $set: { password, content } }
//         );
//         return res.status(200).json({ message: '댓글을 수정하였습니다.' });
//     } catch (error) {
//         return res
//             .status(400)
//             .json({ message: '데이터 형식이 올바르지 않습니다.' });
//     }
// });
// // router.put('/comments/:commentId', async (req, res) => {
// //     try {
// //         const { commentId } = req.params;

// //         const { content } = req.body;
// //         const posting = await Posts.findByPk(postId);

// //         if (posting === null) {
// //             return res
// //                 .status(404)
// //                 .json({ errorMessage: '존재하지않는 댓글입니다.' });
// //         }
// //         if (posting === '') {
// //             return res
// //                 .status(400)
// //                 .json({ errorMessage: '댓글을 내용을 입력해주세요.' });
// //         }

// //         const updatecomment = await Comment.update(
// //             { content },
// //             { where: { commentId } }
// //         );

// //         return res.status(201).json({ message: '댓글이 수정되었습니다.' });
// //     } catch (error) {
// //         return res
// //             .status(400)
// //             .json({ errorMessage: '댓글 수정에 실패하였습니다.' });
// //     }
// // });
// //댓글 삭제
// router.delete('/comments/:commentId', async (req, res) => {
//     try {
//         const { commentId } = req.params;
//         const comment = await Comment.findByPk(commentId);

//         if (comment === null) {
//             return res
//                 .status(404)
//                 .json({ errorMessage: '존재하지않는 댓글입니다.' });
//         }

//         await Comment.destroy({ where: { commentId } });

//         return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
//     } catch (error) {
//         return res
//             .status(400)
//             .json({ errorMessage: '댓글 삭제에 실패하였습니다.' });
//     }
// });

module.exports = router;
