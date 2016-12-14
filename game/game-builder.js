let generateDeck = require('./generate-deck');
let seedShuffle = require('./shuffle-deck');
let Command = require('./commands');
let Game = require('./game');
let Player = require('./player');
let Commands = require('./commands');

module.exports = class GameBuilder {

    buildGame(gameInfo) {
        let deck = generateDeck();
        deck = seedShuffle(deck, gameInfo._id);

        let currentPlayer;
        let players = gameInfo.players.map((id) => {
            let player = new Player(id);
            if (id == gameInfo.currentPlayer){
                currentPlayer = player;
            }
            return player;
        });

        let game = new Game(players, deck, currentPlayer);

        Object.values(players)
            .forEach((player) => this.drawForPlayer(game, player));

        gameInfo.turns
            .reverse()
            .map((turn) => turn._doc)
            .forEach((turn) => {
                turn.commands.forEach((command) => {
                    Commands.run(game, game.currentPlayer, command)
                })
            });
        return game;
    }

    drawForPlayer(game, playerId) {
        for(let i = 0; i < 8; i++) {
            Commands.draw(playerId, game);
        }
    }

    static create() {
        return new GameBuilder();
    }
};