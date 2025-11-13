import axios from "axios";
import * as cheerio from "cheerio";

export interface VideoInfo {
  success: boolean;
  platform?: string;
  title?: string;
  thumbnail?: string;
  duration?: string;
  author?: string;
  downloadUrl?: string;
  error?: string;
}

/**
 * Extract Facebook video information
 * Note: This is a simplified implementation. In production, you may need:
 * - More robust scraping logic
 * - Handling of authentication
 * - Rate limiting
 * - Use of third-party APIs
 */
export async function extractFacebookVideo(url: string): Promise<VideoInfo> {
  try {
    // Validate URL
    if (!url.includes("facebook.com") && !url.includes("fb.watch") && !url.includes("fb.com")) {
      return {
        success: false,
        error: "Invalid Facebook URL",
      };
    }

    // Convert mobile URL to desktop URL for better scraping
    const normalizedUrl = url
      .replace("m.facebook.com", "www.facebook.com")
      .replace("mobile.facebook.com", "www.facebook.com");

    console.log("Fetching Facebook video from:", normalizedUrl);

    // Method 1: Try to extract from page metadata
    const response = await axios.get(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      timeout: 20000,
      maxRedirects: 5,
    });

    const $ = cheerio.load(response.data);
    let videoUrl = "";

    // Try multiple methods to find video URL
    
    // Method 1: OG meta tags
    videoUrl = $('meta[property="og:video"]').attr("content") ||
               $('meta[property="og:video:url"]').attr("content") ||
               $('meta[property="og:video:secure_url"]').attr("content") ||
               "";

    // Method 2: JSON-LD structured data
    if (!videoUrl) {
      const scripts = $('script[type="application/ld+json"]');
      scripts.each((_, element) => {
        try {
          const json = JSON.parse($(element).html() || "");
          if (json.contentUrl) {
            videoUrl = json.contentUrl;
          }
        } catch (e) {
          // Continue to next script
        }
      });
    }

    // Method 3: Search in inline JavaScript
    if (!videoUrl) {
      const scripts = $("script");
      scripts.each((_, element) => {
        const content = $(element).html() || "";
        
        // Look for HD video URL
        if (content.includes("hd_src")) {
          const hdMatch = content.match(/"hd_src":"([^"]+)"/);
          if (hdMatch && hdMatch[1]) {
            videoUrl = hdMatch[1].replace(/\\\//g, "/");
            return false; // Break the loop
          }
        }
        
        // Look for SD video URL
        if (!videoUrl && content.includes("sd_src")) {
          const sdMatch = content.match(/"sd_src":"([^"]+)"/);
          if (sdMatch && sdMatch[1]) {
            videoUrl = sdMatch[1].replace(/\\\//g, "/");
            return false;
          }
        }

        // Look for playable_url
        if (!videoUrl && content.includes("playable_url")) {
          const playMatch = content.match(/"playable_url":"([^"]+)"/);
          if (playMatch && playMatch[1]) {
            videoUrl = playMatch[1].replace(/\\\//g, "/");
            return false;
          }
        }
      });
    }

    // Extract metadata
    const title = $('meta[property="og:title"]').attr("content") || 
                  $('meta[name="twitter:title"]').attr("content") ||
                  $("title").text() ||
                  "Facebook Video";
    
    const thumbnail = $('meta[property="og:image"]').attr("content") || 
                     $('meta[name="twitter:image"]').attr("content") ||
                     "";
    
    const author = $('meta[property="og:site_name"]').attr("content") || "Facebook User";

    if (videoUrl) {
      console.log("Facebook video URL found:", videoUrl.substring(0, 50) + "...");
      return {
        success: true,
        platform: "facebook",
        title: title.substring(0, 200), // Limit title length
        thumbnail,
        author,
        downloadUrl: videoUrl,
      };
    }

    // If no video found, provide helpful error
    console.log("No video URL found in Facebook page");
    return {
      success: false,
      error: "Could not extract video URL. This might be because:\n• The video is private or restricted\n• The post requires login to view\n• The link is not a video post\n• Facebook has blocked automated access\n\nTry using a public video post URL.",
    };

  } catch (error: any) {
    console.error("Facebook extraction error:", error.message);
    
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: "Request timeout. The server took too long to respond. Please try again.",
      };
    }
    
    if (error.response?.status === 404) {
      return {
        success: false,
        error: "Video not found. Please check if the URL is correct and the post still exists.",
      };
    }
    
    if (error.response?.status === 403) {
      return {
        success: false,
        error: "Access denied. The video may be private or region-restricted.",
      };
    }

    return {
      success: false,
      error: "Failed to fetch video. The video may be private, deleted, or the link is invalid. Please try a different video.",
    };
  }
}

/**
 * Extract Instagram video information
 * Note: Instagram has strict rate limiting and anti-scraping measures.
 * This is a basic implementation that may not work for all videos.
 */
export async function extractInstagramVideo(url: string): Promise<VideoInfo> {
  try {
    // Validate URL
    if (!url.includes("instagram.com")) {
      return {
        success: false,
        error: "Invalid Instagram URL",
      };
    }

    // Normalize URL - ensure it ends with / for better scraping
    let normalizedUrl = url.trim().split("?")[0]; // Remove query params
    if (!normalizedUrl.endsWith("/")) {
      normalizedUrl += "/";
    }

    console.log("Fetching Instagram video from:", normalizedUrl);

    // Method 1: Try public JSON endpoint
    const jsonUrl = `${normalizedUrl}?__a=1&__d=dis`;

    try {
      const jsonResponse = await axios.get(jsonUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
          "Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "X-Requested-With": "XMLHttpRequest",
        },
        timeout: 20000,
      });

      // Try to parse JSON response
      if (typeof jsonResponse.data === "object") {
        const data = jsonResponse.data;
        const media = data?.items?.[0] || data?.graphql?.shortcode_media;

        if (media && media.video_url) {
          console.log("Instagram video found via JSON API");
          return {
            success: true,
            platform: "instagram",
            title: (media.caption?.text || media.edge_media_to_caption?.edges?.[0]?.node?.text || "Instagram Video").substring(0, 200),
            thumbnail: media.thumbnail_url || media.display_url,
            author: media.owner?.username || media.user?.username || "Instagram User",
            downloadUrl: media.video_url,
          };
        }
      }
    } catch (jsonError) {
      console.log("Instagram JSON API failed, trying HTML scraping");
    }

    // Method 2: Scrape HTML page
    const response = await axios.get(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Cookie": "sessionid=; ds_user_id=; csrftoken=;", // Empty cookies to avoid login requirement
      },
      timeout: 20000,
    });

    const $ = cheerio.load(response.data);
    let videoUrl = "";

    // Try to extract from meta tags
    videoUrl = $('meta[property="og:video"]').attr("content") ||
               $('meta[property="og:video:secure_url"]').attr("content") ||
               $('meta[property="og:video:url"]').attr("content") ||
               "";

    const title = $('meta[property="og:title"]').attr("content") || 
                  $('meta[name="twitter:title"]').attr("content") ||
                  "Instagram Video";
    const thumbnail = $('meta[property="og:image"]').attr("content") || 
                     $('meta[name="twitter:image"]').attr("content") ||
                     "";

    // Try to find in script tags containing JSON data
    if (!videoUrl) {
      const scripts = $("script");
      scripts.each((_, element) => {
        const content = $(element).html() || "";
        
        // Look for video_url in various formats
        if (content.includes("video_url")) {
          // Try different patterns
          const patterns = [
            /"video_url":"([^"]+)"/,
            /'video_url':'([^']+)'/,
            /videoUrl":"([^"]+)"/,
            /"playback_url":"([^"]+)"/,
          ];

          for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
              videoUrl = match[1]
                .replace(/\\u0026/g, "&")
                .replace(/\\\//g, "/")
                .replace(/\\"/g, '"');
              return false; // Break the each loop
            }
          }
        }

        // Look for SharedData
        if (!videoUrl && content.includes("window._sharedData")) {
          try {
            const sharedDataMatch = content.match(/window\._sharedData\s*=\s*({.+?});/);
            if (sharedDataMatch) {
              const sharedData = JSON.parse(sharedDataMatch[1]);
              const media = sharedData?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;
              if (media?.video_url) {
                videoUrl = media.video_url;
                return false;
              }
            }
          } catch (e) {
            // Continue to next script
          }
        }
      });
    }

    if (videoUrl) {
      console.log("Instagram video URL found:", videoUrl.substring(0, 50) + "...");
      return {
        success: true,
        platform: "instagram",
        title: title.substring(0, 200),
        thumbnail,
        author: "Instagram User",
        downloadUrl: videoUrl,
      };
    }

    console.log("No video URL found in Instagram post");
    return {
      success: false,
      error: "Could not extract video. This might be because:\n• The post is private or restricted\n• The post is not a video (photos won't work)\n• The account is private\n• Instagram has blocked automated access\n\nTry using a public video post from a public account.",
    };

  } catch (error: any) {
    console.error("Instagram extraction error:", error.message);
    
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: "Request timeout. The server took too long to respond. Please try again.",
      };
    }
    
    if (error.response?.status === 404) {
      return {
        success: false,
        error: "Post not found. Please check if the URL is correct and the post still exists.",
      };
    }
    
    if (error.response?.status === 403 || error.response?.status === 401) {
      return {
        success: false,
        error: "Access denied. The post may be private or require authentication.",
      };
    }

    return {
      success: false,
      error: "Failed to fetch video. The post may be private, deleted, or not a video. Please try a public video post.",
    };
  }
}

/**
 * Validate if a URL is properly formatted
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

