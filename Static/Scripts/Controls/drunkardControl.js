(function (toExport) {
    "use strict";
    var DrunkardControl = function (options) {
        this.$container = options.$container;
        this.$playerCardDescContainer = $(".playerCardDesks:first", this.$container);
        this.$battleCardDesks = $(".battleCardDesks:first", this.$container);
        this.$nextButton = $(".nextButton:first", this.$container);
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
                    openMod: "all",
                    $container: this.$playerCardDescContainer,
                    cardCreator: this.cardCreator
                }),
                battleCardDesk = new CardDesk(),
                battleCardDescControl = new CardDeskControl({
                    cardDeskModel: battleCardDesk,
                    openMod: "all",
                    $container: this.$battleCardDesks,
                    cardCreator: this.cardCreator
                }),self = this;
            cards.forEach(function(cardModel) {
                new CardControl({
                    cardCreator: self.cardCreator,
                    cardModel: cardModel
                })
            });
            playerCardDesk.add(cards);
            this.players.push(new Player({
                playerCardDesk: playerCardDesk,
                battleCardDesk: battleCardDesk
            }));
    };
    DrunkardControl.prototype.reInit = function(countPlayer) {
        var fullCardDesc = CardDesk.getCardDesk52(),
            gameManager,
            self = this;
        fullCardDesc.mix();
        fullCardDesc.divide(countPlayer).forEach(function(cards){
            initOnePlayer.call(self, cards)
        });
        gameManager = new GameManager({
            players: this.players
        });
        this.$nextButton.click(function(){
            gameManager.next();
        });
    };
    toExport.DrunkardControl = DrunkardControl;
}(window));
