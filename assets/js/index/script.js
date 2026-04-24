import { preloadImages } from "../../main/js/utils.min.js";
import { createFilterTab } from "../../main/js/global.min.js";
import { sliderAmigo } from "../../main/js/slider.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis({
  autoRaf: false
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
function headerMenu() {
  function initMenu(wrapper) {
    let $btnMenu = $(".btn-hamburger");
    let $containerMenu = $(wrapper);
    let $subMenuOverlay = $(".sub-menu-overlay");
    let tl = gsap.timeline({ paused: true });
    let tl2 = gsap.timeline({ paused: true });

    tl.from($(wrapper).find(".sub-menu-container .sub-menu > ul > li"), {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out"
    });

    tl2.from(
      $(wrapper).find(
        ".sub-menu-container .sub-menu > ul > li.menu-item-has-children li"
      ),
      {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.out"
      }
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

    // btnBack chỉ dùng cho mobile
    if ($(window).width() <= 992) {
      let btnBack = $(wrapper).find(".menu-item-has-children .return");
      btnBack.on("click", function (e) {
        e.preventDefault();
        tl.restart();
        tl2.reverse();
        $(wrapper).find(".menu-item-has-children.open").removeClass("open");
      });
    }
  }

  if ($(".header-sub-menu.d-block.d-lg-none").length) {
    initMenu(".header-sub-menu.d-block.d-lg-none");
  }

  if ($(".header-sub-menu.d-none.d-lg-block").length) {
    initMenu(".header-sub-menu.d-none.d-lg-block");
  }
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
      disableOnInteraction: false
    },
    pagination: {
      el: ".section-banner .swiper-pagination"
    }
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

  if ($("#checkInDate").length > 0) {
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
      }
    });
  }

  const bookingCalendar = document.querySelector(".booking-calendar");
  if (bookingCalendar) {
    bookingCalendar.addEventListener("click", function (e) {
      e.stopPropagation();
      picker.show();
      document.getElementById("checkInDate").focus();
    });

    bookingCalendar.style.cursor = "pointer";
  }

  if ($("#checkInDateTable").length > 0) {
    var pickerDining = new Lightpick({
      field: document.getElementById("checkInDateTable"),
      singleDate: true,
      numberOfMonths: 1,
      minDate: moment().startOf("day").add(1, "days"),
      startDate: moment().startOf("day").add(1, "days").toDate(),

      onOpen: function () {
        positionCalendar();
        setTimeout(positionCalendar, 50);

        window.addEventListener("scroll", positionCalendar);
        window.addEventListener("resize", positionCalendar);
      },

      onClose: function () {
        window.removeEventListener("scroll", positionCalendar);
        window.removeEventListener("resize", positionCalendar);
      },

      onMonthChange: function () {
        setTimeout(positionCalendar, 10);
      },

      onYearChange: function () {
        setTimeout(positionCalendar, 10);
      }
    });
  }
}
// function sliderService() {
//   if (!document.querySelector(".swiper-serivce")) return;

//   const titleService = document.querySelectorAll(
//     ".amigo-service-titles .item-title",
//   );
//   let activeElms = titleService[0];

//   function setActiveTitle(index) {
//     if (activeElms) activeElms.classList.remove("active");
//     activeElms = titleService[index];
//     if (activeElms) activeElms.classList.add("active");
//   }

//   const swiperService = new Swiper(".swiper-serivce", {
//     effect: "fade",
//     slidesPerView: 1,
//     spaceBetween: 0,
//     loop: true,
//     speed: 1500,
//     autoplay: {
//       delay: 3000,
//       disableOnInteraction: false,
//     },
//     pagination: {
//       el: ".swiper-serivce .swiper-pagination",
//     },
//     on: {
//       slideChange: function () {
//         setActiveTitle(this.realIndex);
//       },
//     },
//   });

//   // swiperService.autoplay.stop();

//   setActiveTitle(0);

//   titleService.forEach((el, index) => {
//     el.addEventListener("mouseover", function () {
//       swiperService.slideToLoop(index);
//       setActiveTitle(index);
//       // setTimeout(() => {
//       //   swiperService.autoplay.stop();
//       //   swiperService.autoplay.start();
//       // }, 100);
//     });
//   });

//   const swiperEl = document.querySelector(".swiper-serivce");
//   if (swiperEl) {
//     gsap.set(swiperEl, { autoAlpha: 0, y: 20 });
//   }

//   const allSplitLines = [];
//   titleService.forEach((el) => {
//     const split = new SplitText(el, {
//       type: "lines",
//       linesClass: "line",
//       mask: "lines",
//     });
//     allSplitLines.push(...split.lines);
//     gsap.set(split.lines, { yPercent: 100 });
//   });

//   ScrollTrigger.create({
//     trigger: ".amigo-service-wrapper",
//     start: "top 70%",
//     once: true,
//     onEnter: () => {
//       if (swiperEl) {
//         gsap.to(swiperEl, {
//           autoAlpha: 1,
//           y: 0,
//           ease: "power2.out",
//           duration: 0.8,
//         });
//       }

//       gsap.to(allSplitLines, {
//         yPercent: 0,
//         ease: "power3.out",
//         duration: 0.8,
//         stagger: 0.1,
//         delay: 0.2,
//       });

//       // swiperService.autoplay.start();
//     },
//   });

//   // const isMobile = window.matchMedia("(max-width: 991px)").matches;

//   // if (!isMobile && swiperEl) {
//   //   const cursor = document.createElement("div");
//   //   cursor.classList.add("service-cursor");
//   //   cursor.innerHTML = `
//   //     <span class="service-cursor-arrow service-cursor-prev">
//   //       <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//   //         <path d="M5.95117 10.5L0.532566 5.57399C0.488922 5.53432 0.488922 5.46568 0.532566 5.42601L5.95117 0.5" stroke="#ffffff" stroke-linecap="round"/>
//   //       </svg>
//   //     </span>
//   //     <span class="service-cursor-arrow service-cursor-next">
//   //       <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
//   //         <path d="M0.5 10.5L5.91861 5.57399C5.96225 5.53432 5.96225 5.46568 5.91861 5.42601L0.5 0.5" stroke="#ffffff" stroke-linecap="round"/>
//   //       </svg>
//   //     </span>
//   //   `;
//   //   document.body.appendChild(cursor);

//   //   Object.assign(cursor.style, {
//   //     position: "fixed",
//   //     top: "0",
//   //     left: "0",
//   //     pointerEvents: "none",
//   //     zIndex: "9999",
//   //     width: "50px",
//   //     height: "50px",
//   //     borderRadius: "50%",
//   //     background: "#ca6627",
//   //     display: "flex",
//   //     alignItems: "center",
//   //     justifyContent: "center",
//   //     color: "#fff",
//   //     transform: "translate(-50%, -50%)",
//   //   });

//   //   gsap.set(cursor, { scale: 0, opacity: 0 });

//   //   let isLeft = true;

//   //   swiperEl.addEventListener("mousemove", (e) => {
//   //     const rect = swiperEl.getBoundingClientRect();
//   //     const x = e.clientX - rect.left;
//   //     isLeft = x < rect.width / 2;

//   //     gsap.set(cursor, { x: e.clientX, y: e.clientY });

//   //     cursor.querySelector(".service-cursor-prev").style.display = isLeft
//   //       ? "flex"
//   //       : "none";
//   //     cursor.querySelector(".service-cursor-next").style.display = isLeft
//   //       ? "none"
//   //       : "flex";
//   //   });

//   //   swiperEl.addEventListener("mouseenter", () => {
//   //     swiperEl.style.cursor = "none";
//   //     gsap.to(cursor, {
//   //       opacity: 1,
//   //       scale: 1,
//   //       duration: 0.3,
//   //       ease: "back.out(1.7)",
//   //     });
//   //   });

//   //   // swiperEl.addEventListener("mouseleave", () => {
//   //   //   swiperEl.style.cursor = "";
//   //   //   gsap.to(cursor, {
//   //   //     opacity: 0,
//   //   //     scale: 0,
//   //   //     duration: 0.2,
//   //   //     ease: "power2.in",
//   //   //   });
//   //   // });

//   //   // swiperEl.addEventListener("click", () => {
//   //   //   if (isLeft) {
//   //   //     swiperService.slidePrev();
//   //   //   } else {
//   //   //     swiperService.slideNext();
//   //   //   }
//   //   // });
//   // }
// }
function sliderService() {
  if (!document.querySelector(".swiper-serivce")) return;

  const titleService = document.querySelectorAll(
    ".amigo-service-titles .item-title"
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
    pagination: {
      el: ".swiper-serivce .swiper-pagination"
    },
    on: {
      slideChange: function () {
        setActiveTitle(this.realIndex);
      }
    }
  });

  setActiveTitle(0);

  titleService.forEach((el, index) => {
    el.addEventListener("mouseover", function () {
      swiperService.slideToLoop(index);
      setActiveTitle(index);
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
      mask: "lines"
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
          duration: 0.8
        });
      }

      gsap.to(allSplitLines, {
        yPercent: 0,
        ease: "power3.out",
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2
      });
    }
  });
}
function fadeTextFooter() {
  gsap.set("data-text-footer", {
    opacity: 0,
    y: 20
  });
  let tlf = gsap.timeline({ paused: true });

  tlf.fromTo(
    "[data-text-footer]",
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power2.out"
    }
  );
  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    // markers: true,
    animation: tlf,
    toggleActions: "play none none none"
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
        pin: false
        // markers: true
      }
    });

    tl.fromTo(
      img,
      {
        yPercent: -15,
        ease: "none"
      },
      {
        yPercent: 15,
        ease: "none"
      }
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
      prevEl: ".section-offer__slider .swiper-button-prev"
    },
    pagination: {
      el: ".section-offer__slider .swiper-pagination",
      type: "progressbar"
    },
    slidesOffsetAfter: 24,
    slidesOffsetBefore: 24,
    breakpoints: {
      991: {
        slidesPerView: 3,
        spaceBetween: 40,
        slidesOffsetAfter: 0,
        slidesOffsetBefore: 0
      }
    }
  });
}
function animationText() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  document.querySelectorAll(".tl-text").forEach((el) => {
    const sub = el.querySelector(".text-e-sub");
    const title = el.querySelector(".text-e-title");
    const desc = el.querySelector(".text-e-desc");
    const list = el.querySelector(".text-e-list");
    const btn = el.querySelector(".text-e-btn");

    const startVal = el.dataset.start ?? "70";
    const triggerStart = `top ${startVal}%`;
    const toHide = [sub, desc, list, btn].filter(Boolean); // [!] thêm list vào đây

    gsap.set(toHide, { autoAlpha: 0 });

    let splitLines = null;
    if (title) {
      const split = new SplitText(title, {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      });
      splitLines = split.lines;
      gsap.set(splitLines, { yPercent: 100 });
    }

    ScrollTrigger.create({
      trigger: el,
      start: triggerStart,
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        if (sub) {
          tl.fromTo(
            sub,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 }
          );
        }

        if (splitLines) {
          tl.to(
            splitLines,
            {
              yPercent: 0,
              ease: "power3.out",
              duration: 0.8,
              stagger: 0.05
            },
            sub ? "-=0.1" : 0
          );
        }
        // [!] animate cả list như các element khác
        if (list) {
          tl.fromTo(
            list,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 },
            "-=0.2"
          );
        }

        if (desc) {
          tl.fromTo(
            desc,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 },
            "-=0.2"
          );
        }

        if (btn) {
          tl.fromTo(
            btn,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.3 },
            "-=0.2"
          );
        }
      }
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
        end: "bottom top"
      }
    });
  });
}

function detailSlider() {
  // Kiểm tra container có tồn tại
  const container = document.querySelector(".image-with-text .detail-slider");
  if (!container) {
    console.warn("Detail slider (.image-with-text .detail-slider) not found");
    return;
  }

  const parentContainer = document.querySelector(".image-with-text");
  if (!parentContainer) {
    console.warn("Parent container (.image-with-text) not found");
    return;
  }

  const interleaveOffset = 0.9;
  const swiperButton = document.querySelector(
    ".image-with-text .detail-slider__arrows"
  );

  // Kiểm tra swiperButton tồn tại
  if (!swiperButton) {
    console.warn(
      "Swiper button (.image-with-text .detail-slider__arrows) not found"
    );
    return;
  }

  // Khởi tạo Swiper
  const detailSlider = new Swiper(container, {
    loop: false,
    speed: 1500,
    watchSlidesProgress: true,
    mousewheel: false,
    keyboard: false,
    allowTouchMove: true,
    autoplay: false,
    pagination: {
      el: ".image-with-text .swiper-pagination"
    },
    breakpoints: {
      991: {
        allowTouchMove: false
      }
    },
    // Loại bỏ navigation vì không dùng nút mặc định
    on: {
      progress(swiper) {
        swiper.slides.forEach((slide) => {
          const slideProgress = slide.progress || 0;
          const innerOffset = swiper.width * interleaveOffset;
          const innerTranslate = slideProgress * innerOffset;

          if (!isNaN(innerTranslate)) {
            const slideInner = slide.querySelector(".detail-slider__image");
            if (slideInner) {
              slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
            }
          }
        });
      },
      touchStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.style.transition = "";
        });
      },
      setTransition(swiper, speed) {
        const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach((slide) => {
          slide.style.transition = `${speed}ms ${easing}`;
          const slideInner = slide.querySelector(".detail-slider__image");
          if (slideInner) {
            slideInner.style.transition = `${speed}ms ${easing}`;
          }
        });
      }
    }
  });

  let lastMouseX = null;

  // Xử lý sự kiện mousemove trên .image-with-text
  parentContainer.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const halfWidth = rect.width / 2;
    const buttonWidth = swiperButton.offsetWidth;
    const buttonHeight = swiperButton.offsetHeight;
    const offset = 40; // Khoảng cách 40px từ cả bốn cạnh

    lastMouseX = mouseX;

    // Hiển thị nút
    swiperButton.style.opacity = "1";
    swiperButton.style.transition = "opacity 0.3s, transform 0.3s";

    // Tính toán vị trí
    let buttonPosX = mouseX - buttonWidth / 2;
    let buttonPosY = mouseY - buttonHeight / 2;
    const transitionZone = 20;
    let rotateDeg;

    if (mouseX <= halfWidth - transitionZone) {
      rotateDeg = 180; // Nửa trái: prev
      buttonPosX = Math.max(
        offset,
        Math.min(halfWidth - buttonWidth, buttonPosX)
      );
    } else if (mouseX >= halfWidth + transitionZone) {
      rotateDeg = 0; // Nửa phải: next
      buttonPosX = Math.max(
        halfWidth,
        Math.min(rect.width - buttonWidth - offset, buttonPosX)
      );
    } else {
      const progress =
        (mouseX - (halfWidth - transitionZone)) / (transitionZone * 2);
      rotateDeg = 180 - progress * 180; // Vùng chuyển tiếp
      buttonPosX = Math.max(
        offset,
        Math.min(rect.width - buttonWidth - offset, buttonPosX)
      );
    }

    // Giới hạn vị trí Y với offset 40px
    buttonPosY = Math.max(
      offset,
      Math.min(rect.height - buttonHeight - offset, buttonPosY)
    );

    // Áp dụng transform
    swiperButton.style.left = `${buttonPosX}px`;
    swiperButton.style.top = `${buttonPosY}px`;
    swiperButton.style.transform = `scale(1) rotate(${rotateDeg}deg)`;
    swiperButton.style.transition = " transform 0.3s";
  });

  // Xử lý sự kiện mouseleave
  parentContainer.addEventListener("mouseleave", () => {
    swiperButton.style.opacity = "0";
    swiperButton.style.transform = "scale(0)";
    swiperButton.style.transition = "opacity 0.3s, transform 0.3s";
    lastMouseX = null;
  });

  // Xử lý sự kiện click
  swiperButton.addEventListener("click", (e) => {
    const rect = container.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const currentIndex = detailSlider.activeIndex;
    const totalSlides = detailSlider.slides.length;

    // Lấy vị trí chuột tại thời điểm click
    const mouseX = lastMouseX !== null ? lastMouseX : e.clientX - rect.left;

    if (mouseX <= halfWidth) {
      if (currentIndex > 0) {
        detailSlider.slidePrev();
        console.log("slidePrev called");
      } else {
        console.log("Cannot slidePrev: at first slide");
      }
    } else {
      if (currentIndex < totalSlides - 1) {
        detailSlider.slideNext();
        console.log("slideNext called");
      } else {
        console.log("Cannot slideNext: at last slide");
      }
    }
  });
}
function gallery() {
  console.log("aaa");

  document.querySelectorAll(".animated-thumb").forEach(initGallery);

  document.addEventListener("shown.bs.tab", function (e) {
    const tab = document.querySelector(e.target.dataset.bsTarget);
    if (!tab) return;

    tab.querySelectorAll(".animated-thumb").forEach(initGallery);
  });
}

function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select"
  );

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          const optionText = item.textContent;
          displayText.textContent = optionText;
          dropdown.classList.add("selected");
        } else {
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<span>${currentText}</span><img src="${currentImg}" alt="" />`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}

/* ================================
   INIT GALLERY PER TAB
================================ */
function initGallery(galleryEl) {
  if (!galleryEl || galleryEl.dataset.inited) return;

  lightGallery(galleryEl, {
    selector: ".thumb-img",
    thumbnail: true,
    download: false,
    showCloseIcon: true,
    subHtmlSelectorRelative: true,
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: false
    }
  });

  galleryEl.dataset.inited = "true";

  galleryEl.addEventListener("lgAfterOpen", () => {
    // bindCustomCursor();
  });
}

/* ================================
   CUSTOM CURSOR + ARROWS
================================ */
// function bindCustomCursor() {
//   const container =
//     document.querySelector(".lg-container.lg-show") ||
//     document.querySelector(".lg-container.lg-visible");

//   if (!container) return;

//   const prev = container.querySelector(".lg-prev");
//   const next = container.querySelector(".lg-next");
//   const close = container.querySelector(".lg-close");

//   if (!prev || !next || !close) return;

//   let overClose = false;

//   container.addEventListener("mousemove", (e) => {
//     if (overClose) return;

//     const rect = container.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;

//     [prev, next].forEach((el) => {
//       el.style.left = e.clientX + "px";
//       el.style.top = e.clientY + "px";
//     });

//     if (e.clientX < centerX) {
//       prev.style.display = "block";
//       next.style.display = "none";
//     } else {
//       prev.style.display = "none";
//       next.style.display = "block";
//       next.style.transform = "translate(-200%, -150%)";
//     }
//   });

//   container.addEventListener("mouseleave", () => {
//     prev.style.display = "none";
//     next.style.display = "none";
//   });

//   close.addEventListener("mouseenter", () => {
//     overClose = true;
//     next.style.transform = "scale(0)";
//   });

//   close.addEventListener("mouseleave", () => {
//     overClose = false;
//     next.style.transform = "scale(1)";
//   });
// }
function accomodationnFilter() {
  if ($(".accomodation-list").length < 1) return;

  const tabs = $(".accomodation-list .nav-tabs .nav-link");
  tabs.on("click", function (e) {
    e.preventDefault();

    // ScrollTrigger.refresh();
    const footerTimeline = fadeTextFooter();
    footerTimeline.play();
  });

  gsap.set(".accomodation-list .nav-tabs", {
    opacity: 0,
    y: 50
  });

  ScrollTrigger.create({
    trigger: ".accomodation-list",
    start: "top 60%",
    end: "bottom bottom",
    onEnter: showTabs,
    onEnterBack: showTabs,
    onLeave: hideTabs,
    onLeaveBack: hideTabs
  });

  function showTabs() {
    gsap.to(".accomodation-list .nav-tabs", {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "none"
    });
  }

  function hideTabs() {
    gsap.to(".accomodation-list .nav-tabs", {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "none"
    });
  }
}
function scrollCTA() {
  ScrollTrigger.refresh();

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    paused: true,
    onUpdate: (self) => {
      self.direction === 1
        ? $(".cta-group").addClass("hide")
        : $(".cta-group").removeClass("hide");
    }
  });
}
function togglePlayMusic() {
  const thisTarget = $("header .btn-music");
  const audio = $("#player")[0];

  // Kiểm tra xem phần tử audio có tồn tại không
  if (!audio) {
    console.error("Không tìm thấy phần tử audio");
    return;
  }

  thisTarget.on("click", function (e) {
    e.preventDefault();

    // Chuyển đổi class để cập nhật giao diện nút
    thisTarget.toggleClass("pause");

    try {
      if (audio.paused) {
        // Đảm bảo âm thanh không bị mute
        audio.muted = false;
        audio.play().catch((error) => {
          console.error("Lỗi phát nhạc:", error);
        });
      } else {
        audio.pause();
        // Tùy chọn: Đặt lại thời gian về 0 nếu muốn phát lại từ đầu lần sau
        // audio.currentTime = 0;
      }
    } catch (error) {
      console.error("Lỗi điều khiển âm thanh:", error);
    }
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
  detailSlider();
  gallery();
  accomodationnFilter();
  scrollCTA();
  togglePlayMusic();
  customDropdown();
};

document.addEventListener("DOMContentLoaded", () => {
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
