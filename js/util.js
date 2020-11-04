'use strict';

(function () {
  const ESC_KEY_CODE = 27;
  const ENTER_KEY_CODE = 13;
  const LEFT_BUTTON_MOUSE_DOWN = 0;

  const isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEY_CODE;
  };

  const isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEY_CODE;
  };

  const isLeftMouseButtonDown = function (evt) {
    return evt.button === LEFT_BUTTON_MOUSE_DOWN;
  };

  window.util = {
    PIN_WIDTH: 65,
    PIN_HEIGTH_DISABLE: 33,
    PIN_HEIGTH_ACTIVE: 84,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed,
    isLeftMouseButtonDown: isLeftMouseButtonDown
  };
})();

