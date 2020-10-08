'use strict';

  const TYPES = ["palace", "flat", "house", "bungalow"];
  const TIMES = ["12:00", "13:00", "14:00"];
  const PHOTOS= ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  const priceMax = 10000;
  const roomMax = 6;
  const guestsMax = 10;
  const countAds = 8;

let getRandomNumber = function (max, offset = 0) {
  return Math.floor((Math.random() * Math.floor(max)) + offset);
};

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

let getRandomArrayValue = function (arr) {
  return arr[getRandomNumber(arr.length)];
};

/*
let getNewArr = function (arr) {
  let newArr = arr.slice (0, arr.length - 1);
  return newArr;
};

function shuffle(newArr) {
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
//тестирование
shuffle(PHOTOS);
console.log (PHOTOS);
*/

let getRandomLengthArrayValues = function (arr) {
  return arr.filter(() => {
    return getRandomNumber(2);
  });
};

let getAds = function () {
  let ads = new Array();
  for (var i = 1; i <= countAds; i++) {
    let item = {
      "author": {
        "avatar": `img/avatars/user0${i}.png`
      },
      "offer": {
        "title": `ads`,
        "address": `${getRandomCoordinateX()}, ${getRandomCoordinateY()}`,
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
        "x": getRandomCoordinateX(),
        "y": getRandomCoordinateY()
    }
  }
    ads.push(item);
  }
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

  for (let i = 1; i < countAds; i++) {
    const pin = pinTemplate.cloneNode(true);
    pin.style = `left:` + `${getRandomCoordinateX()}` + `px; top:` +`${getRandomCoordinateY()}` + `px;`;
    pin.querySelector(`img`).src = `img/avatars/user0${i}.png`;
    pin.querySelector(`img`).alt = `ads`;
    pinsFragment.appendChild(pin);
  }

  mapPinsBlock.appendChild(pinsFragment);
}
createPins(adDataMock);

