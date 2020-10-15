'use strict';

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIMES = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const priceMax = 10000;
const roomMax = 6;
const guestsMax = 10;
const countAds = 8;
const mainPin = document.querySelector(`.map__pin--main`);
const mainForm = document.querySelector(`.ad-form`);
const addressData = document.querySelector(`#address`);
const mapActive = document.querySelector(`.map`);
const fieldsets = document.getElementsByTagName(`fieldset`);
const PIN_WIDTH = 65;

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayValue = function (arr) {
  return arr[getRandomNumber(arr.length)];
};

const shuffle = function (elements) {
  const clonedElements = elements.slice();
  for (let i = clonedElements - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [clonedElements[i], clonedElements[j]] = [clonedElements[j], clonedElements[i]];
  }
  return clonedElements;
};

const getRandomLengthArrayValues = function (elements) {
  return shuffle(elements).slice(0, getRandomNumber(elements.length));
};

const getAds = function () {
  const ads = [];
  for (let i = 1; i <= countAds; i++) {
    const locationX = getRandomNumber(0, 1200);
    const locationY = getRandomNumber(130, 630);
    const item = {
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": `ads`,
        "address": locationX + `, ` + locationY,
        "price": getRandomNumber(priceMax),
        "type": getRandomArrayValue(TYPES),
        "rooms": getRandomNumber(roomMax),
        "guests": getRandomNumber(guestsMax),
        "checkin": getRandomArrayValue(TIMES),
        "checkout": getRandomArrayValue(TIMES),
        "features": getRandomLengthArrayValues(FEATURES),
        "description": `description`,
        "photos": getRandomLengthArrayValues(PHOTOS),
      },
      "location": {
        "x": locationX,
        "y": locationY
      }
    };
    ads.push(item);
  }
  return ads;
};

const adDataMock = getAds();

const getMapActive = function () {
  mapActive.classList.remove(`map--faded`);
};

// метка
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

// отключение формы

const formTurnOff = function () {
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
};

// адрес

const getAddress = function (pinHeight) {
  addressData.value = parseInt(mainPin.style.left, 10) + PIN_WIDTH / 2 + `, ` + (parseInt(mainPin.style.top, 10) + pinHeight);
};

// активация карты

const formTurnOn = function formTurnOn() {
  for (let i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
};

// обработчики

const onMainPinMouseDown = function(evt) {
  const leftButtonMouseDown = 0;
  if (evt.button === leftButtonMouseDown) {
    getActivePages();
  }
}

  const onMainPinKeyDown = function(evt) {
    if (evt.key === `Enter`) {
      getActivePages();
    }
  }

const getDisablePages = function () {
  getAddress(65);
  formTurnOff();
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);
};

getDisablePages();

const getActivePages = function () {
  mainForm.classList.remove(`ad-form--disabled`);
  getAddress(84);
  getMapActive();
  formTurnOn();
  createPins(adDataMock);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
};
/*
const propertyType = document.querySelector(`#type`);
const propertyPrice = document.querySelector(`#price`);

const selectPrice = function () {
  if (propertyType.value === `bungalow`) {
    propertyPrice.setAttribute(`min`, `0`);
    propertyPrice.setAttribute(`placeholder`, `0`);
  } else if (propertyType.value === `flat`) {
    propertyPrice.setAttribute(`min`, `1000`);
    propertyPrice.setAttribute(`placeholder`, `1000`);
  } else if (propertyType.value === `house`) {
    propertyPrice.setAttribute(`min`, `5000`);
    propertyPrice.setAttribute(`placeholder`, `5000`);
  } else if (propertyType.value === `palace`) {
    propertyPrice.setAttribute(`min`, `10000`);
    propertyPrice.setAttribute(`placeholder`, `10000`);
  }
};

propertyType.addEventListener(`change`, selectPrice);
*/

// проверка по количеству комнат
const RoomGuestRation = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const roomNumberSelect = document.querySelector(`#room_number`);
const capacitySelect = document.querySelector(`#capacity`);
const submitBtn = document.querySelector(`.ad-form__submit`);

const checkPlaceValidity = function () {
  const roomGuests = RoomGuestRation[roomNumberSelect.value];
  const message = roomGuests.indexOf(+capacitySelect.value) === -1 ? `Это количество гостей сюда не поместится` : ``;
  capacitySelect.setCustomValidity(message);
};

const onSubmitBtnClick = function () {
  checkPlaceValidity();
};

const disableСapacityOptions = function (inputValue) {
  const capacityOptions = capacitySelect.querySelectorAll(`option`);
  capacityOptions.forEach(function (it) {
    it.disabled = true;
  });
  RoomGuestRation[inputValue].forEach(function (it) {
    capacitySelect.querySelector(`option` + `[value="` + it + `"]`).disabled = false;
    capacitySelect.value = it;
  });
};

const onRoomNumberSelectChange = function (evt) {
  evt.target.setCustomValidity(``);
  disableСapacityOptions(roomNumberSelect.value);
};

roomNumberSelect.addEventListener(`change`, onRoomNumberSelectChange);
submitBtn.addEventListener(`click`, onSubmitBtnClick);
