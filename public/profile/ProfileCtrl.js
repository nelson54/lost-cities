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

angular.module('lost-cities-profile')
.controller('ProfileCtrl', ['GameService', function (GameService) {
    var profile = this;

    console.log('here');

    let getGames = function(playerId, done) {
        GameService.query({player: playerId, done: done}, function(data) {
            console.log(data);
            //this.games = GameInfo(data);
        }, function(status) {
            console.log('could not get selected games. error ' + status);
        });
    };
}])

.factory('GameService', function($resource) {
    return $resource('/api/games');
});