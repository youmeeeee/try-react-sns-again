const express = require('express')
const { Post, User, Image, Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')
const multer = require('multer')
const path = require('path')
const { isColString } = require('sequelize/dist/lib/utils')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            // where: {  
            //     id: lastId
            // },
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include: [{
                model: User, 
                attributes: ['id', 'nickname']
            }, {
                model: Image
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User, // Likers
                as: 'Likers',
                attributes: ['id']
            }, {
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image,
                }]
            }]
        })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router