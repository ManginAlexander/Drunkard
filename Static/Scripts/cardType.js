/*global window:false*/
(function (toExport) {
    "use strict";
    /**
     * Типы карт
     * @param options {Object}
     * @field name {string} название типа карт
     * @field power {number} сила карты
     * @constructor
     */
    var CardType = function (options) {
        this.name = options.name;
        this.power = options.power;
    };
    CardType.prototype.compare = function (otherCardType) {
        if (this.power === otherCardType.power) {
            return 0;
        }
        return this.power > otherCardType.power ? -1 : 1;
    };
    CardType.RedJoker = new CardType({
        name: "Красный Джокер",
        power: 15
    });
    CardType.BlackJoker = new CardType({
        name: "Черный Джокер",
        power: 15
    });
    CardType.Ace = new CardType({
        name: "Туз",
        power: 14
    });
    CardType.King = new CardType({
        name: "Король",
        power: 13
    });
    CardType.Queen = new CardType({
        name: "Дама",
        power: 12
    });
    CardType.Jack = new CardType({
        name: "Валет",
        power: 11
    });
    CardType.Ten = new CardType({
        name: "Десятка",
        power: 10
    });
    CardType.Nine = new CardType({
        name: "Девятка",
        power: 9
    });
    CardType.Eight = new CardType({
        name: "Восьмерка",
        power: 8
    });
    CardType.Seven = new CardType({
        name: "Семерка",
        power: 7
    });
    CardType.Six = new CardType({
        name: "Шестерка",
        power: 6
    });
    CardType.Five = new CardType({
        name: "Пятерка",
        power: 5
    });
    CardType.Four = new CardType({
        name: "Четверка",
        power: 4
    });
    CardType.Three = new CardType({
        name: "Тройка",
        power: 3
    });
    CardType.Two = new CardType({
        name: "Двойка",
        power: 2
    });
    toExport.CardType = CardType;
}(window));