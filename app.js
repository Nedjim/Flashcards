const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser());

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username;
    name ? res.render('index') : res.render('hello');
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

app.listen(3000, ()=>{
    console.log('The application is running on localhost:3000')
});