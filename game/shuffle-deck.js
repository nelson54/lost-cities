let shuffler = require('shuffle-seed');

module.exports = function shuffle(cards, seed) {
    return shuffler.shuffle(cards, seed);
};
