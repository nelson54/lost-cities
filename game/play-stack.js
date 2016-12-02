let _ = require('lodash');

module.exports = class PlayStack {
    
    constructor (color, cards) {
        this.color = color;
        this.cards = cards;
    }

    isValid() {
        return isSorted(this.cards) && matchColors(this.color, this.cards);
    }
    
    score () {
        let cards = this.cards;
        let multiplier = cards.filter( (card) => card.isMultiplier ).length + 1;
        let value = cards.length ? -20 : 0;

        cards
            .filter( (card) => !card.isMultiplier )
            .forEach( (card) => value += card.number );

        return value * multiplier;
    }
    
    add (card) {
        this.cards.push();
    }
};

function isSorted(cards) {
    var length = cards.length - 1;
    for(var i = 0; i < length; ++i) {
        if(cards[i].number >= cards[i+1].number) {
            return false;
        }
    }

    return true;
}

function matchColors(color, cards) {
    let colors;
    return ( colors = _.uniq(cards.map( (card) => card.color ))).length == 1
        && colors[0] == color;
}