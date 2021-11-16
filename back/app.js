const express = require('express')
const app = express()
const postRouter = require('./routes/post')


app.get('/', (req, res) => {
    res.send('hello exporess');
})
app.get('/api', (req, res) => {
    res.send('hello api');
})

app.get('/posts', (req, res) => {
    res.json([
         {id: 1, content: 'hello 1' },
         {id: 2, content: 'hello 2' },
         {id: 3, content: 'hello 3' },
    ])
})

app.use('/post', postRouter)

app.listen(3065, () => {
    console.log('3065 server working')
})
