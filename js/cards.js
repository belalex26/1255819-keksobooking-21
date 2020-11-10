'use strict';

(function () {
  const templateCard = document.querySelector(`#card`);

  const houseTypes = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  const rooms = {
    ZERO: 0,
    ONE: 1,
    FIVE: 5,
  };

  const guests = {
    ZERO: 0,
    ONE: 1,
  };

  const checkElementForData = function (content, element) {
    if (!content) {
      element.style.display = `none`;
    }
  };

  const verifyQuantityRoomsGuests = (container, dataRooms, dataGuests) => {
    container.textContent = dataRooms + ` комнаты для ` + dataGuests + ` гостей`;
    if (dataRooms === rooms.ONE && dataGuests === guests.ONE) {
      container.textContent = dataRooms + ` комната для ` + dataGuests + ` гостя`;
    } else if (dataRooms === rooms.ONE) {
      container.textContent = dataRooms + ` комната для ` + dataGuests + ` гостей`;
    } else if (dataRooms === rooms.FIVE && dataGuests === guests.ONE) {
      container.textContent = dataRooms + ` комнат для ` + dataGuests + ` гостя`;
    } else if (dataRooms === rooms.FIVE) {
      container.textContent = dataRooms + ` комнат для ` + dataGuests + ` гостей`;
    } else if (dataRooms === rooms.ZERO && dataGuests === guests.ZERO) {
      container.textContent = dataRooms + ` комнат для ` + dataGuests + ` гостей`;
    }
  };

  const renderPhotos = function (container, data) {
    container.innerHTML = ``;
    data.forEach(function (src) {
      const photoCreateElement = document.createElement(`img`);
      photoCreateElement.classList.add(`popup__photo`);
      photoCreateElement.setAttribute(`width`, `45`);
      photoCreateElement.setAttribute(`height`, `40`);
      photoCreateElement.src = src;
      container.appendChild(photoCreateElement);
    });
  };

  const renderFeatures = function (container, data) {
    container.innerHTML = ``;
    data.forEach(function (feature) {
      const featureCreateElement = document.createElement(`li`);
      featureCreateElement.classList.add(`popup__feature`);
      featureCreateElement.classList.add(`popup__feature--` + feature);
      container.appendChild(featureCreateElement);
    });
  };

  const createCard = function (cardsContent) {
    const adsCardTemplate = templateCard.content.querySelector(`.popup`);
    const adsCard = adsCardTemplate.cloneNode(true);

    adsCard.querySelector(`.popup__title`).textContent = cardsContent.offer.title;
    adsCard.querySelector(`.popup__text--address`).textContent = cardsContent.offer.address;
    adsCard.querySelector(`.popup__text--price`).textContent = cardsContent.offer.price + `₽/ночь`;
    adsCard.querySelector(`.popup__type`).textContent = houseTypes[cardsContent.offer.type];
    adsCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + cardsContent.offer.checkin + `, выезд до ` + cardsContent.offer.checkout;
    adsCard.querySelector(`.popup__avatar`).src = cardsContent.author.avatar;

    checkElementForData(cardsContent.offer.title, adsCard.querySelector(`.popup__title`));
    checkElementForData(cardsContent.offer.address, adsCard.querySelector(`.popup__text--address`));
    checkElementForData(cardsContent.offer.price, adsCard.querySelector(`.popup__text--price`));
    checkElementForData(cardsContent.offer.type, adsCard.querySelector(`.popup__type`));
    checkElementForData(cardsContent.offer.checkin, adsCard.querySelector(`.popup__text--time`));
    checkElementForData(cardsContent.offer.checkout, adsCard.querySelector(`.popup__text--time`));
    checkElementForData(cardsContent.offer.features, adsCard.querySelector(`.popup__features`));
    checkElementForData(cardsContent.offer.description, adsCard.querySelector(`.popup__description`));
    checkElementForData(cardsContent.offer.photos, adsCard.querySelector(`.popup__photos`));
    checkElementForData(cardsContent.author.avatar, adsCard.querySelector(`.popup__avatar`));

    renderFeatures(adsCard.querySelector(`.popup__features`), cardsContent.offer.features);
    renderPhotos(adsCard.querySelector(`.popup__photos`), cardsContent.offer.photos);
    verifyQuantityRoomsGuests(adsCard.querySelector(`.popup__text--capacity`), cardsContent.offer.rooms, cardsContent.offer.guests);

    adsCard.querySelector(`.popup__close`).addEventListener(`click`, function () {
      window.map.closeCard();
    });
    adsCard.querySelector(`.popup__close`).addEventListener(`keydown`, window.map.onCardEnterPress);
    document.addEventListener(`keydown`, window.map.onCardEscPress);

    return adsCard;
  };

  window.cards = {
    createCard: createCard
  };

})();
