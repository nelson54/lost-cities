var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var gameRepo = require('../repositories/game.repository');


/* GET home page. */
router.get('/api/game/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.put(function(req, res) {
    var game = gameRepo.createGame()
});

module.exports = router;
