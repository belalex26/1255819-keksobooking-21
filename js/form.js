'use strict';

(function () {
  const MIN_LENGTH_TITLE = 30;
  const MAX_LENGTH_TITLE = 100;
  const formAd = document.querySelector(`.ad-form`);
  const titleAd = formAd.querySelector(`#title`);
  const timeIn = formAd.querySelector(`#timein`);
  const timeOut = formAd.querySelector(`#timeout`);
  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  const submitBtn = document.querySelector(`.ad-form__submit`);
  const fieldsets = document.getElementsByTagName(`fieldset`);
  const propertyType = document.querySelector(`#type`);
  const propertyPrice = document.querySelector(`#price`);

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
  };

  const formTurnOn = function () {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  window.form = {
    turnOff: formTurnOff,
    turnOn: formTurnOn
  };
})();

