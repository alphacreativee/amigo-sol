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
      delay: 3000,
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

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  createFilterTab();
  headerMenu();
  bannerSlider();
  bookingTime();
  sliderAmigo();
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
