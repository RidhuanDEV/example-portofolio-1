import type { Metadata } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PwaProvider } from "@/components/providers/PwaProvider";
import { getServerLocale } from "@/lib/i18n-server";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ridhuan-rangga.vercel.app").replace(
  /\/$/,
  "",
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ridhuan Rangga Kusuma - Full-Stack Software Engineer & QA Specialist",
    template: "%s | Ridhuan Rangga Kusuma",
  },
  description:
    "Engineering portfolio of Ridhuan Rangga Kusuma in Jakarta: case studies, architecture decisions, OAuth 2.0/OIDC systems, IoT telemetry, AI tooling, and verifiable QA.",
  openGraph: {
    title: "Ridhuan Rangga Kusuma - Full-Stack Software Engineer & QA Specialist",
    description:
      "Production case studies, architecture decisions, empirical benchmarks, and verifiable QA engineering.",
    url: siteUrl,
    siteName: "Ridhuan Rangga Kusuma",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridhuan Rangga Kusuma - Full-Stack Software Engineer & QA Specialist",
    description:
      "Production case studies, architecture decisions, empirical benchmarks, and verifiable QA engineering.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ridhuan Rangga Kusuma",
  jobTitle: "Full-Stack Software Engineer & QA Specialist",
  url: siteUrl,
  email: "mailto:ridhuanranggakusuma@gmail.com",
  telephone: "+6282113472156",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Institut Teknologi Indonesia",
    },
  ],
  sameAs: [
    "https://github.com/RidhuanDEV",
    "https://www.linkedin.com/in/ridhuan-rangga-kusuma-146241292/",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${ibmPlexMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light");}else{document.documentElement.classList.remove("light");document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white dark:bg-[#08090b] text-zinc-800 dark:text-zinc-100 pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <PwaProvider>
            {/* Ambient visual depth background decorator layer */}
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none print:hidden" aria-hidden="true">
              <div className="absolute top-[8%] left-[8%] w-[40vw] h-[40vw] rounded-full bg-gray-100/10 dark:bg-cyan-500/[0.15] blur-[120px] animate-float-1 will-change-transform" />
              <div className="absolute bottom-[12%] right-[8%] w-[45vw] h-[45vw] rounded-full bg-blue-100/10 dark:bg-blue-500/[0.15] blur-[140px] animate-float-2 will-change-transform" />

              <svg
                className="hidden md:block absolute top-[15%] right-[5%] w-[280px] h-[280px] text-gray-300/30 dark:text-cyan-400/[0.18] animate-float-1 animate-spin-slow will-change-transform"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="15" strokeDasharray="4 4" />
                <line x1="50" y1="5" x2="50" y2="95" strokeDasharray="1 3" />
                <line x1="5" y1="50" x2="95" y2="50" strokeDasharray="1 3" />
              </svg>

              <svg
                className="hidden md:block absolute bottom-[20%] left-[5%] w-[200px] h-[200px] text-blue-200/40 dark:text-teal-400/[0.15] animate-float-2 will-change-transform"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <rect x="10" y="10" width="80" height="80" strokeDasharray="5 5" />
                <path d="M 50 0 L 50 10 M 50 90 L 50 100 M 0 50 L 10 50 M 90 50 L 100 50" />
                <circle cx="50" cy="50" r="8" />
                <path d="M 30 30 L 70 70 M 30 70 L 70 30" strokeDasharray="1 2" />
              </svg>

              <svg
                className="hidden md:block absolute top-[45%] left-[10%] w-[150px] h-[150px] text-gray-300/25 dark:text-blue-400/[0.15] animate-float-1 will-change-transform"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                <line x1="50" y1="5" x2="50" y2="95" />
                <line x1="10" y1="25" x2="50" y2="50" />
                <line x1="90" y1="25" x2="50" y2="50" />
                <line x1="10" y1="75" x2="50" y2="50" strokeDasharray="2 2" />
                <line x1="90" y1="75" x2="50" y2="50" strokeDasharray="2 2" />
              </svg>

              <div className="absolute inset-0 bg-[radial-gradient(rgba(156,163,175,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(34,211,238,0.04)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            {children}
          </PwaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
