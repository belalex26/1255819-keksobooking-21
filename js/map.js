'use strict';

(function () {
  const mapActive = document.querySelector(`.map`);

  const getActive = function () {
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

  window.map = {
    getActive: getActive,
    onCardEnterPress: onCardEnterPress,
    onCardEscPress: onCardEscPress
  };
})();
