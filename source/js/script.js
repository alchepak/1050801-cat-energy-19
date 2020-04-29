// Picture element HTML5 shiv
document.createElement( "picture" );

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
