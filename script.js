"use strict";
document.addEventListener("click", (event) => clickHendler(event));

let arrMenuLink = Array.from(document.querySelectorAll(".menu-link"));
let arrFilters = document.querySelectorAll(".btn-filter");
let galerey = document.querySelector(".gallerey");
let arrGaleryItems = Array.from(
  galerey.getElementsByClassName("img-conteiner")
);
let arrGaleryImgs = Array.from(galerey.getElementsByClassName("gallerey-img"));

// --------------------Обработчик кликов ------------------------------
function clickHendler(event) {
  let target = event.target;
  console.log('target: ', target);
  let menuLink = target.classList.contains("menu-link");
  let sliderArroy = target.classList.contains("slider-arrow");
  let phoneBtn = target.classList.contains("pnone-btn");
  let btnFilter = target.classList.contains("btn-filter");
  let galeryItem = target.classList.contains("gallerey-img");
  let popapBtn = target.classList.contains("popap-btn");
  let menuBurger = target.classList.contains('menu-btn')
  if (menuLink || btnFilter || galeryItem || popapBtn) {
    let activClass = "menu-activ";
    let arr = arrMenuLink;
    // клик по тэгу галереи 
    if (btnFilter && animationEnd) {
      activClass = "filter-activ";
      arr = arrFilters;
      gallereyMikher();
      // клик по картинке галереи 
    } else if (galeryItem) {
      activClass = "img-activ";
      arr = arrGaleryImgs;
      // клик по закрывающей попап кнопке
    } else if (popapBtn) {
      document.querySelector(".popap").remove();
      document.body.style.overflow = "";
      modalOff = true;
      form.reset();
    } 
    arr.forEach(item => item.classList.remove(activClass));
    target.classList.add(activClass);
    // клик по стрелке слайдера
  } else if (sliderArroy && isEnabled) {
    if (target.classList.contains("right")) {
      nextItem(currentItem);
    } else {
      previouseItem(currentItem);
    }
    // клик по кнопке телефона
  } else if (phoneBtn) {
    // да да можно все это записать одной строкой
    let pnone = target.parentElement;
    let wind = pnone.querySelector('img');
    wind.classList.toggle("display-off");
  } else if (menuBurger) {
    let menu = document.querySelector('.menu')
    let logo = document.querySelector('.logo')
    target.classList.toggle('menu-btn-active')
    menu.classList.toggle('active')
    logo.classList.toggle('active')
  }
}

// -----------------------блок слайдера -----------------------------
let sliderItems = document.querySelectorAll(".slider-item");
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + sliderItems.length) % sliderItems.length;
  console.log("currentItem: ", currentItem);
}

function hideItem(direction) {
  console.log("hideItem вызван");
  isEnabled = false;
  sliderItems[currentItem].classList.add(direction);
  sliderItems[currentItem].addEventListener("animationend", () =>
    hideAnimationendHendler(direction)
  );
  //   sliderItems[currentItem].addEventListener("transitionend", () =>
  //   hideAnimationendHendler(direction)
  // );
}

function hideAnimationendHendler(direction) {
  event.target.classList.remove("active", direction);
}

function showItem(direction) {
  console.log("showItem вызван");
  sliderItems[currentItem].classList.add("next", direction);
  console.log('sliderItems[currentItem]: ', sliderItems[currentItem]);
  sliderItems[currentItem].addEventListener("animationend", () =>
    showAnimationendHendler(direction)
  );
//  sliderItems[currentItem].addEventListener("transitionend", () =>
//   showAnimationendHendler(direction));
}

function showAnimationendHendler(direction) {
  console.log('direction: ', direction);
  console.log('показываем');
  console.log('event.target: ', event.target);
  event.target.classList.remove("next", direction);
 
  event.target.classList.add("active");
  isEnabled = true;
}

function previouseItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
  changeBG();
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
  changeBG();
}

function changeBG() {
  if (!sliderItems[1].classList.contains("active")) {
    let slider = document.querySelector(".slider");
    slider.style.backgroundColor = "#648BF0";
    slider.style.borderBottom = "solid 6px #5D5BC5";
  } else {
    slider.style.backgroundColor = "#F06C64";
    slider.style.borderBottom = "solid 6px #EA676B";
  }
}

// -------------------------Галерея -----------------------------------
let animationEnd = true;
function gallereyMikher() {
  arrGaleryItems = Array.from(
    galerey.getElementsByClassName("img-conteiner")
  );
    animationEnd = false;
    let arrCoordImg = arrGaleryItems.slice().map(item => item.getBoundingClientRect());
    let newArrCoordImg;
    let durationArr = [];
    let newGaleryItems;
    let shafl = () => {
      newGaleryItems = arrGaleryImgs.slice().sort(() => Math.random() - 0.5);
      console.log('newGaleryItems: ', newGaleryItems);
      newArrCoordImg = newGaleryItems.map(item => item.getBoundingClientRect());
      console.log('newArrCoordImg: ', newArrCoordImg);
      arrGaleryItems.forEach((item, index) => {
        let {top, left} = newArrCoordImg[index];
        let oldTop = arrCoordImg[index].top;
        let oldLeft = arrCoordImg[index].left;
        let durationTop = top - oldTop;
        let durationLeft = left - oldLeft;
        let itemTop = +item.style.top.slice(0, -2);
        let itemLeft = +item.style.left.slice(0, -2);
        if (durationTop || durationLeft) {
          durationArr.push({top: Math.round(durationTop + itemTop) + 'px', left: Math.round(durationLeft +itemLeft) + 'px',});
        }
      });
      if (durationArr.length !== arrGaleryItems.length) {
        durationArr = [];
        shafl();
      }
    };
    shafl();
          durationArr.forEach(({top, left}, index) => {
            arrGaleryItems[index].style.top = top;
            arrGaleryItems[index].style.left = left;
            });
            console.log('newGaleryItems last: ', newGaleryItems);

            // arrGaleryItems = Array.from(galerey.getElementsByClassName("img-conteiner"));
            let newGalIndex = arrGaleryItems.map((item, index) => {
              let itemTop = +item.style.top.slice(0, -2);
              let itemLeft = +item.style.left.slice(0, -2);
              let i = index;
              if (itemTop > 0 && itemTop < 204){
                i +=4;
              }
              if (itemTop > 204 && itemTop < 407){
                i +=8;
              }
              if (itemTop < 0 && itemTop > -204){
                i -=4;
              }
              if (itemTop < -203 && itemTop > -407){
                i -=8;
              }
              if (itemLeft > 0 && itemLeft < 238){
                i +=1;
              }
              if (itemLeft > 238 && itemLeft < 475){
                i +=2;
              }
              if (itemLeft > 474 && itemLeft < 712){
                i +=3;
              }
              if (itemLeft < 0 && itemLeft > -238){
                i -=1;
              }
              if (itemLeft < -238 && itemLeft > -475){
                i -=2;
              }
              if (itemLeft < -474 && itemLeft > -712){
                i -=3;
              }
              return i;
            });
            let newGal =[];
            newGalIndex.forEach((i, index) => newGal[i] = arrGaleryItems[index]);
            console.log(newGal);

    setTimeout(() => {
      animationEnd = true;
      let gallery = document.querySelector('.gallerey');
      gallery.innerHTML='';
      newGal.forEach(item => {
        item.style = 'none';
      })
      gallery.append(...newGal);
    }, 1000);

}
 
// -------------------------Форма -----------------------------------
let form = document.querySelector(".quote-form");
form.addEventListener("submit", () => submitHendler());

let modalOff = true
function submitHendler() {
  event.preventDefault();
  if(modalOff) {
    let isValid = form.checkValidity();
    if (isValid) {
      document.body.append(popapCreater());
      document.body.style.overflow = "hidden";
      modalOff = false;
    }
  }
 
}

function popapCreater() {
  let popap = document.createElement("div");
  popap.className = "popap";
  let text = document.createElement("p");
  text.className = "popap-text";
  popap.append(text);
  let subject = "Без темы";
  if (form.subject.value) {
    subject = `Тема: ${form.subject.value}`;
  }
  let detail = "Без описания";
  if (form.detail.value) {
    detail = `Описание: ${form.detail.value}`;
  }
  text.innerHTML = `Письмо отправлено </br>${subject}</br>${detail}</br>`;
  if (text.innerHTML.length > 750) {
    popap.style.overflowY = 'scroll';
  }
  let btnOK = document.createElement("button");
  btnOK.className = "popap-btn";
  btnOK.innerHTML = "OK";
  popap.append(btnOK);
  let documentSize = document.documentElement.getBoundingClientRect();
  let documentBottom = documentSize.height;
  popap.style.top =
    documentBottom - document.documentElement.clientHeight / 2 + "px";
  document.addEventListener("keydown", () => keydownHendler());
  return popap;
}

function keydownHendler() {
  let key = event.key;
  if (key === "Enter" || key === "Escape") {
    document.querySelector(".popap").remove();
    document.body.style.overflow = "";
  }
}


// ------------ Обработка скрола-----------------
 document.addEventListener('scroll', () => scrollHandler());

function scrollHandler() {
  let menu = document.querySelector('header');
  let hight = menu.offsetHeight
   menu.style.display = 'none'
  let section = document.elementFromPoint(0, hight + 10).closest('section');
  menu.style.display = 'block'
  let targetId = section.id;
  let menuLink = document.querySelector(`a[href*=${targetId}]`);
  let fakeEvent = {target: menuLink,};
  clickHendler(fakeEvent);
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  if (Math.floor(window.pageYOffset + document.documentElement.clientHeight) === scrollHeight) {
    let contactLink = document.querySelector('a[href*=contact]');
    let fakeContact = {target: contactLink,};
   clickHendler(fakeContact);
  }
}