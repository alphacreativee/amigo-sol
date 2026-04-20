const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function eCardList() {
  const items = document.querySelectorAll(".e-card-item");
  if (!items.length) return;

  const isMobile = window.innerWidth < 991;

  items.forEach((item) => {
    const siblings = Array.from(
      item.parentNode.querySelectorAll(".e-card-item"),
    );
    const index = siblings.indexOf(item);

    let yFrom, yTo, delay;

    if (isMobile) {
      yFrom = 40;
      yTo = 0;
      delay = 0;
    } else {
      delay = (index % siblings.length) * 0.15;
      const isOdd = index % 2 !== 0;
      yFrom = isOdd ? 100 : 20;
      yTo = isOdd ? 80 : 0;
    }

    gsap.set(item, { autoAlpha: 0, y: yFrom });

    ScrollTrigger.create({
      trigger: item,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(item, {
          autoAlpha: 1,
          y: yTo,
          ease: "power2.out",
          duration: 0.8,
          delay,
        });
      },
    });
  });
}
function eFadeTextPageDetail() {
  if (!document.querySelector(".tl-text-auto")) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const title = document.querySelector(".text-e-title-auto");
  const description = document.querySelector(".text-e-desc-auto");
  const descItems = description ? description.querySelectorAll("li") : [];
  const btn = document.querySelector(".text-e-btn-auto");
  const box = document.querySelector(".text-e-auto-box");
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

  if (descItems.length) {
    gsap.set(descItems, { autoAlpha: 0, y: 20 });
  } else if (description) {
    gsap.set(description, { autoAlpha: 0, y: 20 });
  }
  if (box.length) {
    gsap.set(descItems, { autoAlpha: 0, y: 20 });
  }

  const tl = gsap.timeline();

  if (splitLines) {
    tl.to(splitLines, {
      yPercent: 0,
      ease: "power3.out",
      duration: 0.8,
      stagger: 0.05,
    });
  }

  if (descItems.length) {
    tl.to(
      descItems,
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.5,
        stagger: 0.12,
      },
      "-=0.3",
    );
  } else if (description) {
    tl.fromTo(
      description,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.5 },
      "-=0.3",
    );
  }
  if (box) {
    tl.fromTo(
      box,
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.5 },
      "-=0.3",
    );
  }
}
function cRowList() {
  if (!document.querySelector(".c-row-list")) return;

  document.querySelectorAll(".c-row-item").forEach((item) => {
    const image = item.querySelector(".list-item__image");
    const title = item.querySelector(".list-item__content--title");
    const desc = item.querySelector(".list-item__content--desc");
    const usb = item.querySelector(".list-item__info");
    const usbItems = usb ? usb.querySelectorAll("li") : [];
    const btn = item.querySelector(".text-e-btn");
    // ✅ SplitText title
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

    if (image) gsap.set(image, { autoAlpha: 0, y: 30 });
    if (desc) gsap.set(desc, { autoAlpha: 0, y: 20 });
    if (usbItems.length) gsap.set(usbItems, { autoAlpha: 0, y: 20 });
    if (btn) gsap.set(btn, { autoAlpha: 0, y: 20 });
    ScrollTrigger.create({
      trigger: item,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        if (image) {
          tl.to(image, {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.6,
          });
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
            "-=0.3",
          );
        }

        if (desc) {
          tl.to(
            desc,
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.5 },
            "-=0.2",
          );
        }

        if (usbItems.length) {
          tl.to(
            usbItems,
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.4,
              stagger: 0.1,
            },
            "-=0.2",
          );
        }
        if (btn) {
          tl.to(
            btn,
            { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.5 },
            "-=0.2",
          );
        }
      },
    });
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  eCardList();
  eFadeTextPageDetail();
  cRowList();
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
