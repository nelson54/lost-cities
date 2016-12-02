var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    start: Date,
    finished: Date,
    open: Boolean,
    seed: String,
    players: [String],
    turns: [{action: String, card: String}],
    winner: String,
    currentPlayer: String
});

module.exports = mongoose.model("Game", gameSchema);
