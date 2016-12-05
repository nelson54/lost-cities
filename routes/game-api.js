var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var gameRepo = require('../repositories/game.repository');
var GameBuilder = require('../game/game-builder');
var Commands = require('../game/commands');

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

router.use('/', function(req, res, next) {
    if(req.query['exclude-player-id']) {
        req.excludePlayerId = req.query['exclude-player-id'];
        delete req.query['exclude-player-id'];
    }
    
    return next();
});

router.get('/', function(req, res) {
    return gameRepo
        .find(req.query, req.excludePlayerId)
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

router.post('/:id/turn', function(req, res) {
    let game = gameBuilder.buildGame(req.game._doc);
    let player = game.players[req.user.id];
    let success = true;

    req.body.commands.forEach((command) => {
        if(!Commands.run(game, player, command)) {
            success = false;
        }
    });

    if(success) {
        req.game.turns.push(req.body);
        gameRepo
            .save(req.game)
            .then(() => res.json(game));
    } else {
        res.json({ "Error": "Unable to execute turn." });
    }
});

module.exports = router;
