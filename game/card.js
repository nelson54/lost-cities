let _ = require('lodash');

var matcher = /^([a-z])(x$|\d$|10$)/i;

module.exports = class Card {
    constructor(number, color, isMultiplier) {
        this.isMultiplier = isMultiplier;
        this.number = number;
        this.color = color;
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