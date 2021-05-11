var tl = gsap.timeline();

tl.from('.gallery', {
  y: 20,
  opacity: 0,
  duration: 3,
  ease: Power4.easeOut,
});
