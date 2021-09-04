const router = require('express').Router();

//const { User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,

      
const { Note, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all nots and JOIN with user data
    const noteData = await Note.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const notes = noteData.map((note) => note.get({ plain: true }));

    //    for testing with Insomnia
    //  res.status(200).json(notes);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      notes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/note/:id', async (req, res) => {
  try {
    const noteData = await Note.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const note = noteData.get({ plain: true });

    res.render('note', {
      ...note,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Note }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true


    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {


  // if (req.session.logged_in) {
  //   res.redirect('/');

  // if (req.session.logged_in) {
  //   res.redirect('/');

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
