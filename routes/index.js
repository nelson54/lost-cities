var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/app', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


// TODO: protected profile page / dashboard
router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile', {name: "TestPlayer"});
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // redirect them to the home page otherwise
  //res.redirect('/');
  return next();
}

module.exports = router;
