var assert = require('assert');
let Commands = require('../game/commands');
let Card = require('../game/card');
let GameBuilder = require('../game/game-builder');

let gameInfo = {
    _id: '12345',
    players: ['1', '2'],
    currentPlayer: '1',
    open: false,
    turns: []
};

describe('Commands', function() {

    describe('#run()', function() {
        it('should not execute for the non-current player', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.getPlayerById('2');
            let command = {};

            assert.throws(
                () => {Commands.run(game, player, command)},
                Error,
                'Players can only execute a command on their turn (player: [2], current player: [1])'
            );

        });
    });

    describe('#draw()', function() {
        it('should move the last card of the deck to the end of the hand', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;

            assert.equal(8, player.hand.length);
            assert.equal(34, game.deck.length);

            Commands.draw(player, game);

            assert.equal(9, player.hand.length);
            assert.equal(33, game.deck.length);
        });
    });

    /*
     HAND CONTENTS
     [
     { number: 2, color: 'G' },
     { number: 2, color: 'R' },
     { number: 6, color: 'B' },
     { number: 2, color: 'W' },
     { number: 8, color: 'Y' },
     { number: 3, color: 'R' },
     { number: 5, color: 'W' },
     { isMultiplier: true, number: 1, color: 'G' }
     ]
     */
    describe('#discard()', function() {
        let w2 = new Card(2, 'W');
        let w10 = new Card(10, 'W');

        it('should move the card from the deck to the discard pile', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;
            let discard = game.discardPiles['W'];

            assert.equal(8, player.hand.length);
            assert.equal(0, discard.length);

            Commands.discard(w2, player, game);

            assert.equal(7, player.hand.length);
            assert.equal(1, discard.length)

        });

        it('should not be able to discard a card that isn\'t in a players hand', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;
            let discard = game.discardPiles['W'];

            assert.equal(8, player.hand.length);
            assert.equal(0, discard.length);

            assert.throws(()=>Commands.discard(w10, player, game), Error);

            assert.equal(8, player.hand.length);
            assert.equal(0, discard.length)

        });
    });

    describe('#play()', function() {
        let w2 = { number: 2, color: 'W' };
        let w5 = { number: 5, color: 'W' };
        let w10 = { number: 10, color: 'W' };

        it('should move the last card of the deck to the end of the hand', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;

            assert.equal(8, player.hand.length);

            Commands.play(w5, player);

            assert.equal(7, player.hand.length);
            assert.equal(-15, player.playArea.score());

            assert.throws(()=>Commands.play(w2, player), Error);

            assert.equal(-15, player.playArea.score());
        });

        it('should not be able to play a card that isn\'t in a players hand', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;
            let discard = game.discardPiles['W'];

            assert.equal(8, player.hand.length);
            assert.equal(0, discard.length);

            assert.throws(()=>Commands.play(w10, player), Error);

            assert.equal(8, player.hand.length);
            assert.equal(0, discard.length)
        });
    });

    describe('#drawFromDiscard()', function() {
        it('should throw an exception when drawing from a discard pile without cards', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;

            assert.throws(()=>Commands.drawFromDiscard('W', player, game), Error);
        });

        it('should move the card from the discard to the players hand', function() {
            let game = GameBuilder.create().buildGame(gameInfo);
            let player = game.currentPlayer;
            let w2 = { number: 2, color: 'W' };
            let discard = game.discardPiles['W'];

            Commands.discard(w2, player, game);

            assert.equal(7, player.hand.length);
            assert.equal(1, discard.length);

            Commands.drawFromDiscard('W', player, game);

            assert.equal(8, player.hand.length);
            assert.equal(0, discard.length);
        });
    });

});