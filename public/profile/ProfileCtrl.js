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
.controller('ProfileCtrl', ['Game', function (Game) {
    var profile = this;
    let getGames = function(playerId, done) {
        Game.query({player: playerId, done: done}, function(data) {
            console.log(data);
            //this.games = GameInfo(data);
        }, function(status) {
            console.log('could not get selected games. error ' + status);
        });
    };

    profile.createGame = function() {
        var game = new Game();
        return game.$save();
    }
}])

.factory('Game', function($resource) {
    return $resource('/api/games', null, {
        'save': {method: 'PUT'}
    });
})
