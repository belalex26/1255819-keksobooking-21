'use strict';

(function () {
  const MIN_LENGTH_TITLE = 30;
  const MAX_LENGTH_TITLE = 100;
  const map = document.querySelector(`.map`);
  const formAd = document.querySelector(`.ad-form`);
  const formAdHeader = formAd.querySelector(`.ad-form-header`);
  const titleAd = formAd.querySelector(`#title`);
  const timeIn = formAd.querySelector(`#timein`);
  const timeOut = formAd.querySelector(`#timeout`);
  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  const addressInput = formAd.querySelector(`#address`);
  const submitBtn = document.querySelector(`.ad-form__submit`);
  const fieldsets = document.getElementsByTagName(`fieldset`);
  const propertyType = document.querySelector(`#type`);
  const propertyPrice = document.querySelector(`#price`);
  const formAdReset = document.querySelector(`.ad-form__reset`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const templateSuccessForm = document.querySelector(`#success`).content.querySelector(`.success`);
  const templateErrorForm = document.querySelector(`#error`).content.querySelector(`.error`);
  const pinsList = document.querySelector(`.map__pins`);
  const closeButton = document.createElement(`button`);

  const pinMainPositionLeft = mainPin.style.left;
  const pinMainPositionTop = mainPin.style.top;

  const minPriceAds = {
    bungalow: `0`,
    flat: `1000`,
    house: `5000`,
    palace: `10000`
  };

  // проверка по количеству комнат
  const roomGuestRation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const checkRoomValidity = function () {
    const roomGuests = roomGuestRation[roomNumberSelect.value];
    const message = roomGuests.indexOf(+capacitySelect.value) === -1 ? `Это количество гостей сюда не поместится` : ``;
    capacitySelect.setCustomValidity(message);
  };

  const onSubmitBtnClick = function () {
    checkRoomValidity();
  };

  const disableCapacityOptions = function (inputValue) {
    const capacityOptions = capacitySelect.querySelectorAll(`option`);
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    roomGuestRation[inputValue].forEach(function (it) {
      capacitySelect.querySelector(`option` + `[value="` + it + `"]`).disabled = false;
      capacitySelect.value = it;
    });
  };

  const onRoomNumberSelectChange = function (evt) {
    evt.target.setCustomValidity(``);
    disableCapacityOptions(roomNumberSelect.value);
  };

  roomNumberSelect.addEventListener(`change`, onRoomNumberSelectChange);
  submitBtn.addEventListener(`click`, onSubmitBtnClick);

  const checkRooms = function (peopleAmount) {
    const seatingCapacityOptions = capacitySelect.querySelectorAll(`option`);

    seatingCapacityOptions.forEach(function (option) {
      option.disabled = true;
    });

    roomGuestRation[peopleAmount].forEach(function (seatsAmount) {
      seatingCapacityOptions.forEach(function (option) {
        if (Number(option.value) === seatsAmount) {
          option.disabled = false;
          option.selected = true;
        }
      });
    });
  };

  roomNumberSelect.addEventListener(`change`, function (evt) {
    checkRooms(evt.target.value);
  });

  const validateType = function () {
    const typeForm = propertyType.value;
    const minPrice = minPriceAds[typeForm];
    propertyPrice.min = minPrice;
    propertyPrice.placeholder = minPrice;
  };

  propertyType.addEventListener(`change`, function () {
    validateType();
  });

  const onTimeInChange = function () {
    timeOut.value = timeIn.value;
  };

  const onTimeOutChange = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener(`change`, onTimeInChange);
  timeOut.addEventListener(`change`, onTimeOutChange);

  // проверка заголовка
  const validateTitle = function () {
    const valueLength = titleAd.value.length;

    if (valueLength < MIN_LENGTH_TITLE) {
      titleAd.setCustomValidity(`слишком короткое название`);
    } else if (valueLength > MAX_LENGTH_TITLE) {
      titleAd.setCustomValidity(`слишком длинное название`);
    } else {
      titleAd.setCustomValidity(``);
    }

    titleAd.reportValidity();
  };

  titleAd.addEventListener(`input`, function () {
    validateTitle();
  });

  const formTurnOff = function () {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
    formAdReset.addEventListener(`click`, onResetPress);
    validateType();
  };

  const formTurnOn = function () {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
    formAd.addEventListener(`submit`, onFormSubmit);
    formAdReset.addEventListener(`click`, onResetPress);
  };


  const setAddressOnPageNotActive = function () {
    addressInput.value = Math.floor(parseInt(mainPin.style.left, 10) + window.util.PIN_WIDTH / 2) + `, ` + Math.floor(parseInt(mainPin.style.top, 10) + window.util.PIN_HEIGTH_DISABLE);
  };

  setAddressOnPageNotActive();

  const setAddressOnPageActive = function () {
    addressInput.value = Math.floor(parseInt(mainPin.style.left, 10) + window.util.PIN_WIDTH / 2) + `, ` + Math.floor(parseInt(mainPin.style.top, 10) + window.util.PIN_HEIGTH_ACTIVE / 2);
  };

  // очистка формы

  const clearForm = function () {
    map.classList.add(`map--faded`);
    formAd.classList.add(`ad-form--disabled`);
    formAd.reset();
    window.pin.deletePins();
    window.map.closeCard();
    mainPin.style.left = pinMainPositionLeft;
    mainPin.style.top = pinMainPositionTop;
    formTurnOff(formAdHeader);
    window.filter.getDisable();
    window.pin.getAddress(window.util.PIN_HEIGTH_DISABLE);

    mainPin.addEventListener(`mousedown`, window.util.isLeftMouseButtonDown);
    mainPin.addEventListener(`keydown`, window.util.isEnterPressed);
  };

  const onResetPress = function (evt) {
    evt.preventDefault();
    clearForm();
  };

  // обработчик

  const onPopupClickSuccess = function () {
    if (window.util.isLeftMouseButtonDown || window.util.isEscPressed) {
      formAd.querySelector(`.success`).remove();
      document.removeEventListener(`keydown`, onPopupClickSuccess);
      document.removeEventListener(`mouseup`, onPopupClickSuccess);
    }
  };

  // сообщения при отправке формы

  const onFormSendSuccess = function () {
    const successPopup = templateSuccessForm.cloneNode(true);

    document.addEventListener(`keydown`, onPopupClickSuccess);
    document.addEventListener(`mouseup`, onPopupClickSuccess);
    formAd.appendChild(successPopup);
    clearForm();
    propertyType.removeEventListener(`change`, validateType);
    roomNumberSelect.removeEventListener(`change`, checkRooms);
    formAdReset.removeEventListener(`click`, onResetPress);
    formAd.removeEventListener(`submit`, onFormSubmit);
  };

  const onErrorPopupClick = function () {
    if (window.util.isLeftMouseButtonDown || window.util.isEscPressed) {
      pinsList.querySelector(`.error`).remove();
      closeButton.removeEventListener(`mouseup`, onErrorPopupClick);
      document.removeEventListener(`keydown`, onErrorPopupClick);
    }
  };

  const onFormSendError = function (errorMessage) {
    const errorPopup = templateErrorForm.cloneNode(true);
    const errorButton = errorPopup.querySelector(`.error__button`);
    const onDataSendAgain = function (evt) {
      onErrorPopupClick(evt);
      errorButton.removeEventListener(`mouseup`, onDataSendAgain);
    };

    errorPopup.querySelector(`.error__message`).textContent = errorMessage;
    errorButton.addEventListener(`mouseup`, onDataSendAgain);

    closeButton.classList.add(`error__button`);
    closeButton.textContent = `Закрыть`;

    closeButton.addEventListener(`mouseup`, onErrorPopupClick);
    document.addEventListener(`keydown`, onErrorPopupClick);

    errorPopup.appendChild(closeButton);
    pinsList.appendChild(errorPopup);
  };

  const getActive = function () {
    setAddressOnPageActive();
    map.classList.remove(`map--faded`);
    formAd.classList.remove(`ad-form--disabled`);
    formTurnOn();
    window.filter.getActive();
    formAd.addEventListener(`submit`, onFormSubmit);
    formAdReset.addEventListener(`click`, onResetPress);
    validateType();
  };

  // отправка формы

  const onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(formAd), onFormSendSuccess, onFormSendError);
  };


  window.form = {
    turnOff: formTurnOff,
    turnOn: formTurnOn,
    getActive: getActive
  };
})();

