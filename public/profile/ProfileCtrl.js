angular.module('lost-cities-profile')
.controller('ProfileCtrl', ['Game', function (Game) {
    let profile = this;
    let getGames = function(playerId, done) {

        Game.query({player: playerId, done: done}, function(data) {
            console.log(data);
            profile.games = data;
        }, function(status) {
            console.log('could not get selected games. error ' + status);
        });
    };

    profile.createGame = function() {
        var game = new Game();
        return game.$save();
    };
    console.dir(profile);

    getGames();
}])

.factory('Game', function($resource) {
    return $resource('/api/games', null, {
        'save': {method: 'PUT'}
    });
});
