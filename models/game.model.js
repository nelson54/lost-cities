var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    start: Date,
    finished: Date,
    open: Boolean,
    seed: Number,
    players: [String],
    turns: [{action: String, card: String}],
    winner: String,
    currentPlayer: String
});
/*
    addSecondPlayer(seed, playerTwoId) {
        gameSchema.findOneAndUpdate(
            {'seed': seed},
            {
                $push: {'players': playerTwoId}

            }
        );
    };

    addTurn
}
*/
module.exports = mongoose.model("Game", gameSchema);


/*

GameModel = require('game.model');

var game = new GameModel();
game.create

*/