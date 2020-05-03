/* Подключение полифиллов для IE 11 */

document.createElement("picture");
svg4everybody();

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
