let seedShuffle = require('shuffle-seed');

module.exports = function shuffle(cards, seed) {
    return seedShuffle(cards, seed);
};
