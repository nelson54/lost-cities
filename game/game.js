let COLORS = require('./colors');

module.exports = class Game {
    constructor(players, deck, currentPlayer) {
        this.deck = deck;
        this.discardPiles = {};
        this.players = players;
        this.currentPlayer = currentPlayer;
        
        Object.values(COLORS)
            .forEach((color) => this.discardPiles[color] = []);
    }
    
    getPlayerById(id) {
        let player;
        this.players.forEach( (p)=> { if(p.id == id) {
            player = p;
        }} );

        return player;
    }

    toggleCurrentPlayer() {
        let players = Object.value(this.players).map((player) => player.id);
        this.currentPlayer =
            this.currentPlayer.id == players[0] ? players[1] : players[0];
    };
};
