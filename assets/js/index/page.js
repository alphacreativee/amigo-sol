const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function eCardList() {
  const items = document.querySelectorAll(".e-card-item");
  if (!items.length) return;

  items.forEach((item) => {
    const siblings = Array.from(
      item.parentNode.querySelectorAll(".e-card-item"),
    );
    const index = siblings.indexOf(item);
    const delay = (index % siblings.length) * 0.15;

    const isOdd = index % 2 !== 0;
    const yFrom = isOdd ? 100 : 20;
    const yTo = isOdd ? 80 : 0;

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
          duration: 0.6,
          delay,
        });
      },
    });
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  eCardList();
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
