'use strict';

(function () {
  const MAX_COUNT = 5;
  const mapFilterForm = document.querySelector(`.map__filters`);
  const filterFormSelectElements = mapFilterForm.querySelectorAll(`.map__filter`);
  const filterFormFeaturesElement = mapFilterForm.querySelector(`.map__features`);
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
    window.pin.renderPins(applyAll(window.dataAds));
  };

  housingTypeFilterElement.addEventListener(`change`, function () {
    window.pin.deletePins();
    window.pin.renderPins(applyAll(window.dataAds));
  });

  const hideFormIfError = function () {
    mapFilters.style.display = `none`;
  };

  const getDisabled = function () {
    filterFormSelectElements.forEach(function (element) {
      element.disabled = true;
    });
    filterFormFeaturesElement.disabled = true;

    mapFilterForm.reset();
    mapFilterForm.removeEventListener(`change`, window.debounce.shake(window.filter.onFiltersUpdate));
  };

  const getActivated = function () {
    filterFormSelectElements.forEach(function (element) {
      element.disabled = false;
    });
    filterFormFeaturesElement.disabled = false;

    mapFilterForm.addEventListener(`change`, window.debounce.shake(window.filter.onFiltersUpdate));
  };

  window.filter = {
    loadData: loadData,
    hideFormIfError: hideFormIfError,
    getDisabled: getDisabled,
    getActivated: getActivated
  };

})();
