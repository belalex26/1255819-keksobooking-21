'use strict';

//Напишите функцию для создания массива из 8 сгенерированных JS объектов. Каждый объект массива ‐ описание похожего объявления неподалёку. Структура объектов должна быть следующей:
//У блока .map уберите класс .map--faded
//На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin

const ads = [

];


var mapActive = document.querySelector(".map");

mapActive.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapActive.classList.remove("map--faded");
});
