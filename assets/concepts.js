(() => {
  const conceptSelect = document.querySelector("[data-concept-select]");

  conceptSelect?.addEventListener("change", (event) => {
    const destination = event.currentTarget.value;
    if (destination) window.location.assign(destination);
  });

  const navToggle = document.querySelector("[data-concept-nav-toggle]");
  const navigation = document.querySelector("[data-concept-nav]");

  const closeNavigation = () => {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute("aria-expanded", "false");
    navigation.dataset.open = "false";
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    if (navigation) navigation.dataset.open = String(!isOpen);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = [...carousel.querySelectorAll("[data-slide]")];
    const previousButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const status = carousel.querySelector("[data-carousel-status]");
    let currentSlide = Math.max(0, slides.findIndex((slide) => !slide.hidden));

    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const isCurrent = slideIndex === currentSlide;
        slide.hidden = !isCurrent;
        slide.setAttribute("aria-hidden", String(!isCurrent));
      });
      if (status) status.textContent = `${currentSlide + 1} / ${slides.length}`;
    };

    previousButton?.addEventListener("click", () => showSlide(currentSlide - 1));
    nextButton?.addEventListener("click", () => showSlide(currentSlide + 1));
    if (slides.length) showSlide(currentSlide);
  });

  document.querySelectorAll("[data-drink-tabs]").forEach((tabGroup) => {
    const tabs = [...tabGroup.querySelectorAll("[data-drink-filter]")];
    const menu = document.querySelector("[data-drink-menu]");
    const items = menu ? [...menu.querySelectorAll("[data-drink-category]")] : [];

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.drinkFilter;
        tabs.forEach((candidate) => {
          candidate.setAttribute("aria-selected", String(candidate === tab));
        });
        items.forEach((item) => {
          item.hidden = filter !== "all" && item.dataset.drinkCategory !== filter;
        });
      });
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    const motionSelectors = [
      ".chooser-intro",
      ".concept-card",
      ".hero-art",
      ".hero-copy",
      ".theatre-hero__copy",
      ".theatre-hero__image",
      ".theatre-step",
      ".theatre-carousel",
      ".family-hero__copy",
      ".family-hero__photo",
      ".family-story__photos",
      ".family-story__copy",
      ".family-favorite",
      ".playground-hero__copy",
      ".playground-hero__visual img",
      ".drink-card",
      ".journal-hero__copy",
      ".journal-hero__image",
      ".journal-principle",
      ".journal-note",
      ".destination-hero__copy",
      ".destination-fact",
      ".destination-visit__copy",
      ".destination-visit__image",
      ".destination-gallery img",
      ".blue-forward-hero__figure",
      ".blue-forward-hero__copy",
      ".blue-forward-hero__drink",
      ".blue-forward-card",
      ".blue-forward-picks__copy",
      ".blue-forward-picks__visual",
      ".universal-location__copy",
      ".universal-map"
    ];
    const motionTargets = [...document.querySelectorAll(motionSelectors.join(","))];

    document.documentElement.classList.add("motion-ready");
    motionTargets.forEach((target, index) => {
      target.classList.add("motion-target");
      target.style.setProperty("--motion-order", String(index % 4));
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -7%", threshold: 0.08 });

      motionTargets.forEach((target) => observer.observe(target));
    } else {
      motionTargets.forEach((target) => target.classList.add("is-visible"));
    }
  }
})();
