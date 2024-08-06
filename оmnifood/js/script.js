//////////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//////////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
btnNavEl.addEventListener('click', () => headerEl.classList.toggle('nav-open'));

//////////////////////////////////////////////////////////////
// smooth scrolling animation
const allLinks = [...document.querySelectorAll('a:link')];
allLinks.forEach((link) => link.addEventListener('click', (e) => {
  e.preventDefault();
  const href = link.getAttribute('href');

  // Scroll back to top:
  if (href === '#') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Scroll to other links
  if (href !== '#' && href.startsWith('#')) {
    const sectionEl = document.querySelector(href);
    sectionEl.scrollIntoView({ behavior: 'smooth' });
  }

  // Close mobile navigation
  if (link.classList.contains('main-nav-link')) {
    headerEl.classList.toggle('nav-open')
  }

}))

////////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector('.section-hero');

const observer = new IntersectionObserver(function (entries) {
  const ent = entries[0];
  if (!ent.isIntersecting) {
    document.body.classList.add('sticky');
  }

  if (ent.isIntersecting) {
    document.body.classList.remove('sticky');
  }
}, {
  // In the viewport
  root: null,
  threshold: 0,
  rootMargin: '-80px',
});
observer.observe(sectionHeroEl);

