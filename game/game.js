let COLORS = require('./colors');

module.exports = class Game {
    construct(players, deck, currentPlayer) {
        this.deck = deck;
        this.discardPiles = {};
        this.players = players || {};
        this.currentPlayer = currentPlayer;
        
        COLORS.forEach((color) => this.discardPiles[color] = []);
        players.forEach((player) => this.players[player.id] = players);
    }
    
    playerById(id) {
        return this.players[id];
    }

    toggleCurrentPlayer() {
        this.currentPlayer = this.currentPlayer == players[0] ? players[1] : players[0];
    };
};
