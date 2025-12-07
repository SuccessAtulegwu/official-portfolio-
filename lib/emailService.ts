// lib/emailService.js
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface MeetingData {
  name: string;
  email: string;
  meetingType: string;
  platform: string;
  date: string;
  meetingTime: string;
  meetingLink?: string;
  whatsappNumber?: string;
  message?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  message?: string;
  error?: string;
}

interface TemplateData {
  name: string;
  email: string;
  time: string;
  meetingType: string;
  platform: string;
  date: string;
  meetingTime: string;
  meetingLink: string;
  whatsappNumber: string;
  message: string;
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_NODEMAILERUSER, // Your Gmail address
    pass: process.env.NEXT_PUBLIC_NODEMAILERPASSWORD, // Gmail App Password (not regular password)
  },
});

// Function to replace template variables
const replaceTemplateVariables = (template: string, data: TemplateData): string => {
  let result = template;
  
  // Replace all template variables
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, data[key as keyof TemplateData] || '');
  });
  
  return result;
};

export const sendMeetingRequestEmail = async (meetingData: MeetingData): Promise<EmailResult> => {
  try {
    // Read the HTML template
    const templatePath = path.join(process.cwd(), 'templates', 'scheduletemplate.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    
    // Prepare template data
    const templateData: TemplateData = {
      name: meetingData.name,
      email: meetingData.email,
      time: new Date().toLocaleString(),
      meetingType: meetingData.meetingType,
      platform: meetingData.platform,
      date: meetingData.date,
      meetingTime: meetingData.meetingTime,
      meetingLink: meetingData.platform.toLowerCase() !== 'whatsapp' ? (meetingData.meetingLink || '') : '',
      whatsappNumber: meetingData.platform.toLowerCase() === 'whatsapp' ? (meetingData.whatsappNumber || '') : '',
      message: meetingData.message || 'No additional message provided.',
    };
    
    // Replace variables in template
    const htmlContent = replaceTemplateVariables(htmlTemplate, templateData);
    
    // Email options
    const mailOptions = {
      from: `"Portfolio Meeting" <${meetingData.email}>`,
      to: process.env.NEXT_PUBLIC_NODEMAILERUSER, // Your email where you want to receive meeting requests
      subject: `New Meeting Request - ${meetingData.meetingType} from ${meetingData.name}`,
      html: htmlContent,
      replyTo: meetingData.email,
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Verify transporter configuration
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};