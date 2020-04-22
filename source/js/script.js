let noJs = document.querySelectorAll('.no-js');
let navToggle = document.querySelector('.page-header__toggle');
let mainNav = document.querySelector('.main-nav');

for (let i = 0; i < noJs.length; i++) {
  noJs[i].classList.remove('no-js');
}

navToggle.addEventListener('click', function() {
  this.classList.toggle('page-header__toggle--opened');
  mainNav.classList.toggle('main-nav--opened');
});

let changerControl = document.querySelectorAll(".changer__control");
let changerCheckbox = document.querySelector(".changer__checkbox");

for (let i = 0; i < changerControl.length; i++) {
  changerControl[i].addEventListener('click', function() {
    if (this.classList.contains("changer__control--after"))
    {
      changerCheckbox.checked = true;
    }
    else {
      changerCheckbox.checked = false;
    }
  });
}
