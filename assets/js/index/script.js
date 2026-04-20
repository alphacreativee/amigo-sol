import { preloadImages } from "../../main/js/utils.min.js";
import { customDropdown, createFilterTab } from "../../main/js/global.min.js";
import { sliderAmigo } from "../../main/js/slider.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
function headerMenu() {
  let $btnMenu = $(".btn-hamburger");
  let $containerMenu = $(".header-sub-menu");
  let $subMenuOverlay = $(".sub-menu-overlay");
  let tl = gsap.timeline({ paused: true });
  let tl2 = gsap.timeline({ paused: true });

  tl.from(".header-sub-menu .sub-menu-container .sub-menu > ul > li", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.3,
    ease: "power2.out",
  });

  // console.log($(".header-sub-menu .sub-menu-container .sub-menu > ul > li"));

  tl2.from(
    ".sub-menu-container .sub-menu > ul > li.menu-item-has-children li",
    {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.3,
      ease: "power2.out",
    },
  );

  $btnMenu.on("click", function () {
    $containerMenu.toggleClass("show");
    $btnMenu.toggleClass("change");

    if ($containerMenu.hasClass("show")) {
      tl.restart();
      $("body").addClass("overflow-hidden");
    } else {
      tl.reverse();
      $("body").removeClass("overflow-hidden");
    }
  });

  $subMenuOverlay.on("click", function () {
    tl.reverse();
    $btnMenu.removeClass("change");
    $containerMenu.removeClass("show");
    $("body").removeClass("overflow-hidden");
  });

  if ($(window).width() > 992) return;

  let btnBack = $("header .menu-item-has-children .return");
  btnBack.on("click", function (e) {
    e.preventDefault();
    tl.restart();
    tl2.reverse();

    $(".menu-item-has-children.open").removeClass("open");
  });
}
function bannerSlider() {
  if (!document.querySelector(".banner-slider")) return;
  const bannerSlider = new Swiper(".banner-slider", {
    effect: "fade",
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".section-banner .swiper-pagination",
    },
  });
}
function bookingTime() {
  if (!document.querySelector(".booking-form-wrapper")) return;

  function positionCalendar() {
    var input = picker._opts.field;
    var rect = input.getBoundingClientRect();
    var calendar = picker.el;

    if (rect.top >= window.innerHeight / 2) {
      calendar.style.top =
        rect.top + window.scrollY - calendar.offsetHeight - 20 + "px";
      calendar.style.left = rect.left + window.scrollX - 30 + "px";
      calendar.style.borderRadius = "12px 12px 0 0";
    } else {
      calendar.style.top = rect.bottom + window.scrollY + 15 + "px";
      calendar.style.left = rect.left + window.scrollX - 30 + "px";
      calendar.style.borderRadius = "0 0 12px 12px";
    }
  }

  var picker = new Lightpick({
    field: document.getElementById("checkInDate"),
    secondField: document.getElementById("checkOutDate"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 2,
    startDate: moment().startOf("day").toDate(),
    endDate: moment().startOf("day").add(1, "days").toDate(),

    onOpen: function () {
      positionCalendar();
      setTimeout(positionCalendar, 50);

      // Thêm event listener cho scroll khi calendar mở
      window.addEventListener("scroll", positionCalendar);
      window.addEventListener("resize", positionCalendar);
    },

    onClose: function () {
      // Xóa event listener khi calendar đóng
      window.removeEventListener("scroll", positionCalendar);
      window.removeEventListener("resize", positionCalendar);
    },

    onMonthChange: function () {
      setTimeout(positionCalendar, 10);
    },

    onYearChange: function () {
      setTimeout(positionCalendar, 10);
    },
  });

  const bookingCalendar = document.querySelector(".booking-calendar");
  if (bookingCalendar) {
    bookingCalendar.addEventListener("click", function (e) {
      e.stopPropagation();
      picker.show();
      document.getElementById("checkInDate").focus();
    });

    bookingCalendar.style.cursor = "pointer";
  }
}
function sliderService() {
  if (!document.querySelector(".swiper-serivce")) return;

  const titleService = document.querySelectorAll(
    ".amigo-service-titles .item-title",
  );
  let activeElms = titleService[0];

  function setActiveTitle(index) {
    if (activeElms) activeElms.classList.remove("active");
    activeElms = titleService[index];
    if (activeElms) activeElms.classList.add("active");
  }

  const swiperService = new Swiper(".swiper-serivce", {
    effect: "fade",
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-serivce .swiper-pagination",
    },
    on: {
      slideChange: function () {
        setActiveTitle(this.realIndex);
      },
    },
  });

  swiperService.autoplay.stop();

  setActiveTitle(0);

  titleService.forEach((el, index) => {
    el.addEventListener("mouseover", function () {
      swiperService.slideToLoop(index);
      setActiveTitle(index);
      setTimeout(() => {
        swiperService.autoplay.stop();
        swiperService.autoplay.start();
      }, 100);
    });
  });

  const swiperEl = document.querySelector(".swiper-serivce");
  if (swiperEl) {
    gsap.set(swiperEl, { autoAlpha: 0, y: 20 });
  }

  const allSplitLines = [];
  titleService.forEach((el) => {
    const split = new SplitText(el, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });
    allSplitLines.push(...split.lines);
    gsap.set(split.lines, { yPercent: 100 });
  });

  ScrollTrigger.create({
    trigger: ".amigo-service-wrapper",
    start: "top 70%",
    once: true,
    onEnter: () => {
      if (swiperEl) {
        gsap.to(swiperEl, {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.8,
        });
      }

      gsap.to(allSplitLines, {
        yPercent: 0,
        ease: "power3.out",
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
      });

      swiperService.autoplay.start();
    },
  });
}

function fadeTextFooter() {
  gsap.set("data-text-footer", {
    opacity: 0,
    y: 20,
  });
  let tlf = gsap.timeline({ paused: true });

  tlf.fromTo(
    "[data-text-footer]",
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out",
    },
  );
  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    // markers: true,
    animation: tlf,
    toggleActions: "play none none none",
  });

  return tlf;
}

function imgWithText() {
  if ($(".image-with-text").length < 1) return;

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".image-with-text.parallax").forEach((section) => {
    const img = section.querySelector("img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scrub: true,
        pin: false,
        // markers: true
      },
    });

    tl.fromTo(
      img,
      {
        yPercent: -15,
        ease: "none",
      },
      {
        yPercent: 15,
        ease: "none",
      },
    );
  });
}

function swiperOffer() {
  if (!document.querySelector(".swiper-offer")) return;
  var swiperOffer = new Swiper(".swiper-offer", {
    spaceBetween: 24,
    slidesPerView: 1.25,
    speed: 1000,
    navigation: {
      nextEl: ".section-offer__slider .swiper-button-next",
      prevEl: ".section-offer__slider .swiper-button-prev",
    },
    pagination: {
      el: ".section-offer__slider .swiper-pagination",
      type: "progressbar",
    },
    slidesOffsetAfter: 24,
    slidesOffsetBefore: 24,
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0,
      },
    },
  });
}
function animationText() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  document.querySelectorAll(".tl-text").forEach((el) => {
    const sub = el.querySelector(".text-e-sub");
    const title = el.querySelector(".text-e-title");
    const desc = el.querySelector(".text-e-desc");
    const btn = el.querySelector(".text-e-btn");

    const startVal = el.dataset.start ?? "70";
    const triggerStart = `top ${startVal}%`;
    const toHide = [sub, desc, btn].filter(Boolean);
    gsap.set(toHide, { autoAlpha: 0 });

    let splitLines = null;
    if (title) {
      const split = new SplitText(title, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });
      splitLines = split.lines;
      gsap.set(splitLines, { yPercent: 100 });
    }

    ScrollTrigger.create({
      trigger: el,
      start: triggerStart,
      once: true,
      // markers: true,
      onEnter: () => {
        const tl = gsap.timeline();

        if (sub) {
          tl.fromTo(
            sub,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 },
          );
        }

        if (splitLines) {
          tl.to(
            splitLines,
            {
              yPercent: 0,
              ease: "power3.out",
              duration: 0.8,
              stagger: 0.05,
            },
            sub ? "-=0.1" : 0,
          );
        }

        if (desc) {
          tl.fromTo(
            desc,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 },
            "-=0.2",
          );
        }

        if (btn) {
          tl.fromTo(
            btn,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 },
            "-=0.2",
          );
        }
      },
    });
  });
}
function eLeaf() {
  const leaves = document.querySelectorAll(".e-leaf");

  leaves.forEach((leaf) => {
    const direction = leaf.classList.contains("big-leaf") ? 30 : 120;

    gsap.to(leaf, {
      y: direction,
      ease: "none",
      scrollTrigger: {
        trigger: leaf,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  createFilterTab();
  headerMenu();
  bannerSlider();
  bookingTime();
  sliderAmigo();
  sliderService();
  fadeTextFooter();
  imgWithText();
  swiperOffer();
  animationText();
  eLeaf();
};
preloadImages("img").then(() => {
  init();
});

// event click element a
let isLinkClicked = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (
    link?.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    isLinkClicked = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (!isLinkClicked) window.scrollTo(0, 0);
  isLinkClicked = false;
});
