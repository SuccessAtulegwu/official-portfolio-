import { NextRequest, NextResponse } from "next/server";
import { extractInstagramVideo, isValidUrl } from "@/lib/videoExtractor";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    // Validate input
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { success: false, error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Extract video
    const result = await extractInstagramVideo(url);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Internal server error. Please try again later." 
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: "Method not allowed. Use POST request." 
    },
    { status: 405 }
  );
}

