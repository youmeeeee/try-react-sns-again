const { application } = require('express')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    res.json('add complete')
})

router.delete('/', (req, res) => {
    res.send('delete complete');
})

module.exports = router