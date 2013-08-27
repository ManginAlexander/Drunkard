/*global window:false*/
(function (toExport) {
    "use strict";
    toExport.Model = function (params) {
        var param;
        for (param in params) {
            if (params.hasOwnProperty(param)) {
                this[param] = params[param];
            }
        }
    };
}(window));