import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { PROFILE, SITE_NAME, SITE_URL } from "@/data/portfolio";
import { rootEntityGraphSchema } from "@/lib/schema";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#131314" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Solomon Wakhungu | Cloud Platforms, Open Source & AI Infra",
    template: "%s | Solomon Wakhungu",
  },
  description:
    "Solomon Wakhungu is a Senior Software Engineer at Credera (ex-Amazon, Aviatrix), Terraform & Helm contributor, and creator of kFLEET, gronify, Tonal, and action-hub.",
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/solomon-relay-mono.svg",
        color: "#1967d2",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "profile",
    firstName: "Solomon",
    lastName: "Wakhungu",
    username: "1solomonwakhungu",
    siteName: SITE_NAME,
    title: "Solomon Wakhungu | Cloud Platforms, Open Source & AI Infra",
    description:
      "Senior Software Engineer at Credera (ex-Amazon, Aviatrix). 16+ upstream PRs in Terraform, Helm & VictoriaMetrics. Creator of kFLEET, gronify, Tonal & action-hub.",
    url: `${SITE_URL}/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Solomon Wakhungu | Cloud Platforms, Open Source & AI Infra",
    description:
      "Senior Software Engineer at Credera (ex-Amazon, Aviatrix). 16+ upstream PRs in Terraform, Helm & VictoriaMetrics. Creator of kFLEET, gronify, Tonal & action-hub.",
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("tonal-theme");if(t==="dark"||t==="light"){document.documentElement.dataset.tonalTheme=t;}else if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.dataset.tonalTheme="dark";}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@17..18,400;17..18,500;17..18,700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootEntityGraphSchema()),
          }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
