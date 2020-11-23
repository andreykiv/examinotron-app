//express app
const express = require('express')
const app = express();
//for using patch and delete methods:
const methodOverride = require("method-override");
require('./db/mongoose')
//access to body params
const bodyParser = require('body-parser')
//DB quiz model
const Quiz = require("./models/quiz")
// access to quiz router
const quizRouter = require("./routers/quiz")
// listen for requests
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(methodOverride("_method"));

// for checking hostname, path and mehtod when app is requested.
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

//index page
app.get('/', async (req, res) => {
    try{
        const quizs = await Quiz.find({})
        res.render("index", {title: "Index", quizs})
    } catch(e){
        res.status(500).send()
    }
    
})

//create page
app.get('/create', (req, res) => {
    res.render('create', {title: "Create Quiz"})   
})

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', quizRouter)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
