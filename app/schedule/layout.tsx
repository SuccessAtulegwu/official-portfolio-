import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule Meeting | Book Consultation with Chisa Atulegwu",
  description: "Schedule a meeting with Chisa Atulegwu for project consultation, technical support, or project discussion. Choose from Zoom, Google Meet, Microsoft Teams, or WhatsApp.",
  keywords: [
    "schedule meeting",
    "book developer consultation",
    "project discussion",
    "technical support meeting",
    "hire developer",
    "consultation call",
    "software engineer meeting"
  ],
  openGraph: {
    title: "Schedule Meeting with Chisa Atulegwu | Developer Consultation",
    description: "Book a consultation for web development, mobile app development, or technical guidance. Multiple platforms available.",
    url: "https://www.more-dev.com/schedule",
    type: "website",
  },
  alternates: {
    canonical: "https://www.more-dev.com/schedule",
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

