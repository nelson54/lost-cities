var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

// TODO: use a param for all view files
router.get('/dashboard-main', function(req, res) {
    res.render('dashboard-main');
});

module.exports = router;
