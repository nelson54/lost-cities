angular.module('lost-cities-game')
.controller('GameCtrl', function ($http, $window) {
    var game = this;

    game.mainMsg = "All my games";
    game.subMsg = "Dashboard sub-view";
    game.userId = $window.document.getElementById('userId').innerText;
    game.gameId = $window.document.getElementById('gameId').innerText;

    // TODO: flesh this out some more
    let GET_GAME_STATE_API = "/api/games/"+game.gameId;
    var gameData = null;
    game.hand = null;
    $http.get(GET_GAME_STATE_API)
    .then(function success(res) {
        gameData = res.data;

        game.hand = gameData.players.filter((player) => player.id == game.userId)[0].hand;
        console.log(game.hand);

    }, function failure() {
        console.log("XHR failed!");
    });

});