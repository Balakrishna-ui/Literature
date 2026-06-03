/* ===================================================
   Dr. Rajesh Varma — Interactivity
   =================================================== */


  /* ---------- Navbar scroll shadow ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---------- Scroll spy — active section in navigation ---------- */
  const navLinks = document.querySelectorAll('.navbar__link[data-section]');
  const trackedSections = document.querySelectorAll('main [data-section]');

  if (navLinks.length && trackedSections.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.dataset.section;
        navLinks.forEach((link) => {
          link.classList.toggle('navbar__link--active', link.dataset.section === id);
        });
      });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });

    trackedSections.forEach((section) => spyObserver.observe(section));
  }

  /* ---------- Section reveal on scroll ---------- */
  const pageSections = document.querySelectorAll('.page-section:not(.page-section--immersive)');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  pageSections.forEach((section) => sectionObserver.observe(section));

  /* ---------- Mobile menu toggle ---------- */
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('main-nav');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('navbar__nav--open');
    toggle.setAttribute('aria-expanded',
      nav.classList.contains('navbar__nav--open'));
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('navbar__nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Intersection Observer — staggered card reveal ---------- */
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 120}ms`;
        entry.target.classList.add('card--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));

  /* ==========================================================
     CAROUSEL BANNER SECTION
     ========================================================== */
  const track = document.querySelector('.carousel__track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');
    const dotsNav = document.querySelector('.carousel__nav');
    const dots = Array.from(dotsNav.children);

    const moveToSlide = (currentSlide, targetSlide, targetDot) => {
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
      
      const currentDot = dotsNav.querySelector('.current-indicator');
      currentDot.classList.remove('current-indicator');
      targetDot.classList.add('current-indicator');
    };

    // When I click right, move slides to the right
    nextButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let targetSlide = currentSlide.nextElementSibling;
      let targetDot = dotsNav.querySelector('.current-indicator').nextElementSibling;
      
      if (!targetSlide) {
        targetSlide = slides[0];
        targetDot = dots[0];
      }
      
      moveToSlide(currentSlide, targetSlide, targetDot);
    });

    // When I click left, move slides to the left
    prevButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let targetSlide = currentSlide.previousElementSibling;
      let targetDot = dotsNav.querySelector('.current-indicator').previousElementSibling;
      
      if (!targetSlide) {
        targetSlide = slides[slides.length - 1];
        targetDot = dots[dots.length - 1];
      }

      moveToSlide(currentSlide, targetSlide, targetDot);
    });

    // When I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('button');
      if (!targetDot) return;

      const currentSlide = track.querySelector('.current-slide');
      const currentDot = dotsNav.querySelector('.current-indicator');
      const targetIndex = dots.findIndex(dot => dot === targetDot);
      const targetSlide = slides[targetIndex];

      moveToSlide(currentSlide, targetSlide, targetDot);
    });

    // Optional: Auto slide every 5 seconds
    setInterval(() => {
      nextButton.click();
    }, 5000);
  }

  /* ==========================================================
     TESTIMONIALS CAROUSEL
     ========================================================== */
  const testTrack = document.querySelector('.testimonials__track');
  if (testTrack) {
    const testSlides = Array.from(testTrack.children);
    const testNextButton = document.querySelector('.testimonials__nav-btn--next');
    const testPrevButton = document.querySelector('.testimonials__nav-btn--prev');
    const testDotsNav = document.querySelector('.testimonials__pagination');
    const testDots = Array.from(testDotsNav.children);

    const moveToTestSlide = (currentSlide, targetSlide, targetDot) => {
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
      
      const currentDot = testDotsNav.querySelector('.current-dot');
      currentDot.classList.remove('current-dot');
      targetDot.classList.add('current-dot');
      
      // Update track position so the new slide takes the center
      const targetIndex = testSlides.indexOf(targetSlide);
      testTrack.style.transform = `translateX(-${targetIndex * 100}%)`;
    };

    // Right Arrow
    testNextButton.addEventListener('click', () => {
      const currentSlide = testTrack.querySelector('.current-slide');
      let targetSlide = currentSlide.nextElementSibling;
      let targetDot = testDotsNav.querySelector('.current-dot').nextElementSibling;
      
      if (!targetSlide) {
        targetSlide = testSlides[0];
        targetDot = testDots[0];
      }
      
      moveToTestSlide(currentSlide, targetSlide, targetDot);
    });

    // Left Arrow
    testPrevButton.addEventListener('click', () => {
      const currentSlide = testTrack.querySelector('.current-slide');
      let targetSlide = currentSlide.previousElementSibling;
      let targetDot = testDotsNav.querySelector('.current-dot').previousElementSibling;
      
      if (!targetSlide) {
        targetSlide = testSlides[testSlides.length - 1];
        targetDot = testDots[testDots.length - 1];
      }

      moveToTestSlide(currentSlide, targetSlide, targetDot);
    });

    // Dots navigation
    testDotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('button');
      if (!targetDot) return;

      const currentSlide = testTrack.querySelector('.current-slide');
      const targetIndex = testDots.findIndex(dot => dot === targetDot);
      const targetSlide = testSlides[targetIndex];

      moveToTestSlide(currentSlide, targetSlide, targetDot);
    });

    // Auto slide every 6 seconds
    setInterval(() => {
      testNextButton.click();
    }, 6000);
  }

  /* ---------- Persist selected book before navigation ---------- */
  const readMoreLinks = document.querySelectorAll('.works .btn--read-more');
  readMoreLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      const match = /[?&]book=([^&]+)/.exec(href);
      if (match?.[1]) {
        globalThis.localStorage.setItem('selectedBookId', decodeURIComponent(match[1]));
      }
    });
  });


