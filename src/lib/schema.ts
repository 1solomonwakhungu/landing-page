import {
  EXPERIENCE_FAQ,
  GITHUB_URL,
  HARLO_LIVE_APPS,
  HOMEBREW_TAP_URL,
  LINKEDIN_URL,
  PROFILE,
  PROJECTS,
  SITE_NAME,
  SITE_URL,
} from "@/data/portfolio";
import { CASE_STUDIES, type CaseStudy } from "@/data/case-studies";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const SAME_AS_URLS = [
  GITHUB_URL,
  LINKEDIN_URL,
  HOMEBREW_TAP_URL,
  ...HARLO_LIVE_APPS.map((app) => app.url),
];

export function personEntity() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    alternateName: PROFILE.alternateNames,
    url: `${SITE_URL}/`,
    mainEntityOfPage: `${SITE_URL}/`,
    image: `${SITE_URL}/opengraph-image`,
    description: PROFILE.entitySummary,
    disambiguatingDescription: PROFILE.disambiguatingDescription,
    jobTitle: PROFILE.role,
    homeLocation: {
      "@type": "Place",
      name: PROFILE.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Houston",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    worksFor: {
      "@type": "Organization",
      name: PROFILE.company,
      url: PROFILE.companyUrl,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: PROFILE.alumniOf,
      url: PROFILE.alumniUrl,
    },
    hasCredential: PROFILE.credentials.map((cred) => ({
      "@type": "EducationalOccupationalCredential",
      name: cred.name,
      credentialCategory: "certification",
      recognizedBy: {
        "@type": "Organization",
        name: cred.issuer,
        url: cred.issuerUrl,
      },
    })),
    sameAs: SAME_AS_URLS,
    knowsAbout: PROFILE.knowsAbout,
  };
}

export function rootEntityGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: `${SITE_NAME} (${PROFILE.domain})`,
        alternateName: PROFILE.domain,
        url: `${SITE_URL}/`,
        description: PROFILE.entitySummary,
        inLanguage: "en-US",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      personEntity(),
    ],
  };
}

export function homeProfilePageSchema() {
  const featuredSoftware = PROJECTS.filter((p) => p.external && p.featured).map(
    (project) => ({
      "@type": project.demoUrl ? "SoftwareApplication" : "SoftwareSourceCode",
      name: project.name,
      description: project.description,
      url: project.demoUrl ?? project.href,
      codeRepository: project.href,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-platform",
      author: { "@id": PERSON_ID },
      keywords: project.tags,
    })
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        name: `${PROFILE.name} | Cloud Platforms, Open Source & AI Infrastructure`,
        url: `${SITE_URL}/`,
        description: PROFILE.entitySummary,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
        hasPart: featuredSoftware,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: EXPERIENCE_FAQ.slice(0, 4).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function experiencePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/experience#profilepage`,
        name: `Experience | ${PROFILE.name}`,
        url: `${SITE_URL}/experience`,
        description:
          "Career history, production scale metrics, UT Dallas Computer Science education, and Databricks certification for Solomon Wakhungu.",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/experience#faq`,
        mainEntity: EXPERIENCE_FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Experience",
            item: `${SITE_URL}/experience`,
          },
        ],
      },
    ],
  };
}

export function projectsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Solomon Wakhungu open-source projects and developer tools",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project, index) => {
          const url = project.external
            ? project.href
            : `${SITE_URL}${project.href}`;
          const item: Record<string, unknown> = {
            "@type": project.external ? "SoftwareSourceCode" : "CollectionPage",
            name: project.name,
            description: project.description,
            url,
            author: { "@id": PERSON_ID },
            keywords: project.tags,
          };
          if (project.external) {
            item.codeRepository = project.href;
          }
          if (project.demoUrl) {
            item.sameAs = project.demoUrl;
          }
          return {
            "@type": "ListItem",
            position: index + 1,
            item,
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${SITE_URL}/projects`,
          },
        ],
      },
    ],
  };
}

export function caseStudiesCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Engineering Case Studies",
        url: `${SITE_URL}/case-studies`,
        description:
          "Architecture and delivery case studies by Solomon Wakhungu covering enterprise Kubernetes, overnight autonomous agents, and headless CLI engineering.",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        hasPart: CASE_STUDIES.map((study) => ({
          "@type": "TechArticle",
          headline: study.title,
          url: `${SITE_URL}/case-studies/${study.slug}`,
          author: { "@id": PERSON_ID },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: `${SITE_URL}/case-studies`,
          },
        ],
      },
    ],
  };
}

export function caseStudyArticleSchema(study: CaseStudy) {
  const url = `${SITE_URL}/case-studies/${study.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: study.title,
        description: study.description,
        url,
        mainEntityOfPage: url,
        isPartOf: {
          "@type": "CollectionPage",
          url: `${SITE_URL}/case-studies`,
        },
        author: {
          "@id": PERSON_ID,
          "@type": "Person",
          name: PROFILE.name,
          url: `${SITE_URL}/`,
        },
        keywords: study.tags,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: `${SITE_URL}/case-studies`,
          },
          { "@type": "ListItem", position: 3, name: study.title, item: url },
        ],
      },
    ],
  };
}

export function blogCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: `${PROFILE.name} Engineering Blog`,
        url: `${SITE_URL}/blog`,
        description:
          "Engineering posts by Solomon Wakhungu on AI agent verification, compaction memory, write-ahead SQLite journals, and guarded developer CLIs.",
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        blogPost: BLOG_POSTS.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.publishedAt,
          url: `${SITE_URL}/blog/${post.slug}`,
          author: { "@id": PERSON_ID },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
        ],
      },
    ],
  };
}

export function blogPostingSchema(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        url,
        mainEntityOfPage: url,
        image: `${SITE_URL}/opengraph-image`,
        articleSection: post.category,
        isPartOf: {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          url: `${SITE_URL}/blog`,
        },
        author: {
          "@id": PERSON_ID,
          "@type": "Person",
          name: post.author,
          url: `${SITE_URL}/`,
        },
        publisher: {
          "@id": PERSON_ID,
          "@type": "Person",
          name: PROFILE.name,
          url: `${SITE_URL}/`,
        },
        keywords: post.tags,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
