"use client";

import { useState } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Copy, Check, RefreshCw, Plus, Trash2, ArrowLeft, Sparkles, Box } from "lucide-react";
import Link from "next/link";

interface Shadow {
  id: string;
  inset: boolean;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
}

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([
    {
      id: "1",
      inset: false,
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: 0,
      color: "#000000",
      opacity: 0.1,
    },
  ]);
  const [copied, setCopied] = useState(false);
  const [previewShape, setPreviewShape] = useState<"square" | "rounded" | "circle">("rounded");

  // Presets
  const presets = [
    {
      name: "None",
      shadows: [],
    },
    {
      name: "Soft",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: "#000000", opacity: 0.1 },
      ],
    },
    {
      name: "Medium",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1 },
        { inset: false, offsetX: 0, offsetY: 2, blur: 4, spread: -1, color: "#000000", opacity: 0.06 },
      ],
    },
    {
      name: "Large",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 10, blur: 25, spread: -5, color: "#000000", opacity: 0.1 },
        { inset: false, offsetX: 0, offsetY: 8, blur: 10, spread: -6, color: "#000000", opacity: 0.1 },
      ],
    },
    {
      name: "Elevated",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 20, blur: 25, spread: -5, color: "#000000", opacity: 0.1 },
        { inset: false, offsetX: 0, offsetY: 10, blur: 10, spread: -5, color: "#000000", opacity: 0.04 },
      ],
    },
    {
      name: "Inner",
      shadows: [
        { inset: true, offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: "#000000", opacity: 0.06 },
      ],
    },
    {
      name: "Outline",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 0, blur: 0, spread: 3, color: "#3b82f6", opacity: 1 },
      ],
    },
    {
      name: "Glow",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 0, blur: 20, spread: 0, color: "#3b82f6", opacity: 0.6 },
      ],
    },
    {
      name: "Neumorphic",
      shadows: [
        { inset: false, offsetX: 8, offsetY: 8, blur: 16, spread: 0, color: "#000000", opacity: 0.1 },
        { inset: false, offsetX: -8, offsetY: -8, blur: 16, spread: 0, color: "#ffffff", opacity: 0.7 },
      ],
    },
    {
      name: "3D",
      shadows: [
        { inset: false, offsetX: 0, offsetY: 1, blur: 0, spread: 0, color: "#000000", opacity: 0.1 },
        { inset: false, offsetX: 0, offsetY: 2, blur: 0, spread: 0, color: "#000000", opacity: 0.09 },
        { inset: false, offsetX: 0, offsetY: 4, blur: 0, spread: 0, color: "#000000", opacity: 0.08 },
        { inset: false, offsetX: 0, offsetY: 8, blur: 0, spread: 0, color: "#000000", opacity: 0.07 },
      ],
    },
  ];

  // Generate CSS
  const generateCSS = () => {
    if (shadows.length === 0) return "box-shadow: none;";
    
    const shadowStrings = shadows.map((shadow) => {
      const { inset, offsetX, offsetY, blur, spread, color, opacity } = shadow;
      const rgba = hexToRgba(color, opacity);
      return `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgba}`;
    });

    return `box-shadow: ${shadowStrings.join(",\n            ")};`;
  };

  // Convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Add new shadow
  const addShadow = () => {
    const newShadow: Shadow = {
      id: Date.now().toString(),
      inset: false,
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: 0,
      color: "#000000",
      opacity: 0.1,
    };
    setShadows([...shadows, newShadow]);
  };

  // Remove shadow
  const removeShadow = (id: string) => {
    setShadows(shadows.filter((s) => s.id !== id));
  };

  // Update shadow
  const updateShadow = (id: string, updates: Partial<Shadow>) => {
    setShadows(shadows.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  // Apply preset
  const applyPreset = (preset: typeof presets[0]) => {
    if (preset.shadows.length === 0) {
      setShadows([]);
    } else {
      setShadows(
        preset.shadows.map((shadow, index) => ({
          ...shadow,
          id: Date.now().toString() + index,
        }))
      );
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Reset
  const reset = () => {
    setShadows([
      {
        id: "1",
        inset: false,
        offsetX: 0,
        offsetY: 4,
        blur: 6,
        spread: 0,
        color: "#000000",
        opacity: 0.1,
      },
    ]);
  };

  // Get preview border radius
  const getPreviewBorderRadius = () => {
    switch (previewShape) {
      case "square":
        return "0px";
      case "rounded":
        return "12px";
      case "circle":
        return "50%";
      default:
        return "12px";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Back Button */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Community Tools</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-blue-500/20">
              <Box className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">CSS Box Shadow Generator</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Box Shadow Generator
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Create beautiful CSS box shadows with live preview and presets
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Preview */}
            <div className="space-y-6">
              {/* Preview Box */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Live Preview
                </h2>

                {/* Shape Selector */}
                <div className="flex gap-2 mb-6">
                  {(["square", "rounded", "circle"] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setPreviewShape(shape)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        previewShape === shape
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Preview Area */}
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-16 flex items-center justify-center min-h-[300px]">
                  <div
                    className="w-48 h-48 bg-white dark:bg-gray-900"
                    style={{
                      boxShadow: shadows.length > 0 ? shadows
                        .map((s) => {
                          const rgba = hexToRgba(s.color, s.opacity);
                          return `${s.inset ? "inset " : ""}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${rgba}`;
                        })
                        .join(", ") : "none",
                      borderRadius: getPreviewBorderRadius(),
                    }}
                  />
                </div>
              </div>

              {/* CSS Output */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">CSS Code</h2>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy CSS
                      </>
                    )}
                  </button>
                </div>

                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  {generateCSS()}
                </pre>
              </div>

              {/* Presets */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Presets</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {presets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      className="bg-gray-700/50 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all hover:scale-105 font-medium text-sm"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Controls */}
            <div className="space-y-6">
              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={addShadow}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:scale-105 transition-transform font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add Shadow Layer
                </button>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              {/* Shadow Layers */}
              <div className="space-y-4">
                {shadows.length === 0 ? (
                  <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
                    <p className="text-gray-400">No shadows. Click "Add Shadow Layer" to start.</p>
                  </div>
                ) : (
                  shadows.map((shadow, index) => (
                    <div
                      key={shadow.id}
                      className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-white">
                          Layer {index + 1}
                          {shadow.inset && (
                            <span className="ml-2 text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded-full">
                              Inset
                            </span>
                          )}
                        </h3>
                        {shadows.length > 1 && (
                          <button
                            onClick={() => removeShadow(shadow.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* Inset Toggle */}
                      <div className="mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={shadow.inset}
                            onChange={(e) => updateShadow(shadow.id, { inset: e.target.checked })}
                            className="w-4 h-4 rounded accent-purple-600"
                          />
                          <span className="text-sm text-gray-300">Inset Shadow</span>
                        </label>
                      </div>

                      {/* Controls Grid */}
                      <div className="space-y-4">
                        {/* Offset X */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Offset X: {shadow.offsetX}px
                          </label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={shadow.offsetX}
                            onChange={(e) => updateShadow(shadow.id, { offsetX: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>

                        {/* Offset Y */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Offset Y: {shadow.offsetY}px
                          </label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            value={shadow.offsetY}
                            onChange={(e) => updateShadow(shadow.id, { offsetY: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                        </div>

                        {/* Blur */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Blur: {shadow.blur}px
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={shadow.blur}
                            onChange={(e) => updateShadow(shadow.id, { blur: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                          />
                        </div>

                        {/* Spread */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Spread: {shadow.spread}px
                          </label>
                          <input
                            type="range"
                            min="-50"
                            max="50"
                            value={shadow.spread}
                            onChange={(e) => updateShadow(shadow.id, { spread: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-600"
                          />
                        </div>

                        {/* Color and Opacity */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Color
                            </label>
                            <input
                              type="color"
                              value={shadow.color}
                              onChange={(e) => updateShadow(shadow.id, { color: e.target.value })}
                              className="w-full h-10 bg-gray-700 rounded-lg cursor-pointer border-0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Opacity: {Math.round(shadow.opacity * 100)}%
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={shadow.opacity}
                              onChange={(e) => updateShadow(shadow.id, { opacity: Number(e.target.value) })}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
                Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Live preview with multiple shapes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Multiple shadow layers support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Inset and outset shadows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>10 beautiful presets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>One-click CSS copy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>Real-time color and opacity control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}



