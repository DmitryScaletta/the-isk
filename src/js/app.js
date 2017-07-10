// mobile menu
(() => {
  const menuContainer = document.querySelector('.js-menu');
  if (menuContainer === null) return;

  const toggleMenu = () => menuContainer.classList.toggle('opened');

  Array.prototype.forEach.call(
    document.getElementsByClassName('js-toggle-menu'),
    (item) => item.addEventListener('click', toggleMenu),
  );
})();
