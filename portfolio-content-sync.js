(() => {
  const linkedInUrl = "https://www.linkedin.com/in/solomon-wakhungu-2712791bb/";
  const titles = {
    "/": "Solomon Wakhungu | Cloud Platform Engineer",
    "/index.html": "Solomon Wakhungu | Cloud Platform Engineer",
    "/index.htm": "Solomon Wakhungu | Cloud Platform Engineer",
    "/experience.html": "Experience | Solomon Wakhungu, Senior Software Engineer",
    "/projects.html": "Projects & Case Studies | Solomon Wakhungu",
    "/tools.html": "Engineering Stack | Solomon Wakhungu",
  };
  const navigationRoutes = new Map([
    ["/experience", "experience.html"],
    ["/projects", "projects.html"],
    ["/tools", "tools.html"],
  ]);
  const workingNavigationPaths = new Set(
    [...navigationRoutes.values()].map((route) => `/${route}`),
  );

  function workingNavigationUrl(rawHref) {
    if (!rawHref) return null;
    const url = new URL(rawHref, window.location.href);
    if (url.origin !== window.location.origin) return null;
    const mappedRoute = navigationRoutes.get(url.pathname.replace(/\/+$/, ""));
    if (mappedRoute) url.pathname = `/${mappedRoute}`;
    return workingNavigationPaths.has(url.pathname) ? url : null;
  }

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;
    const anchor = event.target.closest?.("a[href]");
    const url = workingNavigationUrl(anchor?.getAttribute("href"));
    if (!url) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(url.href);
  }, true);

  const text = new Map([
    ["AWS Nuke", "kFLEET"],
    ["Nuke a whole AWS account and delete all its resources.", "Multi-cluster Kubernetes management with agent onboarding, real-time UI, and MCP tools."],
    ["Aviatrix Terraform Provider", "Engineering Case Studies"],
    ["Terraform module to deploy Aviatrix Controller/Copilot", "Production platforms, autonomous agents, and agent-ready developer tooling."],
    ["Python programming language", "Backend engineering and automation"],
    ["Golang programming language", "Cloud services and platform tooling"],
    ["Terraform programming language", "Repeatable cloud infrastructure"],
    ["ChatGPT", "Kubernetes"],
    ["AI Assistant", "Container orchestration"],
    ["Notion", "AWS"],
    ["Productivity Tool", "Cloud platform"],
    ["Nextjs", "GitHub Actions"],
    ["React framework", "CI/CD automation"],
    ["LEARN MORE ABOUT MY TRACK RECORD", "DOWNLOAD MY RESUME"],
    ["VIEW EXPERIENCE AND RESUME", "DOWNLOAD MY RESUME"],
    ["EXPLORE MY", "READ ENGINEERING"],
    ["LATEST PROJECTS", "CASE STUDIES"],
  ]);

  const cards = [
    {
      old: "AWS Nuke",
      current: "kFLEET",
      href: "https://github.com/1solomonwakhungu/kfleet",
      image: "images/kfleet-project.svg",
      external: true,
    },
    {
      old: "Aviatrix Terraform Provider",
      current: "Engineering Case Studies",
      href: "case-studies.html",
      image: "images/case-studies-project.svg",
      external: false,
    },
  ];

  const tools = [
    { old: "ChatGPT", current: "Kubernetes", href: "https://kubernetes.io/", image: "images/kubernetes.svg" },
    { old: "Notion", current: "AWS", href: "https://aws.amazon.com/", image: "images/aws.svg" },
    { old: "Nextjs", current: "GitHub Actions", href: "https://github.com/features/actions", image: "images/github-actions.svg" },
  ];

  function patch() {
    const wantedTitle = titles[window.location.pathname];
    if (wantedTitle && document.title !== wantedTitle) document.title = wantedTitle;

    const exact = (selector, value) =>
      [...document.querySelectorAll(selector)].find((node) => node.textContent.trim() === value);
    const profileName = exact("p", "SOLOMON WAKHUNGU");
    const profileDescription = exact("p", "Senior Software Engineer building reliable cloud platforms, Kubernetes systems, and AI infrastructure.");
    const heroTitle = exact("h1", "SOFTWARE ENGINEER");
    const heroIntro = exact("p", "I build reliable cloud platforms, Kubernetes systems, and AI infrastructure with Go, Python, AWS, and Terraform. My work focuses on secure automation, observable operations, and repeatable delivery for production teams.");
    const firstStat = exact("p", "5+");
    profileName?.classList.add("portfolio-profile-name");
    profileDescription?.classList.add("portfolio-profile-description");
    profileName?.closest('[data-framer-name="Bio"]')?.parentElement?.classList.add("portfolio-profile-card");
    heroTitle?.classList.add("portfolio-hero-title");
    heroIntro?.classList.add("portfolio-hero-intro");
    const hero = heroTitle?.closest('[data-framer-name="Hero"]');
    hero?.classList.add("portfolio-hero");
    hero?.parentElement?.classList.add("portfolio-right-column");
    firstStat?.parentElement?.parentElement?.classList.add("portfolio-stat-group");

    document.querySelectorAll(".framer-108jl35-container").forEach((container) => {
      const anchor = container.querySelector("a");
      if (anchor) {
        anchor.href = linkedInUrl;
        anchor.target = "_blank";
        anchor.rel = "noopener";
        anchor.setAttribute("aria-label", "LinkedIn");
      }
      container.hidden = true;
    });

    const forms = [...document.querySelectorAll("form")];
    const contactForm = forms.find((form) => form.getClientRects().length > 0) || forms[0];
    if (contactForm) {
      let contactAnchor = document.getElementById("contact");
      if (!contactAnchor) {
        contactAnchor = document.createElement("span");
        contactAnchor.id = "contact";
        contactAnchor.className = "portfolio-contact-anchor";
        contactAnchor.setAttribute("aria-hidden", "true");
      }
      contactForm.before(contactAnchor);
      if (window.location.hash === "#contact" && !window.__portfolioContactLocated) {
        window.__portfolioContactLocated = true;
        requestAnimationFrame(() => contactAnchor.scrollIntoView({ block: "start" }));
      }
    }

    document.querySelectorAll("h1,h2,h3,h4,p,option,button").forEach((node) => {
      const value = node.textContent.trim();
      const replacement = text.get(value);
      if (replacement) node.textContent = replacement;
    });

    document.querySelectorAll("a").forEach((anchor) => {
      const rawHref = anchor.getAttribute("href");
      const workingUrl = workingNavigationUrl(rawHref);
      if (workingUrl && rawHref !== `${workingUrl.pathname.slice(1)}${workingUrl.search}${workingUrl.hash}`) {
        anchor.href = `${workingUrl.pathname.slice(1)}${workingUrl.search}${workingUrl.hash}`;
      }

      const value = anchor.textContent.replace(/\s+/g, " ").trim();
      if (value === "DOWNLOAD MY RESUME") {
        anchor.href = "Solomon-Wakhungu-Resume.pdf";
        anchor.target = "_blank";
        anchor.rel = "noopener";
      }
      if (value === "READ ENGINEERING CASE STUDIES") {
        anchor.href = "case-studies.html";
        anchor.removeAttribute("target");
        anchor.removeAttribute("rel");
      }
    });

    cards.forEach((card) => {
      document.querySelectorAll("a").forEach((anchor) => {
        const heading = anchor.querySelector("h3");
        const value = heading?.textContent.trim();
        if (value !== card.old && value !== card.current) return;
        anchor.href = card.href;
        if (card.external) {
          anchor.target = "_blank";
          anchor.rel = "noopener";
        } else {
          anchor.removeAttribute("target");
          anchor.removeAttribute("rel");
        }
        anchor.querySelectorAll("img").forEach((image) => {
          image.src = card.image;
          image.srcset = "";
          image.removeAttribute("sizes");
        });
      });
    });

    tools.forEach((tool) => {
      document.querySelectorAll("a").forEach((anchor) => {
        const heading = anchor.querySelector("h4");
        const value = heading?.textContent.trim();
        if (value !== tool.old && value !== tool.current) return;
        anchor.href = tool.href;
        anchor.target = "_blank";
        anchor.rel = "noopener";
        anchor.querySelectorAll("img").forEach((image) => {
          image.src = tool.image;
          image.srcset = "";
          image.removeAttribute("sizes");
        });
      });
    });
  }

  let scheduled = false;
  const schedulePatch = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      patch();
    });
  };

  const observer = new MutationObserver(schedulePatch);
  const startAfterHydration = () => {
    setTimeout(() => {
      patch();
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["href"],
      });
      [250, 1000, 3000].forEach((delay) => setTimeout(patch, delay));
      setTimeout(() => observer.disconnect(), 6000);
    }, 750);
  };

  if (document.readyState === "complete") {
    startAfterHydration();
  } else {
    window.addEventListener("load", startAfterHydration, { once: true });
  }
})();
