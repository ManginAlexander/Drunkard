(function (toExport) {
    "use strict";
    var PlayerState = function () {

    };

    PlayerState.GameOver = new PlayerState();
    PlayerState.DontActiveInRound = new PlayerState();
    PlayerState.ActiveInRound = new PlayerState();

    toExport.PlayerState = PlayerState;
}(window));
