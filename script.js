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
  let popapBtn = target.classList.contains("popap-btn");
  if (menuLink || btnFilter || galeryItem || popapBtn) {
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
    } else if (popapBtn) {
      document.querySelector(".popap").remove();
      document.body.style.overflow = "";
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
  console.log("currentItem: ", currentItem);
}

function hideItem(direction) {
  isEnabled = false;
  sliderItems[currentItem].classList.add(direction);
  sliderItems[currentItem].addEventListener("animationend", () =>
    hideAnimationendHendler(direction)
  );
}

function hideAnimationendHendler(direction) {
  event.target.classList.remove("active", direction);
  console.log("прячем", event.target);
}

function showItem(direction) {
  console.log("showItem вызван");
  sliderItems[currentItem].classList.add("next", direction);
  sliderItems[currentItem].addEventListener("animationend", () =>
    showAnimationendHendler(direction)
  );
}

function showAnimationendHendler(direction) {
  event.target.classList.remove("next", direction);
  event.target.classList.add("active");
  console.log("отображаем", event.target);
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
  console.log("вызываум showItem");
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

//Галерея
let arrCoordImg = arrGaleryItems.map(item => item.getBoundingClientRect())
arrGaleryItems.forEach((item, index) => {
  let {top, left} = arrCoordImg[index];
  item.style.top = 0 + 'px';
  item.style.left = 0 + 'px';
})

function gallereyMikher() {
   let arrCoordImg = arrGaleryItems.map(item => item.getBoundingClientRect())
   let newArrCoordImg = arrCoordImg.slice().sort((a, b) => Math.random() - 0.5);
   arrGaleryItems.forEach((item, index) => {
   let {top, left} = newArrCoordImg[index];
    item.style.top = (+item.style.top.slice(0, -2) + top - arrCoordImg[index].top) + 'px';
    item.style.left = (+item.style.left.slice(0, -2) + left - arrCoordImg[index].left) + 'px';
   })
}

//Форма
let form = document.querySelector(".quote-form");
form.addEventListener("submit", () => submitHendler());

function submitHendler() {
  event.preventDefault();
  let isValid = form.checkValidity();
  if (isValid) {
    document.body.append(popapCreater());
    document.body.style.overflow = "hidden";
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
    detail = `Описание: ${form.subject.value}`;
  }
  text.innerHTML = `Письмо отправлено </br>${subject}</br>${detail}</br>`;
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
