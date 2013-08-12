(function (toExport) {
    "use strict";
    /**
     * Объект моделирует карточную колоду
     * @constructor
     * @field cards {Card[]} массив карт
     * @field onPush {EventJs} событие добавления карты в колоду
     * @field onPop {EventJs} событие изъятия карты из колоды
     * @field cards {Card[]} массив карт
     */
    var CardDesk = function () {
        this.cards =  [];
        this.onPop = new EventJs();
        this.onPush = new EventJs();
    },
        allCardTypes,
        allCardSuits,
        allCards;
    CardDesk.prototype.bind = function(control) {
        this.control = control;
        this.onPush.bind(control.push, control);
        this.onPop.bind(control.pop, control);
    };

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
    CardDesk.prototype.push = function (card) {
        this.cards.push(card);
        this.onPush.on(card);
    };
    CardDesk.prototype.add = function (cards) {
        var self = this;
        cards.forEach(function(card) {
            self.push(card);
        })
    };
    CardDesk.prototype.empty = function () {
        var removed= this;
        cards.forEach(function(card) {
            self.push(card);
        })
    };
    CardDesk.prototype.peek = function () {
        return this.cards.peek();
    };
    CardDesk.prototype.pop = function () {
        var returnedCard = this.cards.pop();
        if (!returnedCard) {
            return;
        }
        this.onPop.on(returnedCard);
        return returnedCard;
    };
    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Перемешать карточную колоду.
     */
    CardDesk.prototype.mix = function () {
        var from, to, temp;
        for(from = 0; from < this.cards.length; from +=1) {
            to = getRandomInt(0, this.cards.length - 1);

            temp = this.cards[from];
            this.cards[from] = this.cards[to];
            this.cards[to] = temp;
        }
    };

    CardDesk.prototype.divide = function (divisor) {
        var intCount = Math.floor(this.cards.length / divisor),
            extraCards = this.cards.length - intCount*divisor,
            result = [],
            start = 0,
            count = 0,
            currentCards,
            i;

        for(i = 0; i < divisor; i +=1 ) {
            count = extraCards <= i? intCount+1: intCount; //В первые колоды попадают лишние карты
            currentCards = this.cards.slice(start, start + count);
            result.push(currentCards);
            start += count;
        }
        return result;
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
        var newCardDesk = new CardDesk();
        newCardDesk.add(allCards);
        return newCardDesk;
    };

    toExport.CardDesk = CardDesk;
}(window));
