'use strict';

(function () {
  const mapFilterForm = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = mapFilterForm.querySelector(`#housing-type`);
  const MAX_COUNT = 5;

  const getTypeFilter = function (data) {
    return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
  };

  const applyAll = function (data) {
    return data.filter(function (item) {
      return getTypeFilter(item);
    }).slice(0, MAX_COUNT);
  };

  const onLoadDataSuccess = function (data) {
    window.DATA = data;
    window.pin.createPins(applyAll(window.DATA));
  };

  housingTypeFilterElement.addEventListener(`change`, () =>{
    window.pin.deletePins();
    window.pin.createPins(applyAll(window.DATA));
  });

  window.filter = {
    onLoadDataSuccess: onLoadDataSuccess
  };

})();
