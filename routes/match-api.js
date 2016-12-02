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

router.put('/:id', function(req, res, next) {
    return gameRepo
        .findOne(req.param('id'))
        .then((game) => {
            game.players.push(req.user.id);
            game.open = false;
            return game;
        })
        .then((game) => {
            return gameRepo.save(game);
        })
        .then((game) => {
            res.json(game);
        })
});

module.exports = router;
