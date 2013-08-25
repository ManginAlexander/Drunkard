/*global window:false*/
(function (toExport) {
    "use strict";
    var RoundState = function (name) {
        this.name = name;
    };

    RoundState.Start = new RoundState("start");  //начало боя, карты для боя еще не разложены
    RoundState.Init = new RoundState("init");  //карты подготовлены к бою
    RoundState.Battle = new RoundState("battle"); //конец боя...
    RoundState.Draw = new RoundState("draw"); //ничья
    RoundState.Finish = new RoundState("finish"); //есть победитель

    toExport.RoundState = RoundState;
}(window));
