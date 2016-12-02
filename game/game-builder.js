let GameRepository = require('../repositories/game.repository');
let generateDeck = require('../game/generate-deck');
let seedShuffle = require('../game/shuffle-deck');
let Command = require('../game/commands');
let Game = require('../game/game');

module.exports = class GameBuilder {

    buildGame(gameInfo) {
        let deck = generateDeck();
        seedShuffle(deck, gameInfo._id);
        let players = gameInfo.players.map((player) => new Player(player._id));
        players.forEach(
            (player) => this.drawForPlayer(gameInfo, player));
        gameInfo.turns.forEach((command) => Commands.run(game, command, game.currentPlayer));
        return new Game(players, deck);
    }

    drawForPlayer(game, playerId) {
        let command = new Command();
        for(let i = 0; i < 8; i++) {
            command.draw(playerId, game);
        }
    }
};