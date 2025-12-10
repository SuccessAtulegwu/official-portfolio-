import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Tools | Community Services by MoreDev",
  description: "Access free online tools and utilities: Facebook & Instagram downloader, QR code generator, code formatter, hash generator, color palette, box shadow generator, resume builder, and more. No registration required!",
  keywords: [
    "free online tools",
    "facebook downloader",
    "instagram downloader",
    "QR code generator",
    "code formatter",
    "hash generator",
    "color palette generator",
    "box shadow generator",
    "resume builder",
    "HTML templates",
    "motivational quotes",
    "web utilities",
    "developer tools",
    "free utilities"
  ],
  openGraph: {
    title: "Free Online Tools & Community Services | MoreDev",
    description: "Access free utilities including social media downloaders, QR generator, code formatter, and more. No registration needed.",
    url: "https://www.more-dev.com/community",
    type: "website",
  },
  alternates: {
    canonical: "https://www.more-dev.com/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

