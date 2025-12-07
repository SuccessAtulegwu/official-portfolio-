// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: Record<string, any>[];
  }
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined event trackers for common actions

export const trackButtonClick = (buttonName: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: buttonName,
  });
};

export const trackDownload = (fileName: string) => {
  event({
    action: 'download',
    category: 'File',
    label: fileName,
  });
};

export const trackFormSubmit = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  });
};

export const trackProjectView = (projectName: string) => {
  event({
    action: 'view',
    category: 'Project',
    label: projectName,
  });
};

export const trackSocialClick = (platform: string) => {
  event({
    action: 'click',
    category: 'Social',
    label: platform,
  });
};

export const trackContactAttempt = (method: string) => {
  event({
    action: 'contact',
    category: 'Contact',
    label: method,
  });
};

export const trackToolUsage = (toolName: string) => {
  event({
    action: 'use',
    category: 'Community Tool',
    label: toolName,
  });
};

export const trackNavigation = (destination: string) => {
  event({
    action: 'navigate',
    category: 'Navigation',
    label: destination,
  });
};

export const trackCVDownload = () => {
  event({
    action: 'download_cv',
    category: 'CV',
    label: 'Resume Download',
  });
};

export const trackMeetingSchedule = (meetingType: string) => {
  event({
    action: 'schedule',
    category: 'Meeting',
    label: meetingType,
  });
};

export const trackExternalLink = (url: string) => {
  event({
    action: 'click',
    category: 'External Link',
    label: url,
  });
};

// Track errors
export const trackError = (errorMessage: string, errorLocation?: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${errorLocation || 'Unknown'}: ${errorMessage}`,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `${depth}%`,
    value: depth,
  });
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: 'Time Spent',
    value: seconds,
  });
};

