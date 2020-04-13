
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const path = require("path")
const flash = require('connect-flash');
const multer = require('multer');

const MONGODB_URI ='mongodb://localhost/multer-app';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(express.static(__dirname));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.filename+"-"+file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer({storage:fileStorage}).single('image'));

app.get("/",(req,res)=>{
    res.render("upload.ejs")
})

app.post("/uploadImage",(req,res)=>{
    console.log(req.body) 
    console.log(req.file)
    res.redirect("/")
})

app.listen(3000, () => {
    console.log("Server is Running!")
})