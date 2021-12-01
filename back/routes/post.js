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
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname']
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

router.delete('/', (req, res) => {
    res.send('delete complete');
})

module.exports = router