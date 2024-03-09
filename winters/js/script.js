const checkbox = document.querySelector('.navigation__checkbox');
const navLinks = document.querySelector('.navigation__list');
navLinks.addEventListener('click', (e) => {
  const navLinkClass = e.target.classList[0];
  console.log(navLinkClass);
  if (navLinkClass === 'navigation__link') {
    checkbox.checked = false;
    console.log(checkbox);
  }
})
