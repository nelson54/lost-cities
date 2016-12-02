GameModel = require('../models/game.model');
module.exports = {

    createGame: function(seed, playerOneId) {
        var game = new GameModel();
        game.start = Date.now();
        game.seed = seed;
        game.players = [playerOneId];
        return game;
    },

    findOne: function(seed) {
        var game = new GameModel();
        return game.findOne({'seed': seed});
    },

    findAll: function() {
        var game = new GameModel();
        return game.find();
    },

    count: function() {
        var game = new GameModel();
        return game.count();
    },

    exists: function(seed) {
        var game = new GameModel();
        return this.findOne(seed) ? true : false;
    },

    save: function(game) {
        return game.save();
    }
};