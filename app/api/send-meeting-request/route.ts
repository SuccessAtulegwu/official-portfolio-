import { NextRequest, NextResponse } from 'next/server';
import { sendMeetingRequestEmail, type MeetingData } from '@/lib/emailService';

export async function POST(request: NextRequest) {
  try {
    const body: MeetingData = await request.json();
    
    // Validate required fields
    const requiredFields: (keyof MeetingData)[] = [
      'name',
      'email',
      'meetingType',
      'platform',
      'date',
      'meetingTime'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Send email
    const result = await sendMeetingRequestEmail(body);
    
    if (result.success) {
      return NextResponse.json(
        { message: 'Meeting request sent successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}