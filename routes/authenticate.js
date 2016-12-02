var express = require('express');
var router = express.Router();

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = function(passport) {
    router.post('/signup', function(req, res, next){
        console.log('Starting Signup..');
        return next();
    }, passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.post('/login',
        function(req, res, next){
            console.log('Starting Login..');
            return next();
        },
        passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    return router;
};
