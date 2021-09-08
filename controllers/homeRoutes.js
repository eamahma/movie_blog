
const router = require("express").Router();
const { User, Post, Comment, Genre, Note } = require("../models");
const sequelize = require("../config/connection");
//home route server homepage
router.get("/", (req, res) => {
  //we need to get all posts
  Post.findAll({
    attributes: ["id", "title", "body", "user_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id"],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
      console.log(posts);
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//fires single post page.
router.get("/viewpost/:id", (req, res) => {
  //we need to get all posts
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "user_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const post = dbPostData.get({ plain: true }); // serialize all the posts
      console.log(post);
      const myPost = post.user_id == req.session.user_id;
      res.render("viewPost", {
        post,
        loggedIn: req.session.loggedIn,
        currentUser: myPost,
      });
    })
    .catch((err) => {
      console.log("homeroute error 1");
      console.log(err);
      res.status(500).json(err);
    });
});

//serve up the login page
router.get("/login", (req, res) => {
  console.log("Is logged in?", req.session.loggedIn);
  res.render("login");
});

router.get("/profile", (req, res) => {
  console.log("Is logged in?", req.session.loggedIn);
  res.render("profile", { loggedIn: req.session.loggedIn });
});

//this routes the user to the dashboard.
router.get("/dashboard", (req, res) => {
  //retrieves all posts associated with user. 
  console.log(req.session.user_id, " this is the session id");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "body", "user_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
      console.log(posts);
      res.render("dashboard", { posts, banner: 'Dashboard',loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log("homeroute error 2");
      console.log(err);
      res.status(500).json(err);
    });
});


router.get("/post", (req, res) => {
  res.render("create-post", { loggedIn: req.session.loggedIn });

});
//load the edit page
router.get("/edit/:id", (req, res) => {
  //    post_id: req.postID,
  res.render("edit-post", {
    loggedIn: req.session.loggedIn,
    post_id: req.params.id,
  });
});
module.exports = router;

