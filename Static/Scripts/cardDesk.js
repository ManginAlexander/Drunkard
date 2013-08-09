(function (toExport) {
    "use strict";
    /**
     * Объект моделирует карточную колоду
     * @param params Object
     * @constructor
     * @field cards {Card[]} массив карт
     */
    var CardDesk = function (params) {
        params.cards = params.cards || [];
        this.prototype.call(this, params);
    },
        allCardTypes,
        allCardSuits,
        allCards;
    CardDesk.prototype = Object.create(Model.prototype, {
        constructor: {
            value: CardDesk,
            enumerable: false,
            writable: true,
            configurable: true
        }});
    /**
     * Метод проверяет есть ли карты в колоде
     * @returns {boolean}
     */
    CardDesk.prototype.isEmpty = function () {
        return this.cards.length === 0;
    };
    /**
     * Пытаемся достать из колоды следующую карту
     * @returns {Card}
     */
    CardDesk.prototype.tryGetNextCard = function () {
        if (this.isEmpty) {
            return null;
        }
        return this.cards.shift();
    };
    /**
     * Добавляем карты под колоду
     * @param otherObject {Card[]|CardDesk} карты или колода карт, которые нужно положить под низ
     */
    CardDesk.prototype.adds = function (otherObject) {
        var cards = [];
        if (Array.isArray(otherObject)) {
            cards = otherObject;
        }
        if (Array instanceof CardDesk) {
            cards = otherObject.cards;
        }
        this.cards = this.cards.concat(cards);
    };
    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Перемешать
     */
    CardDesk.prototype.mix = function () {

    };
    /**
     * Находим индексы максимальных карт
     * @returns {number[]}
     */
    CardDesk.prototype.getIndexWithMax= function () {
        var maxCard = Card.prototype.Empty,
            maxs = [];
        this.cards.forEach(function (index) {
            var compareResult = maxCard.compare(this);
            if (compareResult === 1) {
                maxCard = this;
                maxs = [index];
            }
            if (compareResult === 0) {
                maxs.push(index);
            }
        });
        return maxs;
    };

    allCardTypes = [CardType.Two,
            CardType.Three,
            CardType.Four,
            CardType.Five,
            CardType.Six,
            CardType.Seven,
            CardType.Eight,
            CardType.Nine,
            CardType.Ten,
            CardType.Jack,
            CardType.Queen,
            CardType.King,
            CardType.Ace
        ];
    allCardSuits = [
            CardSuit.Hearts,
            CardSuit.Diamonds,
            CardSuit.Clubs,
            CardSuit.Spades
        ];
    allCards = [];
    allCardSuits.forEach(function(cardSuit) {
        allCardTypes.forEach(function(cardType){
            allCards.push(new Card({
                type: cardType,
                suit: cardSuit
            }))
        })
    });
    allCards.push(new Card({
        type: CardType.RedJoker
    }));
    allCards.push(new Card({
        type: CardType.BlackJoker
    }));


    CardDesk.getCardDesk52 = function () {
        return allCards;
    };

    toExport.CardDesk = CardDesk;
}(window));
