/*global window:false, $:false, RoundState:false, PlayerState:false, Player:false, Round:false*/
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

        this.activeInRounndPlayers = this.players.filter(function (player) {
            return player.state === PlayerState.ActiveInRound;
        });

        this.activeInRounndPlayers.forEach(function (player) {
            player.initWithoutPrize();
        });
    };
    fromInitToBattle = function () {
        var winners = Player.getWinners(this.activeInRounndPlayers);

        this.currentRound.winners = winners;
        this.activeInRounndPlayers
            .filter(function (player) {
                return !$.inArray(player, winners);
            })
            .forEach(function (player) {
                player.state = PlayerState.DontActiveInRound;
            });
        this.currentRound.state = RoundState.Battle;
    };
    fromBattleToFinish = function () {
        var winner;
        this.currentRound.state = RoundState.Finish;

        if (this.currentRound.winners.length  === 0) {
            return;
        }
        winner = this.currentRound.winners[0];
        winner.takeBattlePrize(this.players);
    };
    fromBattleToDraw = function () {
        var self = this;
        this.currentRound.state = RoundState.Draw;

        this.activeInRounndPlayers.filter(function (player) {
            return $.inArray(player, self.currentRound.winners) === -1;
        }).forEach(function (loser) {
            loser.state = PlayerState.DontActiveInRound;
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

        this.activeInRounndPlayers = this.activeInRounndPlayers.filter(function (player) {
            return player.state === PlayerState.ActiveInRound;
        });

        this.activeInRounndPlayers.forEach(function (player) {
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

    GameManager.prototype.next = function () {
        var countActivePlayers;

        if (this.currentRound.state === RoundState.Finish) {
            if (this.currentRound.winners.length === 0) {
                return "Ни один игрок не смог победить.";
            }
            countActivePlayers = this.players.filter(function (player) {
                return !player.playerCardDesk.isEmpty();
            }).length;
            switch (countActivePlayers) {
            case 0:
                return "Ни один игрок не смог победить.";

            case 1:
                return "Победил игрок номер " + (this.currentRound.winners[0].number + 1);
            default:
                this.currentRound = new Round();
                this.players.forEach(function (player) {
                    if (player.playerCardDesk.isEmpty()) {
                        player.state = PlayerState.GameOver;
                    } else {
                        player.state = PlayerState.ActiveInRound;
                    }
                });
                return undefined;
            }
        }

        this.actionTable[this.currentRound.state.name]();
        return undefined;
    };
    toExport.GameManager = GameManager;
}(window));
