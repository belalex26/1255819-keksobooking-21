'use strict';

(function () {
  const mainPin = document.querySelector(`.map__pin--main`);
  const mainForm = document.querySelector(`.ad-form`);
  const leftButtonMouseDown = 0;

  // блок с ошибкой

  const onLoadError = function (errorMessage) {
    const element = document.createElement(`div`);

    element.style.left = 0;
    element.style.right = 0;
    element.style.position = `absolute`;
    element.style = `text-align: center; z-index: 300; margin: 0 auto; background-color: #cc0605; color: #ffffff`;
    element.style.fontSize = `28px`;
    element.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, element);
  };

  // создание метки
  const onLoadSuccess = function (ads) {
    window.pin.createPins(ads);
  };

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
    window.pin.getAddress(window.util.PIN_HEIGTH_DISABLE);

    window.form.turnOff();
    mainPin.addEventListener(`mousedown`, onMainPinMouseDown);
    mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  };

  const getActivePages = function () {
    mainForm.classList.remove(`ad-form--disabled`);
    window.pin.getAddress(window.util.PIN_HEIGTH_ACTIVE);
    window.getMapActive();
    window.form.turnOn();
    window.backend.load(onLoadSuccess, onLoadError);
    mainPin.removeEventListener(`mousedown`, onMainPinMouseDown);
    mainPin.removeEventListener(`keydown`, onMainPinKeyDown);
  };

  getDisablePages();

})();
