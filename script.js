'use strict'
document.addEventListener('click', (evt) => clickHendler(evt));

let arrMenuLink = document.querySelectorAll('.menu-link');

function clickHendler(evt) {
 let target = evt.target;
 if (target.classList.contains('menu-link')) {
    arrMenuLink.forEach(item => item.classList.remove('menu-activ'))
    target.classList.add('menu-activ');
 }
 
 //console.log(target);
}
