const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const db = require('./models')
const passportConfig = require('./passport')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const path = require('path')

const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')

const app = express()

passportConfig()
dotenv.config()

db.sequelize.sync()
    .then(() => {
        console.log('db connect success!')
    })
    .catch((error) => {
        console.error('db connect error!', error)
    })

app.use(morgan('dev'))
app.use(cors({
    origin: true,
    credentials: true,
}))

app.use('/', express.static(path.join(__dirname, 'uploads')))
// ***위치 주의*** front에서 보낸 data를 req.body에 넣어주는 역할
app.use(express.json()) // json 형식의 데이터를 req.body에 넣어줌
app.use(express.urlencoded({ extended: true})) // form submit을 했을 때  URLencoded 방식으로 req.body에 넣어줌 (일반폼)

// login 위한 미들웨어  
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send('hello exporess');
})
app.get('/api', (req, res) => {
    res.send('hello api');
})

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/posts', postsRouter)

app.listen(3065, () => {
    console.log('3065 server working')
})
