const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const router = express.Router()
const { User, Post } = require('../models')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

router.get('/:id', async (req, res, next) => {
    try {
            const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ['password']
                  },
                include: [{
                    model: Post, 
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            if (fullUserWithoutPassword) {
                const data = fullUserWithoutPassword.toJSON();
                data.Posts = data.Posts.length
                data.Followings = data.Followings.length
                data.Followers = data.Followers.length
                res.status(200).json(data)
            } else {
                res.status(404).join('not exist')
            }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    console.log('@@@req.headers', req.headers)
    try {
        if (req.user) {
            const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: req.user.id
                },
                attributes: {
                    exclude: ['password']
                  },
                include: [{
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            res.status(200).json(fullUserWithoutPassword)
        } else {
            res.status(200).json(null)
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// middleware 확장하는 법 참고
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            console.error(error)
            return next(error)
        }
        if (info) {
            return res.status(401).send(info.reason) 
        }
        return req.login(user, async (loginError) => {
            if (loginError) {
                console.error(loginError)
                return next(loginError)
            }
            const fullUserWithoutPassword = await User.findOne({
                where: {
                    id: user.id
                },
                attributes: {
                    exclude: ['password']
                  },
                include: [{
                    model: Post
                }, {
                    model: User,
                    as: 'Followings'
                }, {
                    model: User,
                    as: 'Followers'
                }]
            })
            return res.status(200).json(fullUserWithoutPassword)
        })
    })(req, res, next)
})

router.post('/', isNotLoggedIn, async (req, res, next) => { // Post /user
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (exUser) {
            return res.status(403).send('This email is aleady in use!')
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10) // (암호화할 때) 보통 10~13을 넣어준다.
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        })
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060') // 예제
        res.status(201).send('Sign up completed!')
    } catch (error) {
        console.error(error)
        next(error) // status 500
    }
})

router.post('/logout', isLoggedIn, (req, res, next) => {
    req.logout()
    req.session.destroy()
    res.send('logout ok!')
})

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
    try {
        User.update({
            nickname: req.body.nickname,
        }, {
            where: {
                id: req.user.id,
            }
        })
        res.status(200).json({ nickname: req.body.nickname })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        })
        if (!user) {
            res.status(403).send('The user does not exist.')
        }
        await user.addFollowers(req.user.id)
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/:userId/unfollow', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId
            }
        })
        if (!user) {
            res.status(403).send('The user does not exist.')
        }
        await user.removeFollowers()
        res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/followings', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            }
        })
        if (!user) {
            res.status(403).send('The user does not exist.')
        }
        const following = await user.getFollowings()
        res.status(200).json(following)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.get('/followers', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id,
            }
        })
        if (!user) {
            res.status(403).send('The user does not exist.')
        }
        const followers = await user.getFollowers()
        res.status(200).json(followers)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId, 
            }
        })
        if (!user) {
            res.status(403).send('The user does not exist.')
        }
        await user.removeFollowings(req.user.id)
        res.status(200).json({ UserId: parseInt(req.params.userId, 10)})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router
