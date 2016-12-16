module.exports = class Commands {

    /**
     * @param {Card} card
     * @param {Player} player
     * @param {Game} game
     */
    static discard (card, player, game) {
        if (!player.hasCard(card)){
            throw new Error(`Players cannot discard a card they do not have in their hand (player: [${player.id}], card: [${card.toString()}])`);
        }

        player.removeCard(card);
        game.discardPiles[card.color].push(card);
    }

    /**
     * @param {Player} player
     * @param {Game} game
     */
    static draw (player, game) {
        let card = game.deck.pop();
        player.hand.push(card);

        return true;
    }

    /**
     * @param color
     * @param {Player} player
     * @param {Game} game
     */
    static drawFromDiscard (color, player, game) {
        if(game.discardPiles[color].length == 0) {
            throw new Error(`Players can not draw from a discard pile without cards (player: [${player.id}], color: [${color}])`);
        }
        
        let card = game.discardPiles[color].pop();
        player.hand.push(card);
        //game.toggleCurrentPlayer();
    }

    /**
     * @param {Card} card
     * @param {Player} player
     */
    static play (card, player) {
        if(!player.hasCard(card)) {
            throw new Error(`Players can only play cards they have in their hand (player: [${player.id}], card: [${card.toString()}])`);
        }

        if(!player.playArea.play(card)) {
            throw new Error(`Cards must be played in order lowest to highest (player: [${player.id}], card: [${card.toString()}])`);
        }

        player.removeCard(card);
    }

    /**
     * @param {Game} game
     * @param {Player} player
     * @param {Object} command
     * @returns boolean
     */
    static run(game, player, command) {
        if(player.id != game.currentPlayer.id) {
            throw new Error(`Players can only execute a command on their turn (player: [${player.id}], current player: [${game.currentPlayer.id}])`);
        }

        switch(command.action) {
            case 'discard':
                Commands.discard(command.card, player, game);
                break;
            case 'draw':
                Commands.draw(player, game);
                break;
            case 'drawFromDiscard':
                Commands.drawFromDiscard(command.card.color, player, game);
                break;
            case 'play':
                Commands.play(command.card, player);
                break;
        }
        return true;
    }
};