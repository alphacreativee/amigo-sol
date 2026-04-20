export function sliderAmigo() {
  document.querySelectorAll(".slider-amigo-wrapper").forEach((wrapper) => {
    if (!wrapper.querySelector(".slider-amigo-image")) return;

    let isTransitioning = false;

    function getSlideData(slideContent) {
      return {
        name: slideContent.querySelector(".amigo-name")?.innerHTML || "",
        usb: slideContent.querySelector(".amigo-usb")?.outerHTML || "",
        description:
          slideContent.querySelector(".amigo-description")?.innerHTML || "",
        button: slideContent.querySelector(".amigo-button")?.innerHTML || "",
      };
    }

    function buildHTML({ name, usb, description, button }) {
      let html = "";
      if (name)
        html += `<div class="current-name h1-mobile color-secondary font-heading">${name}</div>`;
      if (usb) html += `<div class="current-usb">${usb}</div>`;
      if (description)
        html += `<div class="current-description b1-font color-black">${description}</div>`;
      if (button) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = button;
        const anchor = tempDiv.querySelector("a");
        if (anchor) anchor.classList.add("global-button");
        html += `<div class="current-button">${tempDiv.innerHTML}</div>`;
      }
      return html;
    }

    function animateOut(container) {
      const currentName = container.querySelector(".current-name");
      const currentUsb = container.querySelector(".current-usb");
      const currentDesc = container.querySelector(".current-description");
      const currentBtn = container.querySelector(".current-button");

      if (currentName) {
        gsap.to(currentName, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
        });
      }
      if (currentUsb) {
        gsap.to(currentUsb, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.05,
        });
      }
      if (currentDesc) {
        gsap.to(currentDesc, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.1,
        });
      }
      if (currentBtn) {
        gsap.to(currentBtn, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.15,
        });
      }
    }

    function animateIn(container, delay = 0) {
      const newName = container.querySelector(".current-name");
      const newUsb = container.querySelector(".current-usb");
      const newDesc = container.querySelector(".current-description");
      const newBtn = container.querySelector(".current-button");

      if (newName && typeof SplitText !== "undefined") {
        gsap.set(newName, { autoAlpha: 1 });
        const split = new SplitText(newName, {
          type: "lines",
          linesClass: "line",
        });
        split.lines.forEach((line) => {
          const wrapEl = document.createElement("div");
          wrapEl.style.overflow = "hidden";
          line.parentNode.insertBefore(wrapEl, line);
          wrapEl.appendChild(line);
        });
        gsap.fromTo(
          split.lines,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.5,
            delay,
            stagger: 0.08,
          },
        );
      } else if (newName) {
        gsap.fromTo(
          newName,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4, delay },
        );
      }

      if (newUsb) {
        gsap.fromTo(
          newUsb,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.4,
            delay: delay + 0.15,
          },
        );
      }

      if (newDesc) {
        gsap.fromTo(
          newDesc,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.4,
            delay: delay + 0.25,
          },
        );
      }

      if (newBtn) {
        gsap.fromTo(
          newBtn,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.4,
            delay: delay + 0.35,
          },
        );
      }
    }

    const imageSwiper = new Swiper(
      wrapper.querySelector(".slider-amigo-image"),
      {
        effect: "fade",
        fadeEffect: { crossFade: true },
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1100,
        autoplay: false,
        pagination: {
          el: wrapper.querySelector(".slider-amigo-image .swiper-pagination"),
        },
        on: {
          slideChangeTransitionStart: function () {
            if (isTransitioning) return;
            isTransitioning = true;

            const contentContainer = wrapper.querySelector(
              ".slider-amigo-content-import",
            );
            if (contentContainer) animateOut(contentContainer);

            const swiper = this;
            setTimeout(() => {
              const nextSlide = swiper.slides[swiper.activeIndex];
              const slideContent = nextSlide?.querySelector(
                ".amigo-slide-content",
              );
              if (!slideContent || !contentContainer) return;

              contentContainer.innerHTML = buildHTML(
                getSlideData(slideContent),
              );
              animateIn(contentContainer, 0.1);
            }, 400);
          },

          slideChangeTransitionEnd: function () {
            isTransitioning = false;
          },
        },
      },
    );

    const initialSlide = imageSwiper.slides[imageSwiper.activeIndex];
    const initialSlideContent = initialSlide?.querySelector(
      ".amigo-slide-content",
    );
    const contentContainer = wrapper.querySelector(
      ".slider-amigo-content-import",
    );

    if (initialSlideContent && contentContainer) {
      contentContainer.innerHTML = buildHTML(getSlideData(initialSlideContent));
      gsap.set(contentContainer.children, { autoAlpha: 0 });
    }

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 50%",
      once: true,
      onEnter: () => {
        if (contentContainer) animateIn(contentContainer);

        imageSwiper.params.autoplay = {
          delay: 3000,
          disableOnInteraction: false,
        };
        imageSwiper.autoplay.start();
      },
    });
  });
}
