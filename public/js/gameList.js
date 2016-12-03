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

let app = angular.module('list', ['ngResource']);
app.controller('listController', function($scope) {
    app.factory('MatchService', function($resource) {
        return $resource('/api/matches/open');
    });

    app.factory('GameService', function($resource) {
        return $resource('/api/games');
    });

    let getMatches= function(playerId) {
        MatchService.get({player: playerId}, function(data) {
            $scope.joinableMatches = GameInfo(data);
        }, function(){
            console.log('could not get joinable matches. error ' + status);
        });
    };

    let getGames = function(playerId, done) {
        GameService.get({player: playerId, done: done}, function(data) {
            $scope.games = GameInfo(data);
        }, function() {
            console.log('could not get selected games. error ' + status);
        });
    };
});