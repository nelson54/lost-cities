angular.module('lost-cities-game')
.controller('GameCtrl', function ($http, $window) {
    var game = this;

    game.userId = $window.document.getElementById('userId').innerText;
    game.gameId = $window.document.getElementById('gameId').innerText;

    game.colorStacks = [
        {
            color: 'Y',
            class: 'panel-warning',
            discardPile: []
        },
        {
            color: 'B',
            class: 'panel-info',
            discardPile: []
        },
        {
            color: 'W',
            class: 'panel-default',
            discardPile: []
        },
        {
            color: 'G',
            class: 'panel-success',
            discardPile: []
        },
        {
            color: 'R',
            class: 'panel-danger',
            discardPile: []
        }
    ];

    // TODO: flesh this out some more
    let GET_GAME_STATE_API = "/api/games/"+game.gameId;
    var gameData = null;
    game.hand = null;
    $http.get(GET_GAME_STATE_API)
    .then(function success(res) {
        gameData = res.data;

        game.hand = gameData.players.filter((player) => player.id == game.userId)[0].hand;
        console.log("Current hand: %O", game.hand);

        game.colorStacks.forEach(
            (stack) => stack.discardPile = gameData.players[0].playArea.playStacksByColor[stack.color]
        );
    }, function failure() {
        console.log("XHR failed!");
    });

    game.clicked = function (card) {
        console.log(card);
        alert('you clicked card '+ card.color+card.number);
    };
});