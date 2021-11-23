const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const db = require('./models')
const app = express()
db.sequelize.sync()
    .then(() => {
        console.log('db connect success!')
    })
    .catch((error) => {
        console.error('db connect error!', error)
    })

app.use(cors({
    origin: '*',
    // credentials: false,
}))

// ***위치 주의*** front에서 보낸 data를 req.body에 넣어주는 역할
app.use(express.json()) // json 형식의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({ extended: true})) // form submit을 했을 때  URLencoded 방식으로 req.body에 넣어줌

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

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(3065, () => {
    console.log('3065 server working')
})
