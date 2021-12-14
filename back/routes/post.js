const express = require('express')
const router = express.Router()

const { Post, Image, Comment, User, Hashtag } = require('../models')
const { isLoggedIn } = require('./middlewares')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

try {
    fs.accessSync('uploads')
} catch (error) {
   fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads')
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname) // 확장자 추출 (.png)
            const basename = path.basename(file.originalname, ext) //
            done(null, basename + '_' + new Date().getTime() + ext)
        },
    }), 
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB
    },
 
})

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        }) 
        const hashtags = req.body.content.match(/#[^\s#]+/g)
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({ 
                where: { name: tag.slice(1).toLowerCase() }
            }))) // result ex) [[today, true], [react, false]]
            await post.addHashtags(result.map((v) => v[0]))
        }
        if (req.body.image) {
            if (Array.isArray(req.body.image)) { // 이미지를 여러개 올리면 image: [image1.png, image2.png]
                const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })))
                await post.addImages(images)
            } else { // 이미지를 하나만 올리면  image: image1.png
                const image = await Image.create({ src: req.body.image })
                await post.addImages(image)
            }
        }
        const fullPost = await Post.findOne({
            where :{
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

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
    try { 
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            }
        })
        res.status(200).json({ PostId: parseInt(req.params.postId, 10) })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => { //upload.single, upload.none, upload.fields(파일 인풋이 두개이상있을 때)
    try {
        console.log("@@@req.files", req.files)
        res.json(req.files.map(v => v.filename))
    } catch (error) {
        console.log(error)
        next(error)
    }
})


router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where: {
                id: req.params.postId
            },
            include: [{
                model: Post,
                as: 'Retweet'
            }], 
        })
        if (!post) {
            return res.status(403).send('This post does not exist.')
        }
        console.log("req.user.id", req.user.id)
        console.log("req.user.id", req.user.id)
        if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
             return res.status(403).send('You cannot retweet your own posts.')
        }
        const retweetTargetId = post.RetweetId || post.id
        const exPost = await Post.findOne({
            where: {
                UserId: req.user.id,
                RetweetId: retweetTargetId
            }
        }) 
        if (exPost) {
            return res.status(403).send('Already Retweet!')
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet'
        })
        const retweetIwthPrevPost = await Post.findOne({
            where: {
                id: retweet.id
            },
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }, {
                    model: Image,
                }]
            }, {
                model: User,
                attributes: ['id', 'nickname'],
            }, {
                model: Image,
            }, {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id', 'nickname']
                }]
            }, {
                model: User,
                as: 'Likers',
                attributes: ['id']
            }]
        })
        res.status(201).json(retweetIwthPrevPost)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

 
module.exports = router