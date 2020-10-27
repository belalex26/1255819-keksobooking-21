"use strict";
// метка
(function () {

  const mapPinsBlock = document.querySelector(`.map__pins`);

  const onPinClick = function () {
    window.cards.getcreateCard();
  };

  const createPins = function (ads) {
    const pinsFragment = document.createDocumentFragment();
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);

    for (let i = 0; i < ads.length; i++) {
      const pin = pinTemplate.cloneNode(true);
      pin.style = `left:` + (ads[i].location.x - 25) + `px; top:` + (ads[i].location.y - 70) + `px;`;
      pin.querySelector(`img`).src = ads[i].author.avatar;
      pin.querySelector(`img`).alt = ads[i].offer.description;
      pinsFragment.appendChild(pin);
    }
    mapPinsBlock.appendChild(pinsFragment);

    mapPinsBlock.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      onPinClick(ads);
    });
  };

  const getAddress = function (pinHeight) {
    const mainPin = document.querySelector(`.map__pin--main`);
    const addressData = document.querySelector(`#address`);
    addressData.value = Math.floor(parseInt(mainPin.style.left, 10) + window.util.PIN_WIDTH / 2) + `, ` + Math.floor((parseInt(mainPin.style.top, 10) + pinHeight));
  };

  window.pin = {
    createPins: createPins,
    getAddress: getAddress
  };
})();
