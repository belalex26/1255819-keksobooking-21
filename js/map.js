'use strict';

(function () {
  const mapActive = document.querySelector(`.map`);

  const getMapActive = function () {
    mapActive.classList.remove(`map--faded`);
  };

  const closeCard = function () {
    const cardElement = mapActive.querySelector(`.map__card`);
    if (cardElement) {
      mapActive.removeChild(cardElement);
      document.removeEventListener(`keydown`, onCardEscPress);
    }
  };

  const onCardEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      closeCard();
    }
  };

  const onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };

  const renderCard = function (data) {
    const card = document.querySelector(`.map__card`);
    if (card) {
      card.remove();
    }
    mapActive.appendChild(window.cards.getcreateCard(data));
  };

  window.map = {
    getMapActive: getMapActive,
    renderCard: renderCard,
    onCardEnterPress: onCardEnterPress,
    onCardEscPress: onCardEscPress
  };
})();
