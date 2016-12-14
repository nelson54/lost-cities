var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
    start: Date,
    finished: Date,
    open: Boolean,
    players: [String],
    turns: [
        {
            commands: [{action: String, card: {number: Number, color: String, isMultiplier: Boolean}}]
        }
    ],
    winner: String,
    currentPlayer: String
});

module.exports = mongoose.model("Game", gameSchema);
