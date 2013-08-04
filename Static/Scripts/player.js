(function (toExport) {
    "use strict";
    var Player = function (params) {
        params.name = params.name || "Non name";
        params.cardDesk = params.cardDesk || new CardDesk();
        this.prototype.call(this, params);
    };
    Player.prototype = Object.create(Model.prototype, {
        constructor: {
            value: Player,
            enumerable: false,
            writable: true,
            configurable: true
        }});

    Player.prototype.makeMove = function (withPrize) {
        var result = [];
        result.push(this.cardDesk.tryGetNextCard());
        if (withPrize) {
            if (!this.cardDesk.empty()) {
                result.push(this.cardDesk.tryGetNextCard());
            }
            if (!this.cardDesk.empty()) {
                result.push(this.cardDesk.tryGetNextCard());
            }
        }
        return result;
    };
    /**
     *
     * @param newCards {CardDesk|Card[]}
     */
    Player.prototype.winRound = function(newCards) {
        this.cardDesk.adds(newCards);
    };
    toExport.Player = Player;
}(window));
