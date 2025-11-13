"use client";

import { useState, useEffect, useRef } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Download, Copy, Share2, RefreshCw, Link as LinkIcon, Mail, Phone, Wifi, MapPin, Check, ArrowLeft, MessageSquare, User, Calendar, Wallet } from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";

type QRType = "text" | "url" | "email" | "phone" | "wifi" | "location" | "sms" | "whatsapp" | "vcard" | "event" | "payment";

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [inputValue, setInputValue] = useState("");
  const [qrDataURL, setQrDataURL] = useState("");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // QR Type Templates
  const templates = {
    text: { icon: <LinkIcon className="w-5 h-5" />, placeholder: "Enter any text...", label: "Text" },
    url: { icon: <LinkIcon className="w-5 h-5" />, placeholder: "https://example.com", label: "URL" },
    email: { icon: <Mail className="w-5 h-5" />, placeholder: "email@example.com", label: "Email" },
    phone: { icon: <Phone className="w-5 h-5" />, placeholder: "+1234567890", label: "Phone" },
    sms: { icon: <MessageSquare className="w-5 h-5" />, placeholder: "+1234567890|Hello there!", label: "SMS" },
    whatsapp: { icon: <MessageSquare className="w-5 h-5" />, placeholder: "+1234567890|Hi!", label: "WhatsApp" },
    wifi: { icon: <Wifi className="w-5 h-5" />, placeholder: "SSID:password:WPA", label: "WiFi" },
    location: { icon: <MapPin className="w-5 h-5" />, placeholder: "lat,lng (e.g., 40.7128,-74.0060)", label: "Location" },
    vcard: { icon: <User className="w-5 h-5" />, placeholder: "Name|Phone|Email|Company", label: "Contact Card" },
    event: { icon: <Calendar className="w-5 h-5" />, placeholder: "Event Title|2024-12-25 10:00|Location", label: "Calendar Event" },
    payment: { icon: <Wallet className="w-5 h-5" />, placeholder: "bitcoin:address OR paypal:email", label: "Payment" },
  };

  // Generate QR Code
  const generateQR = async () => {
    if (!inputValue.trim()) {
      setQrDataURL("");
      return;
    }

    let qrData = inputValue;

    // Format data based on type
    switch (qrType) {
      case "email":
        qrData = `mailto:${inputValue}`;
        break;
      case "phone":
        qrData = `tel:${inputValue}`;
        break;
      case "sms":
        const [smsPhone, smsBody = ""] = inputValue.split("|");
        qrData = `sms:${smsPhone}${smsBody ? `?body=${encodeURIComponent(smsBody)}` : ""}`;
        break;
      case "whatsapp":
        const [waPhone, waText = ""] = inputValue.split("|");
        const cleanPhone = waPhone.replace(/[^\d]/g, ""); // Remove non-digits
        qrData = `https://wa.me/${cleanPhone}${waText ? `?text=${encodeURIComponent(waText)}` : ""}`;
        break;
      case "wifi":
        const [ssid, password, encryption = "WPA"] = inputValue.split(":");
        qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        break;
      case "location":
        const [lat, lng] = inputValue.split(",");
        qrData = `geo:${lat},${lng}`;
        break;
      case "vcard":
        const [vcName, vcPhone, vcEmail, vcCompany = ""] = inputValue.split("|");
        qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nTEL:${vcPhone}\nEMAIL:${vcEmail}${vcCompany ? `\nORG:${vcCompany}` : ""}\nEND:VCARD`;
        break;
      case "event":
        const [evTitle, evDateTime, evLocation = ""] = inputValue.split("|");
        const eventDate = new Date(evDateTime);
        const formatDate = (date: Date) => {
          return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        };
        qrData = `BEGIN:VEVENT\nSUMMARY:${evTitle}\nDTSTART:${formatDate(eventDate)}\nDTEND:${formatDate(new Date(eventDate.getTime() + 3600000))}${evLocation ? `\nLOCATION:${evLocation}` : ""}\nEND:VEVENT`;
        break;
      case "payment":
        // Support various payment formats
        qrData = inputValue; // Can be bitcoin:, ethereum:, paypal:, etc.
        break;
    }

    try {
      const dataURL = await QRCode.toDataURL(qrData, {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: "M",
      });
      setQrDataURL(dataURL);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  // Auto-generate on input change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQR();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue, size, fgColor, bgColor, qrType]);

  // Download QR Code
  const downloadQR = () => {
    if (!qrDataURL) return;
    const link = document.createElement("a");
    link.href = qrDataURL;
    link.download = `qrcode-${Date.now()}.png`;
    link.click();
  };

  // Copy QR Code
  const copyQR = async () => {
    if (!qrDataURL) return;
    try {
      const blob = await (await fetch(qrDataURL)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy QR code:", err);
    }
  };

  // Share QR Code
  const shareQR = async () => {
    if (!qrDataURL) return;
    try {
      const blob = await (await fetch(qrDataURL)).blob();
      const file = new File([blob], "qrcode.png", { type: "image/png" });
      
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Check out this QR code!",
        });
      }
    } catch (err) {
      console.error("Failed to share QR code:", err);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-amber-900/10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <CommunityNavbar 
          onStatsClick={() => {}}
          onFavoritesClick={() => {}}
          onHistoryClick={() => {}}
          onKeyboardClick={() => {}}
          onTipsClick={() => {}}
          onExportClick={() => {}}
          historyCount={0}
        />

        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Back Button */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Community Services</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                QR Code Generator
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Create custom QR codes for URLs, SMS, WhatsApp, contact cards, calendar events, payments & more
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Left: Input & Settings */}
            <div className="space-y-6">
              {/* QR Type Selection */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-yellow-400" />
                  QR Code Type
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(Object.keys(templates) as QRType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setQrType(type);
                        setInputValue("");
                      }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                        qrType === type
                          ? "bg-gradient-to-br from-yellow-600 to-amber-600 text-white shadow-lg scale-105"
                          : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {templates[type].icon}
                      <span className="text-sm font-medium">{templates[type].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4">Content</h2>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={templates[qrType].placeholder}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  rows={4}
                />
                {qrType === "sms" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: PhoneNumber|Message (e.g., +1234567890|Hello there!)
                  </p>
                )}
                {qrType === "whatsapp" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: PhoneNumber|Message (e.g., +1234567890|Hi! I'm interested.)
                  </p>
                )}
                {qrType === "wifi" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: SSID:Password:Encryption (e.g., MyWiFi:password123:WPA)
                  </p>
                )}
                {qrType === "location" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: Latitude,Longitude (e.g., 40.7128,-74.0060)
                  </p>
                )}
                {qrType === "vcard" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: Name|Phone|Email|Company (e.g., John Doe|+1234567890|john@example.com|Acme Inc)
                  </p>
                )}
                {qrType === "event" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: Title|DateTime|Location (e.g., Team Meeting|2024-12-25 10:00|Conference Room A)
                  </p>
                )}
                {qrType === "payment" && (
                  <p className="text-xs text-gray-400 mt-2">
                    Format: bitcoin:address?amount=0.1 OR ethereum:address OR paypal.me/username
                  </p>
                )}
              </div>

              {/* Customization */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4">Customize</h2>
                
                {/* Size */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Size: {size}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="50"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Foreground Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-12 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSize(300);
                    setFgColor("#000000");
                    setBgColor("#ffffff");
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Settings
                </button>
              </div>
            </div>

            {/* Right: QR Preview & Actions */}
            <div className="space-y-6">
              {/* QR Preview */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4">Preview</h2>
                <div className="flex items-center justify-center p-8 bg-gray-900/50 rounded-xl min-h-[400px]">
                  {qrDataURL ? (
                    <img
                      src={qrDataURL}
                      alt="QR Code"
                      className="max-w-full h-auto rounded-lg shadow-2xl"
                      style={{ maxWidth: `${size}px` }}
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="w-32 h-32 mx-auto mb-4 border-4 border-dashed border-gray-600 rounded-xl flex items-center justify-center">
                        <LinkIcon className="w-12 h-12" />
                      </div>
                      <p>Enter content to generate QR code</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {qrDataURL && (
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h2 className="text-xl font-bold mb-4">Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={downloadQR}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 rounded-xl transition-all shadow-lg font-medium"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                    <button
                      onClick={copyQR}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all shadow-lg font-medium ${
                        copied
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Copy
                        </>
                      )}
                    </button>
                    {navigator.share && (
                      <button
                        onClick={shareQR}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all shadow-lg font-medium"
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 rounded-2xl p-6 border border-yellow-700/30">
                <h3 className="font-bold mb-3 text-yellow-400">✨ Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✅ Multiple QR code types supported</li>
                  <li>✅ Customizable size and colors</li>
                  <li>✅ High-quality PNG export</li>
                  <li>✅ No watermarks or limits</li>
                  <li>✅ 100% free and private</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

