var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');
var gameRepo = require('../repositories/game.repository');

router.param('id', function(req, res, next, value){
    gameRepo
        .findOne(value)
        .then( (game) => {
            req.game = game;
            next();
        } );
});

router.get('/', function(req, res, next) {
    return gameRepo
        .findAll()
        .then( (games) => {
            res.json(games.map((game) => game._doc))
        });
});

/* GET home page. */
router.get('/:id', function(req, res) {
    res.json(req.game._doc);
});

router.put('/', function(req, res) {
    var game = gameRepo.createGame("5841b69cb193b5455b2849a7");

    gameRepo
        .save(game)
        .then((game)=> {
            res.json({gameId: game._doc._id.toString()})
        })
}); 

module.exports = router;
