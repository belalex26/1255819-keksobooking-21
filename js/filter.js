'use strict';

const MAX_COUNT = 5;
const MAX_PRICE = 50000;
const MIN_PRICE = 10000;
const mapFilterForm = document.querySelector(`.map__filters`);
const filterFormSelectElements = mapFilterForm.querySelectorAll(`.map__filter`);
const filterFormFeaturesElement = mapFilterForm.querySelector(`.map__features`);
const typeFilter = mapFilterForm.querySelector(`#housing-type`);
const priceFilter = mapFilterForm.querySelector(`#housing-price`);
const roomsFilter = mapFilterForm.querySelector(`#housing-rooms`);
const guestsFilter = mapFilterForm.querySelector(`#housing-guests`);
const mapFilters = document.querySelector(`.map__filters-container`);

const getFilterType = function (data) {
  return (typeFilter.value !== `any`) ? typeFilter.value === data.offer.type : true;
};

const getFilterPrice = function (data) {
  return priceFilter.value === `any` ||
    (priceFilter.value === `low` && data.offer.price < MIN_PRICE) ||
    (priceFilter.value === `middle` && (data.offer.price >= MIN_PRICE && data.offer.price <= MAX_PRICE)) ||
    (priceFilter.value === `high` && data.offer.price > MAX_PRICE);
};

const getFilterRooms = function (data) {
  return roomsFilter.value !== `any` ? +roomsFilter.value === data.offer.rooms : true;
};

const getFilterGuests = function (data) {
  return guestsFilter.value !== `any` ? +guestsFilter.value === data.offer.guests : true;
};

const getFilterFeatures = function (data) {
  const checkedFilterFeatures = filterFormFeaturesElement.querySelectorAll(`.map__checkbox:checked`);

  if (checkedFilterFeatures.length === 0) {
    return true;
  }

  let isFeature = true;

  checkedFilterFeatures.forEach(function (checkedFeature) {
    if (!data.offer.features.includes(checkedFeature.value)) {
      isFeature = false;
    }
  });

  return isFeature;
};

const applyAll = function (data) {
  return data.filter(function (item) {
    return getFilterType(item) &&
      getFilterPrice(item) &&
      getFilterRooms(item) &&
      getFilterGuests(item) &&
      getFilterFeatures(item);
  }).slice(0, MAX_COUNT);
};

const loadData = function (data) {
  window.dataAds = data;
  window.pin.renderPins(applyAll(window.dataAds));
};

const updateFilter = function () {
  window.pin.deletePins();
  window.map.closeCard();
  window.pin.renderPins(applyAll(window.dataAds));
};

const hideFormIfError = function () {
  mapFilters.style.display = `none`;
};

const getDisable = function () {
  filterFormSelectElements.forEach(function (element) {
    element.disabled = true;
  });
  filterFormFeaturesElement.disabled = true;

  mapFilterForm.reset();
  mapFilterForm.removeEventListener(`change`, window.debounce.shake(updateFilter));
};

const getActive = function () {
  filterFormSelectElements.forEach(function (element) {
    element.disabled = false;
  });
  filterFormFeaturesElement.disabled = false;
  mapFilterForm.addEventListener(`change`, window.debounce.shake(updateFilter));
};

window.filter = {
  loadData: loadData,
  hideFormIfError: hideFormIfError,
  getDisable: getDisable,
  getActive: getActive
};

