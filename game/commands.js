class Commands {

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

        return true;
    }

    /**
     * @param color
     * @param {Player} player
     * @param {Game} game
     */
    static drawFromDiscard (color, player, game) {
        let card = game.discardPiles[color].pop();
        player.hand.push(card);

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

}