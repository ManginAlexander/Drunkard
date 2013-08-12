(function (toExport) {
    "use strict";
    if (!Array.prototype.peek) {
        Array.prototype.peek = function () {
            if (this.length  > 0) {
                return this[this.length - 1];
            }

            return undefined;
        }
    }
}(window));
