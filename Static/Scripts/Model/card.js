/*global Model:false, window:false*/
(function (toExport) {
    "use strict";
    /**
     * Модель карты
     * @param params {Object}
     * @field type {CardType} название карты
     * @field suit {CardSuit} сила карты
     * @constructor
     */
    var Card = function (params) {
        params = params || {};
        Model.call(this, params);
    };
    Card.prototype = Object.create(Model.prototype, {
        constructor: {
            value: Card,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    Card.prototype.bind = function (control) {
        this.control = control;
    };
    /**
     * Функция определяет какая из карт больше (-1 - первая, 0 равны, 1 - вторая)
     * @param otherCard Card - карта с которой произодится сравнение
     */
    Card.prototype.compare = function (otherCard) {
        return this.type.compare(otherCard.type);
    };
    toExport.Card = Card;
}(window));