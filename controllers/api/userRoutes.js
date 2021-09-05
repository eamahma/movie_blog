
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
//get all the users
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "name", "email", "password"], 
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "title", "body"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) //include the posts and comments of this user
    .then((dbUserData) => {
      res.json(dbUserData);
      console.log("dbUser Firing ");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
      console.log("dbUserData error");
    });
});

//get user by id
router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name", "email", "password"], 
    include: [
      {
        model: Post,
        as: "posts",
        attributes: ["id", "title", "body"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) 
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log("get user error");
      console.log(err);
      res.status(500).json(err);
    });
});


//dbUserData being passed in?
router.post("/", (req, res) => {
  User.create({
    //expects username, email, password
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
      console.log(dbUserData.name);
      console.log(dbUserData.email);
      //save the data into a session
      req.session.save(() => {
        // we run the save function
        //when is dbUserData.id declared?
        req.session.user_id =  dbUserData.id; //and give it the data we want to save
        req.session.name =  dbUserData.name;
        req.session.loggedIn = true;
        res.json(dbUserData); //Run this in callback so we make sure the session is updated before we respond
      });
    })
    .catch((err) => {
      console.log("creating user error");
      //console.log(movie_blog_db);
      res.status(500).json("error here!"+ err + "This is error");
      console.log(err);
    });
});

//log in the user
router.post("/login", (req, res) => {
  //console.log("request recieved!");
  //find the user in question
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((dbUserData) => {
      //check if there was a user present
      if (!dbUserData) {
        res.status(400).json({ message: "User not found" });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);

      //procede based on results
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect Password!" });
        return;
      }

      //save things into session
      req.session.save(() => {
        //declare session variables
        req.session.user_id = dbUserData.id;
        req.session.name = dbUserData.name;
        req.session.loggedIn = true;
        //send response
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log("login error");
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/", (_req, res) => {
  res.send(`update user`); 
});


//deletes user.
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Log out the user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
    
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;


/*
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//create user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
   // console.log(userData);
    console.log(req.body);
    console.log("create user error");
    
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log("login error");
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
*/