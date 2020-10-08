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

let getRandomNumber = function (max, offset = 0) {
  return Math.floor((Math.random() * Math.floor(max)) + offset);
};

/*
//координаты
 let getRandomCoordinateX = function () {
  let containerWidth = document.querySelector(".map").clientWidth;
  return getRandomNumber(containerWidth + 1);
};

let getRandomCoordinateY = function () {
  const COORDINATE_Y_RANGE = 500;
  const COORDINATE_Y_OFFSET = 130;
  return getRandomNumber(COORDINATE_Y_RANGE, COORDINATE_Y_OFFSET);
};

*/

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
    var locationX = getRandomNumber(containerWidth + 1);
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
    return locationX, locationY;
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
let createPins = function () {
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector("#pin").content.querySelector("button");

  for (let i = 1; i <= countAds; i++) {
    const pin = pinTemplate.cloneNode(true);
    pin.style = `left:` + adDataMock.locationX + `px; top:` + adDataMock.locationY + `px;`;
    pin.querySelector(`img`).src = `img/avatars/user0${i}.png`;
    pin.querySelector(`img`).alt = `ads`;
    pinsFragment.appendChild(pin);
  }

  mapPinsBlock.appendChild(pinsFragment);
}
createPins(adDataMock);

