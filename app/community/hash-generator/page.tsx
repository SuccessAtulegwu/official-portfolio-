"use client";

import { useState, useRef } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Hash, Copy, Check, Upload, FileText, ArrowLeft, Lock, Shield, Key } from "lucide-react";
import Link from "next/link";

type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

export default function HashGeneratorPage() {
  const [inputText, setInputText] = useState("");
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<HashAlgorithm[]>(["SHA-256"]);
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const algorithms: { name: HashAlgorithm; description: string; color: string }[] = [
    { name: "MD5", description: "128-bit hash (legacy, not secure)", color: "from-red-500 to-orange-500" },
    { name: "SHA-1", description: "160-bit hash (deprecated)", color: "from-orange-500 to-yellow-500" },
    { name: "SHA-256", description: "256-bit hash (recommended)", color: "from-green-500 to-emerald-500" },
    { name: "SHA-512", description: "512-bit hash (most secure)", color: "from-blue-500 to-indigo-500" },
  ];

  // MD5 implementation (pure JavaScript)
  const md5 = async (text: string): Promise<string> => {
    // MD5 implementation based on RFC 1321
    const rotateLeft = (value: number, shift: number) => {
      return (value << shift) | (value >>> (32 - shift));
    };

    const addUnsigned = (x: number, y: number) => {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };

    const F = (x: number, y: number, z: number) => (x & y) | (~x & z);
    const G = (x: number, y: number, z: number) => (x & z) | (y & ~z);
    const H = (x: number, y: number, z: number) => x ^ y ^ z;
    const I = (x: number, y: number, z: number) => y ^ (x | ~z);

    const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const convertToWordArray = (str: string) => {
      const wordArray: number[] = [];
      for (let i = 0; i < str.length * 8; i += 8) {
        wordArray[i >> 5] |= (str.charCodeAt(i / 8) & 0xFF) << (i % 32);
      }
      return wordArray;
    };

    const utf8Encode = (str: string) => {
      return unescape(encodeURIComponent(str));
    };

    const wordToHex = (value: number) => {
      let hex = "";
      for (let i = 0; i < 4; i++) {
        hex += ((value >> (i * 8 + 4)) & 0x0F).toString(16) + ((value >> (i * 8)) & 0x0F).toString(16);
      }
      return hex;
    };

    const str = utf8Encode(text);
    const x = convertToWordArray(str);
    const len = str.length * 8;
    
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;

    for (let i = 0; i < x.length; i += 16) {
      const oldA = a;
      const oldB = b;
      const oldC = c;
      const oldD = d;

      a = FF(a, b, c, d, x[i + 0], 7, 0xD76AA478);
      d = FF(d, a, b, c, x[i + 1], 12, 0xE8C7B756);
      c = FF(c, d, a, b, x[i + 2], 17, 0x242070DB);
      b = FF(b, c, d, a, x[i + 3], 22, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[i + 4], 7, 0xF57C0FAF);
      d = FF(d, a, b, c, x[i + 5], 12, 0x4787C62A);
      c = FF(c, d, a, b, x[i + 6], 17, 0xA8304613);
      b = FF(b, c, d, a, x[i + 7], 22, 0xFD469501);
      a = FF(a, b, c, d, x[i + 8], 7, 0x698098D8);
      d = FF(d, a, b, c, x[i + 9], 12, 0x8B44F7AF);
      c = FF(c, d, a, b, x[i + 10], 17, 0xFFFF5BB1);
      b = FF(b, c, d, a, x[i + 11], 22, 0x895CD7BE);
      a = FF(a, b, c, d, x[i + 12], 7, 0x6B901122);
      d = FF(d, a, b, c, x[i + 13], 12, 0xFD987193);
      c = FF(c, d, a, b, x[i + 14], 17, 0xA679438E);
      b = FF(b, c, d, a, x[i + 15], 22, 0x49B40821);

      a = GG(a, b, c, d, x[i + 1], 5, 0xF61E2562);
      d = GG(d, a, b, c, x[i + 6], 9, 0xC040B340);
      c = GG(c, d, a, b, x[i + 11], 14, 0x265E5A51);
      b = GG(b, c, d, a, x[i + 0], 20, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[i + 5], 5, 0xD62F105D);
      d = GG(d, a, b, c, x[i + 10], 9, 0x02441453);
      c = GG(c, d, a, b, x[i + 15], 14, 0xD8A1E681);
      b = GG(b, c, d, a, x[i + 4], 20, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[i + 9], 5, 0x21E1CDE6);
      d = GG(d, a, b, c, x[i + 14], 9, 0xC33707D6);
      c = GG(c, d, a, b, x[i + 3], 14, 0xF4D50D87);
      b = GG(b, c, d, a, x[i + 8], 20, 0x455A14ED);
      a = GG(a, b, c, d, x[i + 13], 5, 0xA9E3E905);
      d = GG(d, a, b, c, x[i + 2], 9, 0xFCEFA3F8);
      c = GG(c, d, a, b, x[i + 7], 14, 0x676F02D9);
      b = GG(b, c, d, a, x[i + 12], 20, 0x8D2A4C8A);

      a = HH(a, b, c, d, x[i + 5], 4, 0xFFFA3942);
      d = HH(d, a, b, c, x[i + 8], 11, 0x8771F681);
      c = HH(c, d, a, b, x[i + 11], 16, 0x6D9D6122);
      b = HH(b, c, d, a, x[i + 14], 23, 0xFDE5380C);
      a = HH(a, b, c, d, x[i + 1], 4, 0xA4BEEA44);
      d = HH(d, a, b, c, x[i + 4], 11, 0x4BDECFA9);
      c = HH(c, d, a, b, x[i + 7], 16, 0xF6BB4B60);
      b = HH(b, c, d, a, x[i + 10], 23, 0xBEBFBC70);
      a = HH(a, b, c, d, x[i + 13], 4, 0x289B7EC6);
      d = HH(d, a, b, c, x[i + 0], 11, 0xEAA127FA);
      c = HH(c, d, a, b, x[i + 3], 16, 0xD4EF3085);
      b = HH(b, c, d, a, x[i + 6], 23, 0x04881D05);
      a = HH(a, b, c, d, x[i + 9], 4, 0xD9D4D039);
      d = HH(d, a, b, c, x[i + 12], 11, 0xE6DB99E5);
      c = HH(c, d, a, b, x[i + 15], 16, 0x1FA27CF8);
      b = HH(b, c, d, a, x[i + 2], 23, 0xC4AC5665);

      a = II(a, b, c, d, x[i + 0], 6, 0xF4292244);
      d = II(d, a, b, c, x[i + 7], 10, 0x432AFF97);
      c = II(c, d, a, b, x[i + 14], 15, 0xAB9423A7);
      b = II(b, c, d, a, x[i + 5], 21, 0xFC93A039);
      a = II(a, b, c, d, x[i + 12], 6, 0x655B59C3);
      d = II(d, a, b, c, x[i + 3], 10, 0x8F0CCC92);
      c = II(c, d, a, b, x[i + 10], 15, 0xFFEFF47D);
      b = II(b, c, d, a, x[i + 1], 21, 0x85845DD1);
      a = II(a, b, c, d, x[i + 8], 6, 0x6FA87E4F);
      d = II(d, a, b, c, x[i + 15], 10, 0xFE2CE6E0);
      c = II(c, d, a, b, x[i + 6], 15, 0xA3014314);
      b = II(b, c, d, a, x[i + 13], 21, 0x4E0811A1);
      a = II(a, b, c, d, x[i + 4], 6, 0xF7537E82);
      d = II(d, a, b, c, x[i + 11], 10, 0xBD3AF235);
      c = II(c, d, a, b, x[i + 2], 15, 0x2AD7D2BB);
      b = II(b, c, d, a, x[i + 9], 21, 0xEB86D391);

      a = addUnsigned(a, oldA);
      b = addUnsigned(b, oldB);
      c = addUnsigned(c, oldC);
      d = addUnsigned(d, oldD);
    }

    return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  };

  // SHA hash using Web Crypto API
  const sha = async (algorithm: string, text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  // Generate hashes
  const generateHashes = async () => {
    if (!inputText.trim()) {
      setHashes({});
      return;
    }

    setIsProcessing(true);
    const newHashes: Record<string, string> = {};

    for (const algo of selectedAlgorithms) {
      try {
        switch (algo) {
          case "MD5":
            newHashes[algo] = await md5(inputText);
            break;
          case "SHA-1":
            newHashes[algo] = await sha("SHA-1", inputText);
            break;
          case "SHA-256":
            newHashes[algo] = await sha("SHA-256", inputText);
            break;
          case "SHA-512":
            newHashes[algo] = await sha("SHA-512", inputText);
            break;
        }
      } catch (error) {
        newHashes[algo] = "Error generating hash";
      }
    }

    setHashes(newHashes);
    setIsProcessing(false);
  };

  // MD5 for ArrayBuffer
  const md5FromBuffer = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let text = "";
    for (let i = 0; i < bytes.length; i++) {
      text += String.fromCharCode(bytes[i]);
    }
    
    // Use the same MD5 algorithm but with binary string
    const rotateLeft = (value: number, shift: number) => {
      return (value << shift) | (value >>> (32 - shift));
    };

    const addUnsigned = (x: number, y: number) => {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };

    const F = (x: number, y: number, z: number) => (x & y) | (~x & z);
    const G = (x: number, y: number, z: number) => (x & z) | (y & ~z);
    const H = (x: number, y: number, z: number) => x ^ y ^ z;
    const I = (x: number, y: number, z: number) => y ^ (x | ~z);

    const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const convertToWordArray = (str: string) => {
      const wordArray: number[] = [];
      for (let i = 0; i < str.length * 8; i += 8) {
        wordArray[i >> 5] |= (str.charCodeAt(i / 8) & 0xFF) << (i % 32);
      }
      return wordArray;
    };

    const wordToHex = (value: number) => {
      let hex = "";
      for (let i = 0; i < 4; i++) {
        hex += ((value >> (i * 8 + 4)) & 0x0F).toString(16) + ((value >> (i * 8)) & 0x0F).toString(16);
      }
      return hex;
    };

    const x = convertToWordArray(text);
    const len = text.length * 8;
    
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;

    for (let i = 0; i < x.length; i += 16) {
      const oldA = a;
      const oldB = b;
      const oldC = c;
      const oldD = d;

      a = FF(a, b, c, d, x[i + 0], 7, 0xD76AA478);
      d = FF(d, a, b, c, x[i + 1], 12, 0xE8C7B756);
      c = FF(c, d, a, b, x[i + 2], 17, 0x242070DB);
      b = FF(b, c, d, a, x[i + 3], 22, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[i + 4], 7, 0xF57C0FAF);
      d = FF(d, a, b, c, x[i + 5], 12, 0x4787C62A);
      c = FF(c, d, a, b, x[i + 6], 17, 0xA8304613);
      b = FF(b, c, d, a, x[i + 7], 22, 0xFD469501);
      a = FF(a, b, c, d, x[i + 8], 7, 0x698098D8);
      d = FF(d, a, b, c, x[i + 9], 12, 0x8B44F7AF);
      c = FF(c, d, a, b, x[i + 10], 17, 0xFFFF5BB1);
      b = FF(b, c, d, a, x[i + 11], 22, 0x895CD7BE);
      a = FF(a, b, c, d, x[i + 12], 7, 0x6B901122);
      d = FF(d, a, b, c, x[i + 13], 12, 0xFD987193);
      c = FF(c, d, a, b, x[i + 14], 17, 0xA679438E);
      b = FF(b, c, d, a, x[i + 15], 22, 0x49B40821);

      a = GG(a, b, c, d, x[i + 1], 5, 0xF61E2562);
      d = GG(d, a, b, c, x[i + 6], 9, 0xC040B340);
      c = GG(c, d, a, b, x[i + 11], 14, 0x265E5A51);
      b = GG(b, c, d, a, x[i + 0], 20, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[i + 5], 5, 0xD62F105D);
      d = GG(d, a, b, c, x[i + 10], 9, 0x02441453);
      c = GG(c, d, a, b, x[i + 15], 14, 0xD8A1E681);
      b = GG(b, c, d, a, x[i + 4], 20, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[i + 9], 5, 0x21E1CDE6);
      d = GG(d, a, b, c, x[i + 14], 9, 0xC33707D6);
      c = GG(c, d, a, b, x[i + 3], 14, 0xF4D50D87);
      b = GG(b, c, d, a, x[i + 8], 20, 0x455A14ED);
      a = GG(a, b, c, d, x[i + 13], 5, 0xA9E3E905);
      d = GG(d, a, b, c, x[i + 2], 9, 0xFCEFA3F8);
      c = GG(c, d, a, b, x[i + 7], 14, 0x676F02D9);
      b = GG(b, c, d, a, x[i + 12], 20, 0x8D2A4C8A);

      a = HH(a, b, c, d, x[i + 5], 4, 0xFFFA3942);
      d = HH(d, a, b, c, x[i + 8], 11, 0x8771F681);
      c = HH(c, d, a, b, x[i + 11], 16, 0x6D9D6122);
      b = HH(b, c, d, a, x[i + 14], 23, 0xFDE5380C);
      a = HH(a, b, c, d, x[i + 1], 4, 0xA4BEEA44);
      d = HH(d, a, b, c, x[i + 4], 11, 0x4BDECFA9);
      c = HH(c, d, a, b, x[i + 7], 16, 0xF6BB4B60);
      b = HH(b, c, d, a, x[i + 10], 23, 0xBEBFBC70);
      a = HH(a, b, c, d, x[i + 13], 4, 0x289B7EC6);
      d = HH(d, a, b, c, x[i + 0], 11, 0xEAA127FA);
      c = HH(c, d, a, b, x[i + 3], 16, 0xD4EF3085);
      b = HH(b, c, d, a, x[i + 6], 23, 0x04881D05);
      a = HH(a, b, c, d, x[i + 9], 4, 0xD9D4D039);
      d = HH(d, a, b, c, x[i + 12], 11, 0xE6DB99E5);
      c = HH(c, d, a, b, x[i + 15], 16, 0x1FA27CF8);
      b = HH(b, c, d, a, x[i + 2], 23, 0xC4AC5665);

      a = II(a, b, c, d, x[i + 0], 6, 0xF4292244);
      d = II(d, a, b, c, x[i + 7], 10, 0x432AFF97);
      c = II(c, d, a, b, x[i + 14], 15, 0xAB9423A7);
      b = II(b, c, d, a, x[i + 5], 21, 0xFC93A039);
      a = II(a, b, c, d, x[i + 12], 6, 0x655B59C3);
      d = II(d, a, b, c, x[i + 3], 10, 0x8F0CCC92);
      c = II(c, d, a, b, x[i + 10], 15, 0xFFEFF47D);
      b = II(b, c, d, a, x[i + 1], 21, 0x85845DD1);
      a = II(a, b, c, d, x[i + 8], 6, 0x6FA87E4F);
      d = II(d, a, b, c, x[i + 15], 10, 0xFE2CE6E0);
      c = II(c, d, a, b, x[i + 6], 15, 0xA3014314);
      b = II(b, c, d, a, x[i + 13], 21, 0x4E0811A1);
      a = II(a, b, c, d, x[i + 4], 6, 0xF7537E82);
      d = II(d, a, b, c, x[i + 11], 10, 0xBD3AF235);
      c = II(c, d, a, b, x[i + 2], 15, 0x2AD7D2BB);
      b = II(b, c, d, a, x[i + 9], 21, 0xEB86D391);

      a = addUnsigned(a, oldA);
      b = addUnsigned(b, oldB);
      c = addUnsigned(c, oldC);
      d = addUnsigned(d, oldD);
    }

    return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const newHashes: Record<string, string> = {};

      for (const algo of selectedAlgorithms) {
        try {
          switch (algo) {
            case "MD5":
              newHashes[algo] = md5FromBuffer(arrayBuffer);
              break;
            case "SHA-1":
              const hash1 = await crypto.subtle.digest("SHA-1", arrayBuffer);
              newHashes[algo] = Array.from(new Uint8Array(hash1))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
              break;
            case "SHA-256":
              const hash256 = await crypto.subtle.digest("SHA-256", arrayBuffer);
              newHashes[algo] = Array.from(new Uint8Array(hash256))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
              break;
            case "SHA-512":
              const hash512 = await crypto.subtle.digest("SHA-512", arrayBuffer);
              newHashes[algo] = Array.from(new Uint8Array(hash512))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
              break;
          }
        } catch (error) {
          newHashes[algo] = "Error generating hash";
        }
      }

      setHashes(newHashes);
      setInputText(`File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      setIsProcessing(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // Copy hash to clipboard
  const copyHash = async (algorithm: string, hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(algorithm);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Toggle algorithm selection
  const toggleAlgorithm = (algo: HashAlgorithm) => {
    if (selectedAlgorithms.includes(algo)) {
      if (selectedAlgorithms.length > 1) {
        setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== algo));
      }
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, algo]);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-transparent to-teal-900/10"></div>
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
              <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 bg-clip-text text-transparent">
                Hash Generator
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Generate MD5, SHA-1, SHA-256, and SHA-512 hashes for text or files
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Left: Input & Settings */}
            <div className="space-y-6">
              {/* Algorithm Selection */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Hash Algorithms
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {algorithms.map((algo) => (
                    <button
                      key={algo.name}
                      onClick={() => toggleAlgorithm(algo.name)}
                      className={`flex flex-col items-start gap-2 p-4 rounded-xl transition-all ${
                        selectedAlgorithms.includes(algo.name)
                          ? `bg-gradient-to-br ${algo.color} text-white shadow-lg scale-105`
                          : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Hash className="w-5 h-5" />
                        <span className="font-bold">{algo.name}</span>
                        {selectedAlgorithms.includes(algo.name) && (
                          <Check className="w-4 h-4 ml-auto" />
                        )}
                      </div>
                      <span className="text-xs opacity-80">{algo.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  Text Input
                </h2>
                <textarea
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    generateHashes();
                  }}
                  placeholder="Enter text to hash..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={6}
                />
                <p className="text-xs text-gray-400 mt-2">
                  {inputText.length} characters
                </p>
              </div>

              {/* File Upload */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  File Upload
                </h2>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-medium transition-all shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Choose File to Hash
                </button>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Hash any file type (all processing done locally)
                </p>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-sm rounded-2xl p-6 border border-emerald-700/50">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-400 mb-2">Security & Privacy</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• All hashing is done locally in your browser</li>
                      <li>• No data is sent to any server</li>
                      <li>• SHA-256/SHA-512 recommended for security</li>
                      <li>• MD5/SHA-1 are deprecated (use for compatibility only)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="space-y-6">
              {/* Hash Results */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 min-h-[500px]">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Key className="w-5 h-5 text-emerald-400" />
                  Hash Results
                </h2>

                {isProcessing ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Generating hashes...</p>
                    </div>
                  </div>
                ) : Object.keys(hashes).length === 0 ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center text-gray-400">
                      <Hash className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Enter text or upload a file</p>
                      <p className="text-sm mt-2">to generate hashes</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(hashes).map(([algorithm, hash]) => {
                      const algoInfo = algorithms.find(a => a.name === algorithm);
                      return (
                        <div
                          key={algorithm}
                          className="bg-gray-700/50 rounded-xl p-4 border border-gray-600"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-bold bg-gradient-to-r ${algoInfo?.color} bg-clip-text text-transparent`}>
                              {algorithm}
                            </span>
                            <button
                              onClick={() => copyHash(algorithm, hash)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gray-600/50 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                            >
                              {copied === algorithm ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <code className="block text-xs text-gray-300 break-all font-mono bg-gray-900/50 p-3 rounded-lg">
                            {hash}
                          </code>
                          <p className="text-xs text-gray-500 mt-2">
                            {hash.length} characters
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Use Cases */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="font-semibold text-emerald-400 mb-3">Common Use Cases</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>File Verification:</strong> Compare checksums to verify file integrity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>Password Storage:</strong> Generate hashes for secure password storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>Data Integrity:</strong> Verify data hasn't been tampered with</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span><strong>Digital Signatures:</strong> Create unique identifiers for documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




