import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Chisa Atulegwu | Get In Touch",
  description: "Get in touch with Chisa Atulegwu for web development, mobile app development, or technical consultation. Contact via email, phone, WhatsApp, or schedule a meeting online.",
  keywords: [
    "contact Chisa Atulegwu",
    "hire full stack developer",
    "web development services",
    "mobile app development contact",
    "schedule developer meeting",
    "software engineer consultation",
    "Nigeria developer contact"
  ],
  openGraph: {
    title: "Contact Chisa Atulegwu | Full-Stack Developer",
    description: "Get in touch for web development, mobile app development, or technical consultation. Multiple contact options available.",
    url: "https://www.more-dev.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.more-dev.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

