/*global window:false*/
(function (toExport) {
    "use strict";
    /**
     * Масти карт
     * @param options {Object}
     * @field name {string} название масти
     * @constructor
     */
    var CardSuit = function (options) {
        this.name = options.name;
    };
    CardSuit.Hearts = new CardSuit({
        name: "Черви"
    });
    CardSuit.Diamonds  = new CardSuit({
        name: "Бубни"
    });
    CardSuit.Clubs  = new CardSuit({
        name: "Крести"
    });
    CardSuit.Spades  = new CardSuit({
        name: "Пика"
    });

    toExport.CardSuit = CardSuit;
}(window));