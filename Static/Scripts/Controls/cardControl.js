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
    CardControl.prototype.switchFaceAndShirt = function() {
        if (this.isFaceVisible) {
            this.$face.hide();
            this.$shirt.show();
        } else {
            this.$shirt.hide();
            this.$face.show();
        }
        this.isFaceVisible = !this.isFaceVisible;
    };
    toExport.CardControl = CardControl;
}(window));
