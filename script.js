(function () {
  document.documentElement.classList.add("js");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  initNavToggle();

  if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
    initScrollAnimations();
  }

  function initNavToggle() {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav__toggle");
    const menu = document.querySelector(".nav__menu");

    if (!nav || !toggle || !menu) {
      return;
    }

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll("[data-reveal]").forEach((section) => {
      const staggerItems = section.querySelectorAll(
        ".skills__chip, .timeline__item, .education__item"
      );
      const title = section.querySelector(".section__title");
      const targets = staggerItems.length
        ? [title, ...staggerItems].filter(Boolean)
        : [section];

      gsap.from(targets, {
        opacity: 0,
        y: staggerItems.length ? 20 : 40,
        duration: staggerItems.length ? 0.5 : 0.7,
        ease: "power2.out",
        stagger: staggerItems.length ? 0.04 : 0,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });
    });

    const heroTargets = document.querySelectorAll(
      ".hero__name, .hero__title, .hero__tagline, .hero__contact"
    );

    if (heroTargets.length) {
      gsap.from(heroTargets, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    }
  }
})();
