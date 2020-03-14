"use strict";
document.addEventListener("click", () => clickHendler());

let arrMenuLink = document.querySelectorAll(".menu-link");
let arrFilters = document.querySelectorAll(".btn-filter");
let galerey = document.querySelector(".gallerey");
let arrGaleryItems = Array.from(
    galerey.getElementsByClassName("img-conteiner")
);
let arrGaleryImgs = Array.from(galerey.getElementsByClassName("gallerey-img"));




//Обработчик кликов
function clickHendler() {
    let target = event.target;
    console.log("target: ", target);

    let menuLink = target.classList.contains("menu-link");
    let sliderArroy = target.classList.contains("slider-arrow");
    let phoneBtn = target.classList.contains("pnone-btn");
    let btnFilter = target.classList.contains("btn-filter");
    let galeryItem = target.classList.contains("gallerey-img");
    if (menuLink || btnFilter || galeryItem) {
        event.preventDefault();
        let activClass = "menu-activ";
        let arr = arrMenuLink;
        if (btnFilter) {
            activClass = "filter-activ";
            arr = arrFilters;
            gallereyMikher();
        } else if (galeryItem) {
            activClass = "img-activ";
            arr = arrGaleryImgs;
        } else {
            let element = document.querySelector(`${target.hash}`);
            element.scrollIntoView({
                block: "start",
                inline: "nearest",
                behavior: "smooth"
            });
        }
        arr.forEach(item => item.classList.remove(activClass));
        target.classList.add(activClass);
    } else if (sliderArroy && isEnabled) {
        if (target.classList.contains("right")) {
            nextItem(currentItem);
        } else {
            previouseItem(currentItem);
        }
        // niddenSliders();
    } else if (phoneBtn) {
        // да да можно все это записать одной строкой
        let pnone = target.parentElement;
        let blackDisplay = pnone.firstElementChild;
        blackDisplay.classList.toggle("display-off");
    }
}

// блок слайдера
let sliderItems = document.querySelectorAll(".slider-item");
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = (n + sliderItems.length) % sliderItems.length;
    console.log('currentItem: ', currentItem);
}

function hideItem(direction) {
    isEnabled = false;
    sliderItems[currentItem].classList.add(direction);
    sliderItems[currentItem].addEventListener('animationend', () => hideAnimationendHendler(direction))
}

function hideAnimationendHendler(direction) {
    event.target.classList.remove('active', direction);
    console.log('прячем', event.target);
}

function showItem(direction) {
    console.log('showItem вызван');
    sliderItems[currentItem].classList.add('next', direction);
    sliderItems[currentItem].addEventListener('animationend', () => showAnimationendHendler(direction))
}

function showAnimationendHendler(direction) {
    event.target.classList.remove('next', direction);
    event.target.classList.add('active');
    console.log('отображаем', event.target);
    isEnabled = true;
}



function previouseItem(n) {
    hideItem('to-right')
    changeCurrentItem(n - 1);
    showItem('from-left')
    changeBG()
}

function nextItem(n) {
    hideItem('to-left')
    changeCurrentItem(n + 1);
    console.log('вызываум showItem');
    showItem('from-right')
    changeBG()
}

function changeBG() {
    if (!sliderItems[1].classList.contains("active")) {
        let slider = document.querySelector(".slider");
        slider.style.backgroundColor = "#648BF0";
        slider.style.borderBottom = 'solid 6px #5D5BC5'
    } else {
        slider.style.backgroundColor = "#F06C64";
        slider.style.borderBottom = 'solid 6px #EA676B'
    }
}




//Галерея
function gallereyMikher() {
    let newArrGalerey = arrGaleryItems.sort(() => Math.random() - 0.5);
    galerey.innerHTML = "";
    newArrGalerey.forEach(item => galerey.append(item));
}

//форма
//checkValidity checkValidity()