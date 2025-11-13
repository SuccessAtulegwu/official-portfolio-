"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.3,
  easing: "ease",
  speed: 500,
});

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Start progress on link clicks
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target?.href;
      
      if (href && href !== window.location.href) {
        NProgress.start();
      }
    };

    const handleMutation = () => {
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick as EventListener);
      });
    };

    // Initial setup
    handleMutation();

    // Watch for DOM changes to catch dynamically added links
    const observer = new MutationObserver(handleMutation);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const anchors = document.querySelectorAll('a[href]');
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return null;
}

