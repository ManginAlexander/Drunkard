/*global window: false*/
(function (toExport) {
    "use strict";
    var MyLib = {

    };

    MyLib.range = function (from, to) {
        var result = [],
            i;
        for (i = from; i <= to; i += 1) {
            result.push(i);
        }
        return result;
    };



    toExport.MyLib = MyLib;
}(window));
