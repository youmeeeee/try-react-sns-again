const express = require('express')
const { Post, Hashtag, Image, Comment, User } = require('../models')
const router = express.Router()

router.get('/:hashtag', async (req, res, next) => { //GET /hashtag/react
    try {
        const where = {}
        if (parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
        }
        const posts = await Post.findAll({
            where,
            limit: 10,
            order: [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
            include: [{
                model: Hashtag,
                where: {
                    name: req.params.hashtag
                }
            },
            {
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