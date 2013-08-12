(function (toExport) {
    "use strict";
    var EventJs = function () {
        this.handlersModels = [];
        };
    EventJs.prototype.bind = function(handler, context) {
        this.handlersModels .push({
            handler: handler,
            context: context
        });
    };
    EventJs.prototype.on = function () {
        var params = arguments;
        this.handlersModels.forEach(function (handlersModel) {
            handlersModel.handler.apply(handlersModel.context, params);
        });
    };
    toExport.EventJs = EventJs;
}(window));
