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

  // BEGIN GENERATED PROJECT CATALOG
  const projects = [
    {
      "name": "kFLEET",
      "href": "https://github.com/1solomonwakhungu/kfleet",
      "description": "Go control plane with Kubernetes agents, an embedded web UI, WebSocket updates, SQLite inventory, and MCP tools.",
      "tags": [
        "Kubernetes",
        "Go",
        "MCP"
      ],
      "external": true
    },
    {
      "name": "discord-cli",
      "href": "https://github.com/1solomonwakhungu/discord-cli",
      "description": "Python CLI with 50+ Discord administration commands, structured JSON output, and single-action connections for scripts and agents.",
      "tags": [
        "Python",
        "CLI",
        "Automation"
      ],
      "external": true
    },
    {
      "name": "RunPod vLLM Deployer",
      "href": "https://github.com/1solomonwakhungu/runpod-vllm-deployer",
      "description": "Python CLI that plans, deploys, checks, smoke tests, and tears down OpenAI-compatible vLLM servers on RunPod GPUs.",
      "tags": [
        "Python",
        "GPU",
        "MLOps"
      ],
      "external": true
    },
    {
      "name": "Engineering Case Studies",
      "href": "case-studies.html",
      "description": "Architecture and delivery accounts covering Kubernetes platforms, overnight autonomous agents, and Discord CLI engineering.",
      "tags": [
        "Architecture",
        "Delivery",
        "Operations"
      ],
      "external": false
    },
    {
      "name": "Homeserver Infrastructure",
      "href": "https://github.com/1solomonwakhungu/homeserver-infra",
      "description": "Terraform and Terragrunt stacks for cloud-init Proxmox VMs, with reusable modules, remote state, validation, and operator runbooks.",
      "tags": [
        "Terraform",
        "Terragrunt",
        "Proxmox"
      ],
      "external": true
    },
    {
      "name": "Homelab Core",
      "href": "https://github.com/1solomonwakhungu/homelab-core",
      "description": "Sanitized architecture, monitoring examples, and runbooks for routing, observability, backups, restores, and incident response.",
      "tags": [
        "Runbooks",
        "Prometheus",
        "Grafana"
      ],
      "external": true
    },
    {
      "name": "Terraform AWS Private LLM",
      "href": "https://github.com/1solomonwakhungu/terraform-aws-private-llm",
      "description": "Terraform module for EC2-based Ollama and Open WebUI with encrypted EBS, Caddy, and optional Route 53 TLS.",
      "tags": [
        "Terraform",
        "AWS",
        "Ollama"
      ],
      "external": true
    },
    {
      "name": "Typst Dev Container",
      "href": "https://github.com/1solomonwakhungu/typst-dev-container",
      "description": "Dev Container template for Typst and Pandoc document workflows, with smoke tests and release automation.",
      "tags": [
        "Dev Containers",
        "Typst",
        "Pandoc"
      ],
      "external": true
    },
    {
      "name": "Fund Allocator",
      "href": "https://github.com/1solomonwakhungu/fund-allocator",
      "description": "Flask application that divides available funds across named accounts after reserving a checking balance and honoring minimum allocations.",
      "tags": [
        "Flask",
        "Python",
        "Kubernetes"
      ],
      "external": true
    }
  ];
  // END GENERATED PROJECT CATALOG

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

  const legacyCards = [
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

  function createProjectCard(project, position, headingLevel) {
    const item = document.createElement("li");
    item.className = "portfolio-project-item";

    const anchor = document.createElement("a");
    anchor.className = "portfolio-project-card";
    anchor.href = project.href;
    anchor.setAttribute(
      "aria-label",
      `${project.name}: ${project.description}${project.external ? " Opens GitHub in a new tab." : ""}`,
    );
    if (project.external) {
      anchor.target = "_blank";
      anchor.rel = "noopener";
    }

    const index = document.createElement("span");
    index.className = "portfolio-project-card__index";
    index.setAttribute("aria-hidden", "true");
    index.textContent = String(position).padStart(2, "0");

    const content = document.createElement("span");
    content.className = "portfolio-project-card__content";

    const tags = document.createElement("span");
    tags.className = "portfolio-project-card__tags";
    tags.textContent = project.tags.join(" · ");

    const heading = document.createElement(headingLevel);
    heading.className = "portfolio-project-card__title";
    heading.textContent = project.name;

    const description = document.createElement("span");
    description.className = "portfolio-project-card__description";
    description.textContent = project.description;

    const arrow = document.createElement("span");
    arrow.className = "portfolio-project-card__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";

    content.append(tags, heading, description);
    anchor.append(index, content, arrow);
    item.append(anchor);
    return item;
  }

  function renderProjectCollection() {
    const isProjectsPage = window.location.pathname === "/projects.html";
    const isHomePage = ["/", "/index.html", "/index.htm"].includes(window.location.pathname);
    if (!isProjectsPage && !isHomePage) return;

    const sections = [...document.querySelectorAll('[data-framer-name="Projects"]')];
    const section = sections.find((node) => node.getClientRects().length > 0) || sections[0];
    if (!section) return;

    const legacyAnchors = [...section.querySelectorAll("a")].filter(
      (anchor) => anchor.querySelector("h3") && !anchor.classList.contains("portfolio-project-card"),
    );
    let legacyList = legacyAnchors[0]?.parentElement;
    while (
      legacyList?.parentElement
      && legacyList.parentElement !== section
      && legacyAnchors.every((anchor) => legacyList.parentElement.contains(anchor))
    ) {
      legacyList = legacyList.parentElement;
    }
    if (!legacyList) return;
    legacyList.classList.add("portfolio-projects-legacy");
    legacyList.setAttribute("aria-hidden", "true");

    const collectionId = isProjectsPage
      ? "portfolio-project-collection"
      : "portfolio-featured-projects";
    if (section.querySelector(`#${collectionId}`)) return;

    if (isProjectsPage) {
      const heading = section.querySelector("h1");
      heading?.classList.add("portfolio-project-collection__heading");
      const muted = heading?.querySelector("span");
      const firstText = heading?.firstChild;
      if (firstText?.nodeType === Node.TEXT_NODE) firstText.textContent = "PROJECT";
      if (muted) muted.textContent = "COLLECTION";
    }

    const collection = document.createElement("div");
    collection.id = collectionId;
    collection.className = `portfolio-project-collection${isHomePage ? " portfolio-project-collection--featured" : ""}`;

    if (isProjectsPage) {
      const intro = document.createElement("p");
      intro.className = "portfolio-project-collection__intro";
      intro.textContent = "Selected work across Kubernetes, developer tooling, GPU inference, infrastructure automation, and operational practice.";
      collection.append(intro);
    }

    const list = document.createElement("ol");
    list.className = `portfolio-project-grid${isHomePage ? " portfolio-project-grid--featured" : ""}`;
    list.setAttribute("aria-label", isHomePage ? "Featured projects" : "Project collection");

    const visibleProjects = isHomePage ? projects.slice(0, 3) : projects;
    visibleProjects.forEach((project, index) => {
      list.append(createProjectCard(project, index + 1, isProjectsPage ? "h2" : "h3"));
    });
    collection.append(list);
    legacyList.before(collection);
  }

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

    legacyCards.forEach((card) => {
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

    renderProjectCollection();
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
