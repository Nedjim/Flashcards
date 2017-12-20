const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if(name) {
        res.render('index', {name})
    } 
    else {
        res.render('signin');
    }
});

router.get('/signin', (req, res) => {
    const name = req.cookies.username;
    name ? res.redirect('/') : res.render('signin');
});

router.post('/signin', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username')
    res.redirect('/signin')
});


module.exports = router;