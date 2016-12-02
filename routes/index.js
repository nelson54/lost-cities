var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Create an account' });
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  }
  res.render('login', { title: 'Log in' });
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {user: req.user});
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // redirect them to the home page otherwise
  res.redirect('/');
}

module.exports = router;
