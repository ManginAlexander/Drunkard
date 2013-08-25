(function (toExport) {
    "use strict";
    var Dealer = function (options) {
        this.states = options.states;
        this.$container = options.$container;
        this.$countPlayerControl = $(".dealer_countPlayer", this.$container);
        this.$isMixControl= $(".dealer_isMix", this.$container);
        this.$cardDeskSwitcherControl = $(".dealer_cardDeskSwitcher", this.$container);
        this.$speedControl= $(".dealer_speed", this.$container);
        initCardDeskControl.call(this);
    },
        initCardDeskControl,
        changeCardDesk,
        generateCountPlayerOptions;

    initCardDeskControl = function() {
        var optionsControl = this.states.map(function(state, index) {
            return $("<option/>", {
                text: state.name,
                value: index
            })
        });
        optionsControl[0]
            .attr("selected", "selected");
        this.$cardDeskSwitcherControl
            .empty()
            .append(optionsControl)
            .change(changeCardDesk.bind(this));
        changeCardDesk.call(this,1);
    };
    changeCardDesk = function(rowCardDeskIndex) {
        var cardDeskIndex = parseInt(rowCardDeskIndex) - 1,
            countPlayers = generateCountPlayerOptions.call(this, cardDeskIndex);
        this.$countPlayerControl
            .empty()
            .append(countPlayers);

        this.$isMixControl.removeAttr("checked");
    };
    generateCountPlayerOptions = function(cardDeskIndex) {
        var defaultCountPlayer = this.states[cardDeskIndex].defaultCountPlayer;
        return MyLib
            .range(1, this.states[cardDeskIndex].cardDesk.cards.length)
            .map(function(countPlayer) {
                var item = $("<option/>", {
                    text: countPlayer,
                    value: countPlayer
                });
                if (defaultCountPlayer === countPlayer) {
                    item.attr("selected","selected");
                }
                return item;
            });
    };

    Dealer.prototype.getSelectedState = function() {
        var selectedCardDeskIndex = parseInt($(":selected", this.$cardDeskSwitcherControl).attr("value")),
            countPlayers = parseInt($(":selected", this.$countPlayerControl).attr("value")),
            needMix = $(":checked", this.$isMixControl).length === 1,
            speed = 50* parseInt($(":selected", this.$speedControl).attr("value"));

        return {
            cardDesk: this.states[selectedCardDeskIndex].cardDesk,
            countPlayer: countPlayers,
            needMix: needMix,
            speed: speed
        };
    };

    toExport.Dealer = Dealer;
}(window));
