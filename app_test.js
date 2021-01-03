const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const dotenv        = require('dotenv');

dotenv.config();

const app = express();

app.set('post', process.env.PORT);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly:false,
        secure: false
    },
    name: 'session-cookie'
}));

app.use((req, res, next) => {
    console.log('모든 요청에서 다 실행');
    next();
});

app.get('/', async (req, res) => {
    await res.send('Hello World');
});

const indexRouter = require('./routes');
const testRouter = require('./routes/test');
app.use('/test', indexRouter);
app.use('/test/test', testRouter);


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '번 포트에서 대기 중');
});