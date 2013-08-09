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
        console.log(coordinateToString.call(faceLocation));
        $(".card-face", $newCardContainer)
            .css("background-image", this.backgroundImageValue)
            .css("background-position", coordinateToString.call(faceLocation));
        $(".card-shirt", $newCardContainer)
            .css("background-image", this.backgroundImageValue)
            .css("background-position", coordinateToString.call(suitsLocation));
        return $newCardContainer;
    };
    CardCreator.prototype.createCardDesk = function (cardModels) {
        var $newCardDeskContainer = this.$cardDeskTemplateElement.clone(),
            self = this;
        cardModels.forEach(function(cardModel) {
            var newCard = self.createCard(cardModel)
            $newCardDeskContainer.append(newCard);
        });

        $(".card-container", $newCardDeskContainer)
            .css("left", function(index){
                    return index ;
            })
            .css("top", function(index){
                return index;
            });
        return $newCardDeskContainer;
    };
    toExport.CardCreator = CardCreator;
}(window));
