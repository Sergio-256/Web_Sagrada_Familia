/* ===========================
   FALLA SAGRADA FAMÍLIA — main.js
   =========================== */

(function () {
  'use strict';

  /* ---------- Navigation ---------- */
  const navbar   = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu  = document.querySelector('.nav-menu');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---------- Scroll Reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children with delay
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Auto-stagger siblings
    if (!el.dataset.delay) {
      const parent = el.parentElement;
      const siblings = [...parent.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 90;
    }
    revealObserver.observe(el);
  });

  /* ---------- Contact Form ---------- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Missatge enviat';
      btn.style.background = 'linear-gradient(135deg,#2d7a3a,#45a854)';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Enviar Missatge';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  /* ---------- Gallery Lightbox (simple) ---------- */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.item-label')?.textContent || 'Foto';
      // Placeholder: in production connect to real lightbox
      console.log('Open lightbox for:', label);
    });
  });

  /* ---------- Navbar scrolled style ---------- */
  const style = document.createElement('style');
  style.textContent = `.navbar.scrolled { box-shadow: 0 4px 30px rgba(0,0,0,0.5); }`;
  document.head.appendChild(style);

})();