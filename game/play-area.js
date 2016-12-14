let COLORS = require('./colors');
let PlayStack = require('./play-stack');

module.exports = class PlayArea {

    constructor () {
        this.playStacksByColor = buildStackMap();
    }

    play (card) {
        let stack = this.getStack(card.color);
        stack.add(card);
        if(!stack.isValid()) {
            stack.cards.pop();
            return false;
        }
        return true;
    }

    /**
     * @param color
     * @returns PlayStack
     */
    getStack(color) {
        return this.playStacksByColor[color];
    }

    score() {
        return Object
            .values(this.playStacksByColor)
            .map((stack) => stack.score())
            .reduce((stackScore, totalScore) => totalScore + stackScore)
    }
};

function buildStackMap() {
    let stackMap = {};

    Object.values(COLORS)
        .forEach( (color) => stackMap[color] = new PlayStack(color, []));

    return stackMap;
}