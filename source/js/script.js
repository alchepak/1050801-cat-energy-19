/* Подключение полифиллов для IE 11 */

document.createElement("picture");
svg4everybody();

/* Функции для карты */

const desktop_width = 1300;

let markerCoords = {
  lat: 59.938862,
  lng: 30.323047
}

function getMapCoords() {
  let mapLat = 59.939160;
  let mapLng = 30.319400;

  if (document.body.clientWidth < desktop_width) {
    mapLng = 30.323047;
  }

  return {
    lat: mapLat,
    lng: mapLng
  }
}

function initMap() {
  let mapBlock = document.getElementById('map');
  let destination = getMapCoords();

  let options = {
    center: destination,
    mapTypeControl: false,
    streetViewControl: false,
    scrollwheel: false,
    zoom: 17
  }

  let map = new google.maps.Map(mapBlock, options);
  let marker = new google.maps.Marker({
    icon: "../img/map-pin.png",
    position: markerCoords,
    map: map
  });

  google.maps.event.addDomListener(window, "resize", function() {
    map.setCenter(getMapCoords());
  });
}

/* Отключение режима 'Без Javascript' */

let noJs = document.querySelectorAll(".no-js");

for (let i = 0; i < noJs.length; i++) {
  noJs[i].classList.remove("no-js");
}

/* Открытие и закрытие меню с помощью кнопки-гамбургера */

let navToggle = document.querySelector(".page-header__toggle");
let mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", function() {
  this.classList.toggle("page-header__toggle--opened");
  mainNav.classList.toggle("main-nav--opened");
});

/* Обработка некорректно заполненных полей в форме */

let form = document.querySelector(".form");

if (form) {
  let submitButton = form.querySelector("[type='submit']")

  submitButton.addEventListener("click", function() {
    let invalid  = form.querySelectorAll(":required:invalid");
    for (let i = 0; i < invalid.length; i++) {
      invalid[i].classList.add("form__invalid");
    }
  });
}
