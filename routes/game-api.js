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

router.use(function(req, res, next) {
    req.user = {id: "5841b69cb193b5455b2849a7"};

    return next();
});

router.get('/', function(req, res, next) {
    let game = req.game;

    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
    let game = req.game;


    res.render('index', { title: 'Express' });
});

router.put('/', function(req, res) {
    var game = gameRepo.createGame(uuid(), req.user.id);

    gameRepo
        .save(game)
        .then((game)=> {
            res.send(game._doc.seed)
        }).fail((err) => {
            console.log(err);
        })
});

module.exports = router;
