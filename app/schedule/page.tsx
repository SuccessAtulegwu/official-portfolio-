"use client";

import { useState } from "react";
import { Calendar, Clock, Video, ChevronLeft, ChevronRight, User, Mail, MessageSquare, CheckCircle, MapPin, Phone, Link as LinkIcon, Loader2, Send } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import { FormStatus, MeetingFormData } from "@/types/meeting";
import toast from 'react-hot-toast';

type MeetingType = "consultation" | "project" | "support";
type Platform = "zoom" | "whatsapp" | "teams" | "meet";

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedMeetingType, setSelectedMeetingType] = useState<MeetingType>("consultation");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("zoom");
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, SetisSubmitting] = useState(false);
  const [linkError, setLinkError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');


  // Validation functions
  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const validateWhatsAppNumber = (phone: string): boolean => {
    // Must start with + and contain only digits, spaces, and hyphens
    const phoneRegex = /^\+[0-9\s\-()]{10,}$/;
    return phoneRegex.test(phone.trim());
  };

  const getMeetingPlatform = (platform: Platform): string => {
    if (platform === 'meet') return 'Google Meet';
    else if (platform === 'teams') return 'Mricrosoft Teams';
    else if (platform === 'whatsapp') return 'WhatsApp Meeting';
    else if (platform === 'zoom') return 'Zoom Meeting';
    else return 'None';
  }

  const getMeetingType = (meetingType: MeetingType): string => {
    if (meetingType === 'consultation') return 'Consultation Call';
    else if (meetingType === 'project') return 'Project Discussion';
    else if (meetingType === 'support') return 'Technical Support';
    else return 'None';
  }

  // Meeting types
  const meetingTypes = [
    {
      id: "consultation" as MeetingType,
      name: "Consultation Call",
      duration: "30 min",
      description: "Quick discussion about your project",
      icon: MessageSquare,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: "project" as MeetingType,
      name: "Project Discussion",
      duration: "60 min",
      description: "In-depth project planning session",
      icon: Video,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "support" as MeetingType,
      name: "Technical Support",
      duration: "45 min",
      description: "Get help with technical issues",
      icon: Clock,
      color: "from-yellow-500 to-amber-600",
    },
  ];

  // Platform options
  const platforms = [
    {
      id: "zoom" as Platform,
      name: "Zoom",
      icon: Video,
      color: "from-amber-500 to-yellow-500",
      description: "Video call via Zoom",
      requiresLink: true,
      placeholder: "https://zoom.us/j/123456789",
    },
    {
      id: "meet" as Platform,
      name: "Google Meet",
      icon: Video,
      color: "from-yellow-500 to-amber-500",
      description: "Video call via Google Meet",
      requiresLink: true,
      placeholder: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "teams" as Platform,
      name: "Microsoft Teams",
      icon: Video,
      color: "from-amber-600 to-orange-500",
      description: "Video call via Teams",
      requiresLink: true,
      placeholder: "https://teams.microsoft.com/l/meetup-join/...",
    },
    {
      id: "whatsapp" as Platform,
      name: "WhatsApp",
      icon: Phone,
      color: "from-yellow-400 to-amber-500",
      description: "Voice/Video call via WhatsApp",
      requiresLink: false,
      placeholder: "+234 812 345 6789",
    },
  ];

  // Available time slots (9 AM to 5 PM)
  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "05:00 PM", available: true },
  ];

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6; // Disable past dates and weekends
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    SetisSubmitting(true);
    try {
      var formD: MeetingFormData = {
        meetingType: getMeetingType(selectedMeetingType),
        platform: getMeetingPlatform(selectedPlatform),
        meetingLink: selectedPlatform !== "whatsapp" ? meetingLink : undefined,
        whatsappNumber: selectedPlatform === "whatsapp" ? whatsappNumber : undefined,
        date: selectedDate!.toISOString(),
        email: formData.email,
        meetingTime: selectedTime,
        name: formData.name,
        message: formData.message,
      }
      const response = await fetch('/api/send-meeting-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formD),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        toast.success('Meeting scheduled successfully', {
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid #fbbf24',
            padding: '16px',
            borderRadius: '8px',
          },
          iconTheme: {
            primary: '#fbbf24',
            secondary: '#0a0a0a',
          },
        });
        SetisSubmitting(false)
        setIsSubmitted(true);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send request');
        SetisSubmitting(false);
        toast.error(data.error || 'Failed to send request');
      }

    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
      SetisSubmitting(false)
      toast.error('Failed to send message. Please try again.');
    }

  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-black text-white">
        <MainNavbar />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-12 shadow-xl">
              <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Meeting Scheduled Successfully!
              </h2>
              <p className="text-lg text-gray-300 mb-2">
                Your meeting has been scheduled for:
              </p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 my-6">
                <p className="text-xl font-semibold text-primary mb-2">
                  {formatDate(selectedDate)}
                </p>
                <p className="text-lg text-gray-200">
                  {selectedTime}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {meetingTypes.find((t) => t.id === selectedMeetingType)?.name} (
                  {meetingTypes.find((t) => t.id === selectedMeetingType)?.duration})
                </p>
                <div className="mt-4 pt-4 border-t border-amber-500/20">
                  <p className="text-sm text-gray-300 mb-2">
                    <strong className="text-primary">Platform:</strong> {platforms.find((p) => p.id === selectedPlatform)?.name}
                  </p>
                  {selectedPlatform === "whatsapp" ? (
                    <p className="text-sm text-gray-300">
                      <strong className="text-primary">WhatsApp:</strong> {whatsappNumber}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-300 break-all">
                      <strong className="text-primary">Meeting Link:</strong>{" "}
                      <a
                        href={meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {meetingLink}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-300 mb-8">
                A confirmation email has been sent to <strong className="text-primary">{formData.email}</strong> with the
                meeting details.
                {selectedPlatform === "whatsapp"
                  ? " You will be contacted via WhatsApp at the scheduled time."
                  : " Please join the meeting using the provided link at the scheduled time."}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setSelectedDate(null);
                  setSelectedTime("");
                  setSelectedPlatform("zoom");
                  setMeetingLink("");
                  setWhatsappNumber("");
                  setLinkError("");
                  setPhoneError("");
                  setFormData({ name: "", email: "", message: "" });
                }}
                className="px-8 py-3 bg-primary text-black rounded-sm hover:brightness-110 active:brightness-95 transition-all shadow-lg font-medium"
              >
                Schedule Another Meeting
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 mt-5">
            <h2
              className="text-center text-5xl sm:text-6xl font-bold tracking-wider text-white leading-tight mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                letterSpacing: '-0.02em'
              }}
            >
              Schedule a Meeting
            </h2>

            {/* <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Schedule a Meeting
          </h1> */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Choose your preferred time and platform for a seamless collaboration experience
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-2 sm:gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${step >= s
                      ? "bg-primary text-black"
                      : "bg-gray-800 text-gray-500"
                      }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`w-8 sm:w-16 h-1 ${step > s ? "bg-primary" : "bg-gray-800"
                        }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Step 1: Select Meeting Type */}
            {step === 1 && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Select Meeting Type
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose the type of meeting that best fits your needs
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {meetingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedMeetingType(type.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${selectedMeetingType === type.id
                        ? "border-primary bg-amber-500/10"
                        : "border-gray-700 hover:border-amber-500/50"
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {type.name}
                      </h3>
                      <p className="text-sm text-primary mb-2">
                        {type.duration}
                      </p>
                      <p className="text-sm text-gray-400">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 bg-primary text-black rounded-sm hover:brightness-110 active:brightness-95 transition-all shadow-lg font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Platform & Meeting Link */}
            {step === 2 && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Select Platform & Details
                    </h2>
                    <button
                      onClick={() => setStep(1)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      ← Back
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose your preferred meeting platform and provide connection details
                  </p>
                </div>

                {/* Platform Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Choose Meeting Platform
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        onClick={() => {
                          setSelectedPlatform(platform.id);
                          setMeetingLink("");
                          setWhatsappNumber("");
                          setLinkError("");
                          setPhoneError("");
                        }}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${selectedPlatform === platform.id
                          ? "border-primary bg-amber-500/10"
                          : "border-gray-700 hover:border-amber-500/50"
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center mb-3`}>
                          <platform.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                          {platform.name}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {platform.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meeting Link or WhatsApp Number Input */}
                <div className="mb-8">
                  {selectedPlatform === "whatsapp" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => {
                          setWhatsappNumber(e.target.value);
                          setPhoneError("");
                        }}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          if (value && !validateWhatsAppNumber(value)) {
                            setPhoneError("Please enter a valid WhatsApp number starting with + (e.g., +234 812 345 6789)");
                          }
                        }}
                        placeholder={platforms.find(p => p.id === "whatsapp")?.placeholder}
                        className={`w-full px-4 py-3 rounded-lg border ${phoneError
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-gray-800 text-white focus:outline-none focus:ring-2 ${phoneError ? "focus:ring-red-500" : "focus:ring-primary"
                          }`}
                      />
                      {phoneError && (
                        <p className="text-xs text-red-500 mt-2">{phoneError}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Include country code (e.g., +234 for Nigeria, +1 for USA)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <LinkIcon className="w-4 h-4 inline mr-2" />
                        Meeting Link
                      </label>
                      <input
                        type="url"
                        value={meetingLink}
                        onChange={(e) => {
                          setMeetingLink(e.target.value);
                          setLinkError("");
                        }}
                        onBlur={(e) => {
                          const value = e.target.value.trim();
                          if (value && !validateUrl(value)) {
                            setLinkError("Please enter a valid URL starting with http:// or https://");
                          }
                        }}
                        placeholder={platforms.find(p => p.id === selectedPlatform)?.placeholder}
                        className={`w-full px-4 py-3 rounded-lg border ${linkError
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                          } bg-gray-800 text-white focus:outline-none focus:ring-2 ${linkError ? "focus:ring-red-500" : "focus:ring-primary"
                          }`}
                      />
                      {linkError && (
                        <p className="text-xs text-red-500 mt-2">{linkError}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Provide the {platforms.find(p => p.id === selectedPlatform)?.name} meeting link for this session
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      // Validate before proceeding
                      if (selectedPlatform === "whatsapp") {
                        if (!validateWhatsAppNumber(whatsappNumber.trim())) {
                          setPhoneError("Please enter a valid WhatsApp number starting with + (e.g., +234 812 345 6789)");
                          return;
                        }
                      } else {
                        if (!validateUrl(meetingLink.trim())) {
                          setLinkError("Please enter a valid URL starting with http:// or https://");
                          return;
                        }
                      }
                      setStep(3);
                    }}
                    disabled={
                      (selectedPlatform === "whatsapp" && (!whatsappNumber.trim() || phoneError !== "")) ||
                      (selectedPlatform !== "whatsapp" && (!meetingLink.trim() || linkError !== ""))
                    }
                    className={`px-8 py-3 rounded-sm font-medium transition-all shadow-lg ${((selectedPlatform === "whatsapp" && whatsappNumber.trim() && phoneError === "") ||
                      (selectedPlatform !== "whatsapp" && meetingLink.trim() && linkError === ""))
                      ? "bg-primary text-black hover:brightness-110"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Select Date & Time */}
            {step === 3 && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Select Date & Time
                    </h2>
                    <button
                      onClick={() => setStep(2)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      ← Back
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose a date and time that works best for your schedule
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      {/* Calendar Header */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={previousMonth}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-300" />
                        </button>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {monthName}
                        </h3>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-300" />
                        </button>
                      </div>

                      {/* Week Days */}
                      <div className="grid grid-cols-7 gap-2 mb-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                          <div
                            key={day}
                            className="text-center text-sm font-semibold text-gray-400"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                          <div key={`empty-${i}`}></div>
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const date = new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            day
                          );
                          const disabled = isDateDisabled(date);
                          const selected = isSameDay(selectedDate, date);

                          return (
                            <button
                              key={day}
                              onClick={() => !disabled && setSelectedDate(date)}
                              disabled={disabled}
                              className={`aspect-square p-2 rounded-lg text-sm font-medium transition-all ${selected
                                ? "bg-primary text-black"
                                : disabled
                                  ? "text-gray-600 cursor-not-allowed"
                                  : "text-gray-300 hover:bg-amber-500/10"
                                }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {selectedDate ? formatDate(selectedDate) : "Select a date"}
                    </h3>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${selectedTime === slot.time
                              ? "bg-primary text-black"
                              : slot.available
                                ? "bg-gray-800 text-gray-300 hover:bg-amber-500/10"
                                : "bg-gray-800 text-gray-600 cursor-not-allowed line-through"
                              }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-12">
                        Please select a date to see available time slots
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setStep(4)}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-8 py-3 rounded-sm font-medium transition-all shadow-lg ${selectedDate && selectedTime
                      ? "bg-primary text-black hover:brightness-110"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {step === 4 && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Your Information
                    </h2>
                    <button
                      onClick={() => setStep(3)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      ← Back
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Share your information so we can confirm your booking
                  </p>
                </div>

                {/* Meeting Summary */}
                <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-amber-500/30 shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>

                  <div className="relative">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                        <Clock className="w-5 h-5 text-black" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Meeting Summary
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Type & Duration */}
                      <div className="flex flex-col gap-3 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">Meeting Type</p>
                          <p className="text-gray-900 dark:text-white font-semibold">
                            {meetingTypes.find((t) => t.id === selectedMeetingType)?.name}
                          </p>
                          <p className="text-sm text-primary mt-1">
                            {meetingTypes.find((t) => t.id === selectedMeetingType)?.duration}
                          </p>
                        </div>
                      </div>

                      {/* Platform & Link/Phone */}
                      <div className="flex flex-col gap-3 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Video className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">Platform</p>
                          <p className="text-gray-900 dark:text-white font-semibold mb-2">
                            {platforms.find((p) => p.id === selectedPlatform)?.name}
                          </p>
                          {selectedPlatform === "whatsapp" ? (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-gray-300 font-mono">{whatsappNumber}</span>
                            </div>
                          ) : (
                            <a
                              href={meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:text-amber-400 transition-colors group"
                            >
                              <LinkIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate group-hover:underline">{meetingLink}</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex flex-col gap-3 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">Scheduled For</p>
                          <p className="text-gray-900 dark:text-white font-semibold">
                            {formatDate(selectedDate)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-gray-300 font-medium">{selectedTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      name="message"
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us about your project or what you'd like to discuss..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-primary text-black rounded-sm hover:brightness-110 transition-all shadow-lg font-medium"
                    >
                      {isSubmitting ? (<>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        <span className="transition-all duration-300">Send...</span>
                      </>) : <>Confirm Booking</>}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


