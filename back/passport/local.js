const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { noExtendLeft } = require('sequelize/dist/lib/operators')

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                // 파라터 순서대로 (서버에러, 성공, 클라이언트 에러)
                done(null, false, { reason: 'Email that does not exit!' })
            }
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                return done(null, user)
            }
            return done(null, false, { reason: 'Wrong password!' })
        } catch (error) {
            console.error(error)
            done(error)
        }
    }))
}