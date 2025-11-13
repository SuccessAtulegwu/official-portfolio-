/**
 * Smart URL detection and extraction
 */
export function extractURL(text: string): string {
  // Remove whitespace
  text = text.trim();

  // If it's already a clean URL, return it
  if (text.startsWith('http://') || text.startsWith('https://')) {
    // Extract first URL if multiple
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      // Clean up trailing punctuation
      return urlMatch[1].replace(/[.,;!?]+$/, '');
    }
  }

  // Try to find URL in text
  const urlRegex = /(https?:\/\/(?:www\.)?(?:facebook\.com|fb\.watch|fb\.com|instagram\.com)\/[^\s]+)/gi;
  const matches = text.match(urlRegex);
  
  if (matches && matches.length > 0) {
    // Return first match, cleaned
    return matches[0].replace(/[.,;!?]+$/, '');
  }

  // If no http/https, try to add it
  if (text.includes('facebook.com') || text.includes('instagram.com') || text.includes('fb.watch')) {
    if (!text.startsWith('http')) {
      return 'https://' + text.replace(/^\/\//, '');
    }
  }

  return text;
}

/**
 * Validate if URL is from supported platforms
 */
export function isValidPlatformURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const validDomains = ['facebook.com', 'fb.watch', 'fb.com', 'instagram.com', 'm.facebook.com'];
    return validDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}

/**
 * Get platform from URL
 */
export function getPlatformFromURL(url: string): 'facebook' | 'instagram' | null {
  if (url.includes('facebook.com') || url.includes('fb.watch') || url.includes('fb.com')) {
    return 'facebook';
  }
  if (url.includes('instagram.com')) {
    return 'instagram';
  }
  return null;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Estimate download time based on file size
 */
export function estimateDownloadTime(bytes: number): string {
  // Assume average 5 Mbps connection
  const mbps = 5;
  const seconds = (bytes * 8) / (mbps * 1000000);
  
  if (seconds < 10) return '~10 seconds';
  if (seconds < 60) return `~${Math.round(seconds)} seconds`;
  const minutes = Math.round(seconds / 60);
  return `~${minutes} minute${minutes > 1 ? 's' : ''}`;
}







