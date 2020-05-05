/* Подключение полифиллов для IE 11 */

document.createElement("picture");
svg4everybody();

/* Функции для карты */

var desktop_width = 1300;

var markerCoords = {
  lat: 59.938862,
  lng: 30.323047
}

function getMapCoords() {
  var mapLat = 59.939160;
  var mapLng = 30.319400;

  if (document.body.clientWidth < desktop_width) {
    mapLng = 30.323047;
  }

  return {
    lat: mapLat,
    lng: mapLng
  }
}

function initMap() {
  var mapBlock = document.getElementById("map");
  var destination = getMapCoords();

  var options = {
    center: destination,
    mapTypeControl: false,
    streetViewControl: false,
    scrollwheel: false,
    zoom: 17
  }

  var map = new google.maps.Map(mapBlock, options);
  var marker = new google.maps.Marker({
    icon: "img/map-pin.png",
    position: markerCoords,
    map: map
  });

  google.maps.event.addDomListener(window, "resize", function() {
    map.setCenter(getMapCoords());
  });
}

/* Отключение режима "Без Javascript" */

var noJs = document.querySelectorAll(".no-js");

for (var i = 0; i < noJs.length; i++) {
  noJs[i].classList.remove("no-js");
}

/* Открытие и закрытие меню с помощью кнопки-гамбургера */

var navToggle = document.querySelector(".page-header__toggle");
var mainNav = document.querySelector(".main-nav");

navToggle.addEventListener("click", function() {
  this.classList.toggle("page-header__toggle--opened");
  mainNav.classList.toggle("main-nav--opened");
});

/* Обработка некорректно заполненных полей в форме */

var form = document.querySelector(".form");

if (form) {
  var submitButton = form.querySelector("[type='submit']")

  submitButton.addEventListener("click", function() {
    var invalid  = form.querySelectorAll(":required:invalid");
    for (var i = 0; i < invalid.length; i++) {
      invalid[i].classList.add("form__invalid");
    }
  });
}
