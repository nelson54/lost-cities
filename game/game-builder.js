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
        let players = gameInfo.players.map((player) => new Player(player));

        let game = new Game(players, deck);

        players.forEach(
            (player) => this.drawForPlayer(game, player));

        gameInfo.turns.forEach((command) => Commands.run(game, command, game.currentPlayer));
        return game;
    }

    drawForPlayer(game, playerId) {
        for(let i = 0; i < 8; i++) {
            Commands.draw(playerId, game);
        }
    }
};