'use strict';

(function () {
  const mapActive = document.querySelector(`.map`);

  const getMapActive = function () {
    mapActive.classList.remove(`map--faded`);
  };

  const renderCard = function (data) {
    const card = document.querySelector(`.map__card`);
    if (card) {
      card.remove();
    }
    mapActive.appendChild(window.createCard(data));
  };

  window.map = {
    getMapActive: getMapActive,
    renderCard: renderCard
  };
})();
