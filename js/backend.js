'use strict';
(function () {
  const URL_DOWNLOAD = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        window.filter.hideFormIfError();
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
      window.filter.hideFormIfError();
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
      window.filter.hideFormIfError();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL_DOWNLOAD);
    xhr.send();
  };

  const upload = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          onError(`Произошла ошибка сервера: неверный запрос`);
          break;
        case 401:
          onError(`Произошла ошибка сервера: пользователь не авторизован`);
          break;
        case 404:
          onError(`Произошла ошибка сервера: запрашиваемый ресурс не найден`);
          break;
        case 500:
          onError(`Произошла внутренняя ошибка сервера`);
          break;
        default:
          onError(`Произошла ошибка сервера: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
