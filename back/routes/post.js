const express = require('express')
const router = express.Router()

const { Post, Image, Comment, User } = require('../models')
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
            }, {
                model: User
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
        const commnet = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id,
        })
        res.status(201).json(commnet)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/', (req, res) => {
    res.send('delete complete');
})

module.exports = router