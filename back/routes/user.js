const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { User } = require('../models')
const { noExtendLeft } = require('sequelize/dist/lib/operators')

router.post('/', async (req, res, next) => { // Post /user
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

module.exports = router