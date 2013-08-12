(function (toExport) {
    "use strict";
    var PlayerState = function () {

    };

    PlayerState.Leave = new PlayerState();
    PlayerState.ActiveInRounnd = new PlayerState();
    PlayerState.Loser = new PlayerState();

    toExport.PlayerState = PlayerState;
}(window));
