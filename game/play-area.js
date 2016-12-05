let COLORS = require('./colors');
let PlayStack = require('./play-stack');

module.exports = class PlayArea {

    constructor () {
        this.playStacksByColor = buildStackMap();
    }

    play (card) {
        let stack = this.getStack(card.color);
        stack.add(card);
        return stack.isValid();
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