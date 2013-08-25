/*global Dealer:false, DrunkardControl:false, DealerState:false, CardDesk:false, $:false, document:false*/
(function () {
    "use strict";
    var drunckardControl = new DrunkardControl({
        $container: null
    }), dealer = new Dealer({
        $container: null,
        states: [new DealerState({
            defaultCountPlayer: 2,
            cardDesk: CardDesk.getCardDesk52(),
            name: "Стандартная игра"
        })]
    }),
        lightBoxBackground = $(".lightbox_background"),
        onFinishGame = function (result) {
            var finishLightbox = $(".finish-lightbox:first", lightBoxBackground);
            $(".lightbox_content_header", finishLightbox).text(result);
            lightBoxBackground.show();
            $(".finishButton:first", lightBoxBackground).click(function () {
                document.location.reload();
            });
        };

    $(".startButton", null)
        .click(function () {
            var gameSettings = dealer.getSelectedState();
            lightBoxBackground.hide();

            $(".start-lightbox:first", lightBoxBackground).hide();
            drunckardControl.startPlay(gameSettings.cardDesk, gameSettings.needMix, gameSettings.countPlayer, gameSettings.speed, onFinishGame);
        });
}());