const express = require('express');

const router    = express.Router();
const account   = require('../../models/Account');

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.title = 'NodeBird';
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', (req, res) => {
    res.render('profile', {title: '내정보 - ' + res.locals.title});
});

router.get('/join', (req, res) => {
    res.render('join', {title: '회원가입 - ' + res.locals.title});
});

router.get('/', async (req, res, next) => {
    const users = new account();
    let result = [];
    let tags = [];
    try {
        result = await users.getAllUsers();
        tags = await users.getHashTag();
    } catch(e) {
        console.log('error not found tables');
    }

    console.log(tags);

    const twits = [];
    res.render('main', {
        title: res.locals.title,
        twits,
        users: result,
        tags: tags,
    });
});

module.exports = router;