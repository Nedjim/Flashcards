const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser());

app.use((req, res, next) => {
    console.log('First middleware');
    const err = new Error('Ho non!!');
    next(err);
})

app.use((req, res, next) => {
    next();
})

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username;
    name ? res.render('index') : res.render('signin');
});

app.post('/signin', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
});

app.get('/signin', (req, res) => {
    const name = req.cookies.username;
    name ? res.redirect('/') : res.render('signin');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username')
    res.redirect('/signin')
});

app.get('/cards', (req, res) => {
    res.render('card', {prompt: 'Hey hey'})
})

app.listen(3000, ()=>{
    console.log('The application is running on localhost:3000')
});