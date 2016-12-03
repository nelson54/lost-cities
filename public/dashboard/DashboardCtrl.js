angular.module('lost-cities-dashboard')
.controller('DashboardCtrl', function ($http, $window) {
    var dashboard = this;

    dashboard.mainMsg = "All my games";
    dashboard.subMsg = "Dashboard sub-view";
    dashboard.userId = $window.document.getElementById('userId').innerText;
    dashboard.allGames = [];
    dashboard.playerGames = [];

    let GET_ALL_GAMES_API = "/api/games";
    $http.get(GET_ALL_GAMES_API)
    .then(function success(res) {
        dashboard.allGames = res.data;
        dashboard.playerGames = dashboard.allGames.filter(
            (game) => game.players.indexOf(dashboard.userId) != -1
        );
    }, function failure() {
        console.log("couldn't get games from endpoint");
    });



});