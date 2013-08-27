/*global window:false, PlayerState:false*/
(function (toExport) {
    "use strict";

    var Player = function (options) {
        this.state = PlayerState.ActiveInRound;
        this.number = options.number;
        this.playerCardDesk = options.playerCardDesk;
        this.battleCardDesk = options.battleCardDesk;
    };
    Player.prototype.initWithoutPrize = function () {
        var battleCard = this.playerCardDesk.pop(true);
        this.battleCardDesk.push(battleCard, true);
    };
    Player.prototype.initWithPrize = function () {
        var prize = this.playerCardDesk.pop(false),
            battleCard = this.playerCardDesk.pop(true);


        if (battleCard) {
            this.battleCardDesk.push(prize, false);
            this.battleCardDesk.push(battleCard, true);
        } else {
            this.battleCardDesk.push(prize, true);
        }
    };
    Player.prototype.takeBattlePrize = function (players) {
        var self = this,
            bitPrize;
        players.forEach(function (player) {
            while (!player.battleCardDesk.isEmpty()) {
                bitPrize = player.battleCardDesk.pop(false);
                self.playerCardDesk.unshift(bitPrize, false);
            }
        });
    };
    Player.getWinners = function (players) {
        var maxPower, maybeWinners;
        if (players.length === 0) {
            return undefined;
        }

        maxPower = players[0].battleCardDesk.peek().type.power;
        players.forEach(function (player) {
            var topCard = player.battleCardDesk.peek();
            if (topCard.type.power > maxPower) {
                maxPower = topCard.type.power;
            }
        });

        maybeWinners =  players.filter(function (player) {
            return player.battleCardDesk.peek().type.power === maxPower;
        });
        if (maybeWinners.length > 1) {
            maybeWinners = maybeWinners.filter(function (player) {
                return !player.playerCardDesk.isEmpty();
            });
        }

        return maybeWinners;
    };

    toExport.Player = Player;
}(window));
