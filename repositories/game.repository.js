GameModel = require('../models/game.model');
module.exports = {

    createGame: function(playerOneId) {
        var game = new GameModel();
        game.start = Date.now();
        game.players = [playerOneId];
        game.currentPlayer = playerOneId;
        return game;
    },

    findOne: function(seed) {
        return GameModel.findById(seed);
    },

    findAll: function() {
        return GameModel.find({});
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