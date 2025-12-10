import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech News | Latest Technology Updates & Trends",
  description: "Stay updated with the latest technology news, web development trends, mobile app innovations, and software engineering insights curated by Chisa Atulegwu.",
  keywords: [
    "tech news",
    "technology updates",
    "web development news",
    "mobile app trends",
    "software engineering news",
    "programming news",
    "developer news",
    "tech blog"
  ],
  openGraph: {
    title: "Tech News | Latest Technology Updates",
    description: "Latest technology news, web development trends, and software engineering insights.",
    url: "https://www.more-dev.com/technews",
    type: "website",
  },
  alternates: {
    canonical: "https://www.more-dev.com/technews",
  },
};

export default function TechNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

