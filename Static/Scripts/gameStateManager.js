(function (toExport) {
    "use strict";
    /**
     * Объект, который инициализирует игровые события.
     * @onPlayersLosers {Function} функция вызывается, когда кто-то из игроков проиграл
     * @constructor
     * @field params {Object}
     */
    var GameStateManager = function(params) {
        this.onPlayersLosers = params.onPlayersLosers || function(){};
    };
    GameStateManager.prototype = Object.create(Model.prototype, {
        constructor: {
            value: GameStateManager,
            enumerable: false,
            writable: true,
            configurable: true
        }});
    GameStateManager.prototype.playersIsLosers = function(players) {
        if (players.length === 0) {
            return 0;
        }
        return this.onPlayersLosers(players);
    };


    toExport.GameStateManager = GameStateManager;
}(window));
