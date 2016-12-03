var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var gameRepo = require('../repositories/game.repository');
var GameBuilder = require('../game/game-builder');

let gameBuilder = new GameBuilder();

router.param('id', function(req, res, next, value){
    gameRepo
        .findOne(value)
        .then( (game) => {
            req.game = game;
            next();
        } );
});

function set(req, name, value) {
    if (req.query == null) {
        req.query = {};
    }

    req.query[name] = value;
}

router.param('done', function(req, res, next, value) {
    set(req, 'done', value);
});

router.param('player', function(req, res, next, value) {
    set(req, 'player', value);
});

router.param('open', function(req, res, next, value) {
    set(req, 'open', value);
});

router.get('/', function(req, res) {
    return gameRepo
        .find(req.query)
        .then( (games) => {
            res.json(games.map((game) => game._doc))
        });
});

/* GET home page. */
router.get('/:id', function(req, res) {
    let game = gameBuilder
        .buildGame(req.game._doc);

    res.json(game);
});

router.put('/', function(req, res) {
    var game = gameRepo.createGame(req.user.id);

    gameRepo
        .save(game)
        .then((game)=> {
            res.json({gameId: game._doc._id.toString()})
        })
}); 

module.exports = router;
