(() => {
  const legalRows = document.querySelectorAll(".universal-footer__legal");
  if (!legalRows.length) return;

  const versionLabels = [];

  legalRows.forEach((legalRow) => {
    if (legalRow.querySelector(".universal-footer__site-meta")) return;

    const siteMeta = document.createElement("span");
    siteMeta.className = "universal-footer__site-meta";

    const creditLink = document.createElement("a");
    creditLink.href = "https://careersteps.net";
    creditLink.target = "_blank";
    creditLink.rel = "noopener";
    creditLink.setAttribute("aria-label", "Career Steps Consulting LLC website");

    const creditLogo = document.createElement("img");
    creditLogo.src = "/assets/images/career-steps-consulting-logo.png";
    creditLogo.alt = "";

    const creditText = document.createElement("span");
    creditText.textContent = "Site developed and maintained by Career Steps Consulting LLC";

    const versionLabel = document.createElement("span");
    versionLabel.className = "universal-footer__version";
    versionLabel.textContent = "Version";
    versionLabels.push(versionLabel);

    creditLink.append(creditLogo, creditText);
    siteMeta.append(creditLink, versionLabel);
    legalRow.append(siteMeta);
  });

  fetch("/VERSION", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Version unavailable");
      return response.text();
    })
    .then((version) => {
      const cleanVersion = version.trim();
      versionLabels.forEach((label) => {
        label.textContent = cleanVersion ? `Version ${cleanVersion}` : "Version";
      });
    })
    .catch(() => {
      versionLabels.forEach((label) => {
        label.textContent = "Version unavailable";
      });
    });
})();
