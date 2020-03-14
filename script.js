'use strict'
document.addEventListener('click', () => clickHendler());

let arrMenuLink = document.querySelectorAll('.menu-link');

function clickHendler() {
    let target = event.target;
    let menuLink = target.classList.contains('menu-link');
    let sliderArroy = target.classList.contains('slider-arrow');
    if (menuLink) {
        event.preventDefault();
        arrMenuLink.forEach(item => item.classList.remove('menu-activ'))
        target.classList.add('menu-activ');
        let element = document.querySelector(`${target.hash}`)
        element.scrollIntoView({
            block: "start",
            inline: "nearest",
            behavior: "smooth"
        });
    } else if (sliderArroy) {
        if (target.classList.contains('right')) {
            i++
        } else {
            --i
        } 
        niddenSliders();
    }

}

// блок слайдера
let i = 0;
function niddenSliders() {
    let sliderItems = document.querySelectorAll('.slider-item');
    if (i === sliderItems.length) {
        i = 0;
    } else if (i < 0) {
        i = sliderItems.length-1;
    }
    sliderItems.forEach((item, index) => {
        if (i === index) {
                item.classList.remove('hiden');
            } else {
                item.classList.add('hiden');
            }
    })
    if (!sliderItems[1].classList.contains('hiden')) {
    let slider = document.querySelector('.slider');
    console.log(slider);
    slider.style.backgroundColor = '#648BF0';
    } else {
        slider.style.backgroundColor = '#F06C64'; 
    }
}


niddenSliders();


