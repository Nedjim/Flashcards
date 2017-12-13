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
    name ? res.render('index', { name }) : res.render('hello');
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    name ? res.redirect('/') : res.render('hello');
});

app.listen(3000, ()=>{
    console.log('The application is running on localhost:3000')
});