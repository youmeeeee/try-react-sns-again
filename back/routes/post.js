const express = require('express')
const router = express.Router()

const { isLoggedIn, isLoggedNotIn } = require('./middlewares')

router.post('/', isLoggedIn, async (req, res, next) => {
})

router.delete('/', (req, res) => {
    res.send('delete complete');
})

module.exports = router