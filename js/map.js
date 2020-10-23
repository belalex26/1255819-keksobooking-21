'use strict';

(function () {
  const mapActive = document.querySelector(`.map`);

  window.getMapActive = function () {
    mapActive.classList.remove(`map--faded`);
  };
})();
