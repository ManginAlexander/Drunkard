(function (toExport) {
    "use strict";
    var GameManager,
        fromStartToInit,
        fromInitToBattle,
        fromBattleToFinish,
        fromBattleToDraw,
        fromBattleToFinishOrDraw,
        fromDrawToInit;
    fromStartToInit = function () {
        this.currentRound.state = RoundState.Init;

        this.players.forEach(function(player) {
            player.state = PlayerState.ActiveInRounnd;
        });
        this.activeInRounndPlayers = this.players;
        this.activeInRounndPlayers.forEach(function(player){
            player.initWithoutPrize();
        });
    };
    fromInitToBattle = function () {
        this.currentRound.state = RoundState.Battle;

        this.currentRound.winners = Player.getWinners(this.activeInRounndPlayers);
    };
    fromBattleToFinish = function () {
        var winner;
        this.currentRound.state = RoundState.Finish;

        winner = this.currentRound.winners[0];
        winner.takeBattlePrize(this.players);

        this.players.filter(function(player){
            return player.playerCardDesk.isEmpty()
        }).forEach(function(loser) {
                loser.state = PlayerState.Loser;
            });

        this.players = this.players.filter(function(player){
            return !player.playerCardDesk.isEmpty();
        });
    };
    fromBattleToDraw = function () {
        var self = this;
        this.currentRound.state = RoundState.Draw;

        this.activeInRounndPlayers.filter(function(player){
            return player.state === PlayerState.ActiveInRounnd
                && $.inArray(player, self.currentRound.winners) === -1
        }).forEach(function(loser) {
                return loser.state = PlayerState.Leave
            });
    };
    fromBattleToFinishOrDraw = function () {
        if (this.currentRound.winners.length > 1) {
            fromBattleToDraw.call(this);
        } else {
            fromBattleToFinish.call(this);
        }
    };

    fromDrawToInit = function () {
        this.currentRound.state = RoundState.Init;

        this.activeInRounndPlayers = this.activeInRounndPlayers.filter(function(player) {
            return player.state === PlayerState.ActiveInRounnd;
        });

        this.activeInRounndPlayers.forEach(function(player){
            player.initWithPrize();
        });
    };

    GameManager = function (options) {
        this.players = options.players;
        this.currentRound = new Round();
        this.actionTable = {};
        this.actionTable[RoundState.Start.name] = fromStartToInit.bind(this);
        this.actionTable[RoundState.Init.name] = fromInitToBattle.bind(this);
        this.actionTable[RoundState.Battle.name] = fromBattleToFinishOrDraw.bind(this);
        this.actionTable[RoundState.Draw.name] = fromDrawToInit.bind(this);
    };
    GameManager.prototype.next = function() {
        var countActivePlayers;

        if (this.currentRound.state === RoundState.Finish) {
            countActivePlayers = this.players.filter(function(player) {
                return !player.playerCardDesk.isEmpty()
            }).length;
            if (countActivePlayers === 1) {
                return false;
            } else {
                this.currentRound = new Round();
            }
        }

        this.actionTable[this.currentRound.state.name]();
        return true;
    };
    toExport.GameManager = GameManager;
}(window));
