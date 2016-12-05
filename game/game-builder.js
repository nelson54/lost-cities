let GameRepository = require('../repositories/game.repository');
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
        let players = {};
        var currentPlayer;
        gameInfo.players.forEach((player) => {
            players[player] = new Player(player);
            if(gameInfo.currentPlayer == player) {
                currentPlayer = players[player];
            }
        });

        let game = new Game(players, deck, currentPlayer);

        Object.values(players)
            .forEach((player) => this.drawForPlayer(game, player));

        gameInfo.turns
            .reverse()
            .map((turn) => turn._doc)
            .forEach((turn) => {
                turn.commands.forEach((command) => {
                    Commands.run(game, game.currentPlayer, command._doc)
                })
            });
        return game;
    }

    drawForPlayer(game, playerId) {
        for(let i = 0; i < 8; i++) {
            Commands.draw(playerId, game);
        }
    }
};