let COLORS = require('./colors');

module.exports = class Game {
    construct(players, deck) {
        this.deck = deck;
        this.discardPiles = {};
        this.players = {};
        
        COLORS.forEach((color) => discardPiles[color] = []);
        players.forEach((player) => this.players[player.id] = players);
    }
    
    playerById(id) {
        return this.players[id];
    }
};
