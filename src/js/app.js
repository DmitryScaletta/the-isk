// main slider
(() => {
  const SLIDER_INTERVAL = 4000;

  const sliderContainer = document.querySelector('.main-slider');
  if (sliderContainer === null) return;

  const slides       = sliderContainer.querySelectorAll('.js-slide');
  const dots         = sliderContainer.querySelectorAll('.js-dot');
  const slidesCount  = slides.length;
  let   currentSlide = 0;
  let   timeCounter  = 0;

  // const getPrevSlide = () => ((currentSlide === 0) ? slidesCount - 1 : currentSlide - 1);
  const getNextSlide = () => ((currentSlide === slidesCount - 1) ? 0 : currentSlide + 1);

  const toggleSlide = index => slides[index].classList.toggle('active');
  const toggleDot   = index => dots  [index].classList.toggle('active');

  const toggleFullSlide = () => {
    toggleSlide(currentSlide);
    toggleDot(currentSlide);
  };

  const setCurrentSlide = (index) => {
    toggleFullSlide();
    currentSlide = index;
    toggleFullSlide();
    timeCounter = 0;
  };

  // const prevSlide = () => setCurrentSlide(getPrevSlide());
  const nextSlide = () => setCurrentSlide(getNextSlide());

  Array.prototype.forEach.call(
    dots,
    (dot, index) => dot.addEventListener('click', () => setCurrentSlide(index)),
  );

  const tick = 1000 / 30; // 30 times per second
  setInterval(() => {
    timeCounter += tick;
    if (timeCounter >= SLIDER_INTERVAL) nextSlide();
  }, tick);
})();


// mobile menu
(() => {
  const menuContainer = document.querySelector('.js-menu');
  if (menuContainer === null) return;

  const toggleMenu = () => menuContainer.classList.toggle('opened');

  Array.prototype.forEach.call(
    document.getElementsByClassName('js-toggle-menu'),
    item => item.addEventListener('click', toggleMenu),
  );
})();
