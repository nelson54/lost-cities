angular.module('lost-cities-game')
.controller('GameCtrl', function ($scope, $http, $window) {
    var game = this;

    game.constants = {
        WAITING_FOR_OPPONENT: 'waiting for a second player to join',
        WAITING_ON_OPPONENT: 'waiting on the opponent\'s turn',
        PHASE1: 'play or discard a card',
        PHASE2: 'draw from the deck or discard pile',
        GAME_ENDED: 'the game has ended',
        ACTION_PLAY_CARD: 'play',
        ACTION_DISCARD: 'discard',
        ACTION_DRAW: 'draw',
        ACTION_DRAW_FROM_DISCARD: 'drawFromDiscard'
    };

    game.userId = $window.document.getElementById('userId').innerText;
    game.gameId = $window.document.getElementById('gameId').innerText;

    let GET_GAME_STATE_API = "/api/games/"+game.gameId;
    game.playerPhase = game.constants.WAITING_FOR_OPPONENT;
    game.deck = [];
    game.hand = [];
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

    $http.get(GET_GAME_STATE_API)
    .then(function success(res) {
        let gameData = res.data;
        game.deck = gameData.deck;
        if (gameData.currentPlayer) {
            game.playerPhase = gameData.currentPlayer.id==game.userId?
                game.constants.PHASE1 : game.constants.WAITING_ON_OPPONENT;
        } else {
            game.playerPhase = game.constants.GAME_ENDED;
        }

        // TODO: hardcode myself as the first player always for testing
        //game.playerPhase = game.constants.PHASE1;

        game.hand = gameData.players.filter((player) => player.id == game.userId)[0].hand;
        game.colorStacks.forEach(
            (stack) => stack.discardPile = gameData.discardPiles[stack.color]
        );
    }, function failure() {
        console.log("could not get current game state!");
    });

    game.initDragDrop = function (color) {
        $(".face.front").each(function () {
            $(this).draggable({
                helper: 'clone',
                start: function(e, ui) {
                    $(this).hide();
                    game.enableDropForColor(color);
                },
                stop: function(e, ui) {
                    $(this).show();
                    game.disableDragDrop(color);
                }
            });
        });
    };

    game.enableDropForColor = function (color ) {
        $(".discard-pile").each(function () {
            if ($(this).attr('data-color') != color) {
                return;
            }
            $(this).addClass('well');

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
                    let discardPile = game.colorStacks.filter((stack) => stack.color==card.color)[0].discardPile;
                    discardPile.push({
                        color : card.color,
                        number : (+card.number)
                    });
                    //container.empty().text("discarded "+card.color+" "+card.number);

                    // remove the card from the hand
                    // TODO: watch out for multipliers
                    let cardToRemove = game.hand.filter(
                        (c) => (c.color == card.color && c.number == (+card.number))
                    )[0];
                    game.hand = game.hand.filter(
                        (c) => (c!=cardToRemove)
                    );
                    $scope.$apply();
                    // TODO: verify this
                    game.disableDragDrop(color);
                    game.commitPhase(game.constants.ACTION_DISCARD, cardToRemove);
                    game.playerPhase = game.constants.PHASE2;
                }
            });
        });
    };

    game.disableDragDrop = function (color) {
        console.log('disabling drag drop for color %s', color);
        $(".discard-pile").each(function () {
            if ($(this).attr('data-color') == color) {
                $(this).removeClass('well').droppable('disable');
            }
        });
    };

    game.clicked = function (card) {
        console.log(card);
        alert('you clicked card '+ card.color+card.number);
    };

    game.drawFromDeck = function () {
        if (game.playerPhase != game.constants.PHASE2) {
            alert(game.playerPhase);
            return;
        }

        let cardDrawn = game.deck[game.deck.length - 1];
        console.log("drew card %O", cardDrawn);
        alert('you drew card '+ cardDrawn.color+cardDrawn.number);
        // TODO: send the action to the game api
        game.commitPhase(game.constants.ACTION_DRAW);
        game.sendTurn();
    };

    game.turns = [];
    game.commitPhase = function (action, card) {
        let turnObj = {};
        turnObj.action = action;
        if (card) {
            turnObj.card = {
                color: card.color,
                number: +card.number,
                isMultiplier: card.number==1
            };
        }
        game.turns.push(turnObj);
    };
    game.sendTurn = function () {
        if (game.turns.length != 2 ) {
            alert('error, invalid turn');
            return;
        }
        $http.post('/api/games/' + game.gameId + '/turn', {commands: game.turns})
        .then(function success(res) {
            console.log(res);
        }, function failure() {
            console.log('failed to send turn');
        });
    };
});