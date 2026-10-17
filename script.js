const nav = document.getElementById('site-nav');
const toggle = document.querySelector('.nav-toggle');
const menuFilters = [...document.querySelectorAll('.menu-filter')];
const dishes = [...document.querySelectorAll('.dish[data-category]')];
const menuResults = document.querySelector('.menu-results');

function closeNavigation() {
  if (!nav || !toggle) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}

if (nav && toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  document.querySelectorAll('.site-nav .nav-links a, .site-nav .nav-actions a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1001px)').matches) closeNavigation();
  });
}

if (menuFilters.length && dishes.length) {
  menuFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      let visible = 0;

      menuFilters.forEach((item) => {
        const active = item === filter;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      dishes.forEach((dish) => {
        const show = category === 'all' || dish.dataset.category === category;
        dish.hidden = !show;
        if (show) visible += 1;
      });

      if (menuResults) {
        const label = filter.textContent.trim().toLowerCase().replace(/^./, (c) => c.toUpperCase());
        menuResults.textContent = category === 'all'
          ? 'Showing all signature picks'
          : `Showing ${visible} ${label.toLowerCase()} picks`;
      }
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.editorial, .photo-break-copy, .closing-copy');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((target) => {
    target.classList.add('reveal-ready');
    revealObserver.observe(target);
  });
}
