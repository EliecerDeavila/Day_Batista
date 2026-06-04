const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  const spring = 0.08;
  const friction = 0.84;
  let velocity = 0;
  let current = 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const raw = target * easeOut;

    if (progress < 0.9) {
      current = Math.round(raw);
      el.textContent = current;
      requestAnimationFrame(tick);
    } else {
      velocity += (target - current) * spring;
      velocity *= friction;
      current += velocity;
      if (Math.abs(current - target) < 0.5 && Math.abs(velocity) < 0.5) {
        current = target;
        el.textContent = current;
        el.style.transform = 'scale(1)';
        return;
      }
      el.textContent = Math.round(current);
      el.style.transform = `scale(${1 + Math.abs(velocity) * 0.002})`;
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}