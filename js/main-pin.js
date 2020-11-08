'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const POSITION_MIN_X = 0 - window.util.PIN_WIDTH / 2;
  const POSITION_MIN_Y = 121 - window.util.PIN_HEIGTH_DISABLE;

  const POSITION_MAX_X = pinsList.clientWidth - Math.floor(window.util.PIN_WIDTH / 2);
  const POSITION_MAX_Y = 621 - window.util.PIN_HEIGTH_DISABLE;

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let initialPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    const checkPosition = function (coords) {
      if (coords.x <= POSITION_MIN_X) {
        coords.x = POSITION_MIN_X;
      }
      if (coords.x >= POSITION_MAX_X) {
        coords.x = POSITION_MAX_X;
      }
      if (coords.y <= POSITION_MIN_Y) {
        coords.y = POSITION_MIN_Y;
      }
      if (coords.y >= POSITION_MAX_Y) {
        coords.y = POSITION_MAX_Y;
      }
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: initialPosition.x - moveEvt.clientX,
        y: initialPosition.y - moveEvt.clientY
      };

      initialPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      checkPosition(newCoords);

      mainPin.style.top = newCoords.y + `px`;
      mainPin.style.left = newCoords.x + `px`;

      window.map.getActive();
      window.main.getActivePages();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);

      if (upEvt.button === window.util.LEFT_BUTTON_MOUSE_DOWN) {
        window.main.getActivePages();
        window.map.getActive();
        document.removeEventListener(`mouseup`, onMouseUp);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const onMainPinKeyDown = function (e) {

    if (e.keyCode === window.util.ENTER_KEY_CODE) {
      window.main.getActivePages();
      window.map.getActive();
      document.removeEventListener(`keydown`, onMainPinKeyDown);
    }
  };
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);

})();
