'use strict';

(function () {
  const fieldsets = document.getElementsByTagName(`fieldset`);
  // const templateSuccessForm = document.querySelector(`#success`).content.querySelector(`.success`);
  // const templateErrorForm = document.querySelector(`#error`).content.querySelector(`.error`);

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

  // проверка по количеству комнат
  const roomGuestRation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const roomNumberSelect = document.querySelector(`#room_number`);
  const capacitySelect = document.querySelector(`#capacity`);
  const submitBtn = document.querySelector(`.ad-form__submit`);

  const checkPlaceValidity = function () {
    const roomGuests = roomGuestRation[roomNumberSelect.value];
    const message = roomGuests.indexOf(+capacitySelect.value) === -1 ? `Это количество гостей сюда не поместится` : ``;
    capacitySelect.setCustomValidity(message);
  };

  const onSubmitBtnClick = function () {
    checkPlaceValidity();
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

  window.form = {
    turnOff: formTurnOff,
    turnOn: formTurnOn
  };
})();

