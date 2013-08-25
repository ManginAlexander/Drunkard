(function (toExport) {
    "use strict";
    /**
     *
     * @param options {Object}
     * @constructor
     * @field name {string}
     * @field cardDesk {string}
     * @field defaultCountPlayer {Number}
     */
    toExport.DealerState = function (options) {
        this.name = options.name;
        this.cardDesk = options.cardDesk;
        this.defaultCountPlayer = options.defaultCountPlayer || 1;
    };
}(window));
