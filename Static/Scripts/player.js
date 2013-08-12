(function (toExport) {
    "use strict";

    var Player = function (options) {
        this.state = PlayerState.Leave;
        this.playerCardDesk = options.playerCardDesk;
        this.battleCardDesk = options.battleCardDesk;
    };
    Player.prototype.initWithoutPrize = function() {
        var battleCard = this.playerCardDesk.pop(); //Всегда есть
        this.battleCardDesk.push(battleCard);
    };
    Player.prototype.initWithPrize = function () {
        var prize = this.playerCardDesk.pop(), //Всегда есть
            battleCard = this.playerCardDesk.pop(); // Может и не быть

        this.battleCardDesk.push(prize);
        if (battleCard) {
            this.battleCardDesk.push(battleCard);
        }
    }
    Player.prototype.takeBattlePrize = function (players) {
        var self = this;
        players.forEach(function(player){
            while (!player.battleCardDesk.isEmpty) {
                self.playerCardDesk.push(player.battleCardDesk.pop());
            }
        })
    }
    Player.getWinners = function (players) {
        var maxPower;
        if (players.length === 0) {
            return;
        }

        maxPower = players[0].battleCardDesk.peek().type.power;
        players.forEach(function(player) {
        var topCard = player.battleCardDesk.peek();
            if(topCard.type.power > maxPower){
                maxPower = topCard.type.power;
            }
        });

        return players.filter(function(player){
            return player.battleCardDesk.peek().type.power === maxPower;
        });
    }

    toExport.Player = Player;
}(window));
