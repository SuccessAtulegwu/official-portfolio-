export interface MeetingFormData {
  name: string;
  email: string;
  meetingType: "consultation" | "project" | "support" | string;
  platform: "zoom" | "whatsapp" | "teams" | "meet" | string;
  date: string;
  meetingTime: string;
  meetingLink?: string;
  whatsappNumber?: string;
  message?: string;
}

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';