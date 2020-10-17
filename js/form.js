'use strict';

(function () {
  const fieldsets = document.getElementsByTagName(`fieldset`);

  window.formTurnOff = function () {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  };

  window.formTurnOn = function formTurnOn() {
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  /* валидация
const propertyType = document.querySelector(`#type`);
const propertyPrice = document.querySelector(`#price`);

const selectPrice = function () {
  if (propertyType.value === `bungalow`) {
    propertyPrice.setAttribute(`min`, `0`);
    propertyPrice.setAttribute(`placeholder`, `0`);
  } else if (propertyType.value === `flat`) {
    propertyPrice.setAttribute(`min`, `1000`);
    propertyPrice.setAttribute(`placeholder`, `1000`);
  } else if (propertyType.value === `house`) {
    propertyPrice.setAttribute(`min`, `5000`);
    propertyPrice.setAttribute(`placeholder`, `5000`);
  } else if (propertyType.value === `palace`) {
    propertyPrice.setAttribute(`min`, `10000`);
    propertyPrice.setAttribute(`placeholder`, `10000`);
  }
};

propertyType.addEventListener(`change`, selectPrice);
*/

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

})();
