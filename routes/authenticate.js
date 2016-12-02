var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else {
        res.render('index', { title: 'Welcome Users', loginMsg: req.flash('loginMessage') });
    }
});

// TODO:  signup page
//router.get('/signup', function (req, res) {
//    res.render('signup', {});
//});

// TODO: protected profile page / dashboard
//router.get('/profile', isLoggedIn, function (req, res) {
//    res.render('profile', {);
//});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
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

module.exports = function(passport) {
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
