from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
TEXT_FILES = [*ROOT.glob("*.html"), *ROOT.glob("sites/**/*.mjs")]
LINKEDIN_URL = "https://www.linkedin.com/in/solomon-wakhungu-2712791bb/"
EMAIL_PROTOCOL = "mail" + "to:"
GMAIL_DOMAIN = "gmail" + ".com"
ASSET_VERSION = "20260721-3"

old_first_desc = (
    "Designed scalable systems, streamlined portal deployment, and developed a DynamoDB backup strategy. "
    "Implemented CI/CD pipelines, secured credentials with AWS Secrets Manager, and automated SSL renewal. "
    "Dockerized cloud resource destruction and maintained dependencies with Dependabot."
)
new_first_desc = (
    "Senior Software Engineer delivering secure cloud platforms, Kubernetes operations, CI/CD automation, "
    "and maintainable backend systems for enterprise teams."
)

replacements = {
    "Software Engineer Crafting Enhanced User Experiences and Scalable AI-Driven Backends":
        "Senior Software Engineer building reliable cloud platforms, Kubernetes systems, and AI infrastructure.",
    "Passionate about creating intuitive and engaging user experiences. I excel in building scalable backend infrastructures that support advanced AI tasks, ensuring seamless performance and reliability. My commitment to delivering high-quality software solutions drives me to enhance user experiences and push the boundaries of technology continuously.":
        "I build reliable cloud platforms, Kubernetes systems, and AI infrastructure with Go, Python, AWS, and Terraform. My work focuses on secure automation, observable operations, and repeatable delivery for production teams.",
    "4 YEARS OF": "5+ YEARS OF",
    "PROJECTS\nCOMPLETED": "CLOUD\nPLATFORM",
    "WORLDWIDE\nCLIENTS": "PLATFORM\nOPERATIONS",
    "PROJECTS COMPLETED": "CLOUD PLATFORM",
    "WORLDWIDE CLIENTS": "PLATFORM OPERATIONS",
    "LEARN MORE ABOUT MY TRACK RECORD": "DOWNLOAD MY RESUME",
    "VIEW EXPERIENCE AND RESUME": "DOWNLOAD MY RESUME",
    "EXPLORE MY": "READ ENGINEERING",
    "LATEST PROJECTS": "CASE STUDIES",
    "https://mejed.lemonsqueezy.com/buy/626bae75-7eee-45cb-a91f-6f2eb1fbfd1f": "https://neurescence.com/",
    "AWS Nuke": "kFLEET",
    "Nuke a whole AWS account and delete all its resources.":
        "Multi-cluster Kubernetes management with agent onboarding, real-time UI, and MCP tools.",
    "Aviatrix Terraform Provider": "Engineering Case Studies",
    "Terraform module to deploy Aviatrix Controller/Copilot":
        "Production platforms, autonomous agents, and agent-ready developer tooling.",
    "https://github.com/rebuy-de/aws-nuke": "https://github.com/1solomonwakhungu/kfleet",
    "https://github.com/AviatrixSystems/terraform-provider-aviatrix": "case-studies.html",
    "images/HZVty7h6pOWqz9MgOrGioC5dEM.jpg": "images/kfleet-project.svg",
    "images/xk6Txt07CRRH1vKcDVTQJSzZx5o.jpeg": "images/case-studies-project.svg",
    "PREMIUM": "CORE",
    "ChatGPT": "Kubernetes",
    "AI Assistant": "Container orchestration",
    "https://chat.openai.com/": "https://kubernetes.io/",
    "images/MViiiLyIvL8tvy7d1XtOsM32o.png": "images/kubernetes.svg",
    "Notion": "AWS",
    "Productivity Tool": "Cloud platform",
    "https://www.notion.so/": "https://aws.amazon.com/",
    "images/iP5FTKjb84EsPLiEwbrAY7NEy44.png": "images/aws.svg",
    "Nextjs": "GitHub Actions",
    "React framework": "CI/CD automation",
    "https://nextjs.org/": "https://github.com/features/actions",
    "images/MnQFYNLxlgT4EvY2ctcJfHAXZA.png": "images/github-actions.svg",
    "Python programming language": "Backend engineering and automation",
    "Golang programming language": "Cloud services and platform tooling",
    "Terraform programming language": "Repeatable cloud infrastructure",
    "Crafted design documents for system scalability and efficiency. Researched LLMs on HuggingFace, integrated with Amazon S3 and DynamoDB, and utilized Lambda for content filtering. Deployed and managed LLMs on SageMaker, optimized text generation, and expanded customer responses using the OpenAI API.":
        "Built an Alexa skill serving 407,000+ monthly requests with AWS Lambda, S3, and DynamoDB, and evaluated managed LLM workflows on SageMaker.",
    "May 2023 - Aug 2023": "May 2023 - Jul 2023",
    "Monitored and logged operations across AWS, GCP, Azure, and OCI environments. Developed highly available, fault-tolerant, and scalable cloud infrastructure. Maintained a DynamoDB database, migrated a Python codebase to GoLang, and customized infrastructure with Terraform.":
        "Automated multi-cloud infrastructure across AWS, GCP, Azure, and OCI; migrated Python automation to Go; and used Terraform to make deployments repeatable.",
    "Nov 2021 - Agun 2022": "Nov 2021 - Aug 2022",
    "Managed software processing thousands of biological images for research, ensuring 24/7 operation and optimization for high user volume. Handled database operations and complex data transformations, while adding features and maintaining service on Google Cloud (GCP).":
        "Maintained a Python image-processing platform supporting 5,000+ researchers and 130,000+ biological images, with Flask services and Google Cloud delivery pipelines.",
    "Budget": "Opportunity",
    "Select…": "Choose one…",
    "<$3k": "Senior engineering role",
    "$3k - $5k": "Cloud platform project",
    "$5k - $10k": "Kubernetes / DevOps engagement",
    ">$10k": "AI infrastructure consulting",
}

# Replace the first Aviatrix role only, using its unique original description as the anchor.
def replace_current_role(text: str) -> str:
    while old_first_desc in text:
        i = text.index(old_first_desc)
        edits = []
        # Static HTML places the company link and heading before the description.
        html_name = text.rfind(">Aviatrix<", max(0, i - 6000), i)
        html_url = text.rfind("https://aviatrix.com/", max(0, i - 6000), i)
        # Hydration modules place the company properties after the description.
        js_name = text.find(':"Aviatrix"', i, i + 2500)
        js_url = text.find("https://aviatrix.com/", i, i + 2500)
        if html_name >= 0:
            edits.append((html_name + 1, html_name + 9, "Credera"))
        elif js_name >= 0:
            edits.append((js_name + 2, js_name + 10, "Credera"))
        else:
            raise RuntimeError("Could not locate company name for current-role card")
        if html_url >= 0:
            edits.append((html_url, html_url + len("https://aviatrix.com/"), "https://www.credera.com/"))
        elif js_url >= 0:
            edits.append((js_url, js_url + len("https://aviatrix.com/"), "https://www.credera.com/"))
        else:
            raise RuntimeError("Could not locate company URL for current-role card")
        edits.append((i, i + len(old_first_desc), new_first_desc))
        for start, end, value in sorted(edits, reverse=True):
            text = text[:start] + value + text[end:]
    return text

for path in TEXT_FILES:
    text = path.read_text(encoding="utf-8-sig")
    text = replace_current_role(text)
    text = text.replace("Sept 2023 - Present", "Mar 2026 - Present")
    for old, new in replacements.items():
        text = text.replace(old, new)
    # Update isolated hero/stat/form literals without touching component identifiers.
    text = text.replace(">SOFTWARE<", ">PLATFORM<").replace('children:"SOFTWARE"', 'children:"PLATFORM"')
    text = text.replace(">+4<", ">5+<").replace('children:"+4"', 'children:"5+"')
    text = text.replace(">+7<", ">AWS<").replace('children:"+7"', 'children:"AWS"')
    text = text.replace(">+10<", ">K8s<").replace('children:"+10"', 'children:"K8s"')
    text = text.replace(">PROJECTS </p>", ">CLOUD </p>").replace('children:"PROJECTS "', 'children:"CLOUD "')
    text = text.replace(">COMPLETED</p>", ">PLATFORM</p>").replace('children:"COMPLETED"', 'children:"PLATFORM"')
    text = text.replace(">WORLDWIDE </p>", ">PLATFORM </p>").replace('children:"WORLDWIDE "', 'children:"PLATFORM "')
    text = text.replace(">CLIENTS</p>", ">OPERATIONS</p>").replace('children:"CLIENTS"', 'children:"OPERATIONS"')
    text = text.replace("&lt;$3k", "Senior engineering role").replace("&gt;$10k", "AI infrastructure consulting")
    text = text.replace('title:"Select\\u2026"', 'title:"Choose one\\u2026"')
    text = text.replace(">Submit<", ">Send inquiry<").replace('children:"Submit"', 'children:"Send inquiry"')
    # Repair the one framework identifier affected by the initial broad content pass.
    text = text.replace("onSend inquiry", "onSubmit")
    # The profile already exposes LinkedIn. Remove legacy direct-email destinations
    # from static HTML and Framer's hydration modules so hydration cannot restore them.
    text = re.sub(
        rf"{re.escape(EMAIL_PROTOCOL)}[^\"'\s<]+",
        LINKEDIN_URL,
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        rf"[A-Z0-9._%+-]+@[A-Z0-9.-]*{re.escape(GMAIL_DOMAIN)}",
        "LinkedIn",
        text,
        flags=re.IGNORECASE,
    )
    text = text.replace(
        f'ajcQqYHqD:"mail",g81CiUUAE:"{LINKEDIN_URL}"',
        f'ajcQqYHqD:"linked",g81CiUUAE:"{LINKEDIN_URL}"',
    )
    path.write_text(text, encoding="utf-8")

meta = {
    "index.html": {
        "title": "Solomon Wakhungu | Cloud Platform Engineer",
        "description": "Senior software engineer building reliable AWS, Kubernetes, Terraform, Go, and AI infrastructure for production teams.",
        "url": "https://solomonwakhungu.vercel.app/",
    },
    "experience.html": {
        "title": "Experience | Solomon Wakhungu, Senior Software Engineer",
        "description": "Solomon Wakhungu's experience delivering cloud platforms, Kubernetes systems, backend automation, and AI infrastructure.",
        "url": "https://solomonwakhungu.vercel.app/experience.html",
    },
    "projects.html": {
        "title": "Projects & Case Studies | Solomon Wakhungu",
        "description": "Selected Kubernetes, cloud platform, developer tooling, and autonomous AI agent projects by Solomon Wakhungu.",
        "url": "https://solomonwakhungu.vercel.app/projects.html",
    },
    "tools.html": {
        "title": "Engineering Stack | Solomon Wakhungu",
        "description": "The production engineering stack Solomon Wakhungu uses across Go, Python, AWS, Kubernetes, Terraform, and CI/CD.",
        "url": "https://solomonwakhungu.vercel.app/tools.html",
    },
}

person_json = json.dumps({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Solomon Wakhungu",
    "url": "https://solomonwakhungu.vercel.app/",
    "jobTitle": "Senior Software Engineer",
    "worksFor": {"@type": "Organization", "name": "Credera", "url": "https://www.credera.com/"},
    "alumniOf": {"@type": "CollegeOrUniversity", "name": "The University of Texas at Dallas"},
    "sameAs": [
        "https://github.com/1solomonwakhungu",
        "https://www.linkedin.com/in/solomon-wakhungu-2712791bb/"
    ],
    "knowsAbout": ["Go", "Python", "Amazon Web Services", "Kubernetes", "Terraform", "Platform Engineering", "AI Infrastructure"]
}, separators=(",", ":"))

for filename, values in meta.items():
    path = ROOT / filename
    text = path.read_text()
    text = text.replace("<html>", '<html lang="en">', 1)
    text = text.replace('href="index.htm"', 'href="index.html"')
    text = re.sub(r"<title>.*?</title>", f"<title>{values['title']}</title>", text, count=1, flags=re.S)
    tags = {
        ('name', 'description'): values['description'],
        ('name', 'robots'): 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
        ('property', 'og:type'): 'website',
        ('property', 'og:title'): values['title'],
        ('property', 'og:description'): values['description'],
        ('property', 'og:url'): values['url'],
        ('name', 'twitter:card'): 'summary_large_image',
        ('name', 'twitter:title'): values['title'],
        ('name', 'twitter:description'): values['description'],
    }
    for (kind, key), value in tags.items():
        pattern = rf'<meta {kind}="{re.escape(key)}" content="[^"]*">'
        replacement = f'<meta {kind}="{key}" content="{value}">'
        if re.search(pattern, text):
            text = re.sub(pattern, replacement, text, count=1)
        else:
            text = text.replace("</head>", replacement + "\n</head>", 1)
    canonical = f'<link rel="canonical" href="{values["url"]}">'
    text = re.sub(r'<link rel="canonical" href="[^"]*">', canonical, text, count=1)
    favicon = '<link rel="icon" href="images/favicon.svg" type="image/svg+xml">'
    if favicon not in text:
        text = text.replace("</head>", favicon + "\n</head>", 1)
    additions = (
        '<meta name="author" content="Solomon Wakhungu">\n'
        '<meta name="theme-color" content="#151312">\n'
        '<meta property="og:site_name" content="Solomon Wakhungu">\n'
        '<meta property="og:image" content="https://solomonwakhungu.vercel.app/images/kfleet-project.svg">\n'
        '<meta name="twitter:image" content="https://solomonwakhungu.vercel.app/images/kfleet-project.svg">\n'
        '<link rel="alternate" type="application/pdf" href="https://solomonwakhungu.vercel.app/Solomon-Wakhungu-Resume.pdf" title="Solomon Wakhungu Resume">\n'
        f'<script type="application/ld+json">{person_json}</script>\n'
    )
    if '<meta name="author" content="Solomon Wakhungu">' not in text:
        text = text.replace("</head>", additions + "</head>", 1)
    text = re.sub(
        r'<link rel="stylesheet" href="portfolio-mobile-fixes\.css(?:\?v=[^"]+)?">\n?',
        "",
        text,
    )
    mobile_css = f'<link rel="stylesheet" href="portfolio-mobile-fixes.css?v={ASSET_VERSION}">'
    text = text.replace("</head>", mobile_css + "\n</head>", 1)
    text = re.sub(
        r'<script src="portfolio-content-sync\.js(?:\?v=[^"]+)?" defer></script>\n?',
        "",
        text,
    )
    sync_script = f'<script src="portfolio-content-sync.js?v={ASSET_VERSION}" defer></script>'
    text = text.replace("</body>", sync_script + "\n</body>", 1)
    if filename == "index.html" and 'id="contact"' not in text:
        contact_anchor = '<span id="contact" class="portfolio-contact-anchor" aria-hidden="true"></span>'
        text = text.replace(sync_script, contact_anchor + "\n" + sync_script, 1)
    path.write_text(text)

# Ensure the critical stale claims are gone from generated HTML and hydration code.
combined = "\n".join(p.read_text(errors="ignore") for p in TEXT_FILES)
for stale in [
    "Sept 2023 - Present",
    "WORLDWIDE CLIENTS",
    "AWS Nuke",
    "Aviatrix Terraform Provider",
    "Software Engineer Crafting Enhanced User Experiences",
    "PREMIUM TOOLS",
]:
    if stale in combined:
        raise RuntimeError(f"Stale content remains: {stale}")
for forbidden in [EMAIL_PROTOCOL, GMAIL_DOMAIN]:
    if forbidden.lower() in combined.lower():
        raise RuntimeError("Legacy direct-email content remains")

print(f"Updated {len(TEXT_FILES)} HTML/module files and metadata for {len(meta)} public pages")
