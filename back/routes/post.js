const express = require('express')
const router = express.Router()

const { Post, Image, Comment, User } = require('../models')
const comment = require('../models/comment')
const { isLoggedIn } = require('./middlewares')

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        })
        const fullPost = await Post.findOne({
            wheire :{
                id: post.id
            },
            include: [{
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User, // 댓글 작성자
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User, // 작성자
                attributes: ['id', 'nickname']
            }, {
                model: User, // Likers
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.status(201).json(fullPost)
    } catch (error) {
        console.log(error)
        next(error)
    }
}) 

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }
        })
        if (!post) {
            return res.status(403).send('This post does not exist.')
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: parseInt(req.params.postId, 10),
            UserId: req.user.id,
        })
        const fullComment = await Comment.findOne({
            where: {
                id: comment.id
            },
            include: [{
                model: User,
                attributes: ['id', 'nickname']
            }]
        })
        res.status(201).json(fullComment)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            }
        })
        if (!post) {
            return res.status(403).send('Post does not exist.')
        }
        await post.addLikers(req.user.id)
        res.json({ postId: post.id, userId: req.user.id })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/:postId/unlike',isLoggedIn, async (req, res, next) => {
    const post = await Post.findOne({
        where: {
            id: req.params.postId
        }
    })
    if (!post) {
        return res.status(403).send('Post does not exist.')
    }
    await post.removeLikers(req.user.id)
    res.json({ postId: post.id, userId: req.user.id })
})

router.delete(':/postId',isLoggedIn,  async (req, res, next) => {
    try { 
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            }
        })
        res.json({ postId: req.params.postId })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router