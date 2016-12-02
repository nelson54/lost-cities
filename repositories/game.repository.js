GameModel = require('../models/game.model');
module.exports = {

    createGame: function(seed, playerOneId) {
        var game = new GameModel();
        game.start = Date.now();
        game.seed = seed;
        game.players = [playerOneId];
        game.save(function(err) {
            if(err) {
                console.log('save game failed');
            }
        });
    },

    addPlayer: function(seed, playerId) {

    },

    find: function(seed) {

    },

    save: function(game) {

    }
};