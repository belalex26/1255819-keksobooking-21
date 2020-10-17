'use strict';

const adDataMock = window.getAds();
const mainPin = document.querySelector(`.map__pin--main`);
const mainForm = document.querySelector(`.ad-form`);
const PIN_HEIGTH_DISABLE = 65;
const heightPinDisable = PIN_HEIGTH_DISABLE / 2;
const heightPinActve = 84;
const leftButtonMouseDown = 0;

// обработчики

const onMainPinMouseDown = function (evt) {
  if (evt.button === leftButtonMouseDown) {
    getActivePages();
  }
};

const onMainPinKeyDown = function (evt) {
  if (evt.key === `Enter`) {
    getActivePages();
  }
};

const getDisablePages = function () {
  window.getAddress(heightPinDisable);
  window.formTurnOff();
  mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);
};

const getActivePages = function () {
  mainForm.classList.remove(`ad-form--disabled`);
  window.getAddress(heightPinActve);
  window.getMapActive();
  window.formTurnOn();
  window.createPins(adDataMock);
  mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
};

getDisablePages();
