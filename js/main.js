'use strict';

(function () {

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

  // сообщения при отправке формы


  // создание метки
  const onLoadSuccess = function (ads) {
    window.filter.loadData(ads);
  };

  const getDisablePages = function () {
    window.pin.getAddress(window.util.PIN_HEIGTH_DISABLE);
    window.form.turnOff();
  };

  const getActivePages = function () {
    window.pin.getAddress(window.util.PIN_HEIGTH_ACTIVE);
    window.form.getActive();
    // window.filter.getActive();
    window.backend.load(onLoadSuccess, onLoadError);

  };

  getDisablePages();

  window.main = {
    onLoadError: onLoadError,
    getActivePages: getActivePages
  };

})();
