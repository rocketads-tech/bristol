// * ========= preloader start ==========

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hide");

  // Удаляем прелоадер через ,1с после загрузки страницы
  setTimeout(() => {
    preloader.remove();
  }, 100);
});

// * ======== preloader end ==========

//* ======== check webp start ==========
function testWebP(callback) {
  let webP = new Image();
  webP.onload = function () {
    callback(webP.complete && webP.height === 2);
  };
  webP.onerror = function () {
    callback(false);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Добавляем класс _webp или _no-webp в HTML
document.addEventListener("DOMContentLoaded", function () {
  testWebP(function (support) {
    document.documentElement.classList.add(support ? "webp" : "no-webp");
  });
});
//* ========  check webp end ===========
const body = document.querySelector('body')

// * ======= sticky header start ===========
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  if (!header) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });
});
// * ======= sticky header end ===========

// * ======= запоминаем место перезагрузки страницы start ==========

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollPos", window.scrollY);
});
// * ======= запоминаем место перезагрузки страницы end ==========

// * ======= mobile menu start ==========

const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
const header = document.querySelector(".header");
const closeMobMenu = document.querySelector(".close-menu");
const navList = document.querySelector(".nav__list");
const navListLi = navList.querySelectorAll(".nav__list li");

burger.addEventListener("click", function () {
  nav.classList.add("active");
  header.classList.add("active");
  body.classList.add("lock");
});

closeMobMenu.addEventListener("click", function () {
  nav.classList.remove("active");
  header.classList.remove("active");
  body.classList.remove("lock");
});

navListLi.forEach((li) => {
  const link = li.querySelector("a[href^='#']");
  if (link) {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
        header.classList.remove("active");
        body.classList.remove("lock");
      }
    });
  }
});


nav.addEventListener("click", function (e) {
  if (e.target === nav) {
    nav.classList.remove("active");
    header.classList.remove("active");
    body.classList.remove("lock");
  } else false
});

function toggleLinkHoverClass() {
  navListLi.forEach((li) => {
    if (window.innerWidth <= 992) {
      li.classList.remove("link-hover");
    } else {
      li.classList.add("link-hover");
    }
  });
}

  // Запуск при загрузке
  toggleLinkHoverClass();

  // Обновление при изменении размера окна
  window.addEventListener("resize", toggleLinkHoverClass);
// * ======== mobile menu end ===========

// * ======== animated start ===========

import './modules/animate.js';

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";

window.addEventListener("load", () => {

  gsap.registerPlugin(ScrollTrigger);

  const races = document.querySelector(".races");
  if (races) {
    console.log(races.offsetWidth);
    function getScrollAmount() {
      let racesWidth = races.scrollWidth;
      let gap;

      if (window.innerWidth <= 500) {
        gap = 5;
      } else if (window.innerWidth <= 1100) {
        gap = 10;
      } else if (window.innerWidth <= 1300) {
        gap = 20;
      } else if (window.innerWidth <= 1400) {
        gap = 40;
      } else if (window.innerWidth <= 2000) {
        gap = 60;
      } else if (window.innerWidth <= 2300) {
        gap = 80;
      } else if (window.innerWidth <= 2700) {
        gap = 100;
      } else if (window.innerWidth <= 3000) {
        gap = 120;
      } else {
        gap = 150;
      }
      const itemsCount = races.children.length;
      return -(racesWidth + gap * (itemsCount - 1) - window.innerWidth);

      // return -(racesWidth - window.innerWidth);
    }
    const tween = gsap.to(races, {
      x: getScrollAmount,
      duration: 3,
      ease: "none",
    });

    function createScrollTrigger() {
      const startValue = window.innerWidth > 992 ? "top 7%" : "top 0%";

      ScrollTrigger.create({
        trigger: ".racesWrapper",
        start: startValue,
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: false,
      });
    }

    // Инициализация при загрузке
    createScrollTrigger();

    // Пересоздание при изменении размера окна
    window.addEventListener("resize", () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      createScrollTrigger();
    });
  } else false;

  ScrollTrigger.refresh();
  const scrollPos = +sessionStorage.getItem("scrollPos") || 0;
  window.scrollTo(0, scrollPos);
});
// * ======== animated end ===========

// * ======== popup start ===========

document.querySelectorAll(".popup-img__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Найдем картинку внутри этого же блока .horizontal-scroll__item-image
    const img = btn.closest(".popup-img").querySelector("img");
    if (!img) return;

    const popup = document.getElementById("image-popup");
    const popupImg = document.getElementById("popup-img");

    // Устанавливаем src картинки в попап
    popupImg.src = img.src;
    popupImg.alt = img.alt;
    body.classList.add("lock");

    // Показываем попап
    popup.style.display = "flex";

  });
});

document.getElementById("popup-close").addEventListener("click", () => {
  document.getElementById("image-popup").style.display = "none";
  body.classList.remove("lock");
});

document
  .querySelector(".image-popup__overlay")
  .addEventListener("click", () => {
    document.getElementById("image-popup").style.display = "none";
    body.classList.remove("lock");
  });
// * ======== popup end ===========

// *============ gallerySwiper start ===========

import Swiper from "swiper";
import { EffectCoverflow, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

var swiper = new Swiper(".gallerySwiper", {
  modules: [EffectCoverflow, Pagination, Navigation],
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: -200,
  initialSlide: 1,
  coverflowEffect: {
    rotate: 10,
    stretch: 0,
    depth: 100,
    modifier: 1,
    scale: 0.3,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets", // обязательно!
  },
  on: {
    init: function () {
      updateCounter(this);
    },
    slideChange: function () {
      updateCounter(this);
    },
  },
});

swiper.slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    if (index !== swiper.activeIndex) {
      swiper.slideTo(index);
    }
  });
});

function updateCounter(swiper) {
  const current = (swiper.realIndex + 1).toString().padStart(2, "0");
  const total = swiper.slides.length.toString().padStart(2, "0");
  document.querySelector(".swiper-counter").textContent = `${current}/${total}`;
}

// *============ gallerySwiper end ===========

// *============ popupSwiper start ===========
let popupSwiper;

const swiperPopupOverlay = document.querySelector(".swiper-popup__overlay");
document.querySelectorAll(".zoom-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const swiperPopup = document.getElementById("swiperPopup");
    const wrapper = swiperPopup.querySelector(".swiper-wrapper");

    wrapper.innerHTML = ""; // очищаем

    // добавим все слайды
    swiper.slides.forEach((slide) => {
      const img = slide.querySelector("img").src;
      const newSlide = document.createElement("div");
      newSlide.className = "swiper-slide";
      newSlide.innerHTML = `<img src="${img}" alt="" />`;
      wrapper.appendChild(newSlide);
    });

    swiperPopup.classList.add("active");
    body.classList.add("lock");

    popupSwiper = new Swiper(".popupSwiper", {
      initialSlide: index,
      modules: [Navigation],
      navigation: {
        nextEl: ".popup-next",
        prevEl: ".popup-prev",
      },
    });
  });
});

// закрытие попапа
document.querySelector(".swiper-popup__close").addEventListener("click", () => {
  document.getElementById("swiperPopup").classList.remove("active");
  popupSwiper.destroy(true, true);
  body.classList.remove("lock");
});

swiperPopupOverlay.addEventListener("click", () => {
  document.getElementById("swiperPopup").classList.remove("active");
  body.classList.remove("lock");
});

let lastIndex = swiper.activeIndex;

swiper.on("slideChange", () => {
  const direction = swiper.activeIndex > lastIndex ? 1 : -1;
  lastIndex = swiper.activeIndex;

  const spinner = document.querySelector(".gallery-spinner");

  // сохраняем текущий угол и прибавляем к нему
  let currentAngle = parseFloat(spinner.dataset.angle || "0");
  currentAngle += 90 * direction / 3;
  spinner.dataset.angle = currentAngle;

  spinner.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;
});
// *============ popupSwiper end ===========

// *============ descriptionsSwiper start ===========
var swiper1 = new Swiper(".descriptionsSwiper", {
  modules: [FreeMode, Thumbs],
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".descriptionsSwiper2", {
  modules: [Thumbs],
  spaceBetween: 10,
  thumbs: {
    swiper: swiper1,
  },
});
// *============ descriptionsSwiper end ===========
// *============ map iframe start ===========
window.addEventListener("load", function () {
  const mapWrapper = document.getElementById("mapIframeWrapper");
  const mapBlock = document.getElementById("mapBlock");
  if (!mapBlock) return;
  // Создаем iframe
  const iframe = document.createElement("iframe");
  iframe.src =
    "https://yandex.ru/map-widget/v1/?um=constructor%3Afc10edb5196635644719230cc64272afd16cc8c77fffa790fe74abaa73455602&source=constructor";
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.border = "0";
  iframe.setAttribute("loading", "lazy");

  // При полной загрузке iframe — показываем блок
  iframe.onload = function () {
    mapBlock.classList.add("loaded");
  };

  // Вставляем iframe в DOM
  mapWrapper.appendChild(iframe);
});
// *============ map iframe end ===========
// *============ air-datepicker start ===========

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

document.addEventListener("DOMContentLoaded", () => {
  const localeRu = {
    days: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthsShort: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    today: "Сегодня",
    clear: "Очистить",
    dateFormat: "dd.MM.yyyy",
    firstDay: 1,
  };

  const checkin = new AirDatepicker("#checkindate", {
    autoClose: true,
    locale: localeRu,
    // isMobile: true,
    buttons: [
      {
        content: "Сегодня",
        className: "custom-today-btn",
        onClick(dp) {
          const today = new Date();
          dp.selectDate(today);
          dp.hide(); // если хочешь закрытие сразу
        },
      },
      "clear",
    ],
  });

  const checkout = new AirDatepicker("#departuredate", {
    autoClose: true,
    locale: localeRu,
    autoClose: true,
    buttons: ["clear"],
  });
});

// *============ air-datepicker end ===========

import './modules/form.js';

