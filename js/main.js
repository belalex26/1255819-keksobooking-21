'use strict';

let getRandomData = function () {
  const TYPES = ["palace", "flat", "house", "bungalow"];
  const TIMES = ["12:00", "13:00", "14:00"];
  const PHOTOS= ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  let priceMax = 30000;
  let roomMax = 6;
  let guestsMax = 10;
  let advertising = [];
  let countAds = 8;

  //случайное число
  let getRandomNumber = function (max, offset = 0) {
    return Math.floor((Math.random() * Math.floor(max)) + offset);
  };

   //случайный текст
  let getRandomText = function (max) {
    let text = "";
    let possibleValue = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

    for (let i = 0; i < max; i++) {
      text += possibleValue.charAt(getRandomNumber(possibleValue.length));
    }
    return text;
  };

  //cлучайный массив
  let getRandomArrayValue = function () {
    return arr[getRandomNumber(arr.length)];
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

  //наполнение объектами
  for (i = 0; i <= countAds; i++) {
    let item = {
      "author": {
        "avatar": "img/avatars/user0${i}.png"
      },
    "offer": {
        "title": getRandomText (8),
        "address": "${getRandomCoordinateX()}, ${getRandomCoordinateY()}",
        "price":  getRandomNumber(priceMax),
        "type": getRandomArrayValue(TYPES),
        "rooms": getRandomNumber(roomMax),
        "guests": getRandomNumber(guestsMax),
        "checkin": getRandomArrayValue(TIMES),
        "checkout": getRandomArrayValue(TIMES),
        "features": getRandomLengthArrayValues(FEATURES),
        "description": getRandomText (280),
        "photos": getRandomLengthArrayValues(PHOTOS),
    },
    "location": {
        "x": getRandomCoordinateX(),
        "y": getRandomCoordinateY()
    }
  }
    advertising.push(item);
  };

return advertising;
};












var mapActive = document.querySelector(".map");

mapActive.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapActive.classList.remove("map--faded");
});
