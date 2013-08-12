(function (toExport) {
    "use strict";
    var CardDeskControl = function (options) {
        var cardCreator = options.cardCreator,
            $container = options.$container,
            cardDeskModel = options.cardDeskModel || new CardDesk();
        this.cardsControls = [];
        this.openMod = options.openMod;
        this.$cardDesk = cardCreator.createCardDesk();

        cardDeskModel.bind(this);
        $container.append(this.$cardDesk);

    },
        applyOpenMode = function (cardControl) {
            if (!this.openMod || this.openMod === "hand") { return; }

            if (this.openMod === "all" && !cardControl.isFaceVisible) {
                cardControl.switchFaceAndShirt();
            }
            else if (this.openMod === "nothing" && cardControl.isFaceVisible) {
                cardControl.switchFaceAndShirt();
            }
    };

    CardDeskControl.prototype.push = function(cardModel) {
        var cardControl = cardModel.control;
        applyOpenMode.call(this, cardControl);
        this.cardsControls.push(cardControl);
        cardControl.$card
            .css("left", this.cardsControls.length)
            .css("top", this.cardsControls.length);

        this.$cardDesk.append(cardControl.$card);
    };

    CardDeskControl.prototype.pop = function() {
        return this.cardsControls.pop();
    };

    toExport.CardDeskControl = CardDeskControl;
}(window));
