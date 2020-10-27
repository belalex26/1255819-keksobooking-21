'use strict';

(function () {
  const MAX_COUNT = 5;
  const mapFilterForm = document.querySelector(`.map__filters`);
  const housingTypeFilterElement = mapFilterForm.querySelector(`#housing-type`);
  const mapFilters = document.querySelector(`.map__filters-container`);

  const getTypeFilter = function (data) {
    return (housingTypeFilterElement.value !== `any`) ? housingTypeFilterElement.value === data.offer.type : true;
  };

  const applyAll = function (data) {
    return data.filter(function (item) {
      return getTypeFilter(item);
    }).slice(0, MAX_COUNT);
  };

  const loadData = function (data) {
    window.dataAds = data;
    window.pin.createPins(applyAll(window.dataAds));
  };

  housingTypeFilterElement.addEventListener(`change`, () =>{
    window.pin.deletePins();
    window.pin.createPins(applyAll(window.dataAds));
  });

  const hideFormIfError = function () {
    mapFilters.style.display = `none`;
  };

  window.filter = {
    loadData: loadData,
    hideFormIfError: hideFormIfError
  };

})();
