/*global window:false, RoundState:false*/
(function (toExport) {
    "use strict";
    toExport.Round = function () {
        this.state = RoundState.Start;
        this.winners = [];
    };
}(window));
