(() => {
  const nav = document.querySelector(".site-nav");
  const openButton = document.querySelector(".nav-toggle");
  const closeButton = document.querySelector(".nav-close");

  const setNavOpen = (isOpen) => {
    if (!nav || !openButton) return;
    nav.dataset.open = String(isOpen);
    openButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
    if (isOpen) closeButton?.focus();
  };

  openButton?.addEventListener("click", () => setNavOpen(true));
  closeButton?.addEventListener("click", () => setNavOpen(false));
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.dataset.open === "true") setNavOpen(false);
  });

  const cookieBanner = document.querySelector(".cookie-banner");
  const cookieButton = document.querySelector("[data-cookie-accept]");
  let cookieAccepted = false;
  try {
    cookieAccepted = localStorage.getItem("coffee-nutz-cookie-accepted") === "true";
  } catch (_) {
    cookieAccepted = false;
  }

  if (cookieBanner && !cookieAccepted) cookieBanner.hidden = false;
  cookieButton?.addEventListener("click", () => {
    try {
      localStorage.setItem("coffee-nutz-cookie-accepted", "true");
    } catch (_) {
      // The banner still closes when storage is unavailable.
    }
    if (cookieBanner) cookieBanner.hidden = true;
  });

  const stageImage = document.querySelector("[data-gallery-stage]");
  const thumbs = Array.from(document.querySelectorAll("[data-gallery-thumb]"));
  const prev = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");
  let currentIndex = 0;

  const showImage = (index) => {
    if (!stageImage || thumbs.length === 0) return;
    currentIndex = (index + thumbs.length) % thumbs.length;
    const active = thumbs[currentIndex];
    stageImage.setAttribute("src", active.dataset.src || "");
    stageImage.setAttribute("alt", active.dataset.alt || "Coffee Nutz menu item");
    thumbs.forEach((thumb, thumbIndex) => {
      thumb.setAttribute("aria-current", String(thumbIndex === currentIndex));
    });
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showImage(index));
  });
  prev?.addEventListener("click", () => showImage(currentIndex - 1));
  next?.addEventListener("click", () => showImage(currentIndex + 1));
})();
