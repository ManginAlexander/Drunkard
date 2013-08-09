(function(toExport) {
    "use strict";
    var cardCreator = new CardCreator({
        $cardTemplateElement: $(".card-container"),
        $cardDeskTemplateElement: $(".cardDesk-container"),
        mapFile: "cards.jpg"
    }),
        cards = CardDesk.getCardDesk52();
    $("#playerCardDesks").append(cardCreator.createCardDesk(cards).css("z-index", 2));
    $("#playerCardDesks").append(cardCreator.createCardDesk(cards).css("z-index", 1));
}(window));