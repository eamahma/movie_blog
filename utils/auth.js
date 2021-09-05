const withAuth = (req, res, next) => {

    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      console.log("Auth error");
      next();
    }
  };

  module.exports = withAuth;






