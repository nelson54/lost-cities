angular.module('lost-cities-game')
.controller('GameCtrl', function ($scope, $http, $window) {
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

    game.initDragDrop = function () {
        $(".face.front").each(function () {
            $(this).draggable({
                helper: 'clone',
                start: function(e, ui) {
                    $(this).hide();
                },
                stop: function(e, ui) {
                    $(this).show();
                }
            });
        });

        $(".discard-pile").each(function () {
            $(this).droppable({
                drop: function (e, ui) {
                    console.log(e.target);
                    let container = $(this);
                    console.log(container);
                    container.html('dropped card');

                    let draggable = $(ui.draggable);
                    let card = {
                        color : draggable.attr('data-color'),
                        number : draggable.attr('data-number')
                    };
                    console.log("card dropped: %O", card);
                    // TODO: add  the card on top if allowed --> use angular here
                    container.empty().text("discarded "+card.color+" "+card.number);

                    // remove the card from the hand
                    // TODO: watch out for multipliers
                    let cardToRemove = game.hand.filter(
                        (c) => (c.color == card.color && c.number == (+card.number))
                    )[0];
                    game.hand = game.hand.filter(
                        (c) => (c!=cardToRemove)
                    );
                    $scope.$apply();
                }
            });
        });
    };

    game.clicked = function (card) {
        console.log(card);
        alert('you clicked card '+ card.color+card.number);
    };
});