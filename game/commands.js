module.exports = class Commands {

    /**
     * @param {Card} card
     * @param {Player} player
     * @param {Game} game
     */
    static discard (card, player, game) {
        if (player.hasCard(card)){
            player.removeCard(card);
            game.discardPiles[card.color].push(card);
            return true;
        }

        return false;
    }

    /**
     * @param {Player} player
     * @param {Game} game
     */
    static draw (player, game) {
        let card = game.deck.pop();
        player.hand.push(card);
        game.toggleCurrentPlayer();

        return true;
    }

    /**
     * @param color
     * @param {Player} player
     * @param {Game} game
     */
    static drawFromDiscard (color, player, game) {
        if(game.discardPiles[color].length == 0) {
            return false;
        }
        
        let card = game.discardPiles[color].pop();
        player.hand.push(card);
        game.toggleCurrentPlayer();

        return true;
    }

    /**
     * @param {Card} card
     * @param {Player} player
     * @param {Game} game
     */
    static play (card, player) {
        if(player.playArea.isPlayValid(card)) {
            player.playArea.play(card);
            return true;
        }
        
        return false;
    }

    static run(game, player, command) {
        switch(command.action) {
            case 'discard':
                return Commands.discard(command.card, player, game);
            case 'draw':
                return Commands.draw(player, game);
            case 'drawFromDiscard':
                return Commands.drawFromDiscard(command.card.color, player, game);
            case 'play':
                return Commands.play(command.card, player);
            default:
                return false;
        }
    }
};