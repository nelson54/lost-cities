let COLORS = require('./colors');

module.exports = class Game {
    constructor(players, deck, currentPlayer) {
        this.deck = deck;
        this.discardPiles = {};
        this.players = players || {};
        this.currentPlayer = currentPlayer;
        
        COLORS.values()
            .forEach((color) => this.discardPiles[color] = []);
        players.forEach((player) => this.players[player.id] = players);
    }
    
    playerById(id) {
        return this.players[id];
    }

    toggleCurrentPlayer() {
        this.currentPlayer =
            this.currentPlayer == this.players[0] ? this.players[1] : this.players[0];
    };
};
