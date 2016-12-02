class GameInfo {
    construct(data) {
        this.start = data.start;
        this.finished = data.finished;
        this.open = data.open;
        this.seed = data.seed;
        this.players = data.players;
        this.turns = data.turns;
        this.winner = data.winner;
        this.currentPlayer = data.currentPlayer;
    }
}

let app = angular.module('list', []);
app.controller('listController', function($scope) {

});

let getMatches= function(playerId) {
    $http({
        url:'/api/matches/open?player=' + playerId,
        method: 'GET'
    }).success(function(data) {
        let joinableGameInfo = GameInfo(data);
    }).error(function(status) {
        console.log('could not get joinable matches. error ' + status);
    });
};

let getGames = function(playerId, done) {
    $http({
        url: '/api/games?player=' + playerId + "&done=" + done;
    }).success(function(data) {
        let games= GameInfo(data);
    }).error(function(status) {
        console.log('could not get selected games. error ' + status);
    });
};