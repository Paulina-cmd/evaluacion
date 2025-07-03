const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateCounters = () => {
  if (hasAnimated) return;
  hasAnimated = true;

  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;
    const speed = 200; // menor = más rápido

    const step = () => {
      const increment = Math.ceil((target - current) / 10);
      current += increment;
      if (current >= target) {
        counter.innerText = target;
      } else {
        counter.innerText = current;
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  });
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(counter => observer.observe(counter));
