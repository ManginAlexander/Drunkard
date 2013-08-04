(function (toExport) {
    "use strict";
    var Game = function (params) {
        this.activePlaying = params.activePlaying || [];
    };
    Game.prototype.start = function() {
        while(this.activePlaying.length > 1) {
            var round = new Round();
            round.start(this.activePlaying, false);
            this.activePlaying = this.activePlaying.filter(function () {
                return !this.cardDesk.isEmpty();
            })
        }
    }
    Game = Object.create(Model.prototype, {
        constructor: {
            value: Game,
            enumerable: false,
            writable: true,
            configurable: true
        }});
    toExport.Game = Game;
}(window));
