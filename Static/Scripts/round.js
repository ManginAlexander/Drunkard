(function (toExport) {
    "use strict";
    var Round = function (param) {
        this.totalPrize = new CardDesk();
        Model.prototype.call(this, param);
    },
        getWinners = function (playingHeapCards, players) {
            var topPlayingCards = new CardDesk(playingHeapCards.map(function () {
                return this[this.length - 1]
            }));

            return topPlayingCards.getIndexWithMax().map(function() {
                return players[this];
            });
    };
    Round = Object.create(Model.prototype, {
        constructor: {
            value: Round,
            enumerable: false,
            writable: true,
            configurable: true
        }});

    Round.prototype.start = function(players, withPrize) {
        var playingHeapCards = new CardDesk({
            cards: players.map(function() {
                        return this.makeMove(withPrize);
                    })
        }),
            winners = getWinners(playingHeapCards, players)

        this.totalPrize.adds(playingHeapCards.reduce(function(previous, current) {
            return previous.concat(current);
        }, []));

        if (winners.length === 0) {
            return;
        }
        if (winners.length === 1) {
            winners[0].winRound(this.totalPrize);
            return;
        }
        winners = winners.filter(function() {
            return !this.cardDesk.isEmpty()
        });
        if (winners.length === 0) {
            return;
        }
        if (winners.length === 1) {
            winners[0].winRound(this.totalPrize);
            return;
        }
        this.start(winners, true);
    };

    toExport.Round = Round

}(window));
