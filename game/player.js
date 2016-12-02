let PlayArea = require('./play-area');
let Card = require('./card');
let _ = require('lodash');


module.exports = class Player {
    
    constructor(id, hand, playArea) {
        this.id = id;
        this.hand = [];
        this.playArea = playArea || new PlayArea();
    }

    /**
     * @param {Card} card
     */
    hasCard(card) {
        return _.filter(this.hand, (c) => c.equals(card) ).length > 0;
    }

    /**
     * @param {Card} card
     */
    removeCard(card) {
        this.hand = _.filter(this.hand, (c) => !c.equals(card))
    }
};