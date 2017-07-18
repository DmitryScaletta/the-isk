import Tooltip from 'tooltip.js';
import { lory } from 'lory.js';


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


// mobile menu
(() => {
  const menuContainer = document.querySelector('.js-menu');
  if (menuContainer === null) return;

  const isActiveClass = 'is-active';

  const menuButton = menuContainer.querySelector('.js-toggle-menu');
  if (menuButton === null) return;

  const toggleMenu = () => [menuContainer, menuButton].forEach(item => item.classList.toggle(isActiveClass));

  menuButton.addEventListener('click', toggleMenu);

  const overlay = menuContainer.querySelector('.js-menu-overlay');
  if (overlay !== null) overlay.addEventListener('click', toggleMenu);
})();


// main slider
(() => {
  const SLIDER_INTERVAL = 5000;

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


// sliders
(() => {
  Array.prototype.forEach.call(
    document.getElementsByClassName('js_slider'),
    sliderContainer => lory(sliderContainer, {
      slidesToScroll: 1,
      enableMouseEvents: true,
    }),
  );
})();


// faq accordion
(() => {
  const simpleAccordion = (accordionContainer, options = {}) => {
    const {
      onlyOneActive = false,
      classNameActive = 'active',
    } = options;

    const items = Array.prototype.map.call(
      accordionContainer.children,
      item => ({
        elem: item,
        title: item.firstElementChild,
        content: item.lastElementChild,
      }),
    );

    const setContentMaxHeight = content => content.style.maxHeight =
      (content.style.maxHeight
        ? null
        : `${content.scrollHeight}px`);

    const isItemActive = item => item.elem.classList.contains(classNameActive);

    const toggleItem = (item) => {
      setContentMaxHeight(item.content);
      item.elem.classList.toggle(classNameActive);
    };

    const handleClick = (index) => {
      toggleItem(items[index]);

      if (onlyOneActive) {
        items.forEach((item, i) => {
          if (i !== index && isItemActive(item)) toggleItem(items[i]);
        });
      }
    };

    items.forEach((item, index) => {
      if (isItemActive(item)) setContentMaxHeight(item.content);
      item.title.addEventListener('click', handleClick.bind(null, index));
    });
  };

  Array.prototype.forEach.call(
    document.getElementsByClassName('js-accordion'),
    elem => simpleAccordion(elem, { onlyOneActive: true }),
  );
})();


// form validation
(() => {
  Array.prototype.forEach.call(
    document.querySelectorAll('.form'),
    (form) => {
      const validatedItems = [
        form.querySelector('input[name=name]'),
        form.querySelector('input[name=tel]'),
        form.querySelector('textarea[name=message]'),
      ];

      const tooltips = validatedItems.map(item => new Tooltip(item, {
        title: 'Это обязательное поле',
        trigger: '',
      }));

      const inputInvalidClass = 'invalid';

      // remove invalid class on focus
      validatedItems.forEach((elem, index) => {
        elem.addEventListener('focus', () => {
          if (elem.classList.contains(inputInvalidClass)) elem.classList.remove(inputInvalidClass);
          tooltips[index].hide();
        });
      });

      const validateTextInput = value => value.trim() !== '';

      form.addEventListener('submit', (e) => {
        const isFormValid = validatedItems.every((item, index) => {
          const isItemValid = validateTextInput(item.value);
          if (!isItemValid) {
            item.classList.add(inputInvalidClass);
            tooltips[index].show();
          }
          return isItemValid;
        });

        if (!isFormValid) e.preventDefault();
      });
    },
  );
})();
