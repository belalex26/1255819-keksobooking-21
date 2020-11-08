'use strict';

(function () {
  const INTERVAL_DEBOUNCE = 500;

  const shake = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(() => {
        cb.call(null, ...parameters);
      }, INTERVAL_DEBOUNCE);
    };
  };

  window.debounce = {
    shake: shake
  };
})();
