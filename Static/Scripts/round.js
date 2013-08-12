(function (toExport) {
    "use strict";
    var Round = function () {
        this.state = RoundState.Start;
        this.winners = [];
    };

    toExport.Round = Round;
}(window));
