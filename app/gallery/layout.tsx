import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Gallery | Web & Mobile Projects by Chisa Atulegwu",
  description: "Explore Chisa Atulegwu's portfolio gallery featuring web applications, mobile apps, desktop software, UI/UX designs, and innovative projects built with Angular, React Native, Next.js, and more.",
  keywords: [
    "developer portfolio gallery",
    "web development projects",
    "mobile app portfolio",
    "Angular projects",
    "React Native apps",
    "Next.js portfolio",
    "software engineer projects",
    "UI/UX designs"
  ],
  openGraph: {
    title: "Portfolio Gallery | Projects by Chisa Atulegwu",
    description: "Browse through web applications, mobile apps, and innovative software projects.",
    url: "https://www.more-dev.com/gallery",
    type: "website",
  },
  alternates: {
    canonical: "https://www.more-dev.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

