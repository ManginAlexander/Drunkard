(function (toExport) {
    "use strict";
    var Game = function (params) {
        this.activePlaying = params.activePlaying || [];
        this.currentRound = null;
    };
    Game.prototype.next = function() {
        if (this.activePlaying < 1) {
            console.log("Игре пришел конец");
            return;
        }
        if (this.currentRound) {
            this.currentRound.continue();
        } else {

        }
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
