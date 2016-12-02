let _ = require('lodash');

module.exports = class Card {
    static matcher = /^([a-z])(x$|\d$|10$)/i;

    constructor(number, color, isMultiplier) {
        this.isMultiplier = isMultiplier;
        this.number = number;
        this.color = color;
    }

    static calculate(cards) {
        let multiplier = cards.filter( (card) => card.isMultiplier ).length + 1;
        let value = cards.length ? -20 : 0;

        cards
            .filter( (card) => !card.isMultiplier )
            .forEach( (card) => value += card.number );

        return value * multiplier;
    }
    
    static parse(str) {
        if (!matcher.test(str)) {
            throw new Error(`Unable to parse str: ${str}`);
        }

        let data = str.match(matcher);
        let color = data[1];
        let number = /^x$/i.match(data[2]) ? 1 : data[2];

        return new Card(parseInt(number), color, number == 1);
    }
    
    equals(card) {
        return this.color == card.color && this.number == card.number;
    }

    toString() {
        if(this.isMultiplier) {
            return `${this.color}x`;
        }

        return `${this.color}${this.number}`;
    }
};