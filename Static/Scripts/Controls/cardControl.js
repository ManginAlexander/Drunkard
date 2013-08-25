(function (toExport) {
    "use strict";
    var CardControl = function (options) {
        var cardCreator = options.cardCreator,
            cardModel = options.cardModel;
        cardModel.bind(this);
        this.isFaceVisible = false;
        this.$card = cardCreator.createCard(cardModel);
        this.$face = $(".card-face:first", this.$card);
        this.$shirt = $(".card-shirt:first", this.$card);
    };
    CardControl.prototype.showFace = function() {
        if (!this.isFaceVisible) {
            this.$shirt.hide();
            this.$face.show();
            this.isFaceVisible = true;
        }
    };
    CardControl.prototype.showShirt = function() {
        if (this.isFaceVisible) {
            this.$shirt.show();
            this.$face.hide();
            this.isFaceVisible = false;
        }
    };
    toExport.CardControl = CardControl;
}(window));
