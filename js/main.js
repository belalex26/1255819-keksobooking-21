'use strict';

const TYPES = ["palace", "flat", "house", "bungalow"];
const TIMES = ["12:00", "13:00", "14:00"];
const PHOTOS= ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const priceMax = 10000;
const roomMax = 6;
const guestsMax = 10;
const countAds = 8;
const containerWidth = document.querySelector(".map").clientWidth;

const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

let getRandomArrayValue = function (arr) {
  return arr[getRandomNumber(arr.length)];
};

const shuffle = function (elements) {
  const clonedElements = elements.slice();
  for (let i = clonedElements - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [clonedElements[i], clonedElements[j]] = [clonedElements[j], clonedElements[i]];
  }
  return clonedElements;
}

const getRandomLengthArrayValues = function (elements) {
  return shuffle(elements).slice(0, getRandomNumber(elements.length));
};

let getAds = function () {
  const ads = [];
  for (let i = 1; i <= countAds; i++) {
    var locationX = getRandomNumber(0, 1200);
    var locationY = getRandomNumber(130, 630);
    let item = {
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": `ads`,
        "address": locationX + `, ` + locationY,
        "price":  getRandomNumber(priceMax),
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
  }
    ads.push(item);
  }
  return ads;
}

const adDataMock = getAds();

const getMapActive = function () {
  let mapActive = document.querySelector(".map");
  mapActive.classList.remove("map--faded");
}
getMapActive ();

//метка
const mapPinsBlock = document.querySelector(".map__pins");
const createPins = function (ads) {
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content.querySelector('button');

  for (let i = 0; i < ads.length; i++) {
    const pin = pinTemplate.cloneNode(true);
    pin.style = `left:` + (ads[i].location.x - 25) + `px; top:` + (ads[i].location.y - 70) + `px;`;
    pin.querySelector(`img`).src = ads[i].author.avatar;
    pin.querySelector(`img`).alt = ads[i].offer.description;
    pinsFragment.appendChild(pin);
  }
  mapPinsBlock.appendChild(pinsFragment);
};
createPins(adDataMock);

