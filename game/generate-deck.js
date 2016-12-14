let _ = require('lodash');
let COLORS = require('./colors');
let Card = require('./card');

module.exports = function generateDeck () {
    let cards = [];

    _.values(COLORS)
        .forEach( (color) => generateColorCards(cards, color) );
    
    return cards;
};

function generateColorCards (cards, color) {
    generateMultiplierCards (cards, color);
    generateNumberedCards (cards, color);
}

function generateNumberedCards (cards, color) {
    _.range(2, 10)
        .map( (number) => new Card(number, color))
        .forEach( (card) => cards.push(card) );
}

function generateMultiplierCards (cards, color) {
    _.range(0, 2)
        .forEach( () => cards.push( new Card(1, color, true) ) );
}