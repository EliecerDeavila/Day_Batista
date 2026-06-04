const topnav = document.getElementById('topnav');
window.addEventListener('scroll', () => {
  topnav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.getElementById('topnav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('menu-open'));
  nav.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('menu-open'));
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('menu-open') && !nav.contains(e.target)) {
      nav.classList.remove('menu-open');
    }
  });
}