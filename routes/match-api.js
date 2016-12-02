var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var gameRepo = require('../repositories/game.repository');

router.get('/', function(req, res, next) {
    return gameRepo
        .findOpenGames()
        .then( (games) => {
            res.json(games.map((game) => game._doc))
        });
});


module.exports = router;
