// floating button
(() => {
  const floatingButton = document.querySelector('.js-floating-button');
  if (floatingButton === null) return;

  const visibleClass = 'visible';

  const handleFloatingButton = () => {
    const isHidden = window.pageYOffset < 250;
    if (isHidden) {
      floatingButton.classList.remove(visibleClass);
    } else {
      floatingButton.classList.add(visibleClass);
    }
  };

  window.addEventListener('load',   handleFloatingButton);
  window.addEventListener('scroll', handleFloatingButton);
})();


// main slider
(() => {
  const SLIDER_INTERVAL = 4000;

  const sliderContainer = document.querySelector('.slider-main');
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


// faq accordion
(() => {
  const faqContainer = document.querySelector('.js-faq-items');
  if (faqContainer === null) return;

  const items    = faqContainer.getElementsByClassName('js-faq-item');
  const titles   = Array.prototype.map.call(items, item => item.querySelector('.js-faq-title'));
  const contents = Array.prototype.map.call(items, item => item.querySelector('.js-faq-content'));

  const activeClass = 'active';

  const setMaxHeight = (index) => {
    const content = contents[index];
    content.style.maxHeight = items[index].classList.contains(activeClass)
      ? `${content.scrollHeight}px`
      : null;
  };

  const setAllMaxHeights = () => [...Array(items.length)].forEach((_, i) => setMaxHeight(i));

  const removeAllActiveItems = () => {
    Array.prototype.forEach.call(items, item => item.classList.remove(activeClass));
    setAllMaxHeights();
  };

  const setActiveItem = (index) => {
    removeAllActiveItems();
    items[index].classList.toggle(activeClass);
    setMaxHeight(index);
  };

  document.addEventListener('DOMContentLoaded', setAllMaxHeights);

  titles.forEach((title, index) => {
    if (title === null) return;
    title.addEventListener('click', setActiveItem.bind(null, index));
  });
})();
