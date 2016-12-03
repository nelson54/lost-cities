GameModel = require('../models/game.model');
module.exports = {

    createGame: function(playerOneId) {
        var game = new GameModel();
        game.start = Date.now();
        game.players = [playerOneId];
        game.currentPlayer = playerOneId;
        game.open = true;
        return game;
    },

    findOne: function(id) {
        return GameModel.findById(id);
    },

    findAll: function(query) {
        return GameModel.find();
    },
    
    find: function(query, excludePlayerId) {
        let gameQuery = GameModel
            .find(query || {});

        if (excludePlayerId) {
            gameQuery.ne('players', excludePlayerId);
        }

        return gameQuery;
    },
    
    findOpenGames: function() {
        return GameModel.find().where({'open': true})
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