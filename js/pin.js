"use strict";
// метка
(function () {

  const mapPinsBlock = document.querySelector(`.map__pins`);
  window.adsDataContent = [];

  const createPin = function (template, content) {
    const pinItem = template.cloneNode(true);
    pinItem.firstChild.src = content.author.avatar;
    pinItem.firstChild.alt = content.offer.title;
    pinItem.style.left = content.location.x - (window.util.PIN_WIDTH / 2) + `px`;
    pinItem.style.top = content.location.y - (window.util.PIN_HEIGTH_ACTIVE) + `px`;

    pinItem.addEventListener(`click`, function () {
      window.map.renderCard(content);
    });
    return pinItem;
  };

  const renderPins = function (pins) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(createPin(pinTemplate, pin));
    });
    mapPinsBlock.appendChild(fragment);
  };

  /*
  const getPinClick = function (cardsDataContent) {
    window.cards.createCard(cardsDataContent);
  };

  const createPins = function (ads) {
    const pinsFragment = document.createDocumentFragment();
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`button`);


    for (let i = 0; i < ads.length; i++) {
      const pin = pinTemplate.cloneNode(true);
      pin.style = `left:` + (ads[i].location.x - 25) + `px; top:` + (ads[i].location.y - 70) + `px;`;
      pin.querySelector(`img`).src = ads[i].author.avatar;
      pin.querySelector(`img`).alt = ads[i].offer.description;

      pin.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        getPinClick(ads);
      });
      adsDataContent.push(pin);
      pinsFragment.appendChild(pin);
    }
    mapPinsBlock.appendChild(pinsFragment);

  };*/

  const getAddress = function (pinHeight) {
    const mainPin = document.querySelector(`.map__pin--main`);
    const addressData = document.querySelector(`#address`);
    addressData.value = Math.floor(parseInt(mainPin.style.left, 10) + window.util.PIN_WIDTH / 2) + `, ` + Math.floor((parseInt(mainPin.style.top, 10) + pinHeight));
  };

  // удаление метки

  const deletePins = function () {
    const pins = mapPinsBlock.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let pin of pins) {
      pin.remove();
    }
  };

  window.pin = {
    renderPins: renderPins,
    getAddress: getAddress,
    deletePins: deletePins
  };
})();
