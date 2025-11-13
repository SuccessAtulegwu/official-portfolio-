"use client";

import { useState, useEffect } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Palette, Copy, Check, RefreshCw, Download, Lock, Unlock, Sparkles, ArrowLeft, Wand2 } from "lucide-react";
import Link from "next/link";

type ColorFormat = "HEX" | "RGB" | "HSL";
type ColorHarmony = "complementary" | "analogous" | "triadic" | "tetradic" | "monochromatic" | "split-complementary" | "gradient";
type GradientType = "linear" | "radial";
type GradientDirection = "to right" | "to left" | "to top" | "to bottom" | "to top right" | "to bottom right" | "to top left" | "to bottom left";

interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  locked: boolean;
}

export default function ColorPaletteGenerator() {
  const [colors, setColors] = useState<Color[]>([]);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("HEX");
  const [copied, setCopied] = useState<number | null>(null);
  const [baseColor, setBaseColor] = useState("#3b82f6");
  const [endColor, setEndColor] = useState("#f59e0b");
  const [harmony, setHarmony] = useState<ColorHarmony>("complementary");
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [gradientDirection, setGradientDirection] = useState<GradientDirection>("to right");
  const [gradientCopied, setGradientCopied] = useState(false);

  const harmonies: { name: ColorHarmony; label: string; description: string }[] = [
    { name: "complementary", label: "Complementary", description: "Opposite on color wheel" },
    { name: "analogous", label: "Analogous", description: "Adjacent colors" },
    { name: "triadic", label: "Triadic", description: "Evenly spaced (120°)" },
    { name: "tetradic", label: "Tetradic", description: "Two complementary pairs" },
    { name: "monochromatic", label: "Monochromatic", description: "Same hue, different shades" },
    { name: "split-complementary", label: "Split Complementary", description: "Base + two adjacent to complement" },
    { name: "gradient", label: "Gradient", description: "Smooth transition between two colors" },
  ];

  // Convert HEX to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  // Generate color palette based on harmony
  const generatePalette = (baseHex: string, harmonyType: ColorHarmony): Color[] => {
    const baseRgb = hexToRgb(baseHex);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
    const palette: Color[] = [];

    switch (harmonyType) {
      case "complementary":
        // Base color + opposite (180°)
        palette.push(createColor(baseHex));
        palette.push(createColor(hslToRgb((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 20, 10))));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, Math.min(baseHsl.l + 20, 90))));
        palette.push(createColor(hslToRgb((baseHsl.h + 180) % 360, baseHsl.s, Math.max(baseHsl.l - 15, 15))));
        break;

      case "analogous":
        // Base color + adjacent colors (±30°)
        palette.push(createColor(hslToRgb((baseHsl.h - 30 + 360) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(baseHex));
        palette.push(createColor(hslToRgb((baseHsl.h + 30) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb((baseHsl.h - 15 + 360) % 360, baseHsl.s, Math.max(baseHsl.l - 15, 15))));
        palette.push(createColor(hslToRgb((baseHsl.h + 15) % 360, baseHsl.s, Math.min(baseHsl.l + 15, 90))));
        break;

      case "triadic":
        // Three colors evenly spaced (120°)
        palette.push(createColor(baseHex));
        palette.push(createColor(hslToRgb((baseHsl.h + 120) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb((baseHsl.h + 240) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 20, 10))));
        palette.push(createColor(hslToRgb((baseHsl.h + 120) % 360, baseHsl.s, Math.min(baseHsl.l + 15, 90))));
        break;

      case "tetradic":
        // Four colors (two complementary pairs)
        palette.push(createColor(baseHex));
        palette.push(createColor(hslToRgb((baseHsl.h + 90) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb((baseHsl.h + 180) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb((baseHsl.h + 270) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 15, 15))));
        break;

      case "monochromatic":
        // Same hue, different lightness
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, 20)));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, 40)));
        palette.push(createColor(baseHex));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, 70)));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, 85)));
        break;

      case "split-complementary":
        // Base + two colors adjacent to its complement
        palette.push(createColor(baseHex));
        palette.push(createColor(hslToRgb((baseHsl.h + 150) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb((baseHsl.h + 210) % 360, baseHsl.s, baseHsl.l)));
        palette.push(createColor(hslToRgb(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 20, 10))));
        palette.push(createColor(hslToRgb((baseHsl.h + 180) % 360, baseHsl.s, Math.min(baseHsl.l + 15, 90))));
        break;

      case "gradient":
        // Smooth gradient from base color to end color
        // Use the endColor from state instead of calculating complement
        const endRgb = hexToRgb(endColor);
        const endHsl = rgbToHsl(endRgb.r, endRgb.g, endRgb.b);
        
        // Generate 5 colors with smooth interpolation
        for (let i = 0; i < 5; i++) {
          const ratio = i / 4; // 0, 0.25, 0.5, 0.75, 1
          
          // Interpolate hue (shortest path around color wheel)
          let hueDiff = endHsl.h - baseHsl.h;
          if (hueDiff > 180) hueDiff -= 360;
          if (hueDiff < -180) hueDiff += 360;
          const interpolatedHue = (baseHsl.h + hueDiff * ratio + 360) % 360;
          
          // Interpolate saturation and lightness
          const interpolatedSat = baseHsl.s + (endHsl.s - baseHsl.s) * ratio;
          const interpolatedLight = baseHsl.l + (endHsl.l - baseHsl.l) * ratio;
          
          palette.push(createColor(hslToRgb(
            Math.round(interpolatedHue),
            Math.round(interpolatedSat),
            Math.round(interpolatedLight)
          )));
        }
        break;
    }

    return palette;
  };

  // Create color object from RGB or HEX
  const createColor = (input: string | { r: number; g: number; b: number }): Color => {
    let rgb: { r: number; g: number; b: number };
    if (typeof input === "string") {
      rgb = hexToRgb(input);
    } else {
      rgb = input;
    }
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { hex, rgb, hsl, locked: false };
  };

  // Generate random color
  const generateRandomColor = (): string => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };

  // Initial generation
  useEffect(() => {
    setColors(generatePalette(baseColor, harmony));
  }, [baseColor, endColor, harmony]);

  // Regenerate palette
  const regeneratePalette = () => {
    const newColors = generatePalette(baseColor, harmony);
    setColors(prevColors =>
      newColors.map((newColor, idx) =>
        prevColors[idx]?.locked ? prevColors[idx] : newColor
      )
    );
  };

  // Generate random palette
  const generateRandomPalette = () => {
    const randomBase = generateRandomColor();
    setBaseColor(randomBase);
  };

  // Toggle lock on color
  const toggleLock = (index: number) => {
    setColors(prevColors =>
      prevColors.map((color, idx) =>
        idx === index ? { ...color, locked: !color.locked } : color
      )
    );
  };

  // Copy color to clipboard
  const copyColor = async (color: Color, index: number) => {
    let value = "";
    switch (colorFormat) {
      case "HEX":
        value = color.hex.toUpperCase();
        break;
      case "RGB":
        value = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
        break;
      case "HSL":
        value = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
        break;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Get color text (for display)
  const getColorText = (color: Color): string => {
    switch (colorFormat) {
      case "HEX":
        return color.hex.toUpperCase();
      case "RGB":
        return `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
      case "HSL":
        return `${color.hsl.h}°, ${color.hsl.s}%, ${color.hsl.l}%`;
    }
  };

  // Export palette
  const exportPalette = (format: "CSS" | "JSON" | "Image") => {
    console.log("Exporting colors:", colors); // Debug log
    
    if (format === "CSS") {
      const css = colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n");
      const content = `:root {\n${css}\n}`;
      console.log("CSS export content:", content); // Debug log
      const blob = new Blob([content], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "palette.css";
      a.click();
      URL.revokeObjectURL(url); // Clean up
    } else if (format === "JSON") {
      const jsonData = colors.map(c => ({ 
        hex: c.hex.toUpperCase(), 
        rgb: c.rgb, 
        hsl: c.hsl 
      }));
      const json = JSON.stringify(jsonData, null, 2);
      console.log("JSON export content:", json); // Debug log
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "palette.json";
      a.click();
      URL.revokeObjectURL(url); // Clean up
    }
  };

  // Generate gradient CSS
  const generateGradientCSS = (): string => {
    const colorStops = colors.map(c => c.hex).join(", ");
    if (gradientType === "linear") {
      return `linear-gradient(${gradientDirection}, ${colorStops})`;
    } else {
      return `radial-gradient(circle, ${colorStops})`;
    }
  };

  // Copy gradient CSS
  const copyGradient = async () => {
    try {
      const gradientCSS = `background: ${generateGradientCSS()};`;
      await navigator.clipboard.writeText(gradientCSS);
      setGradientCopied(true);
      setTimeout(() => setGradientCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy gradient:", error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/10 via-transparent to-pink-900/10"></div>
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
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Color Palette Generator
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Generate beautiful color schemes with perfect harmony and stunning CSS gradients
            </p>
          </div>

          {/* Controls */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className={`grid grid-cols-1 gap-4 ${harmony === "gradient" ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {/* Base Color Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {harmony === "gradient" ? "Start Color" : "Base Color"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="flex-1 px-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                    />
                  </div>
                </div>

                {/* End Color (only for gradient harmony) */}
                {harmony === "gradient" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={endColor}
                        onChange={(e) => setEndColor(e.target.value)}
                        className="w-16 h-12 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={endColor}
                        onChange={(e) => setEndColor(e.target.value)}
                        className="flex-1 px-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Harmony Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Harmony
                  </label>
                  <select
                    value={harmony}
                    onChange={(e) => setHarmony(e.target.value as ColorHarmony)}
                    className="w-full px-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                  >
                    {harmonies.map(h => (
                      <option key={h.name} value={h.name}>
                        {h.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Format
                  </label>
                  <select
                    value={colorFormat}
                    onChange={(e) => setColorFormat(e.target.value as ColorFormat)}
                    className="w-full px-3 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                  >
                    <option value="HEX">HEX</option>
                    <option value="RGB">RGB</option>
                    <option value="HSL">HSL</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <button
                  onClick={regeneratePalette}
                  className="px-4 py-2.5 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 rounded-lg font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
                <button
                  onClick={generateRandomPalette}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Random
                </button>
                <button
                  onClick={() => exportPalette("CSS")}
                  className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  CSS
                </button>
                <button
                  onClick={() => exportPalette("JSON")}
                  className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  JSON
                </button>
              </div>
            </div>
          </div>

          {/* Color Palette Display */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-transform"
                >
                  {/* Color Display */}
                  <div
                    className="h-40 cursor-pointer"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color, index)}
                  ></div>

                  {/* Color Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400">
                        {colorFormat}
                      </span>
                      <button
                        onClick={() => toggleLock(index)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {color.locked ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <code className="block text-sm font-mono text-white mb-3 break-all">
                      {getColorText(color)}
                    </code>
                    <button
                      onClick={() => copyColor(color, index)}
                      className="w-full px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      {copied === index ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Generator */}
          <div className="max-w-6xl mx-auto mt-12">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-fuchsia-400" />
                Gradient Generator
              </h2>

              {/* Gradient Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Gradient Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gradient Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setGradientType("linear")}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
                        gradientType === "linear"
                          ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      onClick={() => setGradientType("radial")}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
                        gradientType === "radial"
                          ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-lg"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      Radial
                    </button>
                  </div>
                </div>

                {/* Gradient Direction (for linear) */}
                {gradientType === "linear" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Direction
                    </label>
                    <select
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value as GradientDirection)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white text-sm"
                    >
                      <option value="to right">To Right →</option>
                      <option value="to left">To Left ←</option>
                      <option value="to top">To Top ↑</option>
                      <option value="to bottom">To Bottom ↓</option>
                      <option value="to top right">To Top Right ↗</option>
                      <option value="to bottom right">To Bottom Right ↘</option>
                      <option value="to top left">To Top Left ↖</option>
                      <option value="to bottom left">To Bottom Left ↙</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Gradient Preview */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preview
                </label>
                <div
                  className="w-full h-48 rounded-2xl border-2 border-gray-600 shadow-xl"
                  style={{
                    background: generateGradientCSS(),
                  }}
                ></div>
              </div>

              {/* Gradient CSS Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CSS Code
                </label>
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
                  <code className="text-sm text-green-400 font-mono break-all">
                    background: {generateGradientCSS()};
                  </code>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyGradient}
                className="w-full px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 rounded-xl font-medium transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {gradientCopied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Gradient CSS Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Gradient CSS
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-fuchsia-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-fuchsia-700/50">
              <h3 className="font-semibold text-fuchsia-400 mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Tips for Using Color Palettes
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span><strong>Lock colors</strong> you like and regenerate to find perfect combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span><strong>Complementary</strong> creates high contrast and vibrant designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span><strong>Analogous</strong> creates harmonious and serene designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span><strong>Monochromatic</strong> is elegant and professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span><strong>Gradient harmony</strong> lets you pick start and end colors for perfect transitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span>Use <strong>Space bar</strong> to quickly generate new random palettes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-fuchsia-400 mt-0.5">•</span>
                  <span><strong>CSS Gradients</strong> automatically use all colors from your palette in order</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

