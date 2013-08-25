(function (toExport) {
    "use strict";

    var CardCreator = function(options) {
        this.$cardTemplateElement = options.$cardTemplateElement;
        this.$cardTemplateElement.remove();
        this.$cardDeskTemplateElement = options.$cardDeskTemplateElement;
        this.$cardDeskTemplateElement.remove();
        this.backgroundImageValue = "url('" +options.mapFile + "')";
        },
        coordinateToString = function () {
            return "-" +this.x + "px " + "-" +this.y + "px";
    };
    CardCreator.prototype.createCard = function (cardModel) {
        var faceLocation = CardBuilder.getFaceLocation(cardModel.type, cardModel.suit),
            suitsLocation = CardBuilder.getSuitLocation(),
            $newCardContainer = this.$cardTemplateElement.clone();
        $(".card-face", $newCardContainer)
            .css("background-image", this.backgroundImageValue)
            .css("background-position", coordinateToString.call(faceLocation))
            .css("left", function(index) {return index*10})
            .css("top", function(index) {return index*10});
        $(".card-shirt", $newCardContainer)
            .css("background-image", this.backgroundImageValue)
            .css("background-position", coordinateToString.call(suitsLocation))
            .css("left", function(index) {return index*5})
            .css("top", function(index) {return index*5});
        return $newCardContainer;
    };
    CardCreator.prototype.createCardDesk = function (number) {
        var cardDesk = this.$cardDeskTemplateElement.clone();
        cardDesk.append($("<div/>", {
            class:"cardDesk-number",
            text:number
        }));
        return cardDesk;
    };
    toExport.CardCreator = CardCreator;
}(window));
