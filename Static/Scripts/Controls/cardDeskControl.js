(function (toExport) {
    "use strict";
    var CardDeskControl = function (options) {
        var cardCreator = options.cardCreator,
            $container = options.$container,
            cardDeskModel = options.cardDeskModel || new CardDesk();
        this.cardsControls = [];
        this.$cardDesk = cardCreator.createCardDesk(options.number);

        cardDeskModel.bind(this);
        $container.append(this.$cardDesk);

    },
        recalculateRelativePosition = function() {
            this.forEach(function(cardControl, index) {
                cardControl.$card.css("left", index);
                cardControl.$card.css("top", index);
            });
        };


    CardDeskControl.prototype.push = function(cardModel, isShowFace) {
        var cardControl = cardModel.control;
        if (isShowFace) {
            cardControl.showFace();
        } else {
            cardControl.showShirt();
        }
        this.cardsControls.push(cardControl);
        cardControl.$card
            .css("left", this.cardsControls.length)
            .css("top", this.cardsControls.length);

        this.$cardDesk.append(cardControl.$card);
    };

    CardDeskControl.prototype.unshift = function(cardModel, isShowFace) {
        var cardControl = cardModel.control;
        if (isShowFace) {
            cardControl.showFace();
        } else {
            cardControl.showShirt();
        }
        this.cardsControls.unshift(cardControl);
        recalculateRelativePosition.call(this.cardsControls);

        this.$cardDesk.prepend(cardControl.$card);
    };

    CardDeskControl.prototype.pop = function(isShowFace) {
        var returnedCard = this.cardsControls.pop();
        if (isShowFace) {
            returnedCard.showFace();
        } else {
            returnedCard.showShirt();
        }
        returnedCard.$card.remove();
        return returnedCard;
    };

    toExport.CardDeskControl = CardDeskControl;
}(window));
