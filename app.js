// importing modules 
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(
    process.env.db,
    {useNewUrlParser : true, useUnifiedTopology: true} 
)
mongoose.connection
    .once("open", ()=>{console.log("connected")})
    .on("error", (error)=>{console.log("your error : ",error)})

// creatng schema/blurprint of our document
const postSchema = new mongoose.Schema({
    heading : {
        type : String,
        required: true
    },
    content : {
        type : String,
        required: true
    }
});
// CREATING MODEL
const Post = mongoose.model('Posts', postSchema);

app.get('/', function (req, res) {
    Post.find({}, (err, data)=>{
        res.render('home', { post: data })
    })
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.get('/contact', function (req, res) {
    res.render('contact')
})

app.get('/compose', function (req, res) {
    res.render('compose')
})
app.post("/compose", function (req, res) {
    const formData = new Post({
        heading: req.body.input,
        content: req.body.postbody
    })
    formData.save()
    res.redirect('/')
})

app.get('/post/', function (req, res) {
    let postName = req.query.postName
    Post.find({heading : postName}, (err, data)=>{
        if(err){console.log("your err is : " + err)}
        else {
            console.log(data)
            res.render('post', {
                heading : data[0].heading,
                content : data[0].content
            })
        }
    })
})
app.get('/hello/:hello', (req , res) => {
    res.send(req.query.hello)
})
app.listen(3000, function () {
    console.log("Server is running at port 3000 (localhost:3000)")
})