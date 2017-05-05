
let express = require('express');
let router = express.Router();
let uuid = require('uuid/v4');
let gameRepo = require('../repositories/game.repository');
let GameBuilder = require('../game/game-builder');
let Commands = require('../game/commands');

let gameBuilder = new GameBuilder();

router.param('id', function(req, res, next, value){
    gameRepo
        .findOne(value)
        .then( (game) => {
            req.game = game;
            next();
        } );
});

router.use('/', function(req, res, next) {
    if(req.query['exclude-player-id']) {
        req.excludePlayerId = req.query['exclude-player-id'];
        delete req.query['exclude-player-id'];
    }
    
    return next();
});

// get list of games
router.get('/', function(req, res) {
    return gameRepo
        .find(req.query, req.excludePlayerId)
        .then( (games) => {
            res.json(games.map((game) => game._doc))
        });
});

router.put('/', function(req, res) {

    gameRepo
        .create(req.user.id)
        .then( (game) => {
            res.json({id: game._id})
        });
});

router.get('/:id', function(req, res) {
    let game = gameBuilder
        .buildGame(req.game);

    res.json(game);
});

router.post('/:id', function(req, res) {
    let game = req.game;
    req.game.players.push(req.user.id);

    gameRepo
        .save(game)
        .then((game)=> {
            res.json({gameId: game._id})
        })
});

router.post('/:id/turn', function(req, res) {
    let game = gameBuilder.buildGame(req.game._doc);
    let player = game.getPlayerById(req.user.id);
    let turnError = false;

    req.body.commands.forEach((command) => {
        try {
            Commands.run(game, player, command);
        } catch (error) {
            turnError = error;
        }


    });

    if(!turnError) {
        req.game.turns.push(req.body);
        gameRepo
            .save(req.game)
            .then(() => res.json(game));
    } else {
        res.json(turnError);
    }
});

module.exports = router;
