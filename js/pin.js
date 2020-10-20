"use strict";
// метка
(function () {
  const mapPinsBlock = document.querySelector(`.map__pins`);

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
  };

  const getAddress = function (pinHeight) {
    const mainPin = document.querySelector(`.map__pin--main`);
    const addressData = document.querySelector(`#address`);
    addressData.value = Math.floor(parseInt(mainPin.style.left, 10) + window.util.PIN_WIDTH / 2) + `, ` + Math.floor((parseInt(mainPin.style.top, 10) + pinHeight));
  };

  const onRenderPinsLoadSuccess = function (pin) {
    const fragment = document.createDocumentFragment();
    const PinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const PIN_COUNT = 8;
    for (let i = 0; i < PIN_COUNT; i++) {
      fragment.appendChild(window.pin.createPins(PinTemplate, pin[i]));
    }
    mapPinsBlock.appendChild(fragment);
  };
  window.pin = {
    createPins,
    getAddress,
    onRenderPinsLoadSuccess
  };
})();

