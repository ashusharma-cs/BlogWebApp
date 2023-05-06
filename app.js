//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://user_ashu:userashu@cluster0.3n8vcs2.mongodb.net/blogDB", 
{ useNewUrlParser: true });


const aboutContent = "This is a Blog Web Application built to store and compose posts. This application is developed using NodeJS, Express, Template Engine(EJS) and MongoDB. To compose a post, the user has to hit /compose on the url to visit the compose route. Once a user submits the post the data is stored in a mongoDB database. All the posts can be viewed on the home route.";
const contactContent = "Developed By: Ashu Sharma";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const postSchema = {

  title: String,

  content: String

};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {


  Post.find()
    .then((post) => {

      res.render("home", {
        posts: post

      });
    })

});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {

  res.render("compose");
});

app.post("/compose", function (req, res) {


  const post = new Post({

    title: req.body.postTitle,

    content: req.body.postBody

  });


  post.save()



  res.redirect("/");

});

app.get("/posts/:postId", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId })
    .then((post) => {
      res.render("post", {

        title: post.title,

        content: post.content

      });
    })



});





app.listen(4000, function () {
  console.log("Server started on port 4000");
});
