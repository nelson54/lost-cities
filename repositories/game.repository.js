GameModel = require('../models/game.model');
module.exports = class GamesRepository {

    static create(playerId) {
        let game = new GameModel();
        game.start = Date.now();
        game.players = [playerId];
        game.currentPlayer = playerId;
        game.open = true;
        return GamesRepository
            .save(game);
    }

    static findOne(id) {
        return GameModel.findById(id);
    }

    static findAll(query) {
        return GameModel.find();
    }
    
    static find(query, excludePlayerId) {
        let gameQuery = GameModel
            .find(query || {});

        if (excludePlayerId) {
            gameQuery.ne('players', excludePlayerId);
        }

        return gameQuery;
    }
    
    static findOpenGames() {
        return GameModel.find().where({'open': true})
    }

    static count() {
        var game = new GameModel();
        return game.count();
    }

    static exists(seed) {
        var game = new GameModel();
        return this.findOne(seed) ? true : false;
    }

    static save(game) {
        return game.save();
    }
};