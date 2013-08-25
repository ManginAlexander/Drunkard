(function (toExport) {
    "use strict";
    var DrunkardControl = function (options) {
        this.$container = options.$container;
        this.$playerCardDescContainer = $(".playerCardDesks:first", this.$container);
        this.$battleCardDesks = $(".battleCardDesks:first", this.$container);
        this.cardCreator = new CardCreator({
            $cardTemplateElement: $(".card-container"),
            $cardDeskTemplateElement: $(".cardDesk-container"),
            mapFile: "cards.jpg"
        });
        this.players = [];
        },
        initOnePlayer = function(cards){
            var playerCardDesk = new CardDesk(),
                playerCardDescControl = new CardDeskControl({
                    cardDeskModel: playerCardDesk,
                    $container: this.$playerCardDescContainer,
                    cardCreator: this.cardCreator,
                    number: this.players.length+1
                }),
                battleCardDesk = new CardDesk(),
                battleCardDescControl = new CardDeskControl({
                    cardDeskModel: battleCardDesk,
                    $container: this.$battleCardDesks,
                    cardCreator: this.cardCreator,
                    number: this.players.length+1
                }),self = this;
            cards.forEach(function(cardModel) {
                new CardControl({
                    cardCreator: self.cardCreator,
                    cardModel: cardModel
                })
            });
            playerCardDesk.add(cards);
            this.players.push(new Player({
                number: this.players.length,
                playerCardDesk: playerCardDesk,
                battleCardDesk: battleCardDesk
            }));
    };
    DrunkardControl.prototype.startPlay = function(cardDesk, needMix, countPlayer, speed, onEndGame) {
        var gameManager,
            intervalId,
            self = this;
        if (needMix) {
            cardDesk.mix();
        }
        cardDesk.divide(countPlayer).forEach(function(cards){
            initOnePlayer.call(self, cards)
        });
        gameManager = new GameManager({
            players: this.players
        });

        intervalId = setInterval(function () {
            var result = gameManager.next();
            if (result) {
                clearInterval(intervalId);
                onEndGame(result);
            }
        },
            speed);
    };
    toExport.DrunkardControl = DrunkardControl;
}(window));
