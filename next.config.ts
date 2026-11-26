import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/index.htm", destination: "/", permanent: true },
      { source: "/experience.html", destination: "/experience", permanent: true },
      { source: "/projects.html", destination: "/projects", permanent: true },
      { source: "/tools.html", destination: "/tools", permanent: true },
      { source: "/case-studies.html", destination: "/case-studies", permanent: true },
      {
        source: "/case-study-kubernetes.html",
        destination: "/case-studies/kubernetes",
        permanent: true,
      },
      {
        source: "/case-study-autonomous-agents.html",
        destination: "/case-studies/autonomous-agents",
        permanent: true,
      },
      {
        source: "/case-study-discord-cli.html",
        destination: "/case-studies/discord-cli",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
