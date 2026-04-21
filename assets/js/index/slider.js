export function sliderAmigo() {
  document.querySelectorAll(".slider-amigo-wrapper").forEach((wrapper) => {
    if (!wrapper.querySelector(".slider-amigo-image")) return;

    let isTransitioning = false;

    function getSlideData(slideContent) {
      return {
        sub: slideContent.querySelector(".amigo-sub")?.innerHTML || "",
        name: slideContent.querySelector(".amigo-name")?.innerHTML || "",
        usb: slideContent.querySelector(".amigo-usb")?.outerHTML || "",
        description:
          slideContent.querySelector(".amigo-description")?.innerHTML || "",
        button: slideContent.querySelector(".amigo-button")?.innerHTML || "",
      };
    }

    function buildHTML({ name, usb, description, button, sub }) {
      let html = "";
      if (sub)
        html += `<div class="current-sub b0-font color-secondary">${sub}</div>`;
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
      const currentSub = container.querySelector(".current-sub");
      const currentName = container.querySelector(".current-name");
      const currentUsb = container.querySelector(".current-usb");
      const currentDesc = container.querySelector(".current-description");
      const currentBtn = container.querySelector(".current-button");

      if (currentSub) {
        gsap.to(currentSub, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
        });
      }
      if (currentName) {
        gsap.to(currentName, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.05,
        });
      }
      if (currentUsb) {
        gsap.to(currentUsb, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.1,
        });
      }
      if (currentDesc) {
        gsap.to(currentDesc, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.15,
        });
      }
      if (currentBtn) {
        gsap.to(currentBtn, {
          autoAlpha: 0,
          y: -5,
          ease: "power2.out",
          duration: 0.3,
          delay: 0.2,
        });
      }
    }

    function animateIn(container, delay = 0) {
      const newSub = container.querySelector(".current-sub");
      const newName = container.querySelector(".current-name");
      const newUsb = container.querySelector(".current-usb");
      const newDesc = container.querySelector(".current-description");
      const newBtn = container.querySelector(".current-button");

      if (newSub) {
        gsap.fromTo(
          newSub,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4, delay },
        );
      }

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
            delay: delay + 0.1,
            stagger: 0.08,
          },
        );
      } else if (newName) {
        gsap.fromTo(
          newName,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.4,
            delay: delay + 0.1,
          },
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
            delay: delay + 0.25,
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
            delay: delay + 0.35,
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
            delay: delay + 0.45,
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
    const imageEl = wrapper.querySelector(".slider-amigo-image");

    if (initialSlideContent && contentContainer) {
      contentContainer.innerHTML = buildHTML(getSlideData(initialSlideContent));
      gsap.set(contentContainer.children, { autoAlpha: 0 });
    }

    if (imageEl) {
      gsap.set(imageEl, { autoAlpha: 0, y: 20 });
    }

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top 50%",
      once: true,
      onEnter: () => {
        if (imageEl) {
          gsap.to(imageEl, {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.8,
          });
        }

        if (contentContainer) animateIn(contentContainer, 0.3);

        imageSwiper.params.autoplay = {
          delay: 3000,
          disableOnInteraction: false,
        };
        imageSwiper.autoplay.start();
      },
    });

    const isMobile = window.matchMedia("(max-width: 991px)").matches;

    if (isMobile) {
      const contentEl = wrapper.querySelector(".slider-amigo-content-import");

      if (contentEl) {
        let touchStartX = 0;
        let touchEndX = 0;

        contentEl.addEventListener(
          "touchstart",
          (e) => {
            touchStartX = e.changedTouches[0].screenX;
          },
          { passive: true },
        );

        contentEl.addEventListener(
          "touchend",
          (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
              if (diff > 0) {
                imageSwiper.slideNext();
              } else {
                imageSwiper.slidePrev();
              }
            }
          },
          { passive: true },
        );
      }
    }

    const realSlideCount = imageSwiper.slides.filter(
      (s) => !s.classList.contains("swiper-slide-duplicate"),
    ).length;
    if (!isMobile && imageEl && realSlideCount > 1) {
      const cursor = document.createElement("div");
      cursor.classList.add("amigo-cursor");
      cursor.innerHTML = `
        <span class="amigo-cursor-arrow amigo-cursor-prev">
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.95117 10.5L0.532566 5.57399C0.488922 5.53432 0.488922 5.46568 0.532566 5.42601L5.95117 0.5" stroke="#ffffff" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="amigo-cursor-arrow amigo-cursor-next">
          <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 10.5L5.91861 5.57399C5.96225 5.53432 5.96225 5.46568 5.91861 5.42601L0.5 0.5" stroke="#ffffff" stroke-linecap="round"/>
          </svg>
        </span>
      `;
      document.body.appendChild(cursor);

      Object.assign(cursor.style, {
        position: "fixed",
        top: "0",
        left: "0",
        pointerEvents: "none",
        zIndex: "567",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#ca6627",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        transform: "translate(-50%, -50%)",
      });

      gsap.set(cursor, { scale: 0, opacity: 0 });

      let isLeft = true;

      imageEl.addEventListener("mousemove", (e) => {
        const rect = imageEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        isLeft = x < rect.width / 2;

        gsap.set(cursor, { x: e.clientX, y: e.clientY });

        cursor.querySelector(".amigo-cursor-prev").style.display = isLeft
          ? "flex"
          : "none";
        cursor.querySelector(".amigo-cursor-next").style.display = isLeft
          ? "none"
          : "flex";
      });

      imageEl.addEventListener("mouseenter", () => {
        imageEl.style.cursor = "none";
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      imageEl.addEventListener("mouseleave", () => {
        imageEl.style.cursor = "";
        gsap.to(cursor, {
          opacity: 0,
          scale: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      });

      imageEl.addEventListener("click", () => {
        if (isLeft) {
          imageSwiper.slidePrev();
        } else {
          imageSwiper.slideNext();
        }
      });
    }
  });
}
