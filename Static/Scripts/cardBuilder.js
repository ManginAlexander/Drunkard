(function (toExport) {
    "use strict";
    var cardWidth = 179,
        cardHeight = 259,
        space = 0,
        orderCardsColumn = {},
        orderSuitCardRow = {},
        calculateLocation = function(column, row) {
            return {
                x: (column - 1) * (cardWidth + space),
                y: (row - 1) * (cardHeight + space)
            };
        }, CardBuilder;
    orderCardsColumn[CardType.Ace.name] = 1;
    orderCardsColumn[CardType.Two.name] = 2;
    orderCardsColumn[CardType.Three.name] = 3;
    orderCardsColumn[CardType.Four.name] = 4;
    orderCardsColumn[CardType.Five.name] = 5;
    orderCardsColumn[CardType.Six.name] = 6;
    orderCardsColumn[CardType.Seven.name] = 7;
    orderCardsColumn[CardType.Eight.name] = 8;
    orderCardsColumn[CardType.Nine.name] = 9;
    orderCardsColumn[CardType.Ten.name] = 10;
    orderCardsColumn[CardType.Jack.name] = 11;
    orderCardsColumn[CardType.Queen.name] = 12;
    orderCardsColumn[CardType.King.name] = 13;
    orderCardsColumn[CardType.BlackJoker.name] = 1;
    orderCardsColumn[CardType.RedJoker.name] = 2;
    orderCardsColumn["Suits"] = 3;

    orderSuitCardRow[CardSuit.Clubs.name] = 1;
    orderSuitCardRow[CardSuit.Diamonds.name] = 2;
    orderSuitCardRow[CardSuit.Hearts.name] = 3;
    orderSuitCardRow[CardSuit.Spades.name] = 4;
    orderSuitCardRow["Special"] = 5;


    CardBuilder = {};
    CardBuilder.getFaceLocation = function (cardType, cardSuits) {
        var pathRow,
            pathColumn;
        if (cardType === CardType.BlackJoker || cardType === CardType.RedJoker) {
            cardSuits = {
                name: "Special"
            }
        }
        pathRow = cardSuits.name;
        pathColumn = cardType.name;
        return calculateLocation(orderCardsColumn[pathColumn], orderSuitCardRow[pathRow]);
    };
    CardBuilder.getSuitLocation = function () {
        return calculateLocation(orderCardsColumn["Suits"], orderSuitCardRow["Special"]);
    };
    toExport.CardBuilder = CardBuilder;
}(window));
