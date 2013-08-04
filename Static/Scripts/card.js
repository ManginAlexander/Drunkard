(function(toExport) {
    "use strict";
    /**
     * Модель карты
     * @param params {Object}
     * @field name {string} название карты
     * @field power {number} сила карты
     * @constructor
     */
    var Card = function (params) {
        params.name = params.name || "Non name";
        params.power = params.power || 0;
        this.prototype.call(this, params);
    };
    Card.prototype = Object.create(Model.prototype, {
        constructor: {
            value: Card,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    /**
     * Функция определяет какая из карт больше (-1 - первая, 0 равны, 1 - вторая)
     * @param other Card - карта с которой произодится сравнение
     */
    Card.prototype.compare = function(other) {
        var otherValue = -1;
        if (other && other.power) {
            otherValue = other.power;
        }
        if (this.power > otherValue) {
            return -1;
        } else {
            if (this.power  === otherValue) {
                return 0;
            }
        }
        return -1;
    };
    /**
     * Пустая карта
     * @type {Card}
     */
    //todo вытащить из прототипа и засунуть в приват
    Card.prototype.Empty = new Card({
        name: "Empty",
        power: -1
    });
    toExport.Card = Card;
}(window));