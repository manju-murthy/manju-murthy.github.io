document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavbar();
  initMobileMenu();
  initDotNav();
  initKeyboardNav();
  initAccordion();
  initBentoLinks();
  initScrollHint();
});

/* === Scroll Reveal === */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

  els.forEach(el => observer.observe(el));

  if (window.location.hash) {
    els.forEach(el => el.classList.add('visible'));
  }
}

/* === Navbar scroll === */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* === Mobile menu === */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      hamburger.classList.remove('open');
      menu.classList.remove('open');
    }
  });
}

/* === Dot Navigation === */
function initDotNav() {
  const dots = document.querySelectorAll('.dot-nav button');
  const sections = [];

  dots.forEach(dot => {
    const id = dot.dataset.section;
    const section = document.getElementById(id);
    if (section) sections.push({ dot, section, id });

    dot.addEventListener('click', () => {
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const match = sections.find(s => s.section === entry.target);
      if (match && entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        match.dot.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s.section));
}

/* === Keyboard Navigation === */
function initKeyboardNav() {
  const sectionIds = ['hero', 'case-studies', 'projects', 'writing', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (sections.length < 2) return;

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      navigateSection(sections, 1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateSection(sections, -1);
    }
  });
}

function navigateSection(sections, direction) {
  const scrollY = window.scrollY + window.innerHeight / 3;
  let current = 0;

  sections.forEach((section, i) => {
    if (scrollY >= section.offsetTop) current = i;
  });

  const next = Math.max(0, Math.min(sections.length - 1, current + direction));
  sections[next].scrollIntoView({ behavior: 'smooth' });
}

/* === Accordion === */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* === Bento card links → open accordion === */
function initBentoLinks() {
  const bentoCards = document.querySelectorAll('[data-open]');
  bentoCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = card.getAttribute('data-open');
      const target = document.getElementById(targetId);
      if (!target) return;

      // Close all accordions, open this one
      document.querySelectorAll('.accordion-item').forEach(item => item.classList.remove('open'));
      target.classList.add('open');

      // Scroll to it
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  });
}

/* === Scroll hint === */
function initScrollHint() {
  const hint = document.querySelector('.scroll-hint');
  if (!hint) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      hint.classList.add('hidden');
    } else {
      hint.classList.remove('hidden');
    }
  }, { passive: true });
}

/* === Section Snap — removed, using CSS scroll-snap === */
