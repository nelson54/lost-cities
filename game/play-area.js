let COLORS = require('./colors');
let PlayStack = require('./play-stack');

module.exports = class PlayArea {

    constructor () {
        this.playStacksByColor = buildStackMap();
    }

    playCard (card) {
        this.getStack(card.color)
            .add(card);
    }

    isPlayValid (card) {
        let stack = this.getStack(card.color);

        if(!stack) {
            throw new Error(`Card of color`);
        }

        return stack.validate(card);
    }

    /**
     * @param color
     * @returns PlayStack
     */
    getStack(color) {
        return this.playStacksByColor[color];
    }
}

function buildStackMap() {
    let stackMap = {};

    Object.values(COLORS)
        .forEach( (color) => stackMap[color] = new PlayStack(color, []));

    return stackMap;
}